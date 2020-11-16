import { Account } from '../models/accountModel.js'

// app.post("/accounts/create", controller.create);
const create = async (req, res) => {

};

//app.patch("/accounts/deposit", controller.deposit);


//app.patch("/accounts/withdraw", controller.withdraw);


//app.get("/accounts/checkBalance", controller.checkBalance);


//app.delete("/accounts/remove", controller.remove);


//app.patch("/accounts/transfer", controller.transfer);


//app.get("/accounts/avgBalance/:agencia", controller.avgBalance);


//app.get("/accounts/greaterBalance/:limit", controller.greaterBalance);


//app.get("/accounts/lowerBalance/:limit", controller.lowerBalance);


//app.get("/accounts/tranferToPrivate", controller.tranferToPrivate);


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

export default {
    create
    // , deposit, withdraw, checkBalance, remove, transfer, avgBalance, greaterBalance, lowerBalance, transferToPrivate 
};