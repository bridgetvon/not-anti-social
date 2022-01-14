const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        whoReacted: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
            //add date format with getter
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const ThoughtSchema = new Schema(
    {
       thoughtText: {
           type: String,
           required: true,
           minlength: 1,
           maxlength: 280
       },
       createdAt: {
           type: Date,
           default: Date.now,
           //add date format with getter 
       },
       createdBy: {
           //link with usersId
           type: String, 
           required: true
       },
       reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;