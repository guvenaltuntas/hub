import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/presentation-type-list/presentation-type-list.component.js';

describe('PresentationTypeList', () => {
    it('should render', async () => {
        const element = await fixture(html`<presentation-type-list></presentation-type-list>`);
        expect(element).to.exist;
    });

    it('should fire item-delete', async () => {
        const items = [{ firstName: 'Güven', lastName: 'Altuntaş' }];
        const element = await fixture(html`<presentation-type-list .items=${items}></presentation-type-list>`);
        await element.updateComplete;

        const deleteButton = element.shadowRoot.querySelector('tbody tr td button:last-child');
        setTimeout(() => deleteButton.click());

        const event = await oneEvent(element, 'item-delete');

        expect(event.detail.firstName).to.equal('Güven');
    });
});
