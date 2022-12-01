import styled from "styled-components"

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 16px 8px 16px 0;
    border-radius: 4px;
    background-color: #fff;
    h3 {
        color: #001C41;
        padding: 0 16px;
    }
`

export const UserList = styled.div`
    position: relative;
    height: 100%;
    border-radius: 4px;
    background-color: #fff;

    .feature {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        margin: 8px 16px;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(0,0,0, 0.3);
    }
    
    .table {
        margin: 16px 16px 0;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(0,0,0, 0.3);
        overflow: hidden;
        overflow-x: auto;
        overflow-y: auto;
        height: calc(100% - 140px);
        /* max-height: 75%; */
        max-width: 100%;
        table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            td {
                border: 1px solid #f5f5f5;
                max-width: 150px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            thead {
                border-radius: 8px;
                background-color: #f5f5f5;
                td {
                    padding: 8px;
                }
            }
            tbody {
                td {
                    padding: 8px;
                }
                td:last-child {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    button {
                        transform: scale(0.9);                      
                        &:hover {
                            transform: scale(1.1);     
                            &:last-child {
                                background-color: #e11d48;
                            }
                        }
                    }
                }
            }
        }
    }

    .pageNav {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 16px auto 0;
    }

    @media screen and (max-width: 912px) {
        .table {
            table {
                td {
                    max-width: 120px;
                }
                tbody {
                    td {
                        padding: 4px;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 912px) {
        height: calc(100% - 76px);
    }
    @media screen and (max-width: 576px) {
        .table {
            height: 70%;
        }
    }
    @media screen and (max-width: 425px) {
        .feature {
            display: block;
            div {
                margin: 0;
                width: auto;
                & > div {
                    input {
                        width: 100%;
                    }
                }
            }
            button {
                margin-bottom: 12px;
                font-size: 10px;
            }
        }
    }
    @media screen and (max-width: 376px) {
        .pageNav {
            & > button {
                display: none;
            }
            & > button:first-child, & > button:last-child {
                display: block;
            }
        }
    }
`



