import React from "react";
import Image from "next/image";
import STABLE_LOGO from "@/public/stable-logo.png";

function Logo() {
  return <Image alt="The Stable Putting Course" src={STABLE_LOGO} />;
}

export default Logo;
