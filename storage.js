//Very simple key-value storage with simple REST api
//(c) Tombic 2017
//

var express = require('express');
var app = express();

function measure(key, value){
    this.key = key;
    this.value=value;
    this.timestamp=Date.now() / 1000;
}

function searchdb(key){
    for (var i = 0; i < db.length; i++) {
        if ( db[i].key == key )
            return i;
    } 
    return -1;
}

var db = new Array();


console.log("Registering endpoint: /put");
app.get('/put', function(req, res){
    console.log("/put:" + JSON.stringify(req.query));
    if ( req.query.key && req.query.value ) {
        var idx=searchdb(req.query.key);
        if ( idx >= 0 ) {
            db[idx].value = req.query.value;
            db[idx].timestamp = Date.now() / 1000;
            res.sendStatus(200);
        } else {
            db.push(new measure(req.query.key, req.query.value ));
            res.sendStatus(200);            
        }
    } else {
        res.sendStatus(404);        
    }
});

console.log("Registering endpoint: /get");
app.get('/get', function(req, res){
    console.log("/get:" + JSON.stringify(req.query));
    if ( req.query.key ) {
        var idx=searchdb(req.query.key);
        if ( idx >= 0 ) {
            if (req.query.timeout){
                var timeout = 1 * req.query.timeout + db[idx].timestamp;
                var nowtime = Date.now() / 1000;
                if ( timeout > nowtime ) {
                    response=db[idx].value.toString();
                    res.send(response);
//ok                    
                } else {
                    res.sendStatus(404);
//timeout
                }
            } else {
//found
                response=db[idx].value.toString();
                res.send(response);
            }
        } else {
            res.sendStatus(404);            
        }
    } else {
        res.sendStatus(404);        
    }

});

console.log("Registering endpoint: /json");
app.get('/json', function(req, res){
    console.log("/json:" + JSON.stringify(req.query));
    if ( req.query.key ) {
        var idx=searchdb(req.query.key);
        if ( idx >= 0 ) {
            response=JSON.stringify(db[idx].value);
            res.send(response);
        } else {
            res.sendStatus(404); 
        }
    } else {
        res.send( db );
    }
});

app.listen(3000);
