// services/BaseService.js
const { connection } = require("../models/allmodels");

class BaseService {
  constructor(modelName) {
    this.model = modelName;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOneByCond(cond) {
    try {
      return await this.model.findOne({ where: cond, raw: true });
    } catch (error) {
      throw error;
    }
  }

  async findAll(opts) {
    try {
      return await this.model.findAll(opts);
    } catch (error) {
      throw error;
    }
  }

  async count(cond) {
    try {
      return await this.model.count({ where: cond });
    } catch (error) {
      throw error;
    }
  }

  async update(data, id) {
    try {
      const [affectedRows, [updatedData]] = await this.model.update(data, {
        where: { id },
        returning: true,
        plain: true,
      });
      if (affectedRows === 0) {
        throw new Error('No rows updated');
      }
      return updatedData;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const result = await this.model.destroy({ where: { id } });
      if (result === 0) {
        throw new Error('No rows deleted');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseService;
