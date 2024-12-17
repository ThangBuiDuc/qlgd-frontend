import axios from "axios";

//get role truong khoa
export const daoTaoRole = async (token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res;
};

//Tim lop hanh chinh
export const timLopHanhChinh = async (q, loadedOptions, { page }) => {
  const res = await axios({
    url: `${
      process.env.NEXT_PUBLIC_API_DAO_TAO
    }/lop_hanh_chinhs?q=${q.toUpperCase()}&page_limit=30&page=${page}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      // jwt: `Bearer ${token}`,
    },
  });

  return {
    options: res.data.lop_hanh_chinhs.map((item) => ({
      label: item.text,
      value: item.id,
    })),
    hasMore: res.data.nextPage ? true : false,
    additional: {
      page: res.data.nextPage,
    },
  };
};

//Tim lop hanh chinh
export const timLopMonHoc = async (q, loadedOptions, { page }) => {
  const res = await axios({
    url: `${
      process.env.NEXT_PUBLIC_API_DAO_TAO
    }/lop_mon_hocs?q=${q.toUpperCase()}&page_limit=30&page=${page}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      // jwt: `Bearer ${token}`,
    },
  });

  return {
    options: res.data.lop_mon_hocs.map((item) => ({
      label: item.text,
      value: item.id,
    })),
    hasMore: res.data.nextPage ? true : false,
    additional: {
      page: res.data.nextPage,
    },
  };
};

//Get sinh vien lop hanh chinh
export const getSinhVienLopHanhChinh = async (data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_hanh_chinhs`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      // jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Get sinh vien lop hanh chinh
export const getSinhVienLopMonHoc = async (data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Ghep sinh vien vao lop
export const ghepLop = async (data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/move`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xoa sinh vien khoi lop
export const xoaSinhVien = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs`,
    method: "DELETE",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Lay danh sach lop mon hoc
export const getLopMonHoc = async () => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lops`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
    },
  });

  return res.data;
};

//Lay lich lop mon hoc
export const getDaoTaoLichLopMonHoc = async (id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs/${id}/calendars`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
    },
  });

  return res.data;
};

//Tao thoi khoa bieu
export const taoThoiKhoaBieu = async (id, data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs/${id}/calendars/add`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Duyet thuc hien
export const duyetThucHien = async (id, data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs/${id}/calendars/generate`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xoa thoi khoa bieu
export const xoaThoiKhoaBieu = async (id, data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs/${id}/calendars/delete`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Phuc hoi thoi khoa bieu
export const phucHoiThoiKhoaBieu = async (id, data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs/${id}/calendars/restore`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xoa vinh vien thoi khoa bieu
export const xoaVinhVienThoiKhoaBieu = async (id, data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lop_mon_hocs/${id}/calendars/destroy`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Lay lich trinh giang day
export const getDaoTaoLichTrinhGiangDay = async () => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lich_trinh_giang_days`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
    },
  });

  return res.data;
};

//Chap nhan lich dang ky
export const chapNhanLichDangKy = async (data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lich_trinh_giang_days/accept`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Khong chap nhan lich dang ky
export const khongChapNhanLichDangKy = async (data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lich_trinh_giang_days/drop`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Lay danh sach lich da duyet
export const getDaoTaoLichTrinhGiangDayDaDuyet = async () => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lich_trinh_giang_days/daduyet`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
    },
  });

  return res.data;
};

//Kiem tra lich dang ky trung
export const getKiemTraLichDangKyTrung = async (data, token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_DAO_TAO}/lich_trinh_giang_days/check`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};
