const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const mongoose = require('mongoose')
const db = require('./config/keys').mongo
const uplRoute = require('./routes/upload')
const merRoute = require('./routes/meritList')
const deptRoute = require("./routes/department");
const userRoute = require('./routes/users')
const path = require('path')


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
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
app.use( '/api', uplRoute );
app.use('/api/mer',merRoute);
app.use('/api/dept', deptRoute)
app.use('/api/users', userRoute)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server connected on the port at ${port}`);
});