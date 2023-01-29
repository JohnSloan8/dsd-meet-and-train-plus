/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

// import { styled } from '@mui/system';
import Meta from '@/components/Meta';
import { CenteredFlexBox, FullSizeBox, PaceUnitToggleButton } from '@/components/styled';
import { getProfile, updateProfile, updateProfilePaceUnits } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/profile';
import { profileTheme } from '@/theme/theme';

import {
  calculateEquivalentPaces,
  createTargetTimeNumerics,
  createTargetTimeString,
} from './utils';

function Profile() {
  const [targetRace, setTargetRace] = useState('');
  const [paceUnits, setPaceUnits] = useState('kilometers');
  const [updatingTarget, setUpdatingTarget] = useState(false);
  const [targetTimeHours, setTargetTimeHours] = useState<string>('0');
  const [targetTimeMinutes, setTargetTimeMinutes] = useState<string>('0');
  const [targetTimeSeconds, setTargetTimeSeconds] = useState<string>('0');
  const { profile, setProfile } = useProfile();
  const { session } = useSession();

  useEffect(() => {
    if (profile === undefined) {
      if (session !== null) {
        getProfile(session.user.id).then((p) => {
          if (p) {
            setProfile(p);
            if (p.pace_in_km) {
              setPaceUnits('kilometers');
            } else {
              setPaceUnits('miles');
            }
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
      if (profile.target_race !== null && profile.target_race !== '') {
        setTargetRace(profile.target_race);
      }
      if (profile.target_time !== null && profile.target_time !== '') {
        const [h, m, s] = createTargetTimeNumerics(profile.target_time);
        setTargetTimeHours(String(h));
        setTargetTimeMinutes(String(m));
        setTargetTimeSeconds(String(s));
      } else {
        setTargetTimeHours('0');
        setTargetTimeMinutes('0');
        setTargetTimeSeconds('0');
      }
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setUpdatingTarget(true);
    e.preventDefault();
    const targetTimeString = createTargetTimeString(
      parseInt(targetTimeHours),
      parseInt(targetTimeMinutes),
      parseInt(targetTimeSeconds),
    );
    const equivalentPaces = calculateEquivalentPaces(
      parseInt(targetTimeHours),
      parseInt(targetTimeMinutes),
      parseInt(targetTimeSeconds),
      targetRace,
    );
    if (profile !== undefined) {
      updateProfile(profile.id, targetRace, targetTimeString, equivalentPaces).then((p) => {
        setProfile(p);
        setUpdatingTarget(false);
        if (p.pace_in_km) {
          setPaceUnits('kilometers');
        } else {
          setPaceUnits('miles');
        }
      });
    }
  };

  const changePaceUnits = (e) => {
    if (paceUnits !== e.target.value) {
      setPaceUnits(e.target.value);
      let paceUnitsKm = true;
      if (e.target.value === 'miles') {
        paceUnitsKm = false;
      }
      updateProfilePaceUnits(profile.id, paceUnitsKm).then((p) => {
        setProfile(p);
      });
    }
  };

  return (
    <ThemeProvider theme={profileTheme}>
      {profile !== undefined && (
        <FullSizeBox pt={8} px={1}>
          <Meta title="profile" />

          <Grid container spacing={0} width={'100%'} mt={2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="h6" align="center" sx={{ color: 'primary.wafer' }}>
                  Target Race
                </Typography>

                {profile.target_race && (
                  <Typography variant="h4" align="center" sx={{ color: '#fff' }}>
                    {`${profile.target_race}`}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography variant="h6" align="center" sx={{ color: 'primary.wafer' }}>
                  Target Time
                </Typography>
                {profile.target_time && (
                  <Typography variant="h4" align="center" sx={{ color: '#fff' }}>
                    {`${profile.target_time}`}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Typography mt={2} mb={1} variant="h6" align="center" sx={{ color: 'primary.wafer' }}>
            Equivalent Paces
          </Typography>
          <CenteredFlexBox mb={2}>
            <ToggleButtonGroup
              color="primary"
              value={paceUnits}
              exclusive
              onChange={changePaceUnits}
              aria-label="Platform"
              sx={{ border: 1, borderColor: 'primary.main' }}
            >
              <PaceUnitToggleButton value="kilometers">kilometers</PaceUnitToggleButton>
              <PaceUnitToggleButton value="miles">miles</PaceUnitToggleButton>
            </ToggleButtonGroup>
          </CenteredFlexBox>
          <Grid container spacing={0} width={'100%'} mb={1}>
            {Array.isArray(profile.equivalent_paces) &&
              profile.equivalent_paces.map((eP, i) => (
                <Grid item key={i} xs={4} mb={1.5}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    align="center"
                    sx={{ color: 'primary.wafer' }}
                  >
                    {`${eP.pace}:`}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ color: '#fff' }}>
                    {paceUnits === 'kilometers' ? `${eP.race_pace_km}` : `${eP.race_pace_mile}`}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ color: '#fff' }}>
                    {eP.race_time_list
                      ? createTargetTimeString(
                          eP.race_time_list[0],
                          eP.race_time_list[1],
                          eP.race_time_list[2],
                        )
                      : ''}
                  </Typography>
                </Grid>
              ))}
          </Grid>

          <CenteredFlexBox>
            <Box
              component="form"
              noValidate
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                handleSubmit(e);
              }}
              my={2}
              p={4}
              border={1}
              borderColor="primary.light"
              sx={{ borderRadius: 2, width: '280px', backgroundColor: 'primary.dark' }}
            >
              <Grid container spacing={0} width={'100%'}>
                <Typography color="#fff" id="target-race">
                  Set Target Race
                </Typography>
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
              <Box mt={2}>
                <Typography color="#fff" id="target-race">
                  Set Target Time
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4} my={1}>
                    <Typography color="#fff" id="target-race">
                      hours
                    </Typography>
                    <Select
                      required
                      fullWidth
                      name="hours"
                      id="hours"
                      value={targetTimeHours}
                      onChange={(e) => setTargetTimeHours(e.target.value)}
                    >
                      {[...Array(7).keys()].map((i) => (
                        <MenuItem key={i} value={`${i}`}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4} my={1}>
                    <Typography color="#fff" id="target-race">
                      mins
                    </Typography>
                    <Select
                      required
                      fullWidth
                      name="mins"
                      id="mins"
                      value={targetTimeMinutes}
                      onChange={(e) => setTargetTimeMinutes(e.target.value)}
                    >
                      {[...Array(60).keys()].map((i) => (
                        <MenuItem key={i} value={`${i}`}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4} my={1}>
                    <Typography color="#fff" id="target-race">
                      secs
                    </Typography>
                    <Select
                      required
                      fullWidth
                      name="secs"
                      id="secs"
                      value={targetTimeSeconds}
                      onChange={(e) => setTargetTimeSeconds(e.target.value)}
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
                parseInt(targetTimeHours) +
                  parseInt(targetTimeMinutes) +
                  parseInt(targetTimeSeconds) !==
                  0 && (
                  <CenteredFlexBox sx={{ width: '100%' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2, color: '#fff', backgroundColor: 'background.paper' }}
                    >
                      submit
                    </Button>
                  </CenteredFlexBox>
                )}
            </Box>
          </CenteredFlexBox>
        </FullSizeBox>
      )}
    </ThemeProvider>
  );
}

export default Profile;
