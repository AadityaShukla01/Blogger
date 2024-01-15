const { HTTPError } = require("../models/errorModel");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require('path')
const { v4: uuid } = require('uuid');

const registerUser = async (req, res, next) => {
    try {
        //from frontend
        const { name, email, password, confirmPassword } = req.body;

        const newEmail = email.toLowerCase();

        if (!name || !email || !password) {
            return next(new HTTPError('Fill all the info', 422));
        }

        const user = await User.findOne({ email: newEmail });

        if (user) {
            return next(new HTTPError('User already exists', 422));
        }

        if ((password.trim()).length < 6) {
            return next(new HTTPError('Password length too small', 422));
        }

        if (password != confirmPassword) {
            return next(new HTTPError('Passwords do not match', 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json(newUser);

    } catch (error) {
        return next(new HTTPError(error, 422));
    }
}



const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HTTPError('Fill all the info', 422));
        }

        const newEmail = email.toLowerCase();
        const user = await User.findOne({ email: newEmail });

        if (!user) {
            return next(new HTTPError('Invalid credentials', 422));
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return next(new HTTPError('Invalid credentials', 422));
        }

        // now we can send them as token
        const { _id: id, name } = user;

        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1d' });


        return res.status(200).json({ token, id, name });
    } catch (error) {
        return next(new HTTPError('Login failed', 422))
    }
}


const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select('-password');
        console.log(id)
        if (!user) {
            return next(new HTTPError('User not found', 404))
        }


        return res.status(200).json(user);
    } catch (error) {
        return next(new HTTPError(error))
    }
}


const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files.avatar) {
            return next(new HTTPError("Please choose an image", 422))
        }
        const user = await User.findById(req.user.id)

        //delete old avatar if exists
        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'upload', user.avatar), (err) => {
                if (err) {
                    return next(new HTTPError(err))
                }
            })
        }

        const { avatar } = req.files;
        //check file size
        if (avatar.size > 500000) {
            return next(new HTTPError('Profile pic too big, should be less than 500kb', 422))
        }

        //change file name because file may have same name
        let filename;
        filename = avatar.name
        let splittedName = filename.split('.');
        let newFilename = splittedName[0] + uuid() + '.' + splittedName[splittedName.length - 1];

        avatar.mv(path.join(__dirname, '..', 'upload', newFilename), async (err) => {
            if (err) {
                return next(new HTTPError(err))
            }

            const updatedUser = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true });

            if (!updatedUser) {
                return next(new HTTPError('Avatar couldnt be changed', 422))
            }
            res.status(200).json(updatedUser);
        })
    } catch (error) {
        console.log('ok')
        return next(new HTTPError(error))
    }
}


const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;

        if (!name || !email || !currentPassword) {
            return next(new HTTPError("Fill in all the fields", 422))
        }

        //get user from database
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new HTTPError("User not found", 403))
        }

        //make sure new email you want doesnt already exists
        const emailExists = await User.findOne({ email });

        if (emailExists && (emailExists._id != req.user.id)) {
            return next(new HTTPError("Fill in all the fields", 422))
        }

        //comapare current password to db password
        const validatePassword = await bcrypt.compare(currentPassword, user.password)

        if (!validatePassword) {
            return next(new HTTPError("Wrong credentials", 422))
        }

        //compare new password
        if (newPassword !== confirmNewPassword) {
            return next(new HTTPError("New passwords do not match", 422))
        }

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);


        // update user

        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: hash }, { new: true });

        res.status(200).json(newInfo);
    } catch (error) {
        return next(new HTTPError(error))
    }
}



const getAuthors = async (req, res, next) => {
    try {

        const authors = await User.find().select('-password');

        if (!authors) {
            return next(new HTTPError('User not found', 404))
        }


        return res.status(200).json(authors);
    } catch (error) {
        return next(new HTTPError(error, 422))
    }
}

module.exports = { registerUser, loginUser, editUser, changeAvatar, getAuthors, getUser }