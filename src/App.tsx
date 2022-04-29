import React, {useState} from "react";
import Board from "./components/Board/Board";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Login";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";

const initialColumnsName = [
    {id: uuidv4(), title: 'To do'},
    {id: uuidv4(), title: 'In Progress'},
    {id: uuidv4(), title: 'Testing'},
    {id: uuidv4(), title: 'Done'},
]

const App: React.FC = () => {

    const [userName, onSetUserName] = useState<string>('');
    const [isLoginModalActive, onSetModalActive] = useState<boolean>(true);
    const [value, onSetValue] = useState<string>('');
    const [columns, onSetColumns] = useState(initialColumnsName);

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        onSetValue(target.value)
    };

    const createNewColumn = () => {
        if (value) {
            onSetColumns([...columns, {id: uuidv4(), title: value}])
            onSetValue('')
        }
        return
    };

    return (

        <Root>

            <Modal isActive={isLoginModalActive}>
                <Login userName={userName} onSetUserName={onSetUserName} onSetModalActive={onSetModalActive}/>
            </Modal>

            <NewColumn type="text" onChange={handleChange} value={value}/>

            <NewColumnButton onClick={createNewColumn}>Add Board</NewColumnButton>

            <Columns>
                {columns.map((el) => {
                    return (
                        <Board key={el.id} title={el.title}/>
                    )
                })}
            </Columns>

        </Root>
    )
}

export default App

const Columns = styled.div`
  display: flex;
  width: 90%;
  box-sizing: border-box;
  margin: 20px;
`;
const NewColumn = styled.input`
  width: 400px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const NewColumnButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  width: 150px;
  height: 30px;
  margin-top: 20px;
`;