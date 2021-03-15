/// <reference types="cypress" />

describe('Bannery', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().should('have.property', 'appReady', true);
  });

  describe('hooks', () => {
    context('when onOptions', () => {
      it('should be executed', () => {
        cy.window().then((win) => {
          const hooks = {
            onOptions() {},
          };
          cy.stub(hooks, 'onOptions').as('onOptions');
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
            },
            hooks,
          });
          cy.get('@onOptions').should('have.been.called');
        });
      });
      it('should use onOptions return value as options', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
            },
            hooks: {
              onOptions: (options) => {
                options.title = 'onOptions title';
                return options;
              },
            },
          });
          cy.get(`.bannery__title`).should('contain.text', 'onOptions title');
        });
      });
    });

    context('when onOpen', () => {
      it('should be executed on banner opening', () => {
        it('should be executed', () => {
          cy.window().then((win) => {
            const hooks = {
              onOpen() {},
            };
            cy.stub(hooks, 'onOpen').as('onOpen');
            win.Bannery({
              options: {
                title: 'Lorem ipsum',
              },
              hooks,
            });
            cy.get('@onOpen').should('have.been.called');
          });
        });
      });
      it('should avoid banner opening if returns false', () => {
        cy.window().then((win) => {
          const hooks = {
            onOpen() {
              return false;
            },
          };
          cy.spy(hooks, 'onOpen').as('onOpen');
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
            },
            hooks,
          });
          cy.get('@onOpen').should('have.been.called');
          cy.get('.bannery').should('not.exist');
        });
      });
    });

    context('when onPrimary', () => {
      it('should be executed when primery button is clicked', () => {
        cy.window().then((win) => {
          const hooks = {
            onPrimary(e) {
              e.preventDefault();
              return false;
            },
          };
          cy.spy(hooks, 'onPrimary').as('onPrimary');
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
              buttons: {
                primaryText: 'Click me',
              },
            },

            hooks,
          });
          cy.get('.bannery__buttons__primary').click();
          cy.get('@onPrimary').should('have.been.called');
        });
      });
    });

    context('when onSecondary', () => {
      it('should be executed when secondary button is clicked', () => {
        cy.window().then((win) => {
          const hooks = {
            onSecondary(e) {
              e.preventDefault();
              return false;
            },
          };
          cy.spy(hooks, 'onSecondary').as('onSecondary');
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
              buttons: {
                secondaryText: 'Click me',
              },
            },

            hooks,
          });
          cy.get('.bannery__buttons__secondary').click();
          cy.get('@onSecondary').should('have.been.called');
        });
      });
    });
  });
});
