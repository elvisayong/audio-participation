import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';

describe('Dashboard Functionality - View Admin Reply', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();

    before(() => {
        loginPage.visit();
        loginPage.login('francesca', 'password');
        dashboardPage.visit();
    });

    it('should show that an admin has replied to the user\'s opinion', () => {
        dashboardPage.getOpinions().each(($opinion) => {
            const opinionId = $opinion.data('cy-opinion-id');
            dashboardPage.getAdminReplyIndicator(opinionId).should('be.visible');
        });
    });
});
