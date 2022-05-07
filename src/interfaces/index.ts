import React from "react";


export interface ToDoList {
    id: string
    title: string
    description: string
    comments: Comment[]
}

export interface ColumnInterface {
    id: string
    title: string
    toDoList: ToDoList[]
}

export interface ColumnProps {
    columnTitle: string
    columnId: string
    columns: ColumnInterface[]
    onSetColumns: (value: ColumnInterface[]) => void
    onShowTaskModal: ({target}: React.MouseEvent<HTMLDivElement>) => void
};

export interface Comment {
    id: string
    userName: string
    text: string
}

export interface TaskPopupProps {
    userName: string
    onSetModalActive: (value: boolean) => void
    columns: ColumnInterface[]
    onSetColumns: (value: ColumnInterface[]) => void
    showedToDoElement: ToDoList
    isActive: boolean
    showedId: string
    showedColumnTitle: string
}

export interface LoginProps {
    userName: string;
    onSetUserName: (value: string) => void;
    onSetModalActive: (value: boolean) => void;
    isActive: boolean
}

export interface ModalProps {
    children: React.ReactNode;
}

export interface TaskProps {
    columns: ColumnInterface[]
    onSetColumns: (value: ColumnInterface[]) => void
    columnId: string
    task: string
    taskId: string
    onShowTaskModal: ({target}: React.MouseEvent<HTMLDivElement>) => void
};

export interface CommentsProps {
    columns: ColumnInterface[]
    onSetColumns: (value: ColumnInterface[]) => void
    showedId: string
    userName: string
    text: string
    commentId: string
};
