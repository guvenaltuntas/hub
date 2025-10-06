import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/employee-form/employee-form.component.js';
import { employeesStore, add, remove } from '../src/store/employees.store.js';

describe('EmployeeForm', () => {
    it('should render', async () => {
        const element = await fixture(html`<employee-form></employee-form>`);
        expect(element).to.exist;
    });

    it('should open confirmation', async () => {
        const element = await fixture(html`<employee-form></employee-form>`);

        element.model = {
            firstName: 'Güven',
            lastName: 'Altuntaş',
            dateOfEmployment: '1970-01-01',
            dateOfBirth: '1971-01-01',
            phoneNumber: '+(90) 555 563 07 00',
            email: 'guvenaltuntas@gmail.com',
            department: 'Tech',
            position: 'Senior'
        };

        await element.updateComplete;

        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true, composed: true }));

        await element.updateComplete; 

        expect(element.confirmation.visible).to.be.true;
    });

    it('should validate form', async () => {
        const element = await fixture(html`<employee-form></employee-form>`);
        const form = element.shadowRoot.querySelector('form');
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
        await element.updateComplete;
        expect(Object.keys(element.validationErrors).length).to.be.greaterThan(0);
      });
});
