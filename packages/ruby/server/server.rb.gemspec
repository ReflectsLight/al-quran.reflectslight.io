# frozen_string_literal: true
Gem::Specification.new do |gem|
  gem.name = "server.rb"
  gem.authors = ["0x1eef"]
  gem.email = ["0x1eef@protonmail.com"]
  gem.homepage = "https://github.com/0x1eef/server.rb#readme"
  gem.version = "0.1.0"
  gem.licenses = ["0BSD"]
  gem.files = Dir["lib/*", "lib/**/*.rb"]
  gem.require_paths = ["lib"]
  gem.summary = "A static file web server"
  gem.description = gem.summary

  ##
  # Default gems
  # Pinned to specific versions for OpenBSD support
  gem.add_runtime_dependency "json", "= 2.6.1"
  gem.add_runtime_dependency "racc", "= 1.6.0"
  gem.add_runtime_dependency "stringio", "= 3.0.1"
  gem.add_runtime_dependency "set", "= 1.0.2"

  gem.add_runtime_dependency "puma", "~> 6.3"
  gem.add_runtime_dependency "rack", "~> 3.0"
  gem.add_development_dependency "standard", "~> 1.24"
  gem.add_development_dependency "rack-test", "~> 2.1"
  gem.add_development_dependency "test-unit", "~> 3.5"
end
