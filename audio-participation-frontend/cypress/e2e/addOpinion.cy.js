import DashboardPage from '../pages/DashboardPage';
import AddOpinionPage from '../pages/AddOpinionPage';
import LoginPage from '../pages/LoginPage';

describe('Dashboard Functionality - Add Opinion', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const addOpinionPage = new AddOpinionPage();

    before(() => {
        loginPage.visit();
        loginPage.login('francesca', 'password');
        cy.url().should('include', '/dashboard'); // Ensure we are redirected to the dashboard
        dashboardPage.visit();
    });

    it('should navigate to the Add Opinion page and submit an opinion', () => {
        const planId = 1;  
        dashboardPage.getAddOpinionButton(planId).should('be.visible'); // Ensure the button is visible
        dashboardPage.navigateToAddOpinion(planId);
        cy.url().should('include', `/opinions/${planId}`); // Ensure navigation to the correct URL
        
        addOpinionPage.startRecording();
        cy.wait(2000); // Wait for recording to take place
        addOpinionPage.stopRecording();
        addOpinionPage.uploadVoiceNote();
        addOpinionPage.verifyOpinionSubmitted();

        dashboardPage.visit();
        dashboardPage.getOpinions().should('have.length.greaterThan', 0); // Check opinions count
    });
});
