import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import trashIcon from '../../images/trash.svg';
import { editComment, removeComment } from '../../store/comments/reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

export interface CommentsProps {

  commentText: string;
  commentId: string;
}

const Comments: React.FC<CommentsProps> = ({
  commentText,
  commentId,
}) => {
  const { register, handleSubmit, setValue } = useForm({ defaultValues: { comment: commentText } });
  const userName = useAppSelector((state) => state.userName.userName);
  const dispatch = useAppDispatch();
  const [isCommentEditMode, setCommentEditMode] = useState(false);

  const handleDeleteButton = () => {
    dispatch(removeComment({ commentId }));
  };

  const handleEditButton = () => {
    setCommentEditMode(!isCommentEditMode);
  };

  const handleSaveButton = (data: { comment: string; }) => {
    if (data.comment !== '') {
      dispatch(editComment({
        commentId,
        commentText: data.comment,
      }));
    } else {
      setValue('comment', commentText);
    }
    setCommentEditMode(!isCommentEditMode);
  };

  const cancelCommentEdit = () => {
    setCommentEditMode(!isCommentEditMode);
    setValue('comment', commentText);
  };

  return (
    <Root>
      <Flex>
        {isCommentEditMode
          ? <CommentEditInput {...register('comment')} autoFocus />
          : (
            <Comment onClick={handleEditButton}>
              {userName}
              {' '}
              :
              {' '}
              {commentText}
            </Comment>
          )}
        {isCommentEditMode
          ? (
            <Container>
              <SaveButton onClick={handleSubmit(handleSaveButton)}>Save</SaveButton>
              <CancelButton type="button" onClick={cancelCommentEdit}>Cancel</CancelButton>
            </Container>
          )
          : (
            <Container>
              <EditButton onClick={handleEditButton}>Edit</EditButton>
              <DeleteCommentButton onClick={handleDeleteButton} />

            </Container>
          )}
      </Flex>
    </Root>
  );
};

export default Comments;

const Root = styled.div`
  margin: 0 15% 0 15%;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;
const CommentEditInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 18px;
  word-wrap: break-word;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0;
  border: none;

  &:focus {
    outline: solid 2px cornflowerblue;
`;
const DeleteCommentButton = styled.button`
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
const Comment = styled.p`
  width: 100%;
  min-height: 50px;
  font-size: 18px;
  word-wrap: break-word;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;
  background: darkgray;
  cursor: pointer;
`;
const EditButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  background: darkgray;
  color: #010140;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
`;
const SaveButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  background: darkgray;
  color: #010140;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
`;
const CancelButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  background: darkgray;
  color: #010140;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;
