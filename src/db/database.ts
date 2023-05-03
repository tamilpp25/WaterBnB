import mongoose from "mongoose";
import Config from "../utils/Config";

export function connect(){

    mongoose.Promise = Promise;
    mongoose.connect(Config.MONGO_URI)
    mongoose.connection.on('connected', function() {
        console.log("[DATABASE] connection established successfully");
    });
    
}