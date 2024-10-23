import axios from "axios";

export default async function handler(req, res) {
  const { id, magv, fullname } = req.body;

  const status = await axios(`https://api.clerk.dev/v1/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
    data: {
      public_metadata: { magv: `${magv}`, name: `${fullname}` },
    },
  }).then((res) => res.status);

  if (status === 200) return res.status(200).json({ result: "successful" });
  else res.status(400).json({ result: "Failed!" });
}
