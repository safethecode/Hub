import type { ReactNode } from 'react';
import { Header } from 'components/Header';
import { styled } from 'styles/stitches';

interface GNBLayoutProps {
  children: ReactNode;
}

const GNB = styled('main', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  maxWidth: '512px',
  flexFlow: 'column nowrap',
  margin: '0 auto',
});

export const GNBLayout = ({ children }: GNBLayoutProps) => {
  return (
    <GNB>
      <Header />
      {children}
    </GNB>
  );
};
