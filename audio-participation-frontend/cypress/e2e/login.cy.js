describe('login with valid credentials', () => {
  it('should login with valid credentials', () => {
    cy.visit('/login');

    cy.log('Checking if login page loaded correctly');
    cy.get('[data-cy=username-input]').should('be.visible');
    cy.get('[data-cy=password-input]').should('be.visible');
    cy.get('[data-cy=login-button]').should('be.visible');

    cy.log('Entering credentials');
    cy.get('[data-cy=username-input]').type('francesca');
    cy.get('[data-cy=password-input]').type('password');

    cy.log('Clicking login button');
    cy.intercept('POST', '**/api/token/**').as('loginRequest');
    cy.get('[data-cy=login-button]').click();

    cy.log('Waiting for login response');
    cy.wait('@loginRequest').then((interception) => {
      cy.log('Login request completed');
      expect(interception.response.statusCode).to.equal(200);
      cy.url().should('include', '/dashboard');
    });
  });
});
