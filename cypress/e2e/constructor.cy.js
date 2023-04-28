/* eslint-disable cypress/no-unnecessary-waiting */
describe('constructor', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it("we can't make order without buns", () => {
        cy.get('[data-testid="order-button"]').should('be.disabled');
        const dataTransfer = new DataTransfer();
        cy.wait(1000); // ожидания получения элементов с сервера и их прогрузки
        cy.get('[data-testid="ingredient"]')
            .eq(3)
            .trigger('dragstart', { dataTransfer });
        cy.get('[data-testid="drag-external-container"]').trigger('drop', {
            dataTransfer,
        });
        cy.get('[data-testid="order-button"]').should('be.disabled');
        cy.get('[data-testid="ingredient"]')
            .eq(1)
            .trigger('dragstart', { dataTransfer });
        cy.get('[data-testid="drag-external-container"]').trigger('drop', {
            dataTransfer,
        });
        cy.get('[data-testid="order-button"]').should('not.be.disabled');
    });
    it('we need to login to make order', () => {
        const dataTransfer = new DataTransfer();
        cy.wait(1000);
        cy.get('[data-testid="ingredient"]')
            .eq(1)
            .trigger('dragstart', { dataTransfer });
        cy.get('[data-testid="drag-external-container"]').trigger('drop', {
            dataTransfer,
        });
        cy.get('[data-testid="order-button"]').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/login');
        });
        cy.get('input[type="email"]').type('user12345@gmail.com');
        cy.get('input[type="password"]').type('qwertyu');
        cy.contains('Войти').click();
        cy.wait(1000); // ждем ожидания перехода на главную страницу
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/');
        });
        cy.get('[data-testid="order-button"]').click();
        cy.wait(15000); // ждем формирование заказа
        cy.get('[data-testid="modal"]').as('modal');
        cy.get('@modal').get('[data-testid="close-button"]').click();
    });
});
