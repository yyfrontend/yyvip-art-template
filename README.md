# yyvip-art-template

yyvip-art-template is forked from art-template.

support webpack resolveModules

```
npm install --save yyvip-art-template
```

## art-template

art-template 是一个渲染性能出众模板引擎，无论在 NodeJS 还是在浏览器中都可以运行。

文档：<https://aui.github.io/art-template/>

## updated

- update convertFilenameNode, is a function to get relativePath. `lib/precompile.js`

```javascript
function convertFilenameNode() {
  ...
  // if (LOCAL_MODULE.test(relativePath)
  if (LOCAL_MODULE.test(relativePath) || resolvePath === relativePath)
  ...
}
```

- update resolveFilename, is a function to resolve path. `lib/compile/adapter/resolve-filename.js`

```javascript
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function getFilePath(dirs, relativePath, root) {
  var deletedPrefixPath = relativePath.substr(1);
  for (var i = 0; i < dirs.length; i++) {
    var filePath = path.resolve(dirs[i], deletedPrefixPath);
    if (fs.existsSync(filePath)) return filePath;
  }
  return path.resolve(root, deletedPrefixPath);
}

function resolveFilename(filename, options) {
  ...
  } else if (getType(resolveModules) === 'array' && getType(filename) === 'string' && filename[0] === '~') {
    filename = getFilePath(resolveModules, filename, root);
  ...
}

```

## issue

1. `.art` file may not in sourceMap if using absolute path like `/var/template/test.art`
