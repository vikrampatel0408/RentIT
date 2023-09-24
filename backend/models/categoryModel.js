import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      name: String,
      subcategories: [
        {
          name: String,
          subcategories: [
            {
              name: String,
              // You can continue nesting subcategories as needed
            },
          ],
        },
      ],
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
