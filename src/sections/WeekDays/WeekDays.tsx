/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CenteredFlexBox } from '@/components/styled';
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
      case 0:
      case 1:
      case 2:
        setWeekDay(0);
        break;
      case 3:
      case 4:
        setWeekDay(1);
        break;
      case 5:
        setWeekDay(2);
        break;
      default:
        setWeekDay(2);
    }
  };

  return (
    <CenteredFlexBox mt={-1}>
      <Tabs
        value={weekDay}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="basic tabs example"
      >
        {['Tue', 'Thu', 'Sat', 'Sun'].map((d, i) => (
          <Tab label={d} key={i} />
        ))}
      </Tabs>
    </CenteredFlexBox>
  );
}

export default WeekDays;
