import { Sequelize } from "sequelize";
import { ModelType } from "./types";

export default (sequelize: Sequelize, DataTypes: any) => {
  const Post: ModelType = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false, //필수
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      thumbNailUrl: {
        type: DataTypes.STRING(100),
        allowNull: true, //필수
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 + 이모티콘
    }
  );

  Post.associate = (db) => {
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Series);
    db.Post.belongsToMany(db.Tag, { through: "PostHashtag" });
  };
  return Post;
};
