import React, { useState, useEffect } from "react";
import axios from 'axios';
import yaml from 'js-yaml';
import { log, speakText, playSound, pause, scrollDown, speakText2 } from 'utils';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Teacher.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const Teacher = (props) => {

  const globals = {
    base: '/roasting-app'
  };

  const [sceneList, setSceneList] = useState([]);

  const [st, setSt] = useState({
    subChapterPointer: 0,
    portionPointer: 0,
    phrasePointer: 0,
    isNextBtn: false,
    isStartBtn: true,
  });


  useEffect(() => {
    return () => { };
  }, []);


  let data4;

  const getSubChapter = () => props.data[st.subChapterPointer];
  const getHeaderText = () => getSubChapter().header.trim();
  const getPortion = () => getSubChapter().portions[st.portionPointer];



  const nextPortion = () => {
    setSt(prev => ({ ...prev, isNextBtn: false, phrasePointer: 0, portionPointer: prev.portionPointer++ }));
    runPortion();
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
    log('runPortion()')
    log('example', getSubChapter());
    const example = getSubChapter().portions[st.portionPointer].example;
    log('example', example);

    if (example) addExampleToScene(example);

    scrollDown();
    await pause(2000);
    phraseCicle();
  }

  async function phraseCicle() {
    log('!!', getPortion())
    addPhraseToScene(getPortion().text[st.phrasePointer]);
    scrollDown();
    await pause(1000);
    scrollDown();
    //
    speakText2(getPortion().text[st.phrasePointer], () => {
      setTimeout(() => {
        let phP = st.phrasePointer++;

        setSt(prev => ({ ...prev, phrasePointer: phP, }));


        log('step', phP, getPortion().text.length - 1)

        if (phP < getPortion().text.length - 1) {
          // log('???', getSubChapter().portions[phP])
          phraseCicle();
        } else {
          log("The end of phrases has been reached");
          setSt(prev => ({ ...prev, isNextBtn: true, }));

          if (st.portionPointer < getSubChapter().portions.length - 1) {
            // setSt(prev => ({ ...prev, isNextBtn: true, }));
            scrollDown();
          }
        }
      }, 1000);
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
    data4 = props.data[i];
  }
  function resetScene() {
    setSceneList([])
    setSt(prevSt => ({
      ...prevSt,
      portionPointer: 0,
      phrasePointer: 0,
      isNextBtn: false,
      isStartBtn: true,
    }));
  }



  // <button type="button" onClick="loadSubChapter(i)" >${subChapter.header}</button>

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