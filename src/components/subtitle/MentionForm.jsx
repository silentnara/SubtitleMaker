import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { ACTION_SUBTITLE_WRITE_MENTION_KR, ACTION_SUBTITLE_WRITE_MENTION_JP } from '../../reducer/actions';

export const MentionForm = ({ formIndex, d, data }, {textJPRef, textKRRef}) => {
  const { textKR, textJP } = data;
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
          <Form.Label column sm="1">
            韓国語
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="input"
              placeholder="한국 1지구"
              name={`mentionKR-${formIndex}`}
              key={`mentionKR-${formIndex}`}
              id={`mentionKR-${formIndex}`}
              value={textKR}
              ref={textKRRef}
              onChange={() => writeContentKR(formIndex)}
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Form.Label column sm="1">
            日本語
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="input"
              placeholder="韓国１地区"
              name={`mentionJP-${formIndex}`}
              key={`mentionJP-${formIndex}`}
              id={`mentionJP-${formIndex}`}
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
