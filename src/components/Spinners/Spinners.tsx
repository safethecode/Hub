import { styled, keyframes } from 'styles/stitches';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const Loader = styled('div', {
  position: 'relative',
  width: '32px',
  height: '32px',
  fontSize: '2px',
  borderRadius: '$round',
  borderTop: '2px solid $grey200',
  borderRight: '2px solid $grey200',
  borderBottom: '2px solid $grey200',
  borderLeft: '2px solid $blue500',
  transform: 'translateZ(0)',
  animation: `${rotate} 1.1s infinite linear`,
});

export const Spinners = () => {
  return <Loader />;
};
