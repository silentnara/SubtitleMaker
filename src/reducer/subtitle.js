import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { SUBTITLE_REDUCER, SUBTITLE_REDUCER_TYPE } from './actions';
import { subtitleOptions } from '../utils/option';

const subtitles = createSlice({
  name: SUBTITLE_REDUCER,
  initialState: [
    { id: 0, text: '', textKR: '', textJP: '', option: subtitleOptions[0].value, titleJP: '', titleKR: '' },
  ],
  reducers: {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
    [SUBTITLE_REDUCER_TYPE.ADD]: (state, action) => {
      state.push({ id: action.payload.id, text: '', option: subtitleOptions[0].value });
    },
    [SUBTITLE_REDUCER_TYPE.REMOVE]: (state, action) => state.filter(i => i.id !== action.payload.id),
    [SUBTITLE_REDUCER_TYPE.ORDER_UP]: (state, action) => {
      if (state.length > 1) {
        const id = action.payload.id;
        [state[id - 1], state[id]] = [state[id], state[id - 1]];
      }
    },
    [SUBTITLE_REDUCER_TYPE.ORDER_DOWN]: (state, action) => {
      if (state.length > 1) {
        const id = action.payload.id;
        [state[id + 1], state[id]] = [state[id], state[id + 1]];
      }
    },
    [SUBTITLE_REDUCER_TYPE.WRITE_SONG]: (state, action) => {
      const { id, text } = action.payload;
      state[id].text = text;
    },
    [SUBTITLE_REDUCER_TYPE.WRITE_TITLE_JP]: (state, action) => {
      const { id, titleJP } = action.payload;
      state[id].titleJP = titleJP;
    },
    [SUBTITLE_REDUCER_TYPE.WRITE_TITLE_KR]: (state, action) => {
      const { id, titleKR } = action.payload;
      state[id].titleKR = titleKR;
    },
    [SUBTITLE_REDUCER_TYPE.WRITE_MENTION_JP]: (state, action) => {
      const { id, textJP } = action.payload;
      state[id].textJP = textJP;
    },
    [SUBTITLE_REDUCER_TYPE.WRITE_MENTION_KR]: (state, action) => {
      const { id, textKR } = action.payload;
      state[id].textKR = textKR;
    },
    [SUBTITLE_REDUCER_TYPE.CHANGE_OPTION]: (state, action) => {
      const { id, option } = action.payload;
      state[id].option = option;
    },
  },
});

export default subtitles;
