TIMO - Data Microservice
========================

Simple CRUD Webservice, will manage the internal id-to-play database

# Database
Simple JSON File, hold in memory for faster reading  
Example:
```json
[
	{
		"id":"rfid-id",
		"source":"local",
		"link":"/var/files/test.mp3"
	},
	...
]
```
## id
UUID, used on the rfis cards

## source
Where is this file? Local, YOuTube, Spotify, ...

## link
Route to File, differs by source

# API
* GET /list <- return full json
* GET /:id <- return data json for id
* GET /sources <- return all sources
* POST / <- add new entry
* PUT /:id <- update entry with id
* DELETE /:id <- delete entry with id

# TODO
* Add raml for api
* code routes
* lib database
* jsonschema
* testcases
* code coverage
* build script (testresults into html)