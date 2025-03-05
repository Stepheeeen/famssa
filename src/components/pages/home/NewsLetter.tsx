import { Button } from "../../ui/button";

const Newsletter = () => {
  return (
    <section className="bg-[#151414] text-white py-20 px-6 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="text-gray-400 mt-2">
          Stay updated with the latest news and events.
        </p>

        <div className="mt-9 flex flex-col md:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-4 py-3 text-white outline outline-white rounded-lg "
          />
          <Button className="bg-[#FE9A2B] hover:bg-[#e88a1f] text-white px-6 py-6 rounded-lg">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
