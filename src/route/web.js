const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const doctorController = require('../controllers/doctorController');
const patientController = require('../controllers/patientController');
const specialtyController = require('../controllers/specialtyController');
const clinicController = require('../controllers/clinicController');

const router = express.Router();

router.get('/', homeController.getHomePage);

router.get('/test', homeController.getTestPage);

router.get('/crud', homeController.getCRUD);

router.post('/post-crud', homeController.postCRUD);

router.get('/get-crud', homeController.displayCRUD);

router.get('/edit-crud', homeController.getEditCRUD);

router.post('/put-crud', homeController.putCRUD);

router.get('/delete-crud', homeController.deleteCRUD);

router.post('/api/login', userController.handleLogin); 

router.get('/api/get-all-users', userController.handleGetAllUsers); 

router.post('/api/create-new-user', userController.handleCreateNewUser);

router.put('/api/edit-user', userController.handleEditUser);

router.delete('/api/delete-user', userController.handleDeleteUser);

router.get('/api/allcode', userController.getAllCode);

router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);

router.get('/api/get-all-doctors', doctorController.getAllDoctors);
 
router.post('/api/save-infor-doctors', doctorController.postInforDoctor);

router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);

router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);

router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);

router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);

router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

router.post('/api/patient-book-appointment', patientController.postBookAppointment);

router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

router.post('/api/create-new-specialty', specialtyController.createSpecialty);

router.get('/api/get-specialty', specialtyController.getAllSpecialty);

router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

router.post('/api/create-new-clinic', clinicController.createClinic);

router.get('/api/get-clinic', clinicController.getAllClinic);

router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);

router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor);

router.post('/api/send-remedy', doctorController.sendRemedy);


module.exports = router;