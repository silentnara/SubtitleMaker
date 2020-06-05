import React from 'react';
import { Form } from 'react-bootstrap';
import { ACTION_SUBTITLE_WRITE_SONG } from '../../reducer/actions';

export const SongForm = ({formIndex, d, data}, textRef) => {
  const writeContent = id => d({ type: ACTION_SUBTITLE_WRITE_SONG, payload: { id, text: textRef.current.value } });
  const { text: storeText } = data;

  return (
    <Form.Row>
      <Form.Control
        as="textarea"
        style={{ marginBottom: '2em', height: '200px' }}
        name={formIndex}
        key={formIndex}
        id={formIndex}
        value={storeText}
        ref={textRef}
        onChange={() => writeContent(formIndex)}
      />
    </Form.Row>
  );
};
