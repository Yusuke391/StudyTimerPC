<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## いつでも使えるフォントとは？

「いつでも使えるフォント」とは、ほとんどの環境（Windows, macOS, Linux, iOS, Android など）で標準的にインストールされているフォントや、Webフォントとして配信されているフォントのことを指します。

### 代表的な「いつでも使える」フォント例

- **system-ui**: 各OSの標準UIフォント（推奨）
- **Arial**: 多くのOSで標準搭載
- **Helvetica**: macOSなどで標準搭載
- **Segoe UI**: Windowsの標準UIフォント
- **Roboto**: AndroidやGoogle系サービスで標準
- **sans-serif**: 最後のフォールバックとして指定

### CSSでの指定例

```css
font-family: system-ui, Arial, Helvetica, "Segoe UI", Roboto, sans-serif;
```

このように複数指定しておくことで、どの環境でも「それなりに見やすい」フォントが使われます。

---
=======
# StudyTimerPC
made by electron, react, typescript, yarn
>>>>>>> 6559910e55c61c3021fb3ede4ac5c96ba8daf67a
