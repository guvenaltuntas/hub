import { LitElement, html } from 'lit';
import './components/header/header.component.js';
import { initRouter } from './router.js';
import { localization } from './localization.js';

class ProjectApp extends LitElement {
    firstUpdated() {
        let languageKey = localStorage.getItem('languagePreference') || document.querySelector('html')?.getAttribute('lang')?.trim().toLocaleLowerCase() || 'en';
        localization.changeLanguage(languageKey).then(()=> {
            document.querySelector('html')?.setAttribute('lang', languageKey);
            const outlet = this.renderRoot?.getElementById('router-target');
            initRouter(outlet);
        });
    }

    render() {
        return html`
            <project-header></project-header>
            <div id="router-target"></div>
        `;
    }
}

customElements.define('project-app', ProjectApp);