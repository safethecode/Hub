import axios from 'axios';

import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import type { FocusEvent, FormEvent, Key } from 'react';
import type { SearchItem, SearchRepoResponse } from 'interfaces';

import { GNBLayout, Input, Button, RepoCard, Pagination } from 'components';

import { filterRepositories } from 'utils';

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

const SubHeadline = styled('h2', {
  fontSize: '$4',
  fontWeight: 400,
  color: '$grey500',
  marginBottom: '$4',
});

const CTAContainer = styled('form', {
  display: 'flex',
  marginBottom: '$4',
  gap: 8,
});

const ResultContainer = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$4',
  borderRadius: 8,
  width: '100%',
  border: '1px solid $grey300',
  marginBottom: '$4',
  gap: 16,
});

const InitialMessageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Main = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>('');

  const [pinnedRepos, setPinnedRepos] = useState<SearchItem[]>([]);

  const [repos, setRepos] = useState<SearchRepoResponse>({
    total_count: 0,
    incomplete_results: false,
    items: [],
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const savedRepos = JSON.parse(localStorage.getItem('savedRepos') || '[]');

    if (savedRepos.length > 0) {
      setPinnedRepos(savedRepos);
    }
  }, []);

  const requestRepositories = async (query: string, currentPage: number) => {
    const { data } = await axios.get<SearchRepoResponse>(
      'https://api.github.com/search/repositories',
      {
        params: {
          q: query,
          sort: 'stars',
          per_page: 5,
          page: currentPage,
        },
      },
    );
    setRepos({
      ...data,
      items: filterRepositories(data, pinnedRepos),
    });
    setCurrentPage(currentPage);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    setSearch(() => e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      alert('검색어를 입력해주세요.');
      return;
    }
    requestRepositories(search, currentPage);
  };

  const handleRepoClick = useCallback(
    (repo: SearchItem) => {
      const savedRepos = JSON.parse(localStorage.getItem('savedRepos') || '[]');

      const isRepoPinned = savedRepos.some(
        (item: SearchItem) => item.id === repo.id,
      );

      if (isRepoPinned) {
        if (savedRepos.find((item: SearchItem) => item.id === repo.id)) {
          alert('저장된 레포를 삭제했어요.');

          localStorage.setItem(
            'savedRepos',
            JSON.stringify(
              savedRepos.filter((item: SearchItem) => item.id !== repo.id),
            ),
          );
          setPinnedRepos((prev) => prev.filter((item) => item.id !== repo.id));

          if (search) {
            setRepos((prev) => ({
              ...prev,
              items: [...prev.items, repo],
            }));
          }
          return;
        }
        return;
      }

      if (savedRepos.length === 4) {
        alert('저장된 레포는 4개까지만 가능해요.');
        return;
      }

      setPinnedRepos((prev) => [...prev, repo]);

      setRepos((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== repo.id),
      }));

      localStorage.setItem('savedRepos', JSON.stringify([...savedRepos, repo]));

      alert('선택하신 레포가 고정되었어요.');
    },
    [search],
  );
  return (
    <GNBLayout>
      <Wrapper>
        <Headline>원하는 깃허브 저장소를 한 곳에서</Headline>
        <SubHeadline>All your GitHub repositories in one place</SubHeadline>
        <CTAContainer onSubmit={handleSubmit}>
          <Input placeholder="검색어를 입력하세요" onBlur={handleBlur} />
          <Button btnType="default" type="submit">
            검색하기
          </Button>
        </CTAContainer>
        <Headline>Pinned 📌</Headline>
        <ResultContainer>
          {pinnedRepos.map((item: SearchItem, key: Key) => {
            return (
              <RepoCard key={key} issue={item} onClick={handleRepoClick} />
            );
          })}
          {pinnedRepos.length === 0 && (
            <InitialMessageContainer>
              <SubHeadline>아직 고정된 레포가 없네요!</SubHeadline>
            </InitialMessageContainer>
          )}
          <Button
            btnType="default"
            type="button"
            onClick={() => router.push('/collection')}
          >
            전체 이슈 보러가기
          </Button>
        </ResultContainer>
        <Headline>Search Results 📦</Headline>
        <ResultContainer>
          {repos.items.map((item: SearchItem, key: Key) => {
            return (
              <RepoCard key={key} issue={item} onClick={handleRepoClick} />
            );
          })}
          {repos.items.length === 0 && (
            <InitialMessageContainer>
              <SubHeadline>검색 결과가 존재하지 않아요.</SubHeadline>
            </InitialMessageContainer>
          )}
        </ResultContainer>
        <Pagination
          totalPages={repos.total_count || 1}
          currentPage={currentPage}
          onPageChanged={(newPage: number) => {
            requestRepositories(search, newPage);
          }}
          numOfPagesShow={5}
        />
      </Wrapper>
    </GNBLayout>
  );
};
