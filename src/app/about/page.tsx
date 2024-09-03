"use client";

import React from "react";
import Image from "next/image";
import PageTitle from "../Components/PageTitle";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="mb-40 w-full mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle title="Upload Files DS | About Us" />
        <div className="flex justify-center items-center mt-8">
          <h1 className="text-2xl md:text-3xl text-center mb-[-5rem]">
            <strong>ABOUT US</strong>
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-40">
          <div className="flex flex-col items-center mb-5 mt-5 w-full sm:w-[calc(33.333%-20px)] max-w-[calc(33.333%-20px)]">
            <Image
              src="/jhnnn.png"
              width={200}
              height={200}
              alt="Picture of security"
              className="mb-4"
            />
            <p className="text-center">
              Jonathan Zdebski <br />
              CEO, Web Developer
            </p>
          </div>
          <div className="flex flex-col text-base w-full sm:w-4/5 bg-[rgba(240,248,255,0.021)] p-4 rounded-lg mb-40 mx-auto">
            <p>
              <strong>
                With the goal of innovating and renewing technologies available
                in the market,
              </strong>
              We created this project with a special focus on the security and
              privacy of data and files. By choosing Upload Files DS for the
              storage or transfer of your files, you will benefit from a
              robustly fortified cloud platform. Not only does it offer
              logistical and regulatory advantages, but it also reinforces our
              commitment to strict security standards. To ensure the integrity
              and privacy of data exchanged between Upload Files DS and our
              servers, all transmissions are encrypted using SSL/TLS. This added
              layer of security helps protect your information against
              unauthorized access and ensures that your communications remain
              confidential. With these advanced security practices, we are
              committed to offering a file storage solution that not only meets
              the modern needs of digitization but also forms a crucial part of
              a responsible and secure data management strategy. Our integrated
              approach to security, privacy, and efficiency makes Upload Files
              DS a reliable choice for companies and individuals who value the
              protection of their digital information. Together, we can build a
              future where innovation and security go hand in hand.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
