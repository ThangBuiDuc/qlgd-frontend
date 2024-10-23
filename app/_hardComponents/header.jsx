"use client";
import Link from "next/link";
const navMenu = [
  {
    path: "/",
    title: "Trang Chủ",
  },
  {
    path: null,
    out_site: true,
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
  return (
    <header className="h-[10vh] bg-[#0083c2] pl-[10vw] pr-[10vw] sticky top-0">
      <div className="flex h-full justify-between">
        <div className="flex h-full justify-center align-middle">
          {navMenu.map((item, index) =>
            item.out_site ? (
              <Link key={index} href="#" className="text-xl">
                {item.title}
              </Link>
            ) : (
              <Link key={index} href={item.path}>
                {item.title}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
