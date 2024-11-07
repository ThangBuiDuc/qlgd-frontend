import axios from "axios";

//Get lich hoc trong ngay
export const search = async (data) => {
  // console.log(data);
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_SEARCH}?mtype=${
      data.type ? data.type : ""
    }${data.page ? `&page=${data.page}` : "&page=1"}&query=${
      data.query ? data.query : ""
    }`,
    method: "get",
    headers: {
      "content-type": "Application/json",
    },
  });

  return res.data;
};
