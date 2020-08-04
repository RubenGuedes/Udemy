const BODY_PARSER = require('body-parser'),
      EXPRESS = require('express'),
      MONGOOSE = require('mongoose'),
      _ = require('lodash'),

      APP = EXPRESS();

const WEEKDAYS = ["Sunday", "Monday", "Thuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function toDayOfWeek(val) {
    return WEEKDAYS[val];
}

function isWeekDay(str) {
    return WEEKDAYS.includes(str);
}

/*MONGOOSE.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

MONGOOSE.connect(
    "mongodb+srv://admin-Ruben:zxcasdzxc@cluster0.a19ni.mongodb.net/todolistDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

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

/**
 * New Schema
 */
const listSchema = {
    name: {
        type: String,
        required: true
    },
    items: [itemsSchema]
};
// Model
const List = MONGOOSE.model('List', listSchema);

// Tells app to use EJS
APP.set('view engine', 'ejs')
// Body Parser
APP.use(BODY_PARSER.urlencoded({extended: true}));
APP.use(EXPRESS.static('public'))

/**
 * ROUTE
 */
APP.get(
    '/',
    (req, res) => {
        let today = new Date();
        let day = toDayOfWeek(today.getDay());

        // List all items in 'Items' document
        Item.find(
            {},
            function(err, items) {
                if (items.length === 0)
                {
                    Item.insertMany(
                        defaultItems,
                        function(err) {
                            if (err)
                                console.log(err);
                            else
                                console.log("Succesfully");
                        }
                    );

                    res.redirect('/');
                }
                else
                    res.render('list', {listTitle: day, newListItem: items});
            }
        );
    }
);

APP.post(
    '/',
    (req, res) => {

        const itemName = req.body.toDo;
        const listName = req.body.list;
        const item = new Item( {name: itemName} );

        if (isWeekDay(listName)) // === 'Today')
        {
            item.save();
            res.redirect('/');
        }
        else
        {
            List.findOne(
                {name: listName},
                function(err, foundList) {
                    foundList.items.push(item);

                    foundList.save();
                    res.redirect('/' + listName);
                }
            );
        }
    }
);

APP.get(
    '/:paramName',
    (req, res) => {
        const customListName = _.capitalize(req.params.paramName);

        List.findOne(
            {name: customListName},
            function(err, foundList) {
                if (!err)
                {
                    if (!foundList)
                    {
                        const list = new List({name: customListName, items: defaultItems});

                        list.save();
                        res.redirect('/' + customListName);
                    }
                    else
                        res.render('list', {listTitle: foundList.name, newListItem: foundList.items});
                }
            }
        );
    }
);

APP.post(
    '/delete',
    (req, res) => {
        const checkedItemID = req.body.checkbox;
        const listName = req.body.listName;

        if (isWeekDay(listName)) //  === 'Today')
        {
            Item.findByIdAndRemove(
                checkedItemID,
                function(err) {
                    if (!err) {
                        console.log("Success");
                        res.redirect('/');
                    }
                }
            );
        }
        else
        {
            List.findOneAndUpdate(
                {name: listName},
                {$pull: {items: {_id: checkedItemID}}},
                function(err, foundList) {
                    if (!err) {
                        res.redirect('/' + listName);
                    }
                }
            );
        }
    }
);

APP.get(
    '/about',
    (req, res) => {
        res.render("about");
    }
);

/**
 * Listen
 */
 let port = process.env.PORT;
 if (port == null || port == "") {
     port = 3000;
 }
APP.listen(
    port,
    () => {
        console.log("Listen in port " + port);
    }
);
