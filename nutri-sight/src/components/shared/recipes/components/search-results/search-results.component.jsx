import "./search-results.styles.scss";

import Pagination from "../pagination/pagination.component";
import SearchResult from "../search-result/search-result.component";

const SearchResults = () => {
  return (
    <div className="search-results-pagination-container">
      <div className="search-results-container">
        <SearchResult></SearchResult>
        <SearchResult></SearchResult>
        <SearchResult></SearchResult>
        <SearchResult></SearchResult>
      </div>

      <Pagination></Pagination>
    </div>
  )
};

export default SearchResults;