const User = require('../models/User')
const emailRegex = new RegExp('([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})')


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

        let uniqueUser = await User.find({
            username: req.body.username
        })
        let uniqueEmail = await User.find({
            email: req.body.email
        })
        
        let validEmail = emailRegex.test(req.body.email)
        
        if (uniqueUser[0] !== undefined){
            res.status(400).json({message: "Username is already in use, please choose another"})
            return
        }

        if (uniqueEmail[0] !== undefined){
            res.status(400).json({message: "Email is already in use, please choose another"})
            return
        }

        if (validEmail === false){
            res.status(400).json({message: "Email is not valid"})
        }

        const data = await User.create(req.body)
            if (data){
                res.status(200).json(data)
            } else {
                res.status(500).json({message: "Something went wrong, check server logs"})
            }

    },
    updateUser: async (req,res) => {

        let uniqueUser = await User.find({
            username: req.body.username
        })
        let uniqueEmail = await User.find({
            email: req.body.email
        })
        
        let validEmail = emailRegex.test(req.body.email)

        if (uniqueUser[0] !== undefined){
            res.status(400).json({message: "Username is already in use, please choose another"})
            return
        }

        if (uniqueEmail[0] !== undefined){
            res.status(400).json({message: "Email is already in use, please choose another"})
            return
        }

        if (validEmail === false){
            res.status(400).json({message: "Email is not valid"})
        }
        
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