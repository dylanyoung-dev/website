const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// MVP Profile URL
const profileUrl = 'https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7';

// Years to download badges for
const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

// Output directory
const outputDir = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to fetch HTML content
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return fetchHTML(response.headers.location)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch: ${response.statusCode}`));
        return;
      }
      
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

// Function to download a file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Extract image URLs from HTML
function extractImageUrls(html) {
  const imageUrls = [];
  
  // Find all img tags
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    // Convert relative URLs to absolute
    if (url.startsWith('http')) {
      imageUrls.push(url);
    } else if (url.startsWith('/')) {
      imageUrls.push(`https://mvp.sitecore.com${url}`);
    } else {
      imageUrls.push(`https://mvp.sitecore.com/${url}`);
    }
  }
  
  // Also look for background-image URLs in CSS
  const bgImageRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgImageRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.startsWith('http')) {
      imageUrls.push(url);
    } else if (url.startsWith('/')) {
      imageUrls.push(`https://mvp.sitecore.com${url}`);
    }
  }
  
  return [...new Set(imageUrls)]; // Remove duplicates
}

// Find MVP badge images
function findBadgeImages(imageUrls, year) {
  const yearStr = year.toString();
  return imageUrls.filter(url => {
    const lowerUrl = url.toLowerCase();
    return (
      lowerUrl.includes('mvp') &&
      (lowerUrl.includes(yearStr) || lowerUrl.includes('badge')) &&
      (lowerUrl.endsWith('.png') || lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.svg'))
    );
  });
}

async function main() {
  console.log('Fetching MVP profile page...\n');
  
  try {
    const html = await fetchHTML(profileUrl);
    const imageUrls = extractImageUrls(html);
    
    console.log(`Found ${imageUrls.length} image URLs on the page\n`);
    
    // Download badges for each year
    for (const year of years) {
      const badgeUrls = findBadgeImages(imageUrls, year);
      const filename = `sitecore-mvp-${year}.png`;
      const filepath = path.join(outputDir, filename);
      
      if (badgeUrls.length > 0) {
        // Try the first matching URL
        try {
          console.log(`Downloading ${year} badge from: ${badgeUrls[0]}`);
          await downloadFile(badgeUrls[0], filepath);
        } catch (error) {
          console.log(`✗ Failed to download ${year} badge: ${error.message}`);
        }
      } else {
        console.log(`✗ No badge image found for year ${year}`);
      }
    }
    
    // Try to find and download general MVP logo
    const logoUrls = imageUrls.filter(url => {
      const lowerUrl = url.toLowerCase();
      return (
        lowerUrl.includes('mvp') &&
        (lowerUrl.includes('logo') || lowerUrl.includes('sitecore')) &&
        (lowerUrl.endsWith('.png') || lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.svg'))
      );
    });
    
    if (logoUrls.length > 0) {
      const logoPath = path.join(outputDir, 'sitecore-mvp-logo.png');
      try {
        console.log(`\nDownloading general MVP logo from: ${logoUrls[0]}`);
        await downloadFile(logoUrls[0], logoPath);
      } catch (error) {
        console.log(`✗ Failed to download general MVP logo: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('Error fetching profile page:', error.message);
    console.log('\nManual download instructions:');
    console.log('1. Visit: https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7');
    console.log('2. Right-click on each MVP badge image');
    console.log('3. Save images to: apps/web/public/images/');
    console.log('4. Name them: sitecore-mvp-[YEAR].png (e.g., sitecore-mvp-2024.png)');
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
