import express from 'express';
import controller from '../controllers/accountController.js'

const app = express();

// each of them will be associated with a function from the controller
app.post("/accounts/create", controller.create);
app.patch("/accounts/deposit", controller.deposit);
app.patch("/accounts/withdraw", controller.withdraw);
app.get("/accounts/checkBalance", controller.checkBalance);
app.delete("/accounts/remove", controller.remove);
app.patch("/accounts/transfer", controller.transfer);
app.get("/accounts/avgBalance/:agencia", controller.avgBalance);
app.get("/accounts/greaterBalance/:limit", controller.greaterBalance);
app.get("/accounts/lowerBalance/:limit", controller.lowerBalance);
app.get("/accounts/tranferToPrivate", controller.tranferToPrivate);

export { app as accRouter }