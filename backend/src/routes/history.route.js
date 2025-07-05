import { Router } from "express";
import { addWatchHistory, getWatchHistory } from "../controllers/history.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const historyRouter = Router()

historyRouter.use(verifyJWT)
historyRouter.post("/", addWatchHistory)
historyRouter.get('/', getWatchHistory)

export default historyRouter