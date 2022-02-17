const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = (User) => {

    const getUsers = async(req, res) => {
        const { query } = req;
        const response = await User.find(query);
        res.json(response);
    }

    const postUsers = async(req, res) => {
        const user = new User(req.body);

        user.password = await bcrypt.hash(user.password, 10);

        await user.save();
        res.json(user);


    }

    const getUserById = async(req, res) => {
        const { params } = req;
        const response = await User.findById(params.userId);
        res.json(response);
    }

    const putUsers = async(req, res) => {
        const { body } = req;
        const response = await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {

                firstName: body.firstName,
                lastName: body.lastName,
                userName: body.userName,
                password: await bcrypt.hash(body.password, 10),
                email: body.email,
                address: body.address,
                phone: body.phone



            }
        })
        res.json(response);
    }
    const deleteUserById = async(req, res) => {
        const id = req.params.userId;
        await User.findByIdAndDelete(id);
        res.status(202).json('User has been deleted');
    }

    const postLogin = async(req, res) => {
        const { body } = req;

        var response = await User.findOne({ userName: body.userName });
        if (response === null) {
            res.status(401).json('Invalid Credentials')
        } else if (await bcrypt.compare(body.password, response.password)) {

            const savedUser = response;
            const token = generateToken(savedUser);
            response = { message: 'ok', token }

        } else {
            res.status(401).json('Invalid Credentials')
        }



        res.json(response);


    }
    const generateToken = savedUser => {
        const tokenPayload = {
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            userName: savedUser.userName
        }
        return jwt.sign(tokenPayload, 'secret', { expiresIn: '12h' });
    }

    const validateToken = async(req, res) => {
        const { body } = req;
        const token = body.token;
        var decoded = jwt.verify(token, 'secret');
        res.json(decoded);
    }
    const getUserByUsername = async(req, res) => {
        const { query } = req;
        const userName = await User.findOne({ userName: query.userName });
        if (bookName === null) {
            res.json('User is not found');
        } else {
            res.json(userName);
        }
    }



    return { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken, getUserByUsername }
}

module.exports = userController;