module Nanoc::RuleDSL
  module RequireRules
    ##
    # @example
    #   require_rules "nanoc/rules/assets"
    #
    # @param [String] path
    #  The path to a file
    #
    # @param [Hash] locals
    #  A hash of locals
    #
    # @param [Binding] target
    #  Binding context
    #
    # @return [void]
    def require_rules(path, locals = {}, target = binding)
      locals.each { target.local_variable_set(_1, _2) }
      path = File.join(Dir.getwd, path)
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
