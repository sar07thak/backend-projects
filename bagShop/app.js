const express = require("express");
const app = express() ;
const cookieParser = require("cookie-parser");
const path = require("path");
const main = require("./database/database");
const ownerRouter = require("./routes/ownerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded( { extended : true }))
app.use(express.static(path.join( __dirname , "public" )))
app.set("view engine" , "ejs")


//* here are the routes 
app.use("/owner" , ownerRouter) ;
app.use("/users" , userRouter) ;
app.use("/products" , productRouter) ;






main()
.then(()=>{
    app.listen(process.env.PORT , () => {
        console.log("App started to listen at port");
    })
})
.catch((err) => {
    console.log("Error : " , err.message );
})