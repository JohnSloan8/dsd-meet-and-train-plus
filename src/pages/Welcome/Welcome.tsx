import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { CenteredFlexBox, FullSizeFlexBox } from '@/components/styled';

function Welcome() {
  return (
    <>
      <Meta title="Welcome" />
      <FullSizeFlexBox border={5} sx={{ backgroundColor: 'background.default' }}>
        <CenteredFlexBox>
          <Typography variant="h4">DSD M&T+</Typography>
        </CenteredFlexBox>
      </FullSizeFlexBox>
    </>
  );
}

export default Welcome;
