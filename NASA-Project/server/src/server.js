const PORT = process.env.PORT || 8000;
const MOGO_URL =
  "mongodb+srv://nasa-api:nasaapi123@nasacluster.uvu3kll.mongodb.net/nasa?retryWrites=true&w=majority";
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function startServer() {
  await mongoose.connect(MOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
startServer();
