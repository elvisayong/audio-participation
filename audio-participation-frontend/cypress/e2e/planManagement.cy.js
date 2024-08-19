import PlanManagementPage from '../pages/PlanManagementPage';
import LoginPage from '../pages/LoginPage';

describe('Plan Management - Create, Edit, and Delete Plan', () => {
    const loginPage = new LoginPage();
    const planManagementPage = new PlanManagementPage();

    beforeEach(() => {
        // Log in as an admin before each test
        loginPage.visit();
        loginPage.login('kimonia', 'password');
        cy.url().should('include', '/dashboard');
        planManagementPage.visit(); 
    });

    it('should allow an admin to create, edit, and delete an urban planning project', () => {
        planManagementPage.fillTitle('New Urban Plan');
        planManagementPage.fillDescription('This is a description of the new urban plan.');
        planManagementPage.fillExpirationDate('2024-12-31');
        planManagementPage.submitPlan();

        planManagementPage.getPlans().should('contain', 'New Urban Plan');

        planManagementPage.editPlan('New Urban Plan', 'Updated Urban Plan', 'Updated description of the urban plan.', '2025-01-01');

        planManagementPage.getPlans().should('contain', 'Updated Urban Plan');

        planManagementPage.deletePlan('Updated Urban Plan');

        planManagementPage.getPlans().should('not.contain', 'Updated Urban Plan');
    });
});
