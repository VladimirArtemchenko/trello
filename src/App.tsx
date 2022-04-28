import React, {useState} from "react";
import Board from "./components/Board/Board";
import styled from "styled-components";

const initialColumnsName: { id: string, title: string }[] = [
    {id: "0", title: 'To do'},
    {id: "1", title: 'In Progress'},
    {id: "2", title: 'Testing'},
    {id: "3", title: 'Done'},
]

const App: React.FC = () => {

    const [value, onSetValue] = useState<string>('');
    const [columns, onSetColumns] = useState(initialColumnsName);

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        onSetValue(target.value)
    };

    const createNewColumn = () => {

        if (value) {
            onSetColumns([...columns, {id: `${columns.length}`, title: value}])
            onSetValue('')
        }
        return
    };

    return (

        <Root>

            <NewBoard type="text" onChange={handleChange} value={value}/>

            <NewBoardButton onClick={createNewColumn}>Add Board</NewBoardButton>

            <Boards>
                {columns.map((el: { id: string; title: string; }) => {
                    console.log(el)
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