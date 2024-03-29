import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { CommentType } from '../../interfaces';
import { AddComment, EditComment, RemoveComment } from './action-types';

const comments: CommentType[] = [];

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { comments },
  reducers: {
    addComment(state, action: PayloadAction<AddComment>) {
      state.comments.push({
        id: uuidv4(),
        commentText:
        action.payload.commentText,
        cardId: action.payload.cardId,
      });
    },
    removeComment(state, action: PayloadAction<RemoveComment>) {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload.commentId);
    },
    editComment(state, action: PayloadAction<EditComment>) {
      state.comments = state.comments.map((comment) => (comment.id === action.payload.commentId
        ? {
          ...comment,
          commentText: action.payload.commentText,
        } : comment));
    },

  },

});

export const {
  addComment,
  removeComment,
  editComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
