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
      if (Array.isArray(data.content)) {
        data.content.forEach((deeperData) => countAnswers(deeperData));
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
        newToggles.push(data['sub-content-id']);
        if (Array.isArray(data.content)) {
          data.content.forEach((deeperData) => getId(deeperData));
        }
      };
      outcome.forEach((data) => getId(data));
      setToggles(newToggles);
    } else {
      setToggles([]);
    }
  };

  const renderNode = (data) => {
    const opened = toggles.includes(data['sub-content-id']) ? '' : 'section-container-closed';

    if (data.title && data.content && Array.isArray(data.content)) {
      return (
        <div className="section-container">
          <div className="section-title" onClick={() => toggleNode(data['sub-content-id'])}>
            {data.title}
            <span>{opened === '' ? '▼' : '◀'}</span>
          </div>
          <div className={`section-content ${opened} p-2`}>
            {(data.content && Array.isArray(data.content) && data.content.map((node) => renderNode(node)))}
          </div>
        </div>
      );
    }

    if (data.content.questions) {
      return (
        <div className="question-container">
          <div className="question-question">
            {data.content.questions}
          </div>
          <div className="question-spacer">
            <div />
          </div>
          <div className="question-answers">
            {data.answer && Array.isArray(data.answer) && data.answer.map((answer) => (
              <li>
                {answer.score?.raw && answer.score?.max && (
                  <span>{`${answer.score.raw} / ${answer.score.max}`}</span>
                )}
              </li>
            ))}
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
