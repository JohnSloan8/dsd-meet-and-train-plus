/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CenteredFlexBox, FullSizeBox } from '@/components/styled';
import { useWeekDay } from '@/store/weekDay';

function WeekDays() {
  const { weekDay, setWeekDay } = useWeekDay();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setWeekDay(newValue);
  };

  useEffect(() => {
    initWeekday();
  }, []);

  const initWeekday = () => {
    const day = new Date().getDay();
    switch (day) {
      case 0 || 1:
        setWeekDay(3);
        break;
      case 2 || 3:
        setWeekDay(0);
        break;
      case 4 || 5:
        setWeekDay(1);
        break;
      default:
        setWeekDay(2);
    }
  };

  return (
    <FullSizeBox>
      <CenteredFlexBox p={0}>
        <Tabs
          value={weekDay}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="Tue" />
          <Tab label="Thu" />
          <Tab label="Sat" />
          <Tab label="Sun" />
        </Tabs>
      </CenteredFlexBox>
    </FullSizeBox>
  );
}

export default WeekDays;
