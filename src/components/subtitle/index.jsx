import useSWR from 'swr';
import { Container, Button, Form, Navbar, Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { messageContent } from '../../constants/constants';
import { SubtitleForm } from './SubtitleForm';
import { useCallback } from 'react';
import { ACTION_SUBTITLE_ADD } from '../../reducer/actions';
import { generatePPT } from '../../utils/utils'

const Subtitle = () => {
  const subtitles = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const addSubtitle = useCallback(
    id => {
      dispatch({ type: ACTION_SUBTITLE_ADD, payload: { id } });
    },
    [dispatch],
  );

  const fetcher = (...args) => fetch(...args).then(res => res.text());
  const { data } = useSWR('http://ibibles.net/quote.php?kor-mat/5:3-12', fetcher);
  console.log(data);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>字幕生成ツール</Navbar.Brand>
      </Navbar>

      <Container>
        <Form className="text-align-center">
          {subtitles.map((item, index) => {
            return <SubtitleForm key={index} formIndex={index} d={dispatch} />;
          })}
          <Container style={{ textAlign: 'center' }} className="mb-4 mt-4">
            <Button className="mr-3" onClick={() => addSubtitle(subtitles.length)} variant="secondary">
              エリア追加
            </Button>
            <Button color="teal" onClick={() => generatePPT(subtitles)} variant="info">
              作成
            </Button>
          </Container>
        </Form>
        <Toast style={{ minWidth: '100%' }} className="mb-5">
          <Toast.Header closeButton={false}>
            <strong>字幕種別に関しまして</strong>
          </Toast.Header>
          <Toast.Body>{messageContent}</Toast.Body>
        </Toast>
      </Container>
    </>
  );
};

export default Subtitle;
