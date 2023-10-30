import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { styled } from '@mui/material/styles';
import { neutral } from 'styles/theme/colors';

export const Tab = styled(BaseTab)(({ theme }) => ({
  cursor: 'pointer',
  fontSize: '22px',
  fontFamily: 'Gilroy',
  fontWeight: 600,
  backgroundColor: 'transparent',
  padding: '8px 24px',
  marginRight: '8px',
  border: 'none',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  color: theme?.palette?.grey[300],

  '&:hover': {},

  '&:focus': {
    outline: `3px solid ${neutral[200]}`,
  },

  [`&.${tabClasses.selected}`]: {
    color: theme?.palette?.text?.primary,
    border: '1px solid',
    borderColor: theme?.palette?.text?.primary,
  },

  //   [`&.${buttonClasses.disabled}`]: {
  //     opacity: 0.5,
  //     cursor: 'not-allowed',
  //   },
}));

export const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  background: transparent;
`;

export const TabsList = styled(BaseTabsList)`
  background-color: transparent;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;
