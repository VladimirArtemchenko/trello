import React, {useState} from "react";
import {Column, Login, Modal} from './components';
import {ColumnInterface, cardType, CommentType,Json} from "./interfaces";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";

const initialColumnsName = [
    {id: uuidv4(), columnName: 'To do'},
    {id: uuidv4(), columnName: 'In Progress'},
    {id: uuidv4(), columnName: 'Testing'},
    {id: uuidv4(), columnName: 'Done'},
]

const App: React.FC = () => {

    const columnWidth = 300

    const initialUserName = () => {
        const localUserName= localStorage.getItem("userName")??''
        if (localStorage.getItem("userName")){
            const localUserNameObj = JSON.parse(localUserName)
            return localUserNameObj
        }else {
            return ''
        }
    }

    const initialColumn = () => {
        const localColumns = localStorage.getItem("columns") ?? ''
        if (localColumns) {
            const localColumnsObj = JSON.parse(localColumns)
            return localColumnsObj
        } else {
            localStorage.setItem("columns", JSON.stringify([...initialColumnsName]))
            return initialColumnsName
        }
    }

    const initialTodoList = () => {

        const localTodoList: any = localStorage.getItem("todoList")??''
        if (localTodoList) {
            const localTodoListObj = JSON.parse(localTodoList)
            return localTodoListObj
        } else {
            return []
        }
    }

    const initialComments = () => {
        const localComments: any = localStorage.getItem("comments")??''
        if (localComments) {
            const localCommentsObj = JSON.parse(localComments)
            return localCommentsObj
        } else {
            return []
        }
    }

    const saveColumns = (object: ColumnInterface[]) => {
        localStorage.setItem("columns", JSON.stringify([...object]))
    }
    const saveTodoList = (object: cardType[]) => {
        localStorage.setItem("todoList", JSON.stringify([...object]))
    }

    const [userName, setUserName] = useState<string>(initialUserName);
    const [columns, setColumns] = useState<ColumnInterface[]>(initialColumn);
    const [todoList, setTodoList] = useState<cardType[]>(initialTodoList);
    const [comments, setComments] = useState<CommentType[]>(initialComments);
    const [columnTitle, setColumnTitle] = useState<string>('');
    const columnsWidth: string = `${(columnWidth + 20) * columns.length}px`;

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(target.value)
    }

    const handleCreateColumn = () => {
        if (columnTitle) {
            setColumns([...columns, {id: uuidv4(), columnName: columnTitle}])
            setColumnTitle('')
        }
    }

    saveColumns(columns)

    return (

        <Root>

            {userName

                ? <div>

                    <CentredFlex>

                        <NewColumn type="text" onChange={handleChange} value={columnTitle}/>
                        <NewColumnButton onClick={handleCreateColumn}>Add Board</NewColumnButton>

                    </CentredFlex>

                    <Columns columnsWidth={columnsWidth}>

                        {columns.map((column) => {

                            return (
                                <Column userName={userName}
                                        columns={columns}
                                        onSetColumns={setColumns}
                                        columnId={column.id}
                                        key={column.id}
                                        columnTitle={column.columnName}
                                        onSetTodoList={setTodoList}
                                        todoList={todoList}
                                        comments={comments}
                                        onSetComments={setComments}
                                        saveColumns={saveColumns}
                                        saveTodoList={saveTodoList}

                                />
                            )
                        })}

                    </Columns>

                </div>

                : <Modal>
                    <Login onSetUserName={setUserName}/>
                </Modal>
            }

        </Root>
    )
}

export default App

const Root = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Columns = styled.div<{ columnsWidth: string }>`
  display: flex;
  width: ${props => props.columnsWidth};
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
