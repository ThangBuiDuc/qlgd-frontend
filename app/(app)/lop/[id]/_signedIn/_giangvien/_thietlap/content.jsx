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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useMutation } from "@tanstack/react-query";
import { thietLapThongSoLop } from "@/ultis/giang_vien";
import { toast } from "sonner";
import Loading from "@/app/_hardComponents/loading";
import { useAuth } from "@clerk/nextjs";

const options = [
  { key: "vietnamese", label: "Tiếng Việt" },
  { key: "english", label: "Tiếng Anh" },
  { key: "chinese", label: "Tiếng Trung Quốc" },
  { key: "japanese", label: "Tiếng Nhật" },
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

const ThietLap = ({ lop }) => {
  // const queryClient = useQueryClient();
  const { getToken } = useAuth();
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
  const [language, setLanguage] = useState(new Set([lop.settings.language]));
  const [lichTrinhDuKien, setLichTrinhDuKien] = useState(
    lop.settings.lich_trinh_du_kien
  );
  const [deCuongChiTiet, setDeCuongChiTiet] = useState(
    lop.settings.de_cuong_chi_tiet
  );

  const [isMutating, setIsMutating] = useState(false);
  console.log(lop);

  const mutation = useMutation({
    mutationFn: async () =>
      thietLapThongSoLop(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        {
          id: lop.id,
          lt: soTietLyThuyet,
          th: soTietThucHanh,
          tuhoc: soTietTuHoc,
          bt: soTietBaiTap,
          lang: [...language][0],
          lichtrinh: lichTrinhDuKien,
          decuong: deCuongChiTiet,
        }
      ),
    onSuccess: () => {
      setIsMutating(false);
      setEdit(false);
      toast.success("Thiết lập thông số thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Thiết lập thông số không thành công!", {
        position: "top-center",
      });
    },
  });

  return (
    <div className="flex gap-3 flex-col">
      {isMutating ? (
        <div className="flex justify-start">
          <Loading />
        </div>
      ) : (
        <>
          {edit ? (
            <div className="flex gap-1">
              <Button
                onClick={() => {
                  // console.log("click");
                  setIsMutating(true);
                  mutation.mutate();
                }}
                color="primary"
                className="w-fit"
                isDisabled={
                  !soTietLyThuyet ||
                  !soTietThucHanh ||
                  !soTietTuHoc ||
                  !soTietBaiTap ||
                  language.size === 0
                }
              >
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
            <Button
              color="success"
              className="w-fit"
              onClick={() => setEdit(true)}
            >
              Sửa
            </Button>
          )}
        </>
      )}
      <Table
        isStriped
        aria-label="Thong so lop"
        classNames={{
          th: ["!bg-[#006FEE]", "text-white"],
          // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
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
            <TableCell>
              {!edit ? (
                lop.settings.so_tiet_ly_thuyet
              ) : (
                <Input
                  className="max-w-xs"
                  value={soTietLyThuyet}
                  variant="bordered"
                  onValueChange={(value) => setSoTietLyThuyet(value)}
                  // label="Email"
                  placeholder="Số tiết lý thuyết"
                  type="number"
                />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số tiết thực hành:</TableCell>
            <TableCell>
              {!edit ? (
                lop.settings.so_tiet_thuc_hanh
              ) : (
                <Input
                  className="max-w-xs"
                  value={soTietThucHanh}
                  variant="bordered"
                  onValueChange={(value) => setSoTietThucHanh(value)}
                  // label="Email"
                  placeholder="Số tiết thực hành"
                  type="number"
                />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số tiết tự học:</TableCell>
            <TableCell>
              {!edit ? (
                lop.settings.so_tiet_tu_hoc
              ) : (
                <Input
                  className="max-w-xs"
                  value={soTietTuHoc}
                  variant="bordered"
                  onValueChange={(value) => setSoTietTuHoc(value)}
                  // label="Email"
                  placeholder="Số tiết thực hành"
                  type="number"
                />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Số tiết bài tập:</TableCell>
            <TableCell>
              {!edit ? (
                lop.settings.so_tiet_bai_tap
              ) : (
                <Input
                  className="max-w-xs"
                  value={soTietBaiTap}
                  variant="bordered"
                  onValueChange={(value) => setSoTietBaiTap(value)}
                  // label="Email"
                  placeholder="Số tiết bài tập"
                  type="number"
                />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ngôn ngữ:</TableCell>
            <TableCell>
              {!edit ? (
                lop.settings.language
              ) : (
                <Select
                  selectedKeys={language}
                  onSelectionChange={setLanguage}
                  className="max-w-xs"
                  label="Ngôn ngữ"
                  variant="bordered"
                >
                  {options.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lịch trình dự kiến:</TableCell>
            <TableCell>
              {!edit ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: lop.settings.lich_trinh_du_kien,
                  }}
                />
              ) : (
                <ReactQuill
                  theme="snow"
                  value={lichTrinhDuKien}
                  onChange={setLichTrinhDuKien}
                />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Đề cương chi tiết:</TableCell>
            <TableCell>
              {!edit ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: lop.settings.de_cuong_chi_tiet,
                  }}
                />
              ) : (
                <ReactQuill
                  theme="snow"
                  value={deCuongChiTiet}
                  onChange={setDeCuongChiTiet}
                />
              )}
            </TableCell>
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
