import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { addUserName } from '../../store/login/reducer';

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const dispatch = useAppDispatch();
  const handleConfirm = () => {
    if (userName) {
      dispatch(addUserName({ userName }));
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(target.value);
  };

  return (
    <Root>
      <Container>
        <Name type="text" onChange={handleChange} value={userName} placeholder="Введите свое имя?" />
        <ConfirmButton type="button" onClick={handleConfirm}>Confirm</ConfirmButton>
      </Container>
    </Root>
  );
};

export default Login;

const Root = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background: lightgrey;
  border-radius: 20px;
`;

const Name = styled.input`
  width: 70%;
  height: 30px;
  border: none;
  border-radius: 5px;

  &:focus {
    outline: solid 2px cornflowerblue;

    &::placeholder {
      text-align: center;
    }
`;
const ConfirmButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: lightgrey;
  height: 30px;
  margin-top: 20px;
  color: #010140;

  &:hover {
    opacity: 0.4;
`;
