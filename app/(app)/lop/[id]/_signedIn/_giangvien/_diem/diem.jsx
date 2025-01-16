"use client";

import {
  capNhatDiemSinhVien,
  getChiTietLopGiangVien2,
  hoanThanhLopHoc,
  tinhDiemChuyenCanSinhVien,
} from "@/ultis/giang_vien";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import Loading from "@/app/_hardComponents/loading";
import { toast } from "sonner";
import Swal from "sweetalert2";

const RenderCell = ({ data, params }) => {
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <>
      <Tooltip content="Sửa điểm" color="success" closeDelay={0}>
        <p className="cursor-pointer" onClick={() => setUpdateModal(true)}>
          {data.grade}
        </p>
      </Tooltip>
      <UpdateModal
        data={data}
        isOpen={updateModal}
        onChange={setUpdateModal}
        params={params}
      />
    </>
  );
};

const UpdateModal = ({ data, isOpen, onChange, params }) => {
  const [score, setScore] = useState(data.grade);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [isMutating, setIsMutating] = useState(false);

  const mutation = useMutation({
    mutationFn: async () =>
      capNhatDiemSinhVien(
        await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV }),
        params.id,
        {
          assignment_id: data.assignment_id,
          enrollment_id: data.enrollment_id,
          grade: score,
        }
      ),
    onSuccess: () => {
      onChange(false);
      setIsMutating(false);
      queryClient.invalidateQueries(["lop_chi_tiet_gv2", params.id]);
      // queryClient.invalidateQueries(["lop_chi_tiet_gv", params.id]);
      toast.success("Cập nhật đầu điểm thành công!", {
        position: "top-center",
      });
    },
    onError: () => {
      setIsMutating(false);
      toast.error("Cập nhật đầu điểm không thành công!", {
        position: "top-center",
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cập nhật điểm &quot;{data.name}&quot; sinh viên &quot;
              {data.hovaten}&quot;
            </ModalHeader>
            <ModalBody>
              <Input
                variant="bordered"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                type="number"
                label={`${data.name}`}
                placeholder={`${data.name}`}
              />
              {/* <Input
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                label="Tên đầu điểm"
                placeholder="Tên đầu điểm"
              />
              <Input
                variant="bordered"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                type="number"
                label="Điểm tối đa"
                placeholder="Điểm tối đa"
              /> */}
            </ModalBody>
            <ModalFooter>
              {isMutating ? (
                <Loading size={"sm"} />
              ) : (
                <>
                  <Button
                    color="primary"
                    onClick={() => {
                      setIsMutating(true);
                      mutation.mutate();
                    }}
                    isDisabled={score.grade < 0}
                  >
                    Cập nhật
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Huỷ
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const Diem = ({ params }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { getToken } = useAuth();
  // const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["lop_chi_tiet_gv2", params.id],
    queryFn: async () =>
      getChiTietLopGiangVien2(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
  });

  const scoreMutation = useMutation({
    mutationFn: async () =>
      tinhDiemChuyenCanSinhVien(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["lop_chi_tiet_gv2", params.id]);
      Swal.fire({
        title: "Tính điểm chuyên cần thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Tính điểm chuyên cần không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  const finishMutation = useMutation({
    mutationFn: async () =>
      hoanThanhLopHoc(
        await getToken({
          template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_GV,
        }),
        params.id
      ),
    onSuccess: () => {
      Swal.fire({
        title: "Hoàn thành lớp học thành công!",
        icon: "success",
        confirmButtonColor: "#006FEE",
        preConfirm: () => {
          router.refresh();
        },
      });
    },
    onError: () => {
      Swal.fire({
        title: "Hoàn thành lớp học không thành công!",
        icon: "error",
        confirmButtonColor: "#006FEE",
      });
    },
  });

  if (isLoading) return <Spinner color="primary" />;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button
          color="primary"
          onClick={() => {
            Swal.fire({
              title: "Thầy/Cô có chắc chắn muốn tính điểm chuyên cần?",
              icon: "warning",
              confirmButtonColor: "#006FEE",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Tính",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () => await scoreMutation.mutateAsync(),
            });
          }}
        >
          Tính điểm chuyên cần (cột điểm đầu tiên)
        </Button>
        <Button
          color="primary"
          onClick={() => {
            Swal.fire({
              title: "Thầy/Cô có chắc chắn muốn hoàn thành lớp học?",
              icon: "warning",
              confirmButtonColor: "#006FEE",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "Hoàn thành",
              cancelButtonText: "Huỷ",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !Swal.isLoading(),
              preConfirm: async () => await finishMutation.mutateAsync(),
            });
          }}
        >
          Hoàn thành lớp học (khoá lớp: Không sửa điểm được)
        </Button>
      </div>
      <Table
        aria-label="Danh sach lop"
        isStriped
        classNames={{
          th: ["!bg-green-200", "text-black"],
          // tr: ["odd:bg-[#fcf8e3]", "even:bg-[#f2dede]"],
        }}
      >
        <TableHeader>
          <TableColumn>Họ và tên</TableColumn>
          <TableColumn>Tình hình đi học</TableColumn>
          {data?.headers?.map((item) => (
            <TableColumn
              key={item.assignment_id}
            >{`${item.assignment_name} (${item.points})`}</TableColumn>
          ))}
          <TableColumn>Điểm quá trình</TableColumn>
          {/* <TableColumn></TableColumn> */}
        </TableHeader>
        <TableBody>
          {data.results.map((item) => (
            <TableRow key={item.enrollment_id}>
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
              {item.submissions.map((el) =>
                el.name === "Điểm chuyên cần" ? (
                  <TableCell key={`${el.assignment_id}${el.code}`}>
                    {el.grade}
                  </TableCell>
                ) : (
                  <TableCell key={`${el.assignment_id}${el.code}`}>
                    <RenderCell data={el} params={params} />
                  </TableCell>
                )
              )}
              <TableCell>{item.diem_qua_trinh}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Diem;
