import React, {useState, useMemo} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {Task} from "../index";
import {CardType, CommentType} from "../../interfaces";
import {useForm} from "react-hook-form";


export interface ColumnProps {
    handleShowTaskModal: ({target}: React.MouseEvent<HTMLDivElement>) => void
    handleChangeColumn: (columnId: string, columnName: string) => void
    handleDeleteColumn: (columnId: string) => void
    handleChangeCardText: (cardId: string, text: string) => void
    handleDeleteCard: (cardId: string) => void
    handleCreateTask: (columnId: string, taskTitle: string) => void
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

    const {register, handleSubmit, setValue} = useForm({defaultValues: {columnTitle: columnTitle, taskTitle: ''}});
    const [isEditActive, setEditActive] = useState(false);

    const filteredTodoList = useMemo(
        () => todoList.filter((todo) =>
            todo.columnId === columnId),
        [columnId, todoList]
    )

    const handleNewTaskButton = (data: { taskTitle: string; }) => {
        handleCreateTask(columnId, data.taskTitle)
        setValue("taskTitle",'');
    }

    const handleEditColumn = (data: { columnTitle: string }) => {
        if (data.columnTitle !== '') {
            handleChangeColumn(columnId, data.columnTitle)
        } else {
           setValue('columnTitle',columnTitle)
        }
        setEditActive(!isEditActive)
    };

    const handleTitleClick = () => {
        setEditActive(!isEditActive)
    }

    const handleDeleteColumnButton = () => {
        handleDeleteColumn(columnId)
    }

    return (
        <Root>
            <Flex>

                {isEditActive

                    ?
                    <EditTitle type="text" {...register("columnTitle" ) } onBlur={handleSubmit(handleEditColumn)} autoFocus={true} />

                    : <Title onClick={handleTitleClick}>{columnTitle}</Title>
                }

                <DeleteColumnButton onClick={handleDeleteColumnButton}/>

            </Flex>

            <Tasks>

                {filteredTodoList.map((card) => {

                        return (
                            <Task
                                handleChangeCardText={handleChangeCardText}
                                handleDeleteCard={handleDeleteCard}
                                cardId={card.id}
                                cardText={card.text}
                                key={card.id}
                                comments={comments}
                                handleShowTaskModal={handleShowTaskModal}
                            />
                        )
                    }
                )}
            </Tasks>

            <Flex>

                <NewTask type="text"  {...register("taskTitle" ) }/>

                <NewTaskButton onClick={handleSubmit(handleNewTaskButton)}>Add</NewTaskButton>

            </Flex>
        </Root>
    )
}

export default Column

const Root = styled.div`
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  flex-direction: column;
  width: 300px;
  border-radius: 10px;
`;
const Title = styled.h1`
  width: 80%;
  max-height: 200px;
  overflow-y: auto;
  text-align: center;
  font-size: 30px;
  margin: 0 0 5px 0;
  word-wrap: break-word;
  cursor: pointer;
`;
const NewTaskButton = styled.button`
  padding: 0px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: lightgray;
  height: 30px;
  width: 50px;
  cursor: pointer;
  color: #010140;

  &:hover {
    opacity: 0.4;
`;
const NewTask = styled.input`
  height: 30px;
  border: none;
  border-radius: 5px;
  width: 80%;
  border: none;

  &:focus {
    outline: solid 2px cornflowerblue;
`;
const Flex = styled.form`
  display: flex;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`;
const EditTitle = styled.input`
  width: 80%;
  text-align: center;
  font-size: 30px;
  margin: 0 0 5px 0;
  padding: 0;
  border: none;

  &:focus {
    outline: solid 2px cornflowerblue;
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
  color: #010140;

  &:hover {
    opacity: 0.4;
`;
const Tasks = styled.div`
  margin-top: 10px;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
  border-radius: 10px;
  max-height: 700px;
  overflow-y: auto
`;