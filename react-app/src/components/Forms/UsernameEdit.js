import { useState } from "react";
import "./NonAuthFormsCSS/UsernameEditCSS.css";

function UsernameEditForm({ setShowModal, user }) {
  //
  const [username, setUsername] = useState(user.username);
  const [questionHover, setQuestionHover] = useState(false);
  const handleSubmit = () => {};

  return (
    <div className="username__edit__form__container">
      <div className="username__edit__form__heading">
        <div className="username__edit__header__container">
          <h2 className="username__edit__header">Change your username</h2>
          <div className="username__edit__message">Enter a new username</div>
        </div>
        <button className="cancel__modal__x" onClick={() => setShowModal(false)}></button>
      </div>
      <form className="username__edit__form" onSubmit={(e) => handleSubmit(e)}>
        <label className="username__edit__label">USERNAME</label>
        {/* <div className="channel__form__validation__error">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div className="username__edit__input__container">
          <input
            className="username__edit__name__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            // placeholder="En"
          />
          <span className="username__id"># {user.id}</span>
          <span
            className="username__edit__hover"
            onMouseOver={() => setQuestionHover(true)}
            onMouseOut={() => setQuestionHover(false)}
          >
            ?
          </span>
          {questionHover ? (
            <span className="hover__message">Our Dev team is looking for work, check out our portfolios!</span>
          ) : null}
        </div>
      </form>
      <div className="username__edit__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Cancel</div>
        <button className="username__edit__button" onClick={(e) => handleSubmit(e)}>
          Done
        </button>
      </div>
    </div>
  );
}

export default UsernameEditForm;
