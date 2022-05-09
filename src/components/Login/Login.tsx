import React, {useState} from "react";
import styled from "styled-components";

export interface LoginProps {
    onSetUserName: (value: string) => void;
}

const Login: React.FC<LoginProps> = ({onSetUserName}) => {

    const [value, setValue] = useState<string>('');

    const handleConfirm = () => {

        if (value) {
            onSetUserName(value)
            localStorage.setItem("userName", JSON.stringify(value))
        }
    }

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value)
    }

    return (

        <Root>

            <Container>

                <Name type="text" onChange={handleChange} value={value} placeholder={'Введите свое имя?'}/>

                <ConfirmButton type="button" onClick={handleConfirm}>Confirm</ConfirmButton>

            </Container>

        </Root>

    )
}

export default Login

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
