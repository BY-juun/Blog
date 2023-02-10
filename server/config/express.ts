import express from "express";
import morgan from "morgan";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import hpp from "hpp";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import db from "models";
import postRouter from "src/Post/postRouter";
import postsRouter from "src/Posts/postsRouter";
import userRouter from "src/User/userRouter";
import visitorRouter from "src/Visitor/visitorRouter";
import commentRouter from "src/Comment/commentRouter";
import tagRouter from "src/Tag/tagRouter";
import passportConfig from "./passport";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
dotenv.config();

export default function () {
  const app = express();

  db.sequelize
    .sync()
    .then(() => {
      console.log("db연결 성공");
    })
    .catch((err: Error) => {
      console.error(err);
    });

  passportConfig();

  if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
    app.use(hpp());
    app.use(helmet());
  } else {
    app.use(morgan("dev"));
  }

  app.use(cors({ origin: true, credentials: true }));

  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET as string,
      proxy: true,
      cookie: {
        httpOnly: true, //cookie는 javascript로 조작할 수 없도록.
        secure: true,
        sameSite: "lax",
        domain: process.env.NODE_ENV === "production" ? ".byjuun.com" : "http://localhost:3000",
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.set("trust proxy", 1);

  app.use("/post", postRouter);
  app.use("/posts", postsRouter);
  app.use("/user", userRouter);
  app.use("/visitor", visitorRouter);
  app.use("/comment", commentRouter);
  app.use("/tag", tagRouter);

  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  });

  const upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: "byjuun.com",
      key(req, file, cb) {
        cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
      },
    }),
  });
  app.use("/", express.static(path.join(__dirname, "uploads")));
  app.post("/uploads", upload.single("img"), (req, res) => {
    res.status(200).json({
      uploaded: true,
      url: (req.file as Express.MulterS3.File).location,
    });
  });

  app.listen(3065, () => {
    console.log("서버 실행 중");
  });
}
