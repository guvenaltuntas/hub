import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/project-pagination/project-pagination.component.js';

describe('ProjectPagination', () => {
    it('should render', async () => {
        const element = await fixture(html`<project-pagination></project-pagination>`);
        expect(element).to.exist;
    });

    it('should fire page-change', async () => {
        const element = await fixture(html`<project-pagination .totalPages=${5}></project-pagination>`);

        setTimeout(() => element.changePage(3));
        const event = await oneEvent(element, 'page-change');

        expect(event.detail).to.equal(3);
    });

    it('should not change page with invalid pageNo', async () => {
        const el = await fixture(html`<project-pagination .totalPages=${3}></project-pagination>`);

        el.changePage(5);
        expect(el.pageNo).to.equal(1);

        el.changePage(0);
        expect(el.pageNo).to.equal(1);
    });
});