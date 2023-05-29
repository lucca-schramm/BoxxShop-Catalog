import styled from "styled-components"


export const Container = styled.div`
    background-color:  #3D3F43;
    border-radius: 10px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img{
        max-width: 100%;
        display: block;
        margin-bottom: 10px;
        border-radius: 10px;

        &:hover{
            transform: scale(1.5);
        }
    }
    button{
        margin-top:5px;
    }

    &:hover {
        transform: scale(1.1);
        }
`;