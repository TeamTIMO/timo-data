/**
 * @overview Database Lib
 * @module database
 * @author Dominik Sigmund
 * @version 0.9
 * @description Management of Memory Database and File-I/O
 * @memberof timo-data
 * @requires fs
 */
const fs = require('fs')
function Database (dbfile, uuid) {
  var self = {}
  self.file = dbfile
  self.uuid = uuid
  self.entries = JSON.parse(fs.readFileSync(self.file, 'utf8'))
  self.list = list
  self.sources = sources
  self.get = getEntry
  self.add = addEntry
  self.update = updateEntry
  self.delete = deleteEntry
  self.saveFile = saveFile
  return self
}

function list (callback) {
  callback(null, this.entries)
}
function sources (callback) {
  var sources = []
  for (let index = 0; index < this.entries.length; index++) {
    const element = this.entries[index]
    if (sources.indexOf(element.source) < 0) {
      sources.push(element.source)
    }
  }
  callback(null, sources)
}
function getEntry (id, callback) {
  for (let index = 0; index < this.entries.length; index++) {
    if (this.entries[index].id === id) {
      return callback(null, this.entries[index])
    }
  }
  callback(new Error('No Entry with id ' + id + ' found'))
}
function addEntry (entry, callback) {
  if (entry.hasOwnProperty('source') && entry.hasOwnProperty('link')) {
    entry.id = this.uuid.uuid()
    this.entries.push(entry)
    this.saveFile(function (err) {
      if (err) {
        callback(err)
      } else {
        callback(null, entry)
      }
    })
  } else {
    callback(new Error('Entry not wellformed: ' + entry))
  }
}
function updateEntry (id, entry, callback) {
  var updateIndex = this.entries.map(function (item) { return item.id }).indexOf(id)
  if (updateIndex > -1) {
    if (entry.hasOwnProperty('source') && entry.hasOwnProperty('link')) {
      entry.id = id
      this.entries[updateIndex] = entry
      this.saveFile(function (err) {
        if (err) {
          callback(err)
        } else {
          callback(null)
        }
      })
    } else {
      callback(new Error('Entry not wellformed: ' + entry))
    }
  } else {
    callback(new Error('No Entry with id ' + id + ' found'))
  }
}
function deleteEntry (id, callback) {
  var removeIndex = this.entries.map(function (item) { return item.id }).indexOf(id)
  if (removeIndex > -1) {
    this.entries.splice(removeIndex, 1)
    this.saveFile(function (err) {
      if (err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  } else {
    callback(new Error('No Entry with id ' + id + ' found'))
  }
}

function saveFile (callback) {
  fs.writeFile(this.file, JSON.stringify(this.entries), 'utf8', callback)
}
module.exports = Database
