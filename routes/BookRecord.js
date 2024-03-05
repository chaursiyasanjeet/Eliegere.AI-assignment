const express = require("express");
const router = express.Router();
const BookRecord = require("../models/BookRecord");
const mongoose = require("mongoose");

//adding records
router.post("/addRecord", async (req, res) => {
  try {
    const { title, author, ISBN, publishedDate } = req.body;
    if (!title || !author || !ISBN || !publishedDate) {
      res.status(500).json({
        status: "FAILED",
        message: "Empty Fields",
      });
      return;
    }

    const newbookrecord = new BookRecord({
      Title: title,
      Author: author,
      ISBN: ISBN,
      PublishedDate: publishedDate,
    });

    await newbookrecord.save();

    res.status(200).json({
      status: "SUCCESS",
      message: "Book Record Added Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Server Error",
    });
  }
});

//Reterive book entry
router.get("/getRecords", async (req, res) => {
  try {
    const bookRecords = await BookRecord.find();

    res.status(200).json({
      status: "SUCCESS",
      records: bookRecords,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Server Error",
    });
  }
});

//update records
router.put("/updateRecord/:id", async (req, res) => {
  try {
    const recordId = req.params.id;
    const { title, author, ISBN, publishedDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(recordId)) {
      res.status(400).json({
        status: "FAILED",
        message: "Invalid record ID",
      });
      return;
    }

    const dataToUpdate = {
      Title: title,
      Author: author,
      ISBN: ISBN,
      PublishedDate: publishedDate,
    };

    const updateRecord = await BookRecord.findByIdAndUpdate(recordId, {
      $set: dataToUpdate,
    });

    if (!updateRecord) {
      res.status(404).json({
        status: "FAILED",
        message: "No record found with given ID ",
      });
      return;
    }

    res.status(200).json({
      status: "SUCCESS",
      message: "Record updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "server error",
    });
  }
});

//Delete Records
router.delete("/deleteRecord/:id", async (req, res) => {
  try {
    const recordId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(recordId)) {
      res.status(400).json({
        status: "FAILED",
        message: "Invalid record ID",
      });
      return;
    }

    const result = await BookRecord.findOneAndDelete({ _id: recordId });
    if (result) {
      res.status(200).json({
        status: "SUCCESS",
        message: "Book Record Deleted Successfully",
      });
      return;
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Book Record not found wiht given id",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Server Error",
    });
  }
});

module.exports = router;
