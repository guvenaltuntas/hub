import { LitElement, html, css } from 'lit';
import IMask from 'imask';
import { reset } from '../../styles/reset';

/**
 * @fires value-changed - Fires on input value change. Provides { value, unmasked } in detail.
 */
class MaskedInput extends LitElement {
    static styles = [reset, css`
        input {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            height: 34px;
            padding: 0 10px;
            border-radius: 4px;
            width: 100%;
        }
    `];

    static properties = {
        maskOptions: { type: Object },
        value: { type: String }
    }

    constructor(){
        super();
        this.maskOptions = null;
        this.value = '';
    }

    firstUpdated() {
        const input = this.shadowRoot.querySelector('input');
        if (this._imask) this._imask.destroy();

        if (this.maskOptions) {
            this._imask = IMask(input, this.maskOptions);
            this._imask.on('accept', () => {
                this.value = this._imask.value; 
                this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value, unmasked: this._imask.unmaskedValue } }));
                this.requestUpdate();
            });
        } else {
            input.addEventListener('input', (e) => {
                this.value = e.target.value;
                this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value } }));
            });
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._imask) this._imask.destroy();
    }

    render() {
        return html`<input .value=${this.value} placeholder="+(__) ___ ___ __ __" />`;
    }
}
customElements.define('masked-input', MaskedInput);
