class PlanManagementPage {
  visit() {
      cy.visit('/manage-plans');
  }

  fillTitle(title) {
      cy.get('[data-cy=plan-title-input]').type(title);
  }

  fillDescription(description) {
      cy.get('[data-cy=plan-description-input]').type(description);
  }

  fillExpirationDate(date) {
      cy.get('[data-cy=plan-expiration-date-input]').type(date);
  }

  submitPlan() {
      cy.get('[data-cy=submit-plan-button]').click();
  }

  getPlans() {
      return cy.get('[data-cy=plan-item]');
  }

  editPlan(oldTitle, newTitle, newDescription, newDate) {
      this.getPlans().contains(oldTitle).parent().find('[data-cy=edit-plan-button]').click();
      this.fillTitle(newTitle);
      this.fillDescription(newDescription);
      this.fillExpirationDate(newDate);
      this.submitPlan();
  }

  deletePlan(title) {
      this.getPlans().contains(title).parent().find('[data-cy=delete-plan-button]').click();
  }
}

export default PlanManagementPage;
