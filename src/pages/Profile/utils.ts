const createTargetTimeString = (
  targetTimeHours: number,
  targetTimeMinutes: number,
  targetTimeSeconds: number,
): string => {
  const hoursString = `${targetTimeHours}`;
  const minutesString = `${targetTimeMinutes}`;
  const secondsString = `${targetTimeSeconds}`;
  let timeString = '';
  hoursString.length == 1 ? (timeString += `0${hoursString}:`) : (timeString += `${hoursString}:`);
  minutesString.length == 1
    ? (timeString += `0${minutesString}:`)
    : (timeString += `${minutesString}:`);
  secondsString.length == 1
    ? (timeString += `0${secondsString}`)
    : (timeString += `${secondsString}`);
  return timeString;
};

const createTargetTimeNumerics = (targetTimeString: string): [number, number, number] => {
  const [h, m, s] = targetTimeString.split(':');
  return [parseInt(h), parseInt(m), parseInt(s)];
};

const raceToMetres = {
  '1 km': 1000,
  '1 mile': 1609,
  '5 km': 5000,
  '5 mile': 8047,
  '10 km': 10000,
  '10 mile': 16093,
  'half marathon': 21098,
  marathon: 42195,
};

const calculateEquivalentPaces = (h: number, m: number, s: number, distance: string) => {
  const equivalentPaces = {
    '1 km': null,
    '1 mile': null,
    '5 km': null,
    '5 mile': null,
    '10 km': null,
    '10 mile': null,
    'half marathon': null,
    marathon: null,
  };
  const targetTimeInSeconds = numericsToSeconds(h, m, s);
  Object.entries(raceToMetres).map((e) => {
    const totalSeconds = equivalencyFormula(targetTimeInSeconds, raceToMetres[distance], e[1]);
    const secondsPerKm = (1000 * totalSeconds) / e[1];
    const racePaceKm = raceTimeToKm(totalSeconds, e[1]);
    const racePaceMile = racePaceKmToMile(racePaceKm);
    const raceTime = secondsToNumerics(totalSeconds);

    equivalentPaces[e[0]] = {
      race_time: totalSeconds,
      seconds_per_km: secondsPerKm,
      race_pace_km: `${decimalPaceToMinsString(racePaceKm)}/km`,
      race_pace_mile: `${decimalPaceToMinsString(racePaceMile)}/mile`,
      race_time_list: raceTime,
    };

    if (e[0] === '5 km') {
      // TEMPO
      equivalentPaces['tempo'] = {
        race_time: 3600,
        seconds_per_km: secondsPerKm + 0.5,
        race_pace_km: `${decimalPaceToMinsString(racePaceKm + 0.5)}/km`,
        race_pace_mile: `${decimalPaceToMinsString(racePaceKmToMile(racePaceKm + 0.5))}/mile`,
        race_time_list: [1, 0, 0],
      };
    }

    if (e[0] === '10 km') {
      // Easy - https://www.runnersworld.com/uk/training/beginners/a26514237/running-pacing-easy-miles/
      equivalentPaces['easy'] = {
        race_time: null,
        seconds_per_km: 1.3 * secondsPerKm,
        race_pace_km: `${decimalPaceToMinsString(1.3 * racePaceKm)}/km`,
        race_pace_mile: `${decimalPaceToMinsString(racePaceKmToMile(1.3 * racePaceKm))}/mile`,
        race_time_list: null,
      };
    }
  });

  return equivalentPaces;
};

const numericsToSeconds = (h: number, m: number, s: number) => {
  const hrs = parseInt(h) * 3600;
  const mns = parseInt(m) * 60;
  const scs = parseInt(s);
  const totalSecs = hrs + mns + scs;

  return totalSecs;
};

const secondsToNumerics = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  let remainingSecs = totalSeconds % 3600;
  const m = Math.floor(remainingSecs / 60);
  remainingSecs = totalSeconds % 60;
  const s = Math.round(remainingSecs);
  return [h, m, s];
};

const equivalencyFormula = (time: number, d1: number, d2: number) => {
  return time * Math.pow(d2 / d1, 1.06);
};

const raceTimeToKm = (s: number, m: number) => {
  return (16.66667 * s) / m;
};

const racePaceKmToMile = (paceKm: number) => {
  return 1.609344 * paceKm;
};

const decimalPaceToMinsString = (pace: number) => {
  let mins = Math.floor(pace).toString();
  let secs = Math.floor((pace % 1) * 60).toString();
  mins.length === 1 ? (mins = '0' + mins) : mins;
  secs.length === 1 ? (secs = '0' + secs) : secs;
  return `${mins}:${secs}`;
};

export { createTargetTimeString, createTargetTimeNumerics, calculateEquivalentPaces };
