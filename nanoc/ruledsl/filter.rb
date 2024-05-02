module Nanoc::RuleDSL
  module Filter
    ##
    # @example
    #   compile "/sitemap.xml.erb" do
    #     filter(:erb)
    #     filter Proc.new { _1.each_line.reject { |s| s.strip,empty? } }
    #     write("/sitemap.xml")
    #   end
    #
    # @param [Proc, Symbol] fn
    #  The name of a Symbol, or Proc for an anonymous filter
    #
    # @param [Hash] options
    #  Filter options
    #
    # @return [void]
    def filter(fn, options = {})
      if Proc === fn
        id = random_id
        Nanoc::Filter.define(id) { fn.call(_1, _2) }
        super(id, options)
      else
        super(fn, options)
      end
    end

    private

    def random_id
      name = item.identifier.to_s.gsub(%r|[./\\]|, "_")[/[A-Za-z0-9_]+/]
      random = SecureRandom.alphanumeric
      "__nanoc_#{name}_#{random}".to_sym
    end
  end
end
