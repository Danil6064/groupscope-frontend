import { useState, useEffect } from "react";
import { ReactComponent as BurgerMenuIcon } from "../icons/burgerMenu.svg";
import { ReactComponent as CloseBurgerMenuIcon } from "../icons/closeBurgerMenu.svg";
import "./navigation-menu.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  // const { logout } = useAuth();

  useEffect(() => {
    const savedPictureUrl = localStorage.getItem("pictureUrl");
    if (savedPictureUrl) {
      setAvatarUrl(savedPictureUrl);
    }
  }, []);

  // function setOpenedState() {
  //   setIsOpen(!isOpen);
  // }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

  return (
    <>
      <button className="bm-open-btn" onClick={() => setIsOpen(true)}>
        <BurgerMenuIcon />
      </button>

      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>

      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="bm-close-btn" onClick={() => setIsOpen(false)}>
            <CloseBurgerMenuIcon />
          </button>
        </div>
        <MenuList onMenuItemClick={() => setIsOpen(false)} />
      </nav>

      <div className="user-avatar">
        <button className="user-avatar-btn" onClick={null}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Аватар користувача"
              className="user-avatar-img"
            />
          )}
        </button>
      </div>
    </>
  );
}

function MenuList({ onMenuItemClick }) {
  const { auth } = useAuth();
  return (
    <div className="menu-list">
      <Link to="/home" className="menu-item" onClick={onMenuItemClick}>
        Головне меню
      </Link>

      {/* <Link to="#" className="menu-item" onClick={onMenuItemClick}>
        Новини
      </Link> */}

      <Link
        to="/successfulStudent"
        className="menu-item"
        onClick={onMenuItemClick}
      >
        Успішність
      </Link>

      {auth.role === "HEADMAN" && (
        <Link
          to="/successfulGroup"
          className="menu-item"
          onClick={onMenuItemClick}
        >
          Успішність групи
        </Link>
      )}
    </div>
  );
}
