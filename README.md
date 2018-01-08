# TIMO - Data Microservice

Simple CRUD Webservice, will manage the internal id-to-play database

## Installation

Clone the Repo, run npm install and use node app.js:

1. `git clone https://github.com/TeamTIMO/timo-data.git`
2. `cd timo-data`
3. `npm install`
4. `node app.js`

(We recommend using a process manager like pm2)

## Database

Simple JSON File, hold in memory for faster reading.

__Example:__

```json
[
  {
    "id":"ef5e5247-9cce-4de9-acc9-0d17b3850f94",
    "source":"local",
    "link":"/var/files/test.mp3"
  },
  ...
]
```

### id

UUID, used on the rfid cards

### source

Where is this file? Local, YOuTube, Spotify, ...

### Schema

```json
{
  "definitions": {},
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$id": "http://timo/",
  "type": "object",
  "properties": {
    "id": {
      "$id": "/properties/id",
      "type": "string",
      "title": "The Id Schema",
      "description": "The ID used on the RFID_Card. Type is UUID.",
      "default": "",
      "examples": [
        "ef5e5247-9cce-4de9-acc9-0d17b3850f94"
      ]
    },
    "source": {
      "$id": "/properties/source",
      "type": "string",
      "title": "The Source Schema",
      "description": "The Source of the Audio.",
      "default": "",
      "examples": [
        "local", "youtube", "spotify"
      ]
    },
    "link": {
      "$id": "/properties/link",
      "type": "string",
      "title": "The Link Schema",
      "description": "The Final Link to the Audio File.",
      "default": "",
      "examples": [
        "/var/files/test.mp3"
      ]
    }
  },
  "required": [
    "source",
    "link"
  ]
}
```

### link

Route to File, differs by source

## API

See also docs/api.raml or docs/api.html

* GET / <- return full json
* GET /:id <- return data json for id
* GET /sources <- return all sources
* POST / <- add new entry
* PUT /:id <- update entry with id
* DELETE /:id <- delete entry with id

## Developer Info

Here are some Infos for Developer

### Tests

The Tests are written using the assert-class and can be found in the tests-folder

You may use your favorite Test-Runner to do them yourself.

My Commandline is as follows:

`istanbul cover _mocha -- tests/*.js -R mochawesome`

#### Results

Coverage: docs/coverage/lcov-report/index.html
Mochawesome-Report: docs/mochawesome-report/index.html

### Libs

ClassDiagram:

![The diagram](https://github.com/TeamTIMO/timo-data/raw/master/docs/classes.png "The class Diagram")

Can be found in docs/classes.png

Also as editable plantUML-File.

SequenceDiagram:

![The diagram](https://github.com/TeamTIMO/timo-data/raw/master/docs/sequence.png "The sequece Diagram")

Can be found in docs/sequence.png

Also as editable plantUML-File.

__JSDOC__ in Files. See also HTML Version @ docs/jsdoc/index.html

### Dependencies

* [express](https://www.npmjs.com/package/express)
* [uuidv4](https://www.npmjs.com/package/uuid4)

## Authors

* Dominik Sigmund <dominik.sigmund@webdad.eu>

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

---

## TODO

* Add raml for api
* puml sequence for routes and main
* render stuff and copy to docs
	* raml
	* puml