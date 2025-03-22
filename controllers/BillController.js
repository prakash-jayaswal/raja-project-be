const BillModel = require("../models/BillModel");

const BillController = {
  async read(req, res) {
    try {
      const bills = await BillModel.find();
      res.status(200).json({
        msg: "Bills fetched successfully",
        flag: 1,
        data: bills,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  async create(req, res) {
    try {
      const { fullName, email, company, position } = req.body;
      const image = req.files?.image || null;

      let imageName = null;
      if (image) {
        const desti = "./public/images/category/" + image.name;
        await new Promise((resolve, reject) => {
          image.mv(desti, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        imageName = image.name;
      }

      const newBill = new BillModel({
        fullName,
        email,
        company,
        position,
        image_name: imageName,
      });

      const savedBill = await newBill.save();

      res.status(200).json({
        msg: "Bill created successfully",
        flag: 1,
        data: savedBill,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};

module.exports = BillController;
