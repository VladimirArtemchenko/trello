import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {CardType, ColumnInterface, CommentType} from "../../interfaces";
import trashIcon from "../../images/trash.svg";
import {Comments} from "../index";

const WINDOW_HEIGHT = `${window.innerHeight}px`;

export interface TaskPopupProps {
    userName: string
    onSetCurrentCardId: (value: string) => void
    currentCardId: string
    handleChangeCardText: (cardId: string, text: string) => void
    handleChangeDescription: (cardId: string, description: string) => void
    handleAddComment: (cardId: string, commentText: string) => void
    handleDeleteComment: (commentId: string) => void
    handleEditComment:(commentId: string,commentText:string) => void
    currentCardText: string
    currentCardDescription:string
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

    const [title, setTitle] = useState(currentCardText);
    const [description, setDescription] = useState(currentCardDescription);
    const [value, setValue] = useState(currentCardDescription);
    const [comment, setComment] = useState('');
    const [inputCommentValue, setInputCommentValue] = useState<string>('');
    const [isDescriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);
    const [isTitleEditMode, setTitleEditMode] = useState<boolean>(false);

    const handleCloseModal = () => {
        onSetCurrentCardId('');
    }

    const handleEditTitle = () => {
        setTitleEditMode(!isTitleEditMode)
    }

    const handleChangeTitle = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value)
    }

    const handleTitle = () => {
        if (title !=='' ) {
            handleChangeCardText(currentCardId, title)
        }else{
            handleChangeCardText(currentCardId, currentCardText)
            setTitle(currentCardText)
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
        setDescription(value)
        setDescriptionEditMode(!isDescriptionEditMode)
    }

    const handleChangeInputDescription = ({target}: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(target.value)
    }

    const handleEditButton = () => {
        handleChangeDescription(currentCardId, description)
        setValue(description)
        setDescriptionEditMode(!isDescriptionEditMode)
    }

    const cancelDescriptionEdit = () => {
        setDescription(value)
        setDescriptionEditMode(!isDescriptionEditMode)
    }

    const handleDeleteButton = () => {
        handleChangeDescription(currentCardId, '')
        setValue('')
    }

    const handleChangeComment = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setComment(target.value)
        setInputCommentValue(target.value)
    }

    const handleCommentButton = () => {
        handleAddComment(currentCardId,comment)
            setComment('');
    }

    const cancelCommentEdit = () => {
        setInputCommentValue('')
    }


    return (
        <Root $height={WINDOW_HEIGHT} onClick={handleCloseModal}>

            <Container onClick={event => event.stopPropagation()}>

                {isTitleEditMode

                    ? <InputTitle value={title} onChange={handleChangeTitle}
                                  onBlur={handleTitle} autoFocus={true}/>

                    : <Title onClick={handleEditTitle}>{title}</Title>
                }

                <Text> в колонке </Text>

                <Text>{currentColumnTitle}</Text>

                <Text>Описание</Text>

                <Flex>

                    {isDescriptionEditMode

                        ? <InputDescription placeholder={"Ведите подробное описание"}
                                            value={description}
                                            onChange={handleChangeInputDescription} autoFocus={true}/>

                        : <Description
                            onClick={handleEditDescription}>{value || "Ведите подробное описание"}</Description>
                    }

                    <FlexColumn>

                        <EditButton type="submit" onClick={handleEditButton}>Add</EditButton>

                        {isDescriptionEditMode

                            ? <CancelButton type="button" onClick={cancelDescriptionEdit}>Cancel</CancelButton>

                            : <DeleteDescriptionButton onClick={handleDeleteButton}/>
                        }

                    </FlexColumn>


                </Flex>

                <Flex>

                    <CommentInput type={"text"} placeholder={"Введите свой коментарий"} onChange={handleChangeComment}
                                  value={inputCommentValue} onBlur={cancelCommentEdit}/>

                    <CommentButton type="submit" onClick={handleCommentButton}>Comment</CommentButton>

                </Flex>

                <CommentsContainer $commentsCount={currentComments.length}>

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

const Root = styled.div<{ $height: string }>`
  position: fixed;
  width: 100%;
  min-height: ${props => props.$height};
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
  height: 700px;
  background: white;
  border-radius: 20px;
  margin: 50px;
`;

const Title = styled.h1`
  background: aliceblue;
  border-radius: 5px;
  width: 80%;
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
  word-wrap: break-word;
  cursor: pointer;

`;
const InputTitle = styled.input`
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
`;
const Text = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-top: 10px;
`;
const Description = styled.p`
  resize: none;
  font-size: 18px;
  margin: 10px;
  width: 90%;
  min-height: 50px;
  word-wrap: break-word;
  cursor: pointer;

`;
const InputDescription = styled.textarea`
  resize: none;
  font-size: 18px;
  margin: 10px;
  width: 90%;
  min-height: 50px;
  word-wrap: break-word;
`;
const CommentInput = styled.input`
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
  width: 100%;
`;
const CommentButton = styled.button`
  padding: 0;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  cursor: pointer;
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
const CommentsContainer = styled.div<{ $commentsCount: number }>`
  margin-top: 20px;
  margin-bottom:20px ;
  overflow-y: ${props => (props.$commentsCount*50) > 300 ? "scroll" : "auto"};
  width: 100%;
  height: 300px;
`;