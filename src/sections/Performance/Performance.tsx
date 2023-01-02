/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import { selectedAthleteActivity } from '@/store/activities';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Performance() {
  const selectedAthleteActivityState = useRecoilValue(selectedAthleteActivity);

  interface DatasetModel {
    id: number;
    label: string;
    data: number[];
    backgroundColor: string;
  }
  interface ChartDataModel {
    labels: string[];
    datasets: DatasetModel[];
  }
  const [data, setData] = useState<ChartDataModel | undefined>(undefined);

  useEffect(() => {
    console.log('selectedAthleteActivityState:', selectedAthleteActivityState);
    if (selectedAthleteActivityState !== undefined) {
      const tempSpeeds: any[] = [];
      const tempDistances: any[] = [];
      const tempLaps: string[] = [];
      selectedAthleteActivityState.strava_data.laps.map((l: any, i: number) => {
        if (l.average_speed > 1.5) {
          tempSpeeds.push(16.667 / l.average_speed);
          tempDistances.push(l.distance);
          tempLaps.push((i + 1).toString());
        }
      });
      setData({
        labels: tempLaps,
        datasets: [
          {
            id: 1,
            label: 'laps',
            data: tempSpeeds,
            backgroundColor: 'rgba(13, 71, 161, 1)',
          },
        ],
      });
    } else {
      setData(undefined);
    }
  }, [selectedAthleteActivityState]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'lap',
        },
      },
      y: {
        title: {
          display: true,
          text: 'min/km',
        },
      },
    },
  };

  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  return (
    <Box p={1} mt={2}>
      {data !== undefined ? <Bar options={options} data={data} /> : null}
    </Box>
  );
}

export default Performance;
