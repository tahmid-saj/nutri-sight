import "./bookmarks.styles.scss";

const Bookmarks = () => {
  return (
    <li class="nav-item-container">
      <button class="navigation-button navigation-button-bookmarks">
        <svg class="navigation-icon">
          <use href="../../static/img/icons.svg#icon-bookmark"></use>
        </svg>
        <span>Bookmarks</span>
      </button>
      
      <div class="bookmarks">
        <ul class="bookmarks-list">
          <div class="message">
            <div>
              <svg>
                <use href="../../static/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>
              No bookmarks yet. Find a recipe and bookmark it.
            </p>
          </div>
        </ul>
      </div>
    </li>
  );
};

export default Bookmarks;
