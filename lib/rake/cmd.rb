# frozen_string_literal: true

module Cmd
  def cmd(cmd, *args, silent: false)
    print "  -> #{cmd}: " unless silent
    _, result = Process.wait2 Process.spawn(
      [cmd, cmd],
      *args,
      $stderr => File::NULL,
      $stdout => File::NULL
    )
    if result.success?
      print Paint["OK", :green, :bold], "\n" unless silent
    else
      print Paint["ERROR", :red, :bold], "\n" unless silent
      exit result.exitstatus
    end
  end
end
