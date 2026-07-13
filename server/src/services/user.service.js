import prisma from "../prismaClient/prismaClient.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js"
export const updateProfileService = async ({
  userId,
  body,
  file,
}) => {
  const { phone, address } = body;

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
      address,

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
      address: true,
      logo: true,
      profileCompleted: true,
    },
  });

  return updatedUser;
};