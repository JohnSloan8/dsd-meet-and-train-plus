/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import AirIcon from '@mui/icons-material/Air';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getWeather } from '@/services/met';
import { getSunset } from '@/services/met';
import { updateSessionSunset, updateSessionWeather } from '@/services/supabase';
import { currentSessionState, sessionInPastState, useDaylight } from '@/store/sessions';
import { useWeatherSymbolNumber } from '@/store/weather';

import { convert12HrTimeTo24, getForecasts } from './utils';

const Weather = () => {
  const currentSession = useRecoilValue(currentSessionState);

  const { weatherSymbolNumber, setWeatherSymbolNumber } = useWeatherSymbolNumber();
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const { daylight, setDaylight } = useDaylight();
  const [code, setCode] = useState(0);
  const sessionInPast = useRecoilValue(sessionInPastState);

  const symbolURL = `https://cdn-a.metweb.ie//images/web-meteogram-small/${weatherSymbolNumber}.png?v=5001`;

  useEffect(() => {
    try {
      if (currentSession !== undefined) {
        let weatherNeedsUpdating = false;

        if (!sessionInPast) {
          if (currentSession.weather === null) {
            weatherNeedsUpdating = true;
          } else {
            const timeElapsedSinceUpdate =
              Date.now() - new Date(currentSession.weather.updatedAt).getTime();
            console.log('timeElapsedSinceUpdate:', timeElapsedSinceUpdate);
            if (timeElapsedSinceUpdate / 3600000 > 60) {
              weatherNeedsUpdating = true;
              console.log('too much time elapsed');
            }
          }
        } else {
          console.log('no weather update - session in the past');
        }

        if (weatherNeedsUpdating) {
          getWeather().then((w: any) => {
            // console.log('w:', w);
            let apiCode = 0;
            let apiTemperature = 0;
            let apiWindSpeed = 0;
            let apiWindDirection = 0;
            const forecasts = getForecasts(w.weatherdata.product.time, currentSession);
            // console.log('forecasts:', forecasts);
            forecasts.map((f: any) => {
              if (f['@from'] !== f['@to']) {
                apiCode = f.location.symbol['@number'];
              } else {
                apiTemperature = Math.round(f.location.temperature['@value']);
                apiWindSpeed = Math.round(f.location.windSpeed['@mps'] * 3.6);
                apiWindDirection = Math.round(f.location.windDirection['@deg']);
              }
            });
            if (apiCode !== 0) {
              updateSessionWeather(currentSession.id, {
                code: apiCode,
                temperature: apiTemperature,
                windSpeed: apiWindSpeed,
                windDirection: apiWindDirection,
                updatedAt: Date.now(),
              }).then((d: any) => {
                // console.log('weather updated:', d);
                setTemperature(d.weather.temperature);
                setCode(d.weather.code);
                setWindSpeed(d.weather.windSpeed);
                setWindDirection(d.weather.windDirection);
              });
            } else {
              setCode(0);
            }
          });
        } else {
          if (
            !sessionInPast &&
            typeof currentSession.weather === 'object' &&
            currentSession.weather !== null
          ) {
            setCode(currentSession.weather.code);
            setTemperature(Math.round(currentSession.weather.temperature));
            setWindSpeed(currentSession.weather.windSpeed);
            setWindDirection(currentSession.weather.windDirection);
          }
        }

        if (currentSession.sunset === null) {
          getSunset(currentSession.date).then((s: any) => {
            const sunset24Hr = convert12HrTimeTo24(s.results.sunset);
            updateSessionSunset(currentSession.id, sunset24Hr);
            checkDaylight(sunset24Hr);
          });
        } else {
          checkDaylight(currentSession.sunset);
        }
      }
      // console.log('currentSession:', typeof currentSession.weather === 'object');
    } catch (error) {
      console.log('error', error);
    }
  }, [currentSession]);

  useEffect(() => {
    if (code !== undefined) {
      let displayCode = code.toString();

      if (displayCode.length === 1) {
        displayCode = '0' + code;
      }

      setWeatherSymbolNumber(displayCode + daylight);
    }
  }, [daylight, code]);

  const checkDaylight = (sunset24Hr: string) => {
    if (currentSession !== undefined) {
      const sunset = new Date(`${currentSession.date}T${sunset24Hr}`);
      const trainingTime = new Date(`${currentSession.date}T${currentSession.time}`);
      if (sunset < trainingTime) {
        setDaylight('n');
      } else {
        setDaylight('d');
      }
    }
  };

  return code === 0 ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography align="center" variant="body1">
        no forecast
      </Typography>
    </CenteredFlexBox>
  ) : (
    <Box pt={0.5}>
      <CenteredFlexBox>
        <img src={symbolURL} />
        <Typography ml={0.5} align="center" fontWeight="bold" variant="h6">
          {temperature}
        </Typography>
        <Typography variant="body2">&#8451;</Typography>
      </CenteredFlexBox>

      <CenteredFlexBox py={1.5}>
        <AirIcon />
        <Typography ml={0.25} variant="body1">{`${windSpeed}`}</Typography>
        <Typography ml={0.2} variant="body2">{` kph`}</Typography>
        <ArrowDownwardIcon sx={{ transform: `rotate(${windDirection}deg)` }} />
      </CenteredFlexBox>
      <Typography align="center" variant="body2">
        no warnings
      </Typography>
    </Box>
  );
};

export default Weather;
