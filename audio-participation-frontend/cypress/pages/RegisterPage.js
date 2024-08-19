class RegisterPage {
  visit() {
      cy.visit('/register');
  }

  fillUsername(username) {
      cy.get('[data-cy=username-input]').type(username);
  }

  fillPassword(password) {
      cy.get('[data-cy=password-input]').type(password);
  }

  fillEmail(email) {
      cy.get('[data-cy=email-input]').type(email);
  }

  toggleAdmin() {
      cy.get('[data-cy=admin-checkbox]').click();
  }

  submit() {
      cy.get('[data-cy=register-button]').click();
  }

  register(username, password, email, isAdmin = false) {
      this.fillUsername(username);
      this.fillPassword(password);
      this.fillEmail(email);
      if (isAdmin) {
          this.toggleAdmin();
      }
      this.submit();
  }

  verifyRegisterPageLoaded() {
      cy.get('[data-cy=register-button]').should('be.visible');
  }
}

export default RegisterPage;
