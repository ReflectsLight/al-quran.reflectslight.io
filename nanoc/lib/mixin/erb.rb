# frozen_string_literal: true

module Mixin::ERB
  def erb(file, local_assigns = {})
    erb = File.binread File.join(dirs.content, "html", file)
    ctx = binding
    local_assigns.each { ctx.local_variable_set(_1, _2) }
    ::ERB.new(erb).result(ctx)
  end
end
