# Quick Reference - Build & Run Commands

## Windows Command Prompt or PowerShell

```cmd
# Install dependencies (one time)
npm install

# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Or use the batch file:
```cmd
build-app.bat
```

## After First Run

1. Open browser to `http://localhost:5173`
2. You should see the medieval splash screen
3. Then the game board appears
4. Try all 3 difficulty levels
5. Enjoy! ⚔️💣

## Project is Ready When:

✅ `npm install` completes (should take 1-2 minutes)
✅ `npm run dev` shows "Local: http://localhost:5173"
✅ Browser opens to the game

## Troubleshooting

- If npm isn't found, install Node.js from nodejs.org
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
- Close all browser tabs to port 5173, then try `npm run dev` again
