// backend/routes/auth.ts
import { Router } from "express";
import User from "../models/Users.js";
import { roleEnum } from "../shared/enum/roleEnum.js";

const loginRouter = Router();

loginRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    if ( !userName || !password) {
      res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
      return;
    }

    const currentUser = await User.findOne({
      where: { userName: userName },
    });
    const passValid = password === currentUser?.password;

    if (!currentUser) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    } else if (!passValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    } else {
      // Determine route path based on role
      let routePath = "";
      if (currentUser.role === roleEnum.Subscriber) {
        routePath = "/subscriber";
      } else if (currentUser.role === roleEnum.level1approver) {
        routePath = "/levelOne";
      } else if (currentUser.role === roleEnum.level2approver) {
        routePath = "/levelTwo";
      }
      const userResponse = {
        id: currentUser?.userId.toString(), // NextAuth.js expects 'id' as string
        userId: currentUser?.userId, // This is a number from your model
        userName: currentUser?.userName,
        userStatus: currentUser?.userStatus,
        role: currentUser?.role, // This is a number from your model
        routePath: routePath,
      };
      res.status(200).json({
        success: true,
        user: userResponse,
      });
    }
  } catch (error) {
    console.error("Error in user validation:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
});

export default loginRouter;
