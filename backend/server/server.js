const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getAllCommentsRoute = require('./routes/commentGetAllComments')
const addCommentRoute = require('./routes/commentCreateComment')
const editComment = require('./routes/commentEditComment')
const getAllRatings = require('./routes/ratingGetAllRatings')
const addFavorites = require('./routes/favoriteAddFavorite');

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/comment', getAllCommentsRoute)
app.use('/comment', addCommentRoute)
app.use('/comment', editComment)
app.use('/rating', getAllRatings)
app.use('/users/:userId/favorites', addFavorites)


app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
