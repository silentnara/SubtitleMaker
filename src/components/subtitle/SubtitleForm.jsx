import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form, FormControl, Button, Col } from 'react-bootstrap';
import { subtitleOptions } from '../../utils/option';
import { useSelector } from 'react-redux';
import {
  ACTION_SUBTITLE_ORDER_UP,
  ACTION_SUBTITLE_REMOVE,
  ACTION_SUBTITLE_ORDER_DOWN,
  ACTION_SUBTITLE_CHANGE_OPTION,
} from '../../reducer/actions';
import { MentionForm } from './MentionForm';
import { SongForm } from './SongForm';
import { BibleInfoForm } from './BibleInfoForm';
import { WIDE_OPTION, BAND_OPTION, NONE_OPTION } from '../../constants/constants';

const createForm = (option, formProps, { textRef, textJPRef, textKRRef, titleKRRef, titleJPRef }) => {
  if (WIDE_OPTION.includes(option)) return BibleInfoForm(formProps, { textJPRef, textKRRef, titleKRRef, titleJPRef });
  if (BAND_OPTION.includes(option)) return MentionForm(formProps, { textJPRef, textKRRef, titleKRRef, titleJPRef });
  if (NONE_OPTION.includes(option)) return SongForm(formProps, textRef);
};

export const SubtitleForm = ({ formIndex, d }) => {
  const subtitles = useSelector(state => state.reducer);
  const typeRef = useRef(subtitleOptions[0].value);
  const textRef = useRef('');
  const textKRRef = useRef('');
  const textJPRef = useRef('');
  const titleKRRef = useRef('');
  const titleJPRef = useRef('');
  const data = subtitles[formIndex];
  const { option: storeOption } = data;

  const orderUp = id => {
    if (id === 0) return;
    d({ type: ACTION_SUBTITLE_ORDER_UP, payload: { id } });
  };
  const orderDown = id => {
    if (id === subtitles.length - 1) return;
    d({ type: ACTION_SUBTITLE_ORDER_DOWN, payload: { id } });
  };
  const remove = id => d({ type: ACTION_SUBTITLE_REMOVE, payload: { id } });
  const changeOption = (id, option) => d({ type: ACTION_SUBTITLE_CHANGE_OPTION, payload: { id, option } });

  const handleTypeChange = id => {
    changeOption(id, typeRef.current.value);
  };
  return (
    <div name={`form-${formIndex}`} style={{ borderBottom: 'inset' }}>
      <Form.Row className="mb-2 mt-4">
        <Col className="p-0">
          <FormControl
            as="select"
            value={storeOption}
            name={`dd-${formIndex}`}
            className="mb-4"
            ref={typeRef}
            onChange={() => handleTypeChange(formIndex)}
          >
            {subtitleOptions.map(opt => (
              <option key={opt.key}>{opt.value}</option>
            ))}
          </FormControl>
        </Col>
        <Col className="text-right p-0">
          <Button variant="light" onClick={() => orderUp(formIndex)}>
            <FontAwesomeIcon icon={faChevronUp} />
          </Button>
          <Button variant="light" onClick={() => orderDown(formIndex)}>
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
          <Button variant="light" onClick={() => remove(formIndex)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Col>
      </Form.Row>
      {createForm(storeOption, { formIndex, d, data }, { textRef, textJPRef, textKRRef, titleKRRef, titleJPRef })}
    </div>
  );
};
