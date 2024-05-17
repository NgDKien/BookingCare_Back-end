const createNewUser = require('../services/CRUDSevices')
const db = require('../models/index');
const CRUDSevices = require('../services/CRUDSevices');

const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); 
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

const getTestPage = (req, res) => {
    return res.render('test/test1.ejs');
}

const getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

const postCRUD = async (req, res) => {
    let message = await CRUDSevices.createNewUser(req.body);
    console.log(req.body);
    console.log(message);
    return res.send('post crud');
}

const displayCRUD = async (req, res) => {
    let data = await CRUDSevices.getAllUser();
    console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId) {
        let userData = await  CRUDSevices.getUserInfoById(userId);
        console.log(userData);
        return res.render("editCRUD.ejs", {
            user: userData
        });

    } else {
        return res.send("user not found");
    }
}

const putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDSevices.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    }) 
}

const deleteCRUD = async (req,res) => {
    let id = req.query.id;
    if (id) {
        await CRUDSevices.deleteUserById(id);
        return res.send("Delete Succeed");
    } else {
        return res.send("Delete Fail");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getTestPage: getTestPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}

