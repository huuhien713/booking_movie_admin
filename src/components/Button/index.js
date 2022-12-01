import styled from 'styled-components';

const Button = ({ children, onClick, type, color, bgColor,  ...props }) => {
    return (
        <Wrapper type={type} onClick={onClick} style={{backgroundColor: `${bgColor}`, color: `${color ||'#001C41'}`}}>
            {children}
        </Wrapper>
    )
}

export default Button;

const Wrapper = styled.button`
    margin-right: 8px;
    padding: 8px 12px;
    border: none;
    outline: none;
    border-radius: 4px;
    font-weight: 700;
    text-transform: capitalize;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
        color: #fff!important;
        background-color: #2563eb;
    }
`