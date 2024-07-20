// cypress/support/commands.js

import { login } from './actions/login.action';

Cypress.Commands.add('login', (username, password) => {
  login(username, password);
});
