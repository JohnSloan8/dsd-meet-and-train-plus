/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
  const [targetTimeHours, setTargetTimeHours] = useState(0);
  const [targetTimeMinutes, setTargetTimeMinutes] = useState(0);
  const [targetTimeSeconds, setTargetTimeSeconds] = useState(0);
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
    console.log('profile:', profile);
    if (profile !== undefined) {
      if (profile.target_race !== null && profile.target_race !== '') {
        setTargetRace(profile.target_race);
      }
      if (profile.target_time !== null && profile.target_time !== '') {
        const [h, m, s] = createTargetTimeNumerics(profile.target_time);
        setTargetTimeHours(h);
        setTargetTimeMinutes(m);
        setTargetTimeSeconds(s);
      } else {
        setTargetTimeHours(0);
        setTargetTimeMinutes(0);
        setTargetTimeSeconds(0);
      }
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
    if (profile !== undefined) {
      updateProfile(profile.id, targetRace, targetTimeString, equivalentPaces).then((d: any) => {
        setProfile(d);
        setUpdatingTarget(false);
        navigate('/');
      });
    }
  };

  return (
    <FullSizeBox pt={8}>
      <Meta title="sign up" />

      <Typography m={4} variant="h3" align="center" color="primary">
        Profile
      </Typography>
      {profile !== undefined && (
        <Box>
          <Typography mt={4} variant="body1" align="center" color="primary">
            Target Race
          </Typography>
          {profile.target_race && (
            <Typography variant="h4" align="center" color="primary">
              {`${profile.target_race}`}
            </Typography>
          )}
        </Box>
      )}
      {profile !== undefined && (
        <Box>
          <Typography mt={1} variant="body1" align="center" color="primary">
            Target Time
          </Typography>
          {profile.target_time && (
            <Typography mb={4} variant="h4" align="center" color="primary">
              {`${profile.target_time}`}
            </Typography>
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
          my={2}
          sx={{ width: '240px' }}
        >
          <Grid container spacing={0} width={'100%'}>
            <InputLabel id="target-race">Set Target Race</InputLabel>
            <Grid item xs={12} my={1}>
              <InputLabel id="mins">distance</InputLabel>
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
          <Box mt={2}>
            <InputLabel id="hours">Set Target Time</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={4} my={1}>
                <InputLabel id="hrs">hours</InputLabel>
                <Select
                  required
                  fullWidth
                  name="hours"
                  id="hours"
                  value={targetTimeHours}
                  onChange={(e) => setTargetTimeHours(e.target.value as number as number)}
                >
                  {[...Array(7).keys()].map((i) => (
                    <MenuItem key={i} value={`${i}`}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4} my={1}>
                <InputLabel id="mins">mins</InputLabel>
                <Select
                  required
                  fullWidth
                  name="mins"
                  id="mins"
                  value={targetTimeMinutes}
                  onChange={(e) => setTargetTimeMinutes(e.target.value as number)}
                >
                  {[...Array(60).keys()].map((i) => (
                    <MenuItem key={i} value={`${i}`}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4} my={1}>
                <InputLabel id="mins">secs</InputLabel>
                <Select
                  required
                  fullWidth
                  name="secs"
                  id="secs"
                  value={targetTimeSeconds}
                  onChange={(e) => setTargetTimeSeconds(e.target.value as number)}
                >
                  {[...Array(60).keys()].map((i) => (
                    <MenuItem key={i} value={`${i}`}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
          {!updatingTarget &&
            targetRace !== '' &&
            targetTimeHours + targetTimeMinutes + targetTimeSeconds !== 0 && (
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
