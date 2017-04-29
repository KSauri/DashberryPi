import React from 'react';
import { Panel } from 'react-bootstrap';
import Truncate from 'react-truncate';

export default function NewsSummary({ source, info }) {
  let content;
  let { isLoading, data, error, errorMessage } = info;
  if (error) {
    content = (
      <Panel bsStyle="danger" className="text-danger">
        <i className="fa fa-exclamation fa-fw"></i> {errorMessage || "Something went wrong"}
      </Panel>
    )
  } else if(isLoading) {
    content = (
      <Panel className={`no-overflow news-panel ${source}`}><i className="fa fa-refresh fa-spin fa-fw"></i></Panel>
    );
  }  else {
    content = (
      <Panel className={`no-overflow news-panel ${source}`}>
        <img className='news-logo' src={`./src/assets/${source}.png`} />
        <p className='news-headline'>
          <Truncate lines={2} ellipsis={<span>...</span>}>
              {data.title}
          </Truncate>
        </p>
      </Panel>
    );
  }
  return content;
}
