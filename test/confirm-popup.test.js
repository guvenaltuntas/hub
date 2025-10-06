import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/confirm-popup/confirm-popup.component.js';

describe('Confirm Popup', () => {
    it('should render', async () => {
        const element = await fixture(html`<project-confirm></project-confirm>`);
        expect(element).to.exist;
    });

    it('should fire answer', async () => {
        const element = await fixture(html`<project-confirm></project-confirm>`);
        setTimeout(() => element.userSelected(true));
        const event = await oneEvent(element, 'answer');
        expect(event.detail).to.be.true;
    });
});
