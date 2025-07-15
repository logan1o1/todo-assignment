import express from "express"
import User from "../schema/user.model.js"
import bcryptjs from "bcryptjs"
import generateAndSetTokens from "../middlewares/cookies.js"
import { handleError } from "../middlewares/error.js"
// import jwt from "jsonwebtoken";

const userRouter = express.Router()

userRouter.post("/signup", async (req, res, next) => {
	const { username, email, password } = req.body
	let user = await User.findOne({ username })
	if (user) return res.status(400).json({ msg: "User already exists" })

	const hashPassword = bcryptjs.hashSync(password, 5);
    const newUser = new User({ username, email, password: hashPassword });
    try {
        if (newUser) {
            const result = await newUser.save();
            res.status(200).send(result);
        } else res.status(400).send("User couldn't be created");
    } catch (error) {
        next(error);
    }
})

userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
    try {
        const validUser = await User.findOne({ username });
        if (!validUser) return next(handleError(404, "User not found"));
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if (!isValidPassword) return next(handleError(401, "Wrong password"));
        generateAndSetTokens(validUser._id, res);
        // const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);  .cookie("access_token", token, { httpOnly: true })
        res.status(200).json(validUser);
    } catch (error) {
        next(error)
    }
});

userRouter.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User has been signed out...");
    } catch (error) {
        next(error)
    }
})

export default userRouter;