export interface CardType {
  id: string;
  text: string;
  description: string;
  columnId: string;
}

export interface ColumnInterface {
  id: string;
  columnName: string;
}

export interface CommentType {
  id: string;
  cardId: string;
  commentText: string;
}
