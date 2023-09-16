## About

"Quran" is a library that provides a TypeScript interface to The Holy Quran. <br>
The library assumes the source of data will be provided by the
[ReflectsLight/quran-json](https://github.com/ReflectsLight/quran-json) <br>
repository - a separate project that provides the contents of The Quran in <br>
the JSON format, and in multiple languages.

## Development

"Quran" is structured as a typical TypeScript project, and
[ReflectsLight/quran-json](https://github.com/ReflectsLight/quran-json) <br>
is included as a git submodule for the purposes of development and testing <br>.

A Git submodule is essentially a reference to a specific commit in <br>
another git repository. Submodules can be used to clone and track changes <br>
in a git repository that's external to the repository they're referenced from. <br>
The process for obtaining the contents of a submodule:

    $ git submodule init
    $ git submodule update

## License

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).

