const express = require('express');
const userController = require('../controllers/userController');
const bodySchema = require('../validationSchemas/userValidation');
const validator = require('express-joi-validation').createValidator();

const routes = (User) => {
    const userRouter = express.Router();
    const { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken, getUserByUsername } = userController(User);

    userRouter.route('/users')
        .get(getUsers, getUserByUsername)
        .post(validator.body(bodySchema), postUsers);

    userRouter.route('/users/:userId')
        .get(getUserById)
        .put(putUsers)
        .delete(deleteUserById)

    userRouter.route('/login')
        .post(postLogin);

    userRouter.route('/login/validate')
        .post(validateToken)


    return userRouter;
}
module.exports = routes;