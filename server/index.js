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
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Debugging checks to prevent mismatched keys
try {
  const urlMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/i);
  const urlRef = urlMatch ? urlMatch[1] : null;
  
  const keyParts = supabaseServiceKey.split('.');
  if (keyParts.length === 3) {
    const payload = JSON.parse(Buffer.from(keyParts[1], 'base64').toString());
    const keyRef = payload.ref;
    
    console.log(`[Supabase Check] Target URL: ${supabaseUrl}`);
    console.log(`[Supabase Check] Key Project Ref: ${keyRef}`);
    
    if (urlRef && keyRef && urlRef !== keyRef) {
      console.error(`\n⚠️  WARNING: Supabase URL project reference ("${urlRef}") does not match the Service Role Key project reference ("${keyRef}")!`);
      console.error(`This mismatch will cause all API and authentication calls to fail with 401/403 errors.\n`);
    }
  }
} catch (e) {
  // Ignored
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allowedOrigins = [
  'http://localhost:3000',
  'https://sand-ai-mocha.vercel.app'
];

if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL.split(',').forEach(origin => {
    const trimmed = origin.trim();
    if (trimmed) allowedOrigins.push(trimmed);
  });
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      return allowed.toLowerCase() === origin.toLowerCase();
    }) || origin.includes('localhost:') || origin.endsWith('.vercel.app');
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
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

