const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <section>
      <div className=" py-6">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <p className="text-center text-xl">
              © {year} Your Mr Rovilay Meals. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
