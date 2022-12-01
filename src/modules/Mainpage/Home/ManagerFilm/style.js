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

export const FilmList = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    h2 {
        margin-bottom: 12px;
    }
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
        height: calc(100% - 102px);
        margin: 16px 16px 0;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(0,0,0, 0.3);
        overflow: hidden;
        overflow-y: auto;
        overflow-x: auto;
        table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            tr {
                border: 1px solid #f5f5f5;
            }
            td {
                max-width: 150px;
                height: fit-content;
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
                    button {
                        transform: scale(0.9);    
                        margin-right: 4px;                  
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

    @media screen and (max-width: 912px) {
        .table {
            height: calc(100% - 182px);   
        }
    }

    @media screen and (max-width: 425px) {
        .feature {
            display: block;
            button { 
                margin-bottom: 12px;
            }
        }
        .table {
            height: calc(100% - 194px);
        }
    }
`



