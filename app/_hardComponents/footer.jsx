import React from "react";

const Footer = () => {
  return (
    <footer className="p-3 h-fit md:h-[4vh] md:pl-[5vw] md:pr-[5vw] lg:pl-[10vw] lg:pr-[10vw] border-solid border-t-1 bg-gray-50">
      <div className="flex flex-col">
        <p className="text-sm font-semibold">
          Đại học Quản lý và Công nghệ Hải Phòng 2024
        </p>
        <p className="text-sm font-semibold">Remaster by Bui Duc Thang</p>
      </div>
    </footer>
  );
};

export default Footer;
