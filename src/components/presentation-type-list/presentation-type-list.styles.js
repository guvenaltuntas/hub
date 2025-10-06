import { css } from 'lit';  

export const presentationTypeListStyles = css`
    .presentation-type-list {
        width: 100%;
        overflow-x: auto;
        background-color: #ffffff;
    }

    table {
        width: 100%;
        font-size: 14px;
    }

    td {
        padding: 20px 10px;
        text-align: center;
        color: #6f7072;
        white-space: nowrap;
    }

    tbody {
        font-size: 16px;
    }

    tbody tr {
        border-top: 1px solid #f8f8f8;
    }

    thead td {
        color: #ff650c;
    }

    img {
        width: 20px;
    }

    button + button {
        margin-left: 10px;
    }

    @media(max-width: 1023px) {
        .presentation-type-table {
            width: calc(100% - 10px)
            margin-left: 5px;
            margin-right: 5px;
        }
    }
`;