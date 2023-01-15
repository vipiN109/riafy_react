const mongoose= require('mongoose')
const moment= require('moment')
const bookmark_schema = mongoose.Schema({
    "title":{type:String},
    "url":{type:String},
    'createdAt':{type:Number,default:()=>moment().valueOf()}
})

const bookmarkModel = mongoose.model('bookmarks',bookmark_schema);
module.exports=bookmarkModel;