"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import GhepLop from "./_gheplop/gheplop";
import LopMonHoc from "./_lopmonhoc/lopmonhoc";
import TKB from "./_tkb/tkb";
import { useQuery } from "@tanstack/react-query";
import DuyetDangKy from "./_duyetdangky/duyetdangky";

const Content = ({ role }) => {
  // console.log(role.is_dao_tao);

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
        {role.is_dao_tao && (
          <Tab key="gheplop" title="Ghép lớp">
            <GhepLop />
          </Tab>
        )}
        {/* {role.is_dao_tao && (
          <Tab key="lopmonhoc" title="Lớp môn học">
            <LopMonHoc />
          </Tab>
        )} */}
        {role.is_dao_tao && (
          <Tab key="tkb" title="Thời khoá biểu">
            <TKB />
          </Tab>
        )}
        {role.is_dao_tao_duyet && (
          <Tab key="duyetdangky" title="Duyệt đăng ký">
            <DuyetDangKy />
          </Tab>
        )}
        {/* {role.is_dao_tao_duyet && (
          <Tab key="phongtrong" title="Phòng trống"></Tab>
        )} */}
      </Tabs>
    </div>
  );
};

export default Content;
