import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useStore } from './hooks/useStore';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './const';
import { ArrowsIcon } from './components/icons';



function App() {

  // usar el stado useReducer
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading, 
    interchangeLanguages
  } = useStore()

  return (
    <Container fluid>
      <h1>Google tranlate</h1>

      <Row>
        <Col>
          <h2>From</h2>
          {fromLanguage}
        </Col>

        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => interchangeLanguages()}>
            <ArrowsIcon/>
          </Button>
        </Col>

        <Col>
          <h2>To</h2>
          {toLanguage}
        </Col>
      </Row>

    </Container>
  )
}

export default App
