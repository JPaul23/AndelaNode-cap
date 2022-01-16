/* Users models MongoDB */
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

var User = new Schema({
    id: uuidv4(),
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
        required
    },
    password: {
        type: String,
        required
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('User', User);
module.exports = userModel;