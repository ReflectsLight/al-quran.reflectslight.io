# frozen_string_literal: true

module Nanoc::Extension
  ##
  # The RequireRules extension adds a method that can help
  # break up the Rules file into multiple separate files.
  # See the Rules file to learn how this module is added
  # to nanoc
  module RequireRules
    ##
    # @example
    #   require_rules "nanoc/rules/assets"
    #   require_rules "nanoc/rules/index", {locales: ["en", "ar", "fa"]}
    # @param [String] path
    # @param [Hash] locals
    # @param [Binding] target
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
