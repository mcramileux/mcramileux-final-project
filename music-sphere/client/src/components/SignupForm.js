import React, { useState } from 'react';
import { TextField, Button, Alert } from '@material-ui/core';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <form noValidate onSubmit={handleFormSubmit}>
        <Alert
          severity='error'
          onClose={() => setShowAlert(false)}
          style={{ display: showAlert ? 'block' : 'none' }}>
          Something went wrong with your signup!
        </Alert>

        <TextField
          id='username'
          label='Username'
          variant='outlined'
          margin='normal'
          fullWidth
          name='username'
          value={userFormData.username}
          onChange={handleInputChange}
          required
        />

        <TextField
          id='email'
          label='Email'
          variant='outlined'
          margin='normal'
          fullWidth
          type='email'
          name='email'
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />

        <TextField
          id='password'
          label='Password'
          variant='outlined'
          margin='normal'
          fullWidth
          type='password'
          name='password'
          value={userFormData.password}
          onChange={handleInputChange}
          required
        />

        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='contained'
          color='primary'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
