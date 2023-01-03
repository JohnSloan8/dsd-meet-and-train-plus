/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import AirIcon from '@mui/icons-material/Air';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getWeather } from '@/services/met';
import { getSunset } from '@/services/met';
import { getTrainingSessions } from '@/services/supabase';
import { updateTrainingSessionSunset, updateTrainingSessionWeather } from '@/services/supabase';
// import { useWeek } from '@/store/weekDay';
import { useDaylight, useSessionInPast, useTrainingSessions } from '@/store/trainingSessions';
import { useWeatherSymbolNumber } from '@/store/weather';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

import { convert12HrTimeTo24, getForecasts } from './utils';

const Weather = () => {
  const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  const { weekDay } = useWeekDay();
  const { week } = useWeek();
  const { weatherSymbolNumber, setWeatherSymbolNumber } = useWeatherSymbolNumber();
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const { daylight, setDaylight } = useDaylight();
  const [code, setCode] = useState(0);
  const { sessionInPast } = useSessionInPast();

  const symbolURL = `https://cdn-a.metweb.ie//images/web-meteogram-small/${weatherSymbolNumber}.png?v=5001`;

  useEffect(() => {
    try {
      if (trainingSessions[weekDay] !== undefined) {
        let weatherNeedsUpdating = false;

        if (!sessionInPast) {
          if (trainingSessions[weekDay].weather === null) {
            console.log('weather is null');
            weatherNeedsUpdating = true;
          } else {
            const timeElapsedSinceUpdate =
              Date.now() - new Date(trainingSessions[weekDay].weather.updatedAt).getTime();
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
            console.log('w:', w);
            let apiCode = 0;
            let apiTemperature = 0;
            let apiWindSpeed = 0;
            let apiWindDirection = 0;
            const forecasts = getForecasts(w.weatherdata.product.time, trainingSessions[weekDay]);
            console.log('forecasts:', forecasts);
            forecasts.map((f: any) => {
              if (f['@from'] !== f['@to']) {
                apiCode = f.location.symbol['@number'];
              } else {
                apiTemperature = Math.round(f.location.temperature['@value']);
                apiWindSpeed = Math.round(f.location.windSpeed['@mps'] * 3.6);
                apiWindDirection = Math.round(f.location.windDirection['@deg']);
              }
            });

            updateTrainingSessionWeather(trainingSessions[weekDay].id, {
              code: apiCode,
              temperature: apiTemperature,
              windSpeed: apiWindSpeed,
              windDirection: apiWindDirection,
              updatedAt: Date.now(),
            }).then((d: any) => {
              console.log('weather updated:', d);
              setTemperature(d.weather.temperature);
              setCode(d.weather.code);
              setWindSpeed(d.weather.windSpeed);
              setWindDirection(d.weather.windDirection);

              if (week !== undefined) {
                getTrainingSessions(
                  week[0].toISOString().substring(0, 10),
                  week[1].toISOString().substring(0, 10),
                ).then((d: any) => {
                  setTrainingSessions(d);
                });
              }
            });
          });
        } else {
          if (!sessionInPast && trainingSessions[weekDay].weather !== null) {
            setCode(trainingSessions[weekDay].weather.code);
            setTemperature(Math.round(trainingSessions[weekDay].weather.temperature));
            setWindSpeed(trainingSessions[weekDay].weather.windSpeed);
            setWindDirection(trainingSessions[weekDay].weather.windDirection);
          }
        }

        if (trainingSessions[weekDay].sunset === null) {
          getSunset(trainingSessions[weekDay].date).then((s: any) => {
            const sunset24Hr = convert12HrTimeTo24(s.results.sunset);
            updateTrainingSessionSunset(trainingSessions[weekDay].id, sunset24Hr);
            checkDaylight(sunset24Hr);
          });
        } else {
          checkDaylight(trainingSessions[weekDay].sunset);
        }

        console.log('weather data:', trainingSessions[weekDay].weather);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [weekDay, trainingSessions]);

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
    const sunset = new Date(`${trainingSessions[weekDay].date}T${sunset24Hr}`);
    const trainingTime = new Date(
      `${trainingSessions[weekDay].date}T${trainingSessions[weekDay].time}`,
    );
    if (sunset < trainingTime) {
      setDaylight('n');
    } else {
      setDaylight('d');
    }
  };

  return weatherSymbolNumber === undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography align="center" variant="body1">
        no forecast
      </Typography>
    </CenteredFlexBox>
  ) : (
    <Box mt={0.5}>
      <CenteredFlexBox>
        <img src={symbolURL} />
        <Typography ml={0.5} align="center" variant="body1">
          {temperature}
        </Typography>
        <Typography variant="body2">&#8451;</Typography>
      </CenteredFlexBox>

      <CenteredFlexBox py={1}>
        <AirIcon />
        <Typography ml={0.5} variant="body1">{`${windSpeed}`}</Typography>
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
