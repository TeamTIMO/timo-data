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
    "type":"mp3",
    "subtype":"single",
    "link":"/var/files/test.mp3",
    "comment":"my first mp3"
  },
  ...
]
```

### id

UUID, used on the rfid cards

### type

What is this file? mp3, YOuTube, Spotify, ...
(Decides, which player-lib is used)

### subtype

Helps the player-lib to decide what to do

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
    "type": {
      "$id": "/properties/type",
      "type": "string",
      "title": "The Type Schema",
      "description": "The Type of the Audio.",
      "default": "",
      "examples": [
        "mp3", "youtube", "spotify"
      ]
    },
    "subtype": {
      "$id": "/properties/subtype",
      "type": "string",
      "title": "The Subtype Schema",
      "description": "The Subtype of the Audio.",
      "default": "",
      "examples": [
        "single", "album", "playlist"
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
    },
    "comment": {
      "$id": "/properties/comment",
      "type": "string",
      "title": "The comment Schema",
      "description": "Some Comment to Help identify the entry",
      "default": "",
      "examples": [
        "My First mp3"
      ]
    }
  },
  "required": [
    "type",
    "subtype",
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
* GET /types <- return all types in database
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

![The class diagram](https://github.com/TeamTIMO/timo-data/raw/master/docs/classes.png "The class Diagram")

Can be found in docs/classes.png

Also as editable plantUML-File.

SequenceDiagram:

![The sequence diagram](https://github.com/TeamTIMO/timo-data/raw/master/docs/sequence.png "The sequence Diagram")

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