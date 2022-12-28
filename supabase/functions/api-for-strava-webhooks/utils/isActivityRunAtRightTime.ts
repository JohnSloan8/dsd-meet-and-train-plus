/* eslint-disable @typescript-eslint/no-explicit-any */

const isActivityRunAtRightTime = async (activity: any, thisSession: any) => {
  if (activity.type !== 'Run') {
    console.log('activity not a Run');
    return false;
  }

  const timeDiff = Math.abs(
    (new Date(activity.start_date_local) - new Date(`${thisSession.date}T${thisSession.time}`)) /
      3600000,
  );
  if (timeDiff > 1) {
    console.log('timeDiff > 1');
    return false;
  }

  return true;
};

export default isActivityRunAtRightTime;
