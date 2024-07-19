describe('login with valid credentials', () => {
  it('should login with valid credentials', () => {
    cy.visit('/login');

    cy.get('[data-cy=username-input]').type('francesca');
    cy.get('[data-cy=password-input]').type('password');
    cy.get('[data-cy=login-button]').click();

    cy.url().should('include', '/dashboard');

  } );
});