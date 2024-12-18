describe('Bad Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  ///////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////
  it('login with an account who not exists', () => {
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    cy.get('.errorMessage').should('be.exist');
    cy.get('.errorMessage').contains('Utilisateur non trouvé');
  });

  it('bad email format (LOGIN)', () => {
    cy.get("input[name='email']").type('test2');

    cy.get('.inputErrorMessage').should('be.exist');
    cy.get('.inputErrorMessage').contains('Format email incorrect');
  });

  it('no password', () => {
    cy.get("input[name='email']").type('test2@test.com');

    cy.get("button[type='submit']").click();

    cy.get('.inputErrorMessage').should('be.exist');
    cy.get('.inputErrorMessage').contains('Vous devez renseigner ce champ');
  });

  ///////////////////////////////////////////////// REGISTER //////////////////////////////////////////////////
  it('bad email format (REGISTER)', () => {
    cy.visit('/register');
    cy.get("input[name='email']").type('test2');

    cy.get('.inputErrorMessage').should('be.exist');
    cy.get('.inputErrorMessage').contains('Format email incorrect');
  });

  it('Password less than 8 characters long', () => {
    cy.visit('/register');
    cy.get("input[name='email']").type('test@test.ch');
    cy.get("input[name='password']").type('1234567');

    cy.get('.inputErrorMessage').should('be.exist');
    cy.get('.inputErrorMessage').contains('Le mot de passe doit faire au moins 8 caractères');
  });

  it('Password and confirmation are different', () => {
    cy.visit('/register');
    cy.get("input[name='email']").type('test@test.ch');
    cy.get("input[name='password']").type('12345678');
    cy.get("input[name='confirmation']").type('123456789');

    cy.get('.inputErrorMessage').should('be.exist');
    cy.get('.inputErrorMessage').contains('Les mots de passe ne correspondent pas');
  });

  ///////////////////////////////////////////////// TO DO //////////////////////////////////////////////////
  it('Create todo with no title', () => {
    cy.visit('/register');
    cy.get("input[name='email']").type('test@test.ch');
    cy.get("input[name='password']").type('12345678');
    cy.get("input[name='confirmation']").type('12345678');
    cy.get("button[type='submit']").click();

    // Login Page
    cy.visit('/login');
    cy.get("input[name='email']").type('test@test.ch');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    cy.get('#submitTodo').click();
    cy.get('.inputErrorMessage').should('be.exist');
    cy.get('.inputErrorMessage').contains('Vous devez renseigner ce champ');
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
