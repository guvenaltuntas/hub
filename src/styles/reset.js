import { css } from 'lit';  

export const reset = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: none;
    }

    ol, ul {
        list-style: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    button {
        cursor: pointer;
        background-color: transparent;
    }

    input[type='number'] {
        appearance: none;
    }

    input:focus {
        outline: 0;
    }

    :host {
        font-family: Arial;
    }

    .btn {
        background-color: #ff650c;
        color: #ffffff;
        border: 1px solid #ff650c;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 18px;
    }

    .btn.alternate {
        color: #6867a5;
        border-color: #6867a5;
        background-color: #ffffff;
    }

    .btn.blue {
        color: #ffffff;
        border-color: #525199;
        background-color: #525199;
    }

    .project-size {
        width: 1500px;
        margin-left: auto;
        margin-right: auto;
    }

    @media(max-width: 1540px) {
        .project-size {
            width: 1280px;
        }
    }

    @media(max-width: 1320px) {
        .project-size {
            width: 960px;
        }
    }

    @media(max-width: 1023px) {
        .project-size {
            width: auto;
            margin-left: 5px;
            margin-right: 5px;
        }
    }
`;