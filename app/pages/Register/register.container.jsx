import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Alert, Button } from 'antd';

import { setRegisterError } from './register.actions';
import { showPageLoader, hidePageLoader } from '../../containers/layouts/actions';
import RegisterForm from './components/register.form';
import * as WebAPI from '../../utils/api.service';

import './register.scss';

const mapStateToProps = ({ register }) => ({
  registerError: register.registerError,
});

const mapDispatchToProps = {
  setRegisterError,
  showPageLoader,
  hidePageLoader
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);

const onSubmitHandler = props => async (values) => {
  props.showPageLoader();
  const user = {
    ...values, 
    role_id: 4,
    profile_attributes: {
      profile_type: "Chatter",
      ...values.profile_attributes
    }
  };

  try {
    const response = await WebAPI.postUser(user);
    props.setRegisterError(null);
    props.history.push('/login');
  } catch (error) {
    props.setRegisterError(error || { error: true });
  } finally {
    props.hidePageLoader();
  }
};

const withLoginHandlers = withHandlers({
  onSubmitHandler
});

const RegisterContainer = props => (
  <React.Fragment>
    <div className="form">
      <div className="logo">
        <span>Novo Usuário</span>
      </div>
      <RegisterForm onSubmitHandler={props.onSubmitHandler} />

      <div className="footer">
        <p>ou</p>
      </div>
      <Button className="login-form-button">
        <Link to="/login">Login</Link>
      </Button>
      
      {!!props.registerError && 
        <Alert 
          type="error"
          message="Houve uma falha ao cadastrar seu usuário. Tente novamente mais tarde ou utilize outro endereço de e-mail" 
          banner 
        />}
    </div>
  </React.Fragment>
);

const RegisterPageWrapper = compose(withLoginHandlers)(RegisterContainer);

export default withRedux(RegisterPageWrapper);
