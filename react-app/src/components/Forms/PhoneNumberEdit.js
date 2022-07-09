import "./NonAuthFormsCSS/PhoneNumberEditCSS.css";

function PhoneNumberEditForm({ setShowModal, user }) {
  //
  const handleSubmit = () => {};
  return (
    <div className="user__phone__number__edit__form__container">
      <div className="user__phone__number__edit__svg"></div>
      <div className="user__phone__number__edit__form__heading">
        <div className="user__phone__number__edit__header__container">
          <h2 className="user__phone__number__edit__header">Enter a Phone Number</h2>
          <div className="user__phone__number__edit__message">
            Your phone number can only be used to verify one Komication account at a time.
          </div>
        </div>
      </div>
      <form className="user__phone__number__edit__form" onSubmit={(e) => handleSubmit(e)}>
        {/* <label className="user__phone__number__edit__label">USE</label> */}
        {/* <div className="channel__form__validation__error">
      {errors.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
    </div> */}
        <div className="user__phone__number__edit__input__container">
          <span className="phone__number__region">+1</span>
          <input
            className="user__phone__number__edit__name__input"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <div className="user__phone__number__edit">Update</div>
        </div>
      </form>
    </div>
  );
}

export default PhoneNumberEditForm;
