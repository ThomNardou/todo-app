describe('Bad Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('login with an account who not exists', () => {
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    cy.get('.errorMessage').should('be.exist');
    cy.get('.errorMessage').contains('Utilisateur non trouvé');
  });

  it('bad format for the email', () => {
    cy.get("input[name='email']").type('test2');

    cy.get('.intputErrorMessage').should('be.exist');
    cy.get('.intputErrorMessage').contains('Format email incorrect');
  });

  it('no password', () => {
    cy.get("input[name='email']").type('test2@test.com');

    cy.get("button[type='submit']").click();

    cy.get('.intputErrorMessage').should('be.exist');
    cy.get('.intputErrorMessage').contains('Vous devez renseigner ce champ');
  });

  it('bad format and', () => {

  });
});
