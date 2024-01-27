import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2 ">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">TVs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2 ">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 mr-5">
            <h3 className="text-base font-bold mb-2 ">About Us</h3>
            <p className="mb-2">
              Established in 2024, KHYAKk started as a passion project among a
              group of like-minded individuals who shared a common love for
              [describe the niche or theme of your products]. Frustrated by the
              lack of options that combined quality, affordability, and style,
              we set out to create a platform that would redefine the way you
              shop online
            </p>
            <p>
              &copy; {new Date().getFullYear()} E-shop. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2 ">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <FaInstagram size={24} />
              </Link>
              <Link href="#">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
