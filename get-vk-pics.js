const cheerio = require("cheerio");
const got = require("got");

module.exports = async function getVkPics(url) {
  const { body } = await got.get(url);
  const $ = cheerio.load(body);
  let posts = $('[class="wall_item"]').toArray();
  return posts.map((item) => {
    const post = $(item);
    const pic = post.find("[data-src_big]").attr("data-src_big");
    if(!pic) { return; }
    const [picUrl, picHeight, picWidth] = pic.split("|");
    let likes = post.find(".v_like").text();
    likes = convertNumbers(likes);
    return { likes, picUrl, picWidth, picHeight };
  })
  .filter(Boolean);
};



// symbols to represent numbers
const CONVERT_MAP = {
  K: 10**3, // kilo
  M: 10**6, // mega
  G: 10**9, // giga
  T: 10**12, // tera
  P: 10**15, // Peta
  E: 10**18, // exa
  Z: 10**21, // zetta
  Y: 10**24, // yotta
}

const convertNumbers = (num) => {
  const symbol = num.slice(-1);
  if (!CONVERT_MAP[symbol]) {
    return num;
  }

  return CONVERT_MAP[symbol] * Number(num.slice(0, -1));
}