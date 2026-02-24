const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");
const {geoMaker} = require("../utils/geoMaker.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const processed = [];

  for (const obj of initData.data) {
    try {
      const geometry = await geoMaker(obj.location);
      processed.push({
        ...obj,
        owner: "6880c473f760ba45eca1c0c8",
        geometry
      });

      await new Promise((res) => setTimeout(res, 1000));
    } catch (err) {
      console.error(`Error geocoding ${obj.location}:`, err.message);

      processed.push({
        ...obj,
        owner: "6880c473f760ba45eca1c0c8",
        geometry: {
          type: "Point",
          coordinates: [73.8545071, 18.5213738] 
        }
      });
    }
  }

  await Listing.insertMany(processed);
  console.log("data was initialized with geometry");
};

initDB();
