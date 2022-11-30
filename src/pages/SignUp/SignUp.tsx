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

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(data.user);
      if (data.user !== null) {
        navigate('/', { replace: true });
      } else {
        alert('data.user is null');
      }
    }
  };

  return (
    <FullSizeBox>
      <Meta title="sign up" />

      <Typography m={4} variant="h3" align="center">
        Sign Up
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

            <Grid item xs={12} my={1}>
              <TextField
                required
                fullWidth
                name="confirm password"
                label="confirmPassword"
                type="password"
                id="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <CenteredFlexBox sx={{ width: '100%' }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              sign up
            </Button>
          </CenteredFlexBox>
        </Box>
      </CenteredFlexBox>
    </FullSizeBox>
  );
}

export default SignUp;
