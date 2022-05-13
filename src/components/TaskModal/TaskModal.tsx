import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {CardType, ColumnInterface, CommentType} from "../../interfaces";
import trashIcon from "../../images/trash.svg";
import {Comments} from "../index";
import {useForm} from "react-hook-form";

export interface TaskPopupProps {
    userName: string
    onSetCurrentCardId: (value: string) => void
    currentCardId: string
    handleChangeCardText: (cardId: string, text: string) => void
    handleChangeDescription: (cardId: string, description: string) => void
    handleAddComment: (cardId: string, commentText: string) => void
    handleDeleteComment: (commentId: string) => void
    handleEditComment: (commentId: string, commentText: string) => void
    currentCardText: string
    currentCardDescription: string
    currentColumnTitle: string
    currentComments: CommentType[]
}

const TaskPopup: React.FC<TaskPopupProps> = ({
                                                 userName,
                                                 onSetCurrentCardId,
                                                 currentCardId,
                                                 handleChangeCardText,
                                                 currentCardText,
                                                 currentCardDescription,
                                                 currentColumnTitle,
                                                 handleChangeDescription,
                                                 handleAddComment,
                                                 handleDeleteComment,
                                                 handleEditComment,
                                                 currentComments,
                                             }) => {

    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {
            taskTitle: currentCardText,
            description: currentCardDescription,
            comment: ''
        }
    });
    const [isDescriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);
    const [isTitleEditMode, setTitleEditMode] = useState<boolean>(false);
    const [isCommentEditMode, setCommentEditMode] = useState<boolean>(false);

    const handleCloseModal = () => {
        onSetCurrentCardId('');
    }

    const handleEditTitle = () => {
        setTitleEditMode(!isTitleEditMode)
    }

    const handleChangeTitle = (data: { taskTitle: string; }) => {
        if (data.taskTitle !== '') {
            handleChangeCardText(currentCardId, data.taskTitle)
        } else {
            setValue("taskTitle", currentCardText)
        }
        setTitleEditMode(!isTitleEditMode)
    }

    useEffect(() => {
        const handleEsc = (event: { keyCode: number; }) => {

            if (event.keyCode === 27) {
                handleCloseModal()
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleEditDescription = () => {
        setDescriptionEditMode(!isDescriptionEditMode)
    }

    const handleEditButton = (data: { description: string; }) => {
        handleChangeDescription(currentCardId, data.description)
        setDescriptionEditMode(!isDescriptionEditMode)
    }

    const cancelDescriptionEdit = () => {
        setDescriptionEditMode(!isDescriptionEditMode)
    }

    const handleDeleteButton = () => {
        handleChangeDescription(currentCardId, '')
        setValue("description", '')
    }

    const handleCommentButton = (data: { comment: string; }) => {
        if (data.comment !== '') {
            handleAddComment(currentCardId, data.comment)
            setValue('comment', '');
        }
        setCommentEditMode(false)
    }

    const handleCommentEdit = () => {
        setCommentEditMode(true)
    }

    const handleCancelCommentEdit = () => {
        setValue('comment', '')
        setCommentEditMode(false)
    }


    return (
        <Root onClick={handleCloseModal}>

            <Container onClick={event => event.stopPropagation()}>

                {isTitleEditMode

                    ? <InputTitle type='text' {...register("taskTitle")} onBlur={handleSubmit(handleChangeTitle)} autoFocus={true}/>

                    : <Title onClick={handleEditTitle}>{currentCardText}</Title>
                }

                <Text> в колонке: {currentColumnTitle}</Text>

                <Text>Описание</Text>

                <Flex>

                    {isDescriptionEditMode

                        ? <InputDescription {...register("description")} placeholder={"Ведите подробное описание"}
                                            autoFocus={true}/>

                        : <Description
                            onClick={handleEditDescription}>{currentCardDescription || "Введите подробное описание"}</Description>
                    }

                    {isDescriptionEditMode

                        ? <FlexColumn>

                            <Button type="submit" onClick={handleSubmit(handleEditButton)}>Add</Button>
                            <Button type="button" onClick={cancelDescriptionEdit}>Cancel</Button>

                        </FlexColumn>

                        : <DeleteButton onClick={handleDeleteButton}/>
                    }


                </Flex>


                {isCommentEditMode

                    ? <CommentContainer>

                        <CommentInput {...register("comment")} placeholder={"Введите свой коментарий"}
                                      onFocus={handleCommentEdit}/>

                        <Flex>

                            <Button type="submit" onClick={handleSubmit(handleCommentButton)}>Comment</Button>
                            <Button type="button" onClick={handleCancelCommentEdit}>Cancel</Button>

                        </Flex>

                    </CommentContainer>

                    : <CommentContainer>

                        <CommentInput {...register("comment")} placeholder={"Введите свой коментарий"}
                                      onFocus={handleCommentEdit}/>

                    </CommentContainer>

                }

                <CommentsContainer>

                    <div>
                        {currentComments.map((comment) => {
                                return (
                                    <Comments
                                        userName={userName}
                                        commentText={comment.commentText}
                                        commentId={comment.id}
                                        handleDeleteComment={handleDeleteComment}
                                        handleEditComment={handleEditComment}
                                        key={comment.id}

                                    />
                                )
                            }
                        )}
                    </div>

                </CommentsContainer>

            </Container>

        </Root>
    )
}

export default TaskPopup

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
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 60%;
  min-height: 300px;
  max-height: 700px;
  background: rgba(211, 211, 211, 1);
  border-radius: 20px;
`;

const Title = styled.h1`
  background: lightgrey;
  border-radius: 5px;
  width: 80%;
  max-height: 100px;
  text-align: center;
  font-size: 30px;
  word-wrap: break-word;
  overflow-y: auto;
  cursor: pointer;

`;
const InputTitle = styled.input`
  text-align: center;
  font-size: 30px;
  height: 30px;
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
  padding: 0;
  margin: 0;
  font-size: 18px;
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
const Flex = styled.form`
  width: 80%;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  justify-content: center;
  align-items: center;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 70px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
const DeleteButton = styled.button`
  padding: 0;
  margin: 0;
  background: center/100% url(${trashIcon}) no-repeat;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
`;
const CommentsContainer = styled.div`
  margin-bottom: 20px;
  overflow-y: auto;
  width: 90%;
  max-height: 300px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 0;
  border: none;
  color: #010140;
  width: 100px;
  height: 20px;
  cursor: pointer;
  background: none;

  &:hover {
    opacity: 0.4;
`;