export type AddTask = {
  text: string,
  columnId: string,
}
export type RemoveTask = {
  cardId: string
}
export type EditTask = {
  text: string,
  cardId: string
}
export type EditDescription = {
  description: string,
  cardId: string
}
