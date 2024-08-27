## About

The "production" branch provides a simple environment for
deploying the website to CloudFlare Pages. This branch also
includes the build directory that is live on production
([build/al-quran/](build/al-quran/)).

## Example

    ##
    # Clone / Pull a copy of the website
    bundle exec rake source:clone
    bundle exec rake source:pull

    ##
    # Build the website
    # git: commit build/al-quran
    # git: push
    # deploy: auto-deploy by CloudFlare
    bundle exec rake website:deploy

