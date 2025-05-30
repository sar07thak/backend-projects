const express = require("express");
const app = express() ;
const cookieParser = require("cookie-parser");
const path = require("path");
const main = require("./database/database");
const ownerRouter = require("./routes/ownerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const homeRouter = require("./routes/index");
const flash = require("connect-flash");
const expressSession = require("express-session");


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded( { extended : true }))
app.use(
    expressSession({
        resave : false ,
        saveUninitialized : false ,
        secret : process.env.SECRET_KEY 
    })
)
app.use(flash())
app.use(express.static(path.join( __dirname , "public" )))
app.set("view engine" , "ejs")


//* here are the routes 
app.use("/", homeRouter);
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