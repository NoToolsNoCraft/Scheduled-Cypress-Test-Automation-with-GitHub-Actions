Cypress.on('uncaught:exception', (err) => {
    console.error('Error:', err.message);
    return false;
});

beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.viewport(2000, 2000)
    cy.visit('https://www.iqos.com/gb/en/home.html?gr=false');
    cy.get('#dropdownMonths').click();
    cy.contains('January').click()
    cy.get('#dropdownYears').click();
    cy.contains('1999').click()
    cy.contains('span.sav-btn-text', 'Confirm').click();
    cy.contains('Buy from £29', {timeout:10_000}).click() // Click on the promotion button
  })
  
  it('Add a product in the basket and proceed to checkout', () => {
    cy.get('a[href="/gb/en/shop/iqos-iluma-one-starter-kit.html"]').eq(0).click();
    cy.get('#onetrust-reject-all-handler').click()  // get rid of cookies popup
    cy.get('section.product-info__wrapper')
      .find('div.product-detail__react--container')
      .should('be.visible')
    cy.contains('button', 'Add to basket').should('be.visible').click()
  
    cy.get('#minicart', {timeout:30_000}).should('be.visible')
    cy.contains('Proceed to checkout').click()
  
    // confirm checkout is visible
    cy.contains('Welcome to secure checkout', {timeout:10_000}).should('be.visible')
  })