import { useState } from "react";
import "./NonAuthFormsCSS/ChangePasswordCSS.css";
import { editPassword } from "../../store/session";
import { useDispatch } from "react-redux"


function ChangePasswordForm({ setShowModal, user }) {
  const dispatch = useDispatch()
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState([])

  const submitPassword = (e) => {
    e.preventDefault();

    if(newPassword !== confirmNewPassword) {
      setErrors(["Passwords do not match."])
      return
    }

    if(newPassword.length < 1 || newPassword.length > 255) {
      setErrors(["Password has to be between 1 and 255 characters."])
      return
    }

     if(password.length < 1 || password.length > 255) {
      setErrors(["Password has to be between 1 and 255 characters."])
      return
    }

    const payload = {
      userId: user.id,
      old_password: password,
      hashed_password: newPassword,
    };

    dispatch(editPassword(payload)).then((data) => {
      // console.log("just data", data)
      if(data.msg) {
        // console.log("error", data.msg)
        setErrors(["Invalid Password."])
        return
      } else {
        // console.log("we changed the password")
        setShowModal(false)
      }
    })
  };
  return (
    <div className="user__password__edit__form__container">
      <div className="user__password__edit__form__heading">
        <div className="user__password__edit__header__container">
          <h2 className="user__password__edit__header">Update your password</h2>
          <div className="user__password__edit__message">
            Enter your current password and a new password.
          </div>
        </div>
        <button
          className="cancel__modal__x"
          onClick={() => setShowModal(false)}
        ></button>
      </div>
      <form
        className="user__password__edit__form"
        onSubmit={(e) => submitPassword(e)}
      >
        <label className="user__password__edit__label">CURRENT PASSWORD</label>
        <div className="channel__form__validation__error">
      {errors.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
    </div>
        <div className="user__password__edit__input__container">
          <input
            className="user__password__edit__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            // placeholder="En"
          />
        </div>
        <label className="user__password__edit__label">NEW PASSWORD</label>
        <div className="user__password__edit__input__container">
          <input
            className="user__password__edit__input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            // placeholder="En"
          />
        </div>
        <label className="user__password__edit__label">
          CONFIRM NEW PASSWORD
        </label>
        <div className="user__password__edit__input__container">
          <input
            className="user__password__edit__input"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            type="password"
            // placeholder="En"
          />
        </div>
      </form>
      <div className="user__password__edit__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Cancel</div>
        <button
          className="user__password__edit__button"
          onClick={(e) => submitPassword(e)}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
