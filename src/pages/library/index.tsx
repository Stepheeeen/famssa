import Navbar from "../../components/custom/Navbar";
import Newsletter from "../../components/pages/home/NewsLetter";
import PDFLibrary from "../../components/pages/pdf";

const index = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-[9.5%]">
        <PDFLibrary />
        <Newsletter />
      </main>
    </>
  );
};

export default index;
