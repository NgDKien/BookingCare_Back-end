const db = require('../models/index');

const createClinic = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.name || !data.address
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                    resolve({
                        errCode: 1,
                        errMessage: "Missing parameters !"
                    })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: "Succeed!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getAllClinic = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let data = await db.Clinic.findAll({

            })
            if(data && data.length > 0){
                data.map (item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve ({
                errMessage: "Succeed !",
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getDetailClinicById = (inputId) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!inputId) {
                resolve ({
                    errCode: 1,
                    errMessage: "Missing parrameters !"
                })
            } else {
                let data = await db.Clinic.findOne ({
                    where: {id: inputId},
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                })
                if(data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                            where: {clinicId: inputId},
                            attributes: ['doctorId', 'provinceId'],
                        })
                    data.doctorClinic = doctorClinic;
                } else data = {}
                resolve ({
                    errMessage: "Succeed !",
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}