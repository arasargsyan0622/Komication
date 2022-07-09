import { useState } from "react";
import "./NonAuthFormsCSS/UserEmailEditCSS.css";

function UserEmailEditForm({ setShowModal, user }) {
  const [email, setEmail] = useState(user.email);
  //
  const handleSubmit = () => {};
  return (
    <div className="user__email__edit__form__container">
      <div className="user__email__edit__form__heading">
        <div className="user__email__edit__header__container">
          <h2 className="user__email__edit__header">Enter an email address</h2>
          <div className="user__email__edit__message">Enter a new email address.</div>
        </div>
        <button className="cancel__modal__x" onClick={() => setShowModal(false)}></button>
      </div>
      <form className="user__email__edit__form" onSubmit={(e) => handleSubmit(e)}>
        <label className="user__email__edit__label">EMAIL</label>
        {/* <div className="channel__form__validation__error">
      {errors.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
    </div> */}
        <div className="user__email__edit__input__container">
          <input
            className="user__email__edit__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            // placeholder="En"
          />
        </div>
      </form>
      <div className="user__email__edit__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Cancel</div>
        <button className="user__email__edit__button" onClick={(e) => handleSubmit(e)}>
          Done
        </button>
      </div>
    </div>
  );
}

export default UserEmailEditForm;
