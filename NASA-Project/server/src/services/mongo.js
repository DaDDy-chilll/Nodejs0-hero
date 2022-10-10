const mongoose = require('mongoose');
const MOGO_URL = process.env.MOGO_URL;
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