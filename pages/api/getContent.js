export default async function handler(req, res) {
  // request must be post request
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Please provide a URL!" });
  try {
    const response = await fetch(req.body.url);
    const htmlContent = await response.text();

    // replace assets filepaths with url
    // TODO: replace all hrefs and srcs with absolute urls
    // split html by tags
    const htmlTagsArr = htmlContent.split(/\<.*?\>/g);

    // check for src, href, and url

    console.log("htmlTags", htmlTagsArr);
    res.status(200).send(htmlContent);
  } catch (err) {
    console.log('Error while fetching content from website:', err);
    res.status(500).json({
      error: `Error while fetching content from website: ${err}`
    });
  }
};