import React, {useMemo, useState} from "react";
import {Column, Login, Modal, TaskModal} from './components';
import {ColumnInterface, CommentType, CardType} from "./interfaces";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {useStateWithLocalStorage} from "./hooks";

const initialColumnsName = [
    {id: uuidv4(), columnName: 'To do'},
    {id: uuidv4(), columnName: 'In Progress'},
    {id: uuidv4(), columnName: 'Testing'},
    {id: uuidv4(), columnName: 'Done'},
]

const App: React.FC = () => {

    const [userName, setUserName] = useStateWithLocalStorage<string>("userName", '')
    const [columns, setColumns] = useStateWithLocalStorage<ColumnInterface[]>("columns", initialColumnsName)
    const [todoList, setTodoList] = useStateWithLocalStorage<CardType[]>("todoList", [])
    const [comments, setComments] = useStateWithLocalStorage<CommentType[]>("comments", [])
    const [columnTitle, setColumnTitle] = useState('');
    const [currentCardId, setCurrentCardId] = useState<string>()

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(target.value)
    }

    const handleCreateColumn = () => {
        if (columnTitle) {
            setColumns([...columns, {id: uuidv4(), columnName: columnTitle}])
            setColumnTitle('')
        }
    }

    const handleChangeColumn = (columnId: string, columnName: string) => {
        const newColumns = columns.map(column => column.id === columnId
            ? {...column, columnName: columnName} : column)
        setColumns([...newColumns]);
    }

    const handleDeleteColumn = (columnId: string) => {
        const newColumns = columns.filter(column => column.id !== columnId);
        setColumns([...newColumns]);
    }

    const handleShowTaskModal = ({currentTarget}: React.MouseEvent) => {
        setCurrentCardId(currentTarget.id)
    }

    const filteredComments = useMemo(
        () => comments.filter((comment) =>
            comment.cardId === currentCardId),
        [comments, currentCardId]
    )

    const currentCard = useMemo(
        () => todoList.find(todo =>
            todo.id === currentCardId),
        [columns, currentCardId]
    )

    const currentColumn = useMemo(
        () => columns.find(column =>
            column.id === currentCard?.columnId),
        [columns, currentCard]
    )

    const handleCreateTask = (columnId: string, taskTitle: string) => {
        if (taskTitle) {
            setTodoList([{id: uuidv4(), text: taskTitle, description: '', columnId: columnId,}, ...todoList]);
        }
    }

    const handleChangeCardText = (cardId: string, text: string) => {
        const newTodoList = todoList.map(todo => todo.id === cardId
            ? {...todo, text: text} : todo)
        setTodoList([...newTodoList]);
    }

    const handleChangeDescription = (cardId: string, description: string) => {
        const newTodoList = todoList.map(todo => todo.id === cardId
            ? {...todo, description: description} : todo)
        setTodoList([...newTodoList]);
    }

    const handleDeleteCard = (cardId: string) => {
        const newTodoList = todoList.filter(todo => todo.id !== cardId);
        setTodoList([...newTodoList]);
    }

    const handleAddComment = (cardId: string, commentText: string) => {
        setComments([{id: uuidv4(), commentText: commentText, cardId: cardId}, ...comments]);
    }

    const handleDeleteComment = (commentId: string) => {
        const newComments = comments.filter(comment => comment.id !== commentId);
        setComments([...newComments]);
    }

    const handleEditComment = (commentId: string, commentText: string) => {
        const newComments = comments.map(comment => comment.id === commentId
            ? {...comment, commentText: commentText} : comment)
        setComments([...newComments]);
    }

    const cardModalRenderingConditions = currentCardId && currentCard && currentColumn


    return (

        <Root>

            {userName

                ? <div>

                    <CentredFlex>

                        <NewColumn type="text" onChange={handleChange} value={columnTitle}/>

                        <NewColumnButton onClick={handleCreateColumn}>Add Board</NewColumnButton>

                    </CentredFlex>

                    <Columns $columnsCount={columns.length}>

                        {columns.map((column) => {

                            return (

                                <Column
                                    handleChangeColumn={handleChangeColumn}
                                    handleDeleteColumn={handleDeleteColumn}
                                    handleShowTaskModal={handleShowTaskModal}
                                    handleChangeCardText={handleChangeCardText}
                                    handleDeleteCard={handleDeleteCard}
                                    handleCreateTask={handleCreateTask}
                                    columnId={column.id}
                                    columnTitle={column.columnName}
                                    todoList={todoList}
                                    comments={comments}
                                    key={column.id}
                                />
                            )
                        })}

                    </Columns>

                </div>

                : <Modal>
                    <Login onSetUserName={setUserName}/>
                </Modal>
            }

            {cardModalRenderingConditions
                && <Modal>

                    <TaskModal
                        userName={userName}
                        onSetCurrentCardId={setCurrentCardId}
                        currentCardId={currentCardId}
                        currentCardText={currentCard.text}
                        currentCardDescription={currentCard.description}
                        currentColumnTitle={currentColumn.columnName}
                        currentComments={filteredComments}
                        handleChangeCardText={handleChangeCardText}
                        handleChangeDescription={handleChangeDescription}
                        handleAddComment={handleAddComment}
                        handleDeleteComment={handleDeleteComment}
                        handleEditComment={handleEditComment}
                    />

                </Modal>}


        </Root>
    )
}

export default App

const Root = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Columns = styled.div<{ $columnsCount: number }>`
  display: flex;
  width: ${({$columnsCount}) =>
          `${320 * $columnsCount}px`};
  box-sizing: border-box;
  gap: 20px;
`;
const NewColumn = styled.input`
  width: 400px;
  height: 30px;
  border: none;
  border-radius: 10px;
`;

const NewColumnButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 10px;
  background: white;
  width: 150px;
  height: 30px;
  margin-top: 20px;
  cursor: pointer;
`;
const CentredFlex = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`
