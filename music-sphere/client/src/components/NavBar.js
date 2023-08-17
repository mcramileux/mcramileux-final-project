import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Dialog,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@mui/material';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import ProfilePage from './ProfilePage';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('login');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position='static' color='primary'>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography variant='h6' component={Link} to='/' color='inherit'>
              Music Sphere
            </Typography>
            <Box ml='auto'>
              <Button color='inherit' component={Link} to='/'>
                Search For Albums
              </Button>
              {Auth.loggedIn() ? (
                <>
                  <Button color='inherit' component={Link} to='/saved'>
                    See Your Albums
                  </Button>
                  <Button color='inherit' onClick={Auth.logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color='inherit' onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* set modal data up */}
      <Dialog fullWidth maxWidth='sm' open={showModal} onClose={() => setShowModal(false)}>
        {/* tab container to do either signup or login component */}
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant='fullWidth'
          indicatorColor='primary'
        >
          <Tab label='Login' value='login' />
          <Tab label='Sign Up' value='signup' />
        </Tabs>
        <Box p={2}>
          <TabPanel value={selectedTab} index='login'>
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </TabPanel>
          <TabPanel value={selectedTab} index='signup'>
            <SignUpForm handleModalClose={() => setShowModal(false)} />
          </TabPanel>
        </Box>
      </Dialog>
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

export default AppNavbar;
