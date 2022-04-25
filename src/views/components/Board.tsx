import React, {useState} from "react";
import styled from "styled-components";

interface BoardProps {
    title: string
};

const TaskList = styled.div`
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
`;
const NewTask = styled.input`
  width: 70%;
  height: 30px;
  border: none;
  border-radius: 5px;
`;

export const Board = ({title}: BoardProps) => {

    const [value, setValue] = useState<string>('');
    const [toDoList, setToDoList] = useState<string[]>([]);

    const handleChange = ({target}: any) => {
        setValue(target.value)
    };
    const setNewTask = () => {
        if (value) {
            setToDoList([value, ...toDoList])
            setValue('')
        }
        return
    };

    return (
        <TaskList>
            <Title>{title}</Title>
            <Form>
                <NewTask onChange={handleChange} value={value} name={title}/>
                <NewTaskButton onClick={setNewTask}>Add</NewTaskButton>
            </Form>
            <div>
                {toDoList.map((el, i) => {
                    return (
                        <Task key={i}>{el}</Task>
                    )
                })}
            </div>
        </TaskList>
    )
}
