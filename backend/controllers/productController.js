import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import nodemailer from "nodemailer";
var smtpConfig = {
  service: "gmail",
  // use SSL
  auth: { user: "medigo777@gmail.com", pass: "adfhbsdtrhgrsoqi" },
};

const transporter = nodemailer.createTransport(smtpConfig);
const postProduct = async (req, res, next) => {
  const { name, description, category, price, days } = req.body;
  const id = req.body.id;
  console.log(req.file);
  const image = req.file.path;

  const category_id = await Category.findOne({ category_name: category });
  const offers = [];

  const product = await Product.create({
    name,
    description,
    image,
    price,
    offers,
    category: category_id.category_name,
    days,
  });

  User.findById(id).then((user) => {
    if (user !== null) {
      user.products.push(product._id);
      user.save();
    }
  });

  if (product) {
    return res.status(200).json({
      id: product._id,
      description: product.description,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      days: product.days,
    });
  } else {
    return res.status(400);
  }
};

const getAllProduct = asyncHandler(async (req, res, next) => {
  const allProduct = await Product.find();
  res.status(200).json({ allProduct: allProduct });
});

const getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json({ product: product });
});
const getUserProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const userproductsid = user.products;
  const allproduct = await Product.find();

  const userproducts = await Product.find()
    .where("_id")
    .in(userproductsid)
    .exec();

  res.status(200).json({ userproduct: userproducts });
});

const postOffer = asyncHandler(async (req, res, next) => {
  const productid = req.params.id;
  const product = await Product.findById(productid);
  const { userid, offerprice, username, userEmail, userPhoneNo } = req.body;
  console.log(req.body);
  product.offers.push({
    user: userid,
    userEmail: userEmail,
    userPhoneNo: userPhoneNo,
    offerprice: offerprice,
    username: username,
  });
  product.save();
  res.status(200).json({
    message: "success",
  });
});

const getoffer = asyncHandler(async (req, res, next) => {
  const productid = req.params.id;
  const product = await Product.findById(productid);
  const { offers } = product;
  res.status(200).json({
    offers: offers,
  });
});
const rejectOffer = asyncHandler(async (req, res) => {
  const offerId = req.body.offerId;
  const productId = req.body.productid;

  try {
    const product = await Product.findById(productId);
    product.offers = product.offers.filter(
      (offer) => offer._id.toString() !== offerId.toString()
    );

    await product.save();

    res.status(200).json({ message: "Offer rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const acceptOffer = asyncHandler(async (req, res, next) => {
  const productid = req.params.id;
  const product = await Product.findById(productid);
  const offer_id = req.body.offer_id;
  const correctoffer = product.offers.find((offer) => offer._id == offer_id);

  console.log(correctoffer);
  if (correctoffer) {
    product.sold = true;
    product.offers = [];
    product.offers.push(correctoffer);
    product.price = correctoffer.offerprice;
    product.save();
    const mailOptions = {
      from: "medigo777@gmail.com",
      to: req.body.userData.email,
      subject: "Offer Details",
      html: `
        <html>
          <body>
            <h1>Hello ${req.body.userData.name},</h1>
            <p>Here are the details of the deal:</p>
            <ul>
              <li>User Name: ${correctoffer.username}</li>
              <li>User Email: ${correctoffer.userEmail}</li>
              <li>User Phone Number: ${correctoffer.userPhoneNo}</li>
              <li>Offer Price: ₹${correctoffer.offerprice}</li>
            </ul>
            <h3>You can use these details for further communication.</h3><br />
            <p>Thank you for using RentIT. Have a nice day.</p>
          </body>
        </html>
      `,
    };
    await transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("The email was sent successfully");
      }
    });
    return res.status(200).json({
      message: "offer accepted",
    });
  } else {
    return res.status(400).json({
      message: "no offer found",
    });
  }
});

const userOrders = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.find({ "offers.user": id });
  res.status(200).json({
    product: product,
  });
});

const getMarkSold = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  product.sold = true;
  product.save();
  return res.status(200).json({
    message: "Marked As Sold",
  });
});

export {
  postProduct,
  getAllProduct,
  getProductById,
  getUserProduct,
  postOffer,
  getoffer,
  acceptOffer,
  userOrders,
  rejectOffer,
  getMarkSold,
};
