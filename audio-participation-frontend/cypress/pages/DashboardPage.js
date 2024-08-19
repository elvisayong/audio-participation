class DashboardPage {
  visit() {
      cy.visit('/dashboard');
  }

  getPlans() {
      return cy.get('[data-cy=plan-item]');
  }

  getOpinions() {
      return cy.get('[data-cy=opinion-item]');
  }

  getSortPlansButton() {
      return cy.get('[data-cy=sort-plans-button]');
  }

  getSortOpinionsButton() {
      return cy.get('[data-cy=sort-opinions-button]');
  }

  getAddOpinionButton(planId) {
      return cy.get(`[data-cy=add-opinion-button-${planId}]`);
  }

  getPlanTitle(planId) {
      return cy.get(`[data-cy=plan-title-${planId}]`);
  }

  getOpinionCount(planId) {
      return cy.get(`[data-cy=plan-opinion-count-${planId}]`);
  }

  getAdminReplyIndicator(opinionId) {
      return cy.get(`[data-cy=admin-reply-indicator-${opinionId}]`);
  }

  verifyDashboardLoaded() {
      cy.get('[data-cy=dashboard-title]').should('be.visible');
  }

  navigateToAddOpinion(planId) {
      this.getAddOpinionButton(planId).click();
  }
}

export default DashboardPage;
