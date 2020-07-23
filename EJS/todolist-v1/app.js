const BODY_PARSER = require('body-parser'),
  EXPRESS = require('express'),

  APP = EXPRESS(),
  PORT = 3000;

let items = ["Buy Food"];

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
    kindOfDay: day,
    newListItem: items
  });
});

APP.post('/', (req, res) => {
  items.push(req.body.toDo);
  res.redirect('/');
});

APP.listen(PORT, () => {
  console.log("Listen in port " + PORT);
});
