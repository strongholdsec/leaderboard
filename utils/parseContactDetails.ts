import { hexToString } from 'viem';

export const parseContactDetails = (contactInfo: any) => {
  const { socialNetwork, contact } = contactInfo.args;

  const socialData = {};
  for (let i = 0; i < socialNetwork.length; i++) {
    const network = hexToString(socialNetwork[i], { size: 32 });
    const parsedLink = hexToString(contact[i], { size: 32 });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socialData[network] =
      parsedLink === '\x00'
        ? undefined
        : parsedLink
            .replace('@', '')
            .replace('https://t.me/', '')
            .replace('https://twitter.com/', '')
            .replace('https://github.com/', '');
  }

  return socialData;
};
