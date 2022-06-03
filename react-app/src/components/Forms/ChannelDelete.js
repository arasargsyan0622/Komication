import "./NonAuthFormsCSS/ChannelDelete.css";
import { useSelector, useDispatch } from "react-redux";
import {deleteChannel} from "../../store/current_server";

const ChannelDeleteForm = ({ setConfirmDelete }) => {
  let channel;

  const dispatch = useDispatch();
  const currChannel = Object.values(useSelector((state)=> state.current_channel))
  const uuid = currChannel[0]?.channel.channel_uuid

  const handleSubmit = async (e) => {
    dispatch(deleteChannel(uuid));
  };

  return (
    <div className="delete__channel__form__container">
      <div className="delete__channel__form__heading">Delete Channel</div>
      <div className="delete__channel__confirmation__message">
        {`Are you sure you want to delete #${channel?.name}? This cannot be undone.`}
      </div>

      <div className="delete__channel__bottom__buttons">
        <div onClick={() => setConfirmDelete(false)}>Back</div>
        <button className="delete__channel__button" onClick={handleSubmit}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ChannelDeleteForm;
