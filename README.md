## About

This repository contains the source code of
[al-quran.reflectslight.io](https://al-quran.reflectslight.io) -
a static website for reading (and listening to) The Noble Quran.
After the website is built, the build directory consists of HTML,
CSS, JavaScript and other static assets that can be hosted by a
standard web server (eg nginx, apache, ...).

## Stack

The following languages and tools have to be installed before
the website can be built:

* Ruby 3.1, or later.
* NodeJS v18.15, or later.
* [tidy-html5](https://github.com/htacg/tidy-html5) <br>
  There is a good chance there's a package available for
  tidy-html5 on your operating system of choice.

## Development

    # Clone repository
    git clone https://github.com/ReflectsLight/al-quran.git
    cd al-quran

    # Install Ruby, NodeJS packages
    bundle install
    npm i

    # Build website
    rake nanoc:build

    # Start web server
    rake server

## Thanks

First and foremost, Alhamdulillah.

* Thanks to the following graphic artists:
    - [RefreshIcon](/src/js/components/Icon.tsx)
      by
      [Muhammad Haq](https://freeicons.io/profile/823).

* Thanks to the following translators:
    - English (The Clear Quran) by Dr. Mustafa Khattab

## License

The "source code" is released under the terms of the GPL. <br>
See [./LICENSE](./LICENSE) for details.
