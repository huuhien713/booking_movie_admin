import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 0 8px;

    & > div {
        padding: 12px;
        height: calc(100% - 52px);
        background-color: #fff;
    }

    .title {
        margin-bottom: 32px;
    }
    .main {
        width: 100%;

        & > div:last-of-type {
            h4, span, p {
                padding: 8px;
            }
        }
    }
    .field {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        h4 {
            width: 20%;
            text-align: right;
            padding: 4px;
        }
        span {
            width: 2%;
            text-align: center;
            padding: 4px;
        }
        div {
            width: 50%;
            input {
                display: block;
                padding: 4px;
                outline: none;
                border-radius: 4px;
                border: 1px solid #ccc;
            }
        }
        p { 
            width: 28%;
            color : red;
            font-size: 13px;
            line-height: 1.5;
            padding: 4px 0 4px 8px;
        }

        &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4) {
            div {
                input {
                    width: 100%;
                }
            }
        }
        &:nth-child(5) {
            div {
                width: 20%;
            }
        }
        &:nth-child(6), &:nth-child(7), &:nth-child(8) {
            div {
                display: flex;
                align-items: center;
                input {
                    width: 20px;
                    height: 20px;
                }
            }
        }
        &:nth-child(10) {
            div {
                width: 30%;
                & > div {
                    width: 100%;
                    height: 120px;
                    border-radius: 4px;
                    overflow: hidden;
                    background-color: #eee;
                    img {
                        display: block;
                        width: auto;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .field {
            position: relative;
            align-items: flex-start;
            &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5) {
                div {
                    margin-bottom: 12px;
                }
                p {
                    position: absolute;
                    top: 65%;
                    left: 21%;
                    width: 100%;
                    font-size: 10px;
                }
            }
        }
        .title {
            margin-bottom: 16px;
        }
    }
    @media screen and (max-width: 500px) {
        & > div {
            padding: 8px 0;
        }

        .main {
            & > div:last-of-type {
                h4, span {
                    padding: 2px;
                }
                button {
                    font-size: 10px;
                    padding: 4px 8px;
                }
            }
        }
        .field {
            h4 {
                font-size: 10px;
            }
            &:nth-child(10) { 
                div {
                    width: 100px;
                    input {
                        width: 95px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 400px) {
    
    }
`