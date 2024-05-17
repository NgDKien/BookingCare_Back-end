const userService = require('../services/userService');

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
        })
    }

    let userData = await userService.handleUserLogin(email,password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage, 
        user: userData.user ? userData.user : []
    })
}

const handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //Truyền vào ALL hoặc id
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

//Tao moi
const handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

//Xoa
const handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing parameter"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

//sua
const handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch(e) {
        console.log('get all code: ', e)
        return res.status(200).json ({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}