# frozen_string_literal: true

source "https://rubygems.org"
gem "nanoc", "~> 4.12"
gem "nanoc-live", "~> 1.0"
gem "nanoc-gunzip.rb", "~> 0.1"
gem "nanoc-webpack.rb", "~> 0.1"
gem "rainpress", "~> 1.0"
gem "sass"
gem "standardrb"
gem "ryo.rb"
gem "paint"
gem "dotenv"
gem "adsf"
gem "puma"

require 'rbconfig'
if RbConfig::CONFIG['target_os'] =~ /(?i-mx:bsd|dragonfly)/
  gem 'rb-kqueue', '>= 0.2'
end
