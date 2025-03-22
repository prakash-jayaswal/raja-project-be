const express = require('express');
const AdminController = require('../controllers/AdminController');

const AdminRouter = express.Router();

AdminRouter.post(
    "/login",
    AdminController.login,

)

AdminRouter.post(
    "/register",
    AdminController.register

)

AdminRouter.post(
    "/changepassword",
    AdminController.changepassword

)

AdminRouter.post(
    "/forgateEmail",
    AdminController.forgatemail

)


AdminRouter.get(
    "/forgateEmailPassword/:id/:token",
    AdminController.forgatPassword

)



AdminRouter.post(
    "/Password/:id/:token",
    AdminController.postforgatPassword

)

module.exports = AdminRouter;