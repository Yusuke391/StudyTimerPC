// preload.ts (srcの外部に配置するため、jsで作成)
// プロダクションビルドでdist/preload.jsになるように、main.tsから参照するパスを調整してください。
// 簡単のため、今回はmain.tsと同じ階層に作成します。
// main.tsと同じ階層にpreload.jsを作成
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 例: メインプロセスから何かを受け取るためのAPI
  onUpdateTimer: (callback) => ipcRenderer.on('update-timer', callback),
});

// 空のpreloadファイル。必要に応じてcontextBridge等を記述してください。
// 例:
// const { contextBridge } = require('electron');
// contextBridge.exposeInMainWorld('api', { /* ... */ });
