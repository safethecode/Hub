import React from 'react';
import type { SearchItem } from 'interfaces';

import { styled } from 'styles/stitches';

const Wrapper = styled('li', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  boxShadow: 'inset 0 0 0 1px $colors$grey300',
  padding: '$4',
  transition: 'background 0.2s',
  cursor: 'pointer',

  hover: {
    backgroundColor: '$grey100',
  },
});

const CardHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '$4',
});

const GithubIcon = styled('img', {
  width: 24,
  height: 24,
  marginRight: '$2',
});

const FullName = styled('h1', {
  fontSize: '$4',
  fontWeight: '900',
  lineHeight: 1.5,
  color: '$grey600',
});

const Description = styled('p', {
  fontSize: '$3',
  fontWeight: 400,
  lineHeight: 1.5,
  color: '$grey500',
});

interface IssueCardProps {
  issue: SearchItem;
  onClick: (issue: SearchItem) => void;
}

export const RepoCard = ({ issue, onClick }: IssueCardProps) => {
  return (
    <Wrapper onClick={() => onClick(issue)}>
      <CardHeader>
        <GithubIcon src="/1x/github.svg" alt="github-icon" />
        <FullName>{issue.full_name}</FullName>
      </CardHeader>
      <Description>{issue.description?.slice(0, 70) + '...'}</Description>
    </Wrapper>
  );
};
