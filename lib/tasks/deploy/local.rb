# frozen_string_literal: true

class Tasks::Deploy::Local
  require "ryo"
  require "yaml"
  require "paint"

  def self.call(...)
    new(...).call
  end

  def call
    src, dest = settings.src, settings.dest
    user, group = settings.user, settings.group
    logs_dir = settings.logs_dir
    doas "root", "/bin/mkdir", "-p", logs_dir
    doas "root", "/bin/mkdir", "-p", dest
    doas "root", "/bin/rm", "-rf", File.join(dest, "*")
    doas "root", "/bin/cp", "-r", src, dest
    doas "root", "/usr/sbin/chown", "-R", [user, group].join(":"), dest
    doas "root", "/bin/chmod", "-R", "og-rwx", dest
    doas "root", "/bin/chmod", "-R", "u+rwX", dest
  end

  def to_proc
    proc { call }
  end

  private

  def nanoc
    @nanoc ||= Ryo.from(YAML.load_file("./nanoc.yaml"))
  end

  def settings
    nanoc.deploy.local
  end

  def doas(user, *cmd)
    print " " * 2, "-> ", File.basename(cmd[0]), ": "
    _, status = Process.wait2 spawn("doas", "-u", user, *cmd)
    if status.success?
      print Paint["OK", :green, :bold], "\n"
    else
      print Paint["ERROR", :red, :bold], "\n"
      exit!
    end
  end
end
