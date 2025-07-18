import { Router } from "express";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { roleEnum } from "../shared/enum/roleEnum.js";

const loginRouterOld = Router();

loginRouterOld.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(
    "Backend received userName:",
    userName,
    "and password (for debug, remove later):",
    password
  );

  try {
    console.log("im inside the loin post");
    if (!userName || !password) {
      res.status(400).json({ message: "username/password not valid duh",success: false });
      return;
    }
    const currentUser = await User.findOne({
      where: { userName: userName },
    });
    console.log("currentUser", currentUser);
    if (!currentUser) {
      res.status(401).json({ message: "user not found",success: false });
      return;
    } else {
      const passValid = password === currentUser.password;
      if (!passValid) {
        res.status(401).json({ message: "Invalid credentials." ,success: false });
        console.log("passvalid", passValid);
        return;
      }
      console.log("Login successful for user:", userName);
      const userResponse = {
        userId: currentUser.userId,
        userName: currentUser.userName,
        subscriberName: currentUser.subscriberName,
        userStatus: currentUser.userStatus,
        role: currentUser.role,
      };
      let routePath = "";

      console.log("found current user!", userResponse.role, currentUser.role);
      console.log(userResponse.role);
      if (userResponse.role === roleEnum.Subscriber) {
        routePath = "/subscriber";
      } else if (userResponse.role === roleEnum.level1approver) {
        routePath = "/levelOne";
      } else if (userResponse.role === roleEnum.level2approver) {
        routePath = "/levelTwo";
      }
      res.status(200).json({ user: userResponse, routePath,success: true });
    }
  } catch (error) {
    console.error("error in post user create", error);
    res.status(500).json({ message: " server error post", error: error,success: false });
    return;
  }
});
