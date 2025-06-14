import { authenticate as ldapAuth } from "../Services/Ldapservice.js";
import UserModel from "../models/User.js"; // Your DB user model
import bcrypt from "bcrypt"; // if you store hashed passwords
import jwt from "jsonwebtoken";

export async function signupController(req, res) {
  const {
    username,
    password,
    email,
    fullName,
    isLdapEnabled = false,
    role = "user",
  } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    let hashedPassword = null;

    if (!isLdapEnabled) {
      if (!password) {
        return res
          .status(400)
          .json({ error: "Password required for non-LDAP users" });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      fullName,
      isLdapEnabled,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      user: { username, email, role, isLdapEnabled },
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}

export async function loginController(req, res) {
  try {
    const { username, password } = req.body;
    console.log(username);

    const user = await UserModel.findOne({ username });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isLdapEnabled) {
      // Authenticate via LDAP
      try {
        const ldapResult = await ldapAuth(username, password);

        // Optionally generate token
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET || "your_jwt_secret",
          { expiresIn: "1h" }
        );

        return res.json({
          message: "Authenticated via LDAP",
          token,
          user: {
            username: user.username,
            role: user.role,
            dn: ldapResult,
          },
        });
      } catch (err) {
        return res.status(401).json({
          error: "Invalid username or password",
          details: err?.message || "LDAP authentication failed",
        });
      }
    } else {
      // Authenticate via local password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Optionally generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Authenticated via local server",
        token,
        user: {
          username: user.username,
          role: user.role,
        },
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
  