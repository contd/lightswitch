const TPLSmartDevice = require('tplink-lightbulb')
const Promise = require("bluebird")
const Wemo = require('wemo-client')
const express = require('express')

const app = express()
const light = new TPLSmartDevice('192.168.200.129')
const wemo = new Wemo()
let client

wemo.discover(function(err, deviceInfo) {
  client = wemo.client(deviceInfo)
})

const wemoOn = function() {
  return new Promise((resolve, reject) => {
    resolve(client.setBinaryState(1))
  })
}

const wemoOff = function() {
  return new Promise((resolve, reject) => {
    resolve(client.setBinaryState(0))
  })
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/tpstate', function(req, res) {
  light.info()
    .then(info => {
      res.send({lightState: info.light_state.on_off})
    })
    .catch(err => res.send({error: err}))
})

app.get('/tpon', function(req, res) {
  light.power(true)
    .then(status => {
      //console.log(status)
      res.send(status)
    })
    .catch(err => res.send(err))
})

app.get('/tpoff', function(req, res) {
  light.power(false)
    .then(status => {
      //console.log(status)
      res.send(status)
    })
    .catch(err => res.send(err))
})

app.get('/wemostat', function(req, res) {
  client.getBinaryState((err, state) => {
    res.send({lightState:state})   
  })
})

app.get('/wemon', function(req, res) {
  wemoOn()
    .then(status => {
      //console.log("wemo on")
      res.send("wemo on")
    })
    .catch(err => res.send(err))
})

app.get('/wemoff', function(req, res) {
  wemoOff()
    .then(status => {
      //console.log("wemo off")
      res.send("wemo off")
    })
    .catch(err => res.send(err))
})

app.listen(3000, () => console.log('Listening on http://localhost:3000/'))
