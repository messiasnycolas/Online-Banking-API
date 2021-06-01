import { promises as fs } from "fs";

 async function insertAccount(account) {
    const data = JSON.parse(await fs.readFile(fileName));
    account = {
        id: data.nextId++,
        name: account.name,
        balance: account.balance
    };
    data.accounts.push(account);
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    return account;
 };

 async function getAccounts() {
    return (JSON.parse(await fs.readFile(fileName)));
 };
 
 async function getAccount(id) {
    const data = await getAccounts();
    const account = data.accounts.filter((item) => id === item.id);
    return account;
 };
 
 async function deleteAccount(id) {
    let data = await getAccounts();
    data.accounts = data.accounts.filter((item) => id !== item.id);
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
 };
 
 async function updateAccount(account) {
    let data = await getAccounts();
    data.accounts = data.accounts.map((item) => {
        if (account.id == item.id) {
            if (account.name) item.name = account.name;
            item.balance = account.balance;
            return item;
        } else return item;
    });
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
 };

export default {
    insertAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount
};