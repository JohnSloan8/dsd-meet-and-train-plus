/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { CenteredFlexBox, FullSizeBox } from '@/components/styled';
import { getProfile, updateProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/profile';

import {
  calculateEquivalentPaces,
  createTargetTimeNumerics,
  createTargetTimeString,
} from './utils';

function Profile() {
  const [targetRace, setTargetRace] = useState('');
  const [updatingTarget, setUpdatingTarget] = useState(false);
  const [targetTimeHours, setTargetTimeHours] = useState<number>(0);
  const [targetTimeMinutes, setTargetTimeMinutes] = useState<number>(0);
  const [targetTimeSeconds, setTargetTimeSeconds] = useState<number>(0);
  const { profile, setProfile } = useProfile();
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile === undefined) {
      if (session !== null) {
        getProfile(session.user.id).then((p) => {
          if (p) {
            setProfile(p);
          }
        });
      } else {
        console.log('session is null');
      }
    } else {
      console.log('profile:', profile);
    }
  }, []);

  useEffect(() => {
    if (profile !== undefined) {
      setTargetRace(profile.target_race);
      const [h, m, s] = createTargetTimeNumerics(profile.target_time);
      setTargetTimeHours(h);
      setTargetTimeMinutes(m);
      setTargetTimeSeconds(s);
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setUpdatingTarget(true);
    e.preventDefault();
    const targetTimeString = createTargetTimeString(
      targetTimeHours,
      targetTimeMinutes,
      targetTimeSeconds,
    );
    const equivalentPaces = calculateEquivalentPaces(
      targetTimeHours,
      targetTimeMinutes,
      targetTimeSeconds,
      targetRace,
    );
    updateProfile({
      id: profile.id,
      target_race: targetRace,
      target_time: targetTimeString,
      equivalent_paces: equivalentPaces,
    }).then((d) => {
      setProfile(d[0]);
      setUpdatingTarget(false);
      navigate('/');
    });
  };

  return (
    <FullSizeBox>
      <Meta title="sign up" />

      <Typography m={4} variant="h3" align="center" color="primary">
        Profile
      </Typography>
      {profile !== undefined && (
        <Box>
          <Typography mt={4} variant="body1" align="center" color="primary">
            Target Race
          </Typography>
          {profile.target_race ? (
            <Typography variant="h4" align="center" color="primary">
              {`${profile.target_race}`}
            </Typography>
          ) : (
            <p>-</p>
          )}
        </Box>
      )}
      {profile !== undefined && (
        <Box>
          <Typography mt={1} variant="body1" align="center" color="primary">
            Target Time
          </Typography>
          {profile.target_time ? (
            <Typography mb={4} variant="h4" align="center" color="primary">
              {`${profile.target_time}`}
            </Typography>
          ) : (
            <p>-</p>
          )}
        </Box>
      )}

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
          <Grid container spacing={0} width={'100%'} px={1}>
            <InputLabel id="target-race">Set Target Race</InputLabel>
            <Grid item xs={12} my={1}>
              <Select
                required
                fullWidth
                name="target race"
                id="target-race"
                value={targetRace}
                // label="target race"
                onChange={(e) => setTargetRace(e.target.value)}
              >
                <MenuItem value={'1 mile'}>1 mile</MenuItem>
                <MenuItem value={'5 km'}>5 km</MenuItem>
                <MenuItem value={'5 mile'}>5 mile</MenuItem>
                <MenuItem value={'10 km'}>10 km</MenuItem>
                <MenuItem value={'10 mile'}>10 mile</MenuItem>
                <MenuItem value={'half marathon'}>half marathon</MenuItem>
                <MenuItem value={'marathon'}>marathon</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Box mt={2} px={1}>
            <InputLabel id="hours">Set Target Time</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={4} my={1}>
                <TextField
                  required
                  fullWidth
                  name="hours"
                  label="hours"
                  type="number"
                  id="hours"
                  InputProps={{ inputProps: { min: 0, max: 9 } }}
                  value={targetTimeHours}
                  onChange={(e) => setTargetTimeHours(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} my={1}>
                <TextField
                  required
                  fullWidth
                  name="mins"
                  label="mins"
                  type="number"
                  id="mins"
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                  value={targetTimeMinutes}
                  onChange={(e) => setTargetTimeMinutes(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} my={1}>
                <TextField
                  required
                  fullWidth
                  name="secs"
                  label="secs"
                  type="number"
                  id="secs"
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                  value={targetTimeSeconds}
                  onChange={(e) => setTargetTimeSeconds(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
          {!updatingTarget && (
            <CenteredFlexBox sx={{ width: '100%' }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, color: 'white' }}>
                submit
              </Button>
            </CenteredFlexBox>
          )}
        </Box>
      </CenteredFlexBox>
    </FullSizeBox>
  );
}

export default Profile;
