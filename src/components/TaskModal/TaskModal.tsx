import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {ColumnInterface, TaskPopupProps} from "../../interfaces";
import trashIcon from "../../images/trash.svg";
import {Comments} from "../index";

const TaskPopup: React.FC<TaskPopupProps> = ({
                                                 userName,
                                                 onSetModalActive,
                                                 columns,
                                                 onSetColumns,
                                                 showedToDoElement,
                                                 isActive,
                                                 showedId,
                                                 showedColumnTitle
                                             }) => {

    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [isDescriptionEditActive, setDescriptionEditActive] = useState<boolean>(false);
    const [isDescriptionActive, setDescriptionActive] = useState<boolean>(true);
    const [isTitleActive, setTitleActive] = useState<boolean>(true);
    const [isInputTitleActive, setInputTitleActive] = useState<boolean>(false);


    const handleEditTitle = () => {
        columns.map(column => {
            column.toDoList.map((el) => {
                if (el.id === showedId) {
                    setTitle(el.title)
                }
            })
        })
        setInputTitleActive(!isInputTitleActive)
        setTitleActive(!isTitleActive)
    }

    const handleChangeTitle = useCallback((({target}: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value)
    }), [])

    const handleTitle = () => {
        const newColumns = columns.map(column => {
                column.toDoList.map(element => {
                    if (element.id === showedId) {
                        element.title = title
                    }
                })
                return column
            }
        )
        onSetColumns([...newColumns])
        setInputTitleActive(!isInputTitleActive)
        setTitleActive(!isTitleActive)
    }

    const handleEditDescription = () => {
        columns.map(column => {
            column.toDoList.map((el) => {
                if (el.id === showedId) {
                    setDescription(el.description)
                }
            })
        })
        setDescriptionEditActive(!isDescriptionEditActive)
        setDescriptionActive(!isDescriptionActive)
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

    const handleChangeDescription = useCallback((({target}: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(target.value)
    }), [])

    const handleChangeComment = useCallback((({target}: React.ChangeEvent<HTMLInputElement>) => {
        setComment(target.value)
    }), [])

    const handleDeleteButton = () => {
        const newColumns = columns.map(column => {
            column.toDoList.map(toDo => {
                if (toDo.id === showedId) {
                    toDo.description = "Введите описание"
                }
            })
            return column
        })
        onSetColumns([...newColumns])
    }

    const handleDescription = () => {
        const newColumns = columns.map(column => {
            column.toDoList.map((toDo) => {
                if (toDo.id === showedId) {
                    if (description === '') {
                        toDo.description = 'Введите описание'
                    } else {
                        toDo.description = description
                    }
                }
            })
            return column
        })
        onSetColumns([...newColumns])
        handleEditDescription()
    }

    const handleComment = () => {
        const newColumns = columns.map(column => {
            column.toDoList.map((toDo) => {
                if (toDo.id === showedId) {
                    toDo.comments.unshift({id: uuidv4(), userName: userName, text: comment})
                }
            })
            return column
        })
        onSetColumns([...newColumns])
        setComment("")
    }

    return (
        <Root isActive={isActive} onClick={handleCloseModal}>

            <Container onClick={(e) => e.stopPropagation()}>

                <Title isTitleActive={isTitleActive} onClick={handleEditTitle}>{showedToDoElement.title} в
                    колонке {showedColumnTitle}</Title>

                <InputTitle isInputTitleActive={isInputTitleActive} value={title} onChange={handleChangeTitle}
                            onBlur={handleTitle}/>

                <Text>Описание</Text>

                <Flex>
                    <Description isDescriptionActive={isDescriptionActive}
                                 onClick={handleEditDescription}>{showedToDoElement.description}</Description>

                    <InputDescription isDescriptionEditActive={isDescriptionEditActive} placeholder={'Введите описание'}
                                      value={description} onChange={handleChangeDescription}/>
                    <FlexColumn>

                        <DescriptionButton type="submit" onClick={handleDescription}>Add</DescriptionButton>

                        <DeleteDescriptionButton onClick={handleDeleteButton}/>

                    </FlexColumn>

                </Flex>

                <Flex>

                    <CommentInput type={"text"} placeholder={"Введите свой коментарий"} onChange={handleChangeComment}
                                  value={comment}/>

                    <CommentButton type="submit" onClick={handleComment}>Comment</CommentButton>

                </Flex>

                {showedToDoElement.comments.map((comment) => {
                    return (

                        <Comments columns={columns} onSetColumns={onSetColumns} showedId={showedId}
                                  userName={comment.userName} text={comment.text} commentId={comment.id}/>

                    )
                })}

                <ConfirmButton type="button" onClick={handleCloseModal}>Confirm</ConfirmButton>

            </Container>

        </Root>
    )
}

export default TaskPopup

const Root = styled.div<{ isActive: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  visibility: ${props => props.isActive ? "visible" : "hidden"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  min-height: 50%;
  background: white;
  border-radius: 20px;
`;
const ConfirmButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: white;
  height: 30px;
  margin-top: 20px;
`;

const Title = styled.h1<{ isTitleActive: boolean }>`
  text-align: center;
  font-size: 30px;
  margin: 50px;
  display: ${props => props.isTitleActive ? "block" : "none"};
`;
const InputTitle = styled.input<{ isInputTitleActive: boolean }>`
  text-align: center;
  font-size: 30px;
  margin: 50px;
  display: ${props => props.isInputTitleActive ? "block" : "none"};
`;
const Text = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-top: 10px;
`;
const Description = styled.p<{ isDescriptionActive: boolean }>`
  resize: none;
  font-size: 18px;
  margin: 10px;
  width: 60%;
  min-height: 50px;
  word-wrap: break-word;
  display: ${props => props.isDescriptionActive ? "block" : "none"};
`;
const InputDescription = styled.textarea<{ isDescriptionEditActive: boolean }>`
  resize: none;
  font-size: 18px;
  margin: 10px;
  width: 60%;
  min-height: 200px;
  word-wrap: break-word;
  display: ${props => props.isDescriptionEditActive ? "block" : "none"};
`;
const CommentInput = styled.input`
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
  width: 90%;
`;
const CommentButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 30px;
`;
const Flex = styled.div`
  width: 70%;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const DescriptionButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 30px;
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
`;