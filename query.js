var https     = require('https');
var http     = require('http');
var express  = require('express');

var params   = {};
var app      = express();
var server   = http.createServer(app);
var mysql    = require('mysql');
var fs       = require('fs');

var connection  = mysql.createConnection({
    host : ''
    user : '',
    password : '',
    database : ''
});

//express stuff
app.use("/", express.static(__dirname));

app.use(express.bodyParser());

app.post('/authByUser', function(req,res){
    connection.query('SELECT COUNT(*) AS thecount, InitiatorType FROM activity WHERE DATE(EventTime) = CURDATE() AND EventName = \'Authentication\' GROUP BY InitiatorType ORDER BY thecount DESC', function(err, rows){
        res.send(rows);
    });
});

app.post('/usageStats', function(req,res){
    connection.query('SELECT COUNT(*) as thecount, EventName FROM activity WHERE DATE(EventTime) = CURDATE() GROUP BY EventName ORDER BY thecount DESC', function(err, rows){
        res.send(rows);
    });
});

app.get('/getData', function(req, res){
    var testObj  = {
        "name": "",
        "children": []
    };
    connection.query('SELECT COUNT(*) AS size, `EventName`, `InitiatorType` FROM `activity` WHERE `EventName` != \'Authentication\' AND `InitiatorType` != \'Developer\' GROUP BY `EventName`, `InitiatorType` HAVING size > MIN(size) + 30 ORDER BY size DESC' , function(err, rows){
        if(err){console.log(err);}
        var pushArr = [];
        var UserTypes = [];
        for(i = 0; i < rows.length; i++){
            var flipper = false;
            var rowObj = rows[i];
            testObj.children.forEach(function(item){
                if(item.name === rowObj.InitiatorType){ flipper = true; }
            });
            if( flipper === false ){
                testObj.children.push({'name': rowObj.InitiatorType, 'children': []});    
            }
        }
        for(i = 0; i < rows.length; i++){
            var rowObj = rows[i];
            testObj.children.forEach(function(item){
                if(rowObj.InitiatorType === item.name){
                    item.children.push({'name': rowObj.EventName, 'size': rowObj.size});    
                };
            })
        }
        //testObj['children'] = pushArr;
        res.send(testObj);
    });
});

connection.on('error', function() {
    connection  = mysql.createConnection({
        host : 'xxxxx', //23.226.233.30
        user : 'xxxxx',
        password : 'xxxxx',
        database : 'xxxxx'
    });
});

app.get('/testViz', function(req, res){
    res.send(testObj);
});

server.listen(8089, function(){
    console.log('server running');
});
