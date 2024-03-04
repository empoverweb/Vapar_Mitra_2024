import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-4">
      <div className="flex w-full flex-wrap items-center justify-center bg-blue-gray text-black opacity-50">
        <Typography variant="small" className="font-normal text-inherit p-2 ">
          &copy; {year} NSL.
        </Typography> 
      </div>
    </footer>
  );
} 

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
