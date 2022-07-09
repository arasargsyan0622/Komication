import { useState } from "react";
import "./NonAuthFormsCSS/UserEmailEditCSS.css";
import { editEmail } from "../../store/session";
import { dispatch, useDispatch } from "react-redux";

function UserEmailEditForm({ setShowModal, user }) {
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const submitEmail = (e) => {
    e.preventDefault();

    if (email.length < 1 || email.length > 255) {
      setErrors(["Email has to be between 1 and 255 characters."]);
      return
    }

    const regex = ".+@globex\.com"

    if(!email.match(regex)) {
      setErrors(["Please enter a valid email dickhead."])
      return
    }

    const payload = {
      userId: user.id,
      email: email,
    };

    dispatch(editEmail(payload)).then((data) => {
      if (data.ok === false) {
        setErrors(["Email already exists."]);
      } else {
        setShowModal(false);
      }
    });
  };

  return (
    <div className="user__email__edit__form__container">
      <div className="user__email__edit__form__heading">
        <div className="user__email__edit__header__container">
          <h2 className="user__email__edit__header">Enter an email address</h2>
          <div className="user__email__edit__message">
            Enter a new email address.
          </div>
        </div>
        <button
          className="cancel__modal__x"
          onClick={() => setShowModal(false)}
        ></button>
      </div>
      <form
        className="user__email__edit__form"
        onSubmit={(e) => submitEmail(e)}
      >
        <label className="user__email__edit__label">EMAIL</label>
        <div className="channel__form__validation__error">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="user__email__edit__input__container">
          <input
            required
            pattern=".+@globex\.com"
            type="email"
            name="email"
            className="user__email__edit__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder="En"
          />
        </div>
      </form>
      <div className="user__email__edit__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Cancel</div>
        <button
          className="user__email__edit__button"
          onClick={(e) => submitEmail(e)}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default UserEmailEditForm;
