# frozen_string_literal: true

module Mixin::ERB
  def erb(path, local_assigns = {})
    erb = File.binread File.join(Dir.getwd, "src", "html", path)
    scope = binding
    local_assigns.each { scope.local_variable_set(_1, _2) }
    ::ERB.new(erb).result(scope)
  end
end
