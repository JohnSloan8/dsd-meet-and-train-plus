import Button from '@mui/material/Button';

import { CenteredFlexBox } from '@/components/styled';

function ConnectStrava() {
  return (
    <CenteredFlexBox py={2} sx={{ width: '100%' }}>
      <Button
        size="large"
        variant="contained"
        sx={{ backgroundColor: 'warning.dark', color: 'white' }}
        href="http://www.strava.com/oauth/authorize?client_id=60039&response_type=code&redirect_uri=https://meet-and-train-plus.pages.dev/strava-link&approval_prompt=force&scope=activity:read"
      >
        link strava account
      </Button>
    </CenteredFlexBox>
  );
}

export default ConnectStrava;
