// @flow

import * as React from 'react';

import {
  Form, Input, Button, Upload, Icon, Tooltip
} from 'antd';

import { UploadsList } from '../uploads-list';
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

  removeItem = (index) => {
    const { form } = this.props;
    const files = form.getFieldValue('uploads');

    files.splice(index, 1);
    form.setFieldsValue({ uploads: files });
  };

  handleSubmit = (e) => {
    const { form, conversationId, user } = this.props;

    e.preventDefault();

    form.validateFields(async (err, values) => {
      if (!err) {
        const message = new FormData();
        message.append('user_id', user.id.toString());
        message.append('conversation_id', conversationId.toString());
        message.append('content', values.content || "");

        if (values.uploads) {
          values.uploads.forEach(file => message.append('attachments[]', file.originFileObj, file.name));
        }

        this.setState({ uploading: true });

        try {
          await WebAPI.postMessage(message, { headers: { 'Content-Type': 'multipart/form-data' } });
          form.resetFields();
        } catch (e) {
          console.log(e);
        } finally {
          this.setState({ uploading: false });
        }
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
      rules: [{ required: false, message: 'Digite uma mensagem', initialValue:"" }]
    });

    const fileDecorator = getFieldDecorator('uploads', {
      valuePropName     : 'fileList',
      getValueFromEvent : this.normFile
    });

    const uploads = this.getUploads();

    return (
      <div className="new-message-form">
        <UploadsList uploads={uploads} removeItem={this.removeItem} />
        <Form className="message-form" layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item className="message-form-item">
            {contentDecorator(<Input placeholder="Digite sua mensagem..." />)}
          </Form.Item>
          <Form.Item>
            {fileDecorator(
              <Upload loading={this.state.uploading} showUploadList={false} uploading={this.state.uploading} multiple>
                <Tooltip title="Anexar Arquivos">
                  <Button>
                    <Icon type="file-add" />
                  </Button>
                </Tooltip>
              </Upload>
            )}
          </Form.Item>
          <Form.Item>
            <Button loading={this.state.uploading} disabled={this.disableSendButton()} type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };
}

const FormWrapper = Form.create({ name: 'message-form' })(NewMessageForm);

export default FormWrapper;
