##
# frozen_string_literal: true

desc "Configure environment for deployment"
task "deploy:env" do
  ENV["buildenv"] = "production"
  print "Set $NODE_ENV to 'production'", "\n"
end

desc "Deploy the website"
task "deploy" => %i[deploy:env nanoc:clean nanoc:build] do
  git_branch = `git branch --show-current`.chomp
  if git_branch != "production"
    warn "This task must be run on the 'production' branch."
    exit(1)
  end
  print "Wait...", "\n"
  sh(
    "rsync",
    "--delete", "-rvah",
    "--chmod=Fu=r,Fg=r,Du=rx,Dg=rx",
    "--rsync-path='/home/0x1eef/rsync.sh'",
    "--exclude=audio/",
    "build/al-quran/",
    "0x1eef@al-quran.reflectslight.io:/mnt/www/al-quran.reflectslight.io/"
  )
end
