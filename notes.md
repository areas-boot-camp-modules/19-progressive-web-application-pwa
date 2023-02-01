# Module 19: 
- [19.1: ](#19.1-)
- [19.2: ](#19.2-)
- [19.3: ](#19.3-)
---

## 19.1: Webpage Performance and Webpack
### Lighthouse
- A Chrome extension to see performance metrics.
- Only available for Chrome? 

---
### Webpack Intro
- We've been using `require()`.
- Now we're going to use `import`.
- There's a `webpack.config.js` file.
- It bundles js files for us into a single file.
- Lots of this is now supported by browsers, but it's still useful for some things (I guess we'll cover some of this later).
- You set up your project and run `npm run build`.
- `export const...` is similar to `module.exports...`.
- Use `export` for the front end, instead of `module.exports`.

```
import { buttonClick } from "./button"

// same as const buttonClick = require("./button")

document.getElementById("btn").addEventListener("click", buttonClick)
```

---
### Webpack Bundle
- You can add other things, like CSS. You have to set it up in your `webpack.config.js` file.
- In the case of CSS, you use `style-loader` (an npm dependency).
- You can bundle things with images, and other things. You just need the right loader.
- This lets us treat images like objects (with the right plugin).

```
import { buttonClick } from "./button"
import "../css/style.css"
document.getElementById("btn").addEventListener("click", buttonClick)
```

```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

---
### Webpack Loader
- Bower is like npm, but isn’t really used that often.
- Babel makes our code more compatible with many browsers.
- But it can make it slower, since newer tech can be more efficient.
- Babel is a transpiler (not complier). It transform JS to JS.

```
...
module: {
	rules: [
		...
		{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			}
		}
	]
}
...
```

---
### Webpack Plugin
- There aren’t a ton of plugins people use.
- We don’t really use much HTML in the index.html file moving forward.
- We put it all together with JS.
- The plugin below adds a script tag to our index.html, so we don’t even really have to think about it!

```
...
plugins: {
	new HtmlWebpackPlugin({
		template: "./index.html",
		title: "Webpack Plugin",
	})
}
...
```

---
## 19.2: 
### Webpack HMR
- HRM = hot module reloading.
- Modules get uploaded in browser without a browser refresh.
- Is this like `nodemon` for the browser.
- `"dev": "webpack-dev-server --open",`

```
module.exports = {
	mode: "development",
	entry: {
		index: ".src/index.js",
	},
	devServer: {
		hot: "only",
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Hot Module Reloading",
			template: "./index.html",
		}),
	],
	module: [
		...
	],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
}
```

---
### Client-Server
- Things are out of order for me! Client-Server was supposed to be last.
- Fixed.
- This is using new `client` and `sever` folders to organize our code.
- Do we use the MVC model, or something else?

---
### Workbox Service Workers
- I’m not following.
- This guy is terrible.

index.js
```
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
	.register("./sw.js")
	.
}
```

---
## 19.3: 
### IndexedDB
 - Similar to local storage, but you can use it to store more.
 - Local storage is synchronous. IndexedDB is async.
 - Better performance, especially when there’s a lot of data.
 - And it has a better data structure.
 - And of course, data is persistent.
 - Local storage is ok for small stuff, but indexedDB is better for larger projects.
- `idb` is a dependency (https://www.npmjs.com/package/idb).
- `openDB` returns a promise, and therefore lets you do things async.
- You can see IndexedDB and demo-db under it in the browser (under storage).
- We’ll use await in next activity.

index.js
```
import "./database.js"
```

database.js
```
import { openDB } from "idb"

const initdb = async () =>
	openDB("demo-db", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("demo-db")) {
				console.log("demo-db database already exists")
				return
			}
			db.createObjectStore("demo-db", {
				keyPath: "id",
				autoIncrement: true
			})
			console.log("demo-db database created)
		},
	})

initdb()
```

---

### IndexedDB and CRUD
- 

---
### Manifest
- 

---
### Git Hooks
- 

---
###  
- 

---
