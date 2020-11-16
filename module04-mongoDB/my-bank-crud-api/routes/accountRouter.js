import express from 'express';
import { Account } from '../models/accountModel.js'

const app = express();
// add here all the routes/endpoints of our application

// get all accounts
app.get("/accounts", async (req, res) => {
    try {
        const account = await Account.find({}, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get by account


//create
//app.post("/accounts/create", controller.create);
// http://localhost:3300/accounts
app.post("/accounts/create", async (req, res) => {
    const input = req.body;
    try {
        const account = new Account(input);
        await account.save();
        console.log(account);
        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

// app.patch("/accounts/deposit", controller.deposit); - ERROR!!
app.patch("/accounts/deposit", async (req, res) => {
    // get the params values from body(agencia, account and ... balance??? value??)
    const input = req.body;
    try {
        // pass a validation to check if the account exists
        let account = await validateAccount({ agencia, conta });
        account.balance += input.valor; //input.valor ??
        account = new Account(account);
        await account.save();
        res.send(account);
    } catch (error) {
        res.status(status).send("Operation failed. Error to proceed with", error);
    }
});

// app.patch("/accounts/withdraw", controller.withdraw); - ERROR
app.patch("accounts/withdraw", async (req, res) => {
    // get the params values from body
    const input = req.body;
    try {
        // pass a validation to check if the account exists
        let account = await validateAccount({ agencia, conta });
        // update the balance + fees (1)
        account.balance -= input.valor + 1; //input.valor ??
        account = new Account(account);
        await account.save();
        res.send(account);
    } catch (error) {
        res.status(status).send("Operation failed. Error to proceed with", error);
    }
});

// app.get("/accounts/checkBalance", controller.checkBalance); 
app.get("/accounts/checkBalance/:agencia/:conta", async (req, res) => {
    const agencia = req.params.agencia;
    const conta = req.params.conta;
    try {
        let account = await validateAccount({ agencia, conta });
        account = await Account.find({ agencia: parseInt(agencia), conta: parseInt(conta) }, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
        console.log(account);
        res.send(account);
    } catch (error) {
        res.status(500).send(`Error to check the balance account from agency ${agency} , account ${account}`, error);
    }
});

// app.delete("/accounts/remove", controller.remove); - ERROR!!
app.delete("accounts/remove/:conta", async (req, res) => {
    // get the params values from body
    const input = req.params.conta;
    try {
        // pass a validation account
        // let account = await validateAccount(input);
        // once is true, delete the account by its id
        // await Account.findByIdAndRemove(filter});
        const account = await Account.findOneAndRemove({ conta: parseInt(input) }); //???
        // to return the amount of accounts of the agency:
        // account = await Account.find({
        //     agencia: account.agencia,
        // }).countDocuments();
        // countDocuments() - ???
        // then, sed the results of active agencies
        res.send(account);
    } catch (error) {
        res.status(500).send("Error to finish the operation", error);
    }
});

// app.patch("/accounts/transfer", controller.transfer);
app.patch("accounts/transfer", async (req, res) => {
    // get the params values from body
    const input = req.body;
    try {
        // pass a validation to check if bouth input exist (aource- target)
        let sourceAcc = await validateAccount({ conta: input.contaOrigem });
        let targetAcc = await validateAccount({ conta: input.contaDestino });
        // pass as statemente/condition for the transfer fess (8)
        if (sourceAcc.agencia !== targetAcc) {
            sourceAcc.balance -= 8;
        }
        // if the condition is true, update and save the source account 
        sourceAcc = new Account(sourceAcc);
        await sourceAcc.save();
        // now, increment the transfered value to the target account
        targetAcc.balance += input.valor;
        // then, update and save the target account
        targetAcc = new Account(targetAcc);
        await sourceAcc.save();
        // sending as results the balance from source accoubt
        res.send(sourceAcc);
    } catch (error) {
        res.status(500).send("Error to finish the operation", error);
    }
});

//** app.get("/accounts/avgBalance/:agencia", controller.avgBalance);
app.get("/accounts/avgBalance/:agencia", async (req, res) => {
    // get the params values from body
    const input = req.params.agencia;
    try {
        // validation for agency ?? it brings ERROR!!
        // let account = await validateAccount(input); //????
        // getting avg by aggregation
        const avg = await Account.aggregate([
            {
                $match: {
                    agencia: parseInt(input),
                },
            },
            {
                $group: {
                    _id: "$agencia",
                    media: { $avg: "$balance", },
                }
            },
            {
                $project: {
                    _id: 0,
                    media: 1,
                },
            }
        ])
        if (avg.length === 0) {
            throw new Error("Agency not found")
        }
        res.send(avg);
    } catch (error) {
        res.status(500).send("Error to finish the operation", error);
    }
});

// **app.get("/accounts/greaterBalance/:limit", controller.greaterBalance);
app.get("/accounts/greaterBalance/:limit", async (req, res) => {
    const limit = req.params.limit;
    try {
        // searching through all data using find() + filters
        const account = await Account.find({}, {
            _id: 0, agencia: 1, balance: 1, name: 1,
        })
            // then, passing the limit and sort 
            .limit(parseInt(limit))
            .sort({ balance: -1 });
        // add a condition
        if (account.length === 0) {
            throw new Error("There are no clients found")
        }
        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

// *app.get("/accounts/lowerBalance/:limit", controller.lowerBalance);
app.get("/accounts/lowerBalance/:limit", async (req, res) => {
    const limit = req.params.limit;
    try {
        // searching through all data using find() + filters
        const account = await Account.find({}, {
            _id: 0, agencia: 1, balance: 1, name: 1,
        })
            // then, passing the limit and sort 
            .limit(parseInt(limit))
            .sort({ balance: 1 });
        // add a condition
        if (account.length === 0) {
            throw new Error("There are no clients found")
        }
        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }

})

//app.get("/accounts/tranferToPrivate", controller.tranferToPrivate);
app.get("accounts/moveToPrivate", async (req, res) => {
    try {
        let privateAccounts = await Account.aggregate([
            {
                $group: {
                    _id: "$agencia",
                    balance: { $max: "$balance" },
                },
            },
        ]);
        // add a for of loop to read the list and to save each item into a new list of acccounts
        for (const privateAccount of privateAccounts) {
            const { _id, balance } = privateAccount;
            let newListAccount = await Account.findOne({
                agencia: _id,
                balance,
            });
            // setting the private agency
            newListAccount.agencia = 99;
            // and save it
            newListAccount.save()
        }
        privateAccounts = await Account.find({ agencia: 99, })
        res.send(privateAccounts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// create a function to validate the account
const validateAccount = async (account) => {
    // checking if hte agenncy and account is in the db
    const { agencia, conta } = account;
    account = {
        agencia,
        conta,
    };
    try {
        // passing the conditions/statements
        if (typeof account.agencia !== "undefined") {
            account = await Account.findOne(account);
        } else {
            account = await Account.findOne({ conta: account.conta });
        }
        if (!account) {
            throw new Error(`Agenncy ${agencia} and account ${conta} are not valid`)
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export { app as accountRouter }