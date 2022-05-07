import React, {useCallback, useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {CommentsProps} from "../../interfaces";

const Comments: React.FC<CommentsProps> = ({columns, onSetColumns, showedId, userName, text, commentId}) => {
    const [isCommentActive, setCommentActive] = useState<boolean>(true);
    const [isCommentEditInputActive, setCommentEditInputActive] = useState<boolean>(false);
    const [commentEdit, setCommentEdit] = useState<string>('');

    const handleDeleteButton = () => {
        const newColumns = columns.map(column => {
            column.toDoList.map(toDo => {
                toDo.comments.map(comment => {
                    if (comment.id === commentId) {
                        toDo.comments.splice(toDo.comments.findIndex(comment => comment.id === commentId), 1)
                    }
                })
            })
            return column
        })
        onSetColumns([...newColumns])
    }

    const handleEditButton = () => {
        columns.map(column => {
            column.toDoList.map(toDo => {
                toDo.comments.map(comment => {
                    if (comment.id === commentId) {
                        setCommentEdit(comment.text)
                        setCommentActive(!isCommentActive)
                        setCommentEditInputActive(!isCommentEditInputActive)
                    }
                })
            })
        })
    }

    const handleChangeEditComment = useCallback((({target}: React.ChangeEvent<HTMLInputElement>) => {
        setCommentEdit(target.value)
    }), [])

    const handleEditComment = () => {
        const newColumns = columns.map(column => {
            column.toDoList.map(todo => {
                todo.comments.map(comment => {
                    if (comment.id === commentId) {
                        comment.text = commentEdit
                    }
                })
            })
            return column
        })
        onSetColumns([...newColumns])
        setCommentActive(!isCommentActive)
        setCommentEditInputActive(!isCommentEditInputActive)
    }

    return (
        <Root>

            <Flex>
                <Comment isCommentActive={isCommentActive}>{userName} : {text}</Comment>

                <CommentEditInput isCommentEditInputActive={isCommentEditInputActive}
                                  onChange={handleChangeEditComment} onBlur={handleEditComment}
                                  value={commentEdit}/>

                <EditButton onClick={handleEditButton}>Edit</EditButton>

                <DeleteCommentButton onClick={handleDeleteButton}/>

            </Flex>

        </Root>
    )
}

export default Comments

const Root = styled.div`
`;
const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
const CommentEditInput = styled.input<{ isCommentEditInputActive: boolean }>`
  width: 200px;
  font-size: 18px;
  word-wrap: break-word;
  border-radius: 10px;
  border: solid 1px black;
  box-sizing: border-box;
  margin: 5px 0 0 0;
  padding: 0;
  display: ${props => props.isCommentEditInputActive ? "block" : "none"};
`;
const DeleteCommentButton = styled.button`
  padding: 0;
  margin: 0;
  background: center/100% url(${trashIcon});
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
`;
const Comment = styled.p<{ isCommentActive: boolean }>`
  width: 150px;
  font-size: 18px;
  word-wrap: break-word;
  margin: 5px 0 0 0;
  border-radius: 10px;
  border: solid 1px gray;
  box-sizing: border-box;
  background: darkgray;
  display: ${props => props.isCommentActive ? "block" : "none"};
`;
const EditButton = styled.button`
  padding: 0;
  margin: 0;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 30px;
`;