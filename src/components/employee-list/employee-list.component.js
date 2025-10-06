import { LitElement, html, css } from 'lit';
import { employeesStore, remove } from '../../store/employees.store.js';
import '../content-header/content-header.component.js';
import '../presentation-type-table/presentation-type-table.component.js';
import '../presentation-type-list/presentation-type-list.component.js';
import '../project-pagination/project-pagination.component.js'
import '../confirm-popup/confirm-popup.component.js'
import { reset } from '../../styles/reset.js';
import { employeeListStyles } from './employee-list.styles.js';
import { Router } from '@vaadin/router';
import { localization } from '../../localization.js';

export class EmployeeList extends LitElement {
    static styles = [reset, employeeListStyles];

    static properties = {
        location: { attribute: false },
        items: { state: true },
        searchInputValue: { state: true },
        pageNo: { state: true },
        pageSize: { state: true },
        selectedPresentationFormat: { state: true },
        confirmation: { state: true }
    };

    constructor() {
        super();
        this.items = [];
        this.searchInputValue = '';
        this.pageNo = 1;
        this.pageSize = 10;
        this.selectedPresentationFormat = 'list';
        this.confirmation = {
            visible: false,
            data: null
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.items = employeesStore.getState().employeeList;
        this.storeSubscription = employeesStore.subscribe(() => {
            this.items = employeesStore.getState().employeeList;
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.storeSubscription?.();
    }

    willUpdate(changed) {
        if (changed.has('location')) {
            const pageNo = this.location?.params?.pageNo;
            if (pageNo) {
                this.pageNo = Number(pageNo);
            } else {
                this.pageNo = 1;
            }
        }
    }

    get flteredItems() {
        //if not search return allresults
        if (!this.searchInputValue) return this.items;
        // return items includes search
        return this.items.filter((item) => {
            return item.firstName?.toLowerCase().includes(this.searchInputValue) || item.lastName?.toLowerCase().includes(this.searchInputValue) || item.email?.toLowerCase().includes(this.searchInputValue);
        });
    }

    get pagedItems() {
        let startIndex = (this.pageNo - 1) * this.pageSize; // since its index +1 -1 its equal
        return this.flteredItems?.slice(startIndex, startIndex + this.pageSize);
    }

    get totalPages() {
        if (!this.searchInputValue) return Math.ceil(this.items.length / this.pageSize);
        return Math.ceil(this.flteredItems.length / this.pageSize);
    }

    changePage(pageNo) {
        if (!pageNo || pageNo && pageNo > this.totalPages) return;
        if (this.searchInputValue) {
            this.pageNo = pageNo;
        } else {
            Router.go(`/employee-list/${pageNo}`)
        }
    }

    /**
     * Shows confirmation for deleting an employee.
     * @param {Object} employeeData - Employee to be deleted
     */
    onDelete(employeeData) {
        this.confirmation = {
            visible: true,
            data: employeeData
        }
    }

    /**
     * @param {string} newValue - New search value
     */
    onSearchInputChange(newValue) {
        this.searchInputValue = newValue;
        if (this.searchInputValue) {
            this.pageNo = 1;
        } else {
            const pageNo = this.location?.params?.pageNo;
            if (pageNo) {
                this.pageNo = Number(pageNo);
            } else {
                this.pageNo = 1;
            }
        }
    }

    /**
     * Updates selected presentation format.
     * @param {'list'|'table'} newValue - New value
     */
    onPresentationFormatChange(newValue) {
        this.selectedPresentationFormat = newValue;
    }

    /**
     * Handles user confirmation for deleting an employee.
     * @param {boolean} answer - true if confirmed, false if canceled
     */
    onDeleteAnswer(answer){
       
        if (answer) {
            employeesStore.dispatch(remove(this.confirmation?.data?.id));
        }

        this.confirmation = {
            visible: false,
            data: null
        }
    }

    render() {
        return html`
            <section>
                <content-header 
                    .showFilters=${this.items.length > 0} 
                    @search-input-change=${(event)=>{this.onSearchInputChange(event.detail)}}
                    @format-change=${(event)=>{this.onPresentationFormatChange(event.detail)}}
                ></content-header>

                <div class="employee-listing project-size">
                    ${this.pagedItems.length === 0 ? 
                        this.searchInputValue ? html`
                            <div class="empty-list">${localization.get('employee.list.no.results')}</div>
                        `: html`
                            <div class="empty-list">${localization.get('employee.list.no.records')}</div>
                        `
                    : html`
                        ${this.selectedPresentationFormat === 'list'?
                            html`<presentation-type-list .items=${this.pagedItems} @item-delete=${(event)=>{this.onDelete(event.detail)}}></presentation-type-list>` :
                            html`<presentation-type-table .items=${this.pagedItems} @item-delete=${(event)=>{this.onDelete(event.detail)}}></presentation-type-table>`
                        }
                    `}

                    ${this.totalPages > 1 ? html`
                        <project-pagination .pageNo=${this.pageNo} .totalPages=${this.totalPages} @page-change=${(event)=>{this.changePage(event.detail)}}></project-pagination>
                    `: ''}  
                </div>
            </section>
            <project-confirm .visible=${this.confirmation.visible} @answer=${(e)=>{this.onDeleteAnswer(e.detail)}}>
                ${localization.get('employee.list.delete.confirm', [this.confirmation?.data?.firstName, this.confirmation?.data?.lastName])}
            </project-confirm>
        `;
    }
}

customElements.define('employee-list', EmployeeList);