import { SET_SEARCH_QUERY } from '../actions/setSearchQuery';

const initialState = '';

export default function searchQueryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return action.searchQuery;
    default:
      return state;
  }
}
