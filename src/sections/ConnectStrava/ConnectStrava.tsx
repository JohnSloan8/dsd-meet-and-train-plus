import Button from '@mui/material/Button';

import { CenteredFlexBox } from '@/components/styled';

function ConnectStrava() {
  return (
    <CenteredFlexBox p={2} sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <Button
        size="large"
        variant="contained"
        color="warning"
        href="http://www.strava.com/oauth/authorize?client_id=60039&response_type=code&redirect_uri=https://meet-and-train-plus.pages.dev/strava-link&approval_prompt=force&scope=activity:read"
      >
        link strava account
      </Button>
    </CenteredFlexBox>
  );
}

export default ConnectStrava;
