import axios from "axios";

//Get lich trinh giang day
export const getLichTrinhGiangDay = async (data, tenant) => {
  const link = new URL(
    `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days`
  );
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xu ly di muon
export const diMuon = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/dimuon`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xu ly ve som
export const veSom = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/vesom`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xu ly bo tiet
export const boTiet = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/botiet`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xu ly bao cao
export const baoCao = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/report`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xu ly huy bao cao
export const huyBaoCao = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/unreport`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Cap nhat ghi chu
export const ghiChu = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/update`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Xoá lịch học
export const xoa = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/remove`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Phục hồi
export const phucHoi = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/restore`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Phục hồi
export const xacNhan = async (token, data) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_THANH_TRA}/lich_trinh_giang_days/confirm`,
    method: "POST",
    data,
    headers: {
      "content-type": "Application/json",
      //   authorization: `Bearer ${token}`,
      jwt: `Bearer ${token}`,
    },
  });

  return res.data;
};
