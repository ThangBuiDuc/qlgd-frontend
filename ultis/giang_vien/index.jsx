import axios from "axios";

//Get lich hoc trong ngay
export const getGiangVien = async (id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_GIANG_VIEN}/${id}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};

//Get lich hoc trong ngay
export const getLichTrinhGiangVien = async (token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_LICH_TRINH_GIANG_VIEN}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Get danh sach lop
export const getDanhSachLopGiangVien = async (token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_DANH_SACH_LOP_GIANG_VIEN}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Them nhom diem cho lop
export const themNhomDiemLopGiangVien = async (token, data, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${id}/assignment_groups`,
    method: "post",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Cap nhat nhom diem cho lop
export const capNhatNhomDiemLopGiangVien = async (token, data, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${id}/assignment_groups`,
    method: "put",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xoa nhom diem cho lop
export const xoaNhomDiemLopGiangVien = async (token, data, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${id}/assignment_groups`,
    method: "delete",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Them dau diem cho nhom diem cua lop
export const themDauDiemNhomDiemGiangVien = async (token, data, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${id}/assignments`,
    method: "post",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Cap nhat dau diem cho nhom diem cua lop
export const capNhatDauDiemNhomDiemGiangVien = async (token, data, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${id}/assignments`,
    method: "put",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xoa dau diem cho nhom diem cua lop
export const xoaDauDiemNhomDiemGiangVien = async (token, data, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${id}/assignments`,
    method: "delete",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Get chi tiet lop giang vien
export const getChiTietLopGiangVien = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/group_submissions`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Get chi tiet lop giang vien 2
export const getChiTietLopGiangVien2 = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/submissions2`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Cap nhat diem cho sinh vien
export const capNhatDiemSinhVien = async (token, lop_id, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/submissions2`,
    method: "post",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Tinh diem chuyen can
export const tinhDiemChuyenCanSinhVien = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/submissions/diem_chuyen_can`,
    method: "post",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Tinh diem chuyen can
export const hoanThanhLopHoc = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/finish`,
    method: "post",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Get lich day bo sung
export const getLichBoSungLop = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days/bosung`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Dang ky lich day bo sung
export const dangKyLichBoSung = async (token, lop_id, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days/create_bosung`,
    method: "post",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//cap nhat lich day bo sung
export const capNhatLichBoSung = async (token, lop_id, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days/update_bosung`,
    method: "put",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Xoa lich day bo sung
export const xoaLichBoSung = async (token, lop_id, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days/remove_bosung`,
    method: "delete",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Phuc hoi lich day bo sung
export const phucHoiLichBoSung = async (token, lop_id, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days/restore_bosung`,
    method: "post",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Lay chi tiet lich trinh giang day cua lop
export const getLichTrinhLop = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Lay thong tin diem danh cho lich
export const getDiemDanhLop = async (token, lich_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LICH_GIANG_VIEN}/${lich_id}/attendances`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Lay lich trinh thuc hien cho lich
export const getLichTrinhThucHien = async (token, lop_id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days/content`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Lay lich trinh thuc hien cho lich
export const capNhatDiemDanhHocSinh = async (token, lich_id, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LICH_GIANG_VIEN}/${lich_id}/attendances`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};

//Hoan thanh buoi hoc
export const hoanThanhBuoiHoc = async (token, lop_id, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${lop_id}/lich_trinh_giang_days/complete`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};
