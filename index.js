const fs = require('fs');
const puppeteer = require('puppeteer');

const url = process.argv[2];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(0);

  let counter = 0;
  page.on('response', async (response) => {
    const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());

    if (matches && matches.length === 2) {
      const extension = matches[1];

      const buffer = await response.buffer();

      fs.writeFileSync(`/home/lmello/behance-downloader/images/image-${counter}.${extension}`, buffer, 'base64');

      console.log(`${counter}: image-${counter}.${extension}`);

      counter += 1;
    }
  });

  await page.goto(url);
})();