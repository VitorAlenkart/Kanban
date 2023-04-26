import { PencilSimple } from "@phosphor-icons/react";

import "./Header.css";
import { useState } from "react";
import { useBoard } from "../context/ContextBoard";
import { Link } from "react-router-dom";

export function Header({ title, isBoardSection }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useBoard();

  function handleEditTitle() {
    setIsEditingTitle(!isEditingTitle);
  }

  function updateIsProfileOpen() {
    setIsProfileOpen(!isProfileOpen);
  }

  return (
    <header className="header">
      <div className="title-header">
        {isEditingTitle ? (
          <form onSubmit={handleEditTitle}>
            <input
              type="text"
              value={currentTitle}
              className="input-edit-header"
              onBlur={handleEditTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              autoFocus
            />
          </form>
        ) : (
          <h1>{currentTitle}</h1>
        )}

        {isBoardSection && (
          <PencilSimple onClick={handleEditTitle} weight="fill" />
        )}
      </div>

      {user ? (
        <div className="profile">
          <button
            type="button"
            onClick={updateIsProfileOpen}
            className="btn-open-profile"
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="img-profile"
            />
          </button>

          {isProfileOpen && (
            <div className="settings-profile">
              <span className="name-settings-profile">
                {user.first_name} {user.last_name}
              </span>
              <Link className="link-settings-profile" to={`/${user.username}`}>
                Perfil
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
}
