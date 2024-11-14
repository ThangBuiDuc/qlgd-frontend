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
export const getLopGiangVien = async (token) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_LOP_GIANG_VIEN}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      jwt: `Bearer ${token}`,
    },
  });

  return token ? res.data : res;
};
