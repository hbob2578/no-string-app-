# The Whispered Word - Speakeasy Web Application

![No String App on Paper](20250728_100007.jpg)

This is a photo of the "No String App" concept as sketched on paper. It visually represents the initial design and ideas for the application.

---

## 🥃 About The Whispered Word

A 1920s speakeasy-themed web application featuring password-protected access, beautiful period styling, and hidden Easter eggs. Built with Express.js and pure JavaScript.

### 🌟 Features

- **Password-Protected Access**: Enter the secret password to access the inner sanctum
- **1920s Theming**: Authentic speakeasy atmosphere with period-appropriate styling
- **Interactive Elements**: Smooth animations and atmospheric effects  
- **Easter Eggs**: Hidden Konami code reveals password hints
- **Mobile Responsive**: Works on all device sizes
- **Multiple Valid Passwords**: "bee's knees", "bees knees", "beesknees", "bootlegger", "giggle water"

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hbob2578/no-string-app-.git
   cd no-string-app-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Enter password: `bee's knees` (or try other alternatives!)

## 🛠️ Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server (same as start)  
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint and auto-fix issues

### Project Structure

```
no-string-app-/
├── public/              # Static files served by Express
│   ├── index.html      # Main entrance page
│   ├── secret.html     # Protected inner sanctum page
│   ├── script.js       # Client-side JavaScript
│   └── styles.css      # 1920s-themed CSS
├── tests/              # Test files
│   └── server.test.js  # Server and route tests
├── server.js           # Express server configuration
├── index.js            # Entry point for compatibility
└── package.json        # Dependencies and scripts
```

### Testing

The application includes comprehensive tests using Jest and Supertest:

```bash
npm test
```

Tests cover:
- Route functionality (main page, secret page)
- Static file serving
- Content validation

### Code Quality

ESLint is configured for both Node.js and browser environments:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

## 🎮 Easter Eggs

Try the Konami Code on the main page:
`↑ ↑ ↓ ↓ ← → ← → B A`

## 🎭 Password Hints

If you're stuck, here are the valid passwords:
- `bee's knees` (primary)
- `bees knees`
- `beesknees` 
- `bootlegger`
- `giggle water`

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests and linting (`npm test && npm run lint`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

*"The bee's knees since twenty-three"* 🥃