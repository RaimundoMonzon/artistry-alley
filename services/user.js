import { User } from "../models/user.js"
import { messagesByLang as msg } from "../helpers/messages.js";
import { NotFound } from "../helpers/errorHandler.js";

export class UserService {
    
    constructor () {
        this.model = User;
    }

    async getAll() {
        return this.model.find({});
    }

    async getById({id}) {
        const user = await this.model.findById(id);
        if(!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user;
    }

    async create({input}) {
        const user = new this.model(input);
        return user.save();
    }

    async update({id, input}) {
        const user = await this.model.findByIdAndUpdate(id, input, {new: true});
        if(!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user;
    }

    async delete({id}) {
        const user = await this.model.findByIdAndDelete(id);
        if(!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user;
    }
}