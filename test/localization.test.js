import { expect } from '@open-wc/testing';
import LocalizationModule, { localization } from '../src/localization.js';

describe('Localization', () => {

    it('should return value', () => {
        const localization = new LocalizationModule();
        localization.setLanguageSource({ "employee.list.no.results": "No Result For Search" });
        expect(localization.get("employee.list.no.results")).to.equal("No Result For Search");
    });

    it('should return value with data', () => {
        const localization = new LocalizationModule();
        localization.setLanguageSource({ 'employee.list.delete.confirm': 'Selected Employee record of {0} {1} will be deleted' });
        expect(localization.get('employee.list.delete.confirm', ['Güven', 'Altuntaş'])).to.equal('Selected Employee record of Güven Altuntaş will be deleted');
    });

    it('should load tr file', async () => {
        const localization = new LocalizationModule();
        await localization.changeLanguage('tr');
        expect(localization.getLanguageKey()).to.equal('tr');
    });

    it('should not change on same value', async () => {
        const localization = new LocalizationModule();
        localization.setLanguageKey('tr');
        await localization.changeLanguage('tr');
        expect(localization.getLanguageKey()).to.equal('tr');
    });
});
