class LoginPage {
  visit() {
      cy.visit('/login');
  }

  fillUsername(username) {
      cy.get('[data-cy=username-input]').type(username);
  }

  fillPassword(password) {
      cy.get('[data-cy=password-input]').type(password);
  }

  submit() {
      cy.get('[data-cy=login-button]').click();
  }

  login(username, password) {
      this.fillUsername(username);
      this.fillPassword(password);
      this.submit();
  }

  verifyLoginPageLoaded() {
      cy.get('[data-cy=login-button]').should('be.visible');
  }
}

export default LoginPage;
