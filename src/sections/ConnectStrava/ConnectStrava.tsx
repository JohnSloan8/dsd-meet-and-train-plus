import Button from '@mui/material/Button';

import { CenteredFlexBox } from '@/components/styled';

function ConnectStrava() {
  const redirectURI = import.meta.env.PROD
    ? 'https://meet-and-train-plus.pages.dev'
    : 'http://localhost:3000';

  return (
    <CenteredFlexBox py={2} sx={{ width: '100%' }}>
      <Button
        size="large"
        variant="contained"
        sx={{ backgroundColor: 'warning.dark', color: 'white' }}
        href={`http://www.strava.com/oauth/authorize?client_id=60039&response_type=code&redirect_uri=${redirectURI}/strava-link&approval_prompt=force&scope=activity:read`}
      >
        link strava account
      </Button>
    </CenteredFlexBox>
  );
}

export default ConnectStrava;
