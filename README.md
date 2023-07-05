<p align="left">
  <a href="https://al-quran.reflectslight.io">
    https://al-quran.reflectslight.io
  </a>
</p>

This repository contains the source code of
[al-quran.reflectslight.io](https://al-quran.reflectslight.io), 
a static website for reading The Quran. After the
website is built, the build directory consists
of HTML, CSS, JavaScript and other static assets
that can be hosted by a regular web server (eg
nginx, apache, etc).

<p align="left">
  <strong>The stack</strong>
</p>

* Ruby 3.1, or later.
* NodeJS v18.15, or later.
* TypeScript

<p align="left">
  <strong>Local development</strong>
</p>

__1. Clone__

    git clone https://github.com/ReflectsLight/al-quran.git
    cd al-quran

__2. Install Ruby, and NodeJS packages__

    bundle install
    npm i

__3. Build website__

    rake build

__4. Start server on localhost__

    rake server

<p align="left">
  <strong>Credits</strong>
</p>

Credit is due to the graphic artists whose art is used by
the website, and with thanks I credit the following graphic
files to their respective authors:

* [/src/favicon.png](/src/favicon.png)
  by
  [Aficons](https://freeicons.io/profile/9247).
* [/src/images/moon.svg](/src/images/moon.svg)
  by
  [Aficons](https://freeicons.io/profile/9247).
* [/src/images/leaf.svg](/src/images/leaf.svg)
  by
  [Fasil](https://freeicons.io/profile/722).

Credit is due to the people who translated The Quran from
Arabic to other languages, and with thanks I credit the
following translations to their respective authors:

* English (The Clear Quran) by Dr. Mustafa Khattab
