import React, { useState, useEffect } from "react";
import { log, speakText, playSound, pause, scrollDown, speakText2 } from 'utils';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Teacher.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const w = window;
w.portionPointer = 0
w.phrasePointer = 0

const Teacher = (props) => {

  const globals = {
    base: '/roasting-app'
  };

  const [sceneList, setSceneList] = useState([]);

  const [st, setSt] = useState({
    subChapterPointer: 0,
    // portionPointer: 0,
    // phrasePointer: 0,
    isNextBtn: false,
    isStartBtn: true,
  });

  const getSubChapter = () => props.data[st.subChapterPointer];
  const getHeaderText = () => getSubChapter().header.trim();
  const getPortion = () => getSubChapter().portions[w.portionPointer];

  const init = async () => {
    await pause(1000);
    scrollDown('.container-custom');
  };

  useEffect(() => {
    init()
    return () => { };
  }, []);

  const nextPortion = async () => {
    setSt(prev => ({ ...prev, isNextBtn: false }));
    w.portionPointer++
    w.phrasePointer = 0
    await runPortion();
  };

  const runScene = async () => {
    setSt(prevSt => ({
      ...prevSt,
      isNextBtn: false,
      isStartBtn: false,
    }));
    playSound(globals.base + "/sounds/yamete_kudasai.mp3");
    await pause(2000);
    runPortion();
  };

  async function runPortion() {
    const example = getPortion().example;
    if (example) addExampleToScene(example);
    await scrollDown('.container-custom');
    await pause(2000);
    phraseCicle();
  }

  async function phraseCicle() {
    addPhraseToScene(getPortion().text[w.phrasePointer]);
    await pause(100);
    scrollDown('.container-custom');
    //
    speakText2(getPortion().text[w.phrasePointer], async () => {
      await pause(1000)
      w.phrasePointer = w.phrasePointer + 1;
      if (w.phrasePointer <= getPortion().text.length - 1) {
        phraseCicle();
      } else {
        log("The end of phrases has been reached");
        log(w.portionPointer, getSubChapter().portions.length - 1)
        if (w.portionPointer < getSubChapter().portions.length - 1) {
          setSt(prev => ({ ...prev, isNextBtn: true, }));
          await pause(100);
          scrollDown('.container-custom');
        }
      };
    });
  }

  function addPhraseToScene(content) {
    setSceneList(prev => [...prev, { type: 'phrase', data: content }])
  }

  async function addExampleToScene(content) {
    setSceneList(prev => [...prev, { type: 'example', data: content }])
    await pause(50);
    hljs.highlightAll();
  }

  const loadSubChapter = (i) => {
    resetScene();
    setSt(prevSt => ({
      ...prevSt,
      subChapterPointer: i
    }));
  }
  function resetScene() {
    setSceneList([])
    w.portionPointer = 0;
    w.phrasePointer = 0;
    setSt(prevSt => ({
      ...prevSt,
      isNextBtn: false,
      isStartBtn: true,
    }));
  }

  return (
    <div>
      {props.data ? (
        <div>

          <nav>
            <ul>
              {props.data.map((item, i) => (
                <li key={'js-data-str-teth-' + i}>
                  <Button
                    onClick={() => loadSubChapter(i)}
                    className={`sub-chapter ${i === st.subChapterPointer ? "active" : ""}`}
                    variant="outline-secondary"
                    size="lg"
                  >
                    {item.header}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <article className="scene" id="scene">

            <div className="left">
              <img
                src={globals.base + "/img/teacher.png"}
                alt="Teacher"
                style={{ maxWidth: '20rem', transition: '0.5s' }}
              />
            </div>
            <div className="right">
              <h2
                className="sound"
                onClick={() => speakText(getHeaderText())}>
                {getHeaderText()}
              </h2>

              <div className="dialog">
                {
                  sceneList.map((item, i) =>
                    item.type === 'example' ? (
                      <pre
                        key={'example-' + i}
                        className="scene-example">
                        <code className="language-javascript">
                          {item.data}
                        </code>
                      </pre>
                    )
                      : item.type === 'phrase' ? (
                        <pre
                          key={'phrase-' + i}
                          onClick={() => speakText(item.data)}
                          className="scene-phrase">
                          {item.data}
                        </pre>
                      ) : null
                  )
                }
              </div>

              {st.isNextBtn && (
                <button
                  id="next-btn"
                  onClick={() => nextPortion(this)}
                  type="button"
                  className="next-btn btn btn-success btn-lg"
                >
                  NEXT
                </button>)}

              <div className="centered">
                {st.isStartBtn && (
                  <button
                    id="start-btn"
                    onClick={() => runScene(this)}
                    type="button"
                    className="start-btn btn btn-success btn-lg"
                  >
                    START
                  </button>
                )}

              </div>
            </div>
          </article>

        </div>

      ) : (
        <p>Teacer Loading...</p>
      )
      }
    </div >
  );
};

export default Teacher;