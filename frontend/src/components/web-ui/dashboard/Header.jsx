import { useRecoilValue } from "recoil";
import Avatar from "../../display/Avatar";
import { userAtom } from "@utils/atom";
import { Link } from "react-router-dom";
import Button from "@components/input/Button";
import MenuButton, { Menu, MenuItem } from "@components/navigation/Menu";
import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Header() {
  const user = useRecoilValue(userAtom);

  return (
    <header className=" flex items-center justify-between px-5 py-4">
      <div>   
        <h1 className="text-xl font-bold">PayTM App</h1>
      </div>
      <div className="flex items-center space-x-2">
        <div>
          <span>Hello, {user.firstname}</span>
        </div>
        
        <Profile name={user.firstname} />
      </div>
    </header>
  );
}

function Profile({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuButton
      buttonContent={
        <Avatar text={name} className={"transition group-hover:bg-slate-200"} />
      }
      className={
        "group rounded-full outline outline-1 outline-cyan-800/50 transition-all hover:outline-1 hover:outline-cyan-800"
      }
      handleClick={() => setIsOpen(!isOpen)}
    >
      <Menu show={isOpen}>
        <MenuItem
          to={"/profile"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          }
        >
          Profile
        </MenuItem>
        <MenuItem
          to={"/signout"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
          }
        >
          Sign out
        </MenuItem>
      </Menu>
    </MenuButton>
  );
}
