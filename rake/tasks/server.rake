# frozen_string_literal: true

cwd = File.realpath File.join(__dir__, "..", "..", ".")
desc "Start web server"
task :server, [:protocol] do |_t, args|
  require "server"
  nanoc = Ryo.from_yaml(path: File.join(cwd, "nanoc.yaml"))
  h = args.to_h
  p = h[:protocol] || "tcp"
  n = File.basename(cwd)
  o = if p == "unix"
        {unix: nanoc.server.unix.path}
      else
        {host: nanoc.server.tcp.host, port: nanoc.server.tcp.port}
      end
  s = Server.dir(nanoc.output_dir, o)
  Process.setproctitle "rake server[#{p}] [#{n}]"
  if p == "unix"
    t = s.start(block: false)
    unix = nanoc.server.unix
    chmod(unix.mode, unix.path, verbose: false)
    t.join
  else
    s.start(block: true)
  end
rescue Interrupt
  s.stop
end
