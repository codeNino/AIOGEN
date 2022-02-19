import React from "react";
import { Logo4 } from "../../assets";
import "./Footer.css";

function Footer() {
  return (
    <>
      {/* footer */}
      <footer className="landing-footer mt-20 grid grid-cols-3 gap-7 text-white">
        <div>
          <img className=" mt-11 w-28 ml-36 " src={Logo4} alt="" />
          <div className=" text-center pt-8 px-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed vero
            porro necessitatibus consectetur perferendis doloremque saepe, ea
            maxime delectus magni animi excepturi. Libero, nihil officia.
            Incidunt dolores quam neque quisquam.
          </div>
        </div>

        <div className="company text-center">
          <header className="font-semibold text-2xl mt-11 ">Company</header>
          <div className="grid gap-2 pt-8">
            <div>About</div>
            <div>Support</div>
            <div>Contact us</div>
            <div>Lorem</div>
            <div>Ipsum</div>
          </div>
        </div>

        <div className="contact-us pr-2 text-left">
          <header className="font-semibold text-2xl mt-11 ">Contact Us</header>
          <div className="grid gap-2 pt-8">
            <div>
              Address: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </div>
            <div>Phone: (234) 123-1234</div>
            <div>Fax: (234) 123-1234</div>
            <div>Email: loremipsum@loremipsum.org</div>
          </div>

          {/* <div className="socials">
            <div>f</div>
            <div>t</div>
            <div>ig</div>
            <div>Li</div>
          </div> */}
        </div>
      </footer>
    </>
  );
}

export { Footer };
