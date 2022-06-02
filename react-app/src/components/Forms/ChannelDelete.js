import "./NonAuthFormsCSS/ChannelDelete.css";

const ChannelDeleteForm = ({ setShowModal }) => {
  let channel;
  const handleSubmit = async (e) => {
    //dispatch thunk to delete channel
  };

  return (
    <div className="delete__channel__form__container">
      <div className="delete__channel__form__heading">Delete Channel</div>
      <div className="delete__channel__confirmation__message">
        {`Are you sure you want to delete #${channel?.name}? This cannot be undone.`}
      </div>

      <div className="delete__channel__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Back</div>
        <button className="delete__channel__button" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default ChannelDeleteForm;
