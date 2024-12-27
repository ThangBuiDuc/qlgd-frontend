"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  const [toggle, setToggle] = useState(false);
  const clerk = useClerk();
  const { isSignedIn } = useUser();
  const [widthView, setWidthView] = useState(document.body.clientWidth);

  useEffect(() => {
    if (window !== undefined) {
      const onresize = function () {
        setWidthView(document.body.clientWidth);
      };
      window.addEventListener("resize", onresize);
    }

    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);

  return (
    <>
      <div className="md:hidden bg-gray-50 flex justify-end p-1">
        <Menu size={40} onClick={() => setToggle((pre) => !pre)} />
      </div>
      {widthView >= 768 ? (
        <header
          className={` pl-[2vw] pr-[2vw] md:h-[10vh]  lg:pl-[10vw] lg:pr-[10vw] sticky top-0 border-solid border-b-1 bg-gray-50 z-50`}
        >
          <div className=" flex-col md:flex-row p-2 md:p-0 flex h-full justify-between gap-4 md:gap-0">
            <div className="flex-col md:flex-row flex h-full md:justify-center lalign-middle gap-2 md:gap-4">
              {navMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-lg font-semibold hover:text-[#0083C2] self-start md:self-center"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            {isSignedIn ? (
              <button
                className="md:self-center self-start font-semibold"
                onClick={() => {
                  clerk.signOut();
                  // router.refresh();
                }}
              >
                Đăng xuất
              </button>
            ) : (
              <button
                className="md:self-center self-start font-semibold"
                onClick={() => {
                  clerk.redirectToSignIn();
                }}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </header>
      ) : (
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <header
                className={` pl-[2vw] pr-[2vw] md:h-[5vh] lg:h-[10vh]  md:pl-[5vw] md:pr-[5vw] lg:pl-[10vw] lg:pr-[10vw] sticky top-0 border-solid border-b-1 bg-gray-50 z-50`}
              >
                <div className=" flex-col md:flex-row p-2 md:p-0 flex h-full justify-between gap-4 md:gap-0">
                  <div className="flex-col md:flex-row flex h-full md:justify-center lalign-middle gap-2 md:gap-4">
                    {navMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        className="text-lg font-semibold hover:text-[#0083C2] self-start md:self-center"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  {isSignedIn ? (
                    <button
                      className="md:self-center self-start font-semibold"
                      onClick={() => {
                        clerk.signOut();
                        // router.refresh();
                      }}
                    >
                      Đăng xuất
                    </button>
                  ) : (
                    <button
                      className="md:self-center self-start font-semibold"
                      onClick={() => {
                        clerk.redirectToSignIn();
                      }}
                    >
                      Đăng nhập
                    </button>
                  )}
                </div>
              </header>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default Header;
