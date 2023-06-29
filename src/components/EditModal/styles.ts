import styled from 'styled-components';

export const ModalOverlay = styled.div`
  color: red;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* ou outro valor de sua escolha */
`;


export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;

export const ImagePreview = styled.image`
  max-width: 20%;
  margin-bottom: 10px;
  border-radius: 10px;
`;