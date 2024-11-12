"use client";

import BuoiHoc from "./buoi_hoc";
import DanhSachLopMon from "./danh_sach_lop_mon";
import SinhVien from "./sinh_vien";

const Content = ({ sinh_vien }) => {
  //   console.log(sinh_vien);
  return (
    <div className="flex flex-col gap-3">
      <SinhVien data={sinh_vien.sinh_vien} />
      <DanhSachLopMon data={sinh_vien.danh_sach_lop_mon} />
      <BuoiHoc data={sinh_vien.cac_buoi_hoc} />
    </div>
  );
};

export default Content;
