const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017';
const DBTOCONNECT = '/fruitsDB'

mongoose.connect(URL + DBTOCONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

/**
 * Fruit
 */
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please chack ypur data entry"]
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  review: String
});
// Mongoose Model
const Fruit = mongoose.model("Fruit", fruitSchema);
// Create fruit documents
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

const mango = new Fruit({
  name: "Mango",
  rating: 6,
  review: "Decent fruit"
});
mango.save();

// Store fruit to document
//fruit.save();

/**
* Person
*/
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "John",
  age: 37
});
//person.save();

// Update person
Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfull");
  }
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit"
});
const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour for me"
});
const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture"
});

// Add multiple fruits
/*Fruit.insertMany([kiwi, orange, banana], function(err) {
  if (err){
    console.log(err);
  } else {
    console.log("Succesfully saved");
  }
});*/


// Get all Fruits
Fruit.find(function(err, fruits){
  mongoose.connection.close();

  if (err) {
    console.log(err);
  } else {
    fruits.forEach(fruit =>
      console.log(fruit.name)
    );
  }
});
