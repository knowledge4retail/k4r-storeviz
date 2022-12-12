import express from 'express'
import path from 'path'
import http from 'http'

const port: number = 3000

class App {
  private server: http.Server
  private port: number

  constructor(port: number) {
    this.port = port
    const app = express()
    app.use(express.static(path.join(__dirname, '../client')))

    // to use this server.ts
    // # npm run build        (this creates the production version of bundle.js and places it in ./dist/client/)
    // # tsc -p ./src/server  (this compiles ./src/server/server.ts into ./dist/server/server.js)
    // # npm start            (this starts nodejs with express and serves the ./dist/client folder)

    this.server = new http.Server(app)
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`)
    })
  }
}

new App(port).Start()
