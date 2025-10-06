import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/presentation-type-table/presentation-type-table.component.js';

describe('PresentationTypeTable', () => {
    it('should render', async () => {
        const element = await fixture(html`<presentation-type-table></presentation-type-table>`);
        expect(element).to.exist;
    });

    it('should fire item-delete', async () => {
        const items = [{ firstName: 'Güven', lastName: 'Altuntaş' }];
        const element = await fixture(html`<presentation-type-table .items=${items}></presentation-type-table>`);
        await element.updateComplete;

        const employeeItem = element.shadowRoot.querySelector('employee-item');

        setTimeout(() => employeeItem.dispatchEvent(new CustomEvent('item-delete', { detail: employeeItem.item, bubbles: true, composed: true })));
        const event = await oneEvent(element, 'item-delete');

        expect(event.detail).to.deep.equal(items[0]);
    });
});
