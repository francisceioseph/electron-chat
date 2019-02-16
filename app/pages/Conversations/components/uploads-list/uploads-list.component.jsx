// @flow

import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Divider, List } from 'antd';

import './uploads-list.less';

type Props = {
  uploads: Array<Object>,
  removeItem: Function
};

const UploadsList = (props: Props) => (
  <div className="upload-file-list">
    {props.uploads.length > 0 && (
      <div>
        <Divider orientation="right">Anexos para Envio</Divider>
        <InfiniteScroll loadMore={() => {}} hasMore={false} useWindow={false}>
          <List
            style={{ width: '99%' }}
            dataSource={props.uploads}
            rowKey={(file, index) => `${file.name}_${index}`}
            renderItem={(file, index) => (
              <div className="list-item" key={file.name}>
                <p>{file.name}</p>
                <Button icon="delete" size="small" onClick={() => props.removeItem(index)} />
              </div>
            )}
          />
        </InfiniteScroll>
      </div>
    )}
  </div>
);

export default UploadsList;
