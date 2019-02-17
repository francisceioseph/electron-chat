// @flow

import * as React from 'react';
import * as moment from 'moment';
import FileSaver from 'file-saver';

import { getResourceUrl } from '../../../../utils/http.service';

import './message-bubble.less';

type Props = {
  data: Object,
  isMine: boolean,
  startsSequence: boolean,
  endsSequence: boolean
  // showTimestamp: boolean
};

moment.locale('pt-BR');

const saveFile = (event, attachment) => {
  event.preventDefault();

  const url = getResourceUrl(attachment.url);
  const { filename } = attachment;

  FileSaver.saveAs(url, filename);
};

export default function Message(props: Props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence // showTimestamp
  } = props;

  const attachments = data.attachments || [];

  const createdAt = moment(data.created_at);
  const friendlyTimestamp = moment().diff(createdAt, 'days') > 0 ? createdAt.format('l LT') : createdAt.format('LT');
  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}
    >
      <div className="bubble-container">
        <div className="bubble" title="">
          {attachments.map((attachment, index) => (
            <a
              heref="#"
              role="button"
              key={`${attachment.filename}_${index}`}
              onClick={event => saveFile(event, attachment)}
            >
              {attachment.filename}
            </a>
          ))}
          <p>{data.content}</p>
          <small>{friendlyTimestamp}</small>
        </div>
      </div>
    </div>
  );
}
