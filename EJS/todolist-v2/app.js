const BODY_PARSER = require('body-parser'),
  EXPRESS = require('express'),
  MONGOOSE = require('mongoose')
  APP = EXPRESS(),
  PORT = 3000;

//let items = ["Buy Food"];
let workItems = [];

function toDayOfWeek(val) {
  switch (val) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Thuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturday";
  }
}

MONGOOSE.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = {
  name: {
    type: String,
    required: true
  }
}

const Item = MONGOOSE.model('Item', itemsSchema);

// INSERT NEW ITEMS
const item1 = new Item({
  name: "Welcome to your todoList!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item"
});
const item3 = new Item({
  name: "<-- Hit this to delete an item"
});
const defaultItems = [item1, item2, item3];

// Tells app to use EJS
APP.set('view engine', 'ejs')
// Body Parser
APP.use(BODY_PARSER.urlencoded({
  extended: true
}));
APP.use(EXPRESS.static('public'))

/**
 * ROUTE
 */
APP.get('/', (req, res) => {
  let today = new Date();
  let day = toDayOfWeek(today.getDay());

  // List all items in 'Items' document
  Item.find({}, function(err, items) {
    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully");
        }
      });
      res.redirect('/');
    } else {
      res.render('list', {
        listTitle: day,
        newListItem: items
      });
    }
  });
});

APP.post('/', (req, res) => {

  let itemName = req.body.toDo;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    let item = new Item({
      name: itemName
    });

    item.save();
    res.redirect('/');
  }
});

APP.get('/:paramName', (req, res) => {
  let param = req.params.paramName;


});

APP.post('/delete', (req, res) => {
  const checkedItemID = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemID, function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

APP.get('/work', (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItem: workItems
  });
});

APP.post('/work', (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

APP.get('/about', (req, res) => {
  res.render("about");
});

/**
 * Listen
 */
APP.listen(PORT, () => {
  console.log("Listen in port " + PORT);
});
