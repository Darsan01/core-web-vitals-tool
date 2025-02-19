const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Add this line

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Replace with your Google API Key
const API_KEY = 'AIzaSyANSrPXtOkwlQ1YQ-ZGHYva_wgDuTxRgPw';

// Endpoint to analyze Core Web Vitals
app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}`;
    const response = await axios.get(apiUrl);

    const { lighthouseResult } = response.data;
    const { audits } = lighthouseResult;

    const vitals = {
      LCP: audits['largest-contentful-paint'].displayValue,
      FID: audits['max-potential-fid'].displayValue,
      CLS: audits['cumulative-layout-shift'].displayValue,
    };

    const recommendations = [
      "Optimize images using next-gen formats (WebP/AVIF).",
      "Implement lazy loading for below-the-fold images.",
      "Reduce server response time by using a CDN.",
      "Minify CSS and JavaScript files.",
      "Eliminate render-blocking resources.",
    ];

    const eeatChecklist = [
      "Ensure content is written by experts.",
      "Include author bios and credentials.",
      "Add trust signals like customer reviews.",
      "Use HTTPS for secure connections.",
      "Regularly update content for accuracy.",
    ];

    res.json({ vitals, recommendations, eeatChecklist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze the URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});