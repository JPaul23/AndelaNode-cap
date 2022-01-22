import mongoose from "mongoose";

const Schema = mongoose.Schema;

var Article = new Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true


    },
    Date: {
        type: String,
        required: true

    },
    Image: {
        type: String,
        required: true

    },
    Detail: {
        type: String,
        required: true
    }

});

const articleModel = mongoose.model('Article', Article);
export default articleModel;