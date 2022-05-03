import React, {useState} from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import {Task} from "../index";

interface ColumnProps {
    columnTitle: string
    columnId: string
    columns: { id: string, title: string }[]
    onSetColumns: (value: { id: string, title: string }[]) => void;
};

const Column:React.FC<ColumnProps> = ({columnTitle, columnId, onSetColumns, columns}) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [toDoList, setToDoList] = useState<{ id: string, title: string }[]>([]);
    const [valueColumn, setValueColumn] = useState<string>(columnTitle);
    const [isColumnEditActive, setColumnEditActive] = useState<boolean>(false);
    const [isTitleActive, setTitleActive] = useState<boolean>(true);

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(target.value)
    };

    const handleCreateTask = () => {
        if (taskTitle) {
            setToDoList([{id: uuidv4(), title: taskTitle}, ...toDoList])
            setTaskTitle('')
            return
        }
    };

    const handleEditColumn = () => {
        setColumnEditActive(!isColumnEditActive)
        setTitleActive (!isTitleActive)
    }

    const handleChangeColumn = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValueColumn(target.value)
        let index = columns.findIndex(element => element.id === (target as HTMLInputElement).id);
        columns[index].title=target.value;
        onSetColumns([...columns])

    };

    return (
        <Root>
            <Flex>
                <Title isTitleActive={isTitleActive} onClick={handleEditColumn} >{columnTitle}</Title>
                <EditTitle autoFocus={true} isEditActive={isColumnEditActive} onChange={handleChangeColumn} onBlur={handleEditColumn} id={columnId} value={valueColumn} name={columnTitle}/>
            </Flex>

            <Form>
                <NewTask onChange={handleChange} value={taskTitle} name={taskTitle}/>
                <NewTaskButton onClick={handleCreateTask}>Add</NewTaskButton>
            </Form>

            <div>
                {toDoList.map((el) => {
                    return (
                        <Task task={el.title} taskId={el.id} toDoList={toDoList} onSetToDoList={setToDoList} key={el.id} />
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
const Title = styled.h1<{ isTitleActive: boolean }>`
  width: 250px;
  text-align: center;
  font-size: 30px;
  margin: 0 0 5px 0;
  word-wrap: break-word;
  display: ${props => props.isTitleActive ? "block" : "none"};
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
const EditTitle = styled.input<{isEditActive:boolean}>`
  width: 250px;
  text-align: center;
  font-size: 30px;
  margin: 0 0 5px 0;
  padding: 0;
  display: ${props => props.isEditActive ? "block" : "none"};
`;


