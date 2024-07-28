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

### Simple HTML

```html
<html>
<head>
    <script>
        let CSS_PUBLIC_PATH = 'style.css';
    </script>
    <script defer src="https://unpkg.com/alpinejs-components@latest/dist/acomponents.min.js"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <title>Test AlpineJS Components</title>
</head>
<body>
<h1>AlpineJS</h1>
<div x-data="{
    images: [
      { name: 'Img1', 'src': 'https://fakeimg.pl/150' },
      { name: 'Img2', 'src': 'https://fakeimg.pl/170' },
      { name: 'Img3', 'src': 'https://fakeimg.pl/227'   }
    ]
  }"
>
    <ul>
        <template x-for="img in images">
            <a-component template="test"/>
        </template>
    </ul>
</div>
</body>
</html>
```
### Component Test
#### ./components/test.html
```html
<script>
    function initImg() {
        return {
            imgData: this.$data.img,
            showImg: true,
        }
    }
</script>
<div x-data="initImg" x-show="imgData">
    Test Component
    <img x-show="showImg" :src="imgData.src" :alt="imgData.name" />
    <a-component template="bnt-hide-img" />
</div>
```
### Nested component

#### ./components/bnt-hide-img.html
```html

<script>
    function initBtn() {
        return {
            showImgBtn: this.$data.showImg,
            init() {
                this.$watch('showImgBtn', (value) => {
                    this.$data.showImg = value;
                });
            },
        }
    }
</script>
<button x-data="initBtn" @click="showImgBtn = false;">
    Hide Image
</button>
```


### Stats

![](https://img.shields.io/bundlephobia/min/alpinejs-components)
![](https://img.shields.io/npm/v/alpinejs-components)
![](https://img.shields.io/npm/dt/alpinejs-components)
![](https://img.shields.io/github/license/elesei/alpinejs-components)