import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BrowserWindow, app } from 'electron';
// Add these lines to define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true, // ここをtrueに
    },
  });
  // 開発時はViteの開発サーバーを読み込む
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173'); // Viteのデフォルトポート
    win.webContents.openDevTools();
  } else {
    // プロダクションビルド時はビルドされたHTMLファイルを読み込む
    win.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}`);
  }
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
