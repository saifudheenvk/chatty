import { createSearchParams, NavigateFunction } from 'react-router-dom';
import { IUserDocument } from './types/user';

export class ProfileUtils {
  static navigateToProfile(data: IUserDocument, navigate: NavigateFunction) {
    const params = new URLSearchParams();
    if (data?._id) params.set('id', data._id);
    if (data?.uId) params.set('uId', data?.uId);
    const url = `/app/social/profile/${data?.username}?${params.toString()}`;
    navigate(url);
  }
}
