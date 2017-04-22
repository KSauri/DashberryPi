import React from 'react';
import { Panel } from 'react-bootstrap';

export default function NewsSummary({ isLoading, data, source }) {
  let content;
  if(isLoading) {
    content = (
      <Panel className={`no-overflow news-panel ${source}`}><i className="fa fa-refresh fa-spin fa-2x fa-fw"></i></Panel>
    );
  }  else {
    content = (
      <Panel className={`no-overflow news-panel ${source}`}>
        <img className='news-logo' src={`./src/assets/${source}.png`} />
        <p className='news-headline'>{data.title}</p>
      </Panel>
    );
  }
  return content;
}
