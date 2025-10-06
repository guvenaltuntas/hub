import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/employee-list/employee-list.component.js';
import { Router } from '@vaadin/router';

describe('EmployeeList', () => {
    it('should render', async () => {
        const element = await fixture(html`<employee-list></employee-list>`);
        expect(element).to.exist;
    });

    it('should reset pageNo on search', async () => {
        const element = await fixture(html`<employee-list></employee-list>`);
        element.onSearchInputChange('test query');
        expect(element.pageNo).to.equal(1);
    });
    
    it('should show confirmation', async () => {
        const element = await fixture(html`<employee-list></employee-list>`);
        const employee = { id: 'employee123123123123', firstName: 'Güven', lastName: 'Altuntaş' };
        element.onDelete(employee);
        expect(element.confirmation.visible).to.be.true;
    });

    it('should filter with search', async () => {
        const element = await fixture(html`<employee-list></employee-list>`);
        element.items = [
            { firstName: 'Güven', lastName: 'Altuntaş' },
            { firstName: 'Sinan', lastName: 'Altuntaş' },
        ];
        element.searchInputValue = 'güven';
        const result = element.flteredItems;
        expect(result).to.have.length(1);
        expect(result[0].firstName).to.equal('Güven');
    });

    it('should activate original page when remove search', async () => {
        const element = await fixture(html`<employee-list></employee-list>`);
        element.location = { params: { pageNo: '4' } };
    
        element.onSearchInputChange('test');
        element.onSearchInputChange('');
        expect(element.pageNo).to.equal(4);
    });
});
