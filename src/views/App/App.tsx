import React, {useState} from "react";
import {Board} from "../components/Board";
import styled from "styled-components";


const Boards = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 20px;
`;
const NewBoard = styled.input`
  width: 400px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
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

export const App: React.FC = () => {

    const [value, setValue] = useState<string>('');
    const [boards, setBoards] = useState(['To do', 'In Progress', 'Testing', 'Done']);

    const handleChange = ({target}: any) => {
        setValue(target.value)
    };
    const setNewBoard = () => {
        if (value) {
            setBoards([...boards, value])
            setValue('')
        }
        return
    };

    return (
        <FlexColumn>
            <NewBoard type="text" onChange={handleChange} value={value}/>
            <NewBoardButton onClick={setNewBoard}>Add Board</NewBoardButton>
            <Boards>
                {boards.map((el) => {
                    return (
                        <Board key={el} title={el}/>
                    )
                })}
            </Boards>
        </FlexColumn>
    )
}