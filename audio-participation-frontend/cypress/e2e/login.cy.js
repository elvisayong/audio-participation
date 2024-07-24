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
    cy.get('[data-cy=login-button]').click();

    cy.log('Waiting for dashboard to load');
    cy.url().should('include', '/dashboard', { timeout: 10000 });

    cy.log('Checking if dashboard elements are present');
    cy.get('[data-cy=dashboard-header]').should('be.visible');
    cy.get('[data-cy=user-greeting]').should('contain', 'Welcome, francesca');
  });
});