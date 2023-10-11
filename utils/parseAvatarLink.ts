export const parseAvatarLink = (avatarLink: string) => {
    return avatarLink.replace('ipfs://', 'https://ipfs.io/ipfs/');
}