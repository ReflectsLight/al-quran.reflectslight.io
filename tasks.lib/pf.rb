##
# frozen_string_literal: true

module PF
  def pf_in(rule)
    [
      rule.proto && "proto #{rule.proto}",
      "from #{rule.from}",
      "to #{rule.to}",
      rule.port && "port #{rule.port}"
    ].compact.join(" ")
  end

  def pf_out(rule)
    [
      rule.proto && "proto #{rule.proto}",
      "to #{rule.to}",
      rule.port && "port #{rule.port}"
    ].compact.join(" ")
  end
end
