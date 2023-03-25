##
# frozen_string_literal: true

read_options = ->(env:) do
  path = File.join(Dir.getwd, "config", "#{env}.yml")
  Ryo.from(YAML.load_file(path))
end

desc "Deploy the website"
task "deploy", [:env] => %i[nanoc:compile] do |task, args|
  env = args[:env]
  case env
  when "remote"
    # TODO
  when "local"
    if Process.euid != 0
      sh "doas -u root bundle exec rake deploy:local"
      exit $?.exitstatus
    end
    Rake::Task["deploy:local"].invoke
  end
end

task "deploy:local" do
  options  = read_options.call(env: "local")
  logs_dir = File.dirname(options.nginx.logs.access)
  dest_dir = options.nginx.root
  chown    = Array.new(2) { options.nginx.user }.join(":")
  sh "mkdir -p #{logs_dir}"
  sh "mkdir -p #{dest_dir}"
  sh "rm -rf #{File.join(dest_dir, "*")}"
  sh "cp -R build/al-quran/ #{dest_dir}"
  sh "chown -R #{chown} #{dest_dir}"
  sh "chmod -R og-rwx #{dest_dir}"
  sh "chmod -R u+rwX #{dest_dir}"
end
