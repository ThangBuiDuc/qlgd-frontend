"use client";
import DanhSachLopMon from "./danh_sach_lop_mon";
import GiangVien from "./giang_vien";
import Lich from "./lich";

const Content = ({ giang_vien }) => {
  return (
    <div className="flex flex-col gap-3">
      <GiangVien data={giang_vien.giang_vien} />
      <DanhSachLopMon data={giang_vien.danh_sach_lop_mon} />
      <Lich data={giang_vien.lichs} />
    </div>
  );
};

export default Content;
