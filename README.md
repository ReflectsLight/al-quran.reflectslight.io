## About

This repository contains the source code of
[al-quran.reflectslight.io](https://al-quran.reflectslight.io) -
a static website for reading (and listening to)
The Noble Quran. After the website is built,
the build directory consists of HTML, CSS, JavaScript
and other static assets that can be hosted by
a web server such as nginx, apache, etc.

## Requirements

The following languages and tools have to be
installed to build the website from source:

* Ruby 3.1 (or later)
* NodeJS v18.15 (or later)
* [tidy-html5](https://github.com/htacg/tidy-html5)

**Please note** that the audio files are hosted by
https://al-quran.reflectslight.io, and due to
their overall size they are only files **not**
kept in this repository.

## Development

    # Clone repository
    git clone https://github.com/ReflectsLight/al-quran.git
    cd al-quran

    # Setup build environment
    bin/setup

    # List all tasks
    rake -T

    # Build website (dev build)
    rake nanoc:build

    # Build website (production build)
    rake nanoc:build[production]

    # Start web server
    rake server

## Configuration

**server.base_url**

If you plan to host the website on
your own domain you should update
[nanoc.yaml](nanoc.yaml)
first. In certain places
links will reference
https://al-quran.reflectslight.io
instead of using a relative path.
For example
[/src/sitemap.xml.erb](/src/sitemap.xml.erb)
is one such place. Those links can be updated
to your own domain by changing the `server.base_url`
field in
[nanoc.yaml](nanoc.yaml)
before running `rake nanoc:build`.

**audio.base_url**

`audio.base_url` controls what web server serves
audio content. The default
(https://al-quran.reflectslight.io/audio/alafasy)
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

## Thanks

Alhamdulillah

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

## License

The "source code" is released under the terms of the GPL <br>
See [LICENSE](./LICENSE) for details
