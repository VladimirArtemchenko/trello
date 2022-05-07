import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {TaskProps} from "../../interfaces";

const Task: React.FC<TaskProps> = ({task, taskId, columns, onSetColumns, onShowTaskModal, columnId}) => {

    const [taskTitle, setValueTask] = useState<string>(task);
    const [isTaskEditActive, setTaskEditActive] = useState<boolean>(false);
    const [isTaskActive, setTaskActive] = useState<boolean>(true);

    const handleEditTask = () => {
        columns.map(column => {
            column.toDoList.map((toDo) => {
                if (toDo.id === taskId) {
                    setValueTask(toDo.title)
                }
            })
        })
        setTaskActive(!isTaskActive)
        setTaskEditActive(!isTaskEditActive)
    }

    const handleChangeTask = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValueTask(target.value)
    }

    const handleTask = () => {
        const newColumns = columns.map(column => {
                column.toDoList.map(toDo => {
                    if (toDo.id === taskId) {
                        toDo.title = taskTitle
                    }
                })
                return column
            }
        )
        onSetColumns([...newColumns])
        setTaskActive(!isTaskActive)
        setTaskEditActive(!isTaskEditActive)
    }

    const handleDeleteTask = () => {
        const newColumns = columns.map(column => {
            if (column.id === columnId) {
                column.toDoList.splice(column.toDoList.findIndex(toDo => toDo.id === taskId), 1);
            }
            return column
        })
        onSetColumns([...newColumns]);
    };

    return (
        <Root onClick={onShowTaskModal}>

            <Flex>

                <Text isTaskActive={isTaskActive}  id={taskId}>{task}</Text>

                <EditTask isTaskEditActive={isTaskEditActive} onChange={handleChangeTask} onBlur={handleTask}
                          value={taskTitle} name={task}/>
                <FlexColumn>
                    <EditButton onClick={handleEditTask}>Edit</EditButton>

                    <DeleteTaskButton onClick={handleDeleteTask}/>
                </FlexColumn>
            </Flex>

            <Comments>
                Comments:
                {columns[columns.findIndex(column => column.id === columnId)].toDoList[columns[columns.findIndex(column => column.id === columnId)].toDoList.findIndex(toDo => toDo.id === taskId)].comments.length}
            </Comments>

        </Root>
    )
}

export default Task

const Root = styled.div`
  border: solid 1px gray;
  border-radius: 10px;
  margin-top: 10px;
`;
const Text = styled.p<{ isTaskActive: boolean }>`
  width: 60%;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
  display: ${props => props.isTaskActive ? "block" : "none"};
`;
const Comments = styled.p`
  width: 100%;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;

`;
const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
const EditTask = styled.input<{ isTaskEditActive: boolean }>`
  width: 60%;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
  padding: 0;
  display: ${props => props.isTaskEditActive ? "block" : "none"};
`;
const DeleteTaskButton = styled.button`
  padding: 0;
  margin: 5px;
  background: center/100% url(${trashIcon}) no-repeat;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
`;
const EditButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
`;
