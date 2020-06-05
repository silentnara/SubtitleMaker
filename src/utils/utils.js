import pptxGenJS from 'pptxgenjs';
import moment from 'moment';
import sanitize from 'sanitize-html';
// import { BIBLE_API } from '../constants/constants';
import {
  COLOR,
  SONG_THREE_LINE,
  SONG_TWO_LINE,
  INFO,
  MESSAGE,
  CREED_TITLE_JP,
  CREED,
  CONTENT_POSITION_Y,
  CREED_TITLE_KR,
  CONTENT_LINE_POSITION_Y,
  PRAY_JP,
  CHORE_KR,
  CHORE_JP,
  READ_BIBLE_JP,
  READ_BIBLE_KR,
  MESSANGER_JP,
  MESSANGER_NAME_JP,
  MESSANGER_NAME_KR,
  MESSAGE_TITLE_JP,
  PRAY_KR,
  OFFERING_JP,
  OFFERING_KR,
  FONT_FACE_KR,
  FONT_FACE_JP,
  MESSAGE_TITLE,
  MESSAGE_TITLE_KR,
  BLANK,
  INFO_POSITION_Y,
  NEW_COMMER,
  FORGIVE_KR,
  FORGIVE_JP,
  newCommerKR,
  newCommerJP,
  REPENT,
  BLESS,
  BLESS_JP,
  BLESS_KR,
} from '../constants/constants';
import { optsSong, optsContent, mentionProps, optsInfo, optsRepentAndBless } from './option';
import ImageInfo from '../../assets/info.png';
import ContentInfo from '../../assets/content.jpeg';
import MentionInfo from '../../assets/mention.png';
import Blueband from '../../assets/Picture3.png';

export const sanitizer = bible => {
  sanitize(bible);
};

// export const getBible = async (book, lang, startChapter, startVerse, endChapter, endVerse) => {
//   let url;
//   if (endChapter & endVerse)
//     url = `${BIBLE_API}${lang}-${book}/${startChapter}:${startVerse}-${endChapter}:${endVerse}`;
//   if (endVerse) url = `${BIBLE_API}${lang}-${book}/${startChapter}:${startVerse}-${endVerse}`;
//   url = `${BIBLE_API}${lang}-${book}/${startChapter}:${startVerse}`;
//   return await axios.get(url).data;
// };

const fullsizeImgProps = path => ({
  path,
  w: 10,
  h: 5.7,
});

const mentionImgProps = path => ({
  path,
  y: 4,
  w: 10,
  h: 1.5,
});

const lineProps = y => ({ x: 0.45, y, w: 8.9, h: 0.0, line: COLOR.WHITE, lineSize: 1 });

const addEmptySlide = pptx => {
  let slide;
  slide = pptx.addSlide();
  slide.bkgd = COLOR.BLACK;
};

const createMentionTwoCells = (slide, option, kr, jp) => {
  let optionKR;
  if (option === CHORE_JP) optionKR = CHORE_KR;
  if (option === READ_BIBLE_JP) optionKR = READ_BIBLE_KR;
  if (option === OFFERING_JP) optionKR = OFFERING_KR;
  if (option === PRAY_JP) optionKR = PRAY_KR;

  const row = [];
  row.push([{ text: optionKR, options: { fontFace: FONT_FACE_KR } }, { text: kr }]);
  row.push([{ text: option, options: { fontFace: FONT_FACE_JP } }, { text: jp }]);
  slide.addTable(row, mentionProps(true));
};

const createMentionOneCell = (slide, kr, jp) => {
  const row = [];
  row.push([{ text: kr, options: { fontFace: FONT_FACE_KR } }]);
  row.push([{ text: jp, options: { fontFace: FONT_FACE_JP } }]);
  slide.addTable(row, mentionProps(false));
};

