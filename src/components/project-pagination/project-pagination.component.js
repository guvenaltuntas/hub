import { html, LitElement } from "lit";
import { reset } from "../../styles/reset";
import { paginationStyles } from "./project-pagination.styles";


/**
 * @fires page-change - Fires on current page changes. Provides the new page number in detail.
 */
class ProjectPagination extends LitElement {
    static styles = [reset, paginationStyles];

    static properties = {
        pageNo: { type: Number },
        totalPages: { type: Number },
    }

    constructor(){
        super();
        this.pageNo = 1;
        this.totalPages = 1;
    }

    /**
     * Changes the current page and dispatches the 'page-change' event.
     * @param {number} pageNo page number to go.
     * @fires page-change
     */
    changePage(pageNo) {
        if (!pageNo || pageNo > this.totalPages) return;
        this.pageNo = pageNo;
        this.dispatchEvent(new CustomEvent('page-change', {
            bubbles: true,
            composed: true,
            detail: this.pageNo
        }));
    }

    render() {
            return html`
                <div class="pagination">
                    <button type="button" @click=${() => this.changePage(this.pageNo - 1)} class="page-nav ${this.pageNo <= 1 ? 'passive' : ''}"><img src="/src/assets/icons/chevron-right.svg"></button>

                    ${(() => {
                        const pages = [];
                        const total = this.totalPages;
                        const current = this.pageNo;
                        const range = 2;

                        //if total page count below 7 then show all page numbers
                        if (total <= 7) {
                            for (let i = 1; i <= total; i++) {
                                pages.push(html`
                                    <button type="button" diff="${current - i}" class="${i === current ? 'active' : ''}" @click=${() => this.changePage(i)}>${i}</button>
                                `);
                            }
                            return pages;
                        }

                        let start = Math.max(1, current - range);
                        let end = Math.min(total, current + range);

                        if (current <= range + 1) {
                            start = 1;
                            end = 5;
                        }

                        if (current >= total - range) {
                            start = total - 4;
                            end = total;
                        }

                        if (start > 1) {
                            pages.push(html`
                                <button type="button" diff="${current - 1}" @click=${() => this.changePage(1)}>1</button>
                            `);
                            if (start > 2) pages.push(html`<span>...</span>`);
                        }

                        for (let i = start; i <= end; i++) {
                            pages.push(html`
                                <button type="button" diff="${current - i}" class="${i === current ? 'active' : ''}" @click=${() => this.changePage(i)}>${i}</button>
                            `);
                        }

                        if (end < total) {
                            if (end < total - 1) {
                                pages.push(html`<span>...</span>`);
                            }
                            pages.push(html`
                                <button type="button" diff="${current - total}" @click=${() => this.changePage(total)}>${total}</button>
                            `);
                        }

                        return pages;
                    })()}

                    <button type="button" @click=${() => this.changePage(this.pageNo + 1)} class="page-nav ${this.pageNo >= this.totalPages ? 'passive' : ''}"><img src="/src/assets/icons/chevron-right.svg"></button>
                </div>
            `
        }
}

customElements.define('project-pagination', ProjectPagination);