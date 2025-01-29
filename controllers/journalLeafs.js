import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import sharp from "sharp";

const prisma = new PrismaClient();

export const getAllLeafs = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);

    const { journalId, date } = req.body.requestBody;

      // console.log(data);

    const result = await prisma.journalLeafs.findMany({
      where: {
        AND: {
          journalId: journalId,
          userId: req.user.id,
          isDisabled: false,
        },
      },
    });
    console.log(result.length);
    if (result) {
      return res.json({
        responseBody: new ApiResponse(200, result, "SUCCESS"),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      responseBody: new ApiError(404, "FAILURE", error, ""),
    });
  }
};

export const addJournalLeafs = async (req, res) => {
  try {
    console.log(req.body.data);

    const imageData = req.file.buffer;
    const { title, description, editorData, date, journalId } = req.body;
    console.log(title, description, editorData, date, journalId);
    console.log(imageData);
    console.log(req.user);
    const data = Buffer.from(imageData).toString("base64");
    // console.log(data)
    const result = await prisma.journalLeafs.create({
      data: {
        journalTitle: title,
        journalDescription: description,
        journalDate: date,
        journalContent: editorData,
        journalImage: data,
        userId: req.user.id,
        journalId: parseInt(journalId),
        imageType: req.file.mimetype,
      },
    });

    if (result) {
      return res.json({
        responseBody: new ApiResponse(200, result, "SUCCESS"),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      responseBody: new ApiError(404, "FAILURE", error, ""),
    });
  }
};

export const editJournalLeafs = async (req, res) => {
  try {
    const { title, description, editorData, date, journalId, id } = req.body;
    let imageData = null;

    if (req.file) {
      imageData = req.file.buffer;
    }

    const updateData = {
      journalTitle: title,
      journalDescription: description,
      journalContent: editorData,
      journalDate: date,
    };

    if (imageData) {
      const data = Buffer.from(imageData).toString("base64");
      updateData.journalImage = data;
    }

    const result = await prisma.journalLeafs.update({
      where: {
        id: parseInt(id), // Find the journal by its ID
      },
      data: updateData,
    });

    if (result) {
      return res.json({
        responseBody: new ApiResponse(200, result, "SUCCESS"),
      });
    }

    // If no result, return an error (shouldn't happen in normal scenarios)
    return res.json({
      responseBody: new ApiError(404, "FAILURE", "Journal not found", ""),
    });
  } catch (error) {
    console.log(error);
    return res.json({
      responseBody: new ApiError(404, "FAILURE", error.message, ""),
    });
  }
};

export const deleteJournalLeafs = async (req, res) => {
  try {
    const { journalId } = req.body.requestBody;
    console.log("Request ID", journalId);
    const result = await prisma.journalLeafs.update({
      data: {
        isDisabled: true,
      },
      where: {
        id: journalId,
        userId: req.user.id,
      },
    });

    if (result) {
      return res.json({
        responseBody: new ApiResponse(200, result, "SUCCESS"),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      responseBody: new ApiError(404, "FAILURE", error, ""),
    });
  }
};

export const getLeafBasedonId = async (req, res) => {
  try {
    const { journalId } = req.body.requestBody;
    const result = await prisma.journalLeafs.findFirst({
      where: {
        id: parseInt(journalId),
        isDisabled: false,
      },
    });
    // console.log("Result is",result)
    if (result) {
      return res.json({
        responseBody: new ApiResponse(200, result, "SUCCESS"),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      responseBody: new ApiError(404, "FAILURE", error, ""),
    });
  }
};

export const shareUUIDBasedonJournal = async(req,res) =>{
  try {

    const {id} = req.body.requestBody

    const result = await prisma.journalLeafs.findFirst({
      where:{
        id:id,
        isDisabled:false
      }
    })



    if (result) {
      return res.json({
        responseBody: new ApiResponse(200, result, "SUCCESS"),
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      responseBody: new ApiError(404, "FAILURE", error, ""),
    });
  }
};