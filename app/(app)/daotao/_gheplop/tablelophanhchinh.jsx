"use client";
import Loading from "@/app/_hardComponents/loading";
import { getSinhVienLopHanhChinh } from "@/ultis/daotao";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";

const TableLopHanhChinh = ({
  selectedLopHanhChinh,
  selectedKeys,
  setSelectedKeys,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["sinh_vien_lop_hanh_chinh", selectedLopHanhChinh?.value],
    queryFn: async () =>
      getSinhVienLopHanhChinh({
        ma_lop_hanh_chinh: selectedLopHanhChinh?.value,
      }),
    enabled: !!selectedLopHanhChinh?.value,
  });

  if (isLoading) return <Loading />;

  return (
    <Table
      selectionMode="multiple"
      aria-label="Sinh vien lop hanh chinh"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      classNames={{
        th: ["!bg-green-200", "text-black"],
        tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
      }}
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Mã sinh viên</TableColumn>
        <TableColumn>Họ và tên</TableColumn>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.hovaten}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableLopHanhChinh;
