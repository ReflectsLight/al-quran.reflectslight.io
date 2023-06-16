<p align="center">
  <a href="https://al-quran.reflectslight.io">
    https://al-quran.reflectslight.io
  </a>
</p>

This git repository contains the source code of a statically compiled
website for reading The Quran. After the website is compiled, it consists
of HTML, CSS, JavaScript and other static assets that can be hosted on a
regular web server. The repository is optimized for nginx, and (Free|Open)BSD
as a deployment target. The source code is a mixture of Ruby, TypeScript, and
JavaScript with React being the driving force on the frontend.

<p align="center">
  <strong>Open Source</strong>
</p>

The source code is released under the terms of the GNU Public License (GPL).
No restrictions are placed on the right to modify, copy, redistribute or host
the website on a web server / domain of your own as long as it is done in
accordance with the GPL. See
[LICENSE](./LICENSE)
for a copy of the license, and see
[TLDRLegal](https://www.tldrlegal.com/license/gnu-general-public-license-v3-gpl-3)
for a short summary of the GPL.

<p align="center">
  <strong>Local install</strong>
</p>

__1. Clone repository__

    git clone https://github.com/ReflectsLight/al-quran.git
    cd al-quran

__2. Check dependencies__

The `bin/check-dependencies` script will check that the required
dependencies are available: Ruby, NodeJS, nginx, et cetera.

    $ ./bin/check-dependencies

Assuming it was a success:

    found: ruby
    found: bundle
    found: node
    found: npm
    found: nginx
    found: doas

Otherwise, the dependencies that are missing will be listed. All
dependencies should be found before proceeding to the next step.

__3. Install packages__

At this step we're ready to install Ruby, and NodeJS packages:

    $ npm install
    $ bundle install --path=.bundle/

<p align="center">
  <strong>Credits</strong>
</p>

Credit is due to a number of graphic artists whose work is used by
this project, and with thanks I credit the following graphic files to their
respective authors:

* [/src/favicon.png](/src/favicon.png)
  by
  [Aficons](https://freeicons.io/profile/9247).
* [/src/images/moon.svg](/src/images/moon.svg)
  by
  [Aficons](https://freeicons.io/profile/9247).
* [/src/images/leaf.svg](/src/images/leaf.svg)
  by
  [Fasil](https://freeicons.io/profile/722).

Credit is due to the people who translated The Quran from Arabic to other
languages, and with thanks I credit the following translations to their
respective authors:

* English (The Clear Quran) by Dr. Mustafa Khattab
