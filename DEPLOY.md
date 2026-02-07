# How to Access IELTS Prep on Your Phone

You have 3 options to use this prototype as a link on your phone:

---

## Option 1: Same WiFi (Quick & Free)

Use your computer's IP address so your phone can reach it on the same network.

### 1. Start the server
```bash
cd ielts-prep-prototype
npx serve . -l 3000
```

### 2. Find your computer's IP
- **Windows**: Open Command Prompt → run `ipconfig` → look for "IPv4 Address" (e.g. `192.168.1.105`)
- **Mac**: System Preferences → Network → your connection → IP address

### 3. On your phone
- Connect to the **same WiFi** as your computer
- Open the browser and go to: `http://YOUR_IP:3000`  
  Example: `http://192.168.1.105:3000`

---

## Option 2: Public URL with ngrok (Free)

Creates a link you can use from anywhere.

### 1. Install ngrok
- Download from [ngrok.com](https://ngrok.com)
- Or: `npm install -g ngrok`

### 2. Run your app and ngrok
```bash
# Terminal 1: Start the app
cd ielts-prep-prototype
npx serve . -l 3000

# Terminal 2: Create public URL
ngrok http 3000
```

### 3. Copy the URL
ngrok will show something like: `https://abc123.ngrok.io`  
Use that link on your phone.

---

## Option 3: Deploy Online (Always Available)

Host it for free so you can use it anytime without running your computer.

### Vercel (Recommended)
1. Install Vercel: `npm i -g vercel`
2. In the `ielts-prep-prototype` folder: `vercel`
3. Follow prompts → you get a URL like `https://your-project.vercel.app`

### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Drag the `ielts-prep-prototype` folder onto Netlify Drop
3. You get a live URL instantly

### GitHub Pages
1. Push the folder to a GitHub repo
2. Repo → Settings → Pages → Source: Deploy from branch
3. Select branch and `/ (root)` → Save
4. URL will be: `https://yourusername.github.io/repo-name/`

---

## Add to Home Screen (App-like)

On your phone:
1. Open the app in Safari (iOS) or Chrome (Android)
2. **iOS**: Share → Add to Home Screen
3. **Android**: Menu (⋮) → Add to Home screen

It will open like an app and feel more native!
