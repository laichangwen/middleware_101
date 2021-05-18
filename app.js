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
  let stime = Date.now()
  next()
  let etime = Date.now()
  console.log(`${dateFormat(stime, "yyyy-mm-dd h:MM:ss")} | ${req.method} from ${req.originalUrl} total time: ${etime - stime}ms `)
})


app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})
 
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})