import { NavbarUserMenu } from "../RouteList/NavbarUserMenu";
import { BsWrenchAdjustableCircle } from "react-icons/bs";

function Navbar() {
  return (
    <div className="relative flex sticky w-full top-0 z-50 justify-center items-center h-20 mx-auto px-4 shadow-sm border-b bg-black bg-opacity-80 bg-clip-padding backdrop-blur-sm font-roboto">
      {/**Logo Seciton */}
      <a
        href="/"
        className="absolute left-4 text-2xl flex items-center justify-between gap-2 font-bold py-8 cursor-pointer"
      >
        <BsWrenchAdjustableCircle className="text-white" />

        <h1 className="text-3xl font-bold font-rubik text-white underline">
          Auto
        </h1>
        <h1 className="text-primary text-3xl font-rubik font-bold">Spec</h1>
      </a>

      {/**User Menu Seciton */}
      <div>
        <ul className="flex justify-center items-center">
          {NavbarUserMenu.map((item) => {
            return (
              <li
                className="p-4 font-bold text-white font-rubik cursor-pointer hover:text-gray-400 px-10"
                key={item.id}
              >
                <a href={item.link}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
