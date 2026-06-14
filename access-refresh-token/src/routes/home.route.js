import { Router } from "express";

const homeRouter = Router()

// Private route
homeRouter.get("/", async (req, res) => {
    return res.status(200).json({
        message: "Home reached",
    })
})


export default homeRouter