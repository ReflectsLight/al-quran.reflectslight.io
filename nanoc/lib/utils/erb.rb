# frozen_string_literal: true

##
# The {Utils::ERB Utils::ERB} module provides a method
# that can render an ERB template
module Utils::ERB
  ##
  # @param [String] file
  #  The path to an ERB template
  # @param [Hash] local_assigns
  #  Template variables
  # @return [String]
  def erb(file, local_assigns = {})
    erb = File.binread File.join(dirs.content, "html", file)
    ctx = binding
    local_assigns.each { ctx.local_variable_set(_1, _2) }
    ::ERB.new(erb).result(ctx)
  end
end
