import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import trashIcon from '../../images/trash.svg';
import { Comments } from '../index';
import { editTask, editDescription } from '../../store/todoList/reducer';
import { addComment } from '../../store/comments/reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

export interface TaskPopupProps {
  // eslint-disable-next-line no-unused-vars
  onSetCurrentCardId: (value: string) => void;
  currentCardId: string;
  currentCardText: string;
  currentCardDescription: string;
  currentColumnTitle: string;
}

const TaskPopup: React.FC<TaskPopupProps> = ({
  onSetCurrentCardId,
  currentCardId,
  currentCardText,
  currentCardDescription,
  currentColumnTitle,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      taskTitle: currentCardText,
      description: currentCardDescription,
      comment: '',
    },
  });
  const [isDescriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);
  const [isTitleEditMode, setTitleEditMode] = useState<boolean>(false);
  const comments = useAppSelector((state) => state.comments.comments);
  const dispatch = useAppDispatch();

  const filteredComments = useMemo(
    () => comments.filter((commentItem) => commentItem.cardId === currentCardId),
    [currentCardId, comments],
  );

  const handleCloseModal = () => {
    onSetCurrentCardId('');
  };

  const handleEditTitle = () => {
    setTitleEditMode(!isTitleEditMode);
  };

  const handleTitle = (data: { taskTitle: string; }) => {
    if (data.taskTitle !== '') {
      dispatch(editTask({
        cardId: currentCardId,
        text: data.taskTitle,
      }));
    } else {
      dispatch(editTask({
        cardId: currentCardId,
        text: currentCardText,
      }));
      setValue('taskTitle', currentCardText);
    }
    setTitleEditMode(!isTitleEditMode);
  };

  useEffect(() => {
    const handleEsc = (event: { keyCode: number; }) => {
      if (event.keyCode === 27) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleEditDescription = () => {
    setDescriptionEditMode(!isDescriptionEditMode);
  };

  const handleEditButton = (data: { description: string; }) => {
    dispatch(editDescription({
      cardId: currentCardId,
      description: data.description,
    }));
    setDescriptionEditMode(!isDescriptionEditMode);
  };

  const cancelDescriptionEdit = () => {
    setDescriptionEditMode(!isDescriptionEditMode);
    setValue('description', currentCardDescription);
  };
  const handleDeleteButton = () => {
    dispatch(editDescription({
      cardId: currentCardId,
      description: '',
    }));
    setValue('description', '');
  };

  const handleCommentButton = (data: { comment: string; }) => {
    if (data.comment !== '') {
      dispatch(addComment({
        cardId: currentCardId,
        commentText: data.comment,
      }));
      setValue('comment', '');
    }
  };

  return (
    <Root onClick={handleCloseModal}>
      <Container onClick={(event) => event.stopPropagation()}>
        {isTitleEditMode
          ? (
            <InputTitle type="text" {...register('taskTitle')} onBlur={handleSubmit(handleTitle)} autoFocus />
          )
          : <Title onClick={handleEditTitle}>{currentCardText}</Title>}
        <Text>
          {' '}
          в колонке:
          {currentColumnTitle}
        </Text>
        <Text>Описание</Text>
        <Flex>
          {isDescriptionEditMode
            ? (
              <InputDescription
                {...register('description')}
                placeholder="Ведите подробное описание"
                autoFocus
              />
            )
            : (
              <Description
                onClick={handleEditDescription}
              >
                {currentCardDescription || 'Ведите подробное описание'}
              </Description>
            )}
          <FlexColumn>
            <EditButton type="submit" onClick={handleSubmit(handleEditButton)}>Add</EditButton>
            {isDescriptionEditMode
              ? <CancelButton type="button" onClick={cancelDescriptionEdit}>Cancel</CancelButton>
              : <DeleteDescriptionButton onClick={handleDeleteButton} />}
          </FlexColumn>
        </Flex>
        <Flex>
          <CommentInput
            {...register('comment')}
            placeholder="Введите свой коментарий"
          />
          <CommentButton type="submit" onClick={handleSubmit(handleCommentButton)}>Comment</CommentButton>
        </Flex>
        <CommentsContainer>
          <div>
            {filteredComments.map((commentItem) => (
              <Comments
                commentText={commentItem.commentText}
                commentId={commentItem.id}
                key={commentItem.id}
              />
            ))}
          </div>
        </CommentsContainer>
      </Container>
    </Root>
  );
};

export default TaskPopup;

const Root = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  min-height: 300px;
  max-height: 700px;
  background: rgba(211, 211, 211, 1);
  border-radius: 20px;
  margin: 50px;
`;

const Title = styled.h1`
  background: lightgrey;
  border-radius: 5px;
  width: 80%;
  max-height: 100px;
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
  word-wrap: break-word;
  overflow-y: auto;
  cursor: pointer;
`;
const InputTitle = styled.input`
  text-align: center;
  font-size: 30px;
  height: 30px;
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: solid 2px cornflowerblue;
`;
const Text = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-top: 10px;
  cursor: default;
`;
const Description = styled.p`
  resize: none;
  font-size: 18px;
  margin: 10px;
  width: 90%;
  min-height: 50px;
  max-height: 150px;
  word-wrap: break-word;
  cursor: pointer;
  overflow-y: auto;
`;
const InputDescription = styled.textarea`
  resize: none;
  font-size: 18px;
  margin: 10px;
  width: 90%;
  min-height: 50px;
  word-wrap: break-word;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: solid 2px cornflowerblue;
`;
const CommentInput = styled.input`
  text-align: center;
  font-size: 18px;
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: solid 2px cornflowerblue;
`;
const CommentButton = styled.button`
  padding: 0;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  background: darkgray;
  color: #010140;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
`;
const Flex = styled.div`
  margin-top: 20px;
  width: 70%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
const DeleteDescriptionButton = styled.button`
  padding: 0;
  margin: 0;
  background: center/100% url(${trashIcon});
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
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
  background: darkgray;
  color: #010140;
  &:hover {
    opacity: 0.4;
`;
const CancelButton = styled.button`
  padding: 0;
  margin: 5px;
  background: darkgray;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
  color: #010140;
  &:hover {
    opacity: 0.4;
`;
const CommentsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  width: 90%;
  max-height: 300px;
`;
