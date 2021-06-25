const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [
                function(){
                    return !this.username;
                },
                `Username can't be empty`
            ],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [
                function(){
                    return !this.email;
                },
                `Email can't be empty`
            ],
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]},

        {
            toJSON: {
                virtuals: true,
                getters: true
            },
        }
);


const User = model('User', UserSchema);

module.exports = User;
