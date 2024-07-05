const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");

const url =
  "mongodb+srv://haris2iftikhar:GClTzr15XhkjvN6k@backenddb.nrurtot.mongodb.net/Node-API?retryWrites=true&w=majority";
const dbName = "WorkaholicDB";

const generateProduct = () => {
  return {
    name: faker.commerce.productName(),
    quantity: faker.number.int({ min: 1, max: 100 }),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
  };
};

const populateDatabase = async () => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    const collection = db.collection("products");

    const products = Array.from({ length: 30 }, generateProduct);

    // Log the generated products
    console.log("Generated Products:", products);

    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products were inserted`);

    // Log the result of the insert operation
    console.log("Insert Result:", result);
  } catch (err) {
    console.error("An error occurred:", err.stack);
  } finally {
    await client.close();
  }
};

populateDatabase();
