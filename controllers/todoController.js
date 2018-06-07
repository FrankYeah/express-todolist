var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
mongoose.connect('mongodb://frankyeah:rst121468881@ds245210.mlab.com:45210/todos');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

// var data = [{item: 'get milk'}, {item:'walk dog'}, {item: 'kick some coding ass'}];

module.exports = function(app){
    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        var itemOne = Todo(req.body).save(function(err, data){
          if(err) throw err;
          res.json(data);
          
});     
});

//從服務器中把數據取出來，取出post數據要用body-parser

    app.delete('/todo/:item', function(req, res){
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, "-") != req.params.item;
        // });
        Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });        
    });
}