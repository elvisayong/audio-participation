class HeaderPage {
  getLogoutButton() {
      return cy.get('[data-cy=logout-button]');
  }

  logout() {
      this.getLogoutButton().click();
  }
}

export default HeaderPage;
