## About

This repository contains the source for a statically compiled website that can be
used to read The Qur'an.
<br>
The website can be seen live at 
[https://al-quran.reflectslight.io](https://al-quran.reflectslight.io).

## Build the website

The main components of the website's stack are:

- Ruby v3.1.2+
- NodeJS v16.16.0+
- TypeScript
- React

Both Ruby, and NodeJS are left to the reader to install. <br>
After installing Ruby, and NodeJS the website's dependencies can be installed:

```
$ ruby -S gem install bundler --no-document
$ ruby -S bundle install
$ npm i
```

After the dependencies have been installed, the website can be built. <br>
The build will generate the `./build/al-quran` directory:

```
$ ruby -S rake build
```


## Run the website locally

The website can be run on `http://localhost:3000` with the following command:

```
$ ruby -S rake server
```


## Authors

* Gyen Abu Bakar [@gyenabubakar](https://github.com/gyenabubakar)
* 0x1eef [@0x1eef](https://github.com/0x1eef)

## License

This software is released into the Public Domain.
