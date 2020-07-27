/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Item } from "./item.interface";
import { Items } from "./items.interface";

/**
 * Router Definition
 */

export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET users/

// @ts-ignore
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Items = await ItemService.findAll();

        res.status(200).send(items);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// GET users/:id

// @ts-ignore
usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const item: Item = await ItemService.find(id);

        res.status(200).send(item);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST users/

// @ts-ignore
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: Item = req.body.item;

        await ItemService.create(item);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT users/

// @ts-ignore
usersRouter.put("/", async (req: Request, res: Response) => {
    try {
        const item: Item = req.body.item;

        await ItemService.update(item);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE users/:id

// @ts-ignore
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ItemService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});