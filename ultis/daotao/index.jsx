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
export const timLopMonHoc = async (q) => {
  const res = await axios({
    url: `${
      process.env.NEXT_PUBLIC_API_DAO_TAO
    }/lop_mon_hocs?q=${q.toUpperCase()}`,
    method: "GET",
    headers: {
      "content-type": "Application/json",
      // jwt: `Bearer ${token}`,
    },
  });

  return res.data.lop_mon_hocs.map((item) => ({
    label: item.text,
    value: item.id,
  }));
};
