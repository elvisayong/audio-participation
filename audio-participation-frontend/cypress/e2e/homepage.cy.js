

describe('Homepage', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.contains('Available Plans'); // Adjust this selector to match something on your 
  });
});
