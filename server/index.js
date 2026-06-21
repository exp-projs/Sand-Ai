const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name,
        }
      }
    });

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Signup successful', user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    // In a real app, you might set a cookie with the session here
    res.status(200).json({
      message: 'Login successful',
      session: data.session,
      user: data.user
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to verify Supabase Auth Token
async function verifyUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: invalid token' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: session expired or invalid' });
  }
}

// Regex-based HTML metadata parser (lightweight, zero-dependency)
function parseHTML(html) {
  const result = {
    title: '',
    description: '',
    ogTitle: '',
    ogDescription: '',
    viewport: '',
    h1s: [],
    h2s: [],
    h3s: [],
    images: [],
    scripts: [],
    stylesheets: [],
    hasGA: false,
    hasMetaPixel: false,
    hasTikTokPixel: false,
    hasHotjar: false,
    hasClarity: false,
  };

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) result.title = titleMatch[1].trim();

  // Meta tags
  const metaRegex = /<meta\s+([^>]*?)>/gi;
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const metaAttributes = match[1];

    const getAttr = (name) => {
      const r = new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
      const m = metaAttributes.match(r);
      return m ? (m[1] || m[2] || m[3] || '') : '';
    };

    const name = getAttr('name').toLowerCase();
    const property = getAttr('property').toLowerCase();
    const content = getAttr('content');

    if (name === 'description') result.description = content;
    else if (name === 'viewport') result.viewport = content;
    else if (property === 'og:title') result.ogTitle = content;
    else if (property === 'og:description') result.ogDescription = content;
  }

  // Headings
  const getHeadings = (tag) => {
    const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'gi');
    const list = [];
    let m;
    while ((m = r.exec(html)) !== null) {
      const text = m[1].replace(/<[^>]*>/g, '').trim();
      if (text) list.push(text);
    }
    return list;
  };
  result.h1s = getHeadings('h1');
  result.h2s = getHeadings('h2');
  result.h3s = getHeadings('h3');

  // Images
  const imgRegex = /<img\s+([^>]*?)>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = match[1];
    const getAttr = (name) => {
      const r = new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
      const m = attrs.match(r);
      return m ? (m[1] || m[2] || m[3] || '') : '';
    };
    const src = getAttr('src');
    const alt = getAttr('alt');
    result.images.push({ src, alt });
  }

  // Scripts
  const scriptRegex = /<script\s+([^>]*?)>/gi;
  while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = match[1];
    const getAttr = (name) => {
      const r = new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
      const m = attrs.match(r);
      return m ? (m[1] || m[2] || m[3] || '') : '';
    };
    const src = getAttr('src');
    if (src) result.scripts.push(src);
  }

  // Stylesheets
  const linkRegex = /<link\s+([^>]*?)>/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = match[1];
    const getAttr = (name) => {
      const r = new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
      const m = attrs.match(r);
      return m ? (m[1] || m[2] || m[3] || '') : '';
    };
    const rel = getAttr('rel').toLowerCase();
    const href = getAttr('href');
    if (rel === 'stylesheet' && href) result.stylesheets.push(href);
  }

  // Tracking scripts & pixels check (covers both inline codes and external src loads)
  result.hasGA = /googletagmanager\.com|google-analytics\.com|gtag\(/i.test(html);
  result.hasMetaPixel = /connect\.facebook\.net|fbevents\(/i.test(html);
  result.hasTikTokPixel = /analytics\.tiktok\.com|ttq\.load\(/i.test(html);
  result.hasHotjar = /static\.hotjar\.com|hj\s*=\s*hj/i.test(html);
  result.hasClarity = /clarity\.ms\/tag/i.test(html);

  return result;
}

// AI Website Analysis Endpoint
app.post('/api/analyze-website', verifyUser, async (req, res) => {
  let { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Prepend protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const isSSL = url.toLowerCase().startsWith('https');

    // Fetch external URL HTML
    const fetchResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!fetchResponse.ok) {
      return res.status(400).json({ error: `Failed to fetch target URL: Received HTTP Status ${fetchResponse.status}` });
    }

    const html = await fetchResponse.text();
    const parsedData = parseHTML(html);

    const nvidiaKey = process.env.NVIDIA_API_KEY;
    if (!nvidiaKey || nvidiaKey === 'your_nvidia_api_key_here') {
      console.error('NVIDIA_API_KEY not configured or placeholder.');
      return res.status(503).json({ error: 'AI analysis service is temporarily unavailable. The system could not process this information at this time.' });
    }

    // Call NVIDIA NIM API
    const prompt = `You are a world-class Web Development and Digital Marketing auditor at Sand AI, a premier growth agency.
Your task is to analyze the technical and marketing metadata of a user's website and provide a detailed, critical audit report.

Website URL: ${url}
Is SSL/HTTPS: ${isSSL ? 'Yes' : 'No'}
Page Title: ${parsedData.title || '(Missing)'}
Meta Description: ${parsedData.description || '(Missing)'}
Open Graph Title: ${parsedData.ogTitle || '(Missing)'}
Open Graph Description: ${parsedData.ogDescription || '(Missing)'}
Viewport Tag: ${parsedData.viewport || '(Missing)'}
Headings count: H1: ${parsedData.h1s.length}, H2: ${parsedData.h2s.length}, H3: ${parsedData.h3s.length}
H1 tags: ${JSON.stringify(parsedData.h1s)}
Total Images: ${parsedData.images.length}
Images missing Alt descriptions: ${parsedData.images.filter(img => !img.alt).length}
External scripts loaded: ${parsedData.scripts.length}
External stylesheets loaded: ${parsedData.stylesheets.length}

Tracking & Pixel Integrations (Pre-scraped from HTML):
- Google Analytics / Tag Manager: ${parsedData.hasGA ? 'Yes' : 'No'}
- Meta (Facebook) Pixel: ${parsedData.hasMetaPixel ? 'Yes' : 'No'}
- TikTok Pixel: ${parsedData.hasTikTokPixel ? 'Yes' : 'No'}
- Hotjar heatmaps: ${parsedData.hasHotjar ? 'Yes' : 'No'}
- Microsoft Clarity: ${parsedData.hasClarity ? 'Yes' : 'No'}

Provide your response in valid JSON format. The JSON MUST have the following structure:
{
  "score": 75,
  "scores": {
    "seo": 80,
    "performance": 70,
    "tracking": 60,
    "copywriting": 78
  },
  "summary": "A professional, insightful executive summary (2-3 paragraphs) critiquing their current state. Explain why they are losing revenue, and note how Sand AI's development/marketing systems are positioned to fix it.",
  "issues": [
    {
      "category": "seo" | "performance" | "tracking" | "copywriting",
      "severity": "critical" | "warning" | "optimized",
      "title": "Short title describing the issue",
      "description": "Longer explanation of the issue, why it matters, and how it impacts their conversion rate.",
      "recommendation": "Concrete fix, and mention how Sand AI's tools (like pixel setups, automated pipeline routing, Looker Studio dashboards, etc.) can solve this perfectly."
    }
  ]
}

Guidelines for the response:
- Be highly professional, critical, and educational. Give constructive, actionable advice.
- Give scores that make sense. For example, if there are multiple H1s, or missing title/description, drop the SEO score. If there are >15 external scripts, drop the performance score. If there are few scripts (meaning they probably lack essential tracking pixels like Meta CAPI, Google Ads tracking, or GA4), drop the tracking score and note this.
- Make sure to recommend specific Sand AI tools (e.g., Looker Studio integrations for tracking, custom high-performance Next.js pages for speed, automated CRM pipelines for lead routing, etc.) as the solution to their bottlenecks.
- Return ONLY the JSON object, with no markdown formatting. Do not wrap it in \`\`\`json.`;

    const nimResponse = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nvidiaKey}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [
          { role: 'system', content: 'You are an API assistant that outputs valid, raw JSON only. Do not wrap in markdown.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 2500
      })
    });

    if (!nimResponse.ok) {
      const errText = await nimResponse.text();
      console.error('NVIDIA NIM API Error status:', nimResponse.status, errText);
      return res.status(503).json({ error: 'AI analysis service is temporarily unavailable. The system could not process this information at this time.' });
    }

    const nimData = await nimResponse.json();
    let text = nimData.choices[0].message.content.trim();

    // Remove markdown codeblock wrapper if model included it
    if (text.startsWith('```json')) {
      text = text.substring(7);
    } else if (text.startsWith('```')) {
      text = text.substring(3);
    }
    if (text.endsWith('```')) {
      text = text.substring(0, text.length - 3);
    }
    text = text.trim();

    try {
      const auditReport = JSON.parse(text);
      return res.status(200).json(auditReport);
    } catch (parseErr) {
      console.error('Failed to parse NIM JSON. Raw text:', text);
      return res.status(502).json({ error: 'AI analysis service is temporarily unavailable. The system could not process this information at this time.' });
    }
  } catch (err) {
    console.error('Scraping or analyzer error:', err);
    return res.status(503).json({ error: 'AI analysis service is temporarily unavailable. The system could not process this information at this time.' });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
