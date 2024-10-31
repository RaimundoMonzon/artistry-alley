import { Category } from "../models/category.js";
import { NotFound } from "../helpers/errorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class CategoryService {
  constructor() {
    this.model = Category;
  }

  async getAll() {
    return this.model.find({});
  }

  async getById({ id }) {
    const category = await this.model.findById(id);

    if (!category) {
      throw new NotFound(msg.categoryNotFound);
    }
    return category;
  }

  async create({ input }) {
    const category = new this.model(input);
    return await category.save();
  }

  async update({ id, input }) {
    const category = await this.model.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!category) {
      throw new NotFound(msg.categoryNotFound);
    }
    return category;
  }

  async delete({ id }) {
    const category = await this.model.findByIdAndDelete(id);
    if (!category) {
      throw new NotFound(msg.categoryNotFound);
    }
  }
}
