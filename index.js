const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const mongoose = require('mongoose')
const db = require('./config/keys').mongo
const uplRoute = require('./routes/upload')
const merRoute = require('./routes/meritList')
const deptRoute = require("./routes/department");


let app = express();
app.use( cors() );
app.use( bodyParser.json() );
app.use(
  bodyParser.urlencoded( {
    extended: false
  } )
);
mongoose.connect(db,{
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})
.then(res=>console.log('MongoDB Connected'))
.catch(err=>console.log(err))
app.use( '/', uplRoute );
app.use('/mer',merRoute);
app.use('/dept', deptRoute)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server connected on the port at ${port}`);
});