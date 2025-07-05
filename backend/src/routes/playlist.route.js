import {Router} from 'express'
import { fetchPlaylist } from '../controllers/playlist.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const playlistRouter = Router()

playlistRouter.use(verifyJWT)
playlistRouter.get('/fetch-playlist', fetchPlaylist);

export {playlistRouter}