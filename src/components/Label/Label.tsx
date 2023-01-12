import { styled } from 'styles/stitches';

interface LabelProps {
  children: React.ReactNode;
  color: {
    textColor: string;
    backgroundColor: string;
  };
}

export const Label = ({ children, color }: LabelProps) => {
  const Wrapper = styled('span', {
    width: 'fit-content',
    fontSize: '$3',
    fontWeight: 700,
    textAlign: 'center',
    borderRadius: '$4',
    color: color.textColor,
    backgroundColor: color.backgroundColor,
    padding: '$2 $3',
  });
  return <Wrapper>{children}</Wrapper>;
};

Label.defaultProps = {
  color: {
    textColor: '$white',
    backgroundColor: '$black',
  },
};
