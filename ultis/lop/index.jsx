import axios from "axios";

//Get lop
export const getLop = async (token, id, tenant) => {
  const link = new URL(`${process.env.NEXT_PUBLIC_API_GET_LOP}/${id}`);
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}`,
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
