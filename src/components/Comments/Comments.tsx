import React, {useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";

export interface CommentsProps {
    userName: string
    commentText: string
    commentId: string
    handleDeleteComment: (commentId: string) => void
    handleEditComment:(commentId: string,commentText:string) => void

};

const Comments: React.FC<CommentsProps> = ({
                                               userName,
                                               commentText,
                                               commentId,
                                               handleDeleteComment,
                                               handleEditComment
                                           }) => {

    const [isCommentEditMode, setCommentEditMode] = useState(false);
    const [commentValue, setCommentValue] = useState(commentText);

    const handleDeleteButton = () => {
        handleDeleteComment(commentId)
    }

    const handleEditButton =()=>{
        setCommentEditMode(!isCommentEditMode)
    }

    const handleSaveButton = () => {
        handleEditComment(commentId,commentValue)
        setCommentEditMode(!isCommentEditMode)
    }

    const handleChangeEditComment = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setCommentValue(target.value)
    }

    const cancelCommentEdit = () => {
        setCommentValue(commentText)
        setCommentEditMode(!isCommentEditMode)
    }

    return (
        <Root>

            <Flex>

                {isCommentEditMode

                    ? <CommentEditInput onChange={handleChangeEditComment} value={commentValue}  autoFocus={true}/>

                    : <Comment onClick={handleEditButton}>{userName} : {commentText}</Comment>
                }

                {isCommentEditMode

                    ? <Container>

                        <SaveButton onClick={handleSaveButton}>Save</SaveButton>

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