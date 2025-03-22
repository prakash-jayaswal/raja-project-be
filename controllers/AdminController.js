const { encodePassword, decodePassword } = require("../helper");
const AdminModel = require("../models/AdminModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const keysecret = process.env.SECRET_KEY

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS
  }
})

const AdminController = {




  async register(req, res) {
    try {
      const { name, email, password, contact } = req.body;
      const adminExisct = await AdminModel.findOne(
        {
          email: email
        }
      ).countDocuments();
      if (adminExisct == 0) {
        const admin = new AdminModel({
          name,
          email,
          password: encodePassword(password),
          contact
        })
        await admin.save();
        res.send({
          msg: "Admin created",
          flag: 1
        })
      } else {
        res.send({
          msg: "Email already exist",
          flag: 0
        })
      }
    } catch (error) {
      console.log(error.message);
      res.send({
        msg: "Internal server error",
        flag: 0
      })
    }
  },



  async login(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await AdminModel.findOne(
        {
          email: email
        }
      )
      if (admin) {
        if (password == decodePassword(admin.password)) {
          res.send({
            msg: "admin login",
            flag: 1,
            data: admin
          })
        } else {
          res.send({
            msg: "Increact password",
            flag: 0
          })
        }
      } else {
        res.send({
          msg: "Invalid email",
          flag: 0
        })
      }

    } catch (error) {
      console.log(error.message);
      res.send({
        msg: "Internal server error",
        flag: 0
      })
    }
  },


  async changepassword(req, res) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });

      if (!admin) {
        return res.send({
          msg: "Invalid email",
          flag: 0
        });
      }

      if (oldPassword !== decodePassword(admin.password)) {
        return res.send({
          msg: "incorrect old password",
          flag: 0
        });
      }

      admin.password = encodePassword(newPassword);
      await admin.save();

      res.send({
        msg: "Password updated successfully",
        flag: 1
      });
    } catch (error) {
      res.send({
        msg: "Internal server error",
        flag: 1
      });
    }

  },


  async forgatemail(req, res) {
    console.log(req.body);

    const { email } = req.body;

    if (!email) {
      res.status(401).josn(
        {
          status: 401,
          msg: "enter your email"

        })
    }
    try {
      const userFind = await AdminModel.findOne({ email: email });

      const token = jwt.sign({ _id: userFind._id }, keysecret, {
        expiresIn: "42000s"
      });

      const setuserToken = await AdminModel.findByIdAndUpdate({ _id: userFind._id }, { verifytoken: token }, { new: true });
      // console.log("token",token);
      // console.log('setuserToken',setuserToken);
      if (setuserToken) {
        const mailOptions = {
          from: process.env.EMAIL_ID,
          to: email,
          subject: "sending Email for password reset",
          text: `this link valid for 10 mintus http://localhost:5173/admin/forgateEmailPassword/${userFind.id}/${setuserToken.verifytoken}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(401).josn({
              status: 401,
              msg: "email not send"
            })
          } else {
            console.log('Email send', info.response);
            res.status(401).josn({
              status: 200,
              msg: "Email send seccesfully"
            })
          }
        })
      }
    } catch (error) {
      res.send(401).josn({
        status: 401,
        msg: "invalid user"
      })
    }
  },

  async forgatPassword(req, res) {
    const { id, token } = req.params;
    // console.log(id,token);
    try {
      const validuser = await AdminModel.findOne({ _id: id, verifytoken: token });
      // console.log(validuser);
      const verifytoken = jwt.verify(token, keysecret);
      //  console.log(verifytoken);
      if (validuser && verifytoken._id) {
        res.status(201).json({
          status: 201,
          msg: "user update successfully",
          validuser

        })
      } else {
        res.status(401).josn({
          status: 401,
          msg: "user not exist"
        })
      }


    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        msg: "Internal server error"
      });
    }
  },


  async postforgatPassword(req, res) {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
      const validuser = await AdminModel.findOne({ _id: id, verifytoken: token });

      if (!validuser) {
        return res.status(401).json({
          status: 401,
          msg: "User does not exist"
        });
      }

      const verifytoken = jwt.verify(token, keysecret);

      if (validuser && verifytoken._id) {
        const newPassword = encodePassword(password);
        validuser.password = newPassword;
        validuser.verifytoken = null;
        await validuser.save();

        res.status(201).json({
          status: 201,
          msg: "Password updated successfully"
        });
      } else {
        res.status(401).json({
          status: 401,
          msg: "Invalid token or user does not exist"
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        msg: "Internal server error"
      });
    }
  }
}
module.exports = AdminController;