const isJapanese = text =>
  (text >= '\u3040' && text <= '\u309f') || // ひらがな
  (text >= '\u30a0' && text <= '\u30ff') || // カタカナ
  (text >= '\u4e00' && text <= '\u9faf') || // 漢字(common)
  (text >= '\u3400' && text <= '\u4dbf'); // 漢字(rare)

const addSubtitle = (pptx, subtitles) => {
  let result;
  subtitles.map((subtitle, i) => {
    const { text, option: charOption, textJP, textKR, titleKR, titleJP } = subtitle;
    let rowCount = 0;
    let quotient = 0;
    let slide;

    switch (charOption) {
      case SONG_TWO_LINE:
        rowCount = text.split('\n').length;
        quotient = rowCount / 2;
        for (let j = 0; j < quotient; j++) {
          const charSplit1 = text.split('\n')[j * 2];
          const charSplit2 = text.split('\n')[j * 2 + 1] || '';
          slide = pptx.addSlide();
          slide.addText(charSplit1, optsSong(true, isJapanese(charSplit1.substring(0, 1))));
          slide.addText(charSplit2, optsSong(false, isJapanese(charSplit2.substring(0, 1))));
          slide.bkgd = COLOR.BLACK;
        }
        addEmptySlide(pptx);
        break;

      case CREED_TITLE_JP:
        CREED.map((item, index) => {
          slide = pptx.addSlide();
          slide.addImage(fullsizeImgProps(ContentInfo));
          slide.addText(CREED_TITLE_KR, optsContent(CONTENT_POSITION_Y.KR_TITLE));
          slide.addText(item.kr, optsContent(CONTENT_POSITION_Y.KR_CONTENT));
          slide.addText(CREED_TITLE_JP, optsContent(CONTENT_POSITION_Y.JP_TITLE, false, true));
          slide.addText(item.jp, optsContent(CONTENT_POSITION_Y.JP_CONTENT, index === 0 && true, true));
          slide.addShape(pptx.ShapeType.line, lineProps(CONTENT_LINE_POSITION_Y[0]));
          slide.addShape(pptx.ShapeType.line, lineProps(CONTENT_LINE_POSITION_Y[1]));
          slide.addShape(pptx.ShapeType.line, lineProps(CONTENT_LINE_POSITION_Y[2]));
        });
        addEmptySlide(pptx);
        break;

      case PRAY_JP:
        slide = pptx.addSlide();
        slide.addImage(mentionImgProps(MentionInfo));
        createMentionTwoCells(slide, charOption, textKR, textJP);
        slide.bkgd = COLOR.BLACK;
        addEmptySlide(pptx);
        break;

      case READ_BIBLE_JP:
        slide = pptx.addSlide();
        slide.addImage(mentionImgProps(MentionInfo));
        createMentionTwoCells(slide, charOption, textKR, textJP);
        slide.bkgd = COLOR.BLACK;
        addEmptySlide(pptx);
        break;

      case CHORE_JP:
        slide = pptx.addSlide();
        slide.addImage(mentionImgProps(MentionInfo));
        createMentionTwoCells(slide, charOption, textKR, textJP);
        slide.bkgd = COLOR.BLACK;
        addEmptySlide(pptx);
        break;

      case MESSANGER_JP:
        slide = pptx.addSlide();
        slide.addImage(mentionImgProps(MentionInfo));
        createMentionOneCell(slide, MESSANGER_NAME_KR, MESSANGER_NAME_JP);
        slide.bkgd = COLOR.BLACK;
        addEmptySlide(pptx);
        break;

      case MESSAGE_TITLE:
        slide = pptx.addSlide();
        slide.addImage(mentionImgProps(MentionInfo));
        createMentionOneCell(slide, `${MESSAGE_TITLE_KR}${textKR}`, `${MESSAGE_TITLE_JP}${textJP}`);
        slide.bkgd = COLOR.BLACK;
        addEmptySlide(pptx);
        break;

      case MESSAGE:
        slide = pptx.addSlide();
        slide.addImage(fullsizeImgProps(ContentInfo));
        slide.addText(titleKR, optsContent(CONTENT_POSITION_Y.KR_TITLE));
        slide.addText(textKR, optsContent(CONTENT_POSITION_Y.KR_CONTENT));
        slide.addText(titleJP, optsContent(CONTENT_POSITION_Y.JP_TITLE, false, true));
        slide.addText(textJP, optsContent(CONTENT_POSITION_Y.JP_CONTENT, false, true));
        slide.addShape(pptx.ShapeType.line, lineProps(CONTENT_LINE_POSITION_Y[0]));
        slide.addShape(pptx.ShapeType.line, lineProps(CONTENT_LINE_POSITION_Y[1]));
        slide.addShape(pptx.ShapeType.line, lineProps(CONTENT_LINE_POSITION_Y[2]));
        break;

      case SONG_THREE_LINE:
        rowCount = text.split('\n').length;
        quotient = rowCount / 2;
        for (let j = 0; j < quotient; j++) {
          const charSplit1 = text.split('\n')[j * 3];
          const charSplit2 = text.split('\n')[j * 3 + 1] || '';
          const charSplit3 = text.split('\n')[j * 3 + 2] || '';
          slide.addText(charSplit1, optsSong(true, isJapanese(charSplit1.substring(0, 1))), true);
          slide.addText(charSplit2, optsSong(true, isJapanese(charSplit1.substring(0, 1))));
          slide.addText(charSplit3, optsSong(true, isJapanese(charSplit1.substring(0, 1))));
          slide.bkgd = COLOR.BLACK;
        }
        addEmptySlide(pptx);
        break;

      case REPENT:
        FORGIVE_KR.map((item, index) => {
          slide = pptx.addSlide();
          slide.bkgd = COLOR.BLACK;
          slide.addImage(mentionImgProps(Blueband));
          slide.addText(item, optsRepentAndBless(true, false));
          slide.addText(FORGIVE_JP[index], optsRepentAndBless(false, true));
        });
        addEmptySlide(pptx);
        break;

      case BLESS:
        BLESS_KR.map((item, index) => {
          slide = pptx.addSlide();
          slide.bkgd = COLOR.BLACK;
          slide.addImage(mentionImgProps(Blueband));
          slide.addText(item, optsRepentAndBless(true, false));
          slide.addText(BLESS_JP[index], optsRepentAndBless(false, true));
        });
        addEmptySlide(pptx);
        break;

      case OFFERING_JP:
        slide = pptx.addSlide();
        slide.addImage(mentionImgProps(MentionInfo));
        createMentionTwoCells(slide, charOption, textKR, textJP);
        slide.bkgd = COLOR.BLACK;
        addEmptySlide(pptx);
        break;

      case INFO:
        slide = pptx.addSlide();
        slide.addImage(fullsizeImgProps(ImageInfo));
        slide.addText(textKR, optsInfo(INFO_POSITION_Y.KR));
        slide.addText(textJP, optsInfo(INFO_POSITION_Y.JP, true));
        break;

      case NEW_COMMER:
        slide = pptx.addSlide();
        slide.addImage(fullsizeImgProps(ImageInfo));
        slide.addText(newCommerKR, optsInfo(INFO_POSITION_Y.KR));
        slide.addText(newCommerJP, optsInfo(INFO_POSITION_Y.JP, true));
        addEmptySlide(pptx);
        break;

      case BLANK:
        addEmptySlide(pptx);
        break;

      default:
        alert(`${charOption}:${i + 1}番目のテキストエリアに字幕種別が設定されていないです。`);
        result = true;
        break;
    }
  });
  return result;
};

export const generatePPT = subtitles => {
  const title = moment().format('YYYYMMDD');
  const pptx = new pptxGenJS();
  addEmptySlide(pptx);
  const hasError = addSubtitle(pptx, subtitles);
  if (!hasError) pptx.writeFile(title);
};
