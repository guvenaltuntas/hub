import { css } from 'lit';  

export const popUpStyles = css`
    :host {
        display: none;
    }
        
    :host([visible]) {
        display: block;
    }

    .popup-design {
        border-radius: 4px;
        background-color: #ffffff;
        max-width: 564px;
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        position: relative;
        box-shadow: 0px 0px 5px 0px rgba(97,97,97,0.75);
        -webkit-box-shadow: 0px 0px 5px 0px rgba(97,97,97,0.75);
        -moz-box-shadow: 0px 0px 5px 0px rgba(97,97,97,0.75);
    }

    .popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(43, 36, 34 , 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
        flex-wrap: wrap;
        z-index: 7000;
    }

    .popup-content {
        width: 100%;
        min-height: 30px;
    }

    .close-popup {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .close-popup img{
        width: 36px;
        display: block;
    }

`;