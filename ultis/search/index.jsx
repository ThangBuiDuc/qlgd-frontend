import axios from "axios";

//Get lich hoc trong ngay
export const search = async (data, tenant) => {
  const link = new URL(`${process.env.NEXT_PUBLIC_API_SEARCH}`);
  // console.log(data);
  const res = await axios({
    url: `${link.origin}${
      tenant.hocky && tenant.namhoc
        ? `/hocky/${tenant.hocky}/namhoc/${tenant.namhoc}`
        : ""
    }${link.pathname}?mtype=${data.type ? data.type : ""}${
      data.page ? `&page=${data.page}` : "&page=1"
    }&query=${data.query ? data.query : ""}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
    },
  });

  return res.data;
};
