const User = require('../models/User')

const userOperations = {
    getUsers: async (req,res) => {
        const data = await User.find()
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    getUserById: async (req,res) => {
        const data = await User.find({
            _id: req.params.id
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    createUser: async (req,res) => {
        const data = await User.create(req.body)
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    updateUser: async (req,res) => {
        const data = await User.updateOne({
            _id: req.params.id
        },
        {
            username: req.body.username,
            email: req.body.email
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    deleteUser: async (req,res) =>{
        const data = await User.deleteOne({
            _id: req.params.id
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    addFriend: async (req,res) => {
        const data = await User.updateOne({
            _id: req.params.userId
        },
        {
            friends: {$push: req.body.friendId}
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    },
    removeFriend: async (req,res) => {
        const data = await User.updateOne({
            _id: req.params.userId
        },
        {
            friends: {$pull: req.params.friendId}
        })
        if (data){
            res.status(200).json(data)
        } else {
            res.status(500).json({message: "Something went wrong, check server logs"})
        }
    }
}

module.exports = userOperations