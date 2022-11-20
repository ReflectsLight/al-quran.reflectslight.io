# frozen_string_literal: true

source "https://rubygems.org"
gem "nanoc", "~> 4.12"
gem "nanoc-live", "~> 1.0"
gem "nanoc-gunzip.rb", "~> 0.1"
gem "nanoc-webpack.rb", "~> 0.1"
gem "rainpress", "~> 1.0"
gem "sass", "~> 3.7"
gem "standard", "~> 1.16"
gem "ryo.rb", "~> 0.3"
gem "paint", "~> 2.3"
gem "dotenv", "~> 2.8"
gem "adsf", "~> 1.4"
gem "puma", "~> 6.0"

##
# Listen gem
require "rbconfig"
gem "listen", "~> 3.0"
case RbConfig::CONFIG["target_os"]
when /(?i-mx:bsd|dragonfly)/ # BSD
  gem "rb-kqueue", "~> 0.2"
end
