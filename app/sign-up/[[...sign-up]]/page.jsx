import { auth } from "@clerk/nextjs/server";
import Content from "./content";
import { redirect } from "next/navigation";
const Page = async () => {
  const { userId } = await auth();
  if (userId) redirect("/");
  return <Content />;
};

export default Page;
