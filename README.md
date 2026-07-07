# ⚡ ZCUS Tools

30+ free developer tools & productivity apps. All browser-based, no signup required.

**Live:** [tools.zcus.dev](https://tools.zcus.dev)

## 🛠️ Tools

### Developer
| Tool | Description |
|------|------------|
| 🔧 [JSON Formatter](/json-formatter/) | Format, validate, minify JSON. CSV & YAML export |
| 📝 [Regex Tester](/regex-tester/) | Real-time regex testing with capture groups |
| 🔐 [Base64 Tool](/base64-tool/) | Base64/URL/HTML entity encode & decode |
| #️⃣ [Hash Generator](/hash-generator/) | MD5, SHA-1/256/384/512 hash generation |
| 🔤 [Text Transform](/text-transform/) | camelCase, snake_case, kebab-case & more |
| 📋 [Markdown Editor](/markdown-editor/) | Live split-pane markdown editor |
| 📄 [Markdown → PDF](/markdown-pdf/) | Convert markdown to PDF/HTML |
| 🕐 [Timestamp Converter](/timestamp-converter/) | Unix ↔ human readable, relative time |
| 🆔 [UUID Generator](/uuid-generator/) | UUID v4 with batch mode |
| 🔑 [JWT Decoder](/jwt-decoder/) | Decode JWT tokens with expiry check |
| 🌐 [HTML Preview](/html-preview/) | Live HTML/CSS/JS editor with preview |
| 🎨 [CSS Playground](/css-playground/) | Interactive CSS property playground |
| 📝 [Text Diff](/diff-viewer/) | Line-level text comparison |
| &️ [HTML Entity](/html-entity/) | HTML entity encode/decode |
| 📰 [Lorem Generator](/lorem-generator/) | Placeholder text in EN/LN/ID |

### Design & SEO
| Tool | Description |
|------|------------|
| 🏷️ [SEO Meta Tags](/meta-tags/) | OG tags, Twitter cards generator |
| 📧 [Email Template](/email-template/) | Email template builder |
| 📱 [QR Generator](/qr-generator/) | QR code with custom colors |
| 🎨 [Color Palette](/color-palette/) | Color palette generator |
| ⭐ [Favicon Generator](/favicon-gen/) | Generate favicons from text/emoji |

### Data & Analysis
| Tool | Description |
|------|------------|
| 📊 [CSV Viewer](/csv-viewer/) | View, sort, filter CSV data |
| ⚡ [JSON Diff](/json-diff/) | Compare JSON objects visually |
| 🏥 [API Health](/api-health/) | Monitor API endpoints |
| 🔍 [DNS Lookup](/dns-lookup/) | DNS records via Cloudflare DoH |
| 🖼️ [Image Compressor](/image-compressor/) | Compress images in-browser |

### Productivity
| Tool | Description |
|------|------------|
| 🔐 [Password Generator](/password-gen/) | Secure passwords with strength meter |
| 💰 [Expense Tracker](/expense-tracker/) | Income/expense tracking with charts |
| 📋 [Todo Kanban](/todo-kanban/) | Kanban board with drag & drop |
| 📝 [Notes App](/notes-app/) | Rich text notes with search |
| 🔖 [Bookmark Manager](/bookmark-manager/) | Organize bookmarks with categories |

## 🚀 Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- Single-file SPA architecture
- localStorage for persistence
- Web Crypto API for hashing
- Canvas API for QR/image processing
- Consistent design system (Inter font, #FF6B00 accent)

## 🏗️ Self-Hosted

All apps are static files. Deploy anywhere:

```bash
# nginx
cp -r * /var/www/tools/
# or any static server
npx serve .
```

## 📄 License

MIT — Free to use, modify, and distribute.

---
Built by [ZCUS](https://github.com/zcus0)
