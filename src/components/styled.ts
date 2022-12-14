import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const FullSizeBox = styled(Box)({
  width: '100%',
  height: '100%',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeFlexBox = styled(FlexBox)({
  width: '100%',
  height: '100%',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const WarningGrid = styled(Grid)<GridProps>(({ theme }) => ({
  borderColor: theme.palette.warning.light,
}));

export {
  FlexBox,
  CenteredFlexBox,
  FullSizeFlexBox,
  FullSizeCenteredFlexBox,
  FullSizeBox,
  WarningGrid,
};
