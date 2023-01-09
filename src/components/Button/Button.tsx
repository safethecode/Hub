import { ButtonHTMLAttributes, memo, useCallback } from 'react';
import type { MouseEvent } from 'react';

import { styled } from 'styles/stitches';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: 'default' | 'outline';
  icon?: React.ReactNode;
}

const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 80,
  borderRadius: '$2',
  border: 0,
  boxShadow: 'inset 0 0 0 1px $colors$grey300',
  padding: '$2 $4',
  cursor: 'pointer',
  transition: 'background-color 0.2s',

  variants: {
    btnType: {
      default: {
        color: '$grey700',
        backgroundColor: '$grey100',
        hover: {
          backgroundColor: '$grey200',
        },
      },
      outline: {
        color: '$grey700',
        backgroundColor: '$white',
        hover: {
          backgroundColor: '$grey50',
        },
      },
    },
    disabled: {
      true: {
        color: '$grey400',
        backgroundColor: '$white',
        boxShadow: 'inset 0 0 0 1px $colors$grey100',
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
  ({ onClick, disabled, icon, children, ...rest }: ButtonProps) => {
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
