export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setSearchQuery = (searchQuery: string) => {
  // console.log(screenName);
  return {
    type: SET_SEARCH_QUERY,
    searchQuery,
  };
};
