import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import checkIcon from '@assets/images/check.svg';
import errorIcon from '@assets/images/error.svg';
import infoIcon from '@assets/images/info.svg';
import warningIcon from '@assets/images/warning.svg';
import { IToast } from "@components/toast/Toast";
import { cloneDeep, uniqBy } from "lodash";



const initialState: IToast[] = [];
let list: IToast[] = [];
interface IToastPayload {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const toastIcons = [
  { success: checkIcon, color: '#5cb85c' },
  { error: errorIcon, color: '#d9534f' },
  { info: infoIcon, color: '#5bc0de' },
  { warning: warningIcon, color: '#f0ad4e' }
];


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotifications: (state: IToast[], action: PayloadAction<IToastPayload>) => {
      const { type, message } = action.payload;
      const toast = toastIcons.find((toast) => toast[type]);
      if (toast) {
        const toastItem = {
          id: state.length,
          type,
          description: message,
          icon: toast[type],
          backgroundColor: toast.color
        }
        list  = cloneDeep(list);
        list.unshift(toastItem);
        list = [...uniqBy(list, 'description')];
      }
      return list;
    },
    clearNotification: () => {
      list = [];
      return [];
    }
  }
});

export const { addNotifications, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
