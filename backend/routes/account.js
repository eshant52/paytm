const {Router} = require('express');
const { transfer, getBalance } = require('../controllers/accounts');
const isAuth = require('../middleswares/isAuth');

const accountRouter = Router();

accountRouter.get('/balance', isAuth, getBalance);
accountRouter.post('/transfer', isAuth, transfer);

module.exports = accountRouter;