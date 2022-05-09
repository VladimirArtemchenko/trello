import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {cardType, CommentType} from "../../interfaces";
import {Modal, TaskModal} from "../index";

export interface TaskProps {
    todoList: cardType[]
    onSetTodoList: (value: cardType[]) => void
    columnId: string
    columnTitle: string
    todoText: string
    cardId: string
    userName: string
    todoDescription: string
    comments: CommentType[]
    onSetComments: (value: CommentType[]) => void
    saveTodoList: (value: cardType[]) => void
};

const Task: React.FC<TaskProps> = ({
                                       userName,
                                       todoText,
                                       cardId,
                                       todoList,
                                       onSetTodoList,
                                       columnTitle,
                                       todoDescription,
                                       comments,
                                       onSetComments,
                                       saveTodoList
                                   }) => {

    const [taskTitle, setValueTask] = useState<string>(todoText);
    const [value, setValue] = useState<string>('');
    const [isTaskActive, setTaskActive] = useState<boolean>(true);
    const [isTaskModalActive, setTaskModalActive] = useState<boolean>(false);
    const [commentCount, setCommentCount] = useState<number>(0)


    const handleEditMode = () => {
        setValue(todoText)
        setTaskActive(false)
    }

    const handleChangeTask = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setValueTask(target.value)
        setValue(target.value)
    }

    const handleSaveTask = () => {
        const newTodoList = todoList.map(todo => {

            if (todo.id === cardId) {
                todo.text = taskTitle
            }
            return todo
        })

        onSetTodoList([...newTodoList])
        setTaskActive(true)
    }

    saveTodoList(todoList)

    const handleCanceled = () => {
        setTaskActive(true)
    }

    const handleDeleteTask = () => {
        const newTodoList = todoList.filter(todo => todo.id !== cardId);
        onSetTodoList([...newTodoList]);
    }

    saveTodoList(todoList)

    const handleShowTaskModal = ({target}: React.MouseEvent<HTMLDivElement>) => {
        setTaskModalActive(true)
    }

    return (

        <Root>

            <Flex>

                {isTaskActive
                    ? <Text id={cardId} onClick={handleShowTaskModal}>{todoText}</Text>

                    : <EditTask onChange={handleChangeTask}
                                value={value} name={todoText}/>
                }

                <FlexColumn>

                    {isTaskActive
                        ? <Container>

                            <EditButton onClick={handleEditMode}>Edit</EditButton>

                            <DeleteTaskButton onClick={handleDeleteTask}/>

                        </Container>

                        : <Container>

                            <SaveButton onClick={handleSaveTask}>Save</SaveButton>

                            <CancelButton onClick={handleCanceled}>Cancel</CancelButton>

                        </Container>
                    }


                </FlexColumn>

            </Flex>

            {todoList.map((todo) => {

                if (todo.id === cardId) {
                    return (
                        <Comments>Comments:{todo.commentsCount}</Comments>
                    )
                }
            })}

            {isTaskModalActive

                && <Modal>

                    <TaskModal comments={comments}
                               onSetComments={onSetComments}
                               cardId={cardId}
                               columnTitle={columnTitle}
                               todoText={todoText}
                               todoDescription={todoDescription}
                               userName={userName}
                               onSetModalActive={setTaskModalActive}
                               todoList={todoList}
                               onSetTodoList={onSetTodoList}
                               onSetCommentCount={setCommentCount}
                               commentCount={commentCount}
                               saveTodoList={saveTodoList}
                    />

                </Modal>}

        </Root>
    )
}

export default Task

const Root = styled.div`
  width: 300px;
  box-sizing: border-box;
  border: solid 1px gray;
  border-radius: 10px;
  margin-top: 10px;
`;
const Text = styled.p`
  width: 70%;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
  cursor: pointer;
`;
const Comments = styled.p`
  width: 100%;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
  cursor: default;

`;
const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
const FlexColumn = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
const EditTask = styled.input`
  width: 70%;
  height: 50px;
  font-size: 18px;
  word-wrap: break-word;
  w;
  margin: 5px 0 0 0;
  padding: 0;
`;
const DeleteTaskButton = styled.button`
  padding: 0;
  margin: 5px;
  background: center/100% url(${trashIcon}) no-repeat;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const EditButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
`;
const SaveButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
`;
const CancelButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
`;
const Container = styled.div`
`;