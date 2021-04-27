import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const SummaryOutcome = (props) => {
  const { outcome } = props;
  const [toggles, setToggles] = useState([]);
  const [answerCount, setAnswerCount] = useState(0);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);

    let count = 0;
    const countAnswers = (data) => {
      if (data.type === 'section') {
        data.children.forEach((deeperData) => countAnswers(deeperData));
      } else {
        count += 1;
      }
    };

    outcome.forEach((data) => countAnswers(data));
    setAnswerCount(count);
  }, []);

  const toggleNode = (id) => {
    let newToggles = [];
    const oldToggles = [...toggles];

    if (toggles.includes(id)) {
      newToggles = oldToggles.filter((item) => item !== id);
    } else {
      newToggles = oldToggles.concat([id]);
    }
    setToggles(newToggles);
  };

  const toggleAllNodes = (action) => {
    if (action === 'expand') {
      const newToggles = [];
      const getId = (data) => {
        newToggles.push(data.sub_content_id);
        if (data.type === 'section') {
          data.children.forEach((deeperData) => getId(deeperData));
        }
      };
      outcome.forEach((data) => getId(data));
      setToggles(newToggles);
    } else {
      setToggles([]);
    }
  };

  const renderNode = (data) => {
    const opened = toggles.includes(data.sub_content_id) ? '' : 'section-container-closed';

    if (Array.isArray(data)) {
      return data.map((node) => renderNode(node));
    }

    if (data.type === 'section') {
      return (
        <div className="section-container">
          <div className="section-title" onClick={() => toggleNode(data.sub_content_id)}>
            {data.title}
            <span>{opened === '' ? '▼' : '◀'}</span>
          </div>
          <div className={`section-content ${opened} p-2`}>
            {data.children.map((node) => renderNode(node))}
          </div>
        </div>
      );
    }

    if (data.type === 'question') {
      return (
        <div className="question-container">
          <div className="question-question">
            {data.title}
          </div>
          <div className="question-spacer">
            <div />
          </div>
          <div className="question-answers">
            <ul>
              {data.answers.map((answer) => (
                <li>
                  <div className="answer-container">
                    <div className="response-container">
                      {answer.response?.length === 1 && (
                        <span>
                          {answer.response[0]}
                        </span>
                      )}
                      {answer.response?.length > 1 && (
                        <ul>
                          {answer.response.map((response) => (
                            <li>
                              {response}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="score-container">
                      {answer.score?.max !== 0 && (
                        <div className="score-badge">
                          <div className="score-badge-header">SCORE</div>
                          <div className="score-badge-score">
                            {`${answer.score.raw} / ${answer.score.max}`}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p className="question-title">
          Unknown
        </p>
      </div>
    );
  };

  return (
    <div>
      {!outcome && (
        <Alert>Missing outcome data.</Alert>
      )}

      {outcome && (
        <div className="summary-outcome-controls">
          <div className="summary-outcome-answer-count">
            <FontAwesomeIcon icon="star" />
            {`${answerCount} Responses`}
          </div>
          <div className="summary-outcome-controls-btns">
            <button type="button" className="btn btn-primary" onClick={() => toggleAllNodes('expand')}>Expand All</button>
            <button type="button" className="btn btn-primary" onClick={() => toggleAllNodes('collapse')}>Collapse All</button>
          </div>
        </div>
      )}

      {outcome && outcome.map((node) => renderNode(node))}
    </div>
  );
};

SummaryOutcome.propTypes = {
  outcome: PropTypes.array.isRequired,
};

export default (SummaryOutcome);
