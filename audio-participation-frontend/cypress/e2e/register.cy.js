import RegisterPage from '../pages/RegisterPage';

describe('User Authentication - Register', () => {
    const registerPage = new RegisterPage();

    beforeEach(() => {
        registerPage.visit();
    });

    it('should register a new user with valid information', () => {
        const username = `user${Date.now()}`; // Unique username
        const password = 'password';
        const email = `${username}@example.com`;

        registerPage.register(username, password, email);
        cy.url().should('include', '/');  
    });

    it('should show an error with missing username', () => {
        registerPage.fillPassword('password');
        registerPage.fillEmail('user@example.com');
        registerPage.submit();
        cy.get('[data-cy=register-error]').should('be.visible').and('contain', 'Please check your input');
    });

    it('should show an error with missing email', () => {
        registerPage.fillUsername('newuser');
        registerPage.fillPassword('password');
        registerPage.submit();
        cy.get('[data-cy=register-error]').should('be.visible').and('contain', 'Please check your input');
    });

    it('should show an error with missing password', () => {
        registerPage.fillUsername('newuser');
        registerPage.fillEmail('user@example.com');
        registerPage.submit();
        cy.get('[data-cy=register-error]').should('be.visible').and('contain', 'Please check your input');
    });
});
