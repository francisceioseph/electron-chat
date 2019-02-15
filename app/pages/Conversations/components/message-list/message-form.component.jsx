// @flow

import * as React from 'react';

import {
  Form, Input, Button, Upload, Icon
} from 'antd';

import * as WebAPI from '../../../../utils/api.service';

type Props = {
  conversationId: number,
  user: Object,
  form: Object
};

type State = {
  uploading: boolean
};

class NewMessageForm extends React.Component<Props, State> {
  state = {
    uploading: false
  };

  getUploads = () => {
    const { form } = this.props;
    return form.getFieldValue('uploads') || [];
  };

  disableSendButton = () => {
    const { form } = this.props;
    const content = form.getFieldValue('content');

    return this.getUploads().length === 0 && !content;
  };

  clearItems = () => {
    const { form } = this.props;
    form.resetFields(['uploads']);
  };

  handleSubmit = (e) => {
    const { form, conversationId, user } = this.props;

    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        const message = new FormData();
        message.append('user_id', user.id.toString());
        message.append('conversation_id', conversationId.toString());
        message.append('content', values.content);

        if (values.uploads) {
          values.uploads.forEach(file => message.append('attachments[]', file.originFileObj, file.name));
        }

        WebAPI.postMessage(message, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(() => {
            form.resetFields();
          })
          .catch(error => console.log(error));
      }
    });
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render = () => {
    const { form } = this.props;

    const { getFieldDecorator } = form;
    const contentDecorator = getFieldDecorator('content', {
      rules: [{ required: true, message: 'Digite uma mensagem' }]
    });

    const fileDecorator = getFieldDecorator('uploads', {
      valuePropName     : 'fileList',
      getValueFromEvent : this.normFile
    });

    return (
      <div className="new-message-form">
        <Form className="message-form" layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item className="message-form-item">
            {contentDecorator(<Input placeholder="Digite sua mensagem..." />)}
          </Form.Item>
          <Form.Item>
            {fileDecorator(
              <Upload showUploadList={false} uploading={this.state.uploading} multiple>
                <Button>
                  <Icon type="upload" />
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item>
            <Button disabled={this.disableSendButton()} type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>

        <div className="upload-file-list">
          {this.getUploads().map(file => (
            <div className="list-item" key={file.name}>
              <p>{file.name}</p>
              <Button icon="delete" size="small" onClick={() => this.clearItems()} />
            </div>
          ))}
        </div>
      </div>
    );
  };
}

const FormWrapper = Form.create({ name: 'message-form' })(NewMessageForm);

export default FormWrapper;
