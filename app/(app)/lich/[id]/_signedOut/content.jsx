"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
// import { Pagination } from "@nextui-org/pagination";
// import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useMemo, useState } from "react";

const NotSignedIn = ({ calendar }) => {
  const searchParams = useSearchParams();
  // console.log(calendar);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h5>Thông tin lớp học</h5>
        <Table
          isStriped
          aria-label="Thong tin lop hoc"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Mã lớp</TableColumn>
            <TableColumn>Môn</TableColumn>
            <TableColumn>Tổng số tiết</TableColumn>
            <TableColumn>Khối lượng dự kiến</TableColumn>
            <TableColumn>Khối lượng thực hiện</TableColumn>
            <TableColumn>ngôn ngữ</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link
                  href={`/lop/${calendar.lop_mon_hoc.id}${
                    searchParams.get("hocky") && searchParams.get("namhoc")
                      ? `?hocky=${searchParams.get(
                          "hocky"
                        )}&namhoc=${searchParams.get("namhoc")}`
                      : ""
                  }`}
                  // className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {calendar.lop_mon_hoc.ma_lop}
                </Link>
              </TableCell>
              <TableCell>{calendar.lop_mon_hoc.ten_mon_hoc}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.tong_so_tiet}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.khoi_luong_du_kien}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.khoi_luong_thuc_hien}</TableCell>
              <TableCell>{calendar.lop_mon_hoc.ngon_ngu}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2">
        <h5>Thông tin giờ học</h5>
        <Table
          isStriped
          aria-label="Thong tin gio hoc"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>Giảng viên</TableColumn>
            <TableColumn>Phòng</TableColumn>
            <TableColumn>loại</TableColumn>
            <TableColumn>Số tiết</TableColumn>
            <TableColumn>Số sinh viên có mặt</TableColumn>
            <TableColumn>Số sinh viên vắng</TableColumn>
            <TableColumn>Giờ học</TableColumn>
            <TableColumn>Trạng thái</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link
                  href={`/giang_vien/${calendar.gio_hoc.giang_vien_id}${
                    searchParams.get("hocky") && searchParams.get("namhoc")
                      ? `?hocky=${searchParams.get(
                          "hocky"
                        )}&namhoc=${searchParams.get("namhoc")}`
                      : ""
                  }`}
                  // className="hover:underline text-[#0083C2] cursor-pointer"
                >
                  {calendar.gio_hoc.ho_ten}
                </Link>
              </TableCell>
              <TableCell>{calendar.gio_hoc.phong}</TableCell>
              <TableCell>{calendar.gio_hoc.type_status}</TableCell>
              <TableCell>{calendar.gio_hoc.so_tiet}</TableCell>
              <TableCell>{calendar.gio_hoc.sv_co_mat}</TableCell>
              <TableCell>{calendar.gio_hoc.sv_vang_mat}</TableCell>
              <TableCell>{calendar.gio_hoc.alias_state}</TableCell>
              <TableCell>{calendar.gio_hoc.alias_status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2">
        <h5>Sinh viên vắng mặt</h5>
        <Table
          isStriped
          aria-label="Sinh vien vang mat"
          classNames={{
            th: ["!bg-[#006FEE]", "text-white"],
            emptyWrapper: ["!text-black"],
            // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
          }}
        >
          <TableHeader>
            <TableColumn>STT</TableColumn>
            <TableColumn>Họ và tên</TableColumn>
            <TableColumn>Mã sinh viên</TableColumn>
            <TableColumn>Lớp hành chính</TableColumn>
            <TableColumn>Tình hình đi học</TableColumn>
            <TableColumn>Số tiết vắng</TableColumn>
            <TableColumn>Phép</TableColumn>
            <TableColumn>Trạng thái</TableColumn>
            <TableColumn>Ghi chú</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Không có sinh viên vắng mặt hoặc đi muộn."}>
            {calendar.vang_mat.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{++index}</TableCell>
                <TableCell>{item.ho_ten}</TableCell>
                <TableCell>
                  <Link
                    href={`/sinh_vien/${item.id}${
                      searchParams.get("hocky") && searchParams.get("namhoc")
                        ? `?hocky=${searchParams.get(
                            "hocky"
                          )}&namhoc=${searchParams.get("namhoc")}`
                        : ""
                    }`}
                  >
                    {item.code}
                  </Link>
                </TableCell>
                <TableCell>{item.ma_lop_hanh_chinh}</TableCell>
                <TableCell>
                  <div className="h-[20px] flex">
                    <div
                      className="bg-red-500 overflow-hidden text-center text-white rounded-l-sm "
                      style={{
                        width: item.tinh_hinh_vang
                          ? item.tinh_hinh_vang + "%"
                          : 0,
                      }}
                    >
                      {/* <span>{item.tinh_hinh_vang + "%"}</span> */}
                    </div>
                    <div
                      className="bg-green-500 text-white text-center rounded-r-sm"
                      style={{ width: 100 - item.tinh_hinh_vang + "%" }}
                    >
                      {/* <span>{100 - item.tinh_hinh_vang + "%"}</span> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.so_tiet_vang}</TableCell>
                <TableCell>{item.phep ? "Có phép" : "Không phép"}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2">
        <h5>Nội dung buổi học</h5>
        <p dangerouslySetInnerHTML={{ __html: calendar.noi_dung }} />
      </div>
      {/* <div className="flex flex-col gap-2">
        <h5>Lịch trình kế hoạch</h5>
      </div> */}
    </div>
  );
};

export default NotSignedIn;
