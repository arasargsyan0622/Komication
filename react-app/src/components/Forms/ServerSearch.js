import React, { useState } from "react";

import "./NonAuthFormsCSS/ServerSearch.css";

function ServerSearch() {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <div className="server__search__form">
      <form>
        <input
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
          className={searchActive ? "server__search__active" : "server__search__inactive"}
          type="search"
          placeholder="Coming Soon!"
          disabled
        ></input>
      </form>
    </div>
  );
}

export default ServerSearch;
