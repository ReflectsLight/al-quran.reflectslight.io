##
# frozen_string_literals: true

require_relative "pf"

class ERBContext
  include PF

  def self.with_locals(locals)
    new(locals).context
  end

  def initialize(locals)
    @locals = locals
  end

  def context
    binding.tap do |b|
      Ryo.each(@locals) { |k,v| b.local_variable_set(k, v) }
    end
  end
end
