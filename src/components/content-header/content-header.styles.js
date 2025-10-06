import { css } from 'lit';  

export const contentHeaderStyles = css`
    :host {
        font-size: 14px;
    }

    .content-header {
        display: flex;
        justify-content: space-between;
    }

    h1 {
        font-size: 30px;
        font-weight: normal;
        color: #ff650c;
    }

    .filter {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    img {
        height: 30px;
    }

    input {
        padding: 0 10px;
        background-color: #ffffff;
        color: #1f2227;
        height: 34px;
        width: 300px;
    }

    a {
        opacity: 0.5;
    }

    a:hover {
        opacity: 0.8;
    }

    a.active {
        opacity: 1;
    }

    @media(max-width: 1023px) {
        .content-header {
            flex-direction: column;
            gap: 10px;
        }

        input {
            width: 100%;
        }
    }
`;