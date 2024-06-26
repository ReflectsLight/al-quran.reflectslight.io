## Introduction

This post documents the process
that should be followed when adding
a new language to the website.

Ideally the process would require a
minimal amount of manual work and be
fast to complete but we're not there
yet.

The process:

* Add new locale to file 'Rules'
  (/Rules)
* Add new locale to array 'Quran.locales'
  (/packages/Quran/src/index.ts)
* Add new locale (+ translations)
  (/src/json/t.json)
  (/src/json/surahs.json)
  (/src/json/<locale>/<surahId>/{info,surah}.json)

Tip:

`src/json/<locale>/<surahId>/info.json` can be generated
automatically from the contents of `src/json/surahs.json`
via: `rake t:surahs.json`
