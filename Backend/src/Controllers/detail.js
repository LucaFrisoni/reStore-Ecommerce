const TechSchema = require("../Database/models/Technology");

const detailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await TechSchema.find({ _id: id });
    res.status(200).json({ result: product });
  } catch (error) {
    res.status(400).json({ message: "Error finding product" });
    console.error(error);
  }
};
module.exports = detailProduct;
