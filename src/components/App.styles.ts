import styled, { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    html {
       height: 100%; 
    }
    .home__content{
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center
    }
    .start, .next {
        cursor: pointer;
        height: 40px;
        margin: 20px 0;
        padding: 0 40px;
    }
    .score {
        margin: 20px 0
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p{
        font-size: 1rem;
    }
`