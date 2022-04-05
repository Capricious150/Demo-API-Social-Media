const Thoughts = require('../models/Thought')

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
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    updateThought: async (req,res) => {
        const data = await Thoughts.updateOne({
            _id: req.params.id
        },
        {
            thoughtText: req.body.thought
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
            reactions: {$push: req.body}
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
            reactions:{$pull: req.params.reactionId}
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    }
}

module.exports = thoughtOperations