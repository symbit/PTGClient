import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

const app = express();
const PORT = 3001;

dotenv.config();

const frontendUrl = process.env.FRONTEND_URL;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/generate-prediction-pdf/:predictionId', async (req, res) => {
  const { authToken } = req.body;
  const predictionId = req.params.predictionId;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    if (authToken) {
      await page.goto(
        `${frontendUrl}/predictions/export/${predictionId}?token=${authToken}`,
        {
          waitUntil: 'networkidle0',
        },
      );

      const header = await page.evaluate(() => {
        return document.getElementById('header').innerHTML;
      });
      const footer = await page.evaluate(() => {
        return document.getElementById('footer').innerHTML;
      });

      const pdf = await page.pdf({
        displayHeaderFooter: true,
        headerTemplate: header,
        footerTemplate: footer,
        margin: {
          top: '100px',
          bottom: '100px',
          left: '40px',
          right: '40px',
        },
      });

      await browser.close();

      res.contentType('application/pdf');
      res.send(pdf);
    } else {
      res.status(401).send('Not authorized.');
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).send('PDF generation failed');
  }
});

app.listen(PORT, () => console.log(`PDF server running on port ${PORT}`));
