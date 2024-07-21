import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const UserInfo = () => {
  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <div className="font-semibold text-gray-500">User Info</div>
      <div className="space-y-2 text-gray-500">
        <div className="flex items-center gap-2 ">
          <FaHeart />
          <div className="flex-1">
            Live in{" "}
            <span className="font-semibold text-black">Hanoi, Vietnam</span>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <FaHeart />
          <div className="flex-1">
            From <span className="font-semibold text-black">Hai Duong</span>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <FaHeart />
          <div className="flex-1">
            High school{" "}
            <span className="font-semibold text-black">THPT Kinh Mon</span>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <FaHeart />
          <div className="flex-1">
            University <span className="font-semibold text-black">HUST</span>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <FaHeart />
          <div className="flex-1">
            Works at{" "}
            <span className="font-semibold text-black">King Store</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaHeart />
          <div className="flex-1">Single</div>
        </div>
        <div className="border-t pt-2 text-xs space-y-1">
          <div className="flex items-center gap-2 ">
            <FaHeart />
            <div className="flex-1">Joined {new Date().toDateString()}</div>
          </div>
          <a href="/" className="flex items-center gap-2 text-link">
            <FaHeart />
            <div className="flex-1">exem.com</div>
          </a>
        </div>
        <Button type="button" size={"sm"} className="w-full">
          Following
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
