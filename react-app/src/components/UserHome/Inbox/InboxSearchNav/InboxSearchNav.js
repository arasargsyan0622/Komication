import "./InboxSearchNav.css";

function InboxSearchNav() {
  // const [setIsLoaded] = useState(false);

  return (
    <div className="inbox__nav__search__container">
      <div className="inbox__channel__username__container">
        <div className="inbox__username__at"></div>
        <div className="inbox__channel__username">UserName</div>
      </div>
      <div className="inbox__channel__search__container">
        <div className="inbox__channel__search__input__container">
          <input type="text" className="inbox__channel__search__input" placeholder="Search"></input>
          <div className="search__eye__glass"></div>
        </div>
        <div className="inbox__search__question__mark"></div>
      </div>
    </div>
  );
}

export default InboxSearchNav;
