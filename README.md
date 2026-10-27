# 🏋️ FITGEAR — Home Strength Equipment Store

A front-end e-commerce landing page for a fictional home fitness brand. FITGEAR features a bold hero section, category browsing, featured products with an add-to-cart toast, a demo login/register modal, and a floating **LED-style calculator** whose display colors change with the numbers you type.

Built with plain **HTML, CSS and vanilla JavaScript**, with no frameworks or build tools.

---

## ✨ Features

- **Modern storefront layout**: navbar, hero banner, "Shop by Category" grid, featured products and a benefits section (shipping, guarantee, support).
- **Add to Cart toast**: clicking *Add to Cart* shows a notification with the product name and price.
- **Login / Register modal**: tabbed form with basic validation and a welcome message (demo only, no backend).
- **Floating LED calculator**: opens from a side button and closes with the ✕ button or by clicking outside it.
  - Supports `+ − × ÷ %`, decimals, clear and backspace.
  - Full **keyboard support** (digits, operators, `Enter`, `Backspace`, `Esc`).
  - Display glow and LED dots shift color depending on the value; errors (like dividing by zero) turn red.
- **Image fallbacks**: if a product image is missing, a placeholder is loaded automatically.

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript (ES6) |
| Icons | [Font Awesome](https://fontawesome.com/) |
| Font | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |

## 📁 Project Structure

```
fitgear/
├── home.html                 # Page structure
├── home.css                  # Styles
├── home.js                   # Calculator, modal and cart toast logic
├── coverpage.jpg             # Hero image
├── dumbells.jpg              # Category / product image
├── Treadmills.jpg            # Category image
├── homegyms.jpg              # Category image
├── FoldableTreadmill.jpg     # Product image
├── Power_Rack_System.jpg     # Product image
└── Exercise_Bike_Pro.jpg     # Product image
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```
2. **Open the site**: double-click `home.html`, or serve it locally:
   ```bash
   # Python
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000/home.html`.

> An internet connection is needed for Font Awesome and the Inter font.

## 🧮 Calculator Shortcuts

| Key | Action |
| --- | --- |
| `0–9` `.` | Enter numbers |
| `+` `-` `*` `/` `%` | Operators |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete last digit |
| `Esc` | Clear |

## 🔐 Demo Login

The login and register forms are **front-end only**. Any email and password will work, and nothing is stored or sent anywhere.

## 🗺️ Possible Improvements

- Real shopping cart with quantities and a checkout page
- Backend authentication (e.g. PHP + MySQL or Node.js)
- Product detail pages and search/filtering
- Save cart contents with `localStorage`

## 👤 Author

**Destin**: Information Systems student and web developer.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
