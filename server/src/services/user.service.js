import prisma from "../prismaClient/prismaClient.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js"
export const updateProfileService = async ({
  userId,
  body,
  file,
}) => {
  const {
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
    isGstRegistered,
    gstNumber,
  } = body;

  let logo = null;

  if (file) {
    const uploadedImage = await uploadToCloudinary(
      file,
      "company-logos"
    );

    logo = uploadedImage.secure_url;
  }


  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      phone,

      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,

      isGstRegistered:
        isGstRegistered === "true",

      gstNumber:
        isGstRegistered === "true"
          ? gstNumber
          : null,

      ...(logo && {
        logo,
      }),

      profileCompleted: true,
    },
    select: {
      id: true,
      name: true,
      email: true,

      companyName: true,

      phone: true,

      addressLine1: true,
      addressLine2: true,
      city: true,
      state: true,
      country: true,
      postalCode: true,

      isGstRegistered: true,
      gstNumber: true,

      logo: true,

      profileCompleted: true,
    },
  });

  return updatedUser;
};