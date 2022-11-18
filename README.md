## About

This repository contains a statically compiled website for reading The Qur'an. <br>
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

The website can then be built by running:

```
$ ruby -S rake build
```

The above command will generate the static website in `./build/al-quran`.

## View the website

The website can be viewed on localhost by running:

```
$ ruby -S rake server
```

The above command will call `rake build`, and afterwards start a web server running 
on `http://localhost:3000`.


## Authors

* Gyen Abu Bakar [@gyenabubakar](https://github.com/gyenabubakar)
* 0x1eef [@0x1eef](https://github.com/0x1eef)

## License

This software is released into the Public Domain.



