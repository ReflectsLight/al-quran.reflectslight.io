## About

The "production" branch provides a simple environment for
deploying the website to CloudFlare Pages. This branch also
[includes the build directory](build/al-quran/) that is live
on production.

## Example

    ##
    # Clone / pull a copy of the website
    bundle exec rake source:clone
    bundle exec rake source:pull

    ##
    # Deploy the website
    # 1. build website
    # 2. commit build/al-quran
    # 3. push
    # 4. auto-deploy via CloudFlare
    bundle exec rake website:deploy

