import axios from "axios";

//Get lich hoc trong ngay
export const search = async (data) => {
  //   console.log(data);
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_SEARCH}?mtype=${
      data.type ? data.type : ""
    }&page=${data.page ? data.page : ""}&query=${data.q ? data.q : ""}`,
    method: "get",
    headers: {
      "content-type": "Application/json",
    },
  }).catch((err) => console.log(err));

  return res;
};
