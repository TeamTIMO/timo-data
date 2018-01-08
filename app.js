/**
 * @overview Data Microservice Server File
 * @module index
 * @author Dominik Sigmund
 * @version 0.1
 * @description Starts the Server and keeps it running
 * @memberof timo-data
 * @requires express
 * @requires lib/database
 * @requires uuid
 */

 // Require needed modules
 console.log('Starting up TIMO-Dataservice...')
 console.log('Pulling in dependencies...')
 var config = require('./config.json')
 /**
 * express module
 * @const
 */
 var express = require('express')
 var bodyParser = require('body-parser')
 var app = express()
 var server = require('http').createServer(app)
 const uuid = require('uuid4')
 var Database = require('./lib/database.js')

// Accept JSON Body
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({
   extended: true
 }))

// Overwrite DBFile Location
 if (process.argv.length >= 3) {
   config.dbfilelocation = process.argv[2]
 }
 var myDB = new Database(config.dbfilelocation, uuid)

// Listen to Port
 if (process.argv.length >= 4) {
   config.port = process.argv[3]
 }
 server.listen(config.port)
 console.log('TIMO-Dataservice running on ' + config.port)

// Routes
 app.get('/', function (req, res) {
   myDB.list(function (err, list) {
     if (err) {
       res.status(500).send(err)
     } else {
       res.send(list)
     }
   })
 })
 app.get('/sources', function (req, res) {
   myDB.sources(function (err, sources) {
     if (err) {
       res.status(500).send(err)
     } else {
       res.send(sources)
     }
   })
 })
 app.get('/:id', function (req, res) {
   myDB.getEntry(req.params.id, function (err, entry) {
     if (err) {
       res.status(404).send(err)
     } else {
       res.send(entry)
     }
   })
 })
 app.post('/', function (req, res) {
   console.log(req.body)
   myDB.addEntry(req.body, function (err, entry) {
     if (err) {
       res.status(400).send(err)
     } else {
       res.status(201).send(entry)
     }
   })
 })
 app.put('/:id', function (req, res) {
   myDB.updateEntry(req.params.id, req.body, function (err, entry) {
     if (err) {
       res.status(err.status).send(err.error)
     } else {
       res.send(entry)
     }
   })
 })
 app.delete('/:id', function (req, res) {
   myDB.deleteEntry(req.params.id, function (err, entry) {
     if (err) {
       res.status(404).send(err)
     } else {
       res.send(true)
     }
   })
 })

/** Handles exitEvents by destroying open connections first
 * @function
* @param {object} options - Some Options
* @param {object} err - An Error Object
*/
 function exitHandler (options, err) {
   console.log('Exiting...')
   process.exit()
 }
  // catches ctrl+c event
 process.on('SIGINT', exitHandler)
  // catches uncaught exceptions
 process.on('uncaughtException', function (err) {
   console.error(err)
   exitHandler(null, err)
 })

  // keep running
 process.stdin.resume()
