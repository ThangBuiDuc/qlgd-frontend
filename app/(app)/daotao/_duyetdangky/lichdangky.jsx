"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const LichDangKy = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5>Danh sách lịch đăng ký</h5>
      <Table
        aria-label="Thoi khoa bieu"
        classNames={{
          th: ["!bg-green-200", "text-black"],
          tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Tuần</TableColumn>
          <TableColumn>Thời gian</TableColumn>
          <TableColumn>Thông tin</TableColumn>
          <TableColumn>Tiết bắt đầu</TableColumn>
          <TableColumn>Phòng</TableColumn>
          <TableColumn>Số tiết</TableColumn>
          <TableColumn>Loại</TableColumn>
          <TableColumn>Giờ học</TableColumn>
          <TableColumn>Thao tác</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.tuan}</TableCell>
              <TableCell>{item.thoi_gian}</TableCell>
              <TableCell>
                {item.giang_vien}
                <br />
                {item.ma_lop}
                <br />
                {item.ten_mon_hoc}
              </TableCell>
              <TableCell>
                {item.alias_state === "Bổ sung" ? (
                  <input type="text" />
                ) : (
                  item.phong
                )}
              </TableCell>
              <TableCell>{item.so_tiet}</TableCell>
              <TableCell>{item.alias_state}</TableCell>
              <TableCell>{item.type_status}</TableCell>
              <TableCell>{item.note}</TableCell>
              <TableCell>
                {/* <div className="flex gap-2">
                  {item.can_generate && (
                    <Tooltip
                      content="Duyệt thực hiện"
                      color="primary"
                      closeDelay={0}
                    >
                      <CircleCheckBig
                        className="cursor-pointer"
                        onClick={() => {
                          Swal.fire({
                            title: "Thầy/Cô có chắc chắn muốn duyệt thực hiện?",
                            icon: "warning",
                            confirmButtonColor: "#006FEE",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Xác nhận",
                            cancelButtonText: "Huỷ",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                            preConfirm: async () =>
                              await generateMutation.mutateAsync(item),
                          });
                        }}
                      />
                    </Tooltip>
                  )}
                  {item.can_remove && (
                    <Tooltip content="Xoá" color="warning" closeDelay={0}>
                      <CircleX
                        className="cursor-pointer"
                        onClick={() => {
                          Swal.fire({
                            title:
                              "Thầy/Cô có chắc chắn muốn xoá thời khoá biểu?",
                            icon: "warning",
                            confirmButtonColor: "#006FEE",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Xác nhận",
                            cancelButtonText: "Huỷ",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                            preConfirm: async () =>
                              await deleteMutation.mutateAsync(item),
                          });
                        }}
                      />
                    </Tooltip>
                  )}
                  {item.can_restore && (
                    <Tooltip content="Phục hồi" color="success" closeDelay={0}>
                      <ArchiveRestore
                        className="cursor-pointer"
                        onClick={() => {
                          Swal.fire({
                            title:
                              "Thầy/Cô có chắc chắn muốn phục hồi thời khoá biểu?",
                            icon: "warning",
                            confirmButtonColor: "#006FEE",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Xác nhận",
                            cancelButtonText: "Huỷ",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                            preConfirm: async () =>
                              await restoreMutation.mutateAsync(item),
                          });
                        }}
                      />
                    </Tooltip>
                  )}
                  <Tooltip
                    content="Xoá vĩnh viễn"
                    color="danger"
                    closeDelay={0}
                  >
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => {
                        Swal.fire({
                          title:
                            "Thầy/Cô có chắc chắn muốn xoá vĩnh viễn thời khoá biểu?",
                          icon: "warning",
                          confirmButtonColor: "#006FEE",
                          showConfirmButton: true,
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",
                          cancelButtonText: "Huỷ",
                          showLoaderOnConfirm: true,
                          allowOutsideClick: () => !Swal.isLoading(),
                          preConfirm: async () =>
                            await destroyMutation.mutateAsync(item),
                        });
                      }}
                    />
                  </Tooltip>
                </div> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LichDangKy;
