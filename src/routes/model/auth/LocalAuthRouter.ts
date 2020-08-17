import {Router, Request, Response, NextFunction} from "express";
import {Logger} from "log4js";
import {LogService} from "../../../service/tool/LogService";
import passport from "passport";
import passportLocal from "passport-local";
import { UserModel} from "../../../model/user/User.js";

const LocalStrategy = passportLocal.Strategy;

export class LocalAuthRouter {

    private localAuthRouter: Router = Router();

    private log: Logger = new LogService().getLogger("LocalAuthRouter");

    constructor() {
        this.configure();
        this.login();
        this.getMe();
        this.logout();
    }

    public getLocalAuthRouter(): Router {
        return this.localAuthRouter;
    }

    private configure(): void {
        const options = {
            usernameField: "username",
            passwordField: "passwd",
        }
        passport.use(new LocalStrategy(options,
            (username: string, password: string, done: (error: any, user?: any, options?: (passportLocal.IVerifyOptions | undefined)) => void) => {
                UserModel.findOne({userName: username}, (err: Error, user) => {
                    if(err) {
                        return done(err);
                    }

                    if(!user) {
                        return done(null, false, {message: 'Incorrect username.'});
                    }

                    if(!user.validatePassword(password)) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }

                    return done(null, user);
                });
            }
        ));
    }

    private login(): void {
        this.localAuthRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate("local", (err: Error, user, info) => {
                if(err) {
                    return next(err);
                }

                if(!user) {
                    return res.redirect("/login");
                }

                req.logIn(user, (err1) => {
                    if(err1) {
                        return next(err1);
                    }

                    return res.redirect("/users/" + user.userName);
                });
            }) (req, res, next);
        });
    }

    private getMe(): void {
        this.localAuthRouter.get("/users/me", passport.authenticate("basic", {session: false}), async (req: Request, res: Response) => {
            if(req.user) {
                res.json({
                    id: req.user.id,
                    username: req.user.userName,
                });
            }
        });
    }

    private logout(): void {
        this.localAuthRouter.get("/logout", (req: Request, res: Response) => {
            req.logout();
            res.redirect("/");
        })
    }
}