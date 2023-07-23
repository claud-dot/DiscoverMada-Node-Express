const http = require("http");
const app = require("./app");;
const port = 3000;

app.set("port", process.env.PORT || port);
const server = http.createServer(app);
server.listen(port, () => {
  process.env.PORT || port,
  console.log(`Server is running on http://localhost:${port}`);
});
