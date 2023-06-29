import styled from 'styled-components';

export const UploadForm = styled.form`
  background-color: #3D3F43;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const StyledInput = styled.input`
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
`;

export const StyledSelect = styled.select`
  margin-left: 10px;
  border-radius: 5px;
`;

export const StyledSubmitButton = styled.input`
  background-color: #111;
  border: 0;
  color: #FFF;
  padding: 8px 16px;
  font-size: 15px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`;

export const Form_center = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-top: 15px;
`;
