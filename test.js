const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://beni2002:J-6p!93Jxung.Lz@cluster0.ybgr8tu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  } else {
    console.log("Successfully connected to MongoDB Atlas!");
    client.close();
  }
});