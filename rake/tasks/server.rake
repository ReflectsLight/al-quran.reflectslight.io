# frozen_string_literal: true

desc "Start web server"
task :server, [:protocol] do |_t, args|
  require "server"
  h = args.to_h
  p = h[:protocol] || "tcp"
  n = File.basename(dirs.root)
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
