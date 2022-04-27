import React, {useState, useId} from "react";
import Board from "./components/Board/Board";
import styled from "styled-components";

const initialColumnsName: { id: string, title: string }[] = [
    {id: "1", title: 'To do'},
    {id: "2", title: 'In Progress'},
    {id: "3", title: 'Testing'},
    {id: "4", title: 'Done'},
]

const App: React.FC = () => {

    const [value, setValue] = useState<string>('');
    const [boards, setBoards] = useState(initialColumnsName);

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value)
    };

    const onSetNewBoard = () => {

        if (value) {
            setBoards([...boards, {id: value, title: value}])
            setValue('')
        }
        return
    };

    return (

        <Root>

            <NewBoard type="text" onChange={handleChange} value={value}/>

            <NewBoardButton onClick={onSetNewBoard}>Add Board</NewBoardButton>

            <Boards>
                {boards.map((el: { id: string; title: string; }) => {

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