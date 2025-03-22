async changepassword(req, res) {
    try {
      const { email, oldPassword, newPassword } = req.body;
  
      // Find admin by email
      const admin = await AdminModel.findOne({ email: email });
      if (!admin) {
        return res.send({
          msg: "Invalid email",
          flag: 0
        });
      }
  
      // Verify old password
      if (oldPassword !== decodePassword(admin.password)) {
        return res.send({
          msg: "Incorrect old password",
          flag: 0
        });
      }
  
      // Update to new password
      admin.password = encodePassword(newPassword);
      await admin.save();
  
      res.send({
        msg: "Password updated successfully",
        flag: 1
      });
    } catch (error) {
      console.log(error.message);
      res.send({
        msg: "Internal server error",
        flag: 0
      });
    }
  }
  