describe('Register Page', () => {
  beforeEach(() => {
      cy.visit('/register');
  });

  it('should display the registration form', () => {
      cy.get('[data-cy=register-container]').should('be.visible');
      cy.get('[data-cy=register-title]').should('contain', 'Register');
  });

  it('should allow a user to register', () => {
      cy.get('[data-cy=register-username]').type('testuser');
      cy.get('[data-cy=register-password]').type('testpassword');
      cy.get('[data-cy=register-email]').type('testuser@example.com');
      cy.get('[data-cy=register-button]').click();

      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate to login page', () => {
      cy.get('[data-cy=register-login-link]').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
