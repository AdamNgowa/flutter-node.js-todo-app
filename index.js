const app = require("./app");
const port = 3000;
const db = require("./config/db");
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
