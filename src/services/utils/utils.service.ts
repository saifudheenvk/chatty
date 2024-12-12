import { floor, random } from 'lodash';
import { avatarColors } from "./static.data";
import { addUser, clearUser } from '@redux/reducers/user/user.reducer';
import { AxiosResponse } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { APP_ENVIRONMENT } from '@services/axios';
import { IDropdownItem } from './types/post';
import { clearNotification } from '@redux/reducers/notifications/notifications.reducer';


export class Utils {
  static getAvatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)];
  }

  static generateAvatar(text: string, backgroundColor: string, foregroundColor = 'white') {
    const canvas = document.createElement('canvas');
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to get 2D context');
    } else {
      canvas.width = 200;
      canvas.height = 200;

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text
      context.font = 'normal 80px sans-serif';
      context.fillStyle = foregroundColor;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      return canvas.toDataURL('image/png');
    }
  }

  static dispatchUser(result: AxiosResponse, pageReload: (value: boolean) => void, dispatch: Dispatch , setUser: (value: any) => void) {
    dispatch(addUser({ token: result.data?.token, profile: result.data?.user }));
    setUser(result.data.user);
    pageReload(true);
  }

  static clearStore( dispatch: Dispatch, deleteStorageUsername: () => void, deleteSessionPageReload: () => void, setLoggedIn: (value: boolean) => void): void {
    dispatch(clearUser());
    dispatch(clearNotification());
    deleteStorageUsername();
    deleteSessionPageReload();
    setLoggedIn(false);
  }

  static appEnvironment() {
    switch (APP_ENVIRONMENT) {
      case 'local':
        return 'LOCAL';
      case 'development':
        return 'DEV';
      case 'staging':
        return 'STG';
      default:
        return 'UNKNOWN';
    }
  }

  static generateString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static mapSettingsDropdownItems(setSettings: (value: IDropdownItem[]) => void) {
    const items = [];
    const item = {
      topText: 'My Profile',
      subText: 'View personal profile.'
    };
    items.push(item);
    setSettings(items);
    return items;
  }

}
