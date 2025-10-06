import { html, LitElement } from "lit";
import { reset } from "../../styles/reset";
import { employeeItemStyles } from "./employee-item.styles";
import { Router } from "@vaadin/router";
import { localization } from "../../localization";

/**
 * Displays a single employee’s information in a card layout.
 * @fires item-delete - Fires on delete button click
 */
class EmployeeItem extends LitElement {
    static styles = [reset, employeeItemStyles];

    static properties = {
        item: { type: Object },
        hideActions: { type: Boolean }
    }

    constructor(){
        super();
        this.item = {};
        this.hideActions = false;
    }

    /**
     * Handles delete button click
     * @param {Object} item - The employee item to delete
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
            <div class="employee-card">
                <dl>
                    <div class="group">
                        <dt>${localization.get('employee.property.first.name')}</dt>
                        <dd>${this.item.firstName}</dd>
                    </div>
                    <div class="group">
                        <dt>${localization.get('employee.property.last.name')}</dt>
                        <dd>${this.item.lastName}</dd>
                    </div>
                    <div class="group">
                        <dt>${localization.get('employee.property.date.of.employment')}</dt>
                        <dd>${this.item.dateOfEmployment}</dd>
                    </div>
                    <div class="group">
                        <dt>${localization.get('employee.property.date.of.birth')}</dt>
                        <dd>${this.item.dateOfBirth}</dd>
                    </div>
                    <div class="group">
                        <dt>${localization.get('employee.property.phone')}</dt>
                        <dd>${this.item.phoneNumber}</dd>
                    </div>
                    <div class="group">
                        <dt>${localization.get('employee.property.email')}</dt>
                        <dd>${this.item.email}</dd>
                    </div>
                    <div class="group">
                        <dt>${localization.get('employee.property.department')}</dt>
                        <dd>${this.item.department}</dd>
                    </div>
                    <div class="group">
                        <dt>${localization.get('employee.property.position')}</dt>
                        <dd>${this.item.position}</dd>
                    </div>
                </dl>
                ${!this.hideActions ? html`
                    <div class="button-set">
                        <button class="btn blue" @click=${() => Router.go(`/employee/${this.item.id}`)}><img src="/src/assets/icons/edit-white-icon.svg">${localization.get('action.edit')}</button>
                        <button class="btn" @click=${() => this.onDelete(this.item)}><img src="/src/assets/icons/delete-white-icon.svg">${localization.get('action.delete')}</button>
                    </div>
                `: ''}
            </div>
        `
    }
}

customElements.define('employee-item', EmployeeItem);