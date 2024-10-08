# frozen_string_literal: true

module Nanoc::Extension
  ##
  # The AnonymousFilter extension adds support for Proc-based
  # filters. See the Rules file to learn how this module is
  # added to nanoc
  module AnonymousFilter
    require "securerandom"
    ##
    # @example
    #   compile "/sitemap.xml" do
    #     filter proc { _1.chomp }
    #     write("/sitemap.xml")
    #   end
    # @param [Proc, Symbol] fn
    #  Symbol, or Proc for an anonymous filter
    # @param [Hash] options
    #  Filter options
    # @return [void]
    def filter(fn, options = {})
      if Proc === fn
        anonid = anonymous_id
        Nanoc::Filter.define(anonid) { fn.call(_1, _2) }
        super(anonid, options)
      else
        super(fn, options)
      end
    end

    private

    def anonymous_id
      [
        "__nanoc",
        item.identifier.to_s.gsub(%r{[./\\]}, "_")[/[A-Za-z0-9_]+/],
        SecureRandom.alphanumeric
      ].join("_").to_sym
    end
  end
end
