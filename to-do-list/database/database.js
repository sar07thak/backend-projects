const mongoose = require("mongoose");


async function main() {
    
    const url = "mongodb+srv://coder09army:sarthak123@sarthakcluster.avxsiyb.mongodb.net/ToDoList";

    await mongoose.connect(url);

}

module.exports = main ;