import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { FC, useEffect, useRef, useState } from 'react'
import HeaderSkeleton from '@components/header/HeaderSkeleton';
import logo from '@assets/images/logo.svg';
import { FaCaretDown, FaCaretUp, FaRegBell, FaRegEnvelope } from 'react-icons/fa';
import "./Header.scss";
import Avatar from '@components/avatar/Avatar';
import { Utils } from '@services/utils/utils.service';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import MessageSidebar from '@components/message-sidebar/MessageSidebar';
import Dropdown from '@components/dropdown/Dropdown';
import useEffectOnce from '@hooks/useEffectOnce';
import { IDropdownItem } from '@services/utils/types/post';
import { ProfileUtils } from '@services/utils/profile-utils.service';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';
import { authService } from '@services/api/auth/auth.service';


const Header:FC = () => {

  const [environment, setEnvironment] = useState<string | undefined>('');
  const [messageCount, setMessageCount] = useState<number>(0);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState<IDropdownItem[]>([]);

  const { profile } = useAppSelector((state) => state.user);
  const messageRef = useRef(null);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const [isMessageActive, setIsMessageActive] = useDetectOutsideClick(messageRef, false);
  const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(notificationRef, false);
  const [isSettingsActive, setIsSettingsActive] = useDetectOutsideClick(settingsRef, false);
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [deleteSessionPageReload] = useLocalStorage('pageReload', 'delete');
  const [deleteStorageUsername] = useLocalStorage('username', 'delete');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const backgrounColor = `${
    environment === 'DEV' || environment === 'LOCAL' ? '#50b5ff' : environment === 'STG' ? '#e9710f' : ''
  }`;

  const openChatPage = async (notification: any) => {
    console.group(notification)
  }

  const onLogout = async () => {
    try {
      Utils.clearStore( dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn );
      await authService.signOut();
    navigate('/');
    } catch (error: any) {
      Utils.dispatchNotification(error?.response?.data?.message, 'error', dispatch);
    }
  }

  useEffectOnce(() => {
    Utils.mapSettingsDropdownItems(setSettings);
  });

  useEffect(() => {
    const env = Utils.appEnvironment();
    setEnvironment(env);
  }, [ profile]);

  return (
    <>
      {
        !profile ? <HeaderSkeleton /> : (
          <div className="header-nav-wrapper" data-testid="header-wrapper">
            {isMessageActive && (
              <div ref={messageRef}>
                <MessageSidebar
                  profile={profile}
                  messageCount={messageCount}
                  messageNotifications={messageNotifications}
                  openChatPage={openChatPage}
                />
              </div>
          )}
          <div className="header-navbar">
            <div className="header-image" data-testid="header-image">
              <img src={logo} className="img-fluid" alt="" />
              <div className="app-name">
                Chatty
                {environment && (
                  <span className="environment" style={{ backgroundColor: `${backgrounColor}` }}>
                    {environment}
                  </span>
                )}
              </div>
            </div>
            <div className="header-menu-toggle">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <ul className="header-nav">
              <li  onClick={() => {
                setIsMessageActive(false);
                setIsNotificationActive(true);
                setIsSettingsActive(false);
              }} className="header-nav-item active-item">
                <span className="header-list-name">
                    <FaRegBell className="header-list-icon" />
                    {notificationCount > 0 && (
                      <span className="bg-danger-dots dots" data-testid="notification-dots">
                        {notificationCount}
                      </span>
                    )}
                </span>
                {isNotificationActive && (
                  <ul className="dropdown-ul" ref={notificationRef}>
                    <li className="dropdown-li">
                      <Dropdown
                        height={300}
                        style={{ right: '250px', top: '20px' }}
                        data={notifications}
                        notificationCount={notificationCount}
                        title="Notifications"
                        onMarkAsRead={()=>{}}
                        onDeleteNotification={()=>{}}
                        onNavigate={()=>{}}
                        onLogout  ={()=>{}}
                      />
                    </li>
                  </ul>
                )}
                &nbsp;
              </li>
              <li onClick={() => {
                setIsMessageActive(true);
                setIsNotificationActive(false);
                setIsSettingsActive(false);
              }} className="header-nav-item active-item">
                <span className="header-list-name">
                  <FaRegEnvelope className="header-list-icon" />
                  {messageCount > 0 && <span className="bg-danger-dots dots" data-testid="messages-dots"></span>}
                </span>
                &nbsp;
              </li>
              <li onClick={() => {
                  setIsSettingsActive(!isSettingsActive);
                  setIsMessageActive(false);
                  setIsNotificationActive(false);
                }} className="header-nav-item">
                <span className="header-list-name profile-image">
                  <Avatar avatarSrc={profile?.profilePicture} textColor='#fffff' bgColor={profile.avatarColor} name={profile.username} size={40} />
                </span>
                <span className="header-list-name profile-name">
                  {profile?.username}
                  {!isSettingsActive ? (
                    <FaCaretDown className="header-list-icon caret" />
                  ) : (
                    <FaCaretUp className="header-list-icon caret" />
                  )}
                </span>
                {isSettingsActive && (
                  <ul className="dropdown-ul" ref={settingsRef}>
                    <li className="dropdown-li">
                      <Dropdown
                        height={300}
                        style={{ right: '150px', top: '40px' }}
                        data={settings}
                        notificationCount={0}
                        title="Settings"
                        onLogout={onLogout}
                        onNavigate={() => ProfileUtils.navigateToProfile(profile, navigate)}
                        onDeleteNotification={()=>{}}
                        onMarkAsRead={()=>{}}
                      />
                    </li>
                  </ul>
                )}
                <ul className="dropdown-ul">
                  <li className="dropdown-li"></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        )
      }
    </>
  )
}

export default Header
