import { useAuth } from "@clerk/nextjs";
import Content from "./content";
import { redirect } from "next/navigation";
const Page = () => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) redirect("/");
  return <Content />;
};

export default Page;
