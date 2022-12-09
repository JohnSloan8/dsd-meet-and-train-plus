/* eslint-disable @typescript-eslint/no-explicit-any */
const isActivityDSDRun = (activity: any) => {
  if (activity.type !== 'Run') {
    return false;
  }
  return true;
};

export { isActivityDSDRun };
