import { css } from 'lit';  
//#ff650c, #f8f8f8
export const presentationTypeTableStyles = css`
    .presentation-type-table {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .employee-item {
        
        display: flex; 
        justify-content: center;
        align-items: flex-start;
    }

    .employee-card {
        background-color: #ffffff;
        padding: 20px;
        box-shadow: 0px 0px 5px 0px rgba(186,186,186,0.75);
        -webkit-box-shadow: 0px 0px 5px 0px rgba(186,186,186,0.75);
        -moz-box-shadow: 0px 0px 5px 0px rgba(186,186,186,0.75);
        width: 90%;
        max-width: 600px;
    }

    dl {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    dt {
        color: #b8b4b4;
        font-size: 14px;
    }

    dd {
        color: #0c0c0c;
        font-size: 16px;
        margin-top: 2px;
    }

    .button-set {
        display: flex;
        gap: 15px;
        margin-top: 20px;
    }

    img {
        display: inline-block;
        height: 20px;
        margin-right: 10px;
    }

    button {
        display: flex;
    }

    @media(max-width: 750px) {
        .presentation-type-table {
            grid-template-columns: 1fr;
        }
    }
`;