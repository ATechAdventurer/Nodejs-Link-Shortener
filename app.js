//let express = require('express')
let storage = require('node-persist')
//let app = express()

let init = () => {
  storage.initSync()
  return storage.getItem()
}

console.log(init())