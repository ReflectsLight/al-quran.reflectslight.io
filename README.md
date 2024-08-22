## About

This repository contains the source code of
[al-quran.reflectslight.io](https://al-quran.reflectslight.io) -
a static website for reading (and listening to)
The Noble Quran. After the website is built,
the build directory consists of HTML, CSS, JavaScript
and other static assets that can be hosted by
a web server such as nginx, apache, et cetera.

## Requirements

The following languages and tools have to be
installed to build the website from source:

* Ruby 3.2 (or later)
* NodeJS v18.15 (or later)
* [tidy-html5](https://github.com/htacg/tidy-html5)

## Development

    # Clone repository
    git clone https://github.com/ReflectsLight/al-quran.reflectslight.io
    cd al-quran.reflectslight.io

    # Setup build environment
    bin/setup

    # List all tasks
    bundle exec rake -T

    # Build website (dev build)
    bundle exec rake nanoc:build

    # Build website (production build)
    bundle exec rake nanoc:build[production]

    # Start web server
    bundle exec rake server

## Configuration

* **server.base_url** <br>
  If you plan to host the website on
  your own domain you should update
  [nanoc.yaml](nanoc.yaml.sample)
  first. In certain places
  links will reference
  https://al-quran.reflectslight.io
  instead of using a relative path.
  For example
  [/src/sitemap.xml.erb](/src/sitemap.xml.erb)
  is one such place. Those links can be updated
  to your own domain by changing the `server.base_url`
  field in
  [nanoc.yaml](nanoc.yaml.sample)
  before running `bundle exec rake nanoc:build`.

* **audio.base_url** <br>
  `audio.base_url` controls what web server serves
  audio content.
  [The default](https://al-quran.reflectslight.io/audio/rifai)
  works out of the box. The URL for an audio file is
  resolved by joining `audio.base_url` and
  `/<surahid>/<ayahid>.mp3`. The `audio.base_url` option
  makes it relatively easy to change the reciter
  at build time, before deploying the website.

  The https://al-quran.reflectslight.io web server
  provides the following recitations:

  - Mishari bin Rashed Alafasy <br>
  https://al-quran.reflectslight.io/audio/alafasy
  - Ahmad bin Ali Al-Ajmi <br>
  https://al-quran.reflectslight.io/audio/alajmi
  - Sahl Yassin <br>
  https://al-quran.reflectslight.io/audio/yassin
  - Hani ar-Rifai <br>
  https://al-quran.reflectslight.io/audio/rifai

  **Note**<br>
  Due to their overall size the audio files are the only
  files **not** kept in this repository. The audio files
  are hosted  by https://al-quran.reflectslight.io instead.

## Thanks

الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ

* Thanks to the graphic artists:
    - [RefreshIcon](/src/js/components/Icon.tsx)
      by
      [Muhammad Haq](https://freeicons.io/profile/823)
* Thanks to the translators:
    - English (The Clear Quran) by Dr. Mustafa Khattab
    - Farsi by Hussain Ansarian
* Thanks to the reciters:
    - Mishari bin Rashed Alafasy
    - Ahmad bin Ali Al-Ajmi
    - Sahl Yassin
    - Hani ar-Rifai

## License

The "source code" is released under the terms of the GPL <br>
See [LICENSE](./LICENSE) for details
