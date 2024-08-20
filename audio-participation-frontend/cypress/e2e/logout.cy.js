import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import HeaderPage from '../pages/HeaderPage';

describe('User Authentication - Logout', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const headerPage = new HeaderPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.login('francesca', 'password');
        dashboardPage.verifyDashboardLoaded();
    });

    it('should log out successfully', () => {
        headerPage.logout(); 
        cy.url().should('include', '/login');  
        loginPage.verifyLoginPageLoaded();
    });
});
