import mongoose from 'mongoose'

// defining a schema model for our db and add validation if there is any
// ps: validation could be set as function on controllers either
const schemaAccount = mongoose.Schema({
    agencia: {
        type: Number,
        require: true
    },
    conta: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        require: true,
        validate(balance) {
            if (balance < 0)
                throw new Error("Negative balance not allowed for bank accounts");
        }
    },
});
// adding a new object following this new schema
mongoose.model("accounts", schemaAccount);
const Account = mongoose.model("accounts");

export { Account }