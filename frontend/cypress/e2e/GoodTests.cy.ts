// https://on.cypress.io/api

describe('Good Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login Test', () => {
    cy.visit('/');
    // Login Page
    cy.get('#register').click();

    // Register Page
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');
    cy.get("input[name='confirmation']").type('12345678');
    cy.get("button[type='submit']").click();

    // Login Page
    cy.get('#title').contains('Connectez-vous');
  });

  it('Connect Test', () => {
    // Login Page
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    // Home Page
    cy.get('#title').contains('Ajouter une tâche');
  });

  it('Create a new TODO', () => {
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();
    cy.get('#todoName').type('Test TODO');

    cy.get('#submitTodo').click();

    cy.get('#todoValue').contains('Test TODO');
  });

  it('Validate a TODO', () => {
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    cy.get('#listOfTodo > li > div > input[type="checkbox"]').click();

    cy.get('#listOfTodo > li > div > input[type="checkbox"]').should('be.checked');
    cy.get('#listOfTodo > li').should('have.css', 'background-color', 'rgb(244, 63, 94)');
  });

  it('Delete a TODO', () => {
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    cy.get('.trashIcon').click();

    cy.get('#listOfTodo > li').contains('div').should('not.exist');
  });

  after(() => {
    cy.visit('/');

    // Home Page
    cy.get('#pfpDrop').click();
    cy.get('#profile').click();

    // Profile Page
    cy.get('#delete').click();
  });
});
