import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { addUserName } from '../../store/login/reducer';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { userName: '' } });

  const dispatch = useAppDispatch();

  const onSubmit = (data: { userName: string; }) => {
    if (data.userName) {
      dispatch(addUserName(
        { userName: data.userName },
      ));
    }
  };

  return (
    <Root>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Name
          type="text"
          {...register('userName', { required: true })}
          defaultValue=""
          placeholder="Введите свое имя?"
        />
        {errors.userName && <p>Введите имя!</p>}
        <ConfirmButton type="submit">Confirm</ConfirmButton>
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
const Container = styled.form`
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
