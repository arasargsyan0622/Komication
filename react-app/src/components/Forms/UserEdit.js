import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editAvatar } from "../../store/session";
import ChangePasswordModal from "../Modals/ChangePasswordModal";
import LogoutModal from "../Modals/LogoutModal";
import UserEmailEditModal from "../Modals/UserEmailEditModal";
import UsernameEditModal from "../Modals/UsernameEditModal";
import UserPhoneNumberEditModal from "../Modals/UserPhoneNumberEditModal";
import "./NonAuthFormsCSS/UserEditFormCSS.css";

const UserEditForm = ({ setShowModal, user }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const phoneNum = user.phone_number;

  const hiddenPhoneNum = "******" + phoneNum?.slice(-4);

  // console.log(hiddenPhoneNum);
  const hideEmailArr = [];
  const emailArr = user.email.split("@");
  const starCount = emailArr[0].length;
  for (let i = 0; i < starCount; i++) {
    hideEmailArr.push("*");
  }
  hideEmailArr.push("@" + emailArr[1]);
  const hiddenEmail = hideEmailArr.join("");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNum, setShowPhoneNum] = useState(false);

  const uploadHiddenInput = useRef();
  const [avatarImage, setAvatarImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // co nst currentServer = useSelector((state) => state.current_server);

  // const serverUuid = Object.values(currentServer)[0]?.server.server_invite_url;

  // const [image, setImage] = useState(Object.values(currentServer)[0]?.server.server_icon_url);
  // // console.log(image);
  // const [imageLoading, setImageLoading] = useState(false);
  // const [serverName, setServerName] = useState(Object.values(currentServer)[0]?.server.server_name);
  // const [priv, setPriv] = useState(Object.values(currentServer)[0]?.server.private);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    // setImageLoading(true);
    // setErrors([]);
    // if (!serverName.length) {
    //   setErrors(["Server must have a name"]);
    //   setImageLoading(false);
    //   return;
    // }
    // if (serverName.length > 50) {
    //   setErrors(["Server name cannot be more than 50 characters"]);
    //   setImageLoading(false);
    //   return;
    // }
    // if (typeof image !== "string") {
    // }
    // const payload = {
    //   server_name: serverName,
    //   uuid: serverUuid,
    //   private: priv,
    //   image,
    // };
    // const finishLoad = await dispatch(editServer(payload));
    // await dispatch(getCurrServer(serverUuid));
    // if (finishLoad) {
    //   setImageLoading(false);
    //   setShowModal(false);
    //   // history.push(`/servers/${finishLoad.server_invite_url}`);
    //   // window.location.reload(false);
    // } else {
    //   setImageLoading(false);
    //   // console.log("error");
    // }
  };

  const updateImage = (e) => {
    let file = e.target.files[0];
    setAvatarImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    setSubmitted(true);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadHiddenInput.current.click();
  };

  const handleReset = (e) => {
    e.preventDefault();
    setAvatarImage(null);
    setSubmitted(false);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const payload = {
      userId: user.id,
      avatar_url: avatarImage,
    };
    dispatch(editAvatar(payload)).then(() => setShowModal(false));
  };

  // const changePrivState = async () => {
  //   if (priv === false) setPriv(true);
  //   else setPriv(false);
  // };

  return (
    <>
      <div className="modal__full">
        <div className="server__edit__nav__container">
          <div className="server__edit__nav">
            <div className="server__nav__header">
              <div className="server__edit__name__display">User Settings</div>
            </div>

            <div className="server__nav__options">
              <div
                className="server__edit__option"
                id="hard__code__server__edit"
              >
                My Account
              </div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__nav__break"></div>
            </div>

            <div className="server__nav__options">
              <LogoutModal></LogoutModal>

              <div className="server__nav__break"></div>

              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
            </div>
          </div>
        </div>
        <div className="user__edit__container">
          <div className="user__edit__form__container">
            <div className="edit__user__container">
              <h1>My Account</h1>
              <div className="user__edit__personal__panel">
                <div className="user__edit__banner">
                  User Banners Coming Soon!
                </div>
                <div className="user__edit__avatar__container">
                  {submitted === true ? (
                    <>
                      <img
                        className="user__edit__avatar__display"
                        src={`${previewUrl}`}
                        alt="previewImage"
                      ></img>
                    </>
                  ) : (
                    <>
                      <img
                        className="user__edit__avatar__display"
                        src={user.avatar_url}
                      ></img>
                    </>
                  )}

                  <div className="user__edit__avatar__username">
                    <span>
                      {user.username}
                      <span id="user__edit__id">#{user.id}</span>
                    </span>

                    <div
                      className="user__edit__avatar__button"
                      onClick={handleUpload}
                    >
                      Edit User Avatar
                    </div>
                    <input
                      name="upload"
                      type="file"
                      accept="image/*"
                      ref={uploadHiddenInput}
                      onChange={updateImage}
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                      hidden
                    ></input>
                  </div>
                </div>
                <div className="user__contact__edit">
                  <div className="user__edit__username">
                    <div className="user__edit__card">
                      <span className="user__edit__card__header">USERNAME</span>
                      <span className="user__edit__info">
                        {user.username}{" "}
                        <span id="user__edit__id">#{user.id}</span>
                      </span>
                    </div>
                    {/* <div className="user__edit__modal__button">Edit</div> */}
                    <UsernameEditModal></UsernameEditModal>
                  </div>
                  <div className="user__edit__email">
                    <div className="user__edit__card">
                      <span className="user__edit__card__header">EMAIL</span>
                      {showEmail ? (
                        <span className="user__edit__info">
                          {user.email}{" "}
                          <span
                            id="user__info__reveal"
                            onClick={() => {
                              setShowEmail(false);
                            }}
                          >
                            Hide
                          </span>
                        </span>
                      ) : (
                        <span className="user__edit__info">
                          {hiddenEmail}{" "}
                          <span
                            id="user__info__reveal"
                            onClick={() => {
                              setShowEmail(true);
                            }}
                          >
                            Reveal
                          </span>
                        </span>
                      )}
                    </div>
                    {/* <div className="user__edit__modal__button">Edit</div> */}
                    <UserEmailEditModal></UserEmailEditModal>
                  </div>
                  <div className="user__edit__phone">
                    <div className="user__edit__card">
                      <span className="user__edit__card__header">
                        PHONE NUMBER
                      </span>

                      {phoneNum ? (
                        <>
                          {showPhoneNum ? (
                            <span className="user__edit__info">
                              {phoneNum}{" "}
                              <span
                                id="user__info__reveal"
                                onClick={() => setShowPhoneNum(false)}
                              >
                                Hide
                              </span>
                            </span>
                          ) : (
                            <span className="user__edit__info">
                              {hiddenPhoneNum}{" "}
                              <span
                                id="user__info__reveal"
                                onClick={() => setShowPhoneNum(true)}
                              >
                                Reveal
                              </span>
                            </span>
                          )}
                        </>
                      ) : (
                        <div style={{ color: "white" }}>ADD A PHONE NUMBER</div>
                      )}
                    </div>
                    {/* <div className="user__edit__modal__button">Edit</div> */}
                    <UserPhoneNumberEditModal></UserPhoneNumberEditModal>
                  </div>
                </div>
              </div>

              <div className="edit__server__form__break"></div>
            </div>
            <div className="user__authorization__edit">
              <h1>Password and Authentication</h1>
              <div className="user__password__change">
                {/* <div className="user__change__password__button">Change Password</div> */}
                <ChangePasswordModal></ChangePasswordModal>
                <div className="user__oath__image"></div>
              </div>
            </div>
            <div className="edit__server__form__break"></div>
            {submitted === true ? (
              <div className="user__avatar__save__container">
                <span>
                  Careful -- You've changed your avatar click here to save!
                </span>
                <div className="user__avatar__save__buttons__container">
                  <div
                    onClick={(e) => {
                      handleReset(e);
                    }}
                  >
                    Reset
                  </div>
                  <button onClick={(e) => handleSaveChanges(e)} className="user__avatar__save__button">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="user__avatar__save__buttons__placeholder"></div>
            )}
          </div>
          <div className="full__screen__modal__esc__container">
            <div onClick={() => setShowModal(false)} className="escape__circle">
              <div
                onClick={() => setShowModal(false)}
                className="escape__x"
              ></div>
            </div>
            <div onClick={() => setShowModal(false)} className="escape__text">
              ESC
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditForm;
