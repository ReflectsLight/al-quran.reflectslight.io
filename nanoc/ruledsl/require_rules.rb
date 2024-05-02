module Nanoc::RuleDSL
  module RequireRules
    def require_rules(rules, locals = {}, target = binding)
      locals.each { target.local_variable_set(_1, _2) }
      path = File.join(Dir.getwd, rules)
      target.eval(
        if File.readable?(path)
          File.read(path)
        elsif File.readable?("#{path}.rb")
          File.read("#{path}.rb")
        elsif File.readable?("#{path}.rules")
          File.read("#{path}.rules")
        else
          raise LoadError, "#{path} is not readable"
        end
      )
    end
  end
end
