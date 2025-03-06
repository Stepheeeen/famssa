import Navbar from "../../components/custom/Navbar";
import LoginCard from "../../components/pages/admin/Login";

const index = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <main className="mx-auto w-3/4 mt-[9.5%]">
          <LoginCard />
        </main>
      </div>
    </>
  );
};

export default index;
