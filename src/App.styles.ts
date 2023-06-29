import styled from 'styled-components';

export const Container = styled.div`
    background-color: #27282F;
    color: green;
    min-height: 100vh;
    mix-width: 100vw;
    `;

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding: 30px 0;
    `;
export const Filters = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    margin-top: 15px;
    gap:35px;

    input[type=text]{
        border-radius:10px;
        width: 80%;
    }
    `;

export const Header = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 30px;
    `;

export const ScreenWarning = styled.div`
    text-align: center;
    .emoji{
        font-size: 50px;
        margin-bottom: 20px;

        .loading-image {
            animation: spin 1s infinite linear;
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(540deg);
            }
          }
          
    }
`;

