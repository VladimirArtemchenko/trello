import React, {useState, useMemo} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {Task} from "../index";
import {CardType, CommentType} from "../../interfaces";

export interface ColumnProps {
    handleShowTaskModal: ({target}: React.MouseEvent<HTMLDivElement>) => void
    handleChangeColumn: (columnId: string, columnName: string) => void
    handleDeleteColumn: (columnId: string) => void
    handleChangeCardText: (cardId: string, text: string) => void
    handleDeleteCard: (cardId: string) => void
    handleCreateTask:(columnId:string,taskTitle:string)=>void
    columnTitle: string
    columnId: string
    todoList: CardType[]
    comments: CommentType[]
};

const Column: React.FC<ColumnProps> = ({
                                           handleChangeColumn,
                                           handleDeleteColumn,
                                           handleDeleteCard,
                                           handleChangeCardText,
                                           columnTitle,
                                           columnId,
                                           todoList,
                                           handleCreateTask,
                                           handleShowTaskModal,
                                           comments
                                       }) => {

    const [taskTitle, setTaskTitle] = useState('');
    const [title, setTitle] = useState(columnTitle);
    const [isEditActive, setEditActive] = useState(false);

    const filteredTodoList = useMemo(
        () => todoList.filter((todo) =>
            todo.columnId === columnId),
        [columnId, todoList]
    )

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(target.value)
    }

    const handleNewTaskButton = () => {
        handleCreateTask(columnId,taskTitle)
            setTaskTitle('');
    }

    const handleEditColumn = () => {
        setEditActive(!isEditActive)
    };

    const handleChangeTitle = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value)
        handleChangeColumn(columnId, target.value)
    }

    const handleDeleteColumnButton = () => {
        handleDeleteColumn(columnId)
    }


    return (
        <Root>

            <Flex>

                {isEditActive

                    ? <EditTitle onChange={handleChangeTitle} onBlur={handleEditColumn}
                                 value={title} name={columnTitle} autoFocus={true}/>

                    : <Title onClick={handleEditColumn}>{title}</Title>
                }

                <DeleteColumnButton onClick={handleDeleteColumnButton}/>

            </Flex>

            <Flex>

                <NewTask onChange={handleChange} value={taskTitle} name={taskTitle}/>

                <NewTaskButton onClick={handleNewTaskButton}>Add</NewTaskButton>

            </Flex>

            <Columns>

                {filteredTodoList.map((card) => {

                        return (
                            <Task
                                handleChangeCardText={handleChangeCardText}
                                handleDeleteCard={handleDeleteCard}
                                card={card}
                                key={card.id}
                                comments={comments}
                                handleShowTaskModal={handleShowTaskModal}
                            />
                        )
                    }
                )}

            </Columns>

        </Root>
    )
}

export default Column

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
const Title = styled.h1`
  width: 80%;
  text-align: center;
  font-size: 30px;
  margin: 0 0 5px 0;
  word-wrap: break-word;
  cursor: pointer;
`;
const NewTaskButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  height: 30px;
  width: 50px;
  cursor: pointer;
`;
const NewTask = styled.input`
  height: 30px;
  border: none;
  border-radius: 5px;
  width: 80%;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;
const EditTitle = styled.input`
  width: 80%;
  text-align: center;
  font-size: 30px;
  margin: 0 0 5px 0;
  padding: 0;
`;
const DeleteColumnButton = styled.button`
  padding: 0;
  margin: 0;
  background: center/100% url(${trashIcon}) no-repeat;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const Columns = styled.div`
  width: 100%;
  gap: 10px;
  justify-content: space-between;
`;