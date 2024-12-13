// https://on.cypress.io/api

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  after(() => {
    cy.visit('/');

    // Home Page
    cy.get('#pfpDrop').click();
    cy.get('#profile').click();

    // Profile Page
    cy.get('#delete').click();
  })

  it('Login Test', () => {

    // Login Page
    cy.get("#register").click();

    // Register Page
    cy.get("input[name='email']").type("test2@test.com");
    cy.get("input[name='password']").type("12345678");
    cy.get("input[name='confirmation']").type("12345678");
    cy.get("button[type='submit']").click();

    // Login Page
    cy.get('#title').contains('Connectez-vous');
  });

  it('Connect Test', () => {

    // Login Page
    cy.get("input[name='email']").type("test2@test.com");
    cy.get("input[name='password']").type("12345678");

    cy.get("button[type='submit']").click();

    // Home Page
    cy.get('#title').contains( 'Ajouter une tâche');

  });
});
