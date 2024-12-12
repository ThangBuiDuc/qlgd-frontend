"use client";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useState } from "react";
// import RichTextEditor, { BaseKit } from "reactjs-tiptap-editor";
// import "reactjs-tiptap-editor/style.css";

const options = [
  { key: "vietnamse", label: "Tiếng Việt" },
  { key: "english", label: "Tiếng Anh" },
  { key: "chinese", label: "Tiếng Trung Quốc" },
  { key: "baitap", label: "Bài tập" },
];

// const extensions = [
//   BaseKit.configure({
//     // Show placeholder
//     placeholder: {
//       showOnlyCurrent: true,
//     },

//     // Character count
//     characterCount: {
//       limit: 50_000,
//     },
//   }),
// ];

const ThietLap = ({ lop, params }) => {
  const [edit, setEdit] = useState(false);
  const [soTietLyThuyet, setSoTietLyThuyet] = useState(
    lop.settings.so_tiet_ly_thuyet
  );
  const [soTietThucHanh, setSoTietThucHanh] = useState(
    lop.settings.so_tiet_thuc_hanh
  );
  const [soTietTuHoc, setSoTietTuHoc] = useState(lop.settings.so_tiet_tu_hoc);
  const [soTietBaiTap, setSoTietBaiTap] = useState(
    lop.settings.so_tiet_bai_tap
  );
  const [language, setLanguage] = useState();
  const [lichTrinhDuKien, setLichTrinhDuKien] = useState(
    lop.settings.lich_trinh_du_kien
  );
  const [deCuongChiTiet, setDeCuongChiTiet] = useState(
    lop.settings.de_cuong_chi_tiet
  );
  console.log(lop);
  return (
    <div className="flex gap-3 flex-col">
      {edit ? (
        <div className="flex gap-1">
          <Button color="primary" className="w-fit">
            Cập nhật
          </Button>
          <Button
            color="warning"
            className="w-fit"
            onClick={() => setEdit(false)}
          >
            Huỷ
          </Button>
        </div>
      ) : (
        <Button color="success" className="w-fit" onClick={() => setEdit(true)}>
          Sửa
        </Button>
      )}
      <Table
        aria-label="Thong so lop"
        isStriped
        classNames={{
          th: ["!bg-green-200", "text-black"],
          // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Thông số</TableColumn>
          <TableColumn>Giá trị</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Mã lớp:</TableCell>
            <TableCell>{lop.ma_lop}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tên môn học:</TableCell>
            <TableCell>{lop.ten_mon_hoc}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sĩ số:</TableCell>
            <TableCell>{lop.si_so}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số tiết lý thuyết:</TableCell>
            <TableCell>{lop.settings.so_tiet_ly_thuyet}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số tiết thực hành:</TableCell>
            <TableCell>{lop.settings.so_tiet_thuc_hanh}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số tiết tự học:</TableCell>
            <TableCell>{lop.settings.so_tiet_tu_hoc}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số tiết bài tập:</TableCell>
            <TableCell>{lop.settings.so_tiet_bai_tap}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ngôn ngữ:</TableCell>
            <TableCell>{lop.settings.language}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lịch trình dự kiến:</TableCell>
            <TableCell>{lop.settings.lich_trinh_du_kien}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Đề cương chi tiết:</TableCell>
            <TableCell>{lop.settings.de_cuong_chi_tiet}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <RichTextEditor
        output="html"
        content={lichTrinhDuKien}
        onChangeContent={(value) => setLichTrinhDuKien(value)}
        extensions={extensions}
      /> */}
    </div>
  );
};

export default ThietLap;
