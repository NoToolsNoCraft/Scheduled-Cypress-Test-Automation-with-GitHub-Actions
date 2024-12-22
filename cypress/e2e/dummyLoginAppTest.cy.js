describe('Login Tests', () => {
  it('Valid Login Test', () => {
    cy.visit('https://notoolsnocraft.tech/simple-login-simulation-for-testing-purposes/');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('Test@123');
    cy.get('#login-button').click();
    cy.get('.popup').should('be.visible');
  });

  it('Invalid Login Test', () => {
    cy.visit('https://notoolsnocraft.tech/simple-login-simulation-for-testing-purposes/');
    cy.get('#email').type('wronguser@example.com');
    cy.get('#password').type('Wrong@123');
    cy.get('#login-button').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Invalid email or password');
    });
  });
});
