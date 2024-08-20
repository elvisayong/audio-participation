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
        cy.url().should('include', '/dashboard');
    });

    it('should navigate to the Add Opinion page and submit an opinion', () => {
        cy.get('[data-cy^="add-opinion-button"]').first().should('be.visible').click();
        cy.url().should('include', '/opinions/');

        // Start recording
        addOpinionPage.startRecording();
        cy.get('.Toastify__toast--success').should('contain.text', 'Recording started'); 

        cy.wait(3000); 

        // Stop recording
        addOpinionPage.stopRecording();
        cy.get('.Toastify__toast--success').should('contain.text', 'Recording stopped'); 

        // Upload the opinion
        addOpinionPage.uploadVoiceNote();
        cy.get('.Toastify__toast--success').should('contain.text', 'Voice note uploaded successfully!'); 

        // Redirect back to dashboard
        cy.url().should('include', '/dashboard'); 

        dashboardPage.getOpinions().should('have.length.greaterThan', 0);
    });
});
