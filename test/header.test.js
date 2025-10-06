import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/header/header.component.js';



describe('ProjectHeader', () => {

    it('should render', async () => {
        const element = await fixture(html`<project-header></project-header>`);
        expect(element).to.exist;
    });

    it('should set active nav', async () => {
        const element = await fixture(html`<project-header></project-header>`);

        element.currentPath = '/employee-list';
        await element.updateComplete;

        const navLinks = element.shadowRoot.querySelectorAll('nav a');

        const firstLink = navLinks[0];
        expect(firstLink.className).to.equal('active');

        const secondLink = navLinks[1];
        expect(secondLink.className).to.equal('');
    });

});
