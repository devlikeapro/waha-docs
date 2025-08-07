```javascript
const express = require("express");
const app = express();
app.use(express.json());

app.post("/bot", (req, res) => {
  const data = req.body;
  if (data.event !== "message") {
    // Process the message, save it, etc.
    processMessage(data.payload);
  }
  res.send("OK");
});

app.listen(3000, () => console.log("Bot is running on port 3000"));
```
