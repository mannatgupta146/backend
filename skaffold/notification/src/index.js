import express from "express"
const app = express()

app.get("/", (req, res) => {
  res.send(
    "This is the root of the notification service. Try /api/notification",
  )
})

app.get("/api/notification", (req, res) => {
  res.send("Hello from notification service")
})

app.listen(3001, () => {
  console.log("Notification service listening on port 3001")
})
