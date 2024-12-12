import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fontAwesomeIcons, ISideBarItem, sideBarItems } from "@services/utils/static.data";
import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";


export const Sidebar = () => {
  const [sidebar, setSideBar] = useState<ISideBarItem[]>([]);

  const { profile } = useAppSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const checkUrl = (name: string) => {
    return location.pathname.includes(name.toLowerCase());
  };

  const navigateToPage = (name: string, url: string) => {
    if (name === 'Profile') {
      const params = new URLSearchParams();
      if (profile?._id) params.set('id', profile._id);
      if (profile?.uId) params.set('uId', profile.uId);
      url = `${url}/${profile?.username}?${params.toString()}`;
    }
    navigate(url);
  };

  useEffect(() => {
    setSideBar(sideBarItems);
  }, []);
  return (
    <div className="app-side-menu">
      <div className="side-menu">
        <ul className="list-unstyled">
          {sidebar.map((data) => (
            <li key={data.index} onClick={() => navigateToPage(data.name, data.url)}>
              <div data-testid="sidebar-list" className={`sidebar-link ${checkUrl(data.name) ? 'active' : ''}`}>
                <div className="menu-icon">{fontAwesomeIcons[data.iconName]}</div>
                <div className="menu-link">
                  <span>{`${data.name}`}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
