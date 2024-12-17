"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
// import { useRouter } from "next/navigation";
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
    path: "/khoa",
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
  // const router = useRouter();
  return (
    <header className="pl-[2vw] pr-[2vw] h-fit lg:h-[10vh]  lg:pl-[10vw] lg:pr-[10vw] sticky top-0 border-solid border-b-1 bg-gray-50 z-50">
      <div className=" flex-col lg:flex-row p-2 lg:p-0 flex h-full justify-between gap-4 lg:gap-0">
        <div className="flex-col lg:flex-row flex h-full lg:justify-center lalign-middle gap-2 lg:gap-4">
          {navMenu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-lg font-semibold hover:text-[#0083C2] self-start lg:self-center"
            >
              {item.title}
            </Link>
          ))}
        </div>
        {isSignedIn ? (
          <button
            className="lg:self-center self-start font-semibold"
            onClick={() => {
              clerk.signOut();
              // router.refresh();
            }}
          >
            Đăng xuất
          </button>
        ) : (
          <button
            className="lg:self-center self-start font-semibold"
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
