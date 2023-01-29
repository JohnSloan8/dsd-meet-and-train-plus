import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';
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

const HorizontallyCenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
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
  borderColor: theme.palette.info.light,
}));

const PaceUnitToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  '&.MuiToggleButton-root': {
    color: theme.palette.primary.main,
  },
  '&.Mui-selected': {
    color: '#fff',
  },
}));

export {
  FlexBox,
  CenteredFlexBox,
  HorizontallyCenteredFlexBox,
  FullSizeFlexBox,
  FullSizeCenteredFlexBox,
  FullSizeBox,
  WarningGrid,
  PaceUnitToggleButton,
};
