import { Box, Icon, Stack, Typography } from '@mui/material';

import EmailIcon from 'assets/icons/email.svg';
import GithubIcon from 'assets/icons/github.svg';
import TelegramIcon from 'assets/icons/telegram.svg';
import TwitterIcon from 'assets/icons/twitter.svg';

const socials = [
  {
    icon: TwitterIcon.src,
    link: 'https://twitter.com/stronghold_dao',
  },
  {
    icon: GithubIcon.src,
    link: 'https://github.com/strongholdsec',
  },
  {
    icon: TelegramIcon.src,
    link: 'http://t.me/stronghold_security',
  },
  {
    icon: EmailIcon.src,
    link: 'mailto:hi@strongholdsec.io',
  },
];

export const Footer = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        pb: 15,
        pt: 15,
      }}
      component="footer"
      flexDirection="column"
    >
      <Stack pb={2} spacing={1} direction="row">
        {socials.map((item) => (
          <a
            key={item.icon}
            target="_blank"
            rel="noreferrer noopener"
            href={item.link}
          >
            <Icon
              sx={{
                height: 32,
                width: 32,
              }}
              component="img"
              src={item.icon}
            />
          </a>
        ))}
      </Stack>
      <Typography variant="caption" color="text.secondary">
        © 2023 Stronghold Security
      </Typography>
    </Box>
  );
};
