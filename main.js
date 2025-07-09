import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BrowserWindow, app, session } from 'electron';
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
  // Content Security Policyを設定（開発環境と本番環境で分ける）
  if (process.env.NODE_ENV === 'development') {
    // 開発環境ではViteのために緩いCSPを使用
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self' http://localhost:*; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: file: http://localhost:*; " +
            "font-src 'self'; " +
            "connect-src 'self' ws://localhost:* http://localhost:*"
          ]
        }
      });
    });
  } else {
    // 本番環境では厳格なCSPを使用
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self'; " +
            "script-src 'self'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: file:; " +
            "font-src 'self'"
          ]
        }
      });
    });
  }

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
