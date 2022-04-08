const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title : {
        type :String,
        required : true,
    },
    description : {
        type : String,
    },
    src : {
        type : String,
    },
    url : {
        type : String,
    },
    status : {
        type : String,
        enum : ["TO LEARN","LEARNING","LEARNED"]
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    }

},
{
    timestamps : true
})

module.exports = mongoose.model("Posts", PostSchema);