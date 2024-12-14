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
