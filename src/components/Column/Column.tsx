import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {v4 as uuidv4} from 'uuid';
import {Task} from "../index";
import {cardType, ColumnInterface, CommentType} from "../../interfaces";

export interface ColumnProps {
    columnTitle: string
    columnId: string
    onSetTodoList: (value: cardType[]) => void
    todoList: cardType[]
    columns: ColumnInterface[]
    onSetColumns: (value: ColumnInterface[]) => void
    userName: string
    comments: CommentType[]
    onSetComments: (value: CommentType[]) => void
    saveColumns: (value: ColumnInterface[]) => void
    saveTodoList: (value: cardType[]) => void
};

const Column: React.FC<ColumnProps> = ({
                                           columnTitle,
                                           columnId,
                                           onSetColumns,
                                           columns,
                                           onSetTodoList,
                                           todoList,
                                           userName,
                                           comments,
                                           onSetComments,
                                           saveColumns,
                                           saveTodoList

                                       }) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [title, setTitle] = useState<string>(columnTitle);
    const [isEditActive, setEditActive] = useState<boolean>(false);

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(target.value)
    }

    const handleCreateTask = () => {
        if (taskTitle) {
            onSetTodoList([{
                id: uuidv4(),
                text: taskTitle,
                description: 'Введите подробное описание',
                columnId: columnId,
                commentsCount: 0
            }, ...todoList]);
            setTaskTitle('');
        }
    }

    saveTodoList(todoList)

    const handleEditColumn = () => {
        setEditActive(!isEditActive)
    };

    const handleChangeColumn = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value)

        const newColumns = columns.map(column => {

            if (column.id === columnId) {
                column.columnName = target.value
            }
            return column
        });

        onSetColumns([...newColumns])
    }

    saveColumns(columns)

    const handleDeleteColumnButtonClick = () => {
        const newColumns = columns.filter(column => column.id !== columnId);
        onSetColumns([...newColumns]);
    }

    saveColumns(columns)

    return (
        <Root>

            <Flex>

                {isEditActive

                    ? <EditTitle onChange={handleChangeColumn} onBlur={handleEditColumn}
                                 value={title} name={columnTitle}/>

                    : <Title onClick={handleEditColumn}>{columnTitle}</Title>
                }

                <DeleteColumnButton onClick={handleDeleteColumnButtonClick}/>

            </Flex>

            <Flex>

                <NewTask onChange={handleChange} value={taskTitle} name={taskTitle}/>

                <NewTaskButton onClick={handleCreateTask}>Add</NewTaskButton>

            </Flex>

            <Columns>

                {todoList.map((todo) => {
                    if (todo.columnId === columnId) {

                        return (
                            <Task columnTitle={columnTitle}
                                  userName={userName}
                                  columnId={todo.columnId}
                                  todoList={todoList}
                                  onSetTodoList={onSetTodoList}
                                  todoText={todo.text}
                                  todoDescription={todo.description}
                                  cardId={todo.id}
                                  key={todo.id}
                                  comments={comments}
                                  onSetComments={onSetComments}
                                  saveTodoList={saveTodoList}
                            />
                        )
                    }
                })}

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