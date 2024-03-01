const Contact = () => {
  return (
    <div className="container mx-auto py-8 w-2/4 text-center items-start justify-center">
      <h1 className="font-cursive text-green text-5xl">Contact Us</h1>
      <p className="text-lg mb-4">We'd love to hear from you!</p>
      <form className="w-[100%]">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>
        <button type="submit" className="mt-3 btn-green">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
