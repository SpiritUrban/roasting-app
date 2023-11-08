import React, { useState, useEffect } from "react";
import axios from 'axios';
import yaml from 'js-yaml';
import { log, speakText, playSound, pause, scrollDown } from 'utils';
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

  const getPortion = () => props.data[st.subChapterPointer];
  const getHeaderText = () => getPortion().header.trim();


  const nextPortion = () => { };

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
    log('example', getPortion());
    const example = getPortion().portions[st.phrasePointer].example;
    log('example', example);

    if (example) addExampleToScene(example);

    scrollDown();
    await pause(2000);
    // phraseCicle();
  }

  async function addExampleToScene(content) {
    log('add', content)
    setSceneList(prev => [...prev, { type: 'example', data: content }])
    await pause(50);
    hljs.highlightAll();
    // await pause(300);
    // hljs.highlightAll();
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
          <h2>Пользователи:</h2>

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
                    item.type === 'example' && (
                      <pre
                        key={'example-' + i}
                        className="scene-example">
                        <code className="language-javascript">
                          {item.data}
                        </code>
                      </pre>
                    )
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