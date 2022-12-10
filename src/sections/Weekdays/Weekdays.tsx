/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CenteredFlexBox, FullSizeBox } from '@/components/styled';
import { useWeekDays } from '@/store/weekDays';

function Weekdays() {
  const { weekDays, setWeekDays } = useWeekDays();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setWeekDays(newValue);
  };

  useEffect(() => {
    initWeekday();
  }, []);

  const initWeekday = () => {
    const day = new Date().getDay();
    switch (day) {
      case 0 || 1:
        setWeekDays(3);
        break;
      case 2 || 3:
        setWeekDays(0);
        break;
      case 4 || 5:
        setWeekDays(1);
        break;
      default:
        setWeekDays(2);
    }
  };

  return (
    <FullSizeBox>
      <CenteredFlexBox p={0}>
        <Tabs
          value={weekDays}
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

export default Weekdays;
