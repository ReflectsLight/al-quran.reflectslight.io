desc "Install configuration files"
task "config:install", :env do |tasks, args|
  env = args[:env]
  if Process.euid != 0
    sh "doas -u root bundle exec rake config:install[#{env}]"
    exit $?.exitstatus
  end
  copy_entry File.join(Dir.getwd, "build", env, "usr.local.etc"),
             "/usr/local/etc"
end
