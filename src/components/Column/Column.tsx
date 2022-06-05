import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import trashIcon from '../../images/trash.svg';
import { Task } from '../index';
import { removeColumn, editColumn } from '../../store/column/reducer';
import { addTask } from '../../store/todoList/reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

export interface ColumnProps {
  // eslint-disable-next-line no-unused-vars
  handleShowTaskModal: ({ target }: React.MouseEvent<HTMLDivElement>) => void;
  columnTitle: string;
  columnId: string;
}

const Column: React.FC<ColumnProps> = ({
  columnTitle,
  columnId,
  handleShowTaskModal,
}) => {
  const { register, handleSubmit, setValue } = useForm({ defaultValues: { columnTitle, taskTitle: '' } });
  const todoList = useAppSelector((state) => state.todoList.todoList);
  const dispatch = useAppDispatch();
  const [isEditActive, setEditActive] = useState(false);

  const filteredTodoList = useMemo(
    () => todoList.filter((todo) => todo.columnId === columnId),
    [columnId, todoList],
  );

  const handleEditColumn = () => {
    setEditActive(!isEditActive);
  };

  const handleNewTaskButton = (data: { taskTitle: string; }) => {
    if (data.taskTitle) {
      dispatch(addTask({
        text: data.taskTitle,
        columnId,
      }));
      setValue('taskTitle', '');
    }
  };

  const handleColumn = (data: { columnTitle: string }) => {
    if (data.columnTitle !== '') {
      dispatch(editColumn({
        columnId,
        columnTitle: data.columnTitle,
      }));
    } else {
      dispatch(editColumn({
        columnId,
        columnTitle,
      }));
      setValue('columnTitle', columnTitle);
    }
    setEditActive(!isEditActive);
  };

  const handleDeleteColum = () => {
    dispatch(removeColumn({ columnId }));
  };

  return (
    <Root>
      <Flex>
        {isEditActive
          ? <EditTitle type="text" {...register('columnTitle')} onBlur={handleSubmit(handleColumn)} autoFocus />
          : <Title onClick={handleEditColumn}>{columnTitle}</Title>}
        <DeleteColumnButton onClick={handleDeleteColum} />
      </Flex>
      <Tasks>
        {filteredTodoList.map((card) => (
          <Task
            cardId={card.id}
            cardText={card.text}
            key={card.id}
            handleShowTaskModal={handleShowTaskModal}
          />
        ))}
      </Tasks>

      <Flex>

        <NewTask type="text" {...register('taskTitle')} />

        <NewTaskButton onClick={handleSubmit(handleNewTaskButton)}>Add</NewTaskButton>

      </Flex>
    </Root>
  );
};

export default Column;

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
