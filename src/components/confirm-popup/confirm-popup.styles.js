import { css } from 'lit';  

export const confirmStyles = css`
    :host {
        display: none;
    }
        
    :host([visible]) {
        display: block;
    }

    .confirm-title {
        color: #ff650c;
        font-size: 28px;
    }

    .confirm-description {
        padding: 30px 0;
        color: #1f2227;
        font-size: 18px;
    }

    button {
        display: block;
        width: 100%;
    }

    button + button {
        margin-top: 10px;
    }
`;