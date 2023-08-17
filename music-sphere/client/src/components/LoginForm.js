import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per Material-UI docs)
    if (event.currentTarget.reportValidity()) {
      try {
        const { data } = await loginUser({
          variables: { ...userFormData },
        });

        console.log(data);
        Auth.login(data.login.token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

      setUserFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <>
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert onClose={() => setShowAlert(false)} open={showAlert} severity='error'>
          Something went wrong with your login credentials!
        </Alert>
        <TextField
          fullWidth
          type='text'
          label='Email'
          placeholder='Your email'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
          variant='outlined'
          margin='normal'
        />
        <TextField
          fullWidth
          type='password'
          label='Password'
          placeholder='Your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required
          variant='outlined'
          margin='normal'
        />
        <Button
          fullWidth
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='contained'
          color='success'
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
