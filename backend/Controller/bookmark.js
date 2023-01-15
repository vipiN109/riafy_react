const bookmarkModel = require("../model/bookmark");

module.exports = {
  create_bookmark: async (req, res) => {
    var body = req.body;
    try {
      var checkUrl = await bookmarkModel.findOne({ url: body.url });
      if (checkUrl) {
        return res.status(201).send({
          status: false,
          code: 201,
          message: "This url is already exist",
        });
      }
    } catch (e) {
      console.log("Something went wrong!", e);
      return res
        .status(201)
        .send({ status: false, code: 201, message: "Something went wrong!" });
    }

    try {
      var newBookmark = new bookmarkModel({
        title: body.title,
        url: body.url,
      });
      newBookmark.save();
      return res.status(200).send({
        status: true,
        code: 200,
        message: "Bookmark created successfully",
      });
    } catch (e) {
      console.log("Something went wrong!", e);
      return res
        .status(201)
        .send({ status: false, code: 201, message: "Something went wrong!" });
    }
  },
  get_bookmarks: async (req, res) => {
    var search= req.query["search"]||""
    try {
      var get_bookmarks = await bookmarkModel.aggregate([
        {
          $match: {
            $or: [
              {
                title: { $regex: search, $options: "i" },
              },
              { url: { $regex: search, $options: "i" } },
            ],
          },
        },
        {
          $skip: parseInt(req.query["limit"])*parseInt(req.query["skip"]),
        },
        {
          $limit: parseInt(req.query["limit"]),
        },
      ]);

      var get_bookmarksTotal = await bookmarkModel.aggregate([
        {
          $match: {
            $or: [
              {
                title: { $regex: search, $options: "i" },
              },
              { url: { $regex: search, $options: "i" } },
            ],
          },
        },
    ])
    
    return res.status(200).send({
        status: true,
        code: 200,
        data:get_bookmarks,
        total_documents:get_bookmarksTotal.length>0 ? get_bookmarksTotal.length:0
      });
    } catch (e) {
        console.log("Something went wrong!", e);
        return res
          .status(201)
          .send({ status: false, code: 201, message: "Something went wrong!" });
    }
  },
};
