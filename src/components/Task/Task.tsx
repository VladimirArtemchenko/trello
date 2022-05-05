import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";

interface ToDoList {
    id: string
    title: string
}

interface TaskProps {
    task: string
    taskId: string
    toDoList: ToDoList[]
    onSetToDoList: (value: ToDoList[]) => void;
};

const Task: React.FC<TaskProps> = ({task, taskId, toDoList, onSetToDoList}) => {

    const [valueTask, setValueTask] = useState<string>(task);
    const [isTaskEditActive, setTaskEditActive] = useState<boolean>(false);
    const [isTaskActive, setTaskActive] = useState<boolean>(true);

    const handleEditTask = () => {
        setTaskEditActive(!isTaskEditActive)
        setTaskActive(!isTaskActive)

    }

    const handleChangeTask = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValueTask(target.value)
        const newToDoList = toDoList.map(element => {
            if ( element.id === taskId ) {
                element.title = target.value
            }
            return element
        });
        onSetToDoList([...newToDoList])
    };

    const handleDeleteTaskButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        toDoList.splice(toDoList.findIndex(element => element.id === taskId), 1);
        onSetToDoList([...toDoList]);
    };

    return (
        <Root>
            <Flex>
                <Text isTaskActive={isTaskActive} onClick={handleEditTask}>{task}</Text>
                <EditTask isTaskEditActive={isTaskEditActive} onChange={handleChangeTask} onBlur={handleEditTask}
                         value={valueTask} name={task}/>
                <DeleteTaskButton onClick={handleDeleteTaskButtonClick} />

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
