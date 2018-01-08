# TIMO - Data Microservice

Simple CRUD Webservice, will manage the internal id-to-play database

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

### link

Route to File, differs by source

## API

* GET / <- return full json
* GET /:id <- return data json for id
* GET /sources <- return all sources
* POST / <- add new entry
* PUT /:id <- update entry with id
* DELETE /:id <- delete entry with id

## TODO

* Add raml for api
* testcases
* code coverage
* puml class diagrams
* puml sequence for routes and main
* jsdoc
* build stuff
	* jsdoc
	* tests
	* code coverage
	* raml
	* puml
	* json-schema
	* add commandos and results to this file