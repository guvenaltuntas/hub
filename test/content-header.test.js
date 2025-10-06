import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/content-header/content-header.component.js';

describe('ContentHeader', () => {
    it('should render', async () => {
        const element = await fixture(html`<content-header></content-header>`);
        expect(element).to.exist;
    });

    it('should fire format-change', async () => {
        const element = await fixture(html`<content-header></content-header>`);

        setTimeout(() => element.onPresentationChange('table'));
        const event = await oneEvent(element, 'format-change');
        expect(event.detail).to.equal('table');
    });

    it('should fire search-input-change', async () => {
        const element = await fixture(html`<content-header .showFilters=${true}></content-header>`);

        const input = element.shadowRoot.querySelector('input');
        input.value = 'I am searching this';
        setTimeout(() => input.dispatchEvent(new Event('input')));
        const event = await oneEvent(element, 'search-input-change');

        expect(event.detail).to.equal('I am searching this');
    });
});
