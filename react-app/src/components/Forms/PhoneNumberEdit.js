import "./NonAuthFormsCSS/PhoneNumberEditCSS.css";
import { editPhoneNumber } from "../../store/session";
import { useDispatch } from "react-redux";
import { useState } from "react";

function PhoneNumberEditForm({ setShowModal, user }) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState([]);

  const submitPhoneNumber = (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      setErrors(["Please enter a valid phone number."]);
      return;
    }

    const regex = "^[0-9]*$";
    if (!phoneNumber.match(regex)) {
      setErrors(["Please enter 10 digits dickhead."]);
      return;
    }

    const payload = {
      userId: user.id,
      phone_number: phoneNumber,
    };

    dispatch(editPhoneNumber(payload)).then((data) => {
      if (data.ok === false) {
        setErrors(["Phone number already exists."]);
      } else {
        setShowModal(false);
      }
    });
  };

  return (
    <div className="user__phone__number__edit__form__container">
      <div className="user__phone__number__edit__svg"></div>
      <div className="user__phone__number__edit__form__heading">
        <div className="user__phone__number__edit__header__container">
          <h2 className="user__phone__number__edit__header">
            Enter a Phone Number
          </h2>
          <div className="user__phone__number__edit__message">
            Your phone number can only be used to verify one Komication account
            at a time.
          </div>
        </div>
      </div>
      <form
        className="user__phone__number__edit__form"
        onSubmit={(e) => submitPhoneNumber(e)}
      >
        {/* <label className="user__phone__number__edit__label">USE</label> */}
        <div className="channel__form__validation__error">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="user__phone__number__edit__input__container">
          <span className="phone__number__region">+1</span>
          <input
            className="user__phone__number__edit__name__input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
          />
          <div
            className="user__phone__number__edit"
            onClick={(e) => submitPhoneNumber(e)}
          >
            Update
          </div>
        </div>
      </form>
    </div>
  );
}

export default PhoneNumberEditForm;
