const BODY_PARSER = require('body-parser'),
  EXPRESS = require('express'),

  APP = EXPRESS(),
  PORT = 3000;

let items = ["Buy Food"];
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

// Tells app to use EJS
APP.set('view engine', 'ejs')
// Body Parser
APP.use(BODY_PARSER.urlencoded({extended: true}));
APP.use(EXPRESS.static('public'))


APP.get('/', (req, res) => {
  let today = new Date();
  let day = toDayOfWeek(today.getDay());

  res.render('list', {
    listTitle: day,
    newListItem: items
  });
});

APP.post('/', (req, res) => {

  let item = req.body.toDo;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }

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

APP.listen(PORT, () => {
  console.log("Listen in port " + PORT);
});
