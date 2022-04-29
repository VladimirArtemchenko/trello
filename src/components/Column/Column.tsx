import React, {useState} from "react";
import styled from "styled-components";
import {v4 as uuidv4} from 'uuid';
import trashIcon from "../../images/trash.svg";

interface ColumnProps {
    title: string
    columnId: string
    columns: { id: string, title: string }[]
    onSetColumns: (value: { id: string, title: string }[]) => void;
};

const Column: React.FC<ColumnProps> = ({title, columnId, onSetColumns, columns}) => {

    const [value, setValue] = useState<string>('');
    const [toDoList, setToDoList] = useState<{ id: string, title: string }[]>([]);

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value)
    };

    const onSetNewTask = () => {
        if (value) {
            setToDoList([{id: uuidv4(), title: value}, ...toDoList])
            setValue('')
            return
        }
    };

    const handleDeleteColumnButtonClick = () => {
        columns.splice(columns.findIndex(element => element.id === columnId), 1);
        onSetColumns([...columns]);
    };

    const handleDeleteTaskButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        toDoList.splice(toDoList.findIndex(element => element.id === (event.target as HTMLButtonElement).id), 1);
        setToDoList([...toDoList]);
    };

    return (
        <Root>
            <Flex>
                <Title>{title}</Title>
                <DeleteColumnButton onClick={handleDeleteColumnButtonClick}/>
            </Flex>

            <Form>
                <NewTask onChange={handleChange} value={value} name={title}/>
                <NewTaskButton onClick={onSetNewTask}>Add</NewTaskButton>
            </Form>

            <div>
                {toDoList.map((el) => {
                    return (
                        <Flex>
                            <Task key={el.id}>{el.title}</Task>
                            <DeleteTaskButton id = {el.id} onClick={handleDeleteTaskButtonClick} />
                        </Flex>
                    )
                })}
            </div>

        </Root>
    )
}

export default Column

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  box-sizing: border-box;
  margin: 20px;
`;
const Form = styled.div`
  display: flex;
  gap: 10px;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  margin: 0;
`;
const Task = styled.p`
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
  border-radius: 10px;
  border: solid 1px gray;
  box-sizing: border-box;
  background: darkgray;
`;
const NewTaskButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  width: 20%;
  height: 30px;
  min-width: 50px;
`;
const NewTask = styled.input`
  min-width: 70%;
  height: 30px;
  border: none;
  border-radius: 5px;
  min-width: 170px;
`;

const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
const DeleteColumnButton = styled.button`
  padding: 0;
  margin: 0;
  background: center/100% url(${trashIcon});
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
`;
const DeleteTaskButton = styled.button`
  padding: 0;
  margin: 0;
  background: center/100% url(${trashIcon});
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
`;