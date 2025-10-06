import { html, fixture, expect } from '@open-wc/testing';
import '../src/app.js';
import { localization } from '../src/localization.js';

//mock changeLanguage
localization.changeLanguage = () => Promise.resolve();

describe('App js', () => {
    it('should render', async () => {
        const element = await fixture(html`<project-app></project-app>`);
        expect(element).to.exist;
    });
});
