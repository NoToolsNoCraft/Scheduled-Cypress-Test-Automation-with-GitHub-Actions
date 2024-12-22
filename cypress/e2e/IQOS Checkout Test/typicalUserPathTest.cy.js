Cypress.on('uncaught:exception', (err) => {
    console.error('Error:', err.message);
    return false;
});

describe('Shop Page Tests', () => {
    beforeEach(() => {
      cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
      cy.viewport(2000, 2000)
    });
  
    it('Valid Shop Test', () => {
    cy.visit('https://www.iqos.com/gb/en/home.html?gr=false');
      
    // Soft Age Gate. Select the month from the dropdown
    cy.get('#dropdownMonths')
    .parent().click();
    cy.get('#sag-month-01').click({ force: true });
    // Select the year from the dropdown
    cy.get('#dropdownYears')
    .parent().click();
    cy.get('#sagyear1999').click({ force: true });
    // Click the confirm button
    cy.get('span.sav-btn-text:contains("Confirm")').click().wait(2000);

    // Now the Homepage should open, so the second button in the main banner should be clicked
    cy.get('a.btn-outline-slate-slate')
        .eq(1)
        .click({force: true})
        .wait(3000);

    // After clicking on the button the shop page should open. On the Shop page Cypress should
    // click on the Buy button of the first product. 
    cy.get('a.btn-slate-turquoise.w-100.plp-page__product--add-to-cart')
      .eq(0)
      .scrollIntoView()
      .should('be.visible') // Optional: Confirm the element is visible
      .click();

    // After clicked, the Product page should open
    cy.get('button.btn-slate-turquoise.w-100')
      .contains('Add to basket')
      .scrollIntoView()
      .should('be.visible') // Optional: Confirm the element is visible
      .click()
      .wait(5000);

    //Minicart will appear as a pop up. We want to catch it when appears and close it.
    cy.get('#minicart', {timeout:30_000}).should('be.visible')
    cy.get('button.btn.btn--icon.btn-close.link-device__header--btn').eq(0).click()

    // Click on the Shopping Cart icon
    cy.get('a.actionBar__icon.j-openToggle.j-over.actionbar-minicart-link')
      .eq(1)
      .click({ force: true })
      .wait(5000);

    // When the Shopping Cart page opens, we want to navigate to the Checkout page.
    cy.get('a.my-cart__checkout-btn.global-btn.btn--dark').eq(0).click({ force: true });

    // Since we are testing as a non-logged in user, the Checkout button should open the login
    // page so that the User can continue the shopping procedure.
    // Confirm the login page is visible. Here this test stops for data privacy reason.
    cy.contains('Welcome to secure checkout', {timeout:10_000}).should('be.visible')

      })
    });
  
 