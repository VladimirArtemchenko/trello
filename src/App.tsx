import React, {useState} from "react";
import Board from "./components/Board/Board";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";

const initialColumnsName = [
    {id: uuidv4(), title: 'To do'},
    {id: uuidv4(), title: 'In Progress'},
    {id: uuidv4(), title: 'Testing'},
    {id: uuidv4(), title: 'Done'},
]

const App: React.FC = () => {

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

            <NewBoard type="text" onChange={handleChange} value={value}/>

            <NewBoardButton onClick={createNewColumn}>Add Board</NewBoardButton>

            <Boards>
                {columns.map((el) => {
                    let pageWidth = document.documentElement.scrollWidth
                    console.log(pageWidth)
                    return (
                        <Board key={el.id} title={el.title}/>
                    )
                })}
            </Boards>

        </Root>
    )
}

export default App

const Boards = styled.div`
  display: flex;
  width: 90%;
  box-sizing: border-box;
  margin: 20px;
`;
const NewBoard = styled.input`
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
const NewBoardButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  width: 150px;
  height: 30px;
  margin-top: 20px;
`;