describe('Bad Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('login with an account who not exists', () => {
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    cy.get('.errorMessage').should('be.exist');
  });
});
