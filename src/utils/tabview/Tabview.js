/* eslint-disable */
import React from 'react';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Libraries from './libraries';
import './Tabview.css';
const Tabview = (props) => {
  const { componentName, path, description, codeSnippet, libraryUsed, customHooks, reduxStore, apiUsed, images, stylesheetUsed, example } = props;

  return (
    <div>
      <h2>{componentName}</h2>
      <Tabs className="tabs" defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="profile" title="Path" style={{ margin: '0' }}>
          <div className="tab-text">
            <p>This is the path of the component,if you want to go this directory then follow this path into your text editor.</p>
            <h4 className="url-header">{path}</h4>
          </div>
        </Tab>
        <Tab eventKey="Description" title="Description">
          <div className="tab-text">
            <h4>Description of Component</h4>

            <p>{description}</p>
          </div>
        </Tab>

        <Tab eventKey="codeSnippet" title="Code Snippets">
          <div className="tab-text ">
            <SyntaxHighlighter language="javascript" style={docco}>
              {codeSnippet}
            </SyntaxHighlighter>
          </div>
        </Tab>

        <Tab eventKey="customHooks" title="Custom Component">
          <div className="tab-text">
            <ol>
              <div>
                {customHooks?.length > 0 ? (
                  customHooks?.map((key) => {
                    return (
                      <div>
                        <li>
                          <h5>
                            {key?.name}
                            {key.url !== '' ? (
                              <a href={key.url} target="_blank" rel="noopener">
                                link to component
                              </a>
                            ) : null}
                          </h5>
                        </li>
                      </div>
                    );
                  })
                ) : (
                  <Alert variant="primary">No Information available</Alert>
                )}
              </div>
            </ol>
          </div>
        </Tab>
        <Tab eventKey="librariesUsed" title="Libraries Used">
          <div className="tab-text">
            <Libraries libUsed={libraryUsed} />
          </div>
        </Tab>
        <Tab eventKey="reduxStore" title="Redux Store">
          <div className="tab-text">
            {reduxStore?.length > 0 ? (
              reduxStore?.map((key) => {
                return (
                  <div>
                    <p>This is the path of the {componentName} component.if you want to go this directory then follow this path onto your text editor.</p>
                    <h4 className="url-header">{key.path} </h4>
                    <h5>Code Used for Redux Store</h5>
                    <SyntaxHighlighter language="javascript" style={docco}>
                      {key.pathCode}
                      <h1>test</h1>
                    </SyntaxHighlighter>
                  </div>
                );
              })
            ) : (
              <Alert variant="primary">No Information available</Alert>
            )}
          </div>
        </Tab>
        <Tab eventKey="apiUsed" title="Api Used">
          <div className="tab-text">
            {apiUsed?.length > 0 ? (
              apiUsed?.map((key) => {
                return (
                  <div>
                    <p>This is the path of the Services used in this component.if you want to go this directory then follow this path onto your text editor.</p>
                    <h4 className="url-header">{key.path} </h4>
                    <h5>Code Used in Api</h5>
                    <SyntaxHighlighter language="javascript" style={docco}>
                      {key.apicode}
                    </SyntaxHighlighter>
                  </div>
                );
              })
            ) : (
              <Alert variant="primary">No Information avaialble</Alert>
            )}
          </div>
        </Tab>
        <Tab eventKey="stylesheet" title="Stylesheet">
          <div className="tab-text">
            {stylesheetUsed?.length > 0 ? (
              <>
                <h5>style.scss</h5>
                <SyntaxHighlighter language="javascript" style={docco}>
                  {stylesheetUsed}
                </SyntaxHighlighter>
              </>
            ) : (
              <Alert variant="primary">No Information Available</Alert>
            )}
          </div>
        </Tab>
        <Tab eventKey="screenshot" title="Screenshots">
          <div className="tab-text">{images ? <img src={images} className="App-logo" alt="logo" /> : <Alert variant="primary">No Screenshot Available</Alert>}</div>
        </Tab>
        <Tab eventKey="example" title="Examples">
          <div className="tab-text">
            {example ? (
              <>
                <h4>Design of the page</h4>
                Visit the website to view design look{' '}
                <a href={example} target="_blank">
                  Go to the Page
                </a>
              </>
            ) : (
              <Alert variant="primary">No Information Available</Alert>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Tabview;

Tabview.propTypes = {
  componentName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  codeSnippet: PropTypes.string.isRequired,
  libraryUsed: PropTypes.array.isRequired,
  customHooks: PropTypes.array.isRequired,
  reduxStore: PropTypes.array.isRequired,
  apiUsed: PropTypes.array.isRequired,
  example: PropTypes.string.isRequired,
  stylesheetUsed: PropTypes.string.isRequired,
};
