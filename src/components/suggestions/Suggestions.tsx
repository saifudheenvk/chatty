import Avatar from "@components/avatar/Avatar";
import Button from "@components/button/Button";
import { useAppSelector } from "@hooks/redux";
import { IUserDocument } from "@services/utils/types/user";
import { FC, useEffect, useState } from "react"
import "@components/suggestions/Suggestions.scss";
import { useNavigate } from "react-router-dom";

const Suggestions:FC = () => {
  const { suggestions } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (suggestions) {
      setUsers(suggestions.users);
    }
  }, [suggestions, users]);

  return (
    <div className="suggestions-list-container" data-testid="suggestions-container">
      <div className="suggestions-header">
        <div className="title-text">Suggestions</div>
      </div>
      <hr />
      <div className="suggestions-container">
        <div className="suggestions">
        {users?.map((user: IUserDocument) => (
            <div data-testid="suggestions-item" className="suggestions-item" key={user?._id}>
              <Avatar
                name={user?.username}
                bgColor={user?.avatarColor}
                textColor="#ffffff"
                size={40}
                avatarSrc={user?.profilePicture}
              />
              <div className="title-text">{user?.username}</div>
              <div className="add-icon">
                <Button
                  label="Follow"
                  className="button follow"
                  disabled={false}
                  // handleClick={() => followUser(user)}
                />
              </div>
            </div>
          ))}
        </div>
        {users.length > 8 && (
          <div className="view-more" onClick={() => navigate('/app/social/people')}>
            View More
          </div>
        )}
      </div>

    </div>
  )
}


export default Suggestions
