import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";

interface TaskProps {
    task: string
    taskId: string
    toDoList: { id: string, title: string }[]
    onSetToDoList: (value: { id: string, title: string }[]) => void;
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
        setValueTask((target as HTMLInputElement).value)
        let index = toDoList.findIndex(element => element.id === (target as HTMLInputElement).id);
        toDoList[index].title = (target as HTMLInputElement).value;
        onSetToDoList([...toDoList])

    };

    return (
        <Root>
            <Flex>
            <Text isTaskActive={isTaskActive} onClick={handleEditTask}>{task}</Text>
            <EditTask isTaskEditActive={isTaskEditActive} onChange={handleChangeTask} onBlur={handleEditTask} id={taskId} value={valueTask} name={task}/>
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