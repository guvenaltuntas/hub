import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/masked-input/masked-input.component.js';

describe('MaskedInput', () => {
    it('should render', async () => {
        const element = await fixture(html`<masked-input></masked-input>`);
        expect(element).to.exist;
    });

    it('should fire value-changed', async () => {
        const element = await fixture(html`<masked-input></masked-input>`);
        const input = element.shadowRoot.querySelector('input');
        input.value = '12345';

        setTimeout(() => input.dispatchEvent(new Event('input')));
        
        const event = await oneEvent(element, 'value-changed');
        expect(event.detail.value).to.equal('12345');
    });
});
