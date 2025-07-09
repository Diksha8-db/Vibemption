import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "https://vibemption.vercel.app",
    credentials: true
}));

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"));  // to allow access to public assets
app.use(cookieParser())

// route componenets
import userRouter from './routes/user.routes.js'
import {playlistRouter} from './routes/playlist.route.js'
import favouriteRouter from './routes/favourite.route.js';
import errorHandler from './middlewares/error.middleware.js';


// routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/playlist', playlistRouter)
app.use('/api/v1/favourites', favouriteRouter)

app.use(errorHandler);
export {app}