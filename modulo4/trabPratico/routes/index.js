import express from 'express';

import accountController from '../controllers/accountController.js'



const route = express();


route.put('/accounts/dep/:agencia/:conta/:valor',accountController.deposit);

route.put('/accounts/saq/:agencia/:conta/:valor',accountController.withdraw);
route.get('/accounts/:agencia/:conta',accountController.balance);
route.delete('/accounts/:agencia/:conta',accountController.deleteAccount);

route.put('/accounts/transfer/:contaOrigin/:contaDest/:valor',accountController.transferValue);

route.get('/accounts/:agencia',accountController.averageBalance);

route.get('/accounts/menor/quantity/:quantidade',accountController.smallBalancies);
route.get('/accounts/maior/quantity/:quantidade',accountController.bigBalancies);



route.get('/accounts/transfer99/private/clients',accountController.transfer99);

export { route }