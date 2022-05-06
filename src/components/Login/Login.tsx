import React from "react";
import styled from "styled-components";
import {LoginProps} from "../../interfaces";


const Login: React.FC<LoginProps> = ({userName, onSetUserName, onSetModalActive,isActive}) => {


    const handleConfirm = () => {
        if (userName) {
            onSetModalActive(false);
        }
    }

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        onSetUserName(target.value)
    };

    return (

        <Root isActive={isActive}>

            <Container>

                <Name type="text" onChange={handleChange} value={userName} placeholder={'Введите свое имя?'}/>

                <ConfirmButton type="button" onClick={handleConfirm}>Confirm</ConfirmButton>

            </Container>

        </Root>

    )
}

export default Login

const Root = styled.div<{ isActive:boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  visibility: ${props => props.isActive ? "visible" : "hidden"};
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
  height: 300px;
  background: white;
  border-radius: 20px;
`;

const Name = styled.input`
  width: 70%;
  height: 30px;
  border: none;
  border-radius: 5px;

  &::placeholder {
    text-align: center;
  }
`;
const ConfirmButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  height: 30px;
  margin-top: 20px;
`;
