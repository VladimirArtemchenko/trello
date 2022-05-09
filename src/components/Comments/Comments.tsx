import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {CommentType, cardType} from "../../interfaces";

export interface CommentsProps {
    cardId: string
    userName: string
    commentText: string
    commentId: string
    comments: CommentType[]
    onSetComments: (value: CommentType[]) => void
    commentCount: number
    onSetCommentCount: (value: number) => void
    todoList: cardType[]
    onSetTodoList: (value: cardType[]) => void
    saveTodoList: (value: cardType[]) => void
    saveComments: (value: CommentType[]) => void
};

const Comments: React.FC<CommentsProps> = ({
                                               cardId,
                                               userName,
                                               commentText,
                                               commentId,
                                               comments,
                                               onSetComments,
                                               commentCount,
                                               onSetCommentCount,
                                               todoList,
                                               onSetTodoList,
                                               saveTodoList,
                                               saveComments
                                           }) => {

    const [isCommentEditMode, setCommentEditMode] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');

    const handleDeleteButton = () => {
        let commentsCount = 0

        const newComments = comments.filter(comment => comment.id !== commentId);

        todoList.map((todo) => {

            if (todo.id === cardId) {
                commentsCount = todo.commentsCount - 1
            }
        })

        const newTodoList = todoList.map((todo) => {

            if (todo.id === cardId) {
                todo.commentsCount = commentsCount
            }
            return todo
        })

        onSetComments([...newComments]);
        onSetCommentCount(commentCount)
        onSetTodoList([...newTodoList]);

    }

    saveTodoList(todoList)
    saveComments(comments)

    const handleEditButton = () => {
        comments.map(comment => {

            if (comment.id === commentId) {
                setCommentValue(comment.commentText)
                setCommentEditMode(!isCommentEditMode)
            }
        })
    }

    saveComments(comments)

    const handleChangeEditComment = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setCommentValue(target.value)
    }

    const handleEditComment = () => {
        const newComments = comments.map(comment => {

            if (comment.id === commentId) {
                comment.commentText = commentValue
            }
            return comment
        })

        onSetComments([...newComments])
        setCommentEditMode(!isCommentEditMode)
    }

    saveComments(comments)

    const cancelCommentEdit = () => {
        setCommentValue(commentText)
        setCommentEditMode(!isCommentEditMode)
    }

    return (
        <Root>

            <Flex>

                {isCommentEditMode

                    ? <CommentEditInput onChange={handleChangeEditComment} value={commentValue}/>

                    : <Comment onClick={handleEditButton}>{userName} : {commentText}</Comment>
                }

                {isCommentEditMode

                    ? <Container>

                        <SaveButton onClick={handleEditComment}>Save</SaveButton>

                        <CancelButton type="button" onClick={cancelCommentEdit}>Cancel</CancelButton>

                    </Container>

                    : <Container>

                        <EditButton onClick={handleEditButton}>Edit</EditButton>

                        <DeleteCommentButton onClick={handleDeleteButton}/>

                    </Container>

                }

            </Flex>

        </Root>
    )
}

export default Comments

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Flex = styled.div`
  display: flex;
  width: 80%;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;
const CommentEditInput = styled.input`
  width: 70%;
  font-size: 18px;
  word-wrap: break-word;
  border-radius: 10px;
  border: solid 1px black;
  box-sizing: border-box;
  margin: 5px 0 0 0;
  padding: 0;

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
  width: 70%;
  min-height: 50px;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
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
  cursor: pointer;
`;
const SaveButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
`;
const CancelButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;