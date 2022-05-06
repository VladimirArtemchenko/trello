import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import { v4 as uuidv4 } from 'uuid';
import {Task} from "../index";
import {ColumnProps} from "../../interfaces";

const Column:React.FC<ColumnProps> = ({columnTitle, columnId, onSetColumns, columns,onShowTaskModal}) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [title, setTitle] = useState<string>(columnTitle);
    const [isEditActive, setEditActive] = useState<boolean>(false);
    const [isTitleActive, setTitleActive] = useState<boolean>(true);
    const columnIndex = (columns.findIndex(element => element.id === columnId));

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(target.value)
    };

    const handleCreateTask = () => {
        if (taskTitle) {
            const newColumn = columns.map(element => {
                    if (element.id === columnId) {
                        element.toDoList.unshift({id: uuidv4(), title: taskTitle, description: 'Введите подробное описание',  comment: []});
                    }
                return element
                }
            )
            onSetColumns([...newColumn]);
            setTaskTitle('');
        }
    }

    const handleEditColumn = () => {
        setEditActive(!isEditActive)
        setTitleActive (!isTitleActive)
    }

    const handleChangeColumn = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value)
        const newColumns = columns.map(element => {
            if( element.id === columnId ){
                element.title = target.value
            }
            return element
        });
        onSetColumns([...newColumns])
    };

    const handleDeleteColumnButtonClick = () => {
        const newColumns = columns.filter(element => element.id !== columnId);
        onSetColumns([...newColumns]);
    };

    return (
        <Root>
            <Flex>
                <Title isTitleActive={isTitleActive} onClick={handleEditColumn} >{columnTitle}</Title>
                <EditTitle isEditActive={isEditActive} onChange={handleChangeColumn} onBlur={handleEditColumn} value={title} name={columnTitle}/>
                <DeleteColumnButton onClick={handleDeleteColumnButtonClick}/>
            </Flex>

            <Form>
                <NewTask onChange={handleChange} value={taskTitle} name={taskTitle}/>
                <NewTaskButton onClick={handleCreateTask}>Add</NewTaskButton>
            </Form>

            <div>
                {columns[columnIndex].toDoList.map((el) => {
                    return (
                        <Task columnId={columnId} columns={columns} onSetColumns={onSetColumns} onShowTaskModal={onShowTaskModal} task={el.title} taskId={el.id} key={el.id}/>
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
