import { css } from 'lit';  

export const paginationStyles = css`
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-top: 20px;
        margin-top: 10px;
        border-top: 1px solid #e9e9e9;
    }

    .pagination img {
        width: 30px;
        display: block;
    }

    .pagination button {
        width: 40px;
        height: 40px;
        font-size: 20px;
        border-radius: 50%;
        color: #1f2227;
    }

    .pagination button.active {
        background-color: #ff650c;
        color: #ffffff;
    }

    .pagination button.passive {
        filter: grayscale(1);
    }

    .pagination button:first-child img {
        transform: rotate(180deg);
    }

    @media(max-width: 620px) {
        .pagination button:not(.active):not(.page-nav):not([diff='1']):not([diff='-1']) {
            display: none;
        }

        span {
            display: none;
        }
    }
`;