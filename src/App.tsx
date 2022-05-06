import React, {useState} from "react";
import {Column, Login, Modal,TaskModal} from './components';
import {ToDoList,ColumnInterface} from "./interfaces";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";


const initialColumnsName = [
    {id: uuidv4(), title: 'To do',toDoList:[] as ToDoList[]},
    {id: uuidv4(), title: 'In Progress',toDoList:[]as ToDoList[]},
    {id: uuidv4(), title: 'Testing',toDoList:[]as ToDoList[]},
    {id: uuidv4(), title: 'Done',toDoList:[]as ToDoList[]},
]

const App: React.FC = () => {

    const [userName, setUserName] = useState<string>('');
    const [columnTitle, setColumnTitle] = useState<string>('');
    const [isLoginModalActive, setLoginModalActive] = useState<boolean>(true);
    const [isTaskModalActive, setTaskModalActive] = useState<boolean>(false);
    const [columns, setColumns] = useState<ColumnInterface[]>(initialColumnsName);
    const [showedId, setShowedId] = useState<string>('');
    const [showedToDoElement, setShowedToDoElement]=useState<ToDoList>()

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(target.value)
    };
    
    const handleCreateColumn = () => {
        if (columnTitle) {
            setColumns([...columns, {id: uuidv4(), title: columnTitle,toDoList:[]}])
            setColumnTitle('')
        }
    };

    const onShowTaskModal = ({target}: React.MouseEvent<HTMLDivElement>) => {
        setTaskModalActive(true)
        setShowedId((target as HTMLDivElement).id)
        columns.map(el => {
            el.toDoList.map((el) => {
                if (el.id === (target as HTMLDivElement).id) {
                    setShowedToDoElement(el)
                }
            })
        })
    };

    return (

        <Root>

            <Modal>
                <Login isActive={isLoginModalActive} userName={userName} onSetUserName={setUserName} onSetModalActive={setLoginModalActive}/>
            </Modal>

            {showedToDoElement && <Modal>
                <TaskModal showedId={showedId} isActive={isTaskModalActive}  showedToDoElement={showedToDoElement} userName={userName} onSetModalActive={setTaskModalActive} columns={columns} onSetColumns={setColumns} />
            </Modal>}

            <NewColumn type="text" onChange={handleChange} value={columnTitle}/>

            <NewColumnButton onClick={handleCreateColumn}>Add Board</NewColumnButton>

            <Columns>

                {columns.map((el) => {
                    return (
                        <Column columns={columns} onSetColumns={setColumns} columnId={el.id} key={el.id} columnTitle={el.title} onShowTaskModal={onShowTaskModal}/>
                    )
                })}
            </Columns>

        </Root>
    )
}

export default App

const Columns = styled.div`
  display: flex;
  width: 90%;
  box-sizing: border-box;
  margin: 20px;
`;
const NewColumn = styled.input`
  width: 400px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
const Root = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: center;
`;
const NewColumnButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  width: 150px;
  height: 30px;
  margin-top: 20px;
`;
