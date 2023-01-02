import { FC } from 'react';

import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FlexBox } from '@/components/styled';

type Props = {
  title?: string;
  icon?: FC<SvgIconProps>;
  height: number;
  children?: React.ReactNode;
};

function MTCard({ title, icon: Icon, height, children }: Props) {
  return (
    <CenteredFlexBox px={0.5}>
      <Card
        sx={{
          borderRadius: 3,
          width: '100%',
          backgroundColor: 'primary.main',
          height: { height },
          position: 'relative',
        }}
        elevation={4}
      >
        <Box height={24} sx={{ position: 'relative', backgroundColor: 'primary.light' }}>
          {title && Icon ? (
            <FlexBox height={'100%'} sx={{ alignItems: 'flex-end' }}>
              <Box sx={{ position: 'absolute', left: -2, bottom: -6 }}>
                <IconButton>
                  <Icon sx={{ color: 'white' }} fontSize={'small'} />
                </IconButton>
              </Box>
              <Typography variant="body2" ml={3.5}>
                {title}
              </Typography>
            </FlexBox>
          ) : null}
        </Box>
        <Box height={height - 24}>{children}</Box>
      </Card>
    </CenteredFlexBox>
  );
}

export default MTCard;
