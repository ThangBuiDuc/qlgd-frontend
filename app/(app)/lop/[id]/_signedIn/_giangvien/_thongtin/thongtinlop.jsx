"use client";
import Loading from "@/app/_hardComponents/loading";
import { getChiTietLopGiangVien } from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
// import { useParams } from "next/navigation";

const ThongTinLop = ({ chi_tiet_lop, is_lich, params }) => {
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  // const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [
      "lop_chi_tiet_gv",
      params.id,
      searchParams.get("hocky"),
      searchParams.get("namhoc"),
    ],
    queryFn: async () =>
      getChiTietLopGiangVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        params.id,
        { hocky: searchParams.get("hocky"), namhoc: searchParams.get("namhoc") }
      ),
    ...(is_lich ? {} : { initialData: chi_tiet_lop }),
  });

  // console.log(data);
  if (isLoading) return <Loading />;

  return (
    <Table
      isStriped
      aria-label="Danh sach lop"
      classNames={{
        th: ["!bg-[#006FEE]", "text-white"],
        // //tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>Họ và tên</TableColumn>
        <TableColumn>Tình hình đi học</TableColumn>
        {data?.headers?.map((item) => (
          <TableColumn
            key={item.assignment_group_id}
          >{`${item.group_name} (${item.weight}%)`}</TableColumn>
        ))}
        <TableColumn>Điểm quá trình</TableColumn>
      </TableHeader>
      <TableBody>
        {data.results.map((item) => (
          <TableRow key={item.enrollment_group_id}>
            <TableCell>
              {item.hovaten}
              <br />
              {item.code}
              <br />
              {item.ma_lop_hanh_chinh}
            </TableCell>
            <TableCell>
              <div className="h-[20px] flex">
                <div
                  className="bg-green-500 text-white text-center rounded-l-sm"
                  style={{ width: 100 - item.tinhhinh + "%" }}
                >
                  <span>{100 - item.tinhhinh + "%"}</span>
                </div>
                <div
                  className="bg-red-500 overflow-hidden text-center text-white rounded-r-sm"
                  style={{ width: item.tinhhinh ? item.tinhhinh + "%" : 0 }}
                >
                  <span>{item.tinhhinh + "%"}</span>
                </div>
              </div>
            </TableCell>
            {item.group_submissions.map((el, index) => (
              <TableCell key={index}>{el.grade}</TableCell>
            ))}
            <TableCell>{item.diem_qua_trinh}</TableCell>
            {/* <TableCell>1</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ThongTinLop;
