import { css } from 'lit';  

export const headerStyles = css`
    :host {
        font-size: 14px;
    }

    header {
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }

    #project-logo {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    #project-logo img{
        width: 20px;
        height: 20px;
    }

    nav {
        display: flex;
        gap: 16px;
        align-items: center;
    }

    nav a {
        display: flex;
        gap: 8px;
        align-items: center;
        color: #ff650c;
    }

    nav a:not(#switch-language) {
        opacity: 0.5;
    }

    nav a:not(#switch-language):hover {
        opacity: 0.8;
    }

    nav a:not(#switch-language).active {
        opacity: 1;
    }

    nav img {
        height: 20px;
    }

    #switch-language img{
        height: 14px;
    }

    @media(max-width: 350px) {
        nav span {
            display: none;
        }
    }
`;