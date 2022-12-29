/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeBox } from '@/components/styled';
import { useWeek } from '@/store/week';

function Week() {
  const { week, setWeek } = useWeek();

  useEffect(() => {
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
    // console.log('week:', [weekStartDate.toISOString(), weekEndDate.toISOString()]);
    // setWeek([
    //   new Date(weekStartDate).toISOString().substring(0, 10),
    //   new Date(weekEndDate).toISOString().substring(0, 10),
    // ]);
    setWeek([new Date(weekStartDate), new Date(weekEndDate)]);
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

  return (
    <FullSizeBox>
      <CenteredFlexBox pt={1} pb={0}>
        <Button
          onClick={() => {
            changeWeek(true);
          }}
        >
          <KeyboardArrowLeftIcon />
        </Button>
        {week !== undefined ? (
          <Typography>{`${new Date(week[0]).getDate()} ${new Date(week[0]).toLocaleString('en-US', {
            month: 'short',
          })} - ${new Date(week[1]).getDate()} ${new Date(week[1]).toLocaleString('en-US', {
            month: 'short',
          })}`}</Typography>
        ) : (
          <Typography>undefined</Typography>
        )}
        <Button
          onClick={() => {
            changeWeek(false);
          }}
        >
          <KeyboardArrowRightIcon />
        </Button>
      </CenteredFlexBox>
    </FullSizeBox>
  );
}

export default Week;
