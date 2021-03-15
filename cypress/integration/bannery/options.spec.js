/// <reference types="cypress" />

describe('Bannery', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().should('have.property', 'appReady', true);
  });

  describe('Remote options', () => {
    context('when url is present', () => {
      it('should load and work', () => {
        cy.intercept('/example.json').as('getUrl');
        cy.window().then((win) => {
          win.Bannery({ url: '/example.json' });
          cy.wait('@getUrl');
          const banneryClass = '.bannery';
          cy.get(banneryClass).should('be.visible');
          cy.get(banneryClass).get('.bannery__buttons__secondary').click();
          cy.get(banneryClass).should('not.exist');
        });
      });
    });
  });

  describe('Local options', () => {
    context('when url is present', () => {
      it('should merge priorizing remote options', () => {
        cy.window().then((win) => {
          win.Bannery({
            url: '/example.json',
            options: {
              title: 'Merging options',
              buttons: {
                primaryText: 'Say hello',
              },
            },
          });
          const banneryClass = '.bannery';
          cy.get(banneryClass)
            .should('be.visible')
            .find('.bannery__title')
            .should('not.contain.text', 'Merging options');
        });
      });
    });

    context('when enable is present', () => {
      it('should be visible if true', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              enable: true,
              title: 'lorem ipsum',
              buttons: {
                primaryText: 'Say hello',
              },
            },
          });
          const banneryClass = '.bannery';
          cy.get(banneryClass).should('be.visible');
        });
      });

      it('should not be visible if false', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              enable: true,
              title: 'lorem ipsum',
              buttons: {
                primaryText: 'Say hello',
              },
            },
          });
          const banneryClass = '.bannery';
          cy.get(banneryClass).should('not.be.visible');
        });
      });
    });

    const elements = ['title', 'description'];
    elements.forEach((element) => {
      context(`when ${element} is present`, () => {
        it('should be shown', () => {
          cy.window().then((win) => {
            win.Bannery({
              options: {
                [element]: 'lorem ipsum',
              },
            });
            cy.get(`.bannery__${element}`).should('contain.text', 'lorem ipsum');
          });
        });

        it('should render markdown', () => {
          cy.window().then((win) => {
            win.Bannery({
              options: {
                [element]: '**lorem ipsum**',
              },
            });
            cy.get(`.bannery__${element} strong`).should('contain', 'lorem ipsum');
          });
        });

        it('should not render html', () => {
          cy.window().then((win) => {
            win.Bannery({
              options: {
                [element]: 'lorem <strong>ipsum</strong>',
              },
            });
            cy.get(`.bannery__${element} strong`).should('not.exist');
          });
        });
      });
    });

    context('when position is present', () => {
      it('should be on top when "top"', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'lorem ipsum',
              position: 'top',
            },
          });
          cy.get('.bannery--top').should('exist');
          cy.get('.bannery--bottom').should('not.exist');
        });
      });

      it('should default to slide fade down animation when "top"', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
              position: 'top',
            },
          });
          cy.get('.slide-down-fade-enter-active').should('exist');
        });
      });

      it('should be on bottom when "bottom"', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'lorem ipsum',
              position: 'bottom',
            },
          });
          cy.get('.bannery--top').should('not.exist');
          cy.get('.bannery--bottom').should('exist');
        });
      });
    });

    context('when buttons.primaryLink is present', () => {
      it('should be shown and be a link', () => {});
    });

    const buttons = ['primary', 'secondary'];
    buttons.forEach((b) => {
      context(`when buttons.${b}Text is present`, () => {
        it('should be shown', () => {
          cy.window().then((win) => {
            win.Bannery({
              options: {
                buttons: {
                  [`${b}Text`]: 'lorem ipsum button',
                },
              },
            });
            cy.get(`.bannery__buttons__${b}`)
              .should('be.visible')
              .and('contain.text', 'lorem ipsum button');
          });
        });
      });
    });

    context('when themeClass is present', () => {
      it('should use the default one when empty', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
            },
          });
          cy.get('.bannery-default-theme').should('exist');
        });
      });

      it('should be part of root class', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
              themeClass: 'super-foo-theme',
            },
          });
          cy.get('.bannery.super-foo-theme').should('exist');
        });
      });
    });

    context('when css is present', () => {
      it('should be injected on head tag as style script', () => {
        cy.window().then((win) => {
          win.Bannery({
            options: {
              title: 'Lorem ipsum',
              css: '.bannery { background: black; }',
            },
          });
          cy.get('head #bannery-styles').should('exist');
        });
      });

      it('should be a head tag with the key in the id', () => {
        cy.window().then((win) => {
          win.Bannery({
            key: 'super-bannery',
            options: {
              title: 'Lorem ipsum',
              css: '.bannery { background: black; }',
            },
          });
          cy.get('head #bannery-styles-super-bannery').should('exist');
        });
      });
    });
  });
});
