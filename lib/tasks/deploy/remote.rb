# frozen_string_literal: true

class Tasks::Deploy::Remote
  attr_reader :hostname, :user, :path

  def self.call
    new.call
  end

  def initialize
    @hostname = ENV["DEPLOY_HOSTNAME"]
    @user = ENV["DEPLOY_USERNAME"]
    @path = ENV["DEPLOY_PATH"]
    @build_dir = File.join(Dir.getwd, "build", "al-quran", ".")
  end

  def call
    rsync!
  end

  private

  def rsync!
    print "Wait...", "\n"
    system(
      "rsync",
      "--delete",
      "-rvah",
      "--chmod=Du=rwx,Fu=rw",
      @build_dir, "#{@user}@#{@hostname}:#{@path}"
    )
    if $?.success?
      print "\n", Paint["OK", :green, :bold]
    else
      print Paint["ERROR", :red, :bold]
      exit!
    end
  end
end
