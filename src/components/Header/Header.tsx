import { styled } from 'styles/stitches';

const HeaderWrap = styled('header', {
  padding: '$6 0',
});

const Logo = styled('img', {
  width: '120px',
});

export const Header = () => {
  return (
    <HeaderWrap>
      <Logo src="/1x/issue-hub.svg" alt="logo-img" />
    </HeaderWrap>
  );
};
