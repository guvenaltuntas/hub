import { LitElement, html } from 'lit';
import { add, employeesStore, update } from '../../store/employees.store.js';
import { Router } from '@vaadin/router';
import { reset } from '../../styles/reset.js';
import { employeeFormStyles } from './employee-form.styles.js';
import '../flat-picker/flat-picker.component.js';
import '../masked-input/masked-input.component.js';
import '../employee-item/employee-item.component.js';
import '../confirm-popup/confirm-popup.component.js';   
import { localization } from '../../localization.js';

class EmployeeForm extends LitElement {
    static styles = [reset, employeeFormStyles];

    static properties = {
        location: { attribute: false },
        model: { state: true },
        isEdit: { state: true },
        departmentOptions: { state: true },
        positionOptions: { state: true },
        validationErrors: { state: true },
        submitted: { state: true },
        confirmation: { state: true },
        globalError: { state: true }
    };

    constructor() {
        super();
        //form element names should match with model to reduce in onSubmit work
        this.emptyModel = {
            firstName: '',
            lastName: '',
            dateOfEmployment: '',
            dateOfBirth: '',
            phoneNumber: '',
            email: '',
            department: '',
            position: ''
        };
        //copy empty model to model
        this.model = { ...this.emptyModel };
        this.isEdit = false;
        this.departmentOptions = ['Analytics', 'Tech'];
        this.positionOptions = ['Junior', 'Medior', 'Senior'];
        this.validationErrors = {};
        this.submitted = false;
        this.globalError = ''
        this.confirmation = {
            visible: false,
            data: null
        }
    }

    /**
     * Validates an input element and updates error state.
     * @param {EventTarget} e - event for target value and name
     */
    handleInput(e){
        if (this.validateInputAndValue(e.target, e.target.value)) {
            delete this.validationErrors[e.target.name];
            this.requestUpdate();
        } else {
            this.validationErrors = {
                ...this.validationErrors,
                [e.target.name]: true
            }
        }
    }

    firstUpdated() {
        const form = this.shadowRoot.querySelector('form');
        const formElements = form.querySelectorAll('input, textarea, select');
        formElements.forEach(element => {
            element.addEventListener('input', (e) => {
                this.handleInput(e)
            });
        });
    }

    willUpdate(changed) {
        if (changed.has('location')) {
            const id = this.location?.params?.id;
            if (id) {
                const allStore = employeesStore.getState().employeeList;
                const existing = allStore.find((item) => {
                    //we rely on id we created while saving it so possible missing data saved from other sources will be matched as well. if we use email as unique identifyer, records created by an editor as a future employee that has no email yet can fail our plan.
                    return item.id == id;
                });
                this.model = existing ? { ...existing } : { ...this.emptyModel };
                this.isEdit = existing ? true : false;
            } else {
                this.model = { ...this.emptyModel };
                this.isEdit = false;
            }
        }
    }

    /**
     * Validates input value.
     * @param {HTMLInputElement} input
     * @param {string} value
     * @returns {boolean}
     */
    validateInputAndValue(input, value){
        if (input?.type == 'hidden' || input?.type == 'select-one') {
            return input?.value != '';
        }

        return input?.checkValidity();
    }

    /**
     * Handles form submit and triggers confirmation.
     */
    onSubmit = (e) => {
        e.preventDefault();

        this.submitted = true;
        this.globalError = '';
        this.validationErrors = {};
        const form = e.currentTarget;
        const formData = Object.fromEntries(new FormData(form).entries());
        const payload = Object.keys(this.model).reduce((accumilator, key) => {
            if (formData[key] !== undefined) {
                accumilator[key] = formData[key].trim();
            } else {
                accumilator[key] = this.model[key];
            }
            return accumilator;
        }, {});

        Object.keys(payload).forEach((key)=>{
            let formElement = form.querySelector(`[name="${key}"]`);
            if (formElement && !this.validateInputAndValue(formElement, payload[key])) {
                this.validationErrors = {
                    ...this.validationErrors,
                    [key]: true
                }
            }
        });

        if (Object.keys(this.validationErrors).length > 0) {
            return;
        }


        const allStore = employeesStore.getState().employeeList;
        const existing = !this.isEdit && allStore.find((item) => {
            return item.email == payload.email;
        });

        if (existing) {
            this.globalError = localization.get('error.employee.exist');
            return;
        }

        //this was just on edit in document but it seems logical to have in add eather or there should be a control with this.isEdit
        this.confirmation = {
            visible: true,
            data: payload
        }
        
    };

    /**
     * Handles confirmation dialog response.
     * @param {boolean} answer - User's confirmation choice
     */
    submitConfirmation(answer){
        if (!answer) {
            this.confirmation = {
                visible: false,
                data: null
            }
            return;
        }

        const id = this.location?.params?.id;

        if (id) {
            employeesStore.dispatch(update({
                id: id,
                patch: this.confirmation.data
            }));
        } else {
            employeesStore.dispatch(add(this.confirmation.data));
        }
        
        Router.go('/');
    }

    render() {
        return html`
            <div class="project-size employee-form">
                <h1>${this.isEdit ? localization.get('edit.employee.title') : localization.get('add.employee.title')}</h1>
                <div class="employee-form-content">
                    ${this.isEdit ? html`
                        <div class="edit-notice">${localization.get('edit.employee.your.are.editing.title', [this.model.firstName, this.model.lastName])}</div>
                    `: ''}
                    ${this.globalError ? html`
                        <div class="error-message">${this.globalError}</div>
                    `: ''}
                    
                    <form @submit=${this.onSubmit} novalidate>
                        <div class="form-elements">
                            <div class="form-group">
                                <label for="firstName">${localization.get('employee.property.first.name')}</label>
                                <input type="text" name="firstName" id="firstName" required .value=${this.model.firstName} />
                                ${this.validationErrors['firstName'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>

                            <div class="form-group">
                                <label for="lastName">${localization.get('employee.property.last.name')}</label>
                                <input type="text" name="lastName" id="lastName" required .value=${this.model.lastName} />
                                ${this.validationErrors['lastName'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>

                            <div class="form-group">
                                <label for="dateOfEmployment">${localization.get('employee.property.date.of.employment')}</label>
                                <date-picker .value=${this.model.dateOfEmployment} @date-change=${(e)=>{this.model.dateOfEmployment = e.detail.dateStr; delete this.validationErrors['dateOfEmployment']; this.requestUpdate()}}></date-picker>
                                <input type="hidden" name="dateOfEmployment" .value=${this.model.dateOfEmployment}>
                                ${this.validationErrors['dateOfEmployment'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>

                            <div class="form-group">
                                <label for="dateOfBirth">${localization.get('employee.property.date.of.birth')}</label>
                                <date-picker .value=${this.model.dateOfBirth} @date-change=${(e)=>{this.model.dateOfBirth = e.detail.dateStr; delete this.validationErrors['dateOfBirth']; this.requestUpdate();}}></date-picker>
                                <input type="hidden" name="dateOfBirth" .value=${this.model.dateOfBirth}>
                                ${this.validationErrors['dateOfBirth'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>

                            <div class="form-group">
                                <label for="phoneNumber">${localization.get('employee.property.phone')}</label>
                                <masked-input id="maskedPhone" name="maskedPhone" .maskOptions=${{ mask: '+({00}) 000 000 00 00' }} .value=${this.model.phoneNumber} @value-changed=${(event)=>{this.model.phoneNumber = event.detail.value; delete this.validationErrors['phoneNumber']; this.requestUpdate()}}></masked-input>
                                <input type="hidden" name="phoneNumber" id="phoneNumber" required .value=${this.model.phoneNumber}/>
                                ${this.validationErrors['phoneNumber'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>

                            <div class="form-group">
                                <label for="email">${localization.get('employee.property.email')}</label>
                                <input type="email" name="email" id="email" required .value=${this.model.email} />
                                ${this.validationErrors['email'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>

                            <div class="form-group">
                                <label for="department">${localization.get('employee.property.department')}</label>
                                <div class="select-design">
                                    <select name="department" id="department" >
                                        <option value="">${localization.get('select.default.value')}</option>
                                        ${this.departmentOptions?.map((option)=> {
                                            return html`<option value="${option}" ?selected=${this.model.department === option}>${option}</option>`
                                        })}
                                    </select>
                                    <img src="/src/assets/icons/select-box-icon.svg">
                                </div>
                                ${this.validationErrors['department'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>

                            <div class="form-group">
                                <label for="position">${localization.get('employee.property.position')}</label>
                                <div class="select-design">
                                    <select name="position" id="position" >
                                        <option value="">${localization.get('select.default.value')}</option>
                                        ${this.positionOptions?.map((option)=> {
                                            return html`<option value="${option}" ?selected=${this.model.position === option}>${option}</option>`
                                        })}
                                    </select>
                                    <img src="/src/assets/icons/select-box-icon.svg">
                                </div>
                                ${this.validationErrors['position'] ? html`<div class="error-message">${localization.get('error.required')}</div>`: ''}
                            </div>
                        </div>
                               
                        <div class="actions">
                            <button class="btn" type="submit">${localization.get('action.save')}</button>
                            <button class="btn alternate" type="button" @click=${() => Router.go('/')}>${localization.get('action.cancel')}</button>
                        </div>
                    </form>
                </div>
            </div>
            <project-confirm .visible=${this.confirmation.visible && this.confirmation?.data} @answer=${(e)=>{this.submitConfirmation(e.detail)}}>
                ${this.confirmation?.data ? html`
                    <div class="confirmation-text">${localization.get('edit.employee.confirm.text')}</div>
                    <employee-item .item=${this.confirmation?.data} .hideActions=${true}></employee-item>
                `: ''}
            </project-confirm>
        `;
    }
}

customElements.define('employee-form', EmployeeForm);
