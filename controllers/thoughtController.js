const Thoughts = require('../models/Thought')
const User = require('../models/User')

const thoughtOperations = {
    getThoughts: async (req,res) => {
        const data = await Thoughts.find()
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    getThoughtById: async (req,res) => {
        const data = await Thoughts.find({
            _id: req.params.id
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    createThought: async (req,res) => {
        const data = await Thoughts.create(req.body)
            .then((thought) =>{
                return User.findOneAndUpdate({
                    username: req.body.username,
                },
                {$push: {thoughts: thought._id}})
            })
            .then((user) => {
                !user 
                    ? res.status(404).json({ message: 'Thought created, but found no user with that username' })
                : res.json('Thought created')
            })
        },
    updateThought: async (req,res) => {
        const data = await Thoughts.updateOne({
            _id: req.params.id
        },
        {
            thoughtText: req.body.thoughtText
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    deleteThought: async (req,res) => {
        const data = await Thoughts.deleteOne({
            _id: req.params.id
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    react: async (req,res) => {
        const data = await Thoughts.updateOne({
            _id: req.params.thoughtId
        },
        {
            $push: {reactions: req.body}
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    reactRemove: async (req,res) => {
        const data = await Thoughts.updateOne({
            _id: req.params.thoughtId
        },
        {
            $pull:{reactions: {reactionId: req.params.reactionId}}
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    }
}

module.exports = thoughtOperations