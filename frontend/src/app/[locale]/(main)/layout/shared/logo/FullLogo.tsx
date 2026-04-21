"use client";
import Image from "next/image";
import Link from "next/link";
const FullLogo = () => {
  return (
    <Link href={"/"}>
      {/* Dark Logo   */}
      <Image
        src={"/images/logos/logo.svg"}
        alt="logo"
        width={152}
        height={29}
        className="block dark:hidden"
      />
      {/* Light Logo  */}
      <Image
        src={"/images/logos/logo.svg"}
        alt="logo"
        width={152}
        height={29}
        className="hidden dark:block"
      />
    </Link>
  );
};

export default FullLogo;
