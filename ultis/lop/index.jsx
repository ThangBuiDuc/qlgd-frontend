import axios from "axios";

//Get lich hoc trong ngay
export const getLop = async (token, id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_GET_LOP}/${id}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      ...(token ? { jwt: `Bearer ${token}` } : {}),
      //   authorization: `Bearer ${token}`,
    },
  });

  return res;
};

//Get nhom diem cho lop
export const getNhomDiemLop = async (id) => {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_LOP_GIANG_VIEN}/${id}/assignments`,
    method: "get",
    headers: {
      "content-type": "Application/json",
      // jwt: `Bearer ${token}`,
      //   authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
