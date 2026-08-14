import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const secret = process.env.JWT_SECRET || "supersecretjwtkey_algonerd_2026";
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  if (res) {
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  return token;
};

export const clearTokenCookie = (res) => {
  if (res) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  }
};
