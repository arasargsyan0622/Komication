import LogoutButton from "./auth/LogoutButton";

function LogoutForm({ setShowModal }) {
  //
  const logout = () => {};
  return (
    <div className="delete__channel__form__container">
      <div className="delete__channel__form__heading">Log Out</div>
      <div className="delete__channel__confirmation__message">{`Are you sure you want to logout?`}</div>

      <div className="delete__channel__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Cancel</div>
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
}

export default LogoutForm;
