import { ButtonHTMLAttributes, memo, useCallback } from 'react';
import type { MouseEvent } from 'react';

import { styled } from 'styles/stitches';

interface BaseProps {
  btnType?: 'default' | 'outline';
  icon?: React.ReactNode;
}

type Props = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2',
  padding: '$2 $4',
  transition: 'background-color 0.2s',
  cursor: 'pointer',

  variants: {
    btnType: {
      default: {
        color: '$grey700',
        backgroundColor: '$grey100',
        border: '1px solid $grey300',
        hover: {
          backgroundColor: '$grey200',
        },
      },
      outline: {
        color: '$grey700',
        backgroundColor: '$white',
        border: '1px solid $grey300',
        hover: {
          backgroundColor: '$grey50',
        },
      },
    },
    disabled: {
      true: {
        color: '$grey400',
        backgroundColor: '$white',
        border: '1px solid $grey100',
        cursor: 'not-allowed',
        hover: {
          backgroundColor: '$grey50',
        },
      },
    },
  },

  defaultVariants: {
    btnType: 'default',
    disabled: false,
  },
});

const StyledIcon = styled('div', {
  mr: '$1',
});

export const Button = memo(
  ({ onClick, disabled, icon, children, ...rest }: Props) => {
    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
          onClick && onClick(e);
        }
      },
      [disabled, onClick],
    );
    return (
      <StyledButton disabled={disabled} onClick={handleClick} {...rest}>
        {icon && <StyledIcon>{icon}</StyledIcon>}
        {children}
      </StyledButton>
    );
  },
);
