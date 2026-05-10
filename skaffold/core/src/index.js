import express from "express"
const app = express()

app.get("/", (req, res) => {
  res.send("Hot relaod is working!")
})

app.listen(3000, () => {
  console.log("Core service listening on port 3000")
})
