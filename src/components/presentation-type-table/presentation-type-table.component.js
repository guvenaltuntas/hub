import { html, LitElement } from "lit";
import { reset } from "../../styles/reset";
import { presentationTypeTableStyles } from "./presentation-type-table.styles";
import { Router } from '@vaadin/router';
import '../employee-item/employee-item.component.js';

/**
 *list of employees in a grid format.
 *
 * @fires item-delete - Fires on employees delete button click. Provides employee data in detail
 */
class PresentationTypeTable extends LitElement {
    static styles = [reset, presentationTypeTableStyles];

    static properties = {
        items: { type: Array }
    }

    constructor(){
        super();
        this.items = [];
    }

    /**
     * @param {Object} item - Employee item to delete
     * @fires item-delete
     */
    onDelete(item) {
        this.dispatchEvent(new CustomEvent('item-delete', {
            bubbles: true,
            composed: true,
            detail: item
        }));
    }

    render() {
        return html`
            <div class="presentation-type-table">
                ${this.items.map((item) => html`
                    <div class="employee-item">
                        <employee-item .item=${item} @item-delete=${(event)=>{this.onDelete(event.detail)}}></employee-item>
                    </div>
                `)}
            </div>
        `
    }
}

customElements.define('presentation-type-table', PresentationTypeTable);