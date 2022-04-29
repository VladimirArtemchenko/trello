import React, {useState} from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

interface ColumnProps {
    title: string
};

const Board:React.FC<ColumnProps> = ({title}) => {

    const [value, onSetValue] = useState<string>('');
    const [toDoList, onSetToDoList] = useState<{ id:string,title:string }[]>([]);

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        onSetValue(target.value)
    };

    const onSetNewTask = () => {

        if (value) {
            onSetToDoList([{id: uuidv4(),title:value}, ...toDoList])
            onSetValue('')
        }
        return
    };

    return (
        <Root>
            <Title>{title}</Title>

            <Form>
                <NewTask onChange={handleChange} value={value} name={title}/>
                <NewTaskButton onClick={onSetNewTask}>Add</NewTaskButton>
            </Form>

            <div>
                {toDoList.map((el) => {
                    return (
                        <Task id={el.id} key={el.id}>{el.title}</Task>
                    )
                })}
            </div>

        </Root>
    )
}

export default Board

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
  width: 70%;
  height: 30px;
  border: none;
  border-radius: 5px;
  min-width: 170px;
`;

