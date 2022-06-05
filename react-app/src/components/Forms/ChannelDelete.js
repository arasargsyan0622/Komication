import "./NonAuthFormsCSS/ChannelDelete.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteChannel } from "../../store/current_server";
import { useHistory } from "react-router-dom";

const ChannelDeleteForm = ({ setConfirmDelete }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currServer = useSelector((state) =>
    Object.values(state.current_server)
  );
  const currChannel = Object.values(
    useSelector((state) => state.current_channel)
  );
  const uuid = currChannel[0]?.channel.channel_uuid;
  const serverUuid = currServer[0]?.server.server_invite_url;
  const firstChannelUuid = Object.values(
    Object.values(currServer[0])[0].channels
  )[0].channel_uuid;
  const secondChannelUuid = Object?.values(
    Object?.values(currServer[0])[0]?.channels
  )[1]?.channel_uuid;

  const channels = Object.values(Object.values(currServer[0])[0].channels);

  const handleSubmit = async (e) => {
    await dispatch(deleteChannel(uuid));

    if (uuid === firstChannelUuid && channels.length === 1) {
      history.push(`/servers/${serverUuid}`);
    } else if (uuid === firstChannelUuid && channels.length > 1) {
      history.push(`/servers/${serverUuid}/${secondChannelUuid}`);
    } else {
      history.push(`/servers/${serverUuid}/${firstChannelUuid}`);
    }
    // window.location.reload(false);
  };

  return (
    <div className="delete__channel__form__container">
      <div className="delete__channel__form__heading">Delete Channel</div>
      <div className="delete__channel__confirmation__message">
        {`Are you sure you want to delete #${currChannel[0]?.channel?.channel_name}? This cannot be undone.`}
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
