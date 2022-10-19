const { Post, Comment, User, Tag, sequelize } = require("../models");

const createTags = async ({ tagArr }) => {
  const result = await Promise.all(
    tagArr.map((tag) =>
      Tag.findOrCreate({
        where: { content: tag.toLowerCase() },
      })
    )
  );
  return result;
};

const getRecentTags = async () => {
  const [tags, _] = await sequelize.query("select TagId from PostHashtag order by createdAt desc limit 15;");
  const contents = [];
  for (const v of tags) {
    const [result] = await sequelize.query("select content from Tags where id=?;", {
      replacements: [v.TagId],
    });
    contents.push(result[0].content);
  }
  return contents;
};

module.exports = {
  createTags,
  getRecentTags,
};
