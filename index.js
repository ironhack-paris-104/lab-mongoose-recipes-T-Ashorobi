const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recette = [
  {
    title: "Peanut butter and Jelly",
    level: "Easy Peasy",
    ingredients: ["Peanut butter", "Jelly", "2 slices of Bread"],
    cuisine: "American",
    dishType: "snack",
    duration: 2,
    creator: "unknown",
  },
  {
    title: "Cheeseburger",
    level: "Amateur Chef",
    ingredients: [
      "viande hachee",
      "burger bun",
      "lettuce",
      "tomato",
      "pickles",
      "cheese",
    ],
    cuisine: "American",
    dishType: "main_course",
    // image:,
    duration: 5,
    creator: "An American Chef",
  },
];

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then((x) => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany();
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//     Recipe.create({
//       title: "Peanut butter and Jelly",
//       level: "Easy Peasy",
//       ingredients: ["Peanut butter", "Jelly", "2 slices of Bread"],
//       cuisine: "American",
//       dishType: "snack",
//       // image:,
//       duration: 2,
//       creator: "unknown"
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database", error);
//   });

mongoose
  .connect(MONGODB_URI)
  .then(async (db) => {
    console.log(`connected to ${db.connection.name}`);

    try {
      await Recipe.deleteMany();
      const createdRecepies = await Recipe.create(recette);
      console.log(recette[1].title);
      console.log(recette[0].title);
      console.log(createdRecepies);

      const cookBook = await Recipe.insertMany(data);
      console.log(cookBook);

      const rigatoni = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
        // Its not updated in my console but has been updated on mongoDB...idk why?
      );
      console.log("success");
      //Even clg the variable stil shows the previous duration?
      console.log(rigatoni);

      const noCarrotCake = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log(`Deletion of Carrot Cake is a success`);
      console.log(noCarrotCake);
    } catch (error) {
      console.log(error.message);
    }
  })
  .catch((error) => console.log(error.message))
  .finally(() => {
    mongoose.disconnect();
  });
