import 'bootstrap/dist/css/bootstrap.min.css';
import '@/App.css';
import { useStore } from '@/hooks/useStore';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE } from '@/const';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from '@/components/icons';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SectionType } from '@/types.d';
import TextArea from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translateGPT';
import { useDebounce } from './hooks/useDebounce';



function App() {

  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading, 
    interchangeLanguages, 
    setFromLanguage, 
    setToLanguage, 
    setFromText,
    setResult
  } = useStore()

  const debounceFronText = useDebounce(fromText)

  useEffect(() => {
    if (debounceFronText === '') return
    translate(fromLanguage, toLanguage, debounceFronText)
      .then( (response) => {
        if(response == null) return
        setResult(response)
      })
      .catch( () => {
        setResult('error')
      }) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceFronText, toLanguage, fromLanguage ])

  const handleClipboard = async () => {
    await navigator.clipboard.writeText(result)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }



  return (
    <Container fluid>
      <h1>Google translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              onChange={setFromLanguage}
              type={SectionType.From}
              value={fromLanguage}
            />
            <TextArea
              placeholder='Introducir texto'
              type={SectionType.From}
              onChange={setFromText}
              value={fromText}
              loading={loading}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => interchangeLanguages()}>
            <ArrowsIcon/>
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              onChange={setToLanguage}
              type={SectionType.To}
              value={toLanguage}
            />
            <div style={{position: 'relative'}}> 
              <TextArea
                placeholder={loading ? 'Traduciendo...' : 'Traduccion'}
                value={result}
                type={SectionType.To}
                onChange={setResult}
                loading={loading}
              />

              {
                !loading 
                && fromText!== ''
                && <div style={{position: 'absolute', bottom: '0', left: '0', display: 'flex', gap: '10px'}}>
                  <Button variant='link' onClick={handleClipboard}>
                    <ClipboardIcon/>
                  </Button>

                  <Button variant='link' onClick={handleSpeak}>
                    <SpeakerIcon/>
                  </Button>
                </div>
              }
             </div>
          </Stack>
        </Col>
      </Row>

    </Container>
  )
}

export default App
