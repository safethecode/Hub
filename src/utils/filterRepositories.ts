import {
  SearchRepoResponse,
  SearchItem,
} from 'interfaces/search-repo.interface';

/**
 *
 * 깃헙 레포 중에 고정된 레포를 제외한 레포를 필터링하는 함수
 *
 * @param data
 * @param pinnedIssues
 */

export const filterRepositories = (
  data: SearchRepoResponse,
  pinnedIssues: SearchItem[],
) => {
  return data.items.filter((item) => {
    return !pinnedIssues.find((pinnedItem) => pinnedItem.id === item.id);
  });
};
