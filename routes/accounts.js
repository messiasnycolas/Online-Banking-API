import express from "express";
import { promises as fs } from "fs";
const router = express.Router();



router.post("/", async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error(`Name and Balance are required fields!`);
        }

        const data = JSON.parse(await fs.readFile(fileName));

        account = {
            id: data.nextId++,
            name: account.name,
            balance: account.balance
        };
        data.accounts.push(account);
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));

        logger.info(`POST /account ${JSON.stringify(account)}`);
        res.send(account);
    } catch (err) {
        next(err);
    }
});;

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(fileName));

        logger.info(`GET /account`);
        res.send(data.accounts);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = JSON.parse(await fs.readFile(fileName));
        const account = data.accounts.filter((item) => id === item.id);

        logger.info(`GET /account/${id}`);
        res.send(account);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (id == null) {
            throw new Error(`Account number must be valid!`)
        };

        let data = JSON.parse(await fs.readFile(fileName));
        data.accounts = data.accounts.filter((item) => id !== item.id);
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));

        logger.info(`DELETE /account/${id}`);
        res.send(`Succesfully deleted`);
    } catch (err) {
        next(err);
    }
});

router.put("/", async (req, res, next) => {
    try {
        const account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error(`Name and Balance are required fields!`);
        } else if (account.id == null) {
            throw new Error(`Account number must be valid.`);
        }

        let data = JSON.parse(await fs.readFile(fileName));
        data.accounts = data.accounts.map((item) => {
            if (account.id == item.id) {
                item.name = account.name;
                item.balance = account.balance;
                return item;
            } else return item;
        });
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));

        logger.info(`PUT /account ${JSON.stringify(account)}`);
        res.send(`Succesfully updated`);
    } catch (err) {
        next(err);
    }
});

router.patch("/updateBalance", async (req, res, next) => {
    try {
        const account = req.body;

        if (account.id == null || account.balance == null) {
            throw new Error(`Account number must be valid and new balance must be correctly specified!`);
        }
        let data = JSON.parse(await fs.readFile(fileName));
        data.accounts = data.accounts.map((item) => {
            if (account.id == item.id) {
                item.balance = account.balance;
                return item;
            } else return item;
        });
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));

        logger.info(`PATCH /account/updateBalance ${JSON.stringify(account)}`);
        res.send(`Succesfully updated`);
    } catch (err) {
        next(err);
    }
});


router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;