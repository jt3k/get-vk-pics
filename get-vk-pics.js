const cheerio = require("cheerio");
const got = require("got");

module.exports = async function getVkPics(url) {
  const { body } = await got.get(url);
  const $ = cheerio.load(body);
  let posts = $('[class="wall_item"]').toArray();
  return posts.map((item) => {
    const post = $(item);
    const pic = post.find("[data-src_big]").attr("data-src_big");
    const [picUrl, picHeight, picWidth] = pic.split("|");
    const likes = post.find(".v_like").text();
    return { likes, picUrl, picWidth, picHeight };
  });
};
