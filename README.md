## About

[al-quran.reflectslight.io](https://al-quran.reflectslight.io) is
a static website for reading (and listening to) The Noble Quran.
After the website is built, the build directory consists of HTML,
CSS, JavaScript and other static assets that can be hosted by
nginx, apache, etc.

## Environment

The following languages and tools have to be installed to build
the website from source:

* Ruby 3.1 (or later)
* NodeJS v18.15 (or later)
* [tidy-html5](https://github.com/htacg/tidy-html5)

## Development

    # Clone repository
    git clone https://github.com/ReflectsLight/al-quran.git
    cd al-quran

    # Setup build environment
    bin/setup

    # Build website
    rake nanoc:build

    # Start web server
    rake server

## Thanks

Alhamdulillah.

* Thanks to the graphic artists:
    - [RefreshIcon](/src/js/components/Icon.tsx)
      by
      [Muhammad Haq](https://freeicons.io/profile/823)

* Thanks to the translators:
    - English (The Clear Quran) by Dr. Mustafa Khattab
    - Farsi by Hussein Taji Kal Dari

## License

The "source code" is released under the terms of the GPL. <br>
See [./LICENSE](./LICENSE) for details.
