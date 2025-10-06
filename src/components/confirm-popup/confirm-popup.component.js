import { LitElement, html } from 'lit';
import { reset } from '../../styles/reset';
import { confirmStyles } from './confirm-popup.styles';
import '../project-popup/project-popup.component.js'
import { localization } from '../../localization.js';

/**
 * Confirmation popup component.
 * @fires answer - Fires when user proceed or cancel.
 */
class ProjectConfirm extends LitElement {
    static properties = {
        visible: { type: Boolean, reflect: true }
    };

    static styles = [reset, confirmStyles];

    constructor(){
        super();
        this.visible = false;
    }

    /**
     * Handles user selection
     * @param {boolean} selection - true if user proceed, false if cancel
     */
    userSelected(selection) {
        this.visible = false;
        this.dispatchEvent(new CustomEvent('answer', {
            bubbles: true,
            composed: true,
            detail: selection
        }));
    }

    render() {
        return html`
        <project-popup .visible=${this.visible} @popup-closed=${() => {this.visible = false; this.userSelected(false)}}>
            <div class="confirm-title">${localization.get('confirm.are.you.sure')}</div>
            <div class="confirm-description">
                <slot></slot>
            </div>
            <div class="confirm-button-set">
                <button type="button" class="btn" @click=${()=>{this.userSelected(true)}}>${localization.get('action.proceed')}</button>
                <button type="button" class="btn alternate" @click=${()=>{this.userSelected(false)}}>${localization.get('action.cancel')}</button>
            </div>
        </project-popup>
    `;
    }
}

customElements.define('project-confirm', ProjectConfirm);