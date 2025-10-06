import { LitElement, html } from 'lit';
import { headerStyles } from './header.styles.js';
import { reset } from '../../styles/reset.js';
import { localization } from '../../localization.js';

export class ProjectHeader extends LitElement {
    static styles = [reset, headerStyles];
    
    static properties = {
        currentPath: { type: String },
        localization: { attribute: false }
    };

    constructor(){
        super();    
        window.addEventListener('vaadin-router-location-changed', (e) => {
            this.currentPath = e.detail.location.pathname;
        });
    }

    /**
     * Returns 'active' if the given path matches the current path.
     * @param {string} path - Path to check
     * @returns {string} 'active' if current path matches, else ''
     */
    setClassIfActive(path) {
        return this.currentPath === path || this.currentPath?.replace(/\/[0-9]+/gi, '') == path ? 'active' : '';
    }

    /**
     * Toggles the application language and reloads the page.
     */
    toggleLanguage(){
        localStorage.setItem('languagePreference', localization.getLanguageKey() === 'en' ? 'tr': 'en');
        window.location.reload();
    }

    //shpuld you see active language flag or target language flag? it's a bussiness decision. I will stand with sample design for now
    render() {
        return html`
            <header>
                <a href="/" id="project-logo"><img src="/src/assets/icons/project-logo.png">ING</a>
                <nav>           
                    <a href="/" class="${this.setClassIfActive('/employee-list')}"><img src="/src/assets/icons/employee-list-icon.svg"><span>${localization.get('header.nav.employee.list')}</span></a>
                    <a href="/employee" class="${this.setClassIfActive('/employee')}"><img src="/src/assets/icons/add-employee-icon.svg"><span>${localization.get('header.nav.add.new')}</span></a>
                    <a href="javascript:;" id="switch-language" @click=${()=>{this.toggleLanguage()}}>
                        ${localization.getLanguageKey() === 'tr'? html`
                            <img src="/src/assets/icons/language-en.png">
                        `: html`
                            <img src="/src/assets/icons/language-tr.png">
                        `}
                    </a>
                </nav>
            </header>
        `;
    }
}

customElements.define('project-header', ProjectHeader);