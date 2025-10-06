import { LitElement, html, css } from 'lit';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';  
import { Turkish } from 'flatpickr/dist/l10n/tr.js';
import { reset } from '../../styles/reset';
import { localization } from '../../localization';

/**
 * Date picker.
 * @fires date-change - Fires on date change.
 */
export class DatePicker extends LitElement {
    static properties = {
        value: { type: String }, 
        dateFormat: { type: String }
    };

    static styles = [reset, css`
        :host { 
            display:block; 
            position: relative;
        }

        input {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            height: 34px;
            padding: 0 10px;
            border-radius: 4px;
            width: 100%;
        }

        img {
            height: 20px;
            position: absolute;
            top: 7px;
            right: 7px;
        }

        @media(max-width: 1023px) {
            img {
                display: none;
            }
        }

    `];

    constructor() {
        super();
        this.value = '';
        this.dateFormat = 'd/m/Y';
        this._fp = null;
    }

    firstUpdated() {
        const input = this.renderRoot.querySelector('input');

        this._fp = flatpickr(input, {
            dateFormat: this.dateFormat,
            locale: localization.getLanguageKey() == 'tr' ? Turkish : 'en',
            allowInput: true,
            onChange: (selectedDates, dateStr) => {
                this.value = dateStr;
                this.dispatchEvent(new CustomEvent('date-change', {
                    detail: { dateStr, dateObj: selectedDates[0] }
                }));
            }
        });

        if (this.value) {
            this._fp.setDate(this.value, false, this.dateFormat);
        }
    }

    updated(changed) {
        if (changed.has('value') && this._fp) {
            const current = this._fp.input.value;
            if (this.value !== current) {
                this._fp.setDate(this.value || null, false, this.dateFormat);
            }
        }
    }

    disconnectedCallback() {
        if (this._fp) {
            this._fp.destroy();
            this._fp = null;
        }
        super.disconnectedCallback();
    }

    render() {
        return html`
            <input type="text" .value=${this.value} placeholder="gg/aa/yyyy" />
            <img src="/src/assets/icons/date-icon.svg">
        `;
    }
}

customElements.define('date-picker', DatePicker);
