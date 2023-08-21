import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Alert,
} from '@material-ui/core';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFullNameError(false);
    setEmailError(false);
    setMessageError(false);

    if (fullName === '') {
      setFullNameError(true);
      return;
    }

    const validateEmail = /^[\w.-]+@[\w.-]+\.\w+$/;
    if (!validateEmail.test(email)) {
      setEmailError(true);
      return;
    }
    if (message === '') {
      setMessageError(true);
      return;
    }

    console.log(`Name: ${fullName}, Email: ${email}, Message: ${message}`);
    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setFullName('');
    setEmail('');
    setMessage('');
    setMessageError('');
    setSentMessage(true);
  };

  return (
    <section style={{ height: '1050px' }} id='contact'>
      <Container>
        <div className='container-contact px-4 py-4 px-lg-5 py-lg-5 bg-white rounded'>
          <Typography variant='h4' align='center' className='contact-title'>
            Contact Me
          </Typography>
          <Typography
            variant='body1'
            align='center'
            color='textSecondary'
            paragraph
          >
            Do you want to collaborate with me? Please do not hesitate to
            contact me directly. I will come back to you within a matter of
            hours to help you.
          </Typography>

          <ul className='contact-info-list text-muted mb-5 no-bullet-list'>
            <li>📧 mcramileux@gmail.com</li>
            <li>☎️ +61 0484 622 654</li>
            <li>🇦🇺 Cairns, Queensland</li>
          </ul>

          <hr className='contact-divider' />

          {!sentMessage ? (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label='Name'
                variant='outlined'
                error={fullNameError}
                helperText={fullNameError ? 'Please enter your name' : ''}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                margin='normal'
              />

              <TextField
                fullWidth
                label='Email address'
                variant='outlined'
                error={emailError}
                helperText={
                  emailError ? 'Please enter a valid email address' : ''
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin='normal'
              />

              <TextareaAutosize
                rowsMin={5}
                placeholder='Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`form-control ${
                  messageError ? 'is-invalid' : ''
                }`}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  borderColor: messageError ? 'red' : '',
                }}
              />
              {messageError && (
                <div className='invalid-feedback'>Please enter your message</div>
              )}

              <Button
                type='submit'
                variant='contained'
                color='info'
                style={{ fontSize: '20px', marginTop: '10px' }}
              >
                Submit
              </Button>
            </form>
          ) : (
            <Alert
              variant='filled'
              severity='success'
              className='mt-3'
              role='alert'
            >
              Thank you for contacting me! I have received your message and will
              get back to you as soon as possible.
            </Alert>
          )}
        </div>
      </Container>
    </section>
  );
}
