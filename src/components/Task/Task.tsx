import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import trashIcon from '../../images/trash.svg';
import commentsIcon from '../../images/commentsIcon.png';
import { removeTask, editTask } from '../../store/todoList/reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

export interface TaskProps {
  // eslint-disable-next-line no-unused-vars
  handleShowTaskModal: (value : React.MouseEvent<HTMLDivElement>) => void;
  cardId: string;
  cardText: string;
}

const Task: React.FC<TaskProps> = ({
  handleShowTaskModal,
  cardId,
  cardText,

}) => {
  const comments = useAppSelector((state) => state.comments.comments);
  const dispatch = useAppDispatch();
  // const [value, setValue] = useState(cardText);
  const [isTaskActive, setTaskActive] = useState(true);
  const { register, handleSubmit, setValue } = useForm({ defaultValues: { taskTitle: cardText } });

  const filteredComments = useMemo(
    () => comments.filter((comment) => comment.cardId === cardId),
    [cardId, comments],
  );
  const handleEditMode = () => {
    setTaskActive(false);
  };

  const handleSaveTask = (data: { taskTitle: string; }) => {
    if (data.taskTitle !== '') {
      dispatch(editTask({
        cardId,
        text: data.taskTitle,
      }));
    } else {
      dispatch(editTask({
        cardId,
        text: cardText,
      }));
      setValue('taskTitle', cardText);
    }
    setTaskActive(true);
  };

  const handleCancelTaskEditing = () => {
    setTaskActive(true);
  };

  const handleDeleteTask = () => {
    dispatch(removeTask({ cardId }));
  };

  return (
    <Root>
      <Flex>
        {isTaskActive
          ? <Text id={cardId} onClick={handleShowTaskModal}>{cardText}</Text>
          : <EditTask {...register('taskTitle')} autoFocus />}
        <FlexColumn>
          {isTaskActive
            ? (
              <Container>
                <EditButton onClick={handleEditMode}>Edit</EditButton>
                <DeleteTaskButton onClick={handleDeleteTask} />
              </Container>
            )
            : (
              <Container>
                <SaveButton onClick={handleSubmit(handleSaveTask)}>Save</SaveButton>
                <CancelButton onClick={handleCancelTaskEditing}>Cancel</CancelButton>
              </Container>
            )}
        </FlexColumn>
      </Flex>
      <Flex>
        <CommentsIcon />
        <Comments>{filteredComments.length}</Comments>

      </Flex>
    </Root>
  );
};

export default Task;

const Root = styled.div`
  width: 260px;
  padding: 5px;
  box-sizing: border-box;
  background: rgba(221, 221, 221, 0.4);
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
  align-items: center;
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
  margin: 5px 0 0 0;
  padding: 0;
  border: none;

  &:focus {
    outline: solid 2px cornflowerblue;
`;
const DeleteTaskButton = styled.button`
  padding: 0;
  margin: 5px;
  background: center/100% url(${trashIcon}) no-repeat;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #010140;

  &:hover {
    opacity: 0.4;
`;
const EditButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background: lightgray;
  width: 50px;
  height: 30px;
  cursor: pointer;
  color: #010140;

  &:hover {
    opacity: 0.4;
`;
const SaveButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  background: lightgray;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
  color: #010140;

  &:hover {
    opacity: 0.4;
`;
const CancelButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  background: lightgray;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
  color: #010140;

  &:hover {
    opacity: 0.4;
`;
const Container = styled.div`
`;
const CommentsIcon = styled.div`
  background: center/100% url(${commentsIcon}) no-repeat;
  width: 20px;
  height: 20px;
`;
