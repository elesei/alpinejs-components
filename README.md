# Alpine JS Components

Reusable HTML components powered by AlpineJS

## Install With a CDN

```html
<script
  defer
  src="https://unpkg.com/alpinejs-components@latest/dist/acomponents.min.js"
></script>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

## Install With NPM or Yarn

```shell
npm install -D alpinejs-components

yarn add -D alpinejs-components
```
## Usage


```js
import Alpine from 'alpinejs'
import component from 'alpinejs-components'

Alpine.plugin(component)

Alpine.start()
```

## Example

### Laravel mix integration

```js
const mix = require('laravel-mix');
const path = require("path");
const webpack = require('webpack');
const fs = require('fs');

mix.webpackConfig({
    plugins: [
        new webpack.DefinePlugin({
            CSS_PUBLIC_PATH: JSON.stringify(getCssPublicPath()),
        })
    ]
});
function getCssPublicPath() {
    const manifestPath = path.resolve(__dirname, 'public/mix-manifest.json');
    if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        return manifest['/css/style.css'] || '/css/style.css';
    } else {
        console.error('Mix manifest not found. Make sure you have compiled your assets.');
        return '';
    }
}
```



### Stats

![](https://img.shields.io/bundlephobia/min/alpinejs-components)
![](https://img.shields.io/npm/v/alpinejs-components)
![](https://img.shields.io/npm/dt/alpinejs-components)
![](https://img.shields.io/github/license/elesei/alpinejs-components)