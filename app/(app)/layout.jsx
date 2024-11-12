import Footer from "../_hardComponents/footer";
import Header from "../_hardComponents/header";
import Search from "../_hardComponents/search";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <main className="pr-[10vw] pl-[10vw] min-h-[82vh]">
        <div className="flex flex-col gap-3">
          <Search />
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
