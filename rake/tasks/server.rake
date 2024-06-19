desc "Start web server"
task :server, [:protocol] do |_t, args|
  require "yaml"
  require "ryo"
  require "server"
  nanoc = Ryo.from(YAML.load_file("./nanoc.yaml"))
  h = args.to_h
  p = h[:protocol] || "tcp"
  n = File.basename File.realpath(File.join(__dir__, "..", "..", "."))
  o = if p == "unix"
        {unix: nanoc.server.unix.path}
      else
        {host: nanoc.server.tcp.host, port: nanoc.server.tcp.port}
      end
  Process.setproctitle "rake server[#{p}] [#{n}]"
  s = Server.dir(nanoc.output_dir, o)
  s.start(block: true)
rescue Interrupt
  s.stop
end
