const UserModel = require("../models/userModel");



const createUser = async (req,res) => {
    try{
        const user = req.body;
        const result = await UserModel.createUser(user);
        if (result && result.insertedId) {
            console.log('User created:', result);
            res.status(201).json({
                ...user,
                _id: result.insertedId 
            });
        }else{
            res.status(500).json({ message : "Failed to create user"})

            }

        console.log(result);


    }catch(error){
        res.status(500).json({ message: error.message });
    }
    };

const getAllUsers = async (req, res) => {
    try {
        const user  = await UserModel.getAllUsers();
        res.status(200).json(user);
        console.log(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }

}


const getUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const user =  await UserModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}


const updateUser = async(req,res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const result = await UserModel.updateUser(id,user);
        if(result.matchedCount === 0){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({message : "User Updated Successfully"});
    }
    catch(error){
        res.status(500).json({ message: "Failed to Update the user" });

    }
}


const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const result = await UserModel.deleteUser(id);
        if(result.deletedCount === 0){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({message: "User Deleted Successfully"});
    }
    catch(error){
        res.status(500).json({ message: "Failed to delete the user" });
    }
        
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

        
        

