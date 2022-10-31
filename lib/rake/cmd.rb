module Cmd
  def cmd(cmd, *args, silent: false)
    print "  -> #{cmd}: " unless silent
    _, result = Process.wait2 Process.spawn(
      [cmd, cmd],
      *args,
      STDERR=>File::NULL,
      STDOUT=>File::NULL
    )
    case
    when result.success?
      print Paint["OK", :green, :bold], "\n" unless silent
    else
      print Paint["ERROR", :red, :bold], "\n" unless silent
      exit result.exitstatus
    end
  end
end
