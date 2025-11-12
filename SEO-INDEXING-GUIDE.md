# 🚀 FranxVan SEO Indexing Guide

## GitHub Pages URL Indexing with Google

### 📋 Prerequisites

- Your site is live on GitHub Pages (e.g., `https://yourusername.github.io/franxvan`)
- All SEO optimizations are complete ✅
- Site is fully functional

### 🔧 Step 1: Update URLs in Your Code

**Update these files with your actual GitHub Pages URL:**

1. **index.html** - Update canonical URL:

```html
<link rel="canonical" href="https://yourusername.github.io/franxvan/" />
```

2. **index.html** - Update Open Graph URLs:

```html
<meta property="og:url" content="https://yourusername.github.io/franxvan/" />
```

3. **js/structured-data.js** - Update website URL:

```javascript
website: "https://yourusername.github.io/franxvan";
```

### 🗺️ Step 2: Create a Sitemap

Create `sitemap.xml` in your root directory:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourusername.github.io/franxvan/</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/franxvan/#intro</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/franxvan/#diensten</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/franxvan/#contact</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 🤖 Step 3: Create robots.txt

Create `robots.txt` in your root directory:

```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourusername.github.io/franxvan/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1
```

### 📊 Step 4: Google Search Console Setup

1. **Go to Google Search Console**: https://search.google.com/search-console/
2. **Add Property**: Click "Add Property" → "URL prefix"
3. **Enter your URL**: `https://yourusername.github.io/franxvan/`
4. **Verify Ownership**: Choose HTML file method:
   - Download the verification file (e.g., `google1234567890abcdef.html`)
   - Upload it to your GitHub repository root
   - Click "Verify"

### 🗺️ Step 5: Submit Sitemap

1. **In Google Search Console**: Go to "Sitemaps" in the left menu
2. **Add sitemap**: Enter `sitemap.xml`
3. **Submit**: Click "Submit"

### 🔍 Step 6: Request Indexing

1. **URL Inspection**: Use the URL inspection tool in Search Console
2. **Enter your URL**: `https://yourusername.github.io/franxvan/`
3. **Request Indexing**: Click "Request Indexing"

### 📈 Step 7: Monitor Performance

**Check these regularly:**

- **Coverage**: Ensure pages are indexed
- **Performance**: Monitor Core Web Vitals
- **Enhancements**: Check for mobile usability issues
- **Links**: Monitor backlinks and internal linking

### ⚡ Step 8: Speed Up Indexing

**Additional methods to get indexed faster:**

1. **Social Media**: Share your site on Facebook, Twitter, LinkedIn
2. **Directory Submissions**: Submit to Dutch business directories
3. **Backlinks**: Get links from other websites
4. **Google My Business**: Create a business profile (links to your site)

### 🎯 Expected Timeline

- **Initial crawling**: 1-3 days
- **Full indexing**: 1-2 weeks
- **Ranking improvements**: 2-8 weeks
- **Local SEO results**: 4-12 weeks

### 📋 Checklist

- [ ] Update all URLs in code to GitHub Pages URL
- [ ] Create and upload sitemap.xml
- [ ] Create and upload robots.txt
- [ ] Set up Google Search Console
- [ ] Verify site ownership
- [ ] Submit sitemap
- [ ] Request indexing for main pages
- [ ] Monitor in Search Console

### 🚨 Important Notes

- **Custom Domain**: Consider getting a custom domain (franxvan.nl) for better branding
- **HTTPS**: GitHub Pages provides HTTPS automatically ✅
- **Mobile-First**: Your site is already mobile-optimized ✅
- **Page Speed**: Already optimized for Core Web Vitals ✅

### 📞 Need Help?

If you encounter issues:

1. Check Google Search Console for errors
2. Ensure all files are properly uploaded to GitHub
3. Wait 24-48 hours between changes and checking results
4. Monitor the "Coverage" report for indexing status

---

**Your FranxVan website is SEO-ready and should index successfully with Google! 🎉**
