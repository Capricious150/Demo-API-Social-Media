const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {type: String, required: true, minLength: 1, maxLength: 280},
        createdAt: {type: Date, default: Date.now},
        username: {type: String, required: true},
        reactions: Array
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})


const Thought = model('thought', thoughtSchema);

module.exports = Thoughts;