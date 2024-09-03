import React from "react";
import Image from "next/image";

const contactinfo = () => {
  return (
    <div className="p-5 rounded-lg shadow-md max-w-7xl mx-auto mt-10">
      <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-1">
        <div className="flex justify-center items-center">
          <Image
            src="/chat.png"
            width={150}
            height={150}
            alt="Picture of Contact"
            className="mx-auto"
          />
        </div>
        <div>
          <p className="text-base md:text-lg leading-6">
            Offering suggestions to Upload Files DS enhances the cloud storage
            and sharing experience for all users by contributing to
            improvements. This platform prioritizes security, encrypting all
            data transfers with SSL/TLS, and offers a comprehensive File Manager
            for easy folder organization and file sharing. Its commitment to
            data privacy ensures user information remains protected and not
            shared with third parties. Providing feedback helps shape a better,
            more secure cloud sharing environment for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default contactinfo;
