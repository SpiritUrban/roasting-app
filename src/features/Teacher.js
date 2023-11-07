import React, { useState, useEffect } from "react";
import axios from 'axios';
import yaml from 'js-yaml';
import { log, loadYaml } from 'utils';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Teacher.scss';


const Teacher = (props) => {

  const globals = {
    base: '/roasting-app'
  };

  const [data, setData] = useState(null);

  // Эффект для отслеживания монтирования компонента
  useEffect(() => {
    // Немедленно вызываемая асинхронная функция (IIFE)

    return () => { }; // Компонент Counter будет размонтирован

  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после первого рендера.


  const nextPortion = () => { };
  const runScene = () => { };


  // <button type="button" onClick="loadSubChapter(i)" className=["sub-chapter" "btn" "btn-outline-secondary" "btn-lg" (i == subChapterPointer) && "active"]>${subChapter.header}</button>

  return (
    <div>
      {props.data ? (
        <div>
          <h2>Пользователи:</h2>

          <nav>
            <ul>
              {props.data.map((item, i) => (
                <li key={'js-data-str-teth-' + i}>
                   <Button variant="outline-secondary" size="lg">{item.header}</Button>{' '}
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
              <h2></h2>
              <div className="dialog"></div>
              <button
                id="next-btn"
                onClick={() => nextPortion(this)}
                type="button"
                className="next-btn btn btn-success btn-lg"
              >
                NEXT
              </button>

              <div className="centered">
                <button
                  id="start-btn"
                  onClick={() => runScene(this)}
                  type="button"
                  className="start-btn btn btn-success btn-lg"
                >
                  START
                </button>
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
