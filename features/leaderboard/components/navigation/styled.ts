import Link from '@mui/material/Link';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  text-transform: none !important;
  text-decoration: none !important;

  font-size: 18px;
  font-weight: 500 !important;

  transition: opacity 200ms;
  &:hover {
    opacity: 0.5;
  }
`;
