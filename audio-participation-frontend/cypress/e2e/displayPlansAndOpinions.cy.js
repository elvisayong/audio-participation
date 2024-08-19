import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';

describe('Dashboard Functionality', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.login('francesca', 'password');
        cy.url().should('include', '/dashboard'); 
    });

    it('should display a list of urban planning projects', () => {
        cy.log('Visiting Dashboard');
        cy.visit('/dashboard');
        
        cy.get('h2[data-cy=dashboard-title]').should('be.visible');

        dashboardPage.getPlans().should('have.length.greaterThan', 0);
    });

    it('should display a list of user opinions', () => {
        dashboardPage.getOpinions().should('have.length.greaterThan', 0);
    });

    it('should sort plans by expiry date', () => {
        dashboardPage.getSortPlansButton().click();
        dashboardPage.getPlans().first().should('contain', 'Expires in');
        dashboardPage.getPlans().last().should('contain', 'Expires in');
    });

    it('should display the opinion count next to each plan title', () => {
        dashboardPage.getPlans().each(plan => {
            cy.wrap(plan).find('[data-cy=plan-opinion-count]').should('exist');
        });
    });


});
