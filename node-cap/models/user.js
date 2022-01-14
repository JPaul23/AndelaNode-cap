/* Users models MongoDB */
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

var User = new Schema({
    id: {
        type: String,
        default: uuidv4()
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('User', User);
module.exports = userModel;