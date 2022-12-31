/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CenteredFlexBox } from '@/components/styled';
import { useDaylight } from '@/store/trainingSessions';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

function WeekDays() {
  const { week, setWeek } = useWeek();
  const { weekDay, setWeekDay } = useWeekDay();
  const { daylight } = useDaylight();

  useEffect(() => {
    initWeekday();
    initWeek();
  }, []);

  const initWeek = () => {
    const date = new Date();
    const day = date.getDay();

    const weekStartDate = new Date();
    const weekEndDate = new Date();

    switch (day) {
      case 0:
        weekStartDate.setDate(date.getDate() - 6);
        weekEndDate.setDate(date.getDate());
        break;
      default:
        weekStartDate.setDate(date.getDate() - (day - 1));
        weekEndDate.setDate(date.getDate() + (7 - day));
        break;
    }
    setWeek([new Date(weekStartDate), new Date(weekEndDate)]);
  };

  const initWeekday = () => {
    const day = new Date().getDay();
    switch (day) {
      case 1:
      case 2:
        setWeekDay(0);
        break;
      case 3:
      case 4:
        setWeekDay(1);
        break;
      case 5:
      case 6:
        setWeekDay(2);
        break;
      default:
        setWeekDay(3);
    }
  };

  const changeWeek = (backward: boolean) => {
    let change = 7;
    if (backward) {
      change = -7;
    }
    if (week !== undefined) {
      setWeek([
        new Date(week[0].setDate(week[0].getDate() + change)),
        new Date(week[1].setDate(week[1].getDate() + change)),
      ]);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      changeWeek(true);
    } else if (newValue === 5) {
      changeWeek(false);
    } else {
      setWeekDay(newValue - 1);
    }
  };

  return (
    <CenteredFlexBox sx={{ backgroundColor: daylight === 'n' ? 'primary.dark' : 'primary.light' }}>
      <Tabs
        value={weekDay + 1}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="basic tabs example"
        TabIndicatorProps={{ sx: { backgroundColor: 'white' } }}
        sx={{
          color: 'white',
        }}
      >
        {['<--', 'Tue', 'Thu', 'Sat', 'Sun', '-->'].map((d, i) => (
          <Tab
            label={d}
            key={i}
            sx={{
              minWidth: 10,
              width: 60,
              color: 'lightgrey',
              '&.Mui-selected': { color: 'white' },
            }}
          />
        ))}
      </Tabs>
    </CenteredFlexBox>
  );
}

export default WeekDays;
