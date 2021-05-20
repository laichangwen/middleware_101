// app.js
const express = require('express')

const app = express()
const port = 3000
const dateFormat = require('dateformat')

app.use( function(req, res, next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  return next();

})


app.use((req, res, next) => {
  const stime = new Date()
  res.on("finish", () => {
    const timediff = Date.now() - stime
    console.log(`${dateFormat(stime, "yyyy-mm-dd HH:MM:ss")} | ${req.method} from ${req.originalUrl} total time: ${timediff}ms `)
  })
  next()
})


app.get('/', (req, res) => {
  res.send(`列出全部 Todo
  <div class="row">
  <div class="col auto">
    <a class="btn btn-secondary" href="/new">Create</a>
    <a class="btn btn-success" href="/random_id">Show one todo</a>
    <form action="/" method="POST" style="display: inline;">
      <div class="input-group-append">
        <button class="btn btn-success" type="submit">Submit</button>
      </div>
    </form>
  </div>
  </div>`)
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})
 
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send(`新增一筆  Todo`)
})


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})