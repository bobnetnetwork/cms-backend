import passportTwitter, {Profile} from "passport-twitter";
import express, {Router} from "express";
import passport from "passport";
import {UserModel} from "../../model/user/User.js";

const TwitterStrategy = passportTwitter.Strategy;

export class TwitterAuthRouter {

    private twitterAuthRouter: Router = express.Router();

    constructor() {
        this.config();
        this.auth();
        this.callback();
    }

    public getTwitterAuthRouter(): Router {
        return this.twitterAuthRouter;
    }

    private config(): void {
        const options = {
            consumerKey: "TWITTER_CONSUMER_KEY",
            consumerSecret: "TWITTER_CONSUMER_SECRET",
            callbackURL: "http://www.example.com/auth/twitter/callback",
        };

        passport.use(new TwitterStrategy(options,
            async (token: string, tokenSecret: string, profile: Profile) => {
                await UserModel.findOrCreate({twitterId: profile.id});
            }
        ));
    }

    private auth(): void {
        this.twitterAuthRouter.get("/", passport.authenticate("twitter"));
    }

    private callback(): void {
        const options = {
            successRedirect: "/",
            failureRedirect: "/login",
        }
        this.twitterAuthRouter.get("/callback", passport.authenticate("twitter", options));
    }

}