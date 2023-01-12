import { Label } from 'components/Label';
import { RepoIssuesResponse } from 'interfaces';

import { styled } from 'styles/stitches';

interface IssueCardProps {
  issue: RepoIssuesResponse;
}

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

const RepoName = styled('p', {
  fontSize: '$3',
  fontWeight: 400,
  color: '$grey500',
  marginBottom: '$2',
});

const CardHeaderContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const LabelContainer = styled('div', {
  display: 'flex',
  gap: 8,
});

const IssueTitle = styled('h1', {
  fontSize: '$4',
  fontWeight: 600,
});

const InfoContainer = styled('div', {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const UserAvatar = styled('img', {
  width: 24,
  height: 24,
  borderRadius: 9999,
});

const UserNickname = styled('p', {
  fontSize: '$3 ',
  fontWeight: 400,
  color: '$grey500',
});

const repositoryNameRegex = new RegExp('/([^/]+)/([^/]+)/?$');

export const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <Wrapper
      onClick={() => {
        window.open(issue.html_url, '_blank');
      }}
    >
      <RepoName>
        {issue.repository_url.match(repositoryNameRegex)![0].replace('/', '')}
      </RepoName>
      <CardHeaderContainer>
        <IssueTitle>{issue.title.slice(0, 55) + '...'}</IssueTitle>
        {issue.labels.length > 0 && (
          <LabelContainer>
            {issue.labels.map((label) => (
              <Label
                key={label.id}
                color={{
                  textColor: '$white',
                  backgroundColor: `#${label.color}`,
                }}
              >
                {label.name}
              </Label>
            ))}
          </LabelContainer>
        )}
      </CardHeaderContainer>
      <InfoContainer>
        <UserAvatar src={issue.user.avatar_url} alt="avatar" />
        <UserNickname>{issue.user.login}</UserNickname>
      </InfoContainer>
    </Wrapper>
  );
};
