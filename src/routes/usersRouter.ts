/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {UsersService} from "../service/user/UsersService.js";
import {auth} from "./auth.js";
import passport from "passport";
import {LogService} from "../service/LogService.js";

const Users = mongoose.model("Users");

/**
 * Router Definition
 */

export const usersRouter = express.Router();
const log = new LogService().getLogger("usersRouter");

const userService = new UsersService();

/**
 * Controller Definitions
 */

// GET users/

usersRouter.get("/", async (req: Request, res: Response) => {
    await Users.findById(52)
        .then((user) => {
            if(!user) {
                res.status(400);
            }
    try {
        userService.findAll((result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
        });
});


// GET users/:username

usersRouter.get("/:username", async (req: Request, res: Response) => {
    try {
        await userService.findByUserName(req.params.username, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST users/

usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        await userService.create(req.body, (result) => {
            res.status(201).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
        log.error(e.message);
    }
});

// PUT users/

usersRouter.put("/", async (req: Request, res: Response) => {
    try {
        await userService.update(req.body, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
        log.error(e.message);
    }
});

// DELETE users/:id

usersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await userService.deleteById(req.params.id, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
        log.error(e.message);
    }
});

// POST login route (optional, everyone has access)
usersRouter.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.sendStatus(400);
    })(req, res, next);
});

// GET current route (required, only authenticated users have access)
usersRouter.get('/current', auth.required, (req, res, next) => {
    // const { payload: { id } } = req;

   /* return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });*/
});

