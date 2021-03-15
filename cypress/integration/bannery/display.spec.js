/// <reference types="cypress" />

describe('Bannery', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.clearCookies();
    cy.reload();
    cy.window().should('have.property', 'appReady', true);
  });

  context('when startDate is present', () => {
    it('should be visible if the current date is later', () => {
      cy.window().then((win) => {
        win.Bannery({
          options: {
            title: 'lorem ipsum',
            display: {
              startDate: new Date(),
            },
          },
        });
        cy.get('.bannery').should('be.visible');
      });
    });

    it('should not be visible if the current date is earlier', () => {
      cy.window().then((win) => {
        win.Bannery({
          options: {
            title: 'lorem ipsum',
            display: {
              startDate: Cypress.moment(new Date()).add({ days: 1 }).toDate(),
            },
          },
        });
        cy.get('.bannery').should('not.exist');
      });
    });
  });

  context('when endDate is present', () => {
    it('should be visible if the current date is earlier', () => {
      cy.window().then((win) => {
        win.Bannery({
          options: {
            title: 'lorem ipsum',
            display: {
              endDate: Cypress.moment(new Date()).add({ days: 5 }).toDate(),
            },
          },
        });
        cy.get('.bannery').should('be.visible');
      });
    });

    it('should not be visible if the current date is later', () => {
      cy.window().then((win) => {
        win.Bannery({
          options: {
            title: 'lorem ipsum',
            display: {
              endDate: Cypress.moment(new Date()).subtract({ days: 5 }).toDate(),
            },
          },
        });
        cy.get('.bannery').should('not.exist');
      });
    });
  });

  context('when startDate and endDate is present', () => {
    it('should be visible if the current date is between startDate and endDate', () => {
      cy.window().then((win) => {
        win.Bannery({
          options: {
            title: 'lorem ipsum',
            display: {
              startDate: Cypress.moment(new Date()).subtract({ days: 5 }).toDate(),
              endDate: Cypress.moment(new Date()).add({ days: 5 }).toDate(),
            },
          },
        });
        cy.get('.bannery').should('be.visible');
      });
    });

    it('should not be visible if the current date is not between startDate and endDate', () => {
      cy.window().then((win) => {
        win.Bannery({
          options: {
            title: 'lorem ipsum',
            display: {
              startDate: Cypress.moment(new Date()).add({ days: 1 }).toDate(),
              endDate: Cypress.moment(new Date()).add({ days: 2 }).toDate(),
            },
          },
        });
        cy.get('.bannery').should('not.exist');
      });
    });
  });

  context('when display.mode is present', () => {
    context('when cookie', () => {
      it('should be visible one time setting a cookie', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'lorem ipsum',
              display: {
                mode: 'cookie',
              },
            },
          });
          cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
          win.Bannery({
            options: {
              title: 'lorem ipsum',
              display: {
                mode: 'cookie',
              },
            },
          });
          cy.get('.bannery').should('not.exist');
        });
      });
    });

    context('when session', () => {
      it('should be visible one time setting an item to sessionStorage', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'lorem ipsum',
              display: {
                mode: 'session',
              },
            },
          });
          cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
          win.Bannery({
            options: {
              title: 'lorem ipsum',
              display: {
                mode: 'session',
              },
            },
          });
          cy.get('.bannery').should('not.exist');
        });
      });
    });
  });
});
