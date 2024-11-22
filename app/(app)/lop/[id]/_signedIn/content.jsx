"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import ThongTin from "./_thongtin/thongtin";

import ThietLapNhomDiem from "./_thietlapnhomdiem/thietlapnhomdiem";
import ThongTinLop from "./_thongtin/thongtinlop";
import Diem from "./_diem/diem";
import BoSung from "./_bosung/content";
import TKB from "./_tkb/content";
const NotSignedOut = ({ lop, chi_tiet_lop, lich }) => {
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
            {chi_tiet_lop && <ThongTinLop chi_tiet_lop={chi_tiet_lop} />}
          </div>
        </Tab>
        <Tab key="setting" title="Thiết lập thông số">
          {/* <Lop /> */}
        </Tab>
        <Tab key="scoresetting" title="Thiết lập nhóm điểm">
          <ThietLapNhomDiem params={{ id: lop.id }} />
        </Tab>
        {!lich && (
          <Tab key="score" title="Điểm">
            <Diem params={{ id: lop.id }} />
          </Tab>
        )}
        <Tab key="signmore" title="Đăng ký bổ sung">
          <BoSung params={{ id: lop.id }} />
        </Tab>
        <Tab key="tkb" title="Thời khoá biểu">
          <TKB params={{ id: lop.id }} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default NotSignedOut;
