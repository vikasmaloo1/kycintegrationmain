// const kycService = require("../models/kycservice");

const { connection } = require("../models/allmodels");

class KycService {
  static async create(data) {
    try {
      return await connection.kycService.create(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async findOneByCond(cond) {
    try {
      return await kycService.findOne({ where: cond, raw: true });
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      return await kycService.kycAPI.findAll({ order: [["id", "DESC"]], raw: true });
    } catch (error) {
      throw error;
    }
  }

  static async count(cond) {
    try {
      return await kycService.kycAPI.count({ where: cond });
    } catch (error) {
      throw error;
    }
  }

  static async findAllByCond(opts) {
    try {
      return await kycService.kycAPI.findAll(opts);
    } catch (error) {
      throw error;
    }
  }

  static async update(data, id) {
    try {
      const updatedData = await kycService.kycAPI.update(data, {
        where: { id },
        returning: true,
        plain: true,
      });
      return updatedData[1];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = KycService;
