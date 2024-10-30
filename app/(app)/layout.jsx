import Footer from "../_hardComponents/footer";
import Header from "../_hardComponents/header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <main className="pr-[10vw] pl-[10vw] min-h-[82vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
