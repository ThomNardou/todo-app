// https://on.cypress.io/api
describe('Good Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Sign up Test', () => {
    cy.visit("/register")

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

  it('Logout', () => {
    // Login
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');
    cy.get("button[type='submit']").click();

    // Home Page
    cy.get('#pfpDrop').click();
    cy.get('#logout').click();

    cy.visit('/login');

    // Login Page
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    // Home Page
    cy.get('#title').contains('Ajouter une tâche');
  })

  // TODO corriger dans le code l'edit du compte
  // it('Edit account', () => {
  //   // Login
  //   cy.get("input[name='email']").type('test2@test.com');
  //   cy.get("input[name='password']").type('12345678');
  //   cy.get("button[type='submit']").click();
  //
  //   // Home Page
  //   cy.visit('/profile');
  //
  //   // Edit Page
  //   cy.get("input[name='name']").type('John Doe');
  //   cy.get("input[name='address']").type('Route de Vennes');
  //   cy.get("input[name='zip']").type('1001');
  //   cy.get("input[name='location']").type('Lausanne');
  //   cy.get("button[type='submit']").click();
  //
  //   // Home Page
  //   cy.visit('/');
  //   cy.visit('/profile');
  //   cy.get("input[name='name']").should('contain', 'John Doe');
  //   cy.get("input[name='address']").should('contain', 'Route de Vennes');
  //   cy.get("input[name='zip']").should('contain', '1001');
  //   cy.get("input[name='location']").should('contain', 'Lausanne');
  // })

  it('Delete account', () => {
    // Login
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');
    cy.get("button[type='submit']").click();

    // Home Page
    cy.visit('/profile');

    cy.get("#delete").click();

    cy.visit('/');
    cy.get("input[name='email']").type('test2@test.com');
    cy.get("input[name='password']").type('12345678');

    cy.get("button[type='submit']").click();

    cy.get('.errorMessage').should('be.exist');
    cy.get('.errorMessage').contains('Utilisateur non trouvé');
  })

  it('Nav to about page', () => {
    // Login
    cy.visit('/about');
    cy.get('h1').type('Todo App');
  })
});
