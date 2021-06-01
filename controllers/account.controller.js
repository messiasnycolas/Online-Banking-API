import AccountService from "../services/account.service.js";

async function createAccount(req, res, next) {

    try {
        let account = req.body;
        if (!account.name || account.balance == null) {
            throw new Error(`Name and Balance are required fields!`);
        }
        account = await AccountService.createAccount(account);
        res.send(account);
        logger.info(`POST /account ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
};

async function getAccounts(req, res, next) {
    try {
        const data = await AccountService.getAccounts();
        logger.info(`GET /account`);
        res.send(data.accounts);
    } catch (err) {
        next(err);
    }
};

async function getAccount(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const account = await AccountService.getAccount(id);
        logger.info(`GET /account/${id}`);
        res.send(account);
    } catch (err) {
        next(err);
    }
};

async function deleteAccount(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        if (id == null) {
            throw new Error(`Account number must be valid!`)
        };
        await AccountService.deleteAccount(id);
        logger.info(`DELETE /account/${id}`);
        res.send(`Succesfully deleted`);
    } catch (err) {
        next(err);
    }
};

async function updateAccount(req, res, next) {
    try {
        const account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error(`Name and Balance are required fields!`);
        } else if (account.id == null) {
            throw new Error(`Account number must be valid.`);
        }
        await AccountService.updateAccount(account);
        logger.info(`PUT /account ${JSON.stringify(account)}`);
        res.send(`Succesfully updated`);
    } catch (err) {
        next(err);
    }
};

async function updateBalance(req, res, next) {
    try {
        const account = req.body;

        if (account.id == null || account.balance == null) {
            throw new Error(`Account number must be valid and new balance must be correctly specified!`);
        }
        await AccountService.updateBalance(account);
        logger.info(`PATCH /account/updateBalance ${JSON.stringify(account)}`);
        res.send(`Succesfully updated`);
    } catch (err) {
        next(err);
    }
};

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance,
};