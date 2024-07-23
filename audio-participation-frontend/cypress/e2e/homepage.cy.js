
describe('Homepage Test', () => {
  before(() => {
    const username = 'francesca';
    const password = 'password';
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the homepage title', () => {
    cy.get('h2').contains('Available Plans');
  });
});
