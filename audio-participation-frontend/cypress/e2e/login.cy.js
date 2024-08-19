import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

describe('User Authentication - Login', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();

    beforeEach(() => {
        loginPage.visit();
    });

    it('should log in with valid credentials', () => {
        loginPage.login('francesca', 'password');
        dashboardPage.verifyDashboardLoaded();
    });

    it('should show an error with invalid credentials', () => {
        loginPage.login('invalidUser', 'wrongPassword');
        cy.get('[data-cy=login-error]').should('be.visible').and('contain', 'Login failed');
    });
});
