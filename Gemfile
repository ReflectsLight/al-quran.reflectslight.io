# frozen_string_literal: true
source "https://rubygems.org"

##
# nanoc
gem "nanoc", "~> 4.12"
gem "nanoc-live", "~> 1.0"

##
# Ruby web server
gem "adsf", "~> 1.4"
gem "puma", "~> 6.0"

##
# nanoc filters
gem "nanoc-gunzip.rb", github: "0x1eef/nanoc-gunzip.rb", tag: "v0.1.2"
gem "nanoc-webpack.rb", github: "0x1eef/nanoc-webpack.rb", tag: "v0.1.3"
gem "rainpress", "~> 1.0"
gem "sass", "~> 3.7"

##
# Other
gem "ryo.rb", "~> 0.3", github: "0x1eef/ryo.rb", tag: "v0.3.0"
gem "standard", "~> 1.16"
gem "paint", "~> 2.3"
gem "dotenv", "~> 2.8"

##
# Listen gem
require "rbconfig"
gem "listen", "~> 3.0"
case RbConfig::CONFIG["target_os"]
when /(?i-mx:bsd|dragonfly)/ # BSD
  gem "rb-kqueue", "~> 0.2"
end
