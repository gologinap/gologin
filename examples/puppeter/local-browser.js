// SDK will prepare the browser and will start it on your machine then you can control it with puppeteer
import { GologinApi } from 'gologin';

const token = process.env.GL_API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODE5NjE4ZDBhOTQ4YmZkNzAzOTcwNjQiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2ODE5NjE5YmFmZTQzOWIyMzQyN2U4OTMifQ.mzUWT1IdpFo0Bk-EadlgJ03NZlJlWyt0UV8j5g2WeQ8';
const gologin = GologinApi({
  token,
});

async function main() {
  const { browser } = await gologin.launch({
    // pass profileId parameter if you want to run particular profile
    // profileId: 'your profileId here',
  });

  const page = await browser.newPage();

  await page.goto('https://iphey.com/', { waitUntil: 'networkidle2' });
  const status = await page.$eval('.trustworthy:not(.hide)',
    (elt) => elt?.innerText?.trim(),
  );

  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log('status', status);

  return status;
}

main().catch(console.error)
  .finally(gologin.exit);
