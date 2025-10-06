import { css } from 'lit';  

export const employeeFormStyles = css`
    .employee-form {
        padding: 30px 0;
    }

    h1 {
        font-size: 30px;
        font-weight: normal;
        color: #ff650c;
    }

    .employee-form-content {
        margin-top: 30px;
        background-color: #ffffff;
        padding: 20px;
        font-size: 13px;
    }

    .form-elements {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 40px;
        margin: 30px auto 0;
        max-width: 1000px;
    }

    .form-group {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 250px;
    }

    .actions {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        gap: 40px;
    }

    .btn {
        font-size: 14px;
        width: 200px;
    }

    input {
        background-color: #ffffff;
        border: 1px solid #dddddd;
        height: 34px;
        padding: 0 10px;
        border-radius: 4px;
        width: 100%;
    }

    .select-design {
        position: relative;
    }

    select {
        appearance: none;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        height: 34px;
        padding: 0 10px;
        border-radius: 4px;
        width: 100%;
    }

    .select-design img{
        position: absolute;
        top: 7px;
        right: 7px;
        height: 20px;
    }

    .error-message {
        font-size: 12px;
        color: #ff0000;
    }

    .confirmation-text {
        margin-bottom: 20px;
        font-size: 15px;
    }

    @media(max-width: 1023px) {
        .form-elements {
            grid-template-columns: auto auto;
            justify-content: center;
        }
    }

    @media(max-width: 600px) {
        .form-elements {
            grid-template-columns: auto;
        }

        .form-group {
            margin-left: auto;
            margin-right: auto;
        }
    }
`;