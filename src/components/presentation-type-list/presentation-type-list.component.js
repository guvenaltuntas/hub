import { html, LitElement } from "lit";
import { reset } from "../../styles/reset";
import { Router } from '@vaadin/router';
import { presentationTypeListStyles } from "./presentation-type-list.styles";
import { localization } from "../../localization";

/**
 *list of employees in a table format.
 *
 * @fires item-delete - Fires on employees delete button click. Provides employee data in detail
 */
class PresentationTypeList extends LitElement {
    static styles = [reset, presentationTypeListStyles];

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
            <div class="presentation-type-list">
                <table>
                    <thead>
                        <tr>
                            <td>${localization.get('employee.property.first.name')}</td>
                            <td>${localization.get('employee.property.last.name')}</td>
                            <td>${localization.get('employee.property.date.of.employment')}</td>
                            <td>${localization.get('employee.property.date.of.birth')}</td>
                            <td>${localization.get('employee.property.phone')}</td>
                            <td>${localization.get('employee.property.email')}</td>
                            <td>${localization.get('employee.property.department')}</td>
                            <td>${localization.get('employee.property.position')}</td>
                            <td>${localization.get('employee.property.actions')}</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.items.map((item) => html`
                            <tr>
                                <td>${item.firstName}</td>
                                <td>${item.lastName}</td>
                                <td>${item.dateOfEmployment}</td>
                                <td>${item.dateOfBirth}</td>
                                <td>${item.phoneNumber}</td>
                                <td>${item.email}</td>
                                <td>${item.department}</td>
                                <td>${item.position}</td>
                                <td>
                                    <button @click=${() => Router.go(`/employee/${item.id}`)}><img src="/src/assets/icons/edit-icon.svg"></button>
                                    <button @click=${() => this.onDelete(item)}><img src="/src/assets/icons/delete-icon.svg"></button>
                                </td>
                            </tr>
                        `
                        )}
                    </tbody>
                </table>
                
            </div>
        `
    }
}

customElements.define('presentation-type-list', PresentationTypeList);