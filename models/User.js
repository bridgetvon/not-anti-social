const { Schema, model } = require('mongoose');
// import isEmail from 'validator/lib/isEmail';

const UserSchema = new Schema ({
    userName: {
        type: String,
        unique: true,
        required: 'You must enter a unique name!',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        isEmail: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [//something here]
    ]  
},
{
    toJSON: {
        virtuals: true,
    }
}
);

//add virtual 

//create the user model 
const User = model('User', UserSchema);


//export the model 
module.exports = User;