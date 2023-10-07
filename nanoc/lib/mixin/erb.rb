module Mixin::ERB
  def erb(partial, local_assigns = {})
    erb = File.binread File.join(Dir.getwd, "src", "html", "partials", partial)
    scope = binding
    local_assigns.each { scope.local_variable_set(_1, _2) }
    ::ERB.new(erb).result(scope)
  end
end
