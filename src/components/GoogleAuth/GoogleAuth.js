import React from 'react';

import { ButtonGoogle, A, InsideDiv } from './GoogleAuth.styled';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
const BASE_URL = 'https://mobilerepair.onrender.com/api';
// const BASE_URL = 'https://project-books.netlify.app/';

const GoogleAuthBtn = ({ text }) => {
  return (
    <InsideDiv>
      <A
        href={`${BASE_URL}/auth/google`}
        className="google-btn"
        // target="_blank" rel="noreferrer"
      >
        <ButtonGoogle variant="contained">
          Google
          <GoogleIcon style={{ marginLeft: '10px', marginRight: '15px' }} />
          {text}
        </ButtonGoogle>
      </A>
    </InsideDiv>
  );
};

export default GoogleAuthBtn;
