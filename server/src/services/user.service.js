import prisma from "../prismaClient/prismaClient.js";
import ApiError from "../utils/ApiError.js";
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

export const getUserProfileService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
      panNumber: true,
      logo: true,
      bankName: true,
      accountHolderName: true,
      accountNumber: true,
      ifscCode: true,
      upiId: true,
    }
  });

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return user;
};


export const updateUserProfileService = async (
  userId,
  profileData
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
    },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found")
  }

  // Check email uniqueness only if email is changed
  if (profileData.email !== existingUser.email) {
    const emailExists = await prisma.user.findFirst({
      where: {
        email: profileData.email,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (emailExists) {
      throw new ApiError(409, "Email address already in use")
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name: profileData.name,
      email: profileData.email,
      companyName: profileData.companyName,
      phone: profileData.phone,

      addressLine1: profileData.addressLine1,
      addressLine2: profileData.addressLine2,
      city: profileData.city,
      state: profileData.state,
      country: profileData.country,
      postalCode: profileData.postalCode,

      isGstRegistered:
        profileData.isGstRegistered,

      gstNumber: profileData.gstNumber || null,
      panNumber: profileData.panNumber || null,

      bankName: profileData.bankName || null,
      accountHolderName:
        profileData.accountHolderName || null,
      accountNumber:
        profileData.accountNumber || null,
      ifscCode: profileData.ifscCode || null,
      upiId: profileData.upiId || null,
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
      panNumber: true,
      logo: true,
      bankName: true,
      accountHolderName: true,
      accountNumber: true,
      ifscCode: true,
      upiId: true,
    },
  });

  return updatedUser;
};