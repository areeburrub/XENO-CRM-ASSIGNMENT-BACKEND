import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", (req, res, next) => {
  if (req.query.next) {
    if (req.session) {
      req.session.next = req.query.next as string;
    } else {
      console.error("Session is not available");
    }
  }
  // Call passport authenticate
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

router.get(
  "/google/callback",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login/failed");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const redirectUrl = req?.session?.next || process.env.CLIENT_URL;
        console.log(redirectUrl, req?.session?.next);
        delete req?.session?.next;
        return res.redirect(redirectUrl as string);
      });
    })(req, res, next);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout failed:", err);
    } else {
      console.log("Logout successful");
    }
  });

  res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
});

export default router;
