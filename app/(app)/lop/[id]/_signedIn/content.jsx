"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import ThongTin from "./_thongtin/thongtin";

import ThietLapNhomDiem from "./_thietlapnhomdiem/thietlapnhomdiem";
import ThongTinLop from "./_thongtin/thongtinlop";
import Diem from "./_diem/diem";
const NotSignedOut = ({ lop, chi_tiet_lop }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        classNames={{
          tabContent: "text-black",
          panel: "[&>div]:shadow-none",
        }}
      >
        <Tab key="main" title="Thông tin chung">
          <div className="flex flex-col gap-5">
            <ThongTin lop={lop} />
            <ThongTinLop data={chi_tiet_lop} />
          </div>
        </Tab>
        <Tab key="setting" title="Thiết lập thông số">
          {/* <Lop /> */}
        </Tab>
        <Tab key="scoresetting" title="Thiết lập nhóm điểm">
          <ThietLapNhomDiem />
        </Tab>
        <Tab key="score" title="Điểm">
          <Diem />
        </Tab>
        <Tab key="signmore" title="Đăng ký bổ sung">
          {/* <Lop /> */}
        </Tab>
        <Tab key="tkb" title="Thời khoá biểu">
          {/* <Lop /> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default NotSignedOut;
