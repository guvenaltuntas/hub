import { LitElement, html, css } from 'lit';
import { reset } from '../../styles/reset';
import { popUpStyles } from './project-popup.styles';

class ProjectPopup extends LitElement {
    static properties = {
        visible: { type: Boolean, reflect: true }
    };

    static styles = [reset, popUpStyles];

    closePopup() {
        this.visible = false;
        this.dispatchEvent(new CustomEvent('popup-closed', {
            bubbles: true,
            composed: true
        }));
    }   

    render() {
        return html`
        <div class="popup">
            <div class="popup-design">
                <button type="button" class="close-popup" @click=${() => { this.closePopup() }}><img src="/src/assets/icons/close-icon.svg"></button>
                <div class="popup-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    `;
    }
}

customElements.define('project-popup', ProjectPopup);