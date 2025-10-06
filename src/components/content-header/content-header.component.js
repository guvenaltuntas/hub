import { html, LitElement } from "lit";
import { reset } from "../../styles/reset";
import { contentHeaderStyles } from "./content-header.styles";
import { localization } from "../../localization";

/**
 * Content header component.
 * @fires search-input-change - Fires when the search input value change.
 * @fires format-change - Fires when the presentation format change.
 */
class ContentHeader extends LitElement {
    static styles = [reset, contentHeaderStyles];

    static properties = {
        showFilters: { type: Boolean },
        selectedPresentationFormat: { state: true },
        q: { state: true }
    }

    constructor(){
        super();
        this.showFilters = false;
        this.q = '';
        this.selectedPresentationFormat = 'list';
    }

    /**
     * Handles search input changes.
     * @param {InputEvent} e - event for target value
     * @fires search-input-change
     */
    onSearchChange(e){
        this.q = e.target.value;
        this.dispatchEvent(new CustomEvent('search-input-change', {
            bubbles: true,
            composed: true,
            detail: this.q
        }));
    }

    /**
     * Handles switching between presentation formats.
     * @param {'list'|'table'} newType - Selected format type
     * @fires format-change
     */
    onPresentationChange(newType){
        this.selectedPresentationFormat = newType;
        this.dispatchEvent(new CustomEvent('format-change', {
            bubbles: true,
            composed: true,
            detail: this.selectedPresentationFormat
        }));
    }

    setClassIfActive(typeName) {
        return this.selectedPresentationFormat === typeName ? 'active' : '';
    }

    render() {
        return html`
            <div class="content-header project-size">
                <h1>${localization.get('employee.list.page.title')}</h1>
                ${this.showFilters ? html`
                    <div class="filter">
                        <input placeholder="${localization.get('employee.list.filter')}" .value=${this.q} @input=${e => this.onSearchChange(e)}/>
                        <a @click=${e => this.onPresentationChange('list')} class="${this.setClassIfActive('list')}"><img src="/src/assets/icons/hamburger-icon.svg"></a>
                        <a @click=${e => this.onPresentationChange('table')} class="${this.setClassIfActive('table')}"><img src="/src/assets/icons/grid-icon.svg"></a>
                    </div>
                ` : ''}
            </div>
        `
    }
}

customElements.define('content-header', ContentHeader);