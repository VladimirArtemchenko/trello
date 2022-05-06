import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {TaskProps} from "../../interfaces";

const Task: React.FC<TaskProps> = ({task, taskId, columns, onSetColumns, onShowTaskModal, columnId}) => {

    const [valueTask, setValueTask] = useState<string>(task);
    const [isTaskEditActive, setTaskEditActive] = useState<boolean>(false);
    const [isTaskActive, setTaskActive] = useState<boolean>(true);

    const handleEditTask = () => {
        columns.map(el => {
            el.toDoList.map((el) => {
                if (el.id === taskId) {
                    setValueTask(el.title)
                }
            })
        })
        setTaskActive(!isTaskActive)
        setTaskEditActive(!isTaskEditActive)
    }

    const handleChangeTask = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValueTask(target.value)
    }

    const handleTask =()=>{
        const newColumns = columns.map(element => {
            element.toDoList.map(element => {
                if (element.id === taskId) {
                    element.title = valueTask
                    return(element)
                }
            })
            return element
        }
    )
        onSetColumns([...newColumns])
        setTaskActive(!isTaskActive)
        setTaskEditActive(!isTaskEditActive)
    }

    const handleDeleteTask = () => {
        const newColumns = columns.map(element => {
            if (element.id === columnId) {
                element.toDoList.splice(element.toDoList.findIndex(element => element.id === taskId),1);
            }
            return element
        })
        onSetColumns([...newColumns]);
    };

    return (
        <Root>

            <Flex>

                <Text isTaskActive={isTaskActive} onClick={onShowTaskModal} id={taskId}>{task}</Text>

                <EditTask isTaskEditActive={isTaskEditActive} onChange={handleChangeTask} onBlur={handleTask}
                          value={valueTask} name={task}/>

                <EditButton onClick={handleEditTask}>Edit</EditButton>

                <DeleteTaskButton onClick={handleDeleteTask}/>

            </Flex>

        </Root>
    )
}

export default Task

const Root = styled.div`
`;
const Text = styled.p<{ isTaskActive: boolean }>`
  width: 200px;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
  border-radius: 10px;
  border: solid 1px gray;
  box-sizing: border-box;
  background: darkgray;
  display: ${props => props.isTaskActive ? "block" : "none"};
`;
const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
const EditTask = styled.input<{ isTaskEditActive: boolean }>`
  width: 200px;
  font-size: 18px;
  word-wrap: break-word;
  border-radius: 10px;
  border: solid 1px black;
  box-sizing: border-box;
  margin: 5px 0 0 0;
  padding: 0;
  display: ${props => props.isTaskEditActive ? "block" : "none"};
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
const EditButton = styled.button`
  padding: 0;
  margin: 0;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
`;
