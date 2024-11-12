"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
const navMenu = [
  {
    path: "/",
    title: "Trang Chủ",
  },
  {
    path: "/huongdan.htm",
    // out_site: true,
    title: "Hướng dẫn sử dụng",
  },
  {
    path: "/daotao",
    title: "Đào tạo",
  },
  {
    path: "/khoa-bomon",
    title: "Khoa/Bộ môn",
  },
  {
    path: "/thanhtra",
    title: "Thanh tra",
  },
];

const Header = () => {
  const clerk = useClerk();
  const { isSignedIn } = useUser();

  return (
    <header className="h-[10vh]  pl-[10vw] pr-[10vw] sticky top-0 border-solid border-b-1 bg-gray-50 z-50">
      <div className="flex h-full justify-between">
        <div className="flex h-full justify-center align-middle gap-4">
          {navMenu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-lg font-semibold hover:text-[#0083C2] self-center"
            >
              {item.title}
            </Link>
          ))}
        </div>
        {isSignedIn ? (
          <button
            onClick={() => {
              clerk.signOut();
            }}
          >
            Đăng xuất
          </button>
        ) : (
          <button
            onClick={() => {
              clerk.redirectToSignIn();
            }}
          >
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
