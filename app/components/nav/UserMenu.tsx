"use client";

import { Avatar } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    console.log(`open ? =${isOpen}`);

    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="
        p-2
        border-[1px]
        border-slate-300
        flex
        flex-row
        item-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-700
      ">
          <Avatar sx={{ bgcolor: blue[700] }} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="
        absolute
        flex
        flex-col
        rounded-md
        shadow-md
        bg-white
        overflow-hidden
        right-0
        top-15
        text-sm
        cursor-pointer
        w-[170px]
      ">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem children="Your Items" onClick={toggleOpen} />
                </Link>
                <Link href="/admin">
                  <MenuItem children="Admin Dashboard" onClick={toggleOpen} />
                </Link>
                <hr />
                <MenuItem
                  children="Logout"
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                />
              </div>
            ) : (
              <>
                {" "}
                <div>
                  <Link href="/login">
                    <MenuItem
                      children="Login"
                      onClick={() => {
                        console.log("here");
                        toggleOpen();
                      }}
                    />
                  </Link>
                  <Link href="/register">
                    <MenuItem children="Register" onClick={toggleOpen} />
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {isOpen && <BackDrop onClick={toggleOpen} />}
      {/* {isOpen ? <BackDrop onClick={toggleOpen} /> : null} */}
    </>
  );
};

export default UserMenu;
