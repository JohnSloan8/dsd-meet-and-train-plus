import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { CenteredFlexBox, FullSizeBox } from '@/components/styled';
import { supabase } from '@/services/supabase';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    supabase.auth.signInWithPassword({ email, password }).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <FullSizeBox pt={8}>
      <Meta title="log in" />

      <Typography m={4} variant="h3" align="center" color="primary">
        Log In
      </Typography>

      <CenteredFlexBox>
        <Box
          component="form"
          noValidate
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            handleSubmit(e);
          }}
          m={2}
          maxWidth="sm"
        >
          <Grid container spacing={0} width={'100%'}>
            <Grid item xs={12} my={1}>
              <TextField
                required
                fullWidth
                id="email"
                label="emailAddress"
                name="email"
                autoComplete="email"
                type="email"
                placeholder="emailAddress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} my={1}>
              <TextField
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <CenteredFlexBox sx={{ width: '100%', mt: 3, mb: 2 }}>
            <Button type="submit" variant="contained" sx={{ color: 'white' }}>
              log in
            </Button>
          </CenteredFlexBox>
          <CenteredFlexBox sx={{ width: '100%', mt: 3, mb: 2 }}>
            <Button
              sx={{ color: 'info.main' }}
              onClick={() => {
                navigate('/sign-up', { replace: true });
              }}
            >
              create account
            </Button>
          </CenteredFlexBox>
        </Box>
      </CenteredFlexBox>
    </FullSizeBox>
  );
}

export default LogIn;
