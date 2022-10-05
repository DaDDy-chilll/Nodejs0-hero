const mongoose = require('mongoose');
const MOGO_URL =
  "mongodb+srv://nasa-api:nasaapi123@nasacluster.uvu3kll.mongodb.net/nasa?retryWrites=true&w=majority";
mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
    console.error(err);
});

async function mongoConnect(){
    await mongoose.connect(MOGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
};

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDisconnect,
}