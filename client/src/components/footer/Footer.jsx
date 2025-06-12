import "./footer.css";

const Footer = () => {
  return (
    <div className="footer flex flex-col justify-center items-center bg-[#111111] py-4">
      <div className="foot-copyright flex flex-col items-center gap-[15px] w-[100%] h-full text-[#B2B2B2] text-[14px]">
        <p>
          Copyright @ 2023 - All Right Reserved | made with ❤️ by{" "}
          <p className="text-[#e53637] inline">Supakun Thata</p>
        </p>
      </div>
    </div>
  );
};

export default Footer;
