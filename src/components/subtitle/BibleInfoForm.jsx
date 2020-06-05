import React from 'react';
import { Form, Col } from 'react-bootstrap';
import {
  ACTION_SUBTITLE_WRITE_MENTION_KR,
  ACTION_SUBTITLE_WRITE_MENTION_JP,
  ACTION_SUBTITLE_WRITE_TITLE_KR,
  ACTION_SUBTITLE_WRITE_TITLE_JP,
} from '../../reducer/actions';
import { MESSAGE } from '../../constants/constants';

export const BibleInfoForm = ({ formIndex, d, data }, { textJPRef, textKRRef, titleKRRef, titleJPRef }) => {
  const { textKR, textJP, titleKR, titleJP, option } = data;
  const writeTitleKR = id =>
    d({
      type: ACTION_SUBTITLE_WRITE_TITLE_KR,
      payload: { id, titleKR: titleKRRef.current.value },
    });
  const writeTitleJP = id =>
    d({
      type: ACTION_SUBTITLE_WRITE_TITLE_JP,
      payload: { id, titleJP: titleJPRef.current.value },
    });
  const writeContentKR = id =>
    d({
      type: ACTION_SUBTITLE_WRITE_MENTION_KR,
      payload: { id, textKR: textKRRef.current.value },
    });
  const writeContentJP = id =>
    d({
      type: ACTION_SUBTITLE_WRITE_MENTION_JP,
      payload: { id, textJP: textJPRef.current.value },
    });

  return (
    <>
      <Form.Group className="p-4">
        <Form.Row className="mb-3">
          <Col sm="6">韓国語</Col>
          <Col sm="6">日本語</Col>
        </Form.Row>

        <Form.Row>
          <Col sm="6">
            {option === MESSAGE && (
              <Form.Control
                type="input"
                placeholder="성경구절"
                name={`bibleKR-${formIndex}`}
                key={`bibleKR-${formIndex}`}
                id={`bibleKR-${formIndex}`}
                className="mb-2"
                value={titleKR}
                ref={titleKRRef}
                onChange={() => writeTitleKR(formIndex)}
              />
            )}
            <Form.Control
              as="textarea"
              style={{ marginBottom: '2em', height: '200px' }}
              name={`bibleInfo-${formIndex}`}
              key={`bibleInfo-${formIndex}`}
              id={`bibleInfo-${formIndex}`}
              value={textKR}
              ref={textKRRef}
              onChange={() => writeContentKR(formIndex)}
            />
          </Col>
          <Col sm="6">
            {option === MESSAGE && (
              <Form.Control
                type="input"
                placeholder="聖書"
                name={`bibleJP-${formIndex}`}
                key={`bibleJP-${formIndex}`}
                id={`bibleJP-${formIndex}`}
                className="mb-2"
                value={titleJP}
                ref={titleJPRef}
                onChange={() => writeTitleJP(formIndex)}
              />
            )}
            <Form.Control
              as="textarea"
              style={{ marginBottom: '2em', height: '200px' }}
              name={`bibleInfo-${formIndex}`}
              key={`bibleInfo-${formIndex}`}
              id={`bibleInfo-${formIndex}`}
              value={textJP}
              ref={textJPRef}
              onChange={() => writeContentJP(formIndex)}
            />
          </Col>
        </Form.Row>
      </Form.Group>
    </>
  );
};
