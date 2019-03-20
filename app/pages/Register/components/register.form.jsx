import React from 'react';
import { Form, Icon, Input, Button, Select } from 'antd';
import { compose, withHandlers } from 'recompose';

const FormItem = Form.Item;
const Option = Select.Option;

const handleSubmit = props => e => {
  e.preventDefault();
  props.form.validateFields((err, values) => {
    if (!err) {
      props.onSubmitHandler(values);
    }
  });
};

const checkPassword = props => (rule, value, callback) => {
  const form = props.form;
  if (value && value !== form.getFieldValue('password')) {
    callback('Two passwords that you enter is inconsistent!');
  } else {
    callback();
  }
}

const checkConfirm = props => (rule, value, callback) => {
  const form = props.form;
  if (value) {
    form.validateFields(['confirm'], { force: true });
  }
  callback();
}

const withFormHandlers = withHandlers({ handleSubmit, checkPassword, checkConfirm });

const LoginForm = props => {
  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Form onSubmit={props.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('profile_attributes.personal_datum_attributes.full_name', {
            rules: [{ required: true, message: 'Nome não pode estar em branco' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Nome"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'E-mail não pode estar em branco' }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Senha não pode estar em branco' }, { validator: props.checkPassword }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Senha"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password_confirmation', {
            rules: [
              { required: true, message: 'Confirmação de senha não pode estar em branco' },
              { validator: props.checkConfirm },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirmação de senha"
            />
          )}
        </FormItem>

        <Button type="primary" htmlType="submit" className="login-form-button">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
};

const LoginFormComponent = compose(withFormHandlers)(LoginForm);

export default Form.create()(LoginFormComponent);
