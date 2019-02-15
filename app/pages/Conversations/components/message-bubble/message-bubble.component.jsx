// @flow

import * as React from 'react';
import * as moment from 'moment';
import './message-bubble.less';

type Props = {
  data: Object,
  isMine: boolean,
  startsSequence: boolean,
  endsSequence: boolean
  // showTimestamp: boolean
};

moment.locale('pt-BR');

export default function Message(props: Props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence // showTimestamp
  } = props;

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
          <p>{data.content}</p>
          <small>{friendlyTimestamp}</small>
        </div>
      </div>
    </div>
  );
}
