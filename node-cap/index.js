import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());


//Simple logger
app.use('/', function(req, res, next){
    console.log(req.method +' '+ req.path+ ' - '+ req.ip);
    next();
  });

//server the homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Homepage');
});

//setup the port
var PORT = 5000;

app.listen(PORT, ()=>
    console.log(`Node is listening on http://localhost:${PORT} ...`)
);

/* app.listen(port, () =>
  console.log(`Server running on port: `)
); */