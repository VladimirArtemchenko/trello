import React, {useMemo, useState} from "react";
import styled from "styled-components";
import trashIcon from "../../images/trash.svg";
import {CardType, CommentType} from "../../interfaces";

export interface TaskProps {
    handleShowTaskModal: ({target}: React.MouseEvent<HTMLDivElement>) => void
    handleChangeCardText: (cardId: string, text: string) => void
    handleDeleteCard: (cardId: string) => void
    card: CardType
    comments: CommentType[]

};

const Task: React.FC<TaskProps> = ({
                                       handleShowTaskModal,
                                       handleDeleteCard,
                                       handleChangeCardText,
                                       card,
                                       comments,

                                   }) => {

    const [value, setValue] = useState(card.text);
    const [isTaskActive, setTaskActive] = useState(true)

    const filteredComments = useMemo(
        () => comments.filter((coment) =>
            coment.cardId === card.id),
        [card, comments]
    )

    const handleEditMode = (event:React.MouseEvent<HTMLButtonElement>) => {
        setValue(card.text)
        setTaskActive(false)
    }

    const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleSaveTask = (event:React.MouseEvent<HTMLButtonElement>) => {
        handleChangeCardText(card.id, value)
        setTaskActive(true)
    }


    const handleCanceleTaskEditing = (event:React.MouseEvent<HTMLButtonElement>) => {
        setTaskActive(true)
    }

    const handleDeleteTask = (event:React.MouseEvent<HTMLButtonElement>) => {
        handleDeleteCard(card.id)
    }

    return (

        <Root>

            <Flex>

                {isTaskActive
                    ? <Text id={card.id} onClick={handleShowTaskModal}>{card.text}</Text>

                    : <EditTask onChange={handleChangeTask}
                                value={value} name={card.text} autoFocus={true}/>
                }

                <FlexColumn>

                    {isTaskActive
                        ? <Container>

                            <EditButton onClick={handleEditMode}>Edit</EditButton>

                            <DeleteTaskButton onClick={handleDeleteTask}/>

                        </Container>

                        : <Container>

                            <SaveButton onClick={handleSaveTask}>Save</SaveButton>

                            <CancelButton onClick={handleCanceleTaskEditing}>Cancel</CancelButton>

                        </Container>
                    }


                </FlexColumn>

            </Flex>

            <Comments>Comments:{filteredComments.length}</Comments>

        </Root>
    )
}

export default Task

const Root = styled.div`
  width: 300px;
  box-sizing: border-box;
  border: solid 1px gray;
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
`;
const DeleteTaskButton = styled.button`
  padding: 0;
  margin: 5px;
  background: center/100% url(${trashIcon}) no-repeat;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 50px;
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
`;