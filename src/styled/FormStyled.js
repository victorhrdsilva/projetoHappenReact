import styled from 'styled-components';

export default function FormStyled ({children}) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

input {
   
    width: 80vw;
    max-width: 303px;
    height: 45px;
    border: 1px solid var(--border-color-input);
    border-radius: 5px;
    margin-bottom: 6px;
    box-sizing: border-box;

    &::placeholder {
        font-size: 20px;
        color: var(--border-color-input);
        padding-left: 11px;
    }

    &[type=submit] {
        background-color: var(--secondary-color);
        color: var(--secundary-text-color);
        font-size: 21px;
        border: none;
    }
}
p {
    color: var(--secondary-color);
    text-decoration: underline;
    margin-top: 25px;
    text-align: center;
    max-width: 80vw;
}
`