const express = require("express");
const routes = require("./routes");
const cors = require("./app/middlewares/cors");

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.listen(3001, () => {
	console.log("Server is running on port http://localhost:3001");
});