// Scan Usage Check Endpoint
app.get('/api/scan-usage', verifyUser, async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('website_scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.id);

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation "website_scans" does not exist')) {
        return res.status(200).json({ count: 0 });
      }
      throw error;
    }
    return res.status(200).json({ count: count || 0 });
  } catch (err) {
    console.error('Failed to retrieve scan usage:', err);
    return res.status(200).json({ count: 0 });
  }
});

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

  let currentCount = 0;
  try {
    const { count, error: countError } = await supabase
      .from('website_scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.id);

    if (countError) {
      console.warn('Database select error (likely table website_scans not created yet):', countError);
    } else {
      currentCount = count || 0;
      if (currentCount >= 3) {
        return res.status(403).json({
          error: 'Free scan limit reached (3/3 scans used). Please schedule a 1:1 Live Deep-Dive call with our engineering team to review your website.',
          limitReached: true
        });
      }
    }
  } catch (err) {
    console.error('Failed to verify scan limits:', err);
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
    const prompt = `You are the Sand AI Chief Digital & Brand Intelligence Officer — the world's most advanced automated website and brand marketing auditor. You combine forensic technical analysis with strategic brand intelligence to deliver actionable, revenue-impacting insights.

Analyze the technical and marketing metadata of the user's website:
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

Perform a multi-dimensional brand and marketing intelligence analysis across the following 6 pillars:
1. SEO Mastery (Weight: 20%): Title, Meta description, headings semantic structure, image SEO, and mobile/viewport configurations.
2. Performance Engineering (Weight: 20%): Render-blocking resource minimization (scripts, stylesheets count), payload size proxy, and modern web techs.
3. Tracking & Analytics Intelligence (Weight: 20%): GA4, GTM, Meta Pixel, TikTok, Hotjar, Clarity integrations, and attribution model capacity.
4. Copywriting & Value Proposition (Weight: 20%): Headline clarity/impact, value prop memorability, objection handling, CTA clarity and scannability based on heading texts.
5. Brand Identity Cohesion (Weight: 10%): Visual identity consistency, brand messaging alignment, trust signals, and customer testimonials detection.
6. Conversion Optimization (CRO) (Weight: 10%): Above-the-fold clarity, form fields, social proof, and mobile conversion ease.

Provide your response in strictly valid JSON format matching the following schema. Return ONLY raw JSON. No markdown codeblocks (do not wrap in \`\`\`json).

{
  "audit_metadata": {
    "audit_id": "Generate a unique UUID",
    "audited_url": "${url}",
    "audit_timestamp": "${new Date().toISOString()}",
    "audit_version": "2.0-enhanced",
    "scoring_model": "sand-ai-v2-six-pillar"
  },
  "executive_summary": {
    "overall_score": 78,
    "grade": "C+",
    "brand_health_index": 82,
    "marketing_maturity_level": "Level 3 (Emerging)",
    "revenue_at_risk_estimate": "Medium | High | Critical based on conversion gaps",
    "competitive_positioning": "Ahead of market / On par / Behind market / Significantly behind",
    "summary_paragraph": "Provide a 3-4 sentence executive narrative highlighting the top 3 strengths and top 3 critical gaps."
  },
  "pillar_scores": {
    "seo_mastery": { "score": 80, "weight": 20, "grade": "B-" },
    "performance_engineering": { "score": 70, "weight": 20, "grade": "C" },
    "tracking_analytics_intelligence": { "score": 60, "weight": 20, "grade": "D" },
    "copywriting_value_proposition": { "score": 85, "weight": 20, "grade": "B" },
    "brand_identity_cohesion": { "score": 90, "weight": 10, "grade": "A-" },
    "conversion_optimization": { "score": 75, "weight": 10, "grade": "C+" }
  },
  "technical_inventory": {
    "detected_platforms": ["List detected CMS or frameworks if identifiable, or guess based on scripts/patterns"],
    "detected_tools": ["List all detected marketing, analytics, and heatmapping tools from pre-scraped indicators"],
    "detected_integrations": ["List third-party APIs/scripts detected"],
    "security_posture": {
      "ssl": ${isSSL},
      "tls_version": "TLS 1.2 or TLS 1.3 proxy",
      "security_headers": ["List possible security headers based on ssl/https status"],
      "vulnerabilities": ["List generic security opportunities based on standard checks"]
    },
    "performance_metrics": {
      "estimated_lcp": "Estimated LCP value based on script/stylesheet bloat",
      "estimated_cls": "Estimated CLS based on image dimensions and layout indicators",
      "script_count": ${parsedData.scripts.length},
      "stylesheet_count": ${parsedData.stylesheets.length},
      "image_count": ${parsedData.images.length},
      "third_party_domains": ["List key third-party script domains observed"]
    }
  },
  "issues": [
    {
      "id": "issue-001",
      "category": "seo | performance | tracking | copywriting | brand_identity | conversion | security | accessibility",
      "severity": "critical | warning | optimized | opportunity",
      "pillar": "seo_mastery | performance_engineering | tracking_analytics_intelligence | copywriting_value_proposition | brand_identity_cohesion | conversion_optimization",
      "title": "Concise issue name (max 60 chars)",
      "description": "Detailed explanation of the issue and its business impact (2-3 sentences)",
      "business_impact": "Revenue/brand/traffic/risk impact statement",
      "affected_elements": ["List specific HTML tags/elements or missing pixels"],
      "recommendation": "Specific, actionable fix with implementation guidance. Mention how Sand AI's premium development/marketing integrations can solve it.",
      "implementation_effort": "Quick Win (1hr) | Medium (1 day) | Heavy (1 week) | Strategic (1 month+)",
      "estimated_impact": "High/Medium/Low",
      "priority_rank": 1
    }
  ],
  "strengths": [
    {
      "id": "strength-001",
      "category": "seo | performance | tracking | copywriting | brand_identity | conversion",
      "title": "What's working well",
      "description": "Why this is a competitive advantage",
      "leverage_recommendation": "How to amplify this strength further"
    }
  ],
  "competitive_intelligence": {
    "tech_stack_summary": "Inferred tech stack maturity description",
    "market_position_signals": "What the detected tools suggest about market positioning",
    "gap_analysis": "What's missing compared to industry-leading competitors"
  },
  "action_plan": {
    "quick_wins": ["List of short titles of issues tagged as Quick Win, ordered by impact"],
    "strategic_initiatives": ["List of Heavy/Strategic issue titles that require planning"],
    "estimated_roi_projection": "Qualitative ROI narrative if all critical issues are resolved"
  }
}

Guidelines for the response:
- Output must be strictly parseable JSON.
- Escape all double quotes in text fields to prevent JSON parser crashes.
- Do not output any preamble, extra commentary, or wrapping outside the JSON object. Just return the raw JSON content.
`;

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

      // Log successful scan to database
      try {
        await supabase
          .from('website_scans')
          .insert({
            user_id: req.user.id,
            url: url
          });
      } catch (dbErr) {
        console.error('Failed to save scan record to database:', dbErr);
      }

      auditReport.scanCount = currentCount + 1;
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

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
