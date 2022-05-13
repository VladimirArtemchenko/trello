import React, {useMemo, useState} from "react";
import {Column, Login, Modal, TaskModal} from './components';
import {ColumnInterface, CommentType, CardType} from "./interfaces";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {useStateWithLocalStorage} from "./hooks";
import {useForm} from "react-hook-form";

const initialColumnsName = [
    {id: uuidv4(), columnName: 'To do'},
    {id: uuidv4(), columnName: 'In Progress'},
    {id: uuidv4(), columnName: 'Testing'},
    {id: uuidv4(), columnName: 'Done'},
]

const App: React.FC = () => {

    const {register, handleSubmit,setValue} = useForm({defaultValues: {columnTitle: ""}});
    const [userName, setUserName] = useStateWithLocalStorage<string>("userName", '')
    const [columns, setColumns] = useStateWithLocalStorage<ColumnInterface[]>("columns", initialColumnsName)
    const [todoList, setTodoList] = useStateWithLocalStorage<CardType[]>("todoList", [])
    const [comments, setComments] = useStateWithLocalStorage<CommentType[]>("comments", [])
    const [isEdit, setIsEdit] = useState(true)
    const [currentCardId, setCurrentCardId] = useState<string>()

    const handleCreateColumn = (data: { columnTitle: string }) => {
        if (data.columnTitle) {
            setColumns([...columns, {id: uuidv4(), columnName: data.columnTitle}])
            setValue("columnTitle",'')
        }
        setIsEdit(true)
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
        [todoList, currentCardId]
    )

    const currentColumn = useMemo(
        () => columns.find(column =>
            column.id === currentCard?.columnId),
        [columns, currentCard]
    )
    const isCardPopupOpen = currentCardId && currentCard && currentColumn

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

    const handleNewButton = () => {
        setIsEdit(false)
    }

    const handleCancelButton = () => {
        setIsEdit(true)
    }

    return (

        <Root>

            {userName

                ? <div>

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
                        {isEdit
                            ?
                            <AddButton onClick={handleNewButton}>+ Добавить еще колонку</AddButton>

                            : <CentredFlex onSubmit={handleSubmit(handleCreateColumn)}>

                                < NewColumn type="text" {...register("columnTitle")} autoFocus={true}/>

                                <Flex>

                                    <NewColumnButton type="submit">Add Board</NewColumnButton>

                                    <CancelButton onClick={handleCancelButton}>X</CancelButton>

                                </Flex>

                            </CentredFlex>
                        }
                    </Columns>

                </div>

                : <Modal>
                    <Login onSetUserName={setUserName}/>
                </Modal>
            }

            {isCardPopupOpen
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
          `${320 * ($columnsCount+1)}px`};
  box-sizing: border-box;
  gap: 20px;
`;
const NewColumn = styled.input`
  width: 280px;
  height: 30px;
  border-radius: 10px;
  border:none;
  &:focus {
    outline:  solid 2px cornflowerblue;
  }
`;
const AddButton = styled.button`
  font-size: 16px;
  border: none;
  border-radius: 5px;
  width: 300px;
  height: 40px;
  margin-top: 5px;
  cursor: pointer;
  background: lightgray;
  color: #010140;
  &:hover {
    opacity: 0.4;
`;
const NewColumnButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  margin-top: 5px;
  cursor: pointer;
  background: cornflowerblue;
  color: #010140;
  &:hover {
    opacity: 0.4;
`;
const CancelButton = styled.button`
  font-size: 32px;
  border: none;
  color: cornflowerblue;
  width: 40px;
  height: 40px;
  margin-top: 5px;
  cursor: pointer;
  background: none;
  &:hover {
    opacity: 0.4;
`;
const CentredFlex = styled.form`
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  width: 300px;
  height: 100px;
  background: lightgray;
  flex-direction: column;
  display: flex;
  margin-bottom: 5px;
`
const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
