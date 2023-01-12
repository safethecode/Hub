import axios from 'axios';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { RepoIssuesResponse, SearchItem } from 'interfaces';

import { GNBLayout, Button, IssueCard, Pagination } from 'components';

import { styled } from 'styles/stitches';

const Wrapper = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
});

const Headline = styled('h1', {
  fontSize: '$6',
  fontWeight: '900',
  color: '$black',
  marginBottom: '$4',
});

const CTAContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '$4',
  gap: 8,
});

const IssueContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '$4',
  gap: 16,
});

export const Collection = () => {
  const router = useRouter();

  const [repoIssues, setRepoIssues] = useState<RepoIssuesResponse[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const getRepoIssues = async (currentPage: number) => {
    const savedRepos: SearchItem[] = JSON.parse(
      localStorage.getItem('savedRepos') || '[]',
    );

    const promises = savedRepos.map((item) =>
      axios.get(`https://api.github.com/repos/${item.full_name}/issues`, {
        params: {
          per_page: 5,
          state: 'open',
          page: currentPage,
        },
      }),
    );

    Promise.all(promises).then((responses) => {
      const issueData = responses.map((res) => res.data);
      setRepoIssues(issueData);
    });
  };

  useEffect(() => {
    getRepoIssues(currentPage);
  }, [currentPage]);
  return (
    <GNBLayout>
      <Wrapper>
        <CTAContainer>
          <Headline>Collection</Headline>
          <Button btnType="default" onClick={() => router.push('/')}>
            메인으로 돌아가기
          </Button>
        </CTAContainer>
        <IssueContainer>
          {repoIssues.map((result: RepoIssuesResponse[] | any) => {
            return result.map((item: RepoIssuesResponse) => {
              return <IssueCard key={item.id} issue={item} />;
            });
          })}
        </IssueContainer>
        <Pagination
          totalPages={300}
          currentPage={currentPage}
          numOfPagesShow={5}
          onPageChanged={(newPage) => {
            setCurrentPage(newPage);
            getRepoIssues(newPage);
          }}
        />
      </Wrapper>
    </GNBLayout>
  );
};
