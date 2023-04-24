const mongoose = require("mongoose");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(cors());

const api =
  "mongodb+srv://root:1@blog.k1kdhis.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(api, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connection is successfull!"))
  .catch((error) => console.log(error));

const userShema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  avatar: Object,
});

const User = mongoose.model("User", userShema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const secretKey = "Secret key secret key 12345";
const options = {
  expiresIn: "1h",
};

//register
app.post("/api/register", upload.single("avatar"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      _id: uuidv4(),
      name,
      email,
      password,
      avatar: req.file,
    });

    const result = await user.save();

    const payload = {
      user: result,
    };

    const token = jwt.sign(payload, secretKey, options);

    res.json({ token: token, user: result });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user === null) {
      res.status(403).json({ message: "Mail adresi ya da şifre yanlış" });
    } else {
      const payload = {};
      const token = jwt.sign(payload, secretKey, options);

      res.json({ token: token, user: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const postSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  content: String,
  title: String,
  createdDate: String,
});

const Post = mongoose.model("Post", postSchema);

//Post add
app.post("/api/post", async (req, res) => {
  try {
    const { userId, content, title } = req.body;
    const post = new Post({
      _id: uuidv4(),
      userId: userId,
      content: content,
      title:title,
      createdDate: new Date(),
    });

    await post.save();
    res.json({ message: "Post was shared!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get Post
app.get("/api/posts", async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
    ]).sort({createdDate: -1});

    res.json(post)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

app.listen(5000, () => console.log("Server is UP! at 5000 port"));
