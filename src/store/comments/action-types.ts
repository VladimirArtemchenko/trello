export type AddComment = {
  commentText: string,
  cardId: string,
}
export type RemoveComment = {
  commentId: string
}
export type EditComment = {
  commentText: string,
  commentId: string
}
