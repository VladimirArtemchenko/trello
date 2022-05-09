import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {cardType, CommentType} from "../../interfaces";
import trashIcon from "../../images/trash.svg";
import {Comments} from "../index";

export interface TaskPopupProps {
    userName: string
    onSetModalActive: (value: boolean) => void
    todoDescription: string
    columnTitle: string
    cardId: string
    todoText: string
    todoList: cardType[]
    onSetTodoList: (value: cardType[]) => void
    comments: CommentType[]
    onSetComments: (value: CommentType[]) => void
    onSetCommentCount: (value: number) => void
    commentCount: number
    saveTodoList: (value: cardType[]) => void
}

const TaskPopup: React.FC<TaskPopupProps> = ({
                                                 userName,
                                                 onSetModalActive,
                                                 todoDescription,
                                                 columnTitle,
                                                 cardId,
                                                 todoText,
                                                 todoList,
                                                 onSetTodoList,
                                                 comments,
                                                 onSetComments,
                                                 onSetCommentCount,
                                                 commentCount,
                                                 saveTodoList
                                             }) => {

    const height: string = `${window.innerHeight}px`;
    const maxHeightModalTask: number = commentCount * 50

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>(todoDescription);
    const [comment, setComment] = useState<string>('');
    const [inputCommentValue, setInputCommentValue] = useState<string>('');
    const [isDescriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);
    const [isTitleEditMode, setTitleEditMode] = useState<boolean>(false);


    const saveComments = (object: CommentType[]) => {
        localStorage.setItem("comments", JSON.stringify([...object]))
    }

    const handleEditTitle = () => {

        todoList.map((todo) => {

            if (todo.id === cardId) {
                setTitle(todo.text)
            }
        })
        setTitleEditMode(!isTitleEditMode)
    }

    const handleChangeTitle = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value)
    }

    const handleTitle = () => {

        const newTodoList = todoList.map(todo => {

            if (todo.id === cardId) {
                todo.text = title
            }
            return todo
        })

        onSetTodoList([...newTodoList])
        setTitleEditMode(!isTitleEditMode)
    }

    saveTodoList(todoList)

    const handleEditDescription = () => {
        setDescriptionEditMode(!isDescriptionEditMode)
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

    const handleCloseModal = () => {
        onSetModalActive(false);
    }

    const handleChangeDescription = ({target}: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(target.value)
    }

    const handleChangeComment = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setComment(target.value)
        setInputCommentValue(target.value)
    }

    const handleDeleteButton = () => {

        const newTodoList = todoList.map(todo => {

            if (todo.id === cardId) {
                todo.description = "Введите подробное описание"
            }
            return todo
        })
        setDescription('Введите подробное описание')
        onSetTodoList([...newTodoList])

    }

    saveTodoList(todoList)

    const handleDescription = () => {

        const newTodoList = todoList.map((todo) => {

            if (todo.id === cardId) {

                if (description === '') {
                    todo.description = 'Введите подробное описание'
                } else {
                    todo.description = description
                }

            }

            return todo

        })

        onSetTodoList([...newTodoList])
        handleEditDescription()

    }

    saveTodoList(todoList)

    const handleAddComment = () => {
        let commentsCount = 0

        if (comment) {
            onSetComments([{id: uuidv4(), commentText: comment, cardId: cardId}, ...comments]);
            comments.map((comment) => {
                if (comment.cardId === cardId) {
                    commentsCount = commentsCount + 1
                }
            })

            const newTodoList = todoList.map((todo) => {
                if (todo.id === cardId) {
                    todo.commentsCount = commentsCount + 1
                }
                return todo
            })
            onSetCommentCount(commentsCount)
            onSetTodoList([...newTodoList])
            setComment('');
        }
    }

    saveComments(comments)
    saveTodoList(todoList)

    const cancelCommentEdit = () => {
        setInputCommentValue('')
    }

    const cancelDescriptionEdit = () => {
        setDescription(todoDescription)
        handleEditDescription()
    }

    return (
        <Root height={height} onClick={handleCloseModal}>

            <Container onClick={event => event.stopPropagation()}>

                {isTitleEditMode

                    ? <InputTitle value={title} onChange={handleChangeTitle}
                                  onBlur={handleTitle}/>

                    : <Title onClick={handleEditTitle}>{todoText}</Title>
                }

                <Text>колонке {columnTitle}</Text>

                <Text>Описание</Text>

                <Flex>

                    {isDescriptionEditMode

                        ? <InputDescription placeholder={description} value={description}
                                            onChange={handleChangeDescription}/>

                        : <Description onClick={handleEditDescription}>{todoDescription}</Description>
                    }

                    <FlexColumn>

                        <EditButton type="submit" onClick={handleDescription}>Add</EditButton>

                        {isDescriptionEditMode

                            ? <CancelButton type="button" onClick={cancelDescriptionEdit}>Cancel</CancelButton>

                            : <DeleteDescriptionButton onClick={handleDeleteButton}/>
                        }

                    </FlexColumn>


                </Flex>

                <Flex>

                    <CommentInput type={"text"} placeholder={"Введите свой коментарий"} onChange={handleChangeComment}
                                  value={inputCommentValue} onBlur={cancelCommentEdit}/>

                    <CommentButton type="submit" onClick={handleAddComment}>Comment</CommentButton>

                </Flex>

                <CommentsContainer maxHeightModalTask={maxHeightModalTask}>

                    {comments.map((comment) => {

                        if (comment.cardId === cardId) {

                            return (
                                <Comments cardId={cardId}
                                          userName={userName}
                                          commentText={comment.commentText}
                                          commentId={comment.id}
                                          comments={comments}
                                          onSetComments={onSetComments}
                                          commentCount={commentCount}
                                          onSetCommentCount={onSetCommentCount}
                                          todoList={todoList}
                                          onSetTodoList={onSetTodoList}
                                          saveTodoList={saveTodoList}
                                          saveComments={saveComments}
                                />
                            )
                        }
                    })}

                </CommentsContainer>


                <ConfirmButton type="button" onClick={handleCloseModal}>Confirm</ConfirmButton>

            </Container>

        </Root>
    )
}

export default TaskPopup

const Root = styled.div<{ height: string }>`
  position: fixed;
  width: 100%;
  min-height: ${props => props.height};
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
const ConfirmButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  height: 30px;
  margin-top: 20px;
  cursor: pointer;
`;

const Title = styled.h1`
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
const CommentsContainer = styled.div<{ maxHeightModalTask: number }>`
  overflow-y: ${props => props.maxHeightModalTask > 300 ? "scroll" : "auto"};
  width: 100%;
  height: 300px;
`;