import { Router } from "express";
import { addToFavourites, removeFromFavourites, userFavourites } from "../controllers/favourites.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const favouriteRouter = Router()

favouriteRouter.use(verifyJWT)
favouriteRouter.post('/', addToFavourites)
favouriteRouter.delete('/', removeFromFavourites)
favouriteRouter.get('/', userFavourites)

export default favouriteRouter