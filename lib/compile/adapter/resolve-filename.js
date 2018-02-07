'use strict';

var fs = require('fs');
var path = require('path');
var detectNode = require('detect-node');
var LOCAL_MODULE = /^\.+\//;

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

/**
 * 获取模板的绝对路径
 * @param   {string} filename 
 * @param   {Object} options 
 * @return  {string}
 */
var resolveFilename = function resolveFilename(filename, options) {
  if (detectNode) {
    var root = options.root;
    var extname = options.extname;
    var resolveModules = options.resolveModules;

    if (LOCAL_MODULE.test(filename)) {
      var from = options.filename;
      var self = !from || filename === from;
      var base = self ? root : path.dirname(from);
      filename = path.resolve(base, filename);
    } else if (getType(resolveModules) === 'array' && getType(filename) === 'string' && filename[0] === '~') {
      filename = getFilePath(resolveModules, filename, root);
    } else {
      filename = path.resolve(root, filename);
    }

    if (!path.extname(filename)) {
      filename = filename + extname;
    }
  }

  return filename;
};

module.exports = resolveFilename;
