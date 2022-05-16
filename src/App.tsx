import React, {useMemo, useState} from "react";
import {Column, Login, Modal, TaskModal} from './components';
import styled from "styled-components";
import {addColumn} from './store/column/reducer'
import {useAppDispatch, useAppSelector} from "./hooks";


const App: React.FC = () => {

    const columns=useAppSelector(state => state.columns.columns)
    const userName=useAppSelector(state => state.userName.userName)
    const todoList=useAppSelector(state => state.todoList.todoList)

    const dispatch=useAppDispatch();

    const [isEdit, setIsEdit] = useState(true)
    const [columnTitle, setColumnTitle] = useState('');
    const [currentCardId, setCurrentCardId] = useState<string>()

    const addColum = () => {
        if (columnTitle) {
        dispatch(addColumn({columnTitle:columnTitle}))
        setColumnTitle('')
        }
        setIsEdit(true)
    }

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(target.value)
    }

    const handleShowTaskModal = ({currentTarget}: React.MouseEvent) => {
        setCurrentCardId(currentTarget.id)
    }

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

    const handleNewButton = () => {
        setIsEdit(false)
    }
    const handleCancelButton = () => {
        setColumnTitle('')
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
                                    handleShowTaskModal={handleShowTaskModal}
                                    columnId={column.id}
                                    columnTitle={column.columnName}
                                    key={column.id}
                                />

                            )
                        })}
                        {isEdit
                            ? <AddButton onClick={handleNewButton}>+ Добавить еще колонку</AddButton>
                            : <CentredFlex>

                                < NewColumn type="text" onChange={handleChange} value={columnTitle} autoFocus={true}/>

                                <Flex>

                                    <NewColumnButton onClick={addColum}>Add Board</NewColumnButton>
                                    <CancelButton onClick={handleCancelButton}>X</CancelButton>

                                </Flex>

                            </CentredFlex>
                        }

                    </Columns>

                </div>

                : <Modal>

                    <Login/>

                </Modal>
            }

            {isCardPopupOpen
                && <Modal>

                    <TaskModal
                        onSetCurrentCardId={setCurrentCardId}
                        currentCardId={currentCardId}
                        currentCardText={currentCard.text}
                        currentCardDescription={currentCard.description}
                        currentColumnTitle={currentColumn.columnName}
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
const CentredFlex = styled.div`
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