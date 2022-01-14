const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema(
    {
       thoughtId: {
           type: Schema.Types.ObjectId,
           default: () => Types.ObjectId()
       },
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
       },
    //    reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactions').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;