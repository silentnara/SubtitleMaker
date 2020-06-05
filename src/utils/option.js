import {
  SONG_THREE_LINE,
  SONG_TWO_LINE,
  MESSAGE,
  INFO,
  MESSAGE_TITLE,
  CHORE_JP,
  CREED_TITLE_JP,
  OFFERING_JP,
  PRAY_JP,
  COLOR,
  FONT_FACE_JP,
  FONT_FACE_KR,
  READ_BIBLE_JP,
  MESSANGER_JP,
  BLANK,
  NEW_COMMER,
  REPENT,
  BLESS,
} from '../constants/constants';

export const optsSong = (isFirstLine, isJapanese, isReading = false) => ({
  x: 0.2,
  y: isReading ? '70%' : isFirstLine ? '80%' : '90%',
  w: '95%',
  fontSize: 44,
  fontFace: isJapanese ? FONT_FACE_JP : FONT_FACE_KR,
  fill: '000000',
  color: 'ffffff',
  align: 'center',
  lang: isJapanese ? 'ja-JP' : 'ko-KR',
});

export const optsRepentAndBless = (isFirstLine, isJapanese) => ({
  x: 0.2,
  y: isFirstLine ? '76%' : '89%',
  w: '95%',
  fontSize: 40,
  fontFace: isJapanese ? FONT_FACE_JP : FONT_FACE_KR,
  color: isJapanese ? COLOR.ORANGE : COLOR.BLACK,
  align: 'center',
  lang: isJapanese ? 'ja-JP' : 'ko-KR',
})

export const optsContent = (y, isFirstJP = false, isJapanese = false) => ({
  x: 0.4,
  y,
  w: '97%',
  fontFace: isJapanese ? FONT_FACE_JP : FONT_FACE_KR,
  fontSize: isFirstJP ? 21 : 24,
  color: COLOR.WHITE,
  lineSpacing: 30,
  valign: 'top',
});

export const optsInfo = (y, isJapanese = false) => ({
  x: 0.4,
  y,
  w: '97%',
  fontFace: isJapanese ? FONT_FACE_JP : FONT_FACE_KR,
  fontSize: isJapanese ? 28 : 36,
  color: isJapanese ? COLOR.BLACK : COLOR.RED,
  lineSpacing: 40,
  align: 'center',
  valign: isJapanese ? 'middle' : 'top',
});

export const subtitleOptions = [
  { key: 'songTwoLine', value: SONG_TWO_LINE },
  { key: 'creed', value: CREED_TITLE_JP },
  { key: 'pray', value: PRAY_JP },
  { key: 'readBible', value: READ_BIBLE_JP },
  { key: 'chore', value: CHORE_JP },
  { key: 'messanger', value: MESSANGER_JP },
  { key: 'messageTitle', value: MESSAGE_TITLE },
  { key: 'message', value: MESSAGE },
  { key: 'songThreeLine', value: SONG_THREE_LINE },
  { key: 'repent', value: REPENT },
  { key: 'bless', value: BLESS },
  { key: 'offering', value: OFFERING_JP },
  { key: 'info', value: INFO },
  { key: 'newcommer', value: NEW_COMMER },
  { key: 'blank', value: BLANK },
];

export const mentionProps = isTwoCell => ({
  x: 1.7,
  y: 4.2,
  w: 9,
  h: 1.2,
  color: '215968',
  fontSize: 27,
  align: 'center',
  ...(isTwoCell && {
    colW: [3, 5],
  }),
});
