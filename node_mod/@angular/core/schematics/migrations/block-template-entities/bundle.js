var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// bazel-out/darwin-fastbuild/bin/packages/core/schematics/migrations/block-template-entities/index.mjs
var block_template_entities_exports = {};
__export(block_template_entities_exports, {
  default: () => block_template_entities_default
});
module.exports = __toCommonJS(block_template_entities_exports);
var import_schematics = require("@angular-devkit/schematics");
var import_path3 = require("path");

// bazel-out/darwin-fastbuild/bin/packages/core/schematics/utils/project_tsconfig_paths.mjs
var import_core = require("@angular-devkit/core");
function getProjectTsConfigPaths(tree) {
  return __async(this, null, function* () {
    const buildPaths = /* @__PURE__ */ new Set();
    const testPaths = /* @__PURE__ */ new Set();
    const workspace = yield getWorkspace(tree);
    for (const [, project] of workspace.projects) {
      for (const [name, target] of project.targets) {
        if (name !== "build" && name !== "test") {
          continue;
        }
        for (const [, options] of allTargetOptions(target)) {
          const tsConfig = options["tsConfig"];
          if (typeof tsConfig !== "string" || !tree.exists(tsConfig)) {
            continue;
          }
          if (name === "build") {
            buildPaths.add((0, import_core.normalize)(tsConfig));
          } else {
            testPaths.add((0, import_core.normalize)(tsConfig));
          }
        }
      }
    }
    return {
      buildPaths: [...buildPaths],
      testPaths: [...testPaths]
    };
  });
}
function* allTargetOptions(target) {
  if (target.options) {
    yield [void 0, target.options];
  }
  if (!target.configurations) {
    return;
  }
  for (const [name, options] of Object.entries(target.configurations)) {
    if (options) {
      yield [name, options];
    }
  }
}
function createHost(tree) {
  return {
    readFile(path2) {
      return __async(this, null, function* () {
        const data = tree.read(path2);
        if (!data) {
          throw new Error("File not found.");
        }
        return import_core.virtualFs.fileBufferToString(data);
      });
    },
    writeFile(path2, data) {
      return __async(this, null, function* () {
        return tree.overwrite(path2, data);
      });
    },
    isDirectory(path2) {
      return __async(this, null, function* () {
        return !tree.exists(path2) && tree.getDir(path2).subfiles.length > 0;
      });
    },
    isFile(path2) {
      return __async(this, null, function* () {
        return tree.exists(path2);
      });
    }
  };
}
function getWorkspace(tree) {
  return __async(this, null, function* () {
    const host = createHost(tree);
    const { workspace } = yield import_core.workspaces.readWorkspace("/", host);
    return workspace;
  });
}

// bazel-out/darwin-fastbuild/bin/packages/core/schematics/utils/typescript/compiler_host.mjs
var import_path = require("path");
var import_typescript2 = __toESM(require("typescript"), 1);

// bazel-out/darwin-fastbuild/bin/packages/core/schematics/utils/typescript/parse_tsconfig.mjs
var path = __toESM(require("path"), 1);
var import_typescript = __toESM(require("typescript"), 1);
function parseTsconfigFile(tsconfigPath, basePath) {
  const { config } = import_typescript.default.readConfigFile(tsconfigPath, import_typescript.default.sys.readFile);
  const parseConfigHost = {
    useCaseSensitiveFileNames: import_typescript.default.sys.useCaseSensitiveFileNames,
    fileExists: import_typescript.default.sys.fileExists,
    readDirectory: import_typescript.default.sys.readDirectory,
    readFile: import_typescript.default.sys.readFile
  };
  if (!path.isAbsolute(basePath)) {
    throw Error("Unexpected relative base path has been specified.");
  }
  return import_typescript.default.parseJsonConfigFileContent(config, parseConfigHost, basePath, {});
}

// bazel-out/darwin-fastbuild/bin/packages/core/schematics/utils/typescript/compiler_host.mjs
function createMigrationProgram(tree, tsconfigPath, basePath, fakeFileRead, additionalFiles) {
  const { rootNames, options, host } = createProgramOptions(tree, tsconfigPath, basePath, fakeFileRead, additionalFiles);
  return import_typescript2.default.createProgram(rootNames, options, host);
}
function createProgramOptions(tree, tsconfigPath, basePath, fakeFileRead, additionalFiles, optionOverrides) {
  tsconfigPath = (0, import_path.resolve)(basePath, tsconfigPath);
  const parsed = parseTsconfigFile(tsconfigPath, (0, import_path.dirname)(tsconfigPath));
  const options = optionOverrides ? __spreadValues(__spreadValues({}, parsed.options), optionOverrides) : parsed.options;
  const host = createMigrationCompilerHost(tree, options, basePath, fakeFileRead);
  return { rootNames: parsed.fileNames.concat(additionalFiles || []), options, host };
}
function createMigrationCompilerHost(tree, options, basePath, fakeRead) {
  const host = import_typescript2.default.createCompilerHost(options, true);
  const defaultReadFile = host.readFile;
  host.readFile = (fileName) => {
    var _a2;
    const treeRelativePath = (0, import_path.relative)(basePath, fileName);
    let result = fakeRead == null ? void 0 : fakeRead(treeRelativePath);
    if (typeof result !== "string") {
      result = treeRelativePath.startsWith("..") ? defaultReadFile.call(host, fileName) : (_a2 = tree.read(treeRelativePath)) == null ? void 0 : _a2.toString();
    }
    return typeof result === "string" ? result.replace(/^\uFEFF/, "") : void 0;
  };
  return host;
}
function canMigrateFile(basePath, sourceFile, program) {
  if (sourceFile.fileName.endsWith(".ngtypecheck.ts") || sourceFile.isDeclarationFile || program.isSourceFileFromExternalLibrary(sourceFile)) {
    return false;
  }
  return !(0, import_path.relative)(basePath, sourceFile.fileName).startsWith("..");
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/selector.mjs
var _SELECTOR_REGEXP = new RegExp(
  `(\\:not\\()|(([\\.\\#]?)[-\\w]+)|(?:\\[([-.\\w*\\\\$]+)(?:=(["']?)([^\\]"']*)\\5)?\\])|(\\))|(\\s*,\\s*)`,
  "g"
);
var CssSelector = class {
  constructor() {
    this.element = null;
    this.classNames = [];
    this.attrs = [];
    this.notSelectors = [];
  }
  static parse(selector) {
    const results = [];
    const _addResult = (res, cssSel) => {
      if (cssSel.notSelectors.length > 0 && !cssSel.element && cssSel.classNames.length == 0 && cssSel.attrs.length == 0) {
        cssSel.element = "*";
      }
      res.push(cssSel);
    };
    let cssSelector = new CssSelector();
    let match;
    let current = cssSelector;
    let inNot = false;
    _SELECTOR_REGEXP.lastIndex = 0;
    while (match = _SELECTOR_REGEXP.exec(selector)) {
      if (match[1]) {
        if (inNot) {
          throw new Error("Nesting :not in a selector is not allowed");
        }
        inNot = true;
        current = new CssSelector();
        cssSelector.notSelectors.push(current);
      }
      const tag = match[2];
      if (tag) {
        const prefix = match[3];
        if (prefix === "#") {
          current.addAttribute("id", tag.slice(1));
        } else if (prefix === ".") {
          current.addClassName(tag.slice(1));
        } else {
          current.setElement(tag);
        }
      }
      const attribute2 = match[4];
      if (attribute2) {
        current.addAttribute(current.unescapeAttribute(attribute2), match[6]);
      }
      if (match[7]) {
        inNot = false;
        current = cssSelector;
      }
      if (match[8]) {
        if (inNot) {
          throw new Error("Multiple selectors in :not are not supported");
        }
        _addResult(results, cssSelector);
        cssSelector = current = new CssSelector();
      }
    }
    _addResult(results, cssSelector);
    return results;
  }
  unescapeAttribute(attr) {
    let result = "";
    let escaping = false;
    for (let i = 0; i < attr.length; i++) {
      const char = attr.charAt(i);
      if (char === "\\") {
        escaping = true;
        continue;
      }
      if (char === "$" && !escaping) {
        throw new Error(`Error in attribute selector "${attr}". Unescaped "$" is not supported. Please escape with "\\$".`);
      }
      escaping = false;
      result += char;
    }
    return result;
  }
  escapeAttribute(attr) {
    return attr.replace(/\\/g, "\\\\").replace(/\$/g, "\\$");
  }
  isElementSelector() {
    return this.hasElementSelector() && this.classNames.length == 0 && this.attrs.length == 0 && this.notSelectors.length === 0;
  }
  hasElementSelector() {
    return !!this.element;
  }
  setElement(element2 = null) {
    this.element = element2;
  }
  getAttrs() {
    const result = [];
    if (this.classNames.length > 0) {
      result.push("class", this.classNames.join(" "));
    }
    return result.concat(this.attrs);
  }
  addAttribute(name, value = "") {
    this.attrs.push(name, value && value.toLowerCase() || "");
  }
  addClassName(name) {
    this.classNames.push(name.toLowerCase());
  }
  toString() {
    let res = this.element || "";
    if (this.classNames) {
      this.classNames.forEach((klass) => res += `.${klass}`);
    }
    if (this.attrs) {
      for (let i = 0; i < this.attrs.length; i += 2) {
        const name = this.escapeAttribute(this.attrs[i]);
        const value = this.attrs[i + 1];
        res += `[${name}${value ? "=" + value : ""}]`;
      }
    }
    this.notSelectors.forEach((notSelector) => res += `:not(${notSelector})`);
    return res;
  }
};
var SelectorMatcher = class {
  constructor() {
    this._elementMap = /* @__PURE__ */ new Map();
    this._elementPartialMap = /* @__PURE__ */ new Map();
    this._classMap = /* @__PURE__ */ new Map();
    this._classPartialMap = /* @__PURE__ */ new Map();
    this._attrValueMap = /* @__PURE__ */ new Map();
    this._attrValuePartialMap = /* @__PURE__ */ new Map();
    this._listContexts = [];
  }
  static createNotMatcher(notSelectors) {
    const notMatcher = new SelectorMatcher();
    notMatcher.addSelectables(notSelectors, null);
    return notMatcher;
  }
  addSelectables(cssSelectors, callbackCtxt) {
    let listContext = null;
    if (cssSelectors.length > 1) {
      listContext = new SelectorListContext(cssSelectors);
      this._listContexts.push(listContext);
    }
    for (let i = 0; i < cssSelectors.length; i++) {
      this._addSelectable(cssSelectors[i], callbackCtxt, listContext);
    }
  }
  _addSelectable(cssSelector, callbackCtxt, listContext) {
    let matcher = this;
    const element2 = cssSelector.element;
    const classNames = cssSelector.classNames;
    const attrs = cssSelector.attrs;
    const selectable = new SelectorContext(cssSelector, callbackCtxt, listContext);
    if (element2) {
      const isTerminal = attrs.length === 0 && classNames.length === 0;
      if (isTerminal) {
        this._addTerminal(matcher._elementMap, element2, selectable);
      } else {
        matcher = this._addPartial(matcher._elementPartialMap, element2);
      }
    }
    if (classNames) {
      for (let i = 0; i < classNames.length; i++) {
        const isTerminal = attrs.length === 0 && i === classNames.length - 1;
        const className = classNames[i];
        if (isTerminal) {
          this._addTerminal(matcher._classMap, className, selectable);
        } else {
          matcher = this._addPartial(matcher._classPartialMap, className);
        }
      }
    }
    if (attrs) {
      for (let i = 0; i < attrs.length; i += 2) {
        const isTerminal = i === attrs.length - 2;
        const name = attrs[i];
        const value = attrs[i + 1];
        if (isTerminal) {
          const terminalMap = matcher._attrValueMap;
          let terminalValuesMap = terminalMap.get(name);
          if (!terminalValuesMap) {
            terminalValuesMap = /* @__PURE__ */ new Map();
            terminalMap.set(name, terminalValuesMap);
          }
          this._addTerminal(terminalValuesMap, value, selectable);
        } else {
          const partialMap = matcher._attrValuePartialMap;
          let partialValuesMap = partialMap.get(name);
          if (!partialValuesMap) {
            partialValuesMap = /* @__PURE__ */ new Map();
            partialMap.set(name, partialValuesMap);
          }
          matcher = this._addPartial(partialValuesMap, value);
        }
      }
    }
  }
  _addTerminal(map, name, selectable) {
    let terminalList = map.get(name);
    if (!terminalList) {
      terminalList = [];
      map.set(name, terminalList);
    }
    terminalList.push(selectable);
  }
  _addPartial(map, name) {
    let matcher = map.get(name);
    if (!matcher) {
      matcher = new SelectorMatcher();
      map.set(name, matcher);
    }
    return matcher;
  }
  match(cssSelector, matchedCallback) {
    let result = false;
    const element2 = cssSelector.element;
    const classNames = cssSelector.classNames;
    const attrs = cssSelector.attrs;
    for (let i = 0; i < this._listContexts.length; i++) {
      this._listContexts[i].alreadyMatched = false;
    }
    result = this._matchTerminal(this._elementMap, element2, cssSelector, matchedCallback) || result;
    result = this._matchPartial(this._elementPartialMap, element2, cssSelector, matchedCallback) || result;
    if (classNames) {
      for (let i = 0; i < classNames.length; i++) {
        const className = classNames[i];
        result = this._matchTerminal(this._classMap, className, cssSelector, matchedCallback) || result;
        result = this._matchPartial(this._classPartialMap, className, cssSelector, matchedCallback) || result;
      }
    }
    if (attrs) {
      for (let i = 0; i < attrs.length; i += 2) {
        const name = attrs[i];
        const value = attrs[i + 1];
        const terminalValuesMap = this._attrValueMap.get(name);
        if (value) {
          result = this._matchTerminal(terminalValuesMap, "", cssSelector, matchedCallback) || result;
        }
        result = this._matchTerminal(terminalValuesMap, value, cssSelector, matchedCallback) || result;
        const partialValuesMap = this._attrValuePartialMap.get(name);
        if (value) {
          result = this._matchPartial(partialValuesMap, "", cssSelector, matchedCallback) || result;
        }
        result = this._matchPartial(partialValuesMap, value, cssSelector, matchedCallback) || result;
      }
    }
    return result;
  }
  _matchTerminal(map, name, cssSelector, matchedCallback) {
    if (!map || typeof name !== "string") {
      return false;
    }
    let selectables = map.get(name) || [];
    const starSelectables = map.get("*");
    if (starSelectables) {
      selectables = selectables.concat(starSelectables);
    }
    if (selectables.length === 0) {
      return false;
    }
    let selectable;
    let result = false;
    for (let i = 0; i < selectables.length; i++) {
      selectable = selectables[i];
      result = selectable.finalize(cssSelector, matchedCallback) || result;
    }
    return result;
  }
  _matchPartial(map, name, cssSelector, matchedCallback) {
    if (!map || typeof name !== "string") {
      return false;
    }
    const nestedSelector = map.get(name);
    if (!nestedSelector) {
      return false;
    }
    return nestedSelector.match(cssSelector, matchedCallback);
  }
};
var SelectorListContext = class {
  constructor(selectors) {
    this.selectors = selectors;
    this.alreadyMatched = false;
  }
};
var SelectorContext = class {
  constructor(selector, cbContext, listContext) {
    this.selector = selector;
    this.cbContext = cbContext;
    this.listContext = listContext;
    this.notSelectors = selector.notSelectors;
  }
  finalize(cssSelector, callback) {
    let result = true;
    if (this.notSelectors.length > 0 && (!this.listContext || !this.listContext.alreadyMatched)) {
      const notMatcher = SelectorMatcher.createNotMatcher(this.notSelectors);
      result = !notMatcher.match(cssSelector, null);
    }
    if (result && callback && (!this.listContext || !this.listContext.alreadyMatched)) {
      if (this.listContext) {
        this.listContext.alreadyMatched = true;
      }
      callback(this.selector, this.cbContext);
    }
    return result;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/core.mjs
var ViewEncapsulation;
(function(ViewEncapsulation2) {
  ViewEncapsulation2[ViewEncapsulation2["Emulated"] = 0] = "Emulated";
  ViewEncapsulation2[ViewEncapsulation2["None"] = 2] = "None";
  ViewEncapsulation2[ViewEncapsulation2["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));
var ChangeDetectionStrategy;
(function(ChangeDetectionStrategy2) {
  ChangeDetectionStrategy2[ChangeDetectionStrategy2["OnPush"] = 0] = "OnPush";
  ChangeDetectionStrategy2[ChangeDetectionStrategy2["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
var CUSTOM_ELEMENTS_SCHEMA = {
  name: "custom-elements"
};
var NO_ERRORS_SCHEMA = {
  name: "no-errors-schema"
};
var SecurityContext;
(function(SecurityContext2) {
  SecurityContext2[SecurityContext2["NONE"] = 0] = "NONE";
  SecurityContext2[SecurityContext2["HTML"] = 1] = "HTML";
  SecurityContext2[SecurityContext2["STYLE"] = 2] = "STYLE";
  SecurityContext2[SecurityContext2["SCRIPT"] = 3] = "SCRIPT";
  SecurityContext2[SecurityContext2["URL"] = 4] = "URL";
  SecurityContext2[SecurityContext2["RESOURCE_URL"] = 5] = "RESOURCE_URL";
})(SecurityContext || (SecurityContext = {}));
var MissingTranslationStrategy;
(function(MissingTranslationStrategy2) {
  MissingTranslationStrategy2[MissingTranslationStrategy2["Error"] = 0] = "Error";
  MissingTranslationStrategy2[MissingTranslationStrategy2["Warning"] = 1] = "Warning";
  MissingTranslationStrategy2[MissingTranslationStrategy2["Ignore"] = 2] = "Ignore";
})(MissingTranslationStrategy || (MissingTranslationStrategy = {}));
function parserSelectorToSimpleSelector(selector) {
  const classes = selector.classNames && selector.classNames.length ? [8, ...selector.classNames] : [];
  const elementName = selector.element && selector.element !== "*" ? selector.element : "";
  return [elementName, ...selector.attrs, ...classes];
}
function parserSelectorToNegativeSelector(selector) {
  const classes = selector.classNames && selector.classNames.length ? [8, ...selector.classNames] : [];
  if (selector.element) {
    return [
      1 | 4,
      selector.element,
      ...selector.attrs,
      ...classes
    ];
  } else if (selector.attrs.length) {
    return [1 | 2, ...selector.attrs, ...classes];
  } else {
    return selector.classNames && selector.classNames.length ? [1 | 8, ...selector.classNames] : [];
  }
}
function parserSelectorToR3Selector(selector) {
  const positive = parserSelectorToSimpleSelector(selector);
  const negative = selector.notSelectors && selector.notSelectors.length ? selector.notSelectors.map((notSelector) => parserSelectorToNegativeSelector(notSelector)) : [];
  return positive.concat(...negative);
}
function parseSelectorToR3Selector(selector) {
  return selector ? CssSelector.parse(selector).map(parserSelectorToR3Selector) : [];
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/digest.mjs
var textEncoder;
function computeDigest(message) {
  return sha1(serializeNodes(message.nodes).join("") + `[${message.meaning}]`);
}
function decimalDigest(message) {
  return message.id || computeDecimalDigest(message);
}
function computeDecimalDigest(message) {
  const visitor = new _SerializerIgnoreIcuExpVisitor();
  const parts = message.nodes.map((a) => a.visit(visitor, null));
  return computeMsgId(parts.join(""), message.meaning);
}
var _SerializerVisitor = class {
  visitText(text2, context) {
    return text2.value;
  }
  visitContainer(container, context) {
    return `[${container.children.map((child) => child.visit(this)).join(", ")}]`;
  }
  visitIcu(icu, context) {
    const strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    return `{${icu.expression}, ${icu.type}, ${strCases.join(", ")}}`;
  }
  visitTagPlaceholder(ph, context) {
    return ph.isVoid ? `<ph tag name="${ph.startName}"/>` : `<ph tag name="${ph.startName}">${ph.children.map((child) => child.visit(this)).join(", ")}</ph name="${ph.closeName}">`;
  }
  visitPlaceholder(ph, context) {
    return ph.value ? `<ph name="${ph.name}">${ph.value}</ph>` : `<ph name="${ph.name}"/>`;
  }
  visitIcuPlaceholder(ph, context) {
    return `<ph icu name="${ph.name}">${ph.value.visit(this)}</ph>`;
  }
  visitBlockPlaceholder(ph, context) {
    return `<ph block name="${ph.startName}">${ph.children.map((child) => child.visit(this)).join(", ")}</ph name="${ph.closeName}">`;
  }
};
var serializerVisitor = new _SerializerVisitor();
function serializeNodes(nodes) {
  return nodes.map((a) => a.visit(serializerVisitor, null));
}
var _SerializerIgnoreIcuExpVisitor = class extends _SerializerVisitor {
  visitIcu(icu, context) {
    let strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    return `{${icu.type}, ${strCases.join(", ")}}`;
  }
};
function sha1(str) {
  textEncoder != null ? textEncoder : textEncoder = new TextEncoder();
  const utf8 = [...textEncoder.encode(str)];
  const words32 = bytesToWords32(utf8, Endian.Big);
  const len = utf8.length * 8;
  const w = new Uint32Array(80);
  let a = 1732584193, b = 4023233417, c = 2562383102, d = 271733878, e = 3285377520;
  words32[len >> 5] |= 128 << 24 - len % 32;
  words32[(len + 64 >> 9 << 4) + 15] = len;
  for (let i = 0; i < words32.length; i += 16) {
    const h0 = a, h1 = b, h2 = c, h3 = d, h4 = e;
    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        w[j] = words32[i + j];
      } else {
        w[j] = rol32(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      const fkVal = fk(j, b, c, d);
      const f = fkVal[0];
      const k = fkVal[1];
      const temp = [rol32(a, 5), f, e, k, w[j]].reduce(add32);
      e = d;
      d = c;
      c = rol32(b, 30);
      b = a;
      a = temp;
    }
    a = add32(a, h0);
    b = add32(b, h1);
    c = add32(c, h2);
    d = add32(d, h3);
    e = add32(e, h4);
  }
  return toHexU32(a) + toHexU32(b) + toHexU32(c) + toHexU32(d) + toHexU32(e);
}
function toHexU32(value) {
  return (value >>> 0).toString(16).padStart(8, "0");
}
function fk(index, b, c, d) {
  if (index < 20) {
    return [b & c | ~b & d, 1518500249];
  }
  if (index < 40) {
    return [b ^ c ^ d, 1859775393];
  }
  if (index < 60) {
    return [b & c | b & d | c & d, 2400959708];
  }
  return [b ^ c ^ d, 3395469782];
}
function fingerprint(str) {
  textEncoder != null ? textEncoder : textEncoder = new TextEncoder();
  const utf8 = textEncoder.encode(str);
  const view = new DataView(utf8.buffer, utf8.byteOffset, utf8.byteLength);
  let hi = hash32(view, utf8.length, 0);
  let lo = hash32(view, utf8.length, 102072);
  if (hi == 0 && (lo == 0 || lo == 1)) {
    hi = hi ^ 319790063;
    lo = lo ^ -1801410264;
  }
  return BigInt.asUintN(32, BigInt(hi)) << BigInt(32) | BigInt.asUintN(32, BigInt(lo));
}
function computeMsgId(msg, meaning = "") {
  let msgFingerprint = fingerprint(msg);
  if (meaning) {
    msgFingerprint = BigInt.asUintN(64, msgFingerprint << BigInt(1)) | msgFingerprint >> BigInt(63) & BigInt(1);
    msgFingerprint += fingerprint(meaning);
  }
  return BigInt.asUintN(63, msgFingerprint).toString();
}
function hash32(view, length, c) {
  let a = 2654435769, b = 2654435769;
  let index = 0;
  const end = length - 12;
  for (; index <= end; index += 12) {
    a += view.getUint32(index, true);
    b += view.getUint32(index + 4, true);
    c += view.getUint32(index + 8, true);
    const res = mix(a, b, c);
    a = res[0], b = res[1], c = res[2];
  }
  const remainder = length - index;
  c += length;
  if (remainder >= 4) {
    a += view.getUint32(index, true);
    index += 4;
    if (remainder >= 8) {
      b += view.getUint32(index, true);
      index += 4;
      if (remainder >= 9) {
        c += view.getUint8(index++) << 8;
      }
      if (remainder >= 10) {
        c += view.getUint8(index++) << 16;
      }
      if (remainder === 11) {
        c += view.getUint8(index++) << 24;
      }
    } else {
      if (remainder >= 5) {
        b += view.getUint8(index++);
      }
      if (remainder >= 6) {
        b += view.getUint8(index++) << 8;
      }
      if (remainder === 7) {
        b += view.getUint8(index++) << 16;
      }
    }
  } else {
    if (remainder >= 1) {
      a += view.getUint8(index++);
    }
    if (remainder >= 2) {
      a += view.getUint8(index++) << 8;
    }
    if (remainder === 3) {
      a += view.getUint8(index++) << 16;
    }
  }
  return mix(a, b, c)[2];
}
function mix(a, b, c) {
  a -= b;
  a -= c;
  a ^= c >>> 13;
  b -= c;
  b -= a;
  b ^= a << 8;
  c -= a;
  c -= b;
  c ^= b >>> 13;
  a -= b;
  a -= c;
  a ^= c >>> 12;
  b -= c;
  b -= a;
  b ^= a << 16;
  c -= a;
  c -= b;
  c ^= b >>> 5;
  a -= b;
  a -= c;
  a ^= c >>> 3;
  b -= c;
  b -= a;
  b ^= a << 10;
  c -= a;
  c -= b;
  c ^= b >>> 15;
  return [a, b, c];
}
var Endian;
(function(Endian2) {
  Endian2[Endian2["Little"] = 0] = "Little";
  Endian2[Endian2["Big"] = 1] = "Big";
})(Endian || (Endian = {}));
function add32(a, b) {
  return add32to64(a, b)[1];
}
function add32to64(a, b) {
  const low = (a & 65535) + (b & 65535);
  const high = (a >>> 16) + (b >>> 16) + (low >>> 16);
  return [high >>> 16, high << 16 | low & 65535];
}
function rol32(a, count) {
  return a << count | a >>> 32 - count;
}
function bytesToWords32(bytes, endian) {
  const size = bytes.length + 3 >>> 2;
  const words32 = [];
  for (let i = 0; i < size; i++) {
    words32[i] = wordAt(bytes, i * 4, endian);
  }
  return words32;
}
function byteAt(bytes, index) {
  return index >= bytes.length ? 0 : bytes[index];
}
function wordAt(bytes, index, endian) {
  let word = 0;
  if (endian === Endian.Big) {
    for (let i = 0; i < 4; i++) {
      word += byteAt(bytes, index + i) << 24 - 8 * i;
    }
  } else {
    for (let i = 0; i < 4; i++) {
      word += byteAt(bytes, index + i) << 8 * i;
    }
  }
  return word;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/output/output_ast.mjs
var TypeModifier;
(function(TypeModifier2) {
  TypeModifier2[TypeModifier2["None"] = 0] = "None";
  TypeModifier2[TypeModifier2["Const"] = 1] = "Const";
})(TypeModifier || (TypeModifier = {}));
var Type = class {
  constructor(modifiers = TypeModifier.None) {
    this.modifiers = modifiers;
  }
  hasModifier(modifier) {
    return (this.modifiers & modifier) !== 0;
  }
};
var BuiltinTypeName;
(function(BuiltinTypeName2) {
  BuiltinTypeName2[BuiltinTypeName2["Dynamic"] = 0] = "Dynamic";
  BuiltinTypeName2[BuiltinTypeName2["Bool"] = 1] = "Bool";
  BuiltinTypeName2[BuiltinTypeName2["String"] = 2] = "String";
  BuiltinTypeName2[BuiltinTypeName2["Int"] = 3] = "Int";
  BuiltinTypeName2[BuiltinTypeName2["Number"] = 4] = "Number";
  BuiltinTypeName2[BuiltinTypeName2["Function"] = 5] = "Function";
  BuiltinTypeName2[BuiltinTypeName2["Inferred"] = 6] = "Inferred";
  BuiltinTypeName2[BuiltinTypeName2["None"] = 7] = "None";
})(BuiltinTypeName || (BuiltinTypeName = {}));
var BuiltinType = class extends Type {
  constructor(name, modifiers) {
    super(modifiers);
    this.name = name;
  }
  visitType(visitor, context) {
    return visitor.visitBuiltinType(this, context);
  }
};
var ExpressionType = class extends Type {
  constructor(value, modifiers, typeParams = null) {
    super(modifiers);
    this.value = value;
    this.typeParams = typeParams;
  }
  visitType(visitor, context) {
    return visitor.visitExpressionType(this, context);
  }
};
var DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic);
var INFERRED_TYPE = new BuiltinType(BuiltinTypeName.Inferred);
var BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool);
var INT_TYPE = new BuiltinType(BuiltinTypeName.Int);
var NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number);
var STRING_TYPE = new BuiltinType(BuiltinTypeName.String);
var FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);
var NONE_TYPE = new BuiltinType(BuiltinTypeName.None);
var UnaryOperator;
(function(UnaryOperator2) {
  UnaryOperator2[UnaryOperator2["Minus"] = 0] = "Minus";
  UnaryOperator2[UnaryOperator2["Plus"] = 1] = "Plus";
})(UnaryOperator || (UnaryOperator = {}));
var BinaryOperator;
(function(BinaryOperator2) {
  BinaryOperator2[BinaryOperator2["Equals"] = 0] = "Equals";
  BinaryOperator2[BinaryOperator2["NotEquals"] = 1] = "NotEquals";
  BinaryOperator2[BinaryOperator2["Identical"] = 2] = "Identical";
  BinaryOperator2[BinaryOperator2["NotIdentical"] = 3] = "NotIdentical";
  BinaryOperator2[BinaryOperator2["Minus"] = 4] = "Minus";
  BinaryOperator2[BinaryOperator2["Plus"] = 5] = "Plus";
  BinaryOperator2[BinaryOperator2["Divide"] = 6] = "Divide";
  BinaryOperator2[BinaryOperator2["Multiply"] = 7] = "Multiply";
  BinaryOperator2[BinaryOperator2["Modulo"] = 8] = "Modulo";
  BinaryOperator2[BinaryOperator2["And"] = 9] = "And";
  BinaryOperator2[BinaryOperator2["Or"] = 10] = "Or";
  BinaryOperator2[BinaryOperator2["BitwiseAnd"] = 11] = "BitwiseAnd";
  BinaryOperator2[BinaryOperator2["Lower"] = 12] = "Lower";
  BinaryOperator2[BinaryOperator2["LowerEquals"] = 13] = "LowerEquals";
  BinaryOperator2[BinaryOperator2["Bigger"] = 14] = "Bigger";
  BinaryOperator2[BinaryOperator2["BiggerEquals"] = 15] = "BiggerEquals";
  BinaryOperator2[BinaryOperator2["NullishCoalesce"] = 16] = "NullishCoalesce";
})(BinaryOperator || (BinaryOperator = {}));
function nullSafeIsEquivalent(base, other) {
  if (base == null || other == null) {
    return base == other;
  }
  return base.isEquivalent(other);
}
function areAllEquivalentPredicate(base, other, equivalentPredicate) {
  const len = base.length;
  if (len !== other.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (!equivalentPredicate(base[i], other[i])) {
      return false;
    }
  }
  return true;
}
function areAllEquivalent(base, other) {
  return areAllEquivalentPredicate(base, other, (baseElement, otherElement) => baseElement.isEquivalent(otherElement));
}
var Expression = class {
  constructor(type, sourceSpan) {
    this.type = type || null;
    this.sourceSpan = sourceSpan || null;
  }
  prop(name, sourceSpan) {
    return new ReadPropExpr(this, name, null, sourceSpan);
  }
  key(index, type, sourceSpan) {
    return new ReadKeyExpr(this, index, type, sourceSpan);
  }
  callFn(params, sourceSpan, pure) {
    return new InvokeFunctionExpr(this, params, null, sourceSpan, pure);
  }
  instantiate(params, type, sourceSpan) {
    return new InstantiateExpr(this, params, type, sourceSpan);
  }
  conditional(trueCase, falseCase = null, sourceSpan) {
    return new ConditionalExpr(this, trueCase, falseCase, null, sourceSpan);
  }
  equals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs, null, sourceSpan);
  }
  notEquals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs, null, sourceSpan);
  }
  identical(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs, null, sourceSpan);
  }
  notIdentical(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs, null, sourceSpan);
  }
  minus(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs, null, sourceSpan);
  }
  plus(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs, null, sourceSpan);
  }
  divide(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs, null, sourceSpan);
  }
  multiply(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs, null, sourceSpan);
  }
  modulo(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs, null, sourceSpan);
  }
  and(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.And, this, rhs, null, sourceSpan);
  }
  bitwiseAnd(rhs, sourceSpan, parens = true) {
    return new BinaryOperatorExpr(BinaryOperator.BitwiseAnd, this, rhs, null, sourceSpan, parens);
  }
  or(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs, null, sourceSpan);
  }
  lower(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs, null, sourceSpan);
  }
  lowerEquals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs, null, sourceSpan);
  }
  bigger(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs, null, sourceSpan);
  }
  biggerEquals(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs, null, sourceSpan);
  }
  isBlank(sourceSpan) {
    return this.equals(TYPED_NULL_EXPR, sourceSpan);
  }
  nullishCoalesce(rhs, sourceSpan) {
    return new BinaryOperatorExpr(BinaryOperator.NullishCoalesce, this, rhs, null, sourceSpan);
  }
  toStmt() {
    return new ExpressionStatement(this, null);
  }
};
var ReadVarExpr = class extends Expression {
  constructor(name, type, sourceSpan) {
    super(type, sourceSpan);
    this.name = name;
  }
  isEquivalent(e) {
    return e instanceof ReadVarExpr && this.name === e.name;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitReadVarExpr(this, context);
  }
  clone() {
    return new ReadVarExpr(this.name, this.type, this.sourceSpan);
  }
  set(value) {
    return new WriteVarExpr(this.name, value, null, this.sourceSpan);
  }
};
var TypeofExpr = class extends Expression {
  constructor(expr, type, sourceSpan) {
    super(type, sourceSpan);
    this.expr = expr;
  }
  visitExpression(visitor, context) {
    return visitor.visitTypeofExpr(this, context);
  }
  isEquivalent(e) {
    return e instanceof TypeofExpr && e.expr.isEquivalent(this.expr);
  }
  isConstant() {
    return this.expr.isConstant();
  }
  clone() {
    return new TypeofExpr(this.expr.clone());
  }
};
var WrappedNodeExpr = class extends Expression {
  constructor(node, type, sourceSpan) {
    super(type, sourceSpan);
    this.node = node;
  }
  isEquivalent(e) {
    return e instanceof WrappedNodeExpr && this.node === e.node;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWrappedNodeExpr(this, context);
  }
  clone() {
    return new WrappedNodeExpr(this.node, this.type, this.sourceSpan);
  }
};
var WriteVarExpr = class extends Expression {
  constructor(name, value, type, sourceSpan) {
    super(type || value.type, sourceSpan);
    this.name = name;
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof WriteVarExpr && this.name === e.name && this.value.isEquivalent(e.value);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWriteVarExpr(this, context);
  }
  clone() {
    return new WriteVarExpr(this.name, this.value.clone(), this.type, this.sourceSpan);
  }
  toDeclStmt(type, modifiers) {
    return new DeclareVarStmt(this.name, this.value, type, modifiers, this.sourceSpan);
  }
  toConstDecl() {
    return this.toDeclStmt(INFERRED_TYPE, StmtModifier.Final);
  }
};
var WriteKeyExpr = class extends Expression {
  constructor(receiver, index, value, type, sourceSpan) {
    super(type || value.type, sourceSpan);
    this.receiver = receiver;
    this.index = index;
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof WriteKeyExpr && this.receiver.isEquivalent(e.receiver) && this.index.isEquivalent(e.index) && this.value.isEquivalent(e.value);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWriteKeyExpr(this, context);
  }
  clone() {
    return new WriteKeyExpr(this.receiver.clone(), this.index.clone(), this.value.clone(), this.type, this.sourceSpan);
  }
};
var WritePropExpr = class extends Expression {
  constructor(receiver, name, value, type, sourceSpan) {
    super(type || value.type, sourceSpan);
    this.receiver = receiver;
    this.name = name;
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof WritePropExpr && this.receiver.isEquivalent(e.receiver) && this.name === e.name && this.value.isEquivalent(e.value);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitWritePropExpr(this, context);
  }
  clone() {
    return new WritePropExpr(this.receiver.clone(), this.name, this.value.clone(), this.type, this.sourceSpan);
  }
};
var InvokeFunctionExpr = class extends Expression {
  constructor(fn2, args, type, sourceSpan, pure = false) {
    super(type, sourceSpan);
    this.fn = fn2;
    this.args = args;
    this.pure = pure;
  }
  get receiver() {
    return this.fn;
  }
  isEquivalent(e) {
    return e instanceof InvokeFunctionExpr && this.fn.isEquivalent(e.fn) && areAllEquivalent(this.args, e.args) && this.pure === e.pure;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitInvokeFunctionExpr(this, context);
  }
  clone() {
    return new InvokeFunctionExpr(this.fn.clone(), this.args.map((arg) => arg.clone()), this.type, this.sourceSpan, this.pure);
  }
};
var TaggedTemplateExpr = class extends Expression {
  constructor(tag, template2, type, sourceSpan) {
    super(type, sourceSpan);
    this.tag = tag;
    this.template = template2;
  }
  isEquivalent(e) {
    return e instanceof TaggedTemplateExpr && this.tag.isEquivalent(e.tag) && areAllEquivalentPredicate(this.template.elements, e.template.elements, (a, b) => a.text === b.text) && areAllEquivalent(this.template.expressions, e.template.expressions);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitTaggedTemplateExpr(this, context);
  }
  clone() {
    return new TaggedTemplateExpr(this.tag.clone(), this.template.clone(), this.type, this.sourceSpan);
  }
};
var InstantiateExpr = class extends Expression {
  constructor(classExpr, args, type, sourceSpan) {
    super(type, sourceSpan);
    this.classExpr = classExpr;
    this.args = args;
  }
  isEquivalent(e) {
    return e instanceof InstantiateExpr && this.classExpr.isEquivalent(e.classExpr) && areAllEquivalent(this.args, e.args);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitInstantiateExpr(this, context);
  }
  clone() {
    return new InstantiateExpr(this.classExpr.clone(), this.args.map((arg) => arg.clone()), this.type, this.sourceSpan);
  }
};
var LiteralExpr = class extends Expression {
  constructor(value, type, sourceSpan) {
    super(type, sourceSpan);
    this.value = value;
  }
  isEquivalent(e) {
    return e instanceof LiteralExpr && this.value === e.value;
  }
  isConstant() {
    return true;
  }
  visitExpression(visitor, context) {
    return visitor.visitLiteralExpr(this, context);
  }
  clone() {
    return new LiteralExpr(this.value, this.type, this.sourceSpan);
  }
};
var TemplateLiteral = class {
  constructor(elements, expressions) {
    this.elements = elements;
    this.expressions = expressions;
  }
  clone() {
    return new TemplateLiteral(this.elements.map((el) => el.clone()), this.expressions.map((expr) => expr.clone()));
  }
};
var TemplateLiteralElement = class {
  constructor(text2, sourceSpan, rawText) {
    var _a2;
    this.text = text2;
    this.sourceSpan = sourceSpan;
    this.rawText = (_a2 = rawText != null ? rawText : sourceSpan == null ? void 0 : sourceSpan.toString()) != null ? _a2 : escapeForTemplateLiteral(escapeSlashes(text2));
  }
  clone() {
    return new TemplateLiteralElement(this.text, this.sourceSpan, this.rawText);
  }
};
var LiteralPiece = class {
  constructor(text2, sourceSpan) {
    this.text = text2;
    this.sourceSpan = sourceSpan;
  }
};
var PlaceholderPiece = class {
  constructor(text2, sourceSpan, associatedMessage) {
    this.text = text2;
    this.sourceSpan = sourceSpan;
    this.associatedMessage = associatedMessage;
  }
};
var MEANING_SEPARATOR = "|";
var ID_SEPARATOR = "@@";
var LEGACY_ID_INDICATOR = "\u241F";
var LocalizedString = class extends Expression {
  constructor(metaBlock, messageParts, placeHolderNames, expressions, sourceSpan) {
    super(STRING_TYPE, sourceSpan);
    this.metaBlock = metaBlock;
    this.messageParts = messageParts;
    this.placeHolderNames = placeHolderNames;
    this.expressions = expressions;
  }
  isEquivalent(e) {
    return false;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitLocalizedString(this, context);
  }
  clone() {
    return new LocalizedString(this.metaBlock, this.messageParts, this.placeHolderNames, this.expressions.map((expr) => expr.clone()), this.sourceSpan);
  }
  serializeI18nHead() {
    let metaBlock = this.metaBlock.description || "";
    if (this.metaBlock.meaning) {
      metaBlock = `${this.metaBlock.meaning}${MEANING_SEPARATOR}${metaBlock}`;
    }
    if (this.metaBlock.customId) {
      metaBlock = `${metaBlock}${ID_SEPARATOR}${this.metaBlock.customId}`;
    }
    if (this.metaBlock.legacyIds) {
      this.metaBlock.legacyIds.forEach((legacyId) => {
        metaBlock = `${metaBlock}${LEGACY_ID_INDICATOR}${legacyId}`;
      });
    }
    return createCookedRawString(metaBlock, this.messageParts[0].text, this.getMessagePartSourceSpan(0));
  }
  getMessagePartSourceSpan(i) {
    var _a2, _b2;
    return (_b2 = (_a2 = this.messageParts[i]) == null ? void 0 : _a2.sourceSpan) != null ? _b2 : this.sourceSpan;
  }
  getPlaceholderSourceSpan(i) {
    var _a2, _b2, _c2, _d2;
    return (_d2 = (_c2 = (_a2 = this.placeHolderNames[i]) == null ? void 0 : _a2.sourceSpan) != null ? _c2 : (_b2 = this.expressions[i]) == null ? void 0 : _b2.sourceSpan) != null ? _d2 : this.sourceSpan;
  }
  serializeI18nTemplatePart(partIndex) {
    var _a2;
    const placeholder = this.placeHolderNames[partIndex - 1];
    const messagePart = this.messageParts[partIndex];
    let metaBlock = placeholder.text;
    if (((_a2 = placeholder.associatedMessage) == null ? void 0 : _a2.legacyIds.length) === 0) {
      metaBlock += `${ID_SEPARATOR}${computeMsgId(placeholder.associatedMessage.messageString, placeholder.associatedMessage.meaning)}`;
    }
    return createCookedRawString(metaBlock, messagePart.text, this.getMessagePartSourceSpan(partIndex));
  }
};
var escapeSlashes = (str) => str.replace(/\\/g, "\\\\");
var escapeStartingColon = (str) => str.replace(/^:/, "\\:");
var escapeColons = (str) => str.replace(/:/g, "\\:");
var escapeForTemplateLiteral = (str) => str.replace(/`/g, "\\`").replace(/\${/g, "$\\{");
function createCookedRawString(metaBlock, messagePart, range) {
  if (metaBlock === "") {
    return {
      cooked: messagePart,
      raw: escapeForTemplateLiteral(escapeStartingColon(escapeSlashes(messagePart))),
      range
    };
  } else {
    return {
      cooked: `:${metaBlock}:${messagePart}`,
      raw: escapeForTemplateLiteral(`:${escapeColons(escapeSlashes(metaBlock))}:${escapeSlashes(messagePart)}`),
      range
    };
  }
}
var ExternalExpr = class extends Expression {
  constructor(value, type, typeParams = null, sourceSpan) {
    super(type, sourceSpan);
    this.value = value;
    this.typeParams = typeParams;
  }
  isEquivalent(e) {
    return e instanceof ExternalExpr && this.value.name === e.value.name && this.value.moduleName === e.value.moduleName && this.value.runtime === e.value.runtime;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitExternalExpr(this, context);
  }
  clone() {
    return new ExternalExpr(this.value, this.type, this.typeParams, this.sourceSpan);
  }
};
var ConditionalExpr = class extends Expression {
  constructor(condition, trueCase, falseCase = null, type, sourceSpan) {
    super(type || trueCase.type, sourceSpan);
    this.condition = condition;
    this.falseCase = falseCase;
    this.trueCase = trueCase;
  }
  isEquivalent(e) {
    return e instanceof ConditionalExpr && this.condition.isEquivalent(e.condition) && this.trueCase.isEquivalent(e.trueCase) && nullSafeIsEquivalent(this.falseCase, e.falseCase);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitConditionalExpr(this, context);
  }
  clone() {
    var _a2;
    return new ConditionalExpr(this.condition.clone(), this.trueCase.clone(), (_a2 = this.falseCase) == null ? void 0 : _a2.clone(), this.type, this.sourceSpan);
  }
};
var DynamicImportExpr = class extends Expression {
  constructor(url, sourceSpan) {
    super(null, sourceSpan);
    this.url = url;
  }
  isEquivalent(e) {
    return e instanceof DynamicImportExpr && this.url === e.url;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitDynamicImportExpr(this, context);
  }
  clone() {
    return new DynamicImportExpr(this.url, this.sourceSpan);
  }
};
var NotExpr = class extends Expression {
  constructor(condition, sourceSpan) {
    super(BOOL_TYPE, sourceSpan);
    this.condition = condition;
  }
  isEquivalent(e) {
    return e instanceof NotExpr && this.condition.isEquivalent(e.condition);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitNotExpr(this, context);
  }
  clone() {
    return new NotExpr(this.condition.clone(), this.sourceSpan);
  }
};
var FnParam = class {
  constructor(name, type = null) {
    this.name = name;
    this.type = type;
  }
  isEquivalent(param) {
    return this.name === param.name;
  }
  clone() {
    return new FnParam(this.name, this.type);
  }
};
var FunctionExpr = class extends Expression {
  constructor(params, statements, type, sourceSpan, name) {
    super(type, sourceSpan);
    this.params = params;
    this.statements = statements;
    this.name = name;
  }
  isEquivalent(e) {
    return (e instanceof FunctionExpr || e instanceof DeclareFunctionStmt) && areAllEquivalent(this.params, e.params) && areAllEquivalent(this.statements, e.statements);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitFunctionExpr(this, context);
  }
  toDeclStmt(name, modifiers) {
    return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers, this.sourceSpan);
  }
  clone() {
    return new FunctionExpr(this.params.map((p) => p.clone()), this.statements, this.type, this.sourceSpan, this.name);
  }
};
var ArrowFunctionExpr = class extends Expression {
  constructor(params, body, type, sourceSpan) {
    super(type, sourceSpan);
    this.params = params;
    this.body = body;
  }
  isEquivalent(e) {
    if (!(e instanceof ArrowFunctionExpr) || !areAllEquivalent(this.params, e.params)) {
      return false;
    }
    if (this.body instanceof Expression && e.body instanceof Expression) {
      return this.body.isEquivalent(e.body);
    }
    if (Array.isArray(this.body) && Array.isArray(e.body)) {
      return areAllEquivalent(this.body, e.body);
    }
    return false;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitArrowFunctionExpr(this, context);
  }
  clone() {
    return new ArrowFunctionExpr(this.params.map((p) => p.clone()), Array.isArray(this.body) ? this.body : this.body.clone(), this.type, this.sourceSpan);
  }
  toDeclStmt(name, modifiers) {
    return new DeclareVarStmt(name, this, INFERRED_TYPE, modifiers, this.sourceSpan);
  }
};
var UnaryOperatorExpr = class extends Expression {
  constructor(operator, expr, type, sourceSpan, parens = true) {
    super(type || NUMBER_TYPE, sourceSpan);
    this.operator = operator;
    this.expr = expr;
    this.parens = parens;
  }
  isEquivalent(e) {
    return e instanceof UnaryOperatorExpr && this.operator === e.operator && this.expr.isEquivalent(e.expr);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitUnaryOperatorExpr(this, context);
  }
  clone() {
    return new UnaryOperatorExpr(this.operator, this.expr.clone(), this.type, this.sourceSpan, this.parens);
  }
};
var BinaryOperatorExpr = class extends Expression {
  constructor(operator, lhs, rhs, type, sourceSpan, parens = true) {
    super(type || lhs.type, sourceSpan);
    this.operator = operator;
    this.rhs = rhs;
    this.parens = parens;
    this.lhs = lhs;
  }
  isEquivalent(e) {
    return e instanceof BinaryOperatorExpr && this.operator === e.operator && this.lhs.isEquivalent(e.lhs) && this.rhs.isEquivalent(e.rhs);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitBinaryOperatorExpr(this, context);
  }
  clone() {
    return new BinaryOperatorExpr(this.operator, this.lhs.clone(), this.rhs.clone(), this.type, this.sourceSpan, this.parens);
  }
};
var ReadPropExpr = class extends Expression {
  constructor(receiver, name, type, sourceSpan) {
    super(type, sourceSpan);
    this.receiver = receiver;
    this.name = name;
  }
  get index() {
    return this.name;
  }
  isEquivalent(e) {
    return e instanceof ReadPropExpr && this.receiver.isEquivalent(e.receiver) && this.name === e.name;
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitReadPropExpr(this, context);
  }
  set(value) {
    return new WritePropExpr(this.receiver, this.name, value, null, this.sourceSpan);
  }
  clone() {
    return new ReadPropExpr(this.receiver.clone(), this.name, this.type, this.sourceSpan);
  }
};
var ReadKeyExpr = class extends Expression {
  constructor(receiver, index, type, sourceSpan) {
    super(type, sourceSpan);
    this.receiver = receiver;
    this.index = index;
  }
  isEquivalent(e) {
    return e instanceof ReadKeyExpr && this.receiver.isEquivalent(e.receiver) && this.index.isEquivalent(e.index);
  }
  isConstant() {
    return false;
  }
  visitExpression(visitor, context) {
    return visitor.visitReadKeyExpr(this, context);
  }
  set(value) {
    return new WriteKeyExpr(this.receiver, this.index, value, null, this.sourceSpan);
  }
  clone() {
    return new ReadKeyExpr(this.receiver.clone(), this.index.clone(), this.type, this.sourceSpan);
  }
};
var LiteralArrayExpr = class extends Expression {
  constructor(entries, type, sourceSpan) {
    super(type, sourceSpan);
    this.entries = entries;
  }
  isConstant() {
    return this.entries.every((e) => e.isConstant());
  }
  isEquivalent(e) {
    return e instanceof LiteralArrayExpr && areAllEquivalent(this.entries, e.entries);
  }
  visitExpression(visitor, context) {
    return visitor.visitLiteralArrayExpr(this, context);
  }
  clone() {
    return new LiteralArrayExpr(this.entries.map((e) => e.clone()), this.type, this.sourceSpan);
  }
};
var LiteralMapEntry = class {
  constructor(key, value, quoted) {
    this.key = key;
    this.value = value;
    this.quoted = quoted;
  }
  isEquivalent(e) {
    return this.key === e.key && this.value.isEquivalent(e.value);
  }
  clone() {
    return new LiteralMapEntry(this.key, this.value.clone(), this.quoted);
  }
};
var LiteralMapExpr = class extends Expression {
  constructor(entries, type, sourceSpan) {
    super(type, sourceSpan);
    this.entries = entries;
    this.valueType = null;
    if (type) {
      this.valueType = type.valueType;
    }
  }
  isEquivalent(e) {
    return e instanceof LiteralMapExpr && areAllEquivalent(this.entries, e.entries);
  }
  isConstant() {
    return this.entries.every((e) => e.value.isConstant());
  }
  visitExpression(visitor, context) {
    return visitor.visitLiteralMapExpr(this, context);
  }
  clone() {
    const entriesClone = this.entries.map((entry) => entry.clone());
    return new LiteralMapExpr(entriesClone, this.type, this.sourceSpan);
  }
};
var NULL_EXPR = new LiteralExpr(null, null, null);
var TYPED_NULL_EXPR = new LiteralExpr(null, INFERRED_TYPE, null);
var StmtModifier;
(function(StmtModifier2) {
  StmtModifier2[StmtModifier2["None"] = 0] = "None";
  StmtModifier2[StmtModifier2["Final"] = 1] = "Final";
  StmtModifier2[StmtModifier2["Private"] = 2] = "Private";
  StmtModifier2[StmtModifier2["Exported"] = 4] = "Exported";
  StmtModifier2[StmtModifier2["Static"] = 8] = "Static";
})(StmtModifier || (StmtModifier = {}));
var LeadingComment = class {
  constructor(text2, multiline, trailingNewline) {
    this.text = text2;
    this.multiline = multiline;
    this.trailingNewline = trailingNewline;
  }
  toString() {
    return this.multiline ? ` ${this.text} ` : this.text;
  }
};
var JSDocComment = class extends LeadingComment {
  constructor(tags) {
    super("", true, true);
    this.tags = tags;
  }
  toString() {
    return serializeTags(this.tags);
  }
};
var Statement = class {
  constructor(modifiers = StmtModifier.None, sourceSpan = null, leadingComments) {
    this.modifiers = modifiers;
    this.sourceSpan = sourceSpan;
    this.leadingComments = leadingComments;
  }
  hasModifier(modifier) {
    return (this.modifiers & modifier) !== 0;
  }
  addLeadingComment(leadingComment2) {
    var _a2;
    this.leadingComments = (_a2 = this.leadingComments) != null ? _a2 : [];
    this.leadingComments.push(leadingComment2);
  }
};
var DeclareVarStmt = class extends Statement {
  constructor(name, value, type, modifiers, sourceSpan, leadingComments) {
    super(modifiers, sourceSpan, leadingComments);
    this.name = name;
    this.value = value;
    this.type = type || value && value.type || null;
  }
  isEquivalent(stmt) {
    return stmt instanceof DeclareVarStmt && this.name === stmt.name && (this.value ? !!stmt.value && this.value.isEquivalent(stmt.value) : !stmt.value);
  }
  visitStatement(visitor, context) {
    return visitor.visitDeclareVarStmt(this, context);
  }
};
var DeclareFunctionStmt = class extends Statement {
  constructor(name, params, statements, type, modifiers, sourceSpan, leadingComments) {
    super(modifiers, sourceSpan, leadingComments);
    this.name = name;
    this.params = params;
    this.statements = statements;
    this.type = type || null;
  }
  isEquivalent(stmt) {
    return stmt instanceof DeclareFunctionStmt && areAllEquivalent(this.params, stmt.params) && areAllEquivalent(this.statements, stmt.statements);
  }
  visitStatement(visitor, context) {
    return visitor.visitDeclareFunctionStmt(this, context);
  }
};
var ExpressionStatement = class extends Statement {
  constructor(expr, sourceSpan, leadingComments) {
    super(StmtModifier.None, sourceSpan, leadingComments);
    this.expr = expr;
  }
  isEquivalent(stmt) {
    return stmt instanceof ExpressionStatement && this.expr.isEquivalent(stmt.expr);
  }
  visitStatement(visitor, context) {
    return visitor.visitExpressionStmt(this, context);
  }
};
var ReturnStatement = class extends Statement {
  constructor(value, sourceSpan = null, leadingComments) {
    super(StmtModifier.None, sourceSpan, leadingComments);
    this.value = value;
  }
  isEquivalent(stmt) {
    return stmt instanceof ReturnStatement && this.value.isEquivalent(stmt.value);
  }
  visitStatement(visitor, context) {
    return visitor.visitReturnStmt(this, context);
  }
};
var IfStmt = class extends Statement {
  constructor(condition, trueCase, falseCase = [], sourceSpan, leadingComments) {
    super(StmtModifier.None, sourceSpan, leadingComments);
    this.condition = condition;
    this.trueCase = trueCase;
    this.falseCase = falseCase;
  }
  isEquivalent(stmt) {
    return stmt instanceof IfStmt && this.condition.isEquivalent(stmt.condition) && areAllEquivalent(this.trueCase, stmt.trueCase) && areAllEquivalent(this.falseCase, stmt.falseCase);
  }
  visitStatement(visitor, context) {
    return visitor.visitIfStmt(this, context);
  }
};
function jsDocComment(tags = []) {
  return new JSDocComment(tags);
}
function variable(name, type, sourceSpan) {
  return new ReadVarExpr(name, type, sourceSpan);
}
function importExpr(id, typeParams = null, sourceSpan) {
  return new ExternalExpr(id, null, typeParams, sourceSpan);
}
function expressionType(expr, typeModifiers, typeParams) {
  return new ExpressionType(expr, typeModifiers, typeParams);
}
function typeofExpr(expr) {
  return new TypeofExpr(expr);
}
function literalArr(values, type, sourceSpan) {
  return new LiteralArrayExpr(values, type, sourceSpan);
}
function literalMap(values, type = null) {
  return new LiteralMapExpr(values.map((e) => new LiteralMapEntry(e.key, e.value, e.quoted)), type, null);
}
function not(expr, sourceSpan) {
  return new NotExpr(expr, sourceSpan);
}
function fn(params, body, type, sourceSpan, name) {
  return new FunctionExpr(params, body, type, sourceSpan, name);
}
function arrowFn(params, body, type, sourceSpan) {
  return new ArrowFunctionExpr(params, body, type, sourceSpan);
}
function ifStmt(condition, thenClause, elseClause, sourceSpan, leadingComments) {
  return new IfStmt(condition, thenClause, elseClause, sourceSpan, leadingComments);
}
function taggedTemplate(tag, template2, type, sourceSpan) {
  return new TaggedTemplateExpr(tag, template2, type, sourceSpan);
}
function literal(value, type, sourceSpan) {
  return new LiteralExpr(value, type, sourceSpan);
}
function localizedString(metaBlock, messageParts, placeholderNames, expressions, sourceSpan) {
  return new LocalizedString(metaBlock, messageParts, placeholderNames, expressions, sourceSpan);
}
function isNull(exp) {
  return exp instanceof LiteralExpr && exp.value === null;
}
function tagToString(tag) {
  let out = "";
  if (tag.tagName) {
    out += ` @${tag.tagName}`;
  }
  if (tag.text) {
    if (tag.text.match(/\/\*|\*\//)) {
      throw new Error('JSDoc text cannot contain "/*" and "*/"');
    }
    out += " " + tag.text.replace(/@/g, "\\@");
  }
  return out;
}
function serializeTags(tags) {
  if (tags.length === 0)
    return "";
  if (tags.length === 1 && tags[0].tagName && !tags[0].text) {
    return `*${tagToString(tags[0])} `;
  }
  let out = "*\n";
  for (const tag of tags) {
    out += " *";
    out += tagToString(tag).replace(/\n/g, "\n * ");
    out += "\n";
  }
  out += " ";
  return out;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/constant_pool.mjs
var CONSTANT_PREFIX = "_c";
var UNKNOWN_VALUE_KEY = variable("<unknown>");
var KEY_CONTEXT = {};
var POOL_INCLUSION_LENGTH_THRESHOLD_FOR_STRINGS = 50;
var FixupExpression = class extends Expression {
  constructor(resolved) {
    super(resolved.type);
    this.resolved = resolved;
    this.shared = false;
    this.original = resolved;
  }
  visitExpression(visitor, context) {
    if (context === KEY_CONTEXT) {
      return this.original.visitExpression(visitor, context);
    } else {
      return this.resolved.visitExpression(visitor, context);
    }
  }
  isEquivalent(e) {
    return e instanceof FixupExpression && this.resolved.isEquivalent(e.resolved);
  }
  isConstant() {
    return true;
  }
  clone() {
    throw new Error(`Not supported.`);
  }
  fixup(expression) {
    this.resolved = expression;
    this.shared = true;
  }
};
var ConstantPool = class {
  constructor(isClosureCompilerEnabled = false) {
    this.isClosureCompilerEnabled = isClosureCompilerEnabled;
    this.statements = [];
    this.literals = /* @__PURE__ */ new Map();
    this.literalFactories = /* @__PURE__ */ new Map();
    this.sharedConstants = /* @__PURE__ */ new Map();
    this.nextNameIndex = 0;
  }
  getConstLiteral(literal2, forceShared) {
    if (literal2 instanceof LiteralExpr && !isLongStringLiteral(literal2) || literal2 instanceof FixupExpression) {
      return literal2;
    }
    const key = GenericKeyFn.INSTANCE.keyOf(literal2);
    let fixup = this.literals.get(key);
    let newValue = false;
    if (!fixup) {
      fixup = new FixupExpression(literal2);
      this.literals.set(key, fixup);
      newValue = true;
    }
    if (!newValue && !fixup.shared || newValue && forceShared) {
      const name = this.freshName();
      let definition;
      let usage;
      if (this.isClosureCompilerEnabled && isLongStringLiteral(literal2)) {
        definition = variable(name).set(new FunctionExpr(
          [],
          [
            new ReturnStatement(literal2)
          ]
        ));
        usage = variable(name).callFn([]);
      } else {
        definition = variable(name).set(literal2);
        usage = variable(name);
      }
      this.statements.push(definition.toDeclStmt(INFERRED_TYPE, StmtModifier.Final));
      fixup.fixup(usage);
    }
    return fixup;
  }
  getSharedConstant(def, expr) {
    const key = def.keyOf(expr);
    if (!this.sharedConstants.has(key)) {
      const id = this.freshName();
      this.sharedConstants.set(key, variable(id));
      this.statements.push(def.toSharedConstantDeclaration(id, expr));
    }
    return this.sharedConstants.get(key);
  }
  getLiteralFactory(literal2) {
    if (literal2 instanceof LiteralArrayExpr) {
      const argumentsForKey = literal2.entries.map((e) => e.isConstant() ? e : UNKNOWN_VALUE_KEY);
      const key = GenericKeyFn.INSTANCE.keyOf(literalArr(argumentsForKey));
      return this._getLiteralFactory(key, literal2.entries, (entries) => literalArr(entries));
    } else {
      const expressionForKey = literalMap(literal2.entries.map((e) => ({
        key: e.key,
        value: e.value.isConstant() ? e.value : UNKNOWN_VALUE_KEY,
        quoted: e.quoted
      })));
      const key = GenericKeyFn.INSTANCE.keyOf(expressionForKey);
      return this._getLiteralFactory(key, literal2.entries.map((e) => e.value), (entries) => literalMap(entries.map((value, index) => ({
        key: literal2.entries[index].key,
        value,
        quoted: literal2.entries[index].quoted
      }))));
    }
  }
  getSharedFunctionReference(fn2, prefix) {
    var _a2;
    const isArrow = fn2 instanceof ArrowFunctionExpr;
    for (const current of this.statements) {
      if (isArrow && current instanceof DeclareVarStmt && ((_a2 = current.value) == null ? void 0 : _a2.isEquivalent(fn2))) {
        return variable(current.name);
      }
      if (!isArrow && current instanceof DeclareFunctionStmt && fn2.isEquivalent(current)) {
        return variable(current.name);
      }
    }
    const name = this.uniqueName(prefix);
    this.statements.push(fn2.toDeclStmt(name, StmtModifier.Final));
    return variable(name);
  }
  _getLiteralFactory(key, values, resultMap) {
    let literalFactory = this.literalFactories.get(key);
    const literalFactoryArguments = values.filter((e) => !e.isConstant());
    if (!literalFactory) {
      const resultExpressions = values.map((e, index) => e.isConstant() ? this.getConstLiteral(e, true) : variable(`a${index}`));
      const parameters = resultExpressions.filter(isVariable).map((e) => new FnParam(e.name, DYNAMIC_TYPE));
      const pureFunctionDeclaration = arrowFn(parameters, resultMap(resultExpressions), INFERRED_TYPE);
      const name = this.freshName();
      this.statements.push(variable(name).set(pureFunctionDeclaration).toDeclStmt(INFERRED_TYPE, StmtModifier.Final));
      literalFactory = variable(name);
      this.literalFactories.set(key, literalFactory);
    }
    return { literalFactory, literalFactoryArguments };
  }
  uniqueName(prefix) {
    return `${prefix}${this.nextNameIndex++}`;
  }
  freshName() {
    return this.uniqueName(CONSTANT_PREFIX);
  }
};
var _GenericKeyFn = class {
  keyOf(expr) {
    if (expr instanceof LiteralExpr && typeof expr.value === "string") {
      return `"${expr.value}"`;
    } else if (expr instanceof LiteralExpr) {
      return String(expr.value);
    } else if (expr instanceof LiteralArrayExpr) {
      const entries = [];
      for (const entry of expr.entries) {
        entries.push(this.keyOf(entry));
      }
      return `[${entries.join(",")}]`;
    } else if (expr instanceof LiteralMapExpr) {
      const entries = [];
      for (const entry of expr.entries) {
        let key = entry.key;
        if (entry.quoted) {
          key = `"${key}"`;
        }
        entries.push(key + ":" + this.keyOf(entry.value));
      }
      return `{${entries.join(",")}}`;
    } else if (expr instanceof ExternalExpr) {
      return `import("${expr.value.moduleName}", ${expr.value.name})`;
    } else if (expr instanceof ReadVarExpr) {
      return `read(${expr.name})`;
    } else if (expr instanceof TypeofExpr) {
      return `typeof(${this.keyOf(expr.expr)})`;
    } else {
      throw new Error(`${this.constructor.name} does not handle expressions of type ${expr.constructor.name}`);
    }
  }
};
var GenericKeyFn = _GenericKeyFn;
(() => {
  _GenericKeyFn.INSTANCE = new _GenericKeyFn();
})();
function isVariable(e) {
  return e instanceof ReadVarExpr;
}
function isLongStringLiteral(expr) {
  return expr instanceof LiteralExpr && typeof expr.value === "string" && expr.value.length >= POOL_INCLUSION_LENGTH_THRESHOLD_FOR_STRINGS;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_identifiers.mjs
var CORE = "@angular/core";
var _Identifiers = class {
};
var Identifiers = _Identifiers;
(() => {
  _Identifiers.NEW_METHOD = "factory";
})();
(() => {
  _Identifiers.TRANSFORM_METHOD = "transform";
})();
(() => {
  _Identifiers.PATCH_DEPS = "patchedDeps";
})();
(() => {
  _Identifiers.core = { name: null, moduleName: CORE };
})();
(() => {
  _Identifiers.namespaceHTML = { name: "\u0275\u0275namespaceHTML", moduleName: CORE };
})();
(() => {
  _Identifiers.namespaceMathML = { name: "\u0275\u0275namespaceMathML", moduleName: CORE };
})();
(() => {
  _Identifiers.namespaceSVG = { name: "\u0275\u0275namespaceSVG", moduleName: CORE };
})();
(() => {
  _Identifiers.element = { name: "\u0275\u0275element", moduleName: CORE };
})();
(() => {
  _Identifiers.elementStart = { name: "\u0275\u0275elementStart", moduleName: CORE };
})();
(() => {
  _Identifiers.elementEnd = { name: "\u0275\u0275elementEnd", moduleName: CORE };
})();
(() => {
  _Identifiers.advance = { name: "\u0275\u0275advance", moduleName: CORE };
})();
(() => {
  _Identifiers.syntheticHostProperty = { name: "\u0275\u0275syntheticHostProperty", moduleName: CORE };
})();
(() => {
  _Identifiers.syntheticHostListener = { name: "\u0275\u0275syntheticHostListener", moduleName: CORE };
})();
(() => {
  _Identifiers.attribute = { name: "\u0275\u0275attribute", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate1 = { name: "\u0275\u0275attributeInterpolate1", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate2 = { name: "\u0275\u0275attributeInterpolate2", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate3 = { name: "\u0275\u0275attributeInterpolate3", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate4 = { name: "\u0275\u0275attributeInterpolate4", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate5 = { name: "\u0275\u0275attributeInterpolate5", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate6 = { name: "\u0275\u0275attributeInterpolate6", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate7 = { name: "\u0275\u0275attributeInterpolate7", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolate8 = { name: "\u0275\u0275attributeInterpolate8", moduleName: CORE };
})();
(() => {
  _Identifiers.attributeInterpolateV = { name: "\u0275\u0275attributeInterpolateV", moduleName: CORE };
})();
(() => {
  _Identifiers.classProp = { name: "\u0275\u0275classProp", moduleName: CORE };
})();
(() => {
  _Identifiers.elementContainerStart = { name: "\u0275\u0275elementContainerStart", moduleName: CORE };
})();
(() => {
  _Identifiers.elementContainerEnd = { name: "\u0275\u0275elementContainerEnd", moduleName: CORE };
})();
(() => {
  _Identifiers.elementContainer = { name: "\u0275\u0275elementContainer", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMap = { name: "\u0275\u0275styleMap", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate1 = { name: "\u0275\u0275styleMapInterpolate1", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate2 = { name: "\u0275\u0275styleMapInterpolate2", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate3 = { name: "\u0275\u0275styleMapInterpolate3", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate4 = { name: "\u0275\u0275styleMapInterpolate4", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate5 = { name: "\u0275\u0275styleMapInterpolate5", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate6 = { name: "\u0275\u0275styleMapInterpolate6", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate7 = { name: "\u0275\u0275styleMapInterpolate7", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolate8 = { name: "\u0275\u0275styleMapInterpolate8", moduleName: CORE };
})();
(() => {
  _Identifiers.styleMapInterpolateV = { name: "\u0275\u0275styleMapInterpolateV", moduleName: CORE };
})();
(() => {
  _Identifiers.classMap = { name: "\u0275\u0275classMap", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate1 = { name: "\u0275\u0275classMapInterpolate1", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate2 = { name: "\u0275\u0275classMapInterpolate2", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate3 = { name: "\u0275\u0275classMapInterpolate3", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate4 = { name: "\u0275\u0275classMapInterpolate4", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate5 = { name: "\u0275\u0275classMapInterpolate5", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate6 = { name: "\u0275\u0275classMapInterpolate6", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate7 = { name: "\u0275\u0275classMapInterpolate7", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolate8 = { name: "\u0275\u0275classMapInterpolate8", moduleName: CORE };
})();
(() => {
  _Identifiers.classMapInterpolateV = { name: "\u0275\u0275classMapInterpolateV", moduleName: CORE };
})();
(() => {
  _Identifiers.styleProp = { name: "\u0275\u0275styleProp", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate1 = { name: "\u0275\u0275stylePropInterpolate1", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate2 = { name: "\u0275\u0275stylePropInterpolate2", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate3 = { name: "\u0275\u0275stylePropInterpolate3", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate4 = { name: "\u0275\u0275stylePropInterpolate4", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate5 = { name: "\u0275\u0275stylePropInterpolate5", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate6 = { name: "\u0275\u0275stylePropInterpolate6", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate7 = { name: "\u0275\u0275stylePropInterpolate7", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolate8 = { name: "\u0275\u0275stylePropInterpolate8", moduleName: CORE };
})();
(() => {
  _Identifiers.stylePropInterpolateV = { name: "\u0275\u0275stylePropInterpolateV", moduleName: CORE };
})();
(() => {
  _Identifiers.nextContext = { name: "\u0275\u0275nextContext", moduleName: CORE };
})();
(() => {
  _Identifiers.resetView = { name: "\u0275\u0275resetView", moduleName: CORE };
})();
(() => {
  _Identifiers.templateCreate = { name: "\u0275\u0275template", moduleName: CORE };
})();
(() => {
  _Identifiers.defer = { name: "\u0275\u0275defer", moduleName: CORE };
})();
(() => {
  _Identifiers.deferWhen = { name: "\u0275\u0275deferWhen", moduleName: CORE };
})();
(() => {
  _Identifiers.deferOnIdle = { name: "\u0275\u0275deferOnIdle", moduleName: CORE };
})();
(() => {
  _Identifiers.deferOnImmediate = { name: "\u0275\u0275deferOnImmediate", moduleName: CORE };
})();
(() => {
  _Identifiers.deferOnTimer = { name: "\u0275\u0275deferOnTimer", moduleName: CORE };
})();
(() => {
  _Identifiers.deferOnHover = { name: "\u0275\u0275deferOnHover", moduleName: CORE };
})();
(() => {
  _Identifiers.deferOnInteraction = { name: "\u0275\u0275deferOnInteraction", moduleName: CORE };
})();
(() => {
  _Identifiers.deferOnViewport = { name: "\u0275\u0275deferOnViewport", moduleName: CORE };
})();
(() => {
  _Identifiers.deferPrefetchWhen = { name: "\u0275\u0275deferPrefetchWhen", moduleName: CORE };
})();
(() => {
  _Identifiers.deferPrefetchOnIdle = { name: "\u0275\u0275deferPrefetchOnIdle", moduleName: CORE };
})();
(() => {
  _Identifiers.deferPrefetchOnImmediate = { name: "\u0275\u0275deferPrefetchOnImmediate", moduleName: CORE };
})();
(() => {
  _Identifiers.deferPrefetchOnTimer = { name: "\u0275\u0275deferPrefetchOnTimer", moduleName: CORE };
})();
(() => {
  _Identifiers.deferPrefetchOnHover = { name: "\u0275\u0275deferPrefetchOnHover", moduleName: CORE };
})();
(() => {
  _Identifiers.deferPrefetchOnInteraction = { name: "\u0275\u0275deferPrefetchOnInteraction", moduleName: CORE };
})();
(() => {
  _Identifiers.deferPrefetchOnViewport = { name: "\u0275\u0275deferPrefetchOnViewport", moduleName: CORE };
})();
(() => {
  _Identifiers.deferEnableTimerScheduling = { name: "\u0275\u0275deferEnableTimerScheduling", moduleName: CORE };
})();
(() => {
  _Identifiers.conditional = { name: "\u0275\u0275conditional", moduleName: CORE };
})();
(() => {
  _Identifiers.repeater = { name: "\u0275\u0275repeater", moduleName: CORE };
})();
(() => {
  _Identifiers.repeaterCreate = { name: "\u0275\u0275repeaterCreate", moduleName: CORE };
})();
(() => {
  _Identifiers.repeaterTrackByIndex = { name: "\u0275\u0275repeaterTrackByIndex", moduleName: CORE };
})();
(() => {
  _Identifiers.repeaterTrackByIdentity = { name: "\u0275\u0275repeaterTrackByIdentity", moduleName: CORE };
})();
(() => {
  _Identifiers.componentInstance = { name: "\u0275\u0275componentInstance", moduleName: CORE };
})();
(() => {
  _Identifiers.text = { name: "\u0275\u0275text", moduleName: CORE };
})();
(() => {
  _Identifiers.enableBindings = { name: "\u0275\u0275enableBindings", moduleName: CORE };
})();
(() => {
  _Identifiers.disableBindings = { name: "\u0275\u0275disableBindings", moduleName: CORE };
})();
(() => {
  _Identifiers.getCurrentView = { name: "\u0275\u0275getCurrentView", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate = { name: "\u0275\u0275textInterpolate", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate1 = { name: "\u0275\u0275textInterpolate1", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate2 = { name: "\u0275\u0275textInterpolate2", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate3 = { name: "\u0275\u0275textInterpolate3", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate4 = { name: "\u0275\u0275textInterpolate4", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate5 = { name: "\u0275\u0275textInterpolate5", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate6 = { name: "\u0275\u0275textInterpolate6", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate7 = { name: "\u0275\u0275textInterpolate7", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolate8 = { name: "\u0275\u0275textInterpolate8", moduleName: CORE };
})();
(() => {
  _Identifiers.textInterpolateV = { name: "\u0275\u0275textInterpolateV", moduleName: CORE };
})();
(() => {
  _Identifiers.restoreView = { name: "\u0275\u0275restoreView", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction0 = { name: "\u0275\u0275pureFunction0", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction1 = { name: "\u0275\u0275pureFunction1", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction2 = { name: "\u0275\u0275pureFunction2", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction3 = { name: "\u0275\u0275pureFunction3", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction4 = { name: "\u0275\u0275pureFunction4", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction5 = { name: "\u0275\u0275pureFunction5", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction6 = { name: "\u0275\u0275pureFunction6", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction7 = { name: "\u0275\u0275pureFunction7", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunction8 = { name: "\u0275\u0275pureFunction8", moduleName: CORE };
})();
(() => {
  _Identifiers.pureFunctionV = { name: "\u0275\u0275pureFunctionV", moduleName: CORE };
})();
(() => {
  _Identifiers.pipeBind1 = { name: "\u0275\u0275pipeBind1", moduleName: CORE };
})();
(() => {
  _Identifiers.pipeBind2 = { name: "\u0275\u0275pipeBind2", moduleName: CORE };
})();
(() => {
  _Identifiers.pipeBind3 = { name: "\u0275\u0275pipeBind3", moduleName: CORE };
})();
(() => {
  _Identifiers.pipeBind4 = { name: "\u0275\u0275pipeBind4", moduleName: CORE };
})();
(() => {
  _Identifiers.pipeBindV = { name: "\u0275\u0275pipeBindV", moduleName: CORE };
})();
(() => {
  _Identifiers.hostProperty = { name: "\u0275\u0275hostProperty", moduleName: CORE };
})();
(() => {
  _Identifiers.property = { name: "\u0275\u0275property", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate = { name: "\u0275\u0275propertyInterpolate", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate1 = { name: "\u0275\u0275propertyInterpolate1", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate2 = { name: "\u0275\u0275propertyInterpolate2", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate3 = { name: "\u0275\u0275propertyInterpolate3", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate4 = { name: "\u0275\u0275propertyInterpolate4", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate5 = { name: "\u0275\u0275propertyInterpolate5", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate6 = { name: "\u0275\u0275propertyInterpolate6", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate7 = { name: "\u0275\u0275propertyInterpolate7", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolate8 = { name: "\u0275\u0275propertyInterpolate8", moduleName: CORE };
})();
(() => {
  _Identifiers.propertyInterpolateV = { name: "\u0275\u0275propertyInterpolateV", moduleName: CORE };
})();
(() => {
  _Identifiers.i18n = { name: "\u0275\u0275i18n", moduleName: CORE };
})();
(() => {
  _Identifiers.i18nAttributes = { name: "\u0275\u0275i18nAttributes", moduleName: CORE };
})();
(() => {
  _Identifiers.i18nExp = { name: "\u0275\u0275i18nExp", moduleName: CORE };
})();
(() => {
  _Identifiers.i18nStart = { name: "\u0275\u0275i18nStart", moduleName: CORE };
})();
(() => {
  _Identifiers.i18nEnd = { name: "\u0275\u0275i18nEnd", moduleName: CORE };
})();
(() => {
  _Identifiers.i18nApply = { name: "\u0275\u0275i18nApply", moduleName: CORE };
})();
(() => {
  _Identifiers.i18nPostprocess = { name: "\u0275\u0275i18nPostprocess", moduleName: CORE };
})();
(() => {
  _Identifiers.pipe = { name: "\u0275\u0275pipe", moduleName: CORE };
})();
(() => {
  _Identifiers.projection = { name: "\u0275\u0275projection", moduleName: CORE };
})();
(() => {
  _Identifiers.projectionDef = { name: "\u0275\u0275projectionDef", moduleName: CORE };
})();
(() => {
  _Identifiers.reference = { name: "\u0275\u0275reference", moduleName: CORE };
})();
(() => {
  _Identifiers.inject = { name: "\u0275\u0275inject", moduleName: CORE };
})();
(() => {
  _Identifiers.injectAttribute = { name: "\u0275\u0275injectAttribute", moduleName: CORE };
})();
(() => {
  _Identifiers.directiveInject = { name: "\u0275\u0275directiveInject", moduleName: CORE };
})();
(() => {
  _Identifiers.invalidFactory = { name: "\u0275\u0275invalidFactory", moduleName: CORE };
})();
(() => {
  _Identifiers.invalidFactoryDep = { name: "\u0275\u0275invalidFactoryDep", moduleName: CORE };
})();
(() => {
  _Identifiers.templateRefExtractor = { name: "\u0275\u0275templateRefExtractor", moduleName: CORE };
})();
(() => {
  _Identifiers.forwardRef = { name: "forwardRef", moduleName: CORE };
})();
(() => {
  _Identifiers.resolveForwardRef = { name: "resolveForwardRef", moduleName: CORE };
})();
(() => {
  _Identifiers.\u0275\u0275defineInjectable = { name: "\u0275\u0275defineInjectable", moduleName: CORE };
})();
(() => {
  _Identifiers.declareInjectable = { name: "\u0275\u0275ngDeclareInjectable", moduleName: CORE };
})();
(() => {
  _Identifiers.InjectableDeclaration = { name: "\u0275\u0275InjectableDeclaration", moduleName: CORE };
})();
(() => {
  _Identifiers.resolveWindow = { name: "\u0275\u0275resolveWindow", moduleName: CORE };
})();
(() => {
  _Identifiers.resolveDocument = { name: "\u0275\u0275resolveDocument", moduleName: CORE };
})();
(() => {
  _Identifiers.resolveBody = { name: "\u0275\u0275resolveBody", moduleName: CORE };
})();
(() => {
  _Identifiers.getComponentDepsFactory = { name: "\u0275\u0275getComponentDepsFactory", moduleName: CORE };
})();
(() => {
  _Identifiers.defineComponent = { name: "\u0275\u0275defineComponent", moduleName: CORE };
})();
(() => {
  _Identifiers.declareComponent = { name: "\u0275\u0275ngDeclareComponent", moduleName: CORE };
})();
(() => {
  _Identifiers.setComponentScope = { name: "\u0275\u0275setComponentScope", moduleName: CORE };
})();
(() => {
  _Identifiers.ChangeDetectionStrategy = {
    name: "ChangeDetectionStrategy",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.ViewEncapsulation = {
    name: "ViewEncapsulation",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.ComponentDeclaration = {
    name: "\u0275\u0275ComponentDeclaration",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.FactoryDeclaration = {
    name: "\u0275\u0275FactoryDeclaration",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.declareFactory = { name: "\u0275\u0275ngDeclareFactory", moduleName: CORE };
})();
(() => {
  _Identifiers.FactoryTarget = { name: "\u0275\u0275FactoryTarget", moduleName: CORE };
})();
(() => {
  _Identifiers.defineDirective = { name: "\u0275\u0275defineDirective", moduleName: CORE };
})();
(() => {
  _Identifiers.declareDirective = { name: "\u0275\u0275ngDeclareDirective", moduleName: CORE };
})();
(() => {
  _Identifiers.DirectiveDeclaration = {
    name: "\u0275\u0275DirectiveDeclaration",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.InjectorDef = { name: "\u0275\u0275InjectorDef", moduleName: CORE };
})();
(() => {
  _Identifiers.InjectorDeclaration = { name: "\u0275\u0275InjectorDeclaration", moduleName: CORE };
})();
(() => {
  _Identifiers.defineInjector = { name: "\u0275\u0275defineInjector", moduleName: CORE };
})();
(() => {
  _Identifiers.declareInjector = { name: "\u0275\u0275ngDeclareInjector", moduleName: CORE };
})();
(() => {
  _Identifiers.NgModuleDeclaration = {
    name: "\u0275\u0275NgModuleDeclaration",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.ModuleWithProviders = {
    name: "ModuleWithProviders",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.defineNgModule = { name: "\u0275\u0275defineNgModule", moduleName: CORE };
})();
(() => {
  _Identifiers.declareNgModule = { name: "\u0275\u0275ngDeclareNgModule", moduleName: CORE };
})();
(() => {
  _Identifiers.setNgModuleScope = { name: "\u0275\u0275setNgModuleScope", moduleName: CORE };
})();
(() => {
  _Identifiers.registerNgModuleType = { name: "\u0275\u0275registerNgModuleType", moduleName: CORE };
})();
(() => {
  _Identifiers.PipeDeclaration = { name: "\u0275\u0275PipeDeclaration", moduleName: CORE };
})();
(() => {
  _Identifiers.definePipe = { name: "\u0275\u0275definePipe", moduleName: CORE };
})();
(() => {
  _Identifiers.declarePipe = { name: "\u0275\u0275ngDeclarePipe", moduleName: CORE };
})();
(() => {
  _Identifiers.declareClassMetadata = { name: "\u0275\u0275ngDeclareClassMetadata", moduleName: CORE };
})();
(() => {
  _Identifiers.setClassMetadata = { name: "\u0275setClassMetadata", moduleName: CORE };
})();
(() => {
  _Identifiers.setClassMetadataAsync = { name: "\u0275setClassMetadataAsync", moduleName: CORE };
})();
(() => {
  _Identifiers.setClassDebugInfo = { name: "\u0275setClassDebugInfo", moduleName: CORE };
})();
(() => {
  _Identifiers.queryRefresh = { name: "\u0275\u0275queryRefresh", moduleName: CORE };
})();
(() => {
  _Identifiers.viewQuery = { name: "\u0275\u0275viewQuery", moduleName: CORE };
})();
(() => {
  _Identifiers.loadQuery = { name: "\u0275\u0275loadQuery", moduleName: CORE };
})();
(() => {
  _Identifiers.contentQuery = { name: "\u0275\u0275contentQuery", moduleName: CORE };
})();
(() => {
  _Identifiers.NgOnChangesFeature = { name: "\u0275\u0275NgOnChangesFeature", moduleName: CORE };
})();
(() => {
  _Identifiers.InheritDefinitionFeature = { name: "\u0275\u0275InheritDefinitionFeature", moduleName: CORE };
})();
(() => {
  _Identifiers.CopyDefinitionFeature = { name: "\u0275\u0275CopyDefinitionFeature", moduleName: CORE };
})();
(() => {
  _Identifiers.StandaloneFeature = { name: "\u0275\u0275StandaloneFeature", moduleName: CORE };
})();
(() => {
  _Identifiers.ProvidersFeature = { name: "\u0275\u0275ProvidersFeature", moduleName: CORE };
})();
(() => {
  _Identifiers.HostDirectivesFeature = { name: "\u0275\u0275HostDirectivesFeature", moduleName: CORE };
})();
(() => {
  _Identifiers.InputTransformsFeatureFeature = { name: "\u0275\u0275InputTransformsFeature", moduleName: CORE };
})();
(() => {
  _Identifiers.listener = { name: "\u0275\u0275listener", moduleName: CORE };
})();
(() => {
  _Identifiers.getInheritedFactory = {
    name: "\u0275\u0275getInheritedFactory",
    moduleName: CORE
  };
})();
(() => {
  _Identifiers.sanitizeHtml = { name: "\u0275\u0275sanitizeHtml", moduleName: CORE };
})();
(() => {
  _Identifiers.sanitizeStyle = { name: "\u0275\u0275sanitizeStyle", moduleName: CORE };
})();
(() => {
  _Identifiers.sanitizeResourceUrl = { name: "\u0275\u0275sanitizeResourceUrl", moduleName: CORE };
})();
(() => {
  _Identifiers.sanitizeScript = { name: "\u0275\u0275sanitizeScript", moduleName: CORE };
})();
(() => {
  _Identifiers.sanitizeUrl = { name: "\u0275\u0275sanitizeUrl", moduleName: CORE };
})();
(() => {
  _Identifiers.sanitizeUrlOrResourceUrl = { name: "\u0275\u0275sanitizeUrlOrResourceUrl", moduleName: CORE };
})();
(() => {
  _Identifiers.trustConstantHtml = { name: "\u0275\u0275trustConstantHtml", moduleName: CORE };
})();
(() => {
  _Identifiers.trustConstantResourceUrl = { name: "\u0275\u0275trustConstantResourceUrl", moduleName: CORE };
})();
(() => {
  _Identifiers.validateIframeAttribute = { name: "\u0275\u0275validateIframeAttribute", moduleName: CORE };
})();

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/util.mjs
var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
function splitAtColon(input, defaultValues) {
  return _splitAt(input, ":", defaultValues);
}
function splitAtPeriod(input, defaultValues) {
  return _splitAt(input, ".", defaultValues);
}
function _splitAt(input, character, defaultValues) {
  const characterIndex = input.indexOf(character);
  if (characterIndex == -1)
    return defaultValues;
  return [input.slice(0, characterIndex).trim(), input.slice(characterIndex + 1).trim()];
}
function error(msg) {
  throw new Error(`Internal Error: ${msg}`);
}
function utf8Encode(str) {
  let encoded = [];
  for (let index = 0; index < str.length; index++) {
    let codePoint = str.charCodeAt(index);
    if (codePoint >= 55296 && codePoint <= 56319 && str.length > index + 1) {
      const low = str.charCodeAt(index + 1);
      if (low >= 56320 && low <= 57343) {
        index++;
        codePoint = (codePoint - 55296 << 10) + low - 56320 + 65536;
      }
    }
    if (codePoint <= 127) {
      encoded.push(codePoint);
    } else if (codePoint <= 2047) {
      encoded.push(codePoint >> 6 & 31 | 192, codePoint & 63 | 128);
    } else if (codePoint <= 65535) {
      encoded.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else if (codePoint <= 2097151) {
      encoded.push(codePoint >> 18 & 7 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    }
  }
  return encoded;
}
function stringify(token) {
  if (typeof token === "string") {
    return token;
  }
  if (Array.isArray(token)) {
    return "[" + token.map(stringify).join(", ") + "]";
  }
  if (token == null) {
    return "" + token;
  }
  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }
  if (token.name) {
    return `${token.name}`;
  }
  if (!token.toString) {
    return "object";
  }
  const res = token.toString();
  if (res == null) {
    return "" + res;
  }
  const newLineIndex = res.indexOf("\n");
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
var Version = class {
  constructor(full) {
    this.full = full;
    const splits = full.split(".");
    this.major = splits[0];
    this.minor = splits[1];
    this.patch = splits.slice(2).join(".");
  }
};
var _global = globalThis;
function partitionArray(arr, conditionFn) {
  const truthy = [];
  const falsy = [];
  for (const item of arr) {
    (conditionFn(item) ? truthy : falsy).push(item);
  }
  return [truthy, falsy];
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/output/source_map.mjs
var VERSION = 3;
var JS_B64_PREFIX = "# sourceMappingURL=data:application/json;base64,";
var SourceMapGenerator = class {
  constructor(file = null) {
    this.file = file;
    this.sourcesContent = /* @__PURE__ */ new Map();
    this.lines = [];
    this.lastCol0 = 0;
    this.hasMappings = false;
  }
  addSource(url, content = null) {
    if (!this.sourcesContent.has(url)) {
      this.sourcesContent.set(url, content);
    }
    return this;
  }
  addLine() {
    this.lines.push([]);
    this.lastCol0 = 0;
    return this;
  }
  addMapping(col0, sourceUrl, sourceLine0, sourceCol0) {
    if (!this.currentLine) {
      throw new Error(`A line must be added before mappings can be added`);
    }
    if (sourceUrl != null && !this.sourcesContent.has(sourceUrl)) {
      throw new Error(`Unknown source file "${sourceUrl}"`);
    }
    if (col0 == null) {
      throw new Error(`The column in the generated code must be provided`);
    }
    if (col0 < this.lastCol0) {
      throw new Error(`Mapping should be added in output order`);
    }
    if (sourceUrl && (sourceLine0 == null || sourceCol0 == null)) {
      throw new Error(`The source location must be provided when a source url is provided`);
    }
    this.hasMappings = true;
    this.lastCol0 = col0;
    this.currentLine.push({ col0, sourceUrl, sourceLine0, sourceCol0 });
    return this;
  }
  get currentLine() {
    return this.lines.slice(-1)[0];
  }
  toJSON() {
    if (!this.hasMappings) {
      return null;
    }
    const sourcesIndex = /* @__PURE__ */ new Map();
    const sources = [];
    const sourcesContent = [];
    Array.from(this.sourcesContent.keys()).forEach((url, i) => {
      sourcesIndex.set(url, i);
      sources.push(url);
      sourcesContent.push(this.sourcesContent.get(url) || null);
    });
    let mappings = "";
    let lastCol0 = 0;
    let lastSourceIndex = 0;
    let lastSourceLine0 = 0;
    let lastSourceCol0 = 0;
    this.lines.forEach((segments) => {
      lastCol0 = 0;
      mappings += segments.map((segment) => {
        let segAsStr = toBase64VLQ(segment.col0 - lastCol0);
        lastCol0 = segment.col0;
        if (segment.sourceUrl != null) {
          segAsStr += toBase64VLQ(sourcesIndex.get(segment.sourceUrl) - lastSourceIndex);
          lastSourceIndex = sourcesIndex.get(segment.sourceUrl);
          segAsStr += toBase64VLQ(segment.sourceLine0 - lastSourceLine0);
          lastSourceLine0 = segment.sourceLine0;
          segAsStr += toBase64VLQ(segment.sourceCol0 - lastSourceCol0);
          lastSourceCol0 = segment.sourceCol0;
        }
        return segAsStr;
      }).join(",");
      mappings += ";";
    });
    mappings = mappings.slice(0, -1);
    return {
      "file": this.file || "",
      "version": VERSION,
      "sourceRoot": "",
      "sources": sources,
      "sourcesContent": sourcesContent,
      "mappings": mappings
    };
  }
  toJsComment() {
    return this.hasMappings ? "//" + JS_B64_PREFIX + toBase64String(JSON.stringify(this, null, 0)) : "";
  }
};
function toBase64String(value) {
  let b64 = "";
  const encoded = utf8Encode(value);
  for (let i = 0; i < encoded.length; ) {
    const i1 = encoded[i++];
    const i2 = i < encoded.length ? encoded[i++] : null;
    const i3 = i < encoded.length ? encoded[i++] : null;
    b64 += toBase64Digit(i1 >> 2);
    b64 += toBase64Digit((i1 & 3) << 4 | (i2 === null ? 0 : i2 >> 4));
    b64 += i2 === null ? "=" : toBase64Digit((i2 & 15) << 2 | (i3 === null ? 0 : i3 >> 6));
    b64 += i2 === null || i3 === null ? "=" : toBase64Digit(i3 & 63);
  }
  return b64;
}
function toBase64VLQ(value) {
  value = value < 0 ? (-value << 1) + 1 : value << 1;
  let out = "";
  do {
    let digit = value & 31;
    value = value >> 5;
    if (value > 0) {
      digit = digit | 32;
    }
    out += toBase64Digit(digit);
  } while (value > 0);
  return out;
}
var B64_DIGITS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function toBase64Digit(value) {
  if (value < 0 || value >= 64) {
    throw new Error(`Can only encode value in the range [0, 63]`);
  }
  return B64_DIGITS[value];
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/output/abstract_emitter.mjs
var _SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
var _LEGAL_IDENTIFIER_RE = /^[$A-Z_][0-9A-Z_$]*$/i;
var _INDENT_WITH = "  ";
var _EmittedLine = class {
  constructor(indent) {
    this.indent = indent;
    this.partsLength = 0;
    this.parts = [];
    this.srcSpans = [];
  }
};
var EmitterVisitorContext = class {
  static createRoot() {
    return new EmitterVisitorContext(0);
  }
  constructor(_indent) {
    this._indent = _indent;
    this._lines = [new _EmittedLine(_indent)];
  }
  get _currentLine() {
    return this._lines[this._lines.length - 1];
  }
  println(from, lastPart = "") {
    this.print(from || null, lastPart, true);
  }
  lineIsEmpty() {
    return this._currentLine.parts.length === 0;
  }
  lineLength() {
    return this._currentLine.indent * _INDENT_WITH.length + this._currentLine.partsLength;
  }
  print(from, part, newLine = false) {
    if (part.length > 0) {
      this._currentLine.parts.push(part);
      this._currentLine.partsLength += part.length;
      this._currentLine.srcSpans.push(from && from.sourceSpan || null);
    }
    if (newLine) {
      this._lines.push(new _EmittedLine(this._indent));
    }
  }
  removeEmptyLastLine() {
    if (this.lineIsEmpty()) {
      this._lines.pop();
    }
  }
  incIndent() {
    this._indent++;
    if (this.lineIsEmpty()) {
      this._currentLine.indent = this._indent;
    }
  }
  decIndent() {
    this._indent--;
    if (this.lineIsEmpty()) {
      this._currentLine.indent = this._indent;
    }
  }
  toSource() {
    return this.sourceLines.map((l) => l.parts.length > 0 ? _createIndent(l.indent) + l.parts.join("") : "").join("\n");
  }
  toSourceMapGenerator(genFilePath, startsAtLine = 0) {
    const map = new SourceMapGenerator(genFilePath);
    let firstOffsetMapped = false;
    const mapFirstOffsetIfNeeded = () => {
      if (!firstOffsetMapped) {
        map.addSource(genFilePath, " ").addMapping(0, genFilePath, 0, 0);
        firstOffsetMapped = true;
      }
    };
    for (let i = 0; i < startsAtLine; i++) {
      map.addLine();
      mapFirstOffsetIfNeeded();
    }
    this.sourceLines.forEach((line, lineIdx) => {
      map.addLine();
      const spans = line.srcSpans;
      const parts = line.parts;
      let col0 = line.indent * _INDENT_WITH.length;
      let spanIdx = 0;
      while (spanIdx < spans.length && !spans[spanIdx]) {
        col0 += parts[spanIdx].length;
        spanIdx++;
      }
      if (spanIdx < spans.length && lineIdx === 0 && col0 === 0) {
        firstOffsetMapped = true;
      } else {
        mapFirstOffsetIfNeeded();
      }
      while (spanIdx < spans.length) {
        const span = spans[spanIdx];
        const source = span.start.file;
        const sourceLine = span.start.line;
        const sourceCol = span.start.col;
        map.addSource(source.url, source.content).addMapping(col0, source.url, sourceLine, sourceCol);
        col0 += parts[spanIdx].length;
        spanIdx++;
        while (spanIdx < spans.length && (span === spans[spanIdx] || !spans[spanIdx])) {
          col0 += parts[spanIdx].length;
          spanIdx++;
        }
      }
    });
    return map;
  }
  spanOf(line, column) {
    const emittedLine = this._lines[line];
    if (emittedLine) {
      let columnsLeft = column - _createIndent(emittedLine.indent).length;
      for (let partIndex = 0; partIndex < emittedLine.parts.length; partIndex++) {
        const part = emittedLine.parts[partIndex];
        if (part.length > columnsLeft) {
          return emittedLine.srcSpans[partIndex];
        }
        columnsLeft -= part.length;
      }
    }
    return null;
  }
  get sourceLines() {
    if (this._lines.length && this._lines[this._lines.length - 1].parts.length === 0) {
      return this._lines.slice(0, -1);
    }
    return this._lines;
  }
};
var AbstractEmitterVisitor = class {
  constructor(_escapeDollarInStrings) {
    this._escapeDollarInStrings = _escapeDollarInStrings;
  }
  printLeadingComments(stmt, ctx) {
    if (stmt.leadingComments === void 0) {
      return;
    }
    for (const comment of stmt.leadingComments) {
      if (comment instanceof JSDocComment) {
        ctx.print(stmt, `/*${comment.toString()}*/`, comment.trailingNewline);
      } else {
        if (comment.multiline) {
          ctx.print(stmt, `/* ${comment.text} */`, comment.trailingNewline);
        } else {
          comment.text.split("\n").forEach((line) => {
            ctx.println(stmt, `// ${line}`);
          });
        }
      }
    }
  }
  visitExpressionStmt(stmt, ctx) {
    this.printLeadingComments(stmt, ctx);
    stmt.expr.visitExpression(this, ctx);
    ctx.println(stmt, ";");
    return null;
  }
  visitReturnStmt(stmt, ctx) {
    this.printLeadingComments(stmt, ctx);
    ctx.print(stmt, `return `);
    stmt.value.visitExpression(this, ctx);
    ctx.println(stmt, ";");
    return null;
  }
  visitIfStmt(stmt, ctx) {
    this.printLeadingComments(stmt, ctx);
    ctx.print(stmt, `if (`);
    stmt.condition.visitExpression(this, ctx);
    ctx.print(stmt, `) {`);
    const hasElseCase = stmt.falseCase != null && stmt.falseCase.length > 0;
    if (stmt.trueCase.length <= 1 && !hasElseCase) {
      ctx.print(stmt, ` `);
      this.visitAllStatements(stmt.trueCase, ctx);
      ctx.removeEmptyLastLine();
      ctx.print(stmt, ` `);
    } else {
      ctx.println();
      ctx.incIndent();
      this.visitAllStatements(stmt.trueCase, ctx);
      ctx.decIndent();
      if (hasElseCase) {
        ctx.println(stmt, `} else {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.falseCase, ctx);
        ctx.decIndent();
      }
    }
    ctx.println(stmt, `}`);
    return null;
  }
  visitWriteVarExpr(expr, ctx) {
    const lineWasEmpty = ctx.lineIsEmpty();
    if (!lineWasEmpty) {
      ctx.print(expr, "(");
    }
    ctx.print(expr, `${expr.name} = `);
    expr.value.visitExpression(this, ctx);
    if (!lineWasEmpty) {
      ctx.print(expr, ")");
    }
    return null;
  }
  visitWriteKeyExpr(expr, ctx) {
    const lineWasEmpty = ctx.lineIsEmpty();
    if (!lineWasEmpty) {
      ctx.print(expr, "(");
    }
    expr.receiver.visitExpression(this, ctx);
    ctx.print(expr, `[`);
    expr.index.visitExpression(this, ctx);
    ctx.print(expr, `] = `);
    expr.value.visitExpression(this, ctx);
    if (!lineWasEmpty) {
      ctx.print(expr, ")");
    }
    return null;
  }
  visitWritePropExpr(expr, ctx) {
    const lineWasEmpty = ctx.lineIsEmpty();
    if (!lineWasEmpty) {
      ctx.print(expr, "(");
    }
    expr.receiver.visitExpression(this, ctx);
    ctx.print(expr, `.${expr.name} = `);
    expr.value.visitExpression(this, ctx);
    if (!lineWasEmpty) {
      ctx.print(expr, ")");
    }
    return null;
  }
  visitInvokeFunctionExpr(expr, ctx) {
    const shouldParenthesize = expr.fn instanceof ArrowFunctionExpr;
    if (shouldParenthesize) {
      ctx.print(expr.fn, "(");
    }
    expr.fn.visitExpression(this, ctx);
    if (shouldParenthesize) {
      ctx.print(expr.fn, ")");
    }
    ctx.print(expr, `(`);
    this.visitAllExpressions(expr.args, ctx, ",");
    ctx.print(expr, `)`);
    return null;
  }
  visitTaggedTemplateExpr(expr, ctx) {
    expr.tag.visitExpression(this, ctx);
    ctx.print(expr, "`" + expr.template.elements[0].rawText);
    for (let i = 1; i < expr.template.elements.length; i++) {
      ctx.print(expr, "${");
      expr.template.expressions[i - 1].visitExpression(this, ctx);
      ctx.print(expr, `}${expr.template.elements[i].rawText}`);
    }
    ctx.print(expr, "`");
    return null;
  }
  visitWrappedNodeExpr(ast, ctx) {
    throw new Error("Abstract emitter cannot visit WrappedNodeExpr.");
  }
  visitTypeofExpr(expr, ctx) {
    ctx.print(expr, "typeof ");
    expr.expr.visitExpression(this, ctx);
  }
  visitReadVarExpr(ast, ctx) {
    ctx.print(ast, ast.name);
    return null;
  }
  visitInstantiateExpr(ast, ctx) {
    ctx.print(ast, `new `);
    ast.classExpr.visitExpression(this, ctx);
    ctx.print(ast, `(`);
    this.visitAllExpressions(ast.args, ctx, ",");
    ctx.print(ast, `)`);
    return null;
  }
  visitLiteralExpr(ast, ctx) {
    const value = ast.value;
    if (typeof value === "string") {
      ctx.print(ast, escapeIdentifier(value, this._escapeDollarInStrings));
    } else {
      ctx.print(ast, `${value}`);
    }
    return null;
  }
  visitLocalizedString(ast, ctx) {
    const head = ast.serializeI18nHead();
    ctx.print(ast, "$localize `" + head.raw);
    for (let i = 1; i < ast.messageParts.length; i++) {
      ctx.print(ast, "${");
      ast.expressions[i - 1].visitExpression(this, ctx);
      ctx.print(ast, `}${ast.serializeI18nTemplatePart(i).raw}`);
    }
    ctx.print(ast, "`");
    return null;
  }
  visitConditionalExpr(ast, ctx) {
    ctx.print(ast, `(`);
    ast.condition.visitExpression(this, ctx);
    ctx.print(ast, "? ");
    ast.trueCase.visitExpression(this, ctx);
    ctx.print(ast, ": ");
    ast.falseCase.visitExpression(this, ctx);
    ctx.print(ast, `)`);
    return null;
  }
  visitDynamicImportExpr(ast, ctx) {
    ctx.print(ast, `import(${ast.url})`);
  }
  visitNotExpr(ast, ctx) {
    ctx.print(ast, "!");
    ast.condition.visitExpression(this, ctx);
    return null;
  }
  visitUnaryOperatorExpr(ast, ctx) {
    let opStr;
    switch (ast.operator) {
      case UnaryOperator.Plus:
        opStr = "+";
        break;
      case UnaryOperator.Minus:
        opStr = "-";
        break;
      default:
        throw new Error(`Unknown operator ${ast.operator}`);
    }
    if (ast.parens)
      ctx.print(ast, `(`);
    ctx.print(ast, opStr);
    ast.expr.visitExpression(this, ctx);
    if (ast.parens)
      ctx.print(ast, `)`);
    return null;
  }
  visitBinaryOperatorExpr(ast, ctx) {
    let opStr;
    switch (ast.operator) {
      case BinaryOperator.Equals:
        opStr = "==";
        break;
      case BinaryOperator.Identical:
        opStr = "===";
        break;
      case BinaryOperator.NotEquals:
        opStr = "!=";
        break;
      case BinaryOperator.NotIdentical:
        opStr = "!==";
        break;
      case BinaryOperator.And:
        opStr = "&&";
        break;
      case BinaryOperator.BitwiseAnd:
        opStr = "&";
        break;
      case BinaryOperator.Or:
        opStr = "||";
        break;
      case BinaryOperator.Plus:
        opStr = "+";
        break;
      case BinaryOperator.Minus:
        opStr = "-";
        break;
      case BinaryOperator.Divide:
        opStr = "/";
        break;
      case BinaryOperator.Multiply:
        opStr = "*";
        break;
      case BinaryOperator.Modulo:
        opStr = "%";
        break;
      case BinaryOperator.Lower:
        opStr = "<";
        break;
      case BinaryOperator.LowerEquals:
        opStr = "<=";
        break;
      case BinaryOperator.Bigger:
        opStr = ">";
        break;
      case BinaryOperator.BiggerEquals:
        opStr = ">=";
        break;
      case BinaryOperator.NullishCoalesce:
        opStr = "??";
        break;
      default:
        throw new Error(`Unknown operator ${ast.operator}`);
    }
    if (ast.parens)
      ctx.print(ast, `(`);
    ast.lhs.visitExpression(this, ctx);
    ctx.print(ast, ` ${opStr} `);
    ast.rhs.visitExpression(this, ctx);
    if (ast.parens)
      ctx.print(ast, `)`);
    return null;
  }
  visitReadPropExpr(ast, ctx) {
    ast.receiver.visitExpression(this, ctx);
    ctx.print(ast, `.`);
    ctx.print(ast, ast.name);
    return null;
  }
  visitReadKeyExpr(ast, ctx) {
    ast.receiver.visitExpression(this, ctx);
    ctx.print(ast, `[`);
    ast.index.visitExpression(this, ctx);
    ctx.print(ast, `]`);
    return null;
  }
  visitLiteralArrayExpr(ast, ctx) {
    ctx.print(ast, `[`);
    this.visitAllExpressions(ast.entries, ctx, ",");
    ctx.print(ast, `]`);
    return null;
  }
  visitLiteralMapExpr(ast, ctx) {
    ctx.print(ast, `{`);
    this.visitAllObjects((entry) => {
      ctx.print(ast, `${escapeIdentifier(entry.key, this._escapeDollarInStrings, entry.quoted)}:`);
      entry.value.visitExpression(this, ctx);
    }, ast.entries, ctx, ",");
    ctx.print(ast, `}`);
    return null;
  }
  visitCommaExpr(ast, ctx) {
    ctx.print(ast, "(");
    this.visitAllExpressions(ast.parts, ctx, ",");
    ctx.print(ast, ")");
    return null;
  }
  visitAllExpressions(expressions, ctx, separator) {
    this.visitAllObjects((expr) => expr.visitExpression(this, ctx), expressions, ctx, separator);
  }
  visitAllObjects(handler, expressions, ctx, separator) {
    let incrementedIndent = false;
    for (let i = 0; i < expressions.length; i++) {
      if (i > 0) {
        if (ctx.lineLength() > 80) {
          ctx.print(null, separator, true);
          if (!incrementedIndent) {
            ctx.incIndent();
            ctx.incIndent();
            incrementedIndent = true;
          }
        } else {
          ctx.print(null, separator, false);
        }
      }
      handler(expressions[i]);
    }
    if (incrementedIndent) {
      ctx.decIndent();
      ctx.decIndent();
    }
  }
  visitAllStatements(statements, ctx) {
    statements.forEach((stmt) => stmt.visitStatement(this, ctx));
  }
};
function escapeIdentifier(input, escapeDollar, alwaysQuote = true) {
  if (input == null) {
    return null;
  }
  const body = input.replace(_SINGLE_QUOTE_ESCAPE_STRING_RE, (...match) => {
    if (match[0] == "$") {
      return escapeDollar ? "\\$" : "$";
    } else if (match[0] == "\n") {
      return "\\n";
    } else if (match[0] == "\r") {
      return "\\r";
    } else {
      return `\\${match[0]}`;
    }
  });
  const requiresQuotes = alwaysQuote || !_LEGAL_IDENTIFIER_RE.test(body);
  return requiresQuotes ? `'${body}'` : body;
}
function _createIndent(count) {
  let res = "";
  for (let i = 0; i < count; i++) {
    res += _INDENT_WITH;
  }
  return res;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/util.mjs
function typeWithParameters(type, numParams) {
  if (numParams === 0) {
    return expressionType(type);
  }
  const params = [];
  for (let i = 0; i < numParams; i++) {
    params.push(DYNAMIC_TYPE);
  }
  return expressionType(type, void 0, params);
}
var ANIMATE_SYMBOL_PREFIX = "@";
function prepareSyntheticPropertyName(name) {
  return `${ANIMATE_SYMBOL_PREFIX}${name}`;
}
function prepareSyntheticListenerName(name, phase) {
  return `${ANIMATE_SYMBOL_PREFIX}${name}.${phase}`;
}
function getSafePropertyAccessString(accessor, name) {
  const escapedName = escapeIdentifier(name, false, false);
  return escapedName !== name ? `${accessor}[${escapedName}]` : `${accessor}.${name}`;
}
function prepareSyntheticListenerFunctionName(name, phase) {
  return `animation_${name}_${phase}`;
}
function jitOnlyGuardedExpression(expr) {
  return guardedExpression("ngJitMode", expr);
}
function guardedExpression(guard, expr) {
  const guardExpr = new ExternalExpr({ name: guard, moduleName: null });
  const guardNotDefined = new BinaryOperatorExpr(BinaryOperator.Identical, new TypeofExpr(guardExpr), literal("undefined"));
  const guardUndefinedOrTrue = new BinaryOperatorExpr(
    BinaryOperator.Or,
    guardNotDefined,
    guardExpr,
    void 0,
    void 0,
    true
  );
  return new BinaryOperatorExpr(BinaryOperator.And, guardUndefinedOrTrue, expr);
}
function wrapReference(value) {
  const wrapped = new WrappedNodeExpr(value);
  return { value: wrapped, type: wrapped };
}
function refsToArray(refs, shouldForwardDeclare) {
  const values = literalArr(refs.map((ref) => ref.value));
  return shouldForwardDeclare ? arrowFn([], values) : values;
}
function createMayBeForwardRefExpression(expression, forwardRef) {
  return { expression, forwardRef };
}
function convertFromMaybeForwardRefExpression({ expression, forwardRef }) {
  switch (forwardRef) {
    case 0:
    case 1:
      return expression;
    case 2:
      return generateForwardRef(expression);
  }
}
function generateForwardRef(expr) {
  return importExpr(Identifiers.forwardRef).callFn([arrowFn([], expr)]);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_factory.mjs
var R3FactoryDelegateType;
(function(R3FactoryDelegateType2) {
  R3FactoryDelegateType2[R3FactoryDelegateType2["Class"] = 0] = "Class";
  R3FactoryDelegateType2[R3FactoryDelegateType2["Function"] = 1] = "Function";
})(R3FactoryDelegateType || (R3FactoryDelegateType = {}));
var FactoryTarget;
(function(FactoryTarget3) {
  FactoryTarget3[FactoryTarget3["Directive"] = 0] = "Directive";
  FactoryTarget3[FactoryTarget3["Component"] = 1] = "Component";
  FactoryTarget3[FactoryTarget3["Injectable"] = 2] = "Injectable";
  FactoryTarget3[FactoryTarget3["Pipe"] = 3] = "Pipe";
  FactoryTarget3[FactoryTarget3["NgModule"] = 4] = "NgModule";
})(FactoryTarget || (FactoryTarget = {}));
function compileFactoryFunction(meta) {
  const t = variable("t");
  let baseFactoryVar = null;
  const typeForCtor = !isDelegatedFactoryMetadata(meta) ? new BinaryOperatorExpr(BinaryOperator.Or, t, meta.type.value) : t;
  let ctorExpr = null;
  if (meta.deps !== null) {
    if (meta.deps !== "invalid") {
      ctorExpr = new InstantiateExpr(typeForCtor, injectDependencies(meta.deps, meta.target));
    }
  } else {
    baseFactoryVar = variable(`\u0275${meta.name}_BaseFactory`);
    ctorExpr = baseFactoryVar.callFn([typeForCtor]);
  }
  const body = [];
  let retExpr = null;
  function makeConditionalFactory(nonCtorExpr) {
    const r = variable("r");
    body.push(r.set(NULL_EXPR).toDeclStmt());
    const ctorStmt = ctorExpr !== null ? r.set(ctorExpr).toStmt() : importExpr(Identifiers.invalidFactory).callFn([]).toStmt();
    body.push(ifStmt(t, [ctorStmt], [r.set(nonCtorExpr).toStmt()]));
    return r;
  }
  if (isDelegatedFactoryMetadata(meta)) {
    const delegateArgs = injectDependencies(meta.delegateDeps, meta.target);
    const factoryExpr = new (meta.delegateType === R3FactoryDelegateType.Class ? InstantiateExpr : InvokeFunctionExpr)(meta.delegate, delegateArgs);
    retExpr = makeConditionalFactory(factoryExpr);
  } else if (isExpressionFactoryMetadata(meta)) {
    retExpr = makeConditionalFactory(meta.expression);
  } else {
    retExpr = ctorExpr;
  }
  if (retExpr === null) {
    body.push(importExpr(Identifiers.invalidFactory).callFn([]).toStmt());
  } else if (baseFactoryVar !== null) {
    const getInheritedFactoryCall = importExpr(Identifiers.getInheritedFactory).callFn([meta.type.value]);
    const baseFactory = new BinaryOperatorExpr(BinaryOperator.Or, baseFactoryVar, baseFactoryVar.set(getInheritedFactoryCall));
    body.push(new ReturnStatement(baseFactory.callFn([typeForCtor])));
  } else {
    body.push(new ReturnStatement(retExpr));
  }
  let factoryFn = fn([new FnParam("t", DYNAMIC_TYPE)], body, INFERRED_TYPE, void 0, `${meta.name}_Factory`);
  if (baseFactoryVar !== null) {
    factoryFn = arrowFn([], [
      new DeclareVarStmt(baseFactoryVar.name),
      new ReturnStatement(factoryFn)
    ]).callFn([], void 0, true);
  }
  return {
    expression: factoryFn,
    statements: [],
    type: createFactoryType(meta)
  };
}
function createFactoryType(meta) {
  const ctorDepsType = meta.deps !== null && meta.deps !== "invalid" ? createCtorDepsType(meta.deps) : NONE_TYPE;
  return expressionType(importExpr(Identifiers.FactoryDeclaration, [typeWithParameters(meta.type.type, meta.typeArgumentCount), ctorDepsType]));
}
function injectDependencies(deps, target) {
  return deps.map((dep, index) => compileInjectDependency(dep, target, index));
}
function compileInjectDependency(dep, target, index) {
  if (dep.token === null) {
    return importExpr(Identifiers.invalidFactoryDep).callFn([literal(index)]);
  } else if (dep.attributeNameType === null) {
    const flags = 0 | (dep.self ? 2 : 0) | (dep.skipSelf ? 4 : 0) | (dep.host ? 1 : 0) | (dep.optional ? 8 : 0) | (target === FactoryTarget.Pipe ? 16 : 0);
    let flagsParam = flags !== 0 || dep.optional ? literal(flags) : null;
    const injectArgs = [dep.token];
    if (flagsParam) {
      injectArgs.push(flagsParam);
    }
    const injectFn = getInjectFn(target);
    return importExpr(injectFn).callFn(injectArgs);
  } else {
    return importExpr(Identifiers.injectAttribute).callFn([dep.token]);
  }
}
function createCtorDepsType(deps) {
  let hasTypes = false;
  const attributeTypes = deps.map((dep) => {
    const type = createCtorDepType(dep);
    if (type !== null) {
      hasTypes = true;
      return type;
    } else {
      return literal(null);
    }
  });
  if (hasTypes) {
    return expressionType(literalArr(attributeTypes));
  } else {
    return NONE_TYPE;
  }
}
function createCtorDepType(dep) {
  const entries = [];
  if (dep.attributeNameType !== null) {
    entries.push({ key: "attribute", value: dep.attributeNameType, quoted: false });
  }
  if (dep.optional) {
    entries.push({ key: "optional", value: literal(true), quoted: false });
  }
  if (dep.host) {
    entries.push({ key: "host", value: literal(true), quoted: false });
  }
  if (dep.self) {
    entries.push({ key: "self", value: literal(true), quoted: false });
  }
  if (dep.skipSelf) {
    entries.push({ key: "skipSelf", value: literal(true), quoted: false });
  }
  return entries.length > 0 ? literalMap(entries) : null;
}
function isDelegatedFactoryMetadata(meta) {
  return meta.delegateType !== void 0;
}
function isExpressionFactoryMetadata(meta) {
  return meta.expression !== void 0;
}
function getInjectFn(target) {
  switch (target) {
    case FactoryTarget.Component:
    case FactoryTarget.Directive:
    case FactoryTarget.Pipe:
      return Identifiers.directiveInject;
    case FactoryTarget.NgModule:
    case FactoryTarget.Injectable:
    default:
      return Identifiers.inject;
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/tags.mjs
var TagContentType;
(function(TagContentType2) {
  TagContentType2[TagContentType2["RAW_TEXT"] = 0] = "RAW_TEXT";
  TagContentType2[TagContentType2["ESCAPABLE_RAW_TEXT"] = 1] = "ESCAPABLE_RAW_TEXT";
  TagContentType2[TagContentType2["PARSABLE_DATA"] = 2] = "PARSABLE_DATA";
})(TagContentType || (TagContentType = {}));
function splitNsName(elementName) {
  if (elementName[0] != ":") {
    return [null, elementName];
  }
  const colonIndex = elementName.indexOf(":", 1);
  if (colonIndex === -1) {
    throw new Error(`Unsupported format "${elementName}" expecting ":namespace:name"`);
  }
  return [elementName.slice(1, colonIndex), elementName.slice(colonIndex + 1)];
}
function isNgContainer(tagName) {
  return splitNsName(tagName)[1] === "ng-container";
}
function isNgContent(tagName) {
  return splitNsName(tagName)[1] === "ng-content";
}
function isNgTemplate(tagName) {
  return splitNsName(tagName)[1] === "ng-template";
}
function getNsPrefix(fullName) {
  return fullName === null ? null : splitNsName(fullName)[0];
}
function mergeNsAndName(prefix, localName) {
  return prefix ? `:${prefix}:${localName}` : localName;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_ast.mjs
var Comment = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(_visitor2) {
    throw new Error("visit() not implemented for Comment");
  }
};
var Text = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor) {
    return visitor.visitText(this);
  }
};
var BoundText = class {
  constructor(value, sourceSpan, i18n2) {
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitBoundText(this);
  }
};
var TextAttribute = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan, i18n2) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitTextAttribute(this);
  }
};
var BoundAttribute = class {
  constructor(name, type, securityContext, value, unit, sourceSpan, keySpan, valueSpan, i18n2) {
    this.name = name;
    this.type = type;
    this.securityContext = securityContext;
    this.value = value;
    this.unit = unit;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.i18n = i18n2;
  }
  static fromBoundElementProperty(prop, i18n2) {
    if (prop.keySpan === void 0) {
      throw new Error(`Unexpected state: keySpan must be defined for bound attributes but was not for ${prop.name}: ${prop.sourceSpan}`);
    }
    return new BoundAttribute(prop.name, prop.type, prop.securityContext, prop.value, prop.unit, prop.sourceSpan, prop.keySpan, prop.valueSpan, i18n2);
  }
  visit(visitor) {
    return visitor.visitBoundAttribute(this);
  }
};
var BoundEvent = class {
  constructor(name, type, handler, target, phase, sourceSpan, handlerSpan, keySpan) {
    this.name = name;
    this.type = type;
    this.handler = handler;
    this.target = target;
    this.phase = phase;
    this.sourceSpan = sourceSpan;
    this.handlerSpan = handlerSpan;
    this.keySpan = keySpan;
  }
  static fromParsedEvent(event) {
    const target = event.type === 0 ? event.targetOrPhase : null;
    const phase = event.type === 1 ? event.targetOrPhase : null;
    if (event.keySpan === void 0) {
      throw new Error(`Unexpected state: keySpan must be defined for bound event but was not for ${event.name}: ${event.sourceSpan}`);
    }
    return new BoundEvent(event.name, event.type, event.handler, target, phase, event.sourceSpan, event.handlerSpan, event.keySpan);
  }
  visit(visitor) {
    return visitor.visitBoundEvent(this);
  }
};
var Element = class {
  constructor(name, attributes, inputs, outputs, children, references, sourceSpan, startSourceSpan, endSourceSpan, i18n2) {
    this.name = name;
    this.attributes = attributes;
    this.inputs = inputs;
    this.outputs = outputs;
    this.children = children;
    this.references = references;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitElement(this);
  }
};
var DeferredTrigger = class {
  constructor(nameSpan, sourceSpan, prefetchSpan, whenOrOnSourceSpan) {
    this.nameSpan = nameSpan;
    this.sourceSpan = sourceSpan;
    this.prefetchSpan = prefetchSpan;
    this.whenOrOnSourceSpan = whenOrOnSourceSpan;
  }
  visit(visitor) {
    return visitor.visitDeferredTrigger(this);
  }
};
var BoundDeferredTrigger = class extends DeferredTrigger {
  constructor(value, sourceSpan, prefetchSpan, whenSourceSpan) {
    super(null, sourceSpan, prefetchSpan, whenSourceSpan);
    this.value = value;
  }
};
var IdleDeferredTrigger = class extends DeferredTrigger {
};
var ImmediateDeferredTrigger = class extends DeferredTrigger {
};
var HoverDeferredTrigger = class extends DeferredTrigger {
  constructor(reference2, nameSpan, sourceSpan, prefetchSpan, onSourceSpan) {
    super(nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
    this.reference = reference2;
  }
};
var TimerDeferredTrigger = class extends DeferredTrigger {
  constructor(delay, nameSpan, sourceSpan, prefetchSpan, onSourceSpan) {
    super(nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
    this.delay = delay;
  }
};
var InteractionDeferredTrigger = class extends DeferredTrigger {
  constructor(reference2, nameSpan, sourceSpan, prefetchSpan, onSourceSpan) {
    super(nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
    this.reference = reference2;
  }
};
var ViewportDeferredTrigger = class extends DeferredTrigger {
  constructor(reference2, nameSpan, sourceSpan, prefetchSpan, onSourceSpan) {
    super(nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
    this.reference = reference2;
  }
};
var BlockNode = class {
  constructor(nameSpan, sourceSpan, startSourceSpan, endSourceSpan) {
    this.nameSpan = nameSpan;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
  }
};
var DeferredBlockPlaceholder = class extends BlockNode {
  constructor(children, minimumTime, nameSpan, sourceSpan, startSourceSpan, endSourceSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.children = children;
    this.minimumTime = minimumTime;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitDeferredBlockPlaceholder(this);
  }
};
var DeferredBlockLoading = class extends BlockNode {
  constructor(children, afterTime, minimumTime, nameSpan, sourceSpan, startSourceSpan, endSourceSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.children = children;
    this.afterTime = afterTime;
    this.minimumTime = minimumTime;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitDeferredBlockLoading(this);
  }
};
var DeferredBlockError = class extends BlockNode {
  constructor(children, nameSpan, sourceSpan, startSourceSpan, endSourceSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.children = children;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitDeferredBlockError(this);
  }
};
var DeferredBlock = class extends BlockNode {
  constructor(children, triggers, prefetchTriggers, placeholder, loading, error2, nameSpan, sourceSpan, mainBlockSpan, startSourceSpan, endSourceSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.children = children;
    this.placeholder = placeholder;
    this.loading = loading;
    this.error = error2;
    this.mainBlockSpan = mainBlockSpan;
    this.i18n = i18n2;
    this.triggers = triggers;
    this.prefetchTriggers = prefetchTriggers;
    this.definedTriggers = Object.keys(triggers);
    this.definedPrefetchTriggers = Object.keys(prefetchTriggers);
  }
  visit(visitor) {
    return visitor.visitDeferredBlock(this);
  }
  visitAll(visitor) {
    this.visitTriggers(this.definedTriggers, this.triggers, visitor);
    this.visitTriggers(this.definedPrefetchTriggers, this.prefetchTriggers, visitor);
    visitAll(visitor, this.children);
    const remainingBlocks = [this.placeholder, this.loading, this.error].filter((x) => x !== null);
    visitAll(visitor, remainingBlocks);
  }
  visitTriggers(keys, triggers, visitor) {
    visitAll(visitor, keys.map((k) => triggers[k]));
  }
};
var SwitchBlock = class extends BlockNode {
  constructor(expression, cases, unknownBlocks, sourceSpan, startSourceSpan, endSourceSpan, nameSpan) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.expression = expression;
    this.cases = cases;
    this.unknownBlocks = unknownBlocks;
  }
  visit(visitor) {
    return visitor.visitSwitchBlock(this);
  }
};
var SwitchBlockCase = class extends BlockNode {
  constructor(expression, children, sourceSpan, startSourceSpan, endSourceSpan, nameSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.expression = expression;
    this.children = children;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitSwitchBlockCase(this);
  }
};
var ForLoopBlock = class extends BlockNode {
  constructor(item, expression, trackBy, trackKeywordSpan, contextVariables, children, empty, sourceSpan, mainBlockSpan, startSourceSpan, endSourceSpan, nameSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.item = item;
    this.expression = expression;
    this.trackBy = trackBy;
    this.trackKeywordSpan = trackKeywordSpan;
    this.contextVariables = contextVariables;
    this.children = children;
    this.empty = empty;
    this.mainBlockSpan = mainBlockSpan;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitForLoopBlock(this);
  }
};
var ForLoopBlockEmpty = class extends BlockNode {
  constructor(children, sourceSpan, startSourceSpan, endSourceSpan, nameSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.children = children;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitForLoopBlockEmpty(this);
  }
};
var IfBlock = class extends BlockNode {
  constructor(branches, sourceSpan, startSourceSpan, endSourceSpan, nameSpan) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.branches = branches;
  }
  visit(visitor) {
    return visitor.visitIfBlock(this);
  }
};
var IfBlockBranch = class extends BlockNode {
  constructor(expression, children, expressionAlias, sourceSpan, startSourceSpan, endSourceSpan, nameSpan, i18n2) {
    super(nameSpan, sourceSpan, startSourceSpan, endSourceSpan);
    this.expression = expression;
    this.children = children;
    this.expressionAlias = expressionAlias;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitIfBlockBranch(this);
  }
};
var UnknownBlock = class {
  constructor(name, sourceSpan, nameSpan) {
    this.name = name;
    this.sourceSpan = sourceSpan;
    this.nameSpan = nameSpan;
  }
  visit(visitor) {
    return visitor.visitUnknownBlock(this);
  }
};
var Template = class {
  constructor(tagName, attributes, inputs, outputs, templateAttrs, children, references, variables, sourceSpan, startSourceSpan, endSourceSpan, i18n2) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.inputs = inputs;
    this.outputs = outputs;
    this.templateAttrs = templateAttrs;
    this.children = children;
    this.references = references;
    this.variables = variables;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitTemplate(this);
  }
};
var Content = class {
  constructor(selector, attributes, sourceSpan, i18n2) {
    this.selector = selector;
    this.attributes = attributes;
    this.sourceSpan = sourceSpan;
    this.i18n = i18n2;
    this.name = "ng-content";
  }
  visit(visitor) {
    return visitor.visitContent(this);
  }
};
var Variable = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
  visit(visitor) {
    return visitor.visitVariable(this);
  }
};
var Reference = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
  visit(visitor) {
    return visitor.visitReference(this);
  }
};
var Icu = class {
  constructor(vars, placeholders, sourceSpan, i18n2) {
    this.vars = vars;
    this.placeholders = placeholders;
    this.sourceSpan = sourceSpan;
    this.i18n = i18n2;
  }
  visit(visitor) {
    return visitor.visitIcu(this);
  }
};
function visitAll(visitor, nodes) {
  const result = [];
  if (visitor.visit) {
    for (const node of nodes) {
      visitor.visit(node) || node.visit(visitor);
    }
  } else {
    for (const node of nodes) {
      const newNode = node.visit(visitor);
      if (newNode) {
        result.push(newNode);
      }
    }
  }
  return result;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/i18n_ast.mjs
var Message = class {
  constructor(nodes, placeholders, placeholderToMessage, meaning, description, customId) {
    this.nodes = nodes;
    this.placeholders = placeholders;
    this.placeholderToMessage = placeholderToMessage;
    this.meaning = meaning;
    this.description = description;
    this.customId = customId;
    this.legacyIds = [];
    this.id = this.customId;
    this.messageString = serializeMessage(this.nodes);
    if (nodes.length) {
      this.sources = [{
        filePath: nodes[0].sourceSpan.start.file.url,
        startLine: nodes[0].sourceSpan.start.line + 1,
        startCol: nodes[0].sourceSpan.start.col + 1,
        endLine: nodes[nodes.length - 1].sourceSpan.end.line + 1,
        endCol: nodes[0].sourceSpan.start.col + 1
      }];
    } else {
      this.sources = [];
    }
  }
};
var Text2 = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitText(this, context);
  }
};
var Container = class {
  constructor(children, sourceSpan) {
    this.children = children;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitContainer(this, context);
  }
};
var Icu2 = class {
  constructor(expression, type, cases, sourceSpan, expressionPlaceholder) {
    this.expression = expression;
    this.type = type;
    this.cases = cases;
    this.sourceSpan = sourceSpan;
    this.expressionPlaceholder = expressionPlaceholder;
  }
  visit(visitor, context) {
    return visitor.visitIcu(this, context);
  }
};
var TagPlaceholder = class {
  constructor(tag, attrs, startName, closeName, children, isVoid, sourceSpan, startSourceSpan, endSourceSpan) {
    this.tag = tag;
    this.attrs = attrs;
    this.startName = startName;
    this.closeName = closeName;
    this.children = children;
    this.isVoid = isVoid;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitTagPlaceholder(this, context);
  }
};
var Placeholder = class {
  constructor(value, name, sourceSpan) {
    this.value = value;
    this.name = name;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitPlaceholder(this, context);
  }
};
var IcuPlaceholder = class {
  constructor(value, name, sourceSpan) {
    this.value = value;
    this.name = name;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitIcuPlaceholder(this, context);
  }
};
var BlockPlaceholder = class {
  constructor(name, parameters, startName, closeName, children, sourceSpan, startSourceSpan, endSourceSpan) {
    this.name = name;
    this.parameters = parameters;
    this.startName = startName;
    this.closeName = closeName;
    this.children = children;
    this.sourceSpan = sourceSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitBlockPlaceholder(this, context);
  }
};
var RecurseVisitor = class {
  visitText(text2, context) {
  }
  visitContainer(container, context) {
    container.children.forEach((child) => child.visit(this));
  }
  visitIcu(icu, context) {
    Object.keys(icu.cases).forEach((k) => {
      icu.cases[k].visit(this);
    });
  }
  visitTagPlaceholder(ph, context) {
    ph.children.forEach((child) => child.visit(this));
  }
  visitPlaceholder(ph, context) {
  }
  visitIcuPlaceholder(ph, context) {
  }
  visitBlockPlaceholder(ph, context) {
    ph.children.forEach((child) => child.visit(this));
  }
};
function serializeMessage(messageNodes) {
  const visitor = new LocalizeMessageStringVisitor();
  const str = messageNodes.map((n) => n.visit(visitor)).join("");
  return str;
}
var LocalizeMessageStringVisitor = class {
  visitText(text2) {
    return text2.value;
  }
  visitContainer(container) {
    return container.children.map((child) => child.visit(this)).join("");
  }
  visitIcu(icu) {
    const strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    return `{${icu.expressionPlaceholder}, ${icu.type}, ${strCases.join(" ")}}`;
  }
  visitTagPlaceholder(ph) {
    const children = ph.children.map((child) => child.visit(this)).join("");
    return `{$${ph.startName}}${children}{$${ph.closeName}}`;
  }
  visitPlaceholder(ph) {
    return `{$${ph.name}}`;
  }
  visitIcuPlaceholder(ph) {
    return `{$${ph.name}}`;
  }
  visitBlockPlaceholder(ph) {
    const children = ph.children.map((child) => child.visit(this)).join("");
    return `{$${ph.startName}}${children}{$${ph.closeName}}`;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/serializers/xml_helper.mjs
var _Visitor = class {
  visitTag(tag) {
    const strAttrs = this._serializeAttributes(tag.attrs);
    if (tag.children.length == 0) {
      return `<${tag.name}${strAttrs}/>`;
    }
    const strChildren = tag.children.map((node) => node.visit(this));
    return `<${tag.name}${strAttrs}>${strChildren.join("")}</${tag.name}>`;
  }
  visitText(text2) {
    return text2.value;
  }
  visitDeclaration(decl) {
    return `<?xml${this._serializeAttributes(decl.attrs)} ?>`;
  }
  _serializeAttributes(attrs) {
    const strAttrs = Object.keys(attrs).map((name) => `${name}="${attrs[name]}"`).join(" ");
    return strAttrs.length > 0 ? " " + strAttrs : "";
  }
  visitDoctype(doctype) {
    return `<!DOCTYPE ${doctype.rootTag} [
${doctype.dtd}
]>`;
  }
};
var _visitor = new _Visitor();

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/serializers/xmb.mjs
function toPublicName(internalName) {
  return internalName.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/i18n/util.mjs
var CLOSURE_TRANSLATION_VAR_PREFIX = "MSG_";
var TRANSLATION_VAR_PREFIX = "i18n_";
var I18N_ATTR = "i18n";
var I18N_ATTR_PREFIX = "i18n-";
var I18N_ICU_VAR_PREFIX = "VAR_";
var I18N_ICU_MAPPING_PREFIX = "I18N_EXP_";
var I18N_PLACEHOLDER_SYMBOL = "\uFFFD";
function isI18nAttribute(name) {
  return name === I18N_ATTR || name.startsWith(I18N_ATTR_PREFIX);
}
function isI18nRootNode(meta) {
  return meta instanceof Message;
}
function isSingleI18nIcu(meta) {
  return isI18nRootNode(meta) && meta.nodes.length === 1 && meta.nodes[0] instanceof Icu2;
}
function hasI18nMeta(node) {
  return !!node.i18n;
}
function hasI18nAttrs(element2) {
  return element2.attrs.some((attr) => isI18nAttribute(attr.name));
}
function icuFromI18nMessage(message) {
  return message.nodes[0];
}
function wrapI18nPlaceholder(content, contextId = 0) {
  const blockId = contextId > 0 ? `:${contextId}` : "";
  return `${I18N_PLACEHOLDER_SYMBOL}${content}${blockId}${I18N_PLACEHOLDER_SYMBOL}`;
}
function assembleI18nBoundString(strings, bindingStartIndex = 0, contextId = 0) {
  if (!strings.length)
    return "";
  let acc = "";
  const lastIdx = strings.length - 1;
  for (let i = 0; i < lastIdx; i++) {
    acc += `${strings[i]}${wrapI18nPlaceholder(bindingStartIndex + i, contextId)}`;
  }
  acc += strings[lastIdx];
  return acc;
}
function getSeqNumberGenerator(startsAt = 0) {
  let current = startsAt;
  return () => current++;
}
function placeholdersToParams(placeholders) {
  const params = {};
  placeholders.forEach((values, key) => {
    params[key] = literal(values.length > 1 ? `[${values.join("|")}]` : values[0]);
  });
  return params;
}
function updatePlaceholderMap(map, name, ...values) {
  const current = map.get(name) || [];
  current.push(...values);
  map.set(name, current);
}
function assembleBoundTextPlaceholders(meta, bindingStartIndex = 0, contextId = 0) {
  const startIdx = bindingStartIndex;
  const placeholders = /* @__PURE__ */ new Map();
  const node = meta instanceof Message ? meta.nodes.find((node2) => node2 instanceof Container) : meta;
  if (node) {
    node.children.filter((child) => child instanceof Placeholder).forEach((child, idx) => {
      const content = wrapI18nPlaceholder(startIdx + idx, contextId);
      updatePlaceholderMap(placeholders, child.name, content);
    });
  }
  return placeholders;
}
function formatI18nPlaceholderNamesInMap(params = {}, useCamelCase) {
  const _params = {};
  if (params && Object.keys(params).length) {
    Object.keys(params).forEach((key) => _params[formatI18nPlaceholderName(key, useCamelCase)] = params[key]);
  }
  return _params;
}
function formatI18nPlaceholderName(name, useCamelCase = true) {
  const publicName = toPublicName(name);
  if (!useCamelCase) {
    return publicName;
  }
  const chunks = publicName.split("_");
  if (chunks.length === 1) {
    return name.toLowerCase();
  }
  let postfix;
  if (/^\d+$/.test(chunks[chunks.length - 1])) {
    postfix = chunks.pop();
  }
  let raw = chunks.shift().toLowerCase();
  if (chunks.length) {
    raw += chunks.map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()).join("");
  }
  return postfix ? `${raw}_${postfix}` : raw;
}
function getTranslationConstPrefix(extra) {
  return `${CLOSURE_TRANSLATION_VAR_PREFIX}${extra}`.toUpperCase();
}
function declareI18nVariable(variable2) {
  return new DeclareVarStmt(variable2.name, void 0, INFERRED_TYPE, void 0, variable2.sourceSpan);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/util.mjs
var UNSAFE_OBJECT_KEY_NAME_REGEXP = /[-.]/;
var TEMPORARY_NAME = "_t";
var CONTEXT_NAME = "ctx";
var RENDER_FLAGS = "rf";
var REFERENCE_PREFIX = "_r";
var IMPLICIT_REFERENCE = "$implicit";
var NON_BINDABLE_ATTR = "ngNonBindable";
var RESTORED_VIEW_CONTEXT_NAME = "restoredCtx";
var DIRECT_CONTEXT_REFERENCE = "#context";
var MAX_CHAIN_LENGTH = 500;
var CHAINABLE_INSTRUCTIONS = /* @__PURE__ */ new Set([
  Identifiers.element,
  Identifiers.elementStart,
  Identifiers.elementEnd,
  Identifiers.elementContainer,
  Identifiers.elementContainerStart,
  Identifiers.elementContainerEnd,
  Identifiers.i18nExp,
  Identifiers.listener,
  Identifiers.classProp,
  Identifiers.syntheticHostListener,
  Identifiers.hostProperty,
  Identifiers.syntheticHostProperty,
  Identifiers.property,
  Identifiers.propertyInterpolate1,
  Identifiers.propertyInterpolate2,
  Identifiers.propertyInterpolate3,
  Identifiers.propertyInterpolate4,
  Identifiers.propertyInterpolate5,
  Identifiers.propertyInterpolate6,
  Identifiers.propertyInterpolate7,
  Identifiers.propertyInterpolate8,
  Identifiers.propertyInterpolateV,
  Identifiers.attribute,
  Identifiers.attributeInterpolate1,
  Identifiers.attributeInterpolate2,
  Identifiers.attributeInterpolate3,
  Identifiers.attributeInterpolate4,
  Identifiers.attributeInterpolate5,
  Identifiers.attributeInterpolate6,
  Identifiers.attributeInterpolate7,
  Identifiers.attributeInterpolate8,
  Identifiers.attributeInterpolateV,
  Identifiers.styleProp,
  Identifiers.stylePropInterpolate1,
  Identifiers.stylePropInterpolate2,
  Identifiers.stylePropInterpolate3,
  Identifiers.stylePropInterpolate4,
  Identifiers.stylePropInterpolate5,
  Identifiers.stylePropInterpolate6,
  Identifiers.stylePropInterpolate7,
  Identifiers.stylePropInterpolate8,
  Identifiers.stylePropInterpolateV,
  Identifiers.textInterpolate,
  Identifiers.textInterpolate1,
  Identifiers.textInterpolate2,
  Identifiers.textInterpolate3,
  Identifiers.textInterpolate4,
  Identifiers.textInterpolate5,
  Identifiers.textInterpolate6,
  Identifiers.textInterpolate7,
  Identifiers.textInterpolate8,
  Identifiers.textInterpolateV,
  Identifiers.templateCreate
]);
function invokeInstruction(span, reference2, params) {
  return importExpr(reference2, null, span).callFn(params, span);
}
function temporaryAllocator(statements, name) {
  let temp = null;
  return () => {
    if (!temp) {
      statements.push(new DeclareVarStmt(TEMPORARY_NAME, void 0, DYNAMIC_TYPE));
      temp = variable(name);
    }
    return temp;
  };
}
function invalid(arg) {
  throw new Error(`Invalid state: Visitor ${this.constructor.name} doesn't handle ${arg.constructor.name}`);
}
function asLiteral(value) {
  if (Array.isArray(value)) {
    return literalArr(value.map(asLiteral));
  }
  return literal(value, INFERRED_TYPE);
}
function conditionallyCreateDirectiveBindingLiteral(map, keepDeclared) {
  const keys = Object.getOwnPropertyNames(map);
  if (keys.length === 0) {
    return null;
  }
  return literalMap(keys.map((key) => {
    const value = map[key];
    let declaredName;
    let publicName;
    let minifiedName;
    let expressionValue;
    if (typeof value === "string") {
      declaredName = key;
      minifiedName = key;
      publicName = value;
      expressionValue = asLiteral(publicName);
    } else {
      minifiedName = key;
      declaredName = value.classPropertyName;
      publicName = value.bindingPropertyName;
      if (keepDeclared && (publicName !== declaredName || value.transformFunction != null)) {
        const expressionKeys = [asLiteral(publicName), asLiteral(declaredName)];
        if (value.transformFunction != null) {
          expressionKeys.push(value.transformFunction);
        }
        expressionValue = literalArr(expressionKeys);
      } else {
        expressionValue = asLiteral(publicName);
      }
    }
    return {
      key: minifiedName,
      quoted: UNSAFE_OBJECT_KEY_NAME_REGEXP.test(minifiedName),
      value: expressionValue
    };
  }));
}
function trimTrailingNulls(parameters) {
  while (isNull(parameters[parameters.length - 1])) {
    parameters.pop();
  }
  return parameters;
}
function getQueryPredicate(query, constantPool) {
  if (Array.isArray(query.predicate)) {
    let predicate = [];
    query.predicate.forEach((selector) => {
      const selectors = selector.split(",").map((token) => literal(token.trim()));
      predicate.push(...selectors);
    });
    return constantPool.getConstLiteral(literalArr(predicate), true);
  } else {
    switch (query.predicate.forwardRef) {
      case 0:
      case 2:
        return query.predicate.expression;
      case 1:
        return importExpr(Identifiers.resolveForwardRef).callFn([query.predicate.expression]);
    }
  }
}
var DefinitionMap = class {
  constructor() {
    this.values = [];
  }
  set(key, value) {
    if (value) {
      const existing = this.values.find((value2) => value2.key === key);
      if (existing) {
        existing.value = value;
      } else {
        this.values.push({ key, value, quoted: false });
      }
    }
  }
  toLiteralMap() {
    return literalMap(this.values);
  }
};
function createCssSelectorFromNode(node) {
  const elementName = node instanceof Element ? node.name : "ng-template";
  const attributes = getAttrsForDirectiveMatching(node);
  const cssSelector = new CssSelector();
  const elementNameNoNs = splitNsName(elementName)[1];
  cssSelector.setElement(elementNameNoNs);
  Object.getOwnPropertyNames(attributes).forEach((name) => {
    const nameNoNs = splitNsName(name)[1];
    const value = attributes[name];
    cssSelector.addAttribute(nameNoNs, value);
    if (name.toLowerCase() === "class") {
      const classes = value.trim().split(/\s+/);
      classes.forEach((className) => cssSelector.addClassName(className));
    }
  });
  return cssSelector;
}
function getAttrsForDirectiveMatching(elOrTpl) {
  const attributesMap = {};
  if (elOrTpl instanceof Template && elOrTpl.tagName !== "ng-template") {
    elOrTpl.templateAttrs.forEach((a) => attributesMap[a.name] = "");
  } else {
    elOrTpl.attributes.forEach((a) => {
      if (!isI18nAttribute(a.name)) {
        attributesMap[a.name] = a.value;
      }
    });
    elOrTpl.inputs.forEach((i) => {
      if (i.type === 0) {
        attributesMap[i.name] = "";
      }
    });
    elOrTpl.outputs.forEach((o) => {
      attributesMap[o.name] = "";
    });
  }
  return attributesMap;
}
function getInterpolationArgsLength(interpolation) {
  const { expressions, strings } = interpolation;
  if (expressions.length === 1 && strings.length === 2 && strings[0] === "" && strings[1] === "") {
    return 1;
  } else {
    return expressions.length + strings.length;
  }
}
function getInstructionStatements(instructions) {
  var _a2;
  const statements = [];
  let pendingExpression = null;
  let pendingExpressionType = null;
  let chainLength = 0;
  for (const current of instructions) {
    const resolvedParams = (_a2 = typeof current.paramsOrFn === "function" ? current.paramsOrFn() : current.paramsOrFn) != null ? _a2 : [];
    const params = Array.isArray(resolvedParams) ? resolvedParams : [resolvedParams];
    if (chainLength < MAX_CHAIN_LENGTH && pendingExpressionType === current.reference && CHAINABLE_INSTRUCTIONS.has(pendingExpressionType)) {
      pendingExpression = pendingExpression.callFn(params, pendingExpression.sourceSpan);
      chainLength++;
    } else {
      if (pendingExpression !== null) {
        statements.push(pendingExpression.toStmt());
      }
      pendingExpression = invokeInstruction(current.span, current.reference, params);
      pendingExpressionType = current.reference;
      chainLength = 0;
    }
  }
  if (pendingExpression !== null) {
    statements.push(pendingExpression.toStmt());
  }
  return statements;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/injectable_compiler_2.mjs
function compileInjectable(meta, resolveForwardRefs) {
  let result = null;
  const factoryMeta = {
    name: meta.name,
    type: meta.type,
    typeArgumentCount: meta.typeArgumentCount,
    deps: [],
    target: FactoryTarget.Injectable
  };
  if (meta.useClass !== void 0) {
    const useClassOnSelf = meta.useClass.expression.isEquivalent(meta.type.value);
    let deps = void 0;
    if (meta.deps !== void 0) {
      deps = meta.deps;
    }
    if (deps !== void 0) {
      result = compileFactoryFunction(__spreadProps(__spreadValues({}, factoryMeta), {
        delegate: meta.useClass.expression,
        delegateDeps: deps,
        delegateType: R3FactoryDelegateType.Class
      }));
    } else if (useClassOnSelf) {
      result = compileFactoryFunction(factoryMeta);
    } else {
      result = {
        statements: [],
        expression: delegateToFactory(meta.type.value, meta.useClass.expression, resolveForwardRefs)
      };
    }
  } else if (meta.useFactory !== void 0) {
    if (meta.deps !== void 0) {
      result = compileFactoryFunction(__spreadProps(__spreadValues({}, factoryMeta), {
        delegate: meta.useFactory,
        delegateDeps: meta.deps || [],
        delegateType: R3FactoryDelegateType.Function
      }));
    } else {
      result = { statements: [], expression: arrowFn([], meta.useFactory.callFn([])) };
    }
  } else if (meta.useValue !== void 0) {
    result = compileFactoryFunction(__spreadProps(__spreadValues({}, factoryMeta), {
      expression: meta.useValue.expression
    }));
  } else if (meta.useExisting !== void 0) {
    result = compileFactoryFunction(__spreadProps(__spreadValues({}, factoryMeta), {
      expression: importExpr(Identifiers.inject).callFn([meta.useExisting.expression])
    }));
  } else {
    result = {
      statements: [],
      expression: delegateToFactory(meta.type.value, meta.type.value, resolveForwardRefs)
    };
  }
  const token = meta.type.value;
  const injectableProps = new DefinitionMap();
  injectableProps.set("token", token);
  injectableProps.set("factory", result.expression);
  if (meta.providedIn.expression.value !== null) {
    injectableProps.set("providedIn", convertFromMaybeForwardRefExpression(meta.providedIn));
  }
  const expression = importExpr(Identifiers.\u0275\u0275defineInjectable).callFn([injectableProps.toLiteralMap()], void 0, true);
  return {
    expression,
    type: createInjectableType(meta),
    statements: result.statements
  };
}
function createInjectableType(meta) {
  return new ExpressionType(importExpr(Identifiers.InjectableDeclaration, [typeWithParameters(meta.type.type, meta.typeArgumentCount)]));
}
function delegateToFactory(type, useType, unwrapForwardRefs) {
  if (type.node === useType.node) {
    return useType.prop("\u0275fac");
  }
  if (!unwrapForwardRefs) {
    return createFactoryFunction(useType);
  }
  const unwrappedType = importExpr(Identifiers.resolveForwardRef).callFn([useType]);
  return createFactoryFunction(unwrappedType);
}
function createFactoryFunction(type) {
  return arrowFn([new FnParam("t", DYNAMIC_TYPE)], type.prop("\u0275fac").callFn([variable("t")]));
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/assertions.mjs
var UNUSABLE_INTERPOLATION_REGEXPS = [
  /^\s*$/,
  /[<>]/,
  /^[{}]$/,
  /&(#|[a-z])/i,
  /^\/\//
];
function assertInterpolationSymbols(identifier, value) {
  if (value != null && !(Array.isArray(value) && value.length == 2)) {
    throw new Error(`Expected '${identifier}' to be an array, [start, end].`);
  } else if (value != null) {
    const start = value[0];
    const end = value[1];
    UNUSABLE_INTERPOLATION_REGEXPS.forEach((regexp) => {
      if (regexp.test(start) || regexp.test(end)) {
        throw new Error(`['${start}', '${end}'] contains unusable interpolation symbol.`);
      }
    });
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/defaults.mjs
var InterpolationConfig = class {
  static fromArray(markers) {
    if (!markers) {
      return DEFAULT_INTERPOLATION_CONFIG;
    }
    assertInterpolationSymbols("interpolation", markers);
    return new InterpolationConfig(markers[0], markers[1]);
  }
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
};
var DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig("{{", "}}");
var DEFAULT_CONTAINER_BLOCKS = /* @__PURE__ */ new Set(["switch"]);

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/chars.mjs
var $EOF = 0;
var $BSPACE = 8;
var $TAB = 9;
var $LF = 10;
var $VTAB = 11;
var $FF = 12;
var $CR = 13;
var $SPACE = 32;
var $BANG = 33;
var $DQ = 34;
var $HASH = 35;
var $$ = 36;
var $PERCENT = 37;
var $AMPERSAND = 38;
var $SQ = 39;
var $LPAREN = 40;
var $RPAREN = 41;
var $STAR = 42;
var $PLUS = 43;
var $COMMA = 44;
var $MINUS = 45;
var $PERIOD = 46;
var $SLASH = 47;
var $COLON = 58;
var $SEMICOLON = 59;
var $LT = 60;
var $EQ = 61;
var $GT = 62;
var $QUESTION = 63;
var $0 = 48;
var $7 = 55;
var $9 = 57;
var $A = 65;
var $E = 69;
var $F = 70;
var $X = 88;
var $Z = 90;
var $LBRACKET = 91;
var $BACKSLASH = 92;
var $RBRACKET = 93;
var $CARET = 94;
var $_ = 95;
var $a = 97;
var $b = 98;
var $e = 101;
var $f = 102;
var $n = 110;
var $r = 114;
var $t = 116;
var $u = 117;
var $v = 118;
var $x = 120;
var $z = 122;
var $LBRACE = 123;
var $BAR = 124;
var $RBRACE = 125;
var $NBSP = 160;
var $AT = 64;
var $BT = 96;
function isWhitespace(code) {
  return code >= $TAB && code <= $SPACE || code == $NBSP;
}
function isDigit(code) {
  return $0 <= code && code <= $9;
}
function isAsciiLetter(code) {
  return code >= $a && code <= $z || code >= $A && code <= $Z;
}
function isAsciiHexDigit(code) {
  return code >= $a && code <= $f || code >= $A && code <= $F || isDigit(code);
}
function isNewLine(code) {
  return code === $LF || code === $CR;
}
function isOctalDigit(code) {
  return $0 <= code && code <= $7;
}
function isQuote(code) {
  return code === $SQ || code === $DQ || code === $BT;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/parse_util.mjs
var ParseLocation = class {
  constructor(file, offset, line, col) {
    this.file = file;
    this.offset = offset;
    this.line = line;
    this.col = col;
  }
  toString() {
    return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
  }
  moveBy(delta) {
    const source = this.file.content;
    const len = source.length;
    let offset = this.offset;
    let line = this.line;
    let col = this.col;
    while (offset > 0 && delta < 0) {
      offset--;
      delta++;
      const ch = source.charCodeAt(offset);
      if (ch == $LF) {
        line--;
        const priorLine = source.substring(0, offset - 1).lastIndexOf(String.fromCharCode($LF));
        col = priorLine > 0 ? offset - priorLine : offset;
      } else {
        col--;
      }
    }
    while (offset < len && delta > 0) {
      const ch = source.charCodeAt(offset);
      offset++;
      delta--;
      if (ch == $LF) {
        line++;
        col = 0;
      } else {
        col++;
      }
    }
    return new ParseLocation(this.file, offset, line, col);
  }
  getContext(maxChars, maxLines) {
    const content = this.file.content;
    let startOffset = this.offset;
    if (startOffset != null) {
      if (startOffset > content.length - 1) {
        startOffset = content.length - 1;
      }
      let endOffset = startOffset;
      let ctxChars = 0;
      let ctxLines = 0;
      while (ctxChars < maxChars && startOffset > 0) {
        startOffset--;
        ctxChars++;
        if (content[startOffset] == "\n") {
          if (++ctxLines == maxLines) {
            break;
          }
        }
      }
      ctxChars = 0;
      ctxLines = 0;
      while (ctxChars < maxChars && endOffset < content.length - 1) {
        endOffset++;
        ctxChars++;
        if (content[endOffset] == "\n") {
          if (++ctxLines == maxLines) {
            break;
          }
        }
      }
      return {
        before: content.substring(startOffset, this.offset),
        after: content.substring(this.offset, endOffset + 1)
      };
    }
    return null;
  }
};
var ParseSourceFile = class {
  constructor(content, url) {
    this.content = content;
    this.url = url;
  }
};
var ParseSourceSpan = class {
  constructor(start, end, fullStart = start, details = null) {
    this.start = start;
    this.end = end;
    this.fullStart = fullStart;
    this.details = details;
  }
  toString() {
    return this.start.file.content.substring(this.start.offset, this.end.offset);
  }
};
var ParseErrorLevel;
(function(ParseErrorLevel2) {
  ParseErrorLevel2[ParseErrorLevel2["WARNING"] = 0] = "WARNING";
  ParseErrorLevel2[ParseErrorLevel2["ERROR"] = 1] = "ERROR";
})(ParseErrorLevel || (ParseErrorLevel = {}));
var ParseError = class {
  constructor(span, msg, level = ParseErrorLevel.ERROR) {
    this.span = span;
    this.msg = msg;
    this.level = level;
  }
  contextualMessage() {
    const ctx = this.span.start.getContext(100, 3);
    return ctx ? `${this.msg} ("${ctx.before}[${ParseErrorLevel[this.level]} ->]${ctx.after}")` : this.msg;
  }
  toString() {
    const details = this.span.details ? `, ${this.span.details}` : "";
    return `${this.contextualMessage()}: ${this.span.start}${details}`;
  }
};
function r3JitTypeSourceSpan(kind, typeName, sourceUrl) {
  const sourceFileName = `in ${kind} ${typeName} in ${sourceUrl}`;
  const sourceFile = new ParseSourceFile("", sourceFileName);
  return new ParseSourceSpan(new ParseLocation(sourceFile, -1, -1, -1), new ParseLocation(sourceFile, -1, -1, -1));
}
var _anonymousTypeIndex = 0;
function identifierName(compileIdentifier) {
  if (!compileIdentifier || !compileIdentifier.reference) {
    return null;
  }
  const ref = compileIdentifier.reference;
  if (ref["__anonymousType"]) {
    return ref["__anonymousType"];
  }
  if (ref["__forward_ref__"]) {
    return "__forward_ref__";
  }
  let identifier = stringify(ref);
  if (identifier.indexOf("(") >= 0) {
    identifier = `anonymous_${_anonymousTypeIndex++}`;
    ref["__anonymousType"] = identifier;
  } else {
    identifier = sanitizeIdentifier(identifier);
  }
  return identifier;
}
function sanitizeIdentifier(name) {
  return name.replace(/\W/g, "_");
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/output/abstract_js_emitter.mjs
var makeTemplateObjectPolyfill = '(this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e})';
var AbstractJsEmitterVisitor = class extends AbstractEmitterVisitor {
  constructor() {
    super(false);
  }
  visitWrappedNodeExpr(ast, ctx) {
    throw new Error("Cannot emit a WrappedNodeExpr in Javascript.");
  }
  visitDeclareVarStmt(stmt, ctx) {
    ctx.print(stmt, `var ${stmt.name}`);
    if (stmt.value) {
      ctx.print(stmt, " = ");
      stmt.value.visitExpression(this, ctx);
    }
    ctx.println(stmt, `;`);
    return null;
  }
  visitTaggedTemplateExpr(ast, ctx) {
    const elements = ast.template.elements;
    ast.tag.visitExpression(this, ctx);
    ctx.print(ast, `(${makeTemplateObjectPolyfill}(`);
    ctx.print(ast, `[${elements.map((part) => escapeIdentifier(part.text, false)).join(", ")}], `);
    ctx.print(ast, `[${elements.map((part) => escapeIdentifier(part.rawText, false)).join(", ")}])`);
    ast.template.expressions.forEach((expression) => {
      ctx.print(ast, ", ");
      expression.visitExpression(this, ctx);
    });
    ctx.print(ast, ")");
    return null;
  }
  visitFunctionExpr(ast, ctx) {
    ctx.print(ast, `function${ast.name ? " " + ast.name : ""}(`);
    this._visitParams(ast.params, ctx);
    ctx.println(ast, `) {`);
    ctx.incIndent();
    this.visitAllStatements(ast.statements, ctx);
    ctx.decIndent();
    ctx.print(ast, `}`);
    return null;
  }
  visitArrowFunctionExpr(ast, ctx) {
    ctx.print(ast, "(");
    this._visitParams(ast.params, ctx);
    ctx.print(ast, ") =>");
    if (Array.isArray(ast.body)) {
      ctx.println(ast, `{`);
      ctx.incIndent();
      this.visitAllStatements(ast.body, ctx);
      ctx.decIndent();
      ctx.print(ast, `}`);
    } else {
      const isObjectLiteral = ast.body instanceof LiteralMapExpr;
      if (isObjectLiteral) {
        ctx.print(ast, "(");
      }
      ast.body.visitExpression(this, ctx);
      if (isObjectLiteral) {
        ctx.print(ast, ")");
      }
    }
    return null;
  }
  visitDeclareFunctionStmt(stmt, ctx) {
    ctx.print(stmt, `function ${stmt.name}(`);
    this._visitParams(stmt.params, ctx);
    ctx.println(stmt, `) {`);
    ctx.incIndent();
    this.visitAllStatements(stmt.statements, ctx);
    ctx.decIndent();
    ctx.println(stmt, `}`);
    return null;
  }
  visitLocalizedString(ast, ctx) {
    ctx.print(ast, `$localize(${makeTemplateObjectPolyfill}(`);
    const parts = [ast.serializeI18nHead()];
    for (let i = 1; i < ast.messageParts.length; i++) {
      parts.push(ast.serializeI18nTemplatePart(i));
    }
    ctx.print(ast, `[${parts.map((part) => escapeIdentifier(part.cooked, false)).join(", ")}], `);
    ctx.print(ast, `[${parts.map((part) => escapeIdentifier(part.raw, false)).join(", ")}])`);
    ast.expressions.forEach((expression) => {
      ctx.print(ast, ", ");
      expression.visitExpression(this, ctx);
    });
    ctx.print(ast, ")");
    return null;
  }
  _visitParams(params, ctx) {
    this.visitAllObjects((param) => ctx.print(null, param.name), params, ctx, ",");
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/output/output_jit_trusted_types.mjs
var policy;
function getPolicy() {
  if (policy === void 0) {
    const trustedTypes = _global["trustedTypes"];
    policy = null;
    if (trustedTypes) {
      try {
        policy = trustedTypes.createPolicy("angular#unsafe-jit", {
          createScript: (s) => s
        });
      } catch (e) {
      }
    }
  }
  return policy;
}
function trustedScriptFromString(script) {
  var _a2;
  return ((_a2 = getPolicy()) == null ? void 0 : _a2.createScript(script)) || script;
}
function newTrustedFunctionForJIT(...args) {
  if (!_global["trustedTypes"]) {
    return new Function(...args);
  }
  const fnArgs = args.slice(0, -1).join(",");
  const fnBody = args[args.length - 1];
  const body = `(function anonymous(${fnArgs}
) { ${fnBody}
})`;
  const fn2 = _global["eval"](trustedScriptFromString(body));
  if (fn2.bind === void 0) {
    return new Function(...args);
  }
  fn2.toString = () => body;
  return fn2.bind(_global);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/output/output_jit.mjs
var JitEvaluator = class {
  evaluateStatements(sourceUrl, statements, refResolver, createSourceMaps) {
    const converter = new JitEmitterVisitor(refResolver);
    const ctx = EmitterVisitorContext.createRoot();
    if (statements.length > 0 && !isUseStrictStatement(statements[0])) {
      statements = [
        literal("use strict").toStmt(),
        ...statements
      ];
    }
    converter.visitAllStatements(statements, ctx);
    converter.createReturnStmt(ctx);
    return this.evaluateCode(sourceUrl, ctx, converter.getArgs(), createSourceMaps);
  }
  evaluateCode(sourceUrl, ctx, vars, createSourceMap) {
    let fnBody = `"use strict";${ctx.toSource()}
//# sourceURL=${sourceUrl}`;
    const fnArgNames = [];
    const fnArgValues = [];
    for (const argName in vars) {
      fnArgValues.push(vars[argName]);
      fnArgNames.push(argName);
    }
    if (createSourceMap) {
      const emptyFn = newTrustedFunctionForJIT(...fnArgNames.concat("return null;")).toString();
      const headerLines = emptyFn.slice(0, emptyFn.indexOf("return null;")).split("\n").length - 1;
      fnBody += `
${ctx.toSourceMapGenerator(sourceUrl, headerLines).toJsComment()}`;
    }
    const fn2 = newTrustedFunctionForJIT(...fnArgNames.concat(fnBody));
    return this.executeFunction(fn2, fnArgValues);
  }
  executeFunction(fn2, args) {
    return fn2(...args);
  }
};
var JitEmitterVisitor = class extends AbstractJsEmitterVisitor {
  constructor(refResolver) {
    super();
    this.refResolver = refResolver;
    this._evalArgNames = [];
    this._evalArgValues = [];
    this._evalExportedVars = [];
  }
  createReturnStmt(ctx) {
    const stmt = new ReturnStatement(new LiteralMapExpr(this._evalExportedVars.map((resultVar) => new LiteralMapEntry(resultVar, variable(resultVar), false))));
    stmt.visitStatement(this, ctx);
  }
  getArgs() {
    const result = {};
    for (let i = 0; i < this._evalArgNames.length; i++) {
      result[this._evalArgNames[i]] = this._evalArgValues[i];
    }
    return result;
  }
  visitExternalExpr(ast, ctx) {
    this._emitReferenceToExternal(ast, this.refResolver.resolveExternalReference(ast.value), ctx);
    return null;
  }
  visitWrappedNodeExpr(ast, ctx) {
    this._emitReferenceToExternal(ast, ast.node, ctx);
    return null;
  }
  visitDeclareVarStmt(stmt, ctx) {
    if (stmt.hasModifier(StmtModifier.Exported)) {
      this._evalExportedVars.push(stmt.name);
    }
    return super.visitDeclareVarStmt(stmt, ctx);
  }
  visitDeclareFunctionStmt(stmt, ctx) {
    if (stmt.hasModifier(StmtModifier.Exported)) {
      this._evalExportedVars.push(stmt.name);
    }
    return super.visitDeclareFunctionStmt(stmt, ctx);
  }
  _emitReferenceToExternal(ast, value, ctx) {
    let id = this._evalArgValues.indexOf(value);
    if (id === -1) {
      id = this._evalArgValues.length;
      this._evalArgValues.push(value);
      const name = identifierName({ reference: value }) || "val";
      this._evalArgNames.push(`jit_${name}_${id}`);
    }
    ctx.print(ast, this._evalArgNames[id]);
  }
};
function isUseStrictStatement(statement) {
  return statement.isEquivalent(literal("use strict").toStmt());
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_injector_compiler.mjs
function compileInjector(meta) {
  const definitionMap = new DefinitionMap();
  if (meta.providers !== null) {
    definitionMap.set("providers", meta.providers);
  }
  if (meta.imports.length > 0) {
    definitionMap.set("imports", literalArr(meta.imports));
  }
  const expression = importExpr(Identifiers.defineInjector).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createInjectorType(meta);
  return { expression, type, statements: [] };
}
function createInjectorType(meta) {
  return new ExpressionType(importExpr(Identifiers.InjectorDeclaration, [new ExpressionType(meta.type.type)]));
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_jit.mjs
var R3JitReflector = class {
  constructor(context) {
    this.context = context;
  }
  resolveExternalReference(ref) {
    if (ref.moduleName !== "@angular/core") {
      throw new Error(`Cannot resolve external reference to ${ref.moduleName}, only references to @angular/core are supported.`);
    }
    if (!this.context.hasOwnProperty(ref.name)) {
      throw new Error(`No value provided for @angular/core symbol '${ref.name}'.`);
    }
    return this.context[ref.name];
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_module_compiler.mjs
var R3SelectorScopeMode;
(function(R3SelectorScopeMode2) {
  R3SelectorScopeMode2[R3SelectorScopeMode2["Inline"] = 0] = "Inline";
  R3SelectorScopeMode2[R3SelectorScopeMode2["SideEffect"] = 1] = "SideEffect";
  R3SelectorScopeMode2[R3SelectorScopeMode2["Omit"] = 2] = "Omit";
})(R3SelectorScopeMode || (R3SelectorScopeMode = {}));
var R3NgModuleMetadataKind;
(function(R3NgModuleMetadataKind2) {
  R3NgModuleMetadataKind2[R3NgModuleMetadataKind2["Global"] = 0] = "Global";
  R3NgModuleMetadataKind2[R3NgModuleMetadataKind2["Local"] = 1] = "Local";
})(R3NgModuleMetadataKind || (R3NgModuleMetadataKind = {}));
function compileNgModule(meta) {
  const statements = [];
  const definitionMap = new DefinitionMap();
  definitionMap.set("type", meta.type.value);
  if (meta.kind === R3NgModuleMetadataKind.Global && meta.bootstrap.length > 0) {
    definitionMap.set("bootstrap", refsToArray(meta.bootstrap, meta.containsForwardDecls));
  }
  if (meta.selectorScopeMode === R3SelectorScopeMode.Inline) {
    if (meta.declarations.length > 0) {
      definitionMap.set("declarations", refsToArray(meta.declarations, meta.containsForwardDecls));
    }
    if (meta.imports.length > 0) {
      definitionMap.set("imports", refsToArray(meta.imports, meta.containsForwardDecls));
    }
    if (meta.exports.length > 0) {
      definitionMap.set("exports", refsToArray(meta.exports, meta.containsForwardDecls));
    }
  } else if (meta.selectorScopeMode === R3SelectorScopeMode.SideEffect) {
    const setNgModuleScopeCall = generateSetNgModuleScopeCall(meta);
    if (setNgModuleScopeCall !== null) {
      statements.push(setNgModuleScopeCall);
    }
  } else {
  }
  if (meta.schemas !== null && meta.schemas.length > 0) {
    definitionMap.set("schemas", literalArr(meta.schemas.map((ref) => ref.value)));
  }
  if (meta.id !== null) {
    definitionMap.set("id", meta.id);
    statements.push(importExpr(Identifiers.registerNgModuleType).callFn([meta.type.value, meta.id]).toStmt());
  }
  const expression = importExpr(Identifiers.defineNgModule).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createNgModuleType(meta);
  return { expression, type, statements };
}
function compileNgModuleDeclarationExpression(meta) {
  const definitionMap = new DefinitionMap();
  definitionMap.set("type", new WrappedNodeExpr(meta.type));
  if (meta.bootstrap !== void 0) {
    definitionMap.set("bootstrap", new WrappedNodeExpr(meta.bootstrap));
  }
  if (meta.declarations !== void 0) {
    definitionMap.set("declarations", new WrappedNodeExpr(meta.declarations));
  }
  if (meta.imports !== void 0) {
    definitionMap.set("imports", new WrappedNodeExpr(meta.imports));
  }
  if (meta.exports !== void 0) {
    definitionMap.set("exports", new WrappedNodeExpr(meta.exports));
  }
  if (meta.schemas !== void 0) {
    definitionMap.set("schemas", new WrappedNodeExpr(meta.schemas));
  }
  if (meta.id !== void 0) {
    definitionMap.set("id", new WrappedNodeExpr(meta.id));
  }
  return importExpr(Identifiers.defineNgModule).callFn([definitionMap.toLiteralMap()]);
}
function createNgModuleType(meta) {
  if (meta.kind === R3NgModuleMetadataKind.Local) {
    return new ExpressionType(meta.type.value);
  }
  const { type: moduleType, declarations, exports, imports, includeImportTypes, publicDeclarationTypes } = meta;
  return new ExpressionType(importExpr(Identifiers.NgModuleDeclaration, [
    new ExpressionType(moduleType.type),
    publicDeclarationTypes === null ? tupleTypeOf(declarations) : tupleOfTypes(publicDeclarationTypes),
    includeImportTypes ? tupleTypeOf(imports) : NONE_TYPE,
    tupleTypeOf(exports)
  ]));
}
function generateSetNgModuleScopeCall(meta) {
  const scopeMap = new DefinitionMap();
  if (meta.kind === R3NgModuleMetadataKind.Global) {
    if (meta.declarations.length > 0) {
      scopeMap.set("declarations", refsToArray(meta.declarations, meta.containsForwardDecls));
    }
  } else {
    if (meta.declarationsExpression) {
      scopeMap.set("declarations", meta.declarationsExpression);
    }
  }
  if (meta.kind === R3NgModuleMetadataKind.Global) {
    if (meta.imports.length > 0) {
      scopeMap.set("imports", refsToArray(meta.imports, meta.containsForwardDecls));
    }
  } else {
    if (meta.importsExpression) {
      scopeMap.set("imports", meta.importsExpression);
    }
  }
  if (meta.kind === R3NgModuleMetadataKind.Global) {
    if (meta.exports.length > 0) {
      scopeMap.set("exports", refsToArray(meta.exports, meta.containsForwardDecls));
    }
  } else {
    if (meta.exportsExpression) {
      scopeMap.set("exports", meta.exportsExpression);
    }
  }
  if (meta.kind === R3NgModuleMetadataKind.Local && meta.bootstrapExpression) {
    scopeMap.set("bootstrap", meta.bootstrapExpression);
  }
  if (Object.keys(scopeMap.values).length === 0) {
    return null;
  }
  const fnCall = new InvokeFunctionExpr(
    importExpr(Identifiers.setNgModuleScope),
    [meta.type.value, scopeMap.toLiteralMap()]
  );
  const guardedCall = jitOnlyGuardedExpression(fnCall);
  const iife = new FunctionExpr(
    [],
    [guardedCall.toStmt()]
  );
  const iifeCall = new InvokeFunctionExpr(
    iife,
    []
  );
  return iifeCall.toStmt();
}
function tupleTypeOf(exp) {
  const types = exp.map((ref) => typeofExpr(ref.type));
  return exp.length > 0 ? expressionType(literalArr(types)) : NONE_TYPE;
}
function tupleOfTypes(types) {
  const typeofTypes = types.map((type) => typeofExpr(type));
  return types.length > 0 ? expressionType(literalArr(typeofTypes)) : NONE_TYPE;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_pipe_compiler.mjs
function compilePipeFromMetadata(metadata) {
  const definitionMapValues = [];
  definitionMapValues.push({ key: "name", value: literal(metadata.pipeName), quoted: false });
  definitionMapValues.push({ key: "type", value: metadata.type.value, quoted: false });
  definitionMapValues.push({ key: "pure", value: literal(metadata.pure), quoted: false });
  if (metadata.isStandalone) {
    definitionMapValues.push({ key: "standalone", value: literal(true), quoted: false });
  }
  const expression = importExpr(Identifiers.definePipe).callFn([literalMap(definitionMapValues)], void 0, true);
  const type = createPipeType(metadata);
  return { expression, type, statements: [] };
}
function createPipeType(metadata) {
  return new ExpressionType(importExpr(Identifiers.PipeDeclaration, [
    typeWithParameters(metadata.type.type, metadata.typeArgumentCount),
    new ExpressionType(new LiteralExpr(metadata.pipeName)),
    new ExpressionType(new LiteralExpr(metadata.isStandalone))
  ]));
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/api.mjs
var R3TemplateDependencyKind;
(function(R3TemplateDependencyKind2) {
  R3TemplateDependencyKind2[R3TemplateDependencyKind2["Directive"] = 0] = "Directive";
  R3TemplateDependencyKind2[R3TemplateDependencyKind2["Pipe"] = 1] = "Pipe";
  R3TemplateDependencyKind2[R3TemplateDependencyKind2["NgModule"] = 2] = "NgModule";
})(R3TemplateDependencyKind || (R3TemplateDependencyKind = {}));

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/expression_parser/ast.mjs
var ParserError = class {
  constructor(message, input, errLocation, ctxLocation) {
    this.input = input;
    this.errLocation = errLocation;
    this.ctxLocation = ctxLocation;
    this.message = `Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`;
  }
};
var ParseSpan = class {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  toAbsolute(absoluteOffset) {
    return new AbsoluteSourceSpan(absoluteOffset + this.start, absoluteOffset + this.end);
  }
};
var AST = class {
  constructor(span, sourceSpan) {
    this.span = span;
    this.sourceSpan = sourceSpan;
  }
  toString() {
    return "AST";
  }
};
var ASTWithName = class extends AST {
  constructor(span, sourceSpan, nameSpan) {
    super(span, sourceSpan);
    this.nameSpan = nameSpan;
  }
};
var EmptyExpr = class extends AST {
  visit(visitor, context = null) {
  }
};
var ImplicitReceiver = class extends AST {
  visit(visitor, context = null) {
    return visitor.visitImplicitReceiver(this, context);
  }
};
var ThisReceiver = class extends ImplicitReceiver {
  visit(visitor, context = null) {
    var _a2;
    return (_a2 = visitor.visitThisReceiver) == null ? void 0 : _a2.call(visitor, this, context);
  }
};
var Chain = class extends AST {
  constructor(span, sourceSpan, expressions) {
    super(span, sourceSpan);
    this.expressions = expressions;
  }
  visit(visitor, context = null) {
    return visitor.visitChain(this, context);
  }
};
var Conditional = class extends AST {
  constructor(span, sourceSpan, condition, trueExp, falseExp) {
    super(span, sourceSpan);
    this.condition = condition;
    this.trueExp = trueExp;
    this.falseExp = falseExp;
  }
  visit(visitor, context = null) {
    return visitor.visitConditional(this, context);
  }
};
var PropertyRead = class extends ASTWithName {
  constructor(span, sourceSpan, nameSpan, receiver, name) {
    super(span, sourceSpan, nameSpan);
    this.receiver = receiver;
    this.name = name;
  }
  visit(visitor, context = null) {
    return visitor.visitPropertyRead(this, context);
  }
};
var PropertyWrite = class extends ASTWithName {
  constructor(span, sourceSpan, nameSpan, receiver, name, value) {
    super(span, sourceSpan, nameSpan);
    this.receiver = receiver;
    this.name = name;
    this.value = value;
  }
  visit(visitor, context = null) {
    return visitor.visitPropertyWrite(this, context);
  }
};
var SafePropertyRead = class extends ASTWithName {
  constructor(span, sourceSpan, nameSpan, receiver, name) {
    super(span, sourceSpan, nameSpan);
    this.receiver = receiver;
    this.name = name;
  }
  visit(visitor, context = null) {
    return visitor.visitSafePropertyRead(this, context);
  }
};
var KeyedRead = class extends AST {
  constructor(span, sourceSpan, receiver, key) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.key = key;
  }
  visit(visitor, context = null) {
    return visitor.visitKeyedRead(this, context);
  }
};
var SafeKeyedRead = class extends AST {
  constructor(span, sourceSpan, receiver, key) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.key = key;
  }
  visit(visitor, context = null) {
    return visitor.visitSafeKeyedRead(this, context);
  }
};
var KeyedWrite = class extends AST {
  constructor(span, sourceSpan, receiver, key, value) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.key = key;
    this.value = value;
  }
  visit(visitor, context = null) {
    return visitor.visitKeyedWrite(this, context);
  }
};
var BindingPipe = class extends ASTWithName {
  constructor(span, sourceSpan, exp, name, args, nameSpan) {
    super(span, sourceSpan, nameSpan);
    this.exp = exp;
    this.name = name;
    this.args = args;
  }
  visit(visitor, context = null) {
    return visitor.visitPipe(this, context);
  }
};
var LiteralPrimitive = class extends AST {
  constructor(span, sourceSpan, value) {
    super(span, sourceSpan);
    this.value = value;
  }
  visit(visitor, context = null) {
    return visitor.visitLiteralPrimitive(this, context);
  }
};
var LiteralArray = class extends AST {
  constructor(span, sourceSpan, expressions) {
    super(span, sourceSpan);
    this.expressions = expressions;
  }
  visit(visitor, context = null) {
    return visitor.visitLiteralArray(this, context);
  }
};
var LiteralMap = class extends AST {
  constructor(span, sourceSpan, keys, values) {
    super(span, sourceSpan);
    this.keys = keys;
    this.values = values;
  }
  visit(visitor, context = null) {
    return visitor.visitLiteralMap(this, context);
  }
};
var Interpolation = class extends AST {
  constructor(span, sourceSpan, strings, expressions) {
    super(span, sourceSpan);
    this.strings = strings;
    this.expressions = expressions;
  }
  visit(visitor, context = null) {
    return visitor.visitInterpolation(this, context);
  }
};
var Binary = class extends AST {
  constructor(span, sourceSpan, operation, left, right) {
    super(span, sourceSpan);
    this.operation = operation;
    this.left = left;
    this.right = right;
  }
  visit(visitor, context = null) {
    return visitor.visitBinary(this, context);
  }
};
var Unary = class extends Binary {
  static createMinus(span, sourceSpan, expr) {
    return new Unary(span, sourceSpan, "-", expr, "-", new LiteralPrimitive(span, sourceSpan, 0), expr);
  }
  static createPlus(span, sourceSpan, expr) {
    return new Unary(span, sourceSpan, "+", expr, "-", expr, new LiteralPrimitive(span, sourceSpan, 0));
  }
  constructor(span, sourceSpan, operator, expr, binaryOp, binaryLeft, binaryRight) {
    super(span, sourceSpan, binaryOp, binaryLeft, binaryRight);
    this.operator = operator;
    this.expr = expr;
    this.left = null;
    this.right = null;
    this.operation = null;
  }
  visit(visitor, context = null) {
    if (visitor.visitUnary !== void 0) {
      return visitor.visitUnary(this, context);
    }
    return visitor.visitBinary(this, context);
  }
};
var PrefixNot = class extends AST {
  constructor(span, sourceSpan, expression) {
    super(span, sourceSpan);
    this.expression = expression;
  }
  visit(visitor, context = null) {
    return visitor.visitPrefixNot(this, context);
  }
};
var NonNullAssert = class extends AST {
  constructor(span, sourceSpan, expression) {
    super(span, sourceSpan);
    this.expression = expression;
  }
  visit(visitor, context = null) {
    return visitor.visitNonNullAssert(this, context);
  }
};
var Call = class extends AST {
  constructor(span, sourceSpan, receiver, args, argumentSpan) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.args = args;
    this.argumentSpan = argumentSpan;
  }
  visit(visitor, context = null) {
    return visitor.visitCall(this, context);
  }
};
var SafeCall = class extends AST {
  constructor(span, sourceSpan, receiver, args, argumentSpan) {
    super(span, sourceSpan);
    this.receiver = receiver;
    this.args = args;
    this.argumentSpan = argumentSpan;
  }
  visit(visitor, context = null) {
    return visitor.visitSafeCall(this, context);
  }
};
var AbsoluteSourceSpan = class {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
};
var ASTWithSource = class extends AST {
  constructor(ast, source, location, absoluteOffset, errors) {
    super(new ParseSpan(0, source === null ? 0 : source.length), new AbsoluteSourceSpan(absoluteOffset, source === null ? absoluteOffset : absoluteOffset + source.length));
    this.ast = ast;
    this.source = source;
    this.location = location;
    this.errors = errors;
  }
  visit(visitor, context = null) {
    if (visitor.visitASTWithSource) {
      return visitor.visitASTWithSource(this, context);
    }
    return this.ast.visit(visitor, context);
  }
  toString() {
    return `${this.source} in ${this.location}`;
  }
};
var VariableBinding = class {
  constructor(sourceSpan, key, value) {
    this.sourceSpan = sourceSpan;
    this.key = key;
    this.value = value;
  }
};
var ExpressionBinding = class {
  constructor(sourceSpan, key, value) {
    this.sourceSpan = sourceSpan;
    this.key = key;
    this.value = value;
  }
};
var RecursiveAstVisitor = class {
  visit(ast, context) {
    ast.visit(this, context);
  }
  visitUnary(ast, context) {
    this.visit(ast.expr, context);
  }
  visitBinary(ast, context) {
    this.visit(ast.left, context);
    this.visit(ast.right, context);
  }
  visitChain(ast, context) {
    this.visitAll(ast.expressions, context);
  }
  visitConditional(ast, context) {
    this.visit(ast.condition, context);
    this.visit(ast.trueExp, context);
    this.visit(ast.falseExp, context);
  }
  visitPipe(ast, context) {
    this.visit(ast.exp, context);
    this.visitAll(ast.args, context);
  }
  visitImplicitReceiver(ast, context) {
  }
  visitThisReceiver(ast, context) {
  }
  visitInterpolation(ast, context) {
    this.visitAll(ast.expressions, context);
  }
  visitKeyedRead(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.key, context);
  }
  visitKeyedWrite(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.key, context);
    this.visit(ast.value, context);
  }
  visitLiteralArray(ast, context) {
    this.visitAll(ast.expressions, context);
  }
  visitLiteralMap(ast, context) {
    this.visitAll(ast.values, context);
  }
  visitLiteralPrimitive(ast, context) {
  }
  visitPrefixNot(ast, context) {
    this.visit(ast.expression, context);
  }
  visitNonNullAssert(ast, context) {
    this.visit(ast.expression, context);
  }
  visitPropertyRead(ast, context) {
    this.visit(ast.receiver, context);
  }
  visitPropertyWrite(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.value, context);
  }
  visitSafePropertyRead(ast, context) {
    this.visit(ast.receiver, context);
  }
  visitSafeKeyedRead(ast, context) {
    this.visit(ast.receiver, context);
    this.visit(ast.key, context);
  }
  visitCall(ast, context) {
    this.visit(ast.receiver, context);
    this.visitAll(ast.args, context);
  }
  visitSafeCall(ast, context) {
    this.visit(ast.receiver, context);
    this.visitAll(ast.args, context);
  }
  visitAll(asts, context) {
    for (const ast of asts) {
      this.visit(ast, context);
    }
  }
};
var AstTransformer = class {
  visitImplicitReceiver(ast, context) {
    return ast;
  }
  visitThisReceiver(ast, context) {
    return ast;
  }
  visitInterpolation(ast, context) {
    return new Interpolation(ast.span, ast.sourceSpan, ast.strings, this.visitAll(ast.expressions));
  }
  visitLiteralPrimitive(ast, context) {
    return new LiteralPrimitive(ast.span, ast.sourceSpan, ast.value);
  }
  visitPropertyRead(ast, context) {
    return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
  }
  visitPropertyWrite(ast, context) {
    return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, ast.value.visit(this));
  }
  visitSafePropertyRead(ast, context) {
    return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
  }
  visitLiteralArray(ast, context) {
    return new LiteralArray(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
  }
  visitLiteralMap(ast, context) {
    return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, this.visitAll(ast.values));
  }
  visitUnary(ast, context) {
    switch (ast.operator) {
      case "+":
        return Unary.createPlus(ast.span, ast.sourceSpan, ast.expr.visit(this));
      case "-":
        return Unary.createMinus(ast.span, ast.sourceSpan, ast.expr.visit(this));
      default:
        throw new Error(`Unknown unary operator ${ast.operator}`);
    }
  }
  visitBinary(ast, context) {
    return new Binary(ast.span, ast.sourceSpan, ast.operation, ast.left.visit(this), ast.right.visit(this));
  }
  visitPrefixNot(ast, context) {
    return new PrefixNot(ast.span, ast.sourceSpan, ast.expression.visit(this));
  }
  visitNonNullAssert(ast, context) {
    return new NonNullAssert(ast.span, ast.sourceSpan, ast.expression.visit(this));
  }
  visitConditional(ast, context) {
    return new Conditional(ast.span, ast.sourceSpan, ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
  }
  visitPipe(ast, context) {
    return new BindingPipe(ast.span, ast.sourceSpan, ast.exp.visit(this), ast.name, this.visitAll(ast.args), ast.nameSpan);
  }
  visitKeyedRead(ast, context) {
    return new KeyedRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this));
  }
  visitKeyedWrite(ast, context) {
    return new KeyedWrite(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this), ast.value.visit(this));
  }
  visitCall(ast, context) {
    return new Call(ast.span, ast.sourceSpan, ast.receiver.visit(this), this.visitAll(ast.args), ast.argumentSpan);
  }
  visitSafeCall(ast, context) {
    return new SafeCall(ast.span, ast.sourceSpan, ast.receiver.visit(this), this.visitAll(ast.args), ast.argumentSpan);
  }
  visitAll(asts) {
    const res = [];
    for (let i = 0; i < asts.length; ++i) {
      res[i] = asts[i].visit(this);
    }
    return res;
  }
  visitChain(ast, context) {
    return new Chain(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
  }
  visitSafeKeyedRead(ast, context) {
    return new SafeKeyedRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this));
  }
};
var AstMemoryEfficientTransformer = class {
  visitImplicitReceiver(ast, context) {
    return ast;
  }
  visitThisReceiver(ast, context) {
    return ast;
  }
  visitInterpolation(ast, context) {
    const expressions = this.visitAll(ast.expressions);
    if (expressions !== ast.expressions)
      return new Interpolation(ast.span, ast.sourceSpan, ast.strings, expressions);
    return ast;
  }
  visitLiteralPrimitive(ast, context) {
    return ast;
  }
  visitPropertyRead(ast, context) {
    const receiver = ast.receiver.visit(this);
    if (receiver !== ast.receiver) {
      return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
    }
    return ast;
  }
  visitPropertyWrite(ast, context) {
    const receiver = ast.receiver.visit(this);
    const value = ast.value.visit(this);
    if (receiver !== ast.receiver || value !== ast.value) {
      return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, value);
    }
    return ast;
  }
  visitSafePropertyRead(ast, context) {
    const receiver = ast.receiver.visit(this);
    if (receiver !== ast.receiver) {
      return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
    }
    return ast;
  }
  visitLiteralArray(ast, context) {
    const expressions = this.visitAll(ast.expressions);
    if (expressions !== ast.expressions) {
      return new LiteralArray(ast.span, ast.sourceSpan, expressions);
    }
    return ast;
  }
  visitLiteralMap(ast, context) {
    const values = this.visitAll(ast.values);
    if (values !== ast.values) {
      return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, values);
    }
    return ast;
  }
  visitUnary(ast, context) {
    const expr = ast.expr.visit(this);
    if (expr !== ast.expr) {
      switch (ast.operator) {
        case "+":
          return Unary.createPlus(ast.span, ast.sourceSpan, expr);
        case "-":
          return Unary.createMinus(ast.span, ast.sourceSpan, expr);
        default:
          throw new Error(`Unknown unary operator ${ast.operator}`);
      }
    }
    return ast;
  }
  visitBinary(ast, context) {
    const left = ast.left.visit(this);
    const right = ast.right.visit(this);
    if (left !== ast.left || right !== ast.right) {
      return new Binary(ast.span, ast.sourceSpan, ast.operation, left, right);
    }
    return ast;
  }
  visitPrefixNot(ast, context) {
    const expression = ast.expression.visit(this);
    if (expression !== ast.expression) {
      return new PrefixNot(ast.span, ast.sourceSpan, expression);
    }
    return ast;
  }
  visitNonNullAssert(ast, context) {
    const expression = ast.expression.visit(this);
    if (expression !== ast.expression) {
      return new NonNullAssert(ast.span, ast.sourceSpan, expression);
    }
    return ast;
  }
  visitConditional(ast, context) {
    const condition = ast.condition.visit(this);
    const trueExp = ast.trueExp.visit(this);
    const falseExp = ast.falseExp.visit(this);
    if (condition !== ast.condition || trueExp !== ast.trueExp || falseExp !== ast.falseExp) {
      return new Conditional(ast.span, ast.sourceSpan, condition, trueExp, falseExp);
    }
    return ast;
  }
  visitPipe(ast, context) {
    const exp = ast.exp.visit(this);
    const args = this.visitAll(ast.args);
    if (exp !== ast.exp || args !== ast.args) {
      return new BindingPipe(ast.span, ast.sourceSpan, exp, ast.name, args, ast.nameSpan);
    }
    return ast;
  }
  visitKeyedRead(ast, context) {
    const obj = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    if (obj !== ast.receiver || key !== ast.key) {
      return new KeyedRead(ast.span, ast.sourceSpan, obj, key);
    }
    return ast;
  }
  visitKeyedWrite(ast, context) {
    const obj = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    const value = ast.value.visit(this);
    if (obj !== ast.receiver || key !== ast.key || value !== ast.value) {
      return new KeyedWrite(ast.span, ast.sourceSpan, obj, key, value);
    }
    return ast;
  }
  visitAll(asts) {
    const res = [];
    let modified = false;
    for (let i = 0; i < asts.length; ++i) {
      const original = asts[i];
      const value = original.visit(this);
      res[i] = value;
      modified = modified || value !== original;
    }
    return modified ? res : asts;
  }
  visitChain(ast, context) {
    const expressions = this.visitAll(ast.expressions);
    if (expressions !== ast.expressions) {
      return new Chain(ast.span, ast.sourceSpan, expressions);
    }
    return ast;
  }
  visitCall(ast, context) {
    const receiver = ast.receiver.visit(this);
    const args = this.visitAll(ast.args);
    if (receiver !== ast.receiver || args !== ast.args) {
      return new Call(ast.span, ast.sourceSpan, receiver, args, ast.argumentSpan);
    }
    return ast;
  }
  visitSafeCall(ast, context) {
    const receiver = ast.receiver.visit(this);
    const args = this.visitAll(ast.args);
    if (receiver !== ast.receiver || args !== ast.args) {
      return new SafeCall(ast.span, ast.sourceSpan, receiver, args, ast.argumentSpan);
    }
    return ast;
  }
  visitSafeKeyedRead(ast, context) {
    const obj = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    if (obj !== ast.receiver || key !== ast.key) {
      return new SafeKeyedRead(ast.span, ast.sourceSpan, obj, key);
    }
    return ast;
  }
};
var ParsedProperty = class {
  constructor(name, expression, type, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.expression = expression;
    this.type = type;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.isLiteral = this.type === ParsedPropertyType.LITERAL_ATTR;
    this.isAnimation = this.type === ParsedPropertyType.ANIMATION;
  }
};
var ParsedPropertyType;
(function(ParsedPropertyType2) {
  ParsedPropertyType2[ParsedPropertyType2["DEFAULT"] = 0] = "DEFAULT";
  ParsedPropertyType2[ParsedPropertyType2["LITERAL_ATTR"] = 1] = "LITERAL_ATTR";
  ParsedPropertyType2[ParsedPropertyType2["ANIMATION"] = 2] = "ANIMATION";
})(ParsedPropertyType || (ParsedPropertyType = {}));
var ParsedEvent = class {
  constructor(name, targetOrPhase, type, handler, sourceSpan, handlerSpan, keySpan) {
    this.name = name;
    this.targetOrPhase = targetOrPhase;
    this.type = type;
    this.handler = handler;
    this.sourceSpan = sourceSpan;
    this.handlerSpan = handlerSpan;
    this.keySpan = keySpan;
  }
};
var ParsedVariable = class {
  constructor(name, value, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
};
var BoundElementProperty = class {
  constructor(name, type, securityContext, value, unit, sourceSpan, keySpan, valueSpan) {
    this.name = name;
    this.type = type;
    this.securityContext = securityContext;
    this.value = value;
    this.unit = unit;
    this.sourceSpan = sourceSpan;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/compiler_util/expression_converter.mjs
var _EventHandlerVars = class {
};
var EventHandlerVars = _EventHandlerVars;
(() => {
  _EventHandlerVars.event = variable("$event");
})();
function convertActionBinding(localResolver, implicitReceiver, action, bindingId, baseSourceSpan, implicitReceiverAccesses, globals) {
  if (!localResolver) {
    localResolver = new DefaultLocalResolver(globals);
  }
  const actionWithoutBuiltins = convertPropertyBindingBuiltins({
    createLiteralArrayConverter: (argCount) => {
      return (args) => literalArr(args);
    },
    createLiteralMapConverter: (keys) => {
      return (values) => {
        const entries = keys.map((k, i) => ({
          key: k.key,
          value: values[i],
          quoted: k.quoted
        }));
        return literalMap(entries);
      };
    },
    createPipeConverter: (name) => {
      throw new Error(`Illegal State: Actions are not allowed to contain pipes. Pipe: ${name}`);
    }
  }, action);
  const visitor = new _AstToIrVisitor(localResolver, implicitReceiver, bindingId, false, baseSourceSpan, implicitReceiverAccesses);
  const actionStmts = [];
  flattenStatements(actionWithoutBuiltins.visit(visitor, _Mode.Statement), actionStmts);
  prependTemporaryDecls(visitor.temporaryCount, bindingId, actionStmts);
  if (visitor.usesImplicitReceiver) {
    localResolver.notifyImplicitReceiverUse();
  }
  const lastIndex = actionStmts.length - 1;
  if (lastIndex >= 0) {
    const lastStatement = actionStmts[lastIndex];
    if (lastStatement instanceof ExpressionStatement) {
      actionStmts[lastIndex] = new ReturnStatement(lastStatement.expr);
    }
  }
  return actionStmts;
}
function convertPropertyBindingBuiltins(converterFactory, ast) {
  return convertBuiltins(converterFactory, ast);
}
var ConvertPropertyBindingResult = class {
  constructor(stmts, currValExpr) {
    this.stmts = stmts;
    this.currValExpr = currValExpr;
  }
};
function convertPropertyBinding(localResolver, implicitReceiver, expressionWithoutBuiltins, bindingId) {
  if (!localResolver) {
    localResolver = new DefaultLocalResolver();
  }
  const visitor = new _AstToIrVisitor(localResolver, implicitReceiver, bindingId, false);
  const outputExpr = expressionWithoutBuiltins.visit(visitor, _Mode.Expression);
  const stmts = getStatementsFromVisitor(visitor, bindingId);
  if (visitor.usesImplicitReceiver) {
    localResolver.notifyImplicitReceiverUse();
  }
  return new ConvertPropertyBindingResult(stmts, outputExpr);
}
function convertPureComponentScopeFunction(ast, localResolver, implicitReceiver, bindingId) {
  const converted = convertPropertyBindingBuiltins({
    createLiteralArrayConverter: () => (args) => literalArr(args),
    createLiteralMapConverter: (keys) => (values) => literalMap(keys.map((key, index) => {
      return {
        key: key.key,
        value: values[index],
        quoted: key.quoted
      };
    })),
    createPipeConverter: () => {
      throw new Error("Illegal State: Pipes are not allowed in this context");
    }
  }, ast);
  const visitor = new _AstToIrVisitor(localResolver, implicitReceiver, bindingId, false);
  const statements = [];
  flattenStatements(converted.visit(visitor, _Mode.Statement), statements);
  return statements;
}
function convertUpdateArguments(localResolver, contextVariableExpression, expressionWithArgumentsToExtract, bindingId) {
  const visitor = new _AstToIrVisitor(localResolver, contextVariableExpression, bindingId, true);
  const outputExpr = visitor.visitInterpolation(expressionWithArgumentsToExtract, _Mode.Expression);
  if (visitor.usesImplicitReceiver) {
    localResolver.notifyImplicitReceiverUse();
  }
  const stmts = getStatementsFromVisitor(visitor, bindingId);
  const args = outputExpr.args;
  return { stmts, args };
}
function getStatementsFromVisitor(visitor, bindingId) {
  const stmts = [];
  for (let i = 0; i < visitor.temporaryCount; i++) {
    stmts.push(temporaryDeclaration(bindingId, i));
  }
  return stmts;
}
function convertBuiltins(converterFactory, ast) {
  const visitor = new _BuiltinAstConverter(converterFactory);
  return ast.visit(visitor);
}
function temporaryName(bindingId, temporaryNumber) {
  return `tmp_${bindingId}_${temporaryNumber}`;
}
function temporaryDeclaration(bindingId, temporaryNumber) {
  return new DeclareVarStmt(temporaryName(bindingId, temporaryNumber));
}
function prependTemporaryDecls(temporaryCount, bindingId, statements) {
  for (let i = temporaryCount - 1; i >= 0; i--) {
    statements.unshift(temporaryDeclaration(bindingId, i));
  }
}
var _Mode;
(function(_Mode2) {
  _Mode2[_Mode2["Statement"] = 0] = "Statement";
  _Mode2[_Mode2["Expression"] = 1] = "Expression";
})(_Mode || (_Mode = {}));
function ensureStatementMode(mode, ast) {
  if (mode !== _Mode.Statement) {
    throw new Error(`Expected a statement, but saw ${ast}`);
  }
}
function ensureExpressionMode(mode, ast) {
  if (mode !== _Mode.Expression) {
    throw new Error(`Expected an expression, but saw ${ast}`);
  }
}
function convertToStatementIfNeeded(mode, expr) {
  if (mode === _Mode.Statement) {
    return expr.toStmt();
  } else {
    return expr;
  }
}
var _BuiltinAstConverter = class extends AstTransformer {
  constructor(_converterFactory) {
    super();
    this._converterFactory = _converterFactory;
  }
  visitPipe(ast, context) {
    const args = [ast.exp, ...ast.args].map((ast2) => ast2.visit(this, context));
    return new BuiltinFunctionCall(ast.span, ast.sourceSpan, args, this._converterFactory.createPipeConverter(ast.name, args.length));
  }
  visitLiteralArray(ast, context) {
    const args = ast.expressions.map((ast2) => ast2.visit(this, context));
    return new BuiltinFunctionCall(ast.span, ast.sourceSpan, args, this._converterFactory.createLiteralArrayConverter(ast.expressions.length));
  }
  visitLiteralMap(ast, context) {
    const args = ast.values.map((ast2) => ast2.visit(this, context));
    return new BuiltinFunctionCall(ast.span, ast.sourceSpan, args, this._converterFactory.createLiteralMapConverter(ast.keys));
  }
};
var _AstToIrVisitor = class {
  constructor(_localResolver, _implicitReceiver, bindingId, supportsInterpolation, baseSourceSpan, implicitReceiverAccesses) {
    this._localResolver = _localResolver;
    this._implicitReceiver = _implicitReceiver;
    this.bindingId = bindingId;
    this.supportsInterpolation = supportsInterpolation;
    this.baseSourceSpan = baseSourceSpan;
    this.implicitReceiverAccesses = implicitReceiverAccesses;
    this._nodeMap = /* @__PURE__ */ new Map();
    this._resultMap = /* @__PURE__ */ new Map();
    this._currentTemporary = 0;
    this.temporaryCount = 0;
    this.usesImplicitReceiver = false;
  }
  visitUnary(ast, mode) {
    let op;
    switch (ast.operator) {
      case "+":
        op = UnaryOperator.Plus;
        break;
      case "-":
        op = UnaryOperator.Minus;
        break;
      default:
        throw new Error(`Unsupported operator ${ast.operator}`);
    }
    return convertToStatementIfNeeded(mode, new UnaryOperatorExpr(op, this._visit(ast.expr, _Mode.Expression), void 0, this.convertSourceSpan(ast.span)));
  }
  visitBinary(ast, mode) {
    let op;
    switch (ast.operation) {
      case "+":
        op = BinaryOperator.Plus;
        break;
      case "-":
        op = BinaryOperator.Minus;
        break;
      case "*":
        op = BinaryOperator.Multiply;
        break;
      case "/":
        op = BinaryOperator.Divide;
        break;
      case "%":
        op = BinaryOperator.Modulo;
        break;
      case "&&":
        op = BinaryOperator.And;
        break;
      case "||":
        op = BinaryOperator.Or;
        break;
      case "==":
        op = BinaryOperator.Equals;
        break;
      case "!=":
        op = BinaryOperator.NotEquals;
        break;
      case "===":
        op = BinaryOperator.Identical;
        break;
      case "!==":
        op = BinaryOperator.NotIdentical;
        break;
      case "<":
        op = BinaryOperator.Lower;
        break;
      case ">":
        op = BinaryOperator.Bigger;
        break;
      case "<=":
        op = BinaryOperator.LowerEquals;
        break;
      case ">=":
        op = BinaryOperator.BiggerEquals;
        break;
      case "??":
        return this.convertNullishCoalesce(ast, mode);
      default:
        throw new Error(`Unsupported operation ${ast.operation}`);
    }
    return convertToStatementIfNeeded(mode, new BinaryOperatorExpr(op, this._visit(ast.left, _Mode.Expression), this._visit(ast.right, _Mode.Expression), void 0, this.convertSourceSpan(ast.span)));
  }
  visitChain(ast, mode) {
    ensureStatementMode(mode, ast);
    return this.visitAll(ast.expressions, mode);
  }
  visitConditional(ast, mode) {
    const value = this._visit(ast.condition, _Mode.Expression);
    return convertToStatementIfNeeded(mode, value.conditional(this._visit(ast.trueExp, _Mode.Expression), this._visit(ast.falseExp, _Mode.Expression), this.convertSourceSpan(ast.span)));
  }
  visitPipe(ast, mode) {
    throw new Error(`Illegal state: Pipes should have been converted into functions. Pipe: ${ast.name}`);
  }
  visitImplicitReceiver(ast, mode) {
    ensureExpressionMode(mode, ast);
    this.usesImplicitReceiver = true;
    return this._implicitReceiver;
  }
  visitThisReceiver(ast, mode) {
    return this.visitImplicitReceiver(ast, mode);
  }
  visitInterpolation(ast, mode) {
    if (!this.supportsInterpolation) {
      throw new Error("Unexpected interpolation");
    }
    ensureExpressionMode(mode, ast);
    let args = [];
    for (let i = 0; i < ast.strings.length - 1; i++) {
      args.push(literal(ast.strings[i]));
      args.push(this._visit(ast.expressions[i], _Mode.Expression));
    }
    args.push(literal(ast.strings[ast.strings.length - 1]));
    const strings = ast.strings;
    if (strings.length === 2 && strings[0] === "" && strings[1] === "") {
      args = [args[1]];
    } else if (ast.expressions.length >= 9) {
      args = [literalArr(args)];
    }
    return new InterpolationExpression(args);
  }
  visitKeyedRead(ast, mode) {
    const leftMostSafe = this.leftMostSafeNode(ast);
    if (leftMostSafe) {
      return this.convertSafeAccess(ast, leftMostSafe, mode);
    } else {
      return convertToStatementIfNeeded(mode, this._visit(ast.receiver, _Mode.Expression).key(this._visit(ast.key, _Mode.Expression)));
    }
  }
  visitKeyedWrite(ast, mode) {
    const obj = this._visit(ast.receiver, _Mode.Expression);
    const key = this._visit(ast.key, _Mode.Expression);
    const value = this._visit(ast.value, _Mode.Expression);
    if (obj === this._implicitReceiver) {
      this._localResolver.maybeRestoreView();
    }
    return convertToStatementIfNeeded(mode, obj.key(key).set(value));
  }
  visitLiteralArray(ast, mode) {
    throw new Error(`Illegal State: literal arrays should have been converted into functions`);
  }
  visitLiteralMap(ast, mode) {
    throw new Error(`Illegal State: literal maps should have been converted into functions`);
  }
  visitLiteralPrimitive(ast, mode) {
    const type = ast.value === null || ast.value === void 0 || ast.value === true || ast.value === true ? INFERRED_TYPE : void 0;
    return convertToStatementIfNeeded(mode, literal(ast.value, type, this.convertSourceSpan(ast.span)));
  }
  _getLocal(name, receiver) {
    var _a2;
    if (((_a2 = this._localResolver.globals) == null ? void 0 : _a2.has(name)) && receiver instanceof ThisReceiver) {
      return null;
    }
    return this._localResolver.getLocal(name);
  }
  visitPrefixNot(ast, mode) {
    return convertToStatementIfNeeded(mode, not(this._visit(ast.expression, _Mode.Expression)));
  }
  visitNonNullAssert(ast, mode) {
    return convertToStatementIfNeeded(mode, this._visit(ast.expression, _Mode.Expression));
  }
  visitPropertyRead(ast, mode) {
    const leftMostSafe = this.leftMostSafeNode(ast);
    if (leftMostSafe) {
      return this.convertSafeAccess(ast, leftMostSafe, mode);
    } else {
      let result = null;
      const prevUsesImplicitReceiver = this.usesImplicitReceiver;
      const receiver = this._visit(ast.receiver, _Mode.Expression);
      if (receiver === this._implicitReceiver) {
        result = this._getLocal(ast.name, ast.receiver);
        if (result) {
          this.usesImplicitReceiver = prevUsesImplicitReceiver;
          this.addImplicitReceiverAccess(ast.name);
        }
      }
      if (result == null) {
        result = receiver.prop(ast.name, this.convertSourceSpan(ast.span));
      }
      return convertToStatementIfNeeded(mode, result);
    }
  }
  visitPropertyWrite(ast, mode) {
    const receiver = this._visit(ast.receiver, _Mode.Expression);
    const prevUsesImplicitReceiver = this.usesImplicitReceiver;
    let varExpr = null;
    if (receiver === this._implicitReceiver) {
      const localExpr = this._getLocal(ast.name, ast.receiver);
      if (localExpr) {
        if (localExpr instanceof ReadPropExpr) {
          varExpr = localExpr;
          this.usesImplicitReceiver = prevUsesImplicitReceiver;
          this.addImplicitReceiverAccess(ast.name);
        } else {
          const receiver2 = ast.name;
          const value = ast.value instanceof PropertyRead ? ast.value.name : void 0;
          throw new Error(`Cannot assign value "${value}" to template variable "${receiver2}". Template variables are read-only.`);
        }
      }
    }
    if (varExpr === null) {
      varExpr = receiver.prop(ast.name, this.convertSourceSpan(ast.span));
    }
    return convertToStatementIfNeeded(mode, varExpr.set(this._visit(ast.value, _Mode.Expression)));
  }
  visitSafePropertyRead(ast, mode) {
    return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
  }
  visitSafeKeyedRead(ast, mode) {
    return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
  }
  visitAll(asts, mode) {
    return asts.map((ast) => this._visit(ast, mode));
  }
  visitCall(ast, mode) {
    const leftMostSafe = this.leftMostSafeNode(ast);
    if (leftMostSafe) {
      return this.convertSafeAccess(ast, leftMostSafe, mode);
    }
    const convertedArgs = this.visitAll(ast.args, _Mode.Expression);
    if (ast instanceof BuiltinFunctionCall) {
      return convertToStatementIfNeeded(mode, ast.converter(convertedArgs));
    }
    const receiver = ast.receiver;
    if (receiver instanceof PropertyRead && receiver.receiver instanceof ImplicitReceiver && !(receiver.receiver instanceof ThisReceiver) && receiver.name === "$any") {
      if (convertedArgs.length !== 1) {
        throw new Error(`Invalid call to $any, expected 1 argument but received ${convertedArgs.length || "none"}`);
      }
      return convertToStatementIfNeeded(mode, convertedArgs[0]);
    }
    const call2 = this._visit(receiver, _Mode.Expression).callFn(convertedArgs, this.convertSourceSpan(ast.span));
    return convertToStatementIfNeeded(mode, call2);
  }
  visitSafeCall(ast, mode) {
    return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
  }
  _visit(ast, mode) {
    const result = this._resultMap.get(ast);
    if (result)
      return result;
    return (this._nodeMap.get(ast) || ast).visit(this, mode);
  }
  convertSafeAccess(ast, leftMostSafe, mode) {
    let guardedExpression2 = this._visit(leftMostSafe.receiver, _Mode.Expression);
    let temporary = void 0;
    if (this.needsTemporaryInSafeAccess(leftMostSafe.receiver)) {
      temporary = this.allocateTemporary();
      guardedExpression2 = temporary.set(guardedExpression2);
      this._resultMap.set(leftMostSafe.receiver, temporary);
    }
    const condition = guardedExpression2.isBlank();
    if (leftMostSafe instanceof SafeCall) {
      this._nodeMap.set(leftMostSafe, new Call(leftMostSafe.span, leftMostSafe.sourceSpan, leftMostSafe.receiver, leftMostSafe.args, leftMostSafe.argumentSpan));
    } else if (leftMostSafe instanceof SafeKeyedRead) {
      this._nodeMap.set(leftMostSafe, new KeyedRead(leftMostSafe.span, leftMostSafe.sourceSpan, leftMostSafe.receiver, leftMostSafe.key));
    } else {
      this._nodeMap.set(leftMostSafe, new PropertyRead(leftMostSafe.span, leftMostSafe.sourceSpan, leftMostSafe.nameSpan, leftMostSafe.receiver, leftMostSafe.name));
    }
    const access = this._visit(ast, _Mode.Expression);
    this._nodeMap.delete(leftMostSafe);
    if (temporary) {
      this.releaseTemporary(temporary);
    }
    return convertToStatementIfNeeded(mode, condition.conditional(NULL_EXPR, access));
  }
  convertNullishCoalesce(ast, mode) {
    const left = this._visit(ast.left, _Mode.Expression);
    const right = this._visit(ast.right, _Mode.Expression);
    const temporary = this.allocateTemporary();
    this.releaseTemporary(temporary);
    return convertToStatementIfNeeded(mode, temporary.set(left).notIdentical(NULL_EXPR).and(temporary.notIdentical(literal(void 0))).conditional(temporary, right));
  }
  leftMostSafeNode(ast) {
    const visit = (visitor, ast2) => {
      return (this._nodeMap.get(ast2) || ast2).visit(visitor);
    };
    return ast.visit({
      visitUnary(ast2) {
        return null;
      },
      visitBinary(ast2) {
        return null;
      },
      visitChain(ast2) {
        return null;
      },
      visitConditional(ast2) {
        return null;
      },
      visitCall(ast2) {
        return visit(this, ast2.receiver);
      },
      visitSafeCall(ast2) {
        return visit(this, ast2.receiver) || ast2;
      },
      visitImplicitReceiver(ast2) {
        return null;
      },
      visitThisReceiver(ast2) {
        return null;
      },
      visitInterpolation(ast2) {
        return null;
      },
      visitKeyedRead(ast2) {
        return visit(this, ast2.receiver);
      },
      visitKeyedWrite(ast2) {
        return null;
      },
      visitLiteralArray(ast2) {
        return null;
      },
      visitLiteralMap(ast2) {
        return null;
      },
      visitLiteralPrimitive(ast2) {
        return null;
      },
      visitPipe(ast2) {
        return null;
      },
      visitPrefixNot(ast2) {
        return null;
      },
      visitNonNullAssert(ast2) {
        return visit(this, ast2.expression);
      },
      visitPropertyRead(ast2) {
        return visit(this, ast2.receiver);
      },
      visitPropertyWrite(ast2) {
        return null;
      },
      visitSafePropertyRead(ast2) {
        return visit(this, ast2.receiver) || ast2;
      },
      visitSafeKeyedRead(ast2) {
        return visit(this, ast2.receiver) || ast2;
      }
    });
  }
  needsTemporaryInSafeAccess(ast) {
    const visit = (visitor, ast2) => {
      return ast2 && (this._nodeMap.get(ast2) || ast2).visit(visitor);
    };
    const visitSome = (visitor, ast2) => {
      return ast2.some((ast3) => visit(visitor, ast3));
    };
    return ast.visit({
      visitUnary(ast2) {
        return visit(this, ast2.expr);
      },
      visitBinary(ast2) {
        return visit(this, ast2.left) || visit(this, ast2.right);
      },
      visitChain(ast2) {
        return false;
      },
      visitConditional(ast2) {
        return visit(this, ast2.condition) || visit(this, ast2.trueExp) || visit(this, ast2.falseExp);
      },
      visitCall(ast2) {
        return true;
      },
      visitSafeCall(ast2) {
        return true;
      },
      visitImplicitReceiver(ast2) {
        return false;
      },
      visitThisReceiver(ast2) {
        return false;
      },
      visitInterpolation(ast2) {
        return visitSome(this, ast2.expressions);
      },
      visitKeyedRead(ast2) {
        return false;
      },
      visitKeyedWrite(ast2) {
        return false;
      },
      visitLiteralArray(ast2) {
        return true;
      },
      visitLiteralMap(ast2) {
        return true;
      },
      visitLiteralPrimitive(ast2) {
        return false;
      },
      visitPipe(ast2) {
        return true;
      },
      visitPrefixNot(ast2) {
        return visit(this, ast2.expression);
      },
      visitNonNullAssert(ast2) {
        return visit(this, ast2.expression);
      },
      visitPropertyRead(ast2) {
        return false;
      },
      visitPropertyWrite(ast2) {
        return false;
      },
      visitSafePropertyRead(ast2) {
        return false;
      },
      visitSafeKeyedRead(ast2) {
        return false;
      }
    });
  }
  allocateTemporary() {
    const tempNumber = this._currentTemporary++;
    this.temporaryCount = Math.max(this._currentTemporary, this.temporaryCount);
    return new ReadVarExpr(temporaryName(this.bindingId, tempNumber));
  }
  releaseTemporary(temporary) {
    this._currentTemporary--;
    if (temporary.name != temporaryName(this.bindingId, this._currentTemporary)) {
      throw new Error(`Temporary ${temporary.name} released out of order`);
    }
  }
  convertSourceSpan(span) {
    if (this.baseSourceSpan) {
      const start = this.baseSourceSpan.start.moveBy(span.start);
      const end = this.baseSourceSpan.start.moveBy(span.end);
      const fullStart = this.baseSourceSpan.fullStart.moveBy(span.start);
      return new ParseSourceSpan(start, end, fullStart);
    } else {
      return null;
    }
  }
  addImplicitReceiverAccess(name) {
    if (this.implicitReceiverAccesses) {
      this.implicitReceiverAccesses.add(name);
    }
  }
};
function flattenStatements(arg, output) {
  if (Array.isArray(arg)) {
    arg.forEach((entry) => flattenStatements(entry, output));
  } else {
    output.push(arg);
  }
}
function unsupported() {
  throw new Error("Unsupported operation");
}
var InterpolationExpression = class extends Expression {
  constructor(args) {
    super(null, null);
    this.args = args;
    this.isConstant = unsupported;
    this.isEquivalent = unsupported;
    this.visitExpression = unsupported;
    this.clone = unsupported;
  }
};
var DefaultLocalResolver = class {
  constructor(globals) {
    this.globals = globals;
  }
  notifyImplicitReceiverUse() {
  }
  maybeRestoreView() {
  }
  getLocal(name) {
    if (name === EventHandlerVars.event.name) {
      return EventHandlerVars.event;
    }
    return null;
  }
};
var BuiltinFunctionCall = class extends Call {
  constructor(span, sourceSpan, args, converter) {
    super(span, sourceSpan, new EmptyExpr(span, sourceSpan), args, null);
    this.converter = converter;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/schema/dom_security_schema.mjs
var _SECURITY_SCHEMA;
function SECURITY_SCHEMA() {
  if (!_SECURITY_SCHEMA) {
    _SECURITY_SCHEMA = {};
    registerContext(SecurityContext.HTML, [
      "iframe|srcdoc",
      "*|innerHTML",
      "*|outerHTML"
    ]);
    registerContext(SecurityContext.STYLE, ["*|style"]);
    registerContext(SecurityContext.URL, [
      "*|formAction",
      "area|href",
      "area|ping",
      "audio|src",
      "a|href",
      "a|ping",
      "blockquote|cite",
      "body|background",
      "del|cite",
      "form|action",
      "img|src",
      "input|src",
      "ins|cite",
      "q|cite",
      "source|src",
      "track|src",
      "video|poster",
      "video|src"
    ]);
    registerContext(SecurityContext.RESOURCE_URL, [
      "applet|code",
      "applet|codebase",
      "base|href",
      "embed|src",
      "frame|src",
      "head|profile",
      "html|manifest",
      "iframe|src",
      "link|href",
      "media|src",
      "object|codebase",
      "object|data",
      "script|src"
    ]);
  }
  return _SECURITY_SCHEMA;
}
function registerContext(ctx, specs) {
  for (const spec of specs)
    _SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
}
var IFRAME_SECURITY_SENSITIVE_ATTRS = /* @__PURE__ */ new Set(["sandbox", "allow", "allowfullscreen", "referrerpolicy", "csp", "fetchpriority"]);
function isIframeSecuritySensitiveAttr(attrName) {
  return IFRAME_SECURITY_SENSITIVE_ATTRS.has(attrName.toLowerCase());
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/shadow_css.mjs
var animationKeywords = /* @__PURE__ */ new Set([
  "inherit",
  "initial",
  "revert",
  "unset",
  "alternate",
  "alternate-reverse",
  "normal",
  "reverse",
  "backwards",
  "both",
  "forwards",
  "none",
  "paused",
  "running",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "linear",
  "step-start",
  "step-end",
  "end",
  "jump-both",
  "jump-end",
  "jump-none",
  "jump-start",
  "start"
]);
var ShadowCss = class {
  constructor() {
    this._animationDeclarationKeyframesRe = /(^|\s+)(?:(?:(['"])((?:\\\\|\\\2|(?!\2).)+)\2)|(-?[A-Za-z][\w\-]*))(?=[,\s]|$)/g;
  }
  shimCssText(cssText, selector, hostSelector = "") {
    const comments = [];
    cssText = cssText.replace(_commentRe, (m) => {
      var _a2;
      if (m.match(_commentWithHashRe)) {
        comments.push(m);
      } else {
        const newLinesMatches = m.match(_newLinesRe);
        comments.push(((_a2 = newLinesMatches == null ? void 0 : newLinesMatches.join("")) != null ? _a2 : "") + "\n");
      }
      return COMMENT_PLACEHOLDER;
    });
    cssText = this._insertDirectives(cssText);
    const scopedCssText = this._scopeCssText(cssText, selector, hostSelector);
    let commentIdx = 0;
    return scopedCssText.replace(_commentWithHashPlaceHolderRe, () => comments[commentIdx++]);
  }
  _insertDirectives(cssText) {
    cssText = this._insertPolyfillDirectivesInCssText(cssText);
    return this._insertPolyfillRulesInCssText(cssText);
  }
  _scopeKeyframesRelatedCss(cssText, scopeSelector) {
    const unscopedKeyframesSet = /* @__PURE__ */ new Set();
    const scopedKeyframesCssText = processRules(cssText, (rule) => this._scopeLocalKeyframeDeclarations(rule, scopeSelector, unscopedKeyframesSet));
    return processRules(scopedKeyframesCssText, (rule) => this._scopeAnimationRule(rule, scopeSelector, unscopedKeyframesSet));
  }
  _scopeLocalKeyframeDeclarations(rule, scopeSelector, unscopedKeyframesSet) {
    return __spreadProps(__spreadValues({}, rule), {
      selector: rule.selector.replace(/(^@(?:-webkit-)?keyframes(?:\s+))(['"]?)(.+)\2(\s*)$/, (_, start, quote, keyframeName, endSpaces) => {
        unscopedKeyframesSet.add(unescapeQuotes(keyframeName, quote));
        return `${start}${quote}${scopeSelector}_${keyframeName}${quote}${endSpaces}`;
      })
    });
  }
  _scopeAnimationKeyframe(keyframe, scopeSelector, unscopedKeyframesSet) {
    return keyframe.replace(/^(\s*)(['"]?)(.+?)\2(\s*)$/, (_, spaces1, quote, name, spaces2) => {
      name = `${unscopedKeyframesSet.has(unescapeQuotes(name, quote)) ? scopeSelector + "_" : ""}${name}`;
      return `${spaces1}${quote}${name}${quote}${spaces2}`;
    });
  }
  _scopeAnimationRule(rule, scopeSelector, unscopedKeyframesSet) {
    let content = rule.content.replace(/((?:^|\s+|;)(?:-webkit-)?animation(?:\s*):(?:\s*))([^;]+)/g, (_, start, animationDeclarations) => start + animationDeclarations.replace(this._animationDeclarationKeyframesRe, (original, leadingSpaces, quote = "", quotedName, nonQuotedName) => {
      if (quotedName) {
        return `${leadingSpaces}${this._scopeAnimationKeyframe(`${quote}${quotedName}${quote}`, scopeSelector, unscopedKeyframesSet)}`;
      } else {
        return animationKeywords.has(nonQuotedName) ? original : `${leadingSpaces}${this._scopeAnimationKeyframe(nonQuotedName, scopeSelector, unscopedKeyframesSet)}`;
      }
    }));
    content = content.replace(/((?:^|\s+|;)(?:-webkit-)?animation-name(?:\s*):(?:\s*))([^;]+)/g, (_match, start, commaSeparatedKeyframes) => `${start}${commaSeparatedKeyframes.split(",").map((keyframe) => this._scopeAnimationKeyframe(keyframe, scopeSelector, unscopedKeyframesSet)).join(",")}`);
    return __spreadProps(__spreadValues({}, rule), { content });
  }
  _insertPolyfillDirectivesInCssText(cssText) {
    return cssText.replace(_cssContentNextSelectorRe, function(...m) {
      return m[2] + "{";
    });
  }
  _insertPolyfillRulesInCssText(cssText) {
    return cssText.replace(_cssContentRuleRe, (...m) => {
      const rule = m[0].replace(m[1], "").replace(m[2], "");
      return m[4] + rule;
    });
  }
  _scopeCssText(cssText, scopeSelector, hostSelector) {
    const unscopedRules = this._extractUnscopedRulesFromCssText(cssText);
    cssText = this._insertPolyfillHostInCssText(cssText);
    cssText = this._convertColonHost(cssText);
    cssText = this._convertColonHostContext(cssText);
    cssText = this._convertShadowDOMSelectors(cssText);
    if (scopeSelector) {
      cssText = this._scopeKeyframesRelatedCss(cssText, scopeSelector);
      cssText = this._scopeSelectors(cssText, scopeSelector, hostSelector);
    }
    cssText = cssText + "\n" + unscopedRules;
    return cssText.trim();
  }
  _extractUnscopedRulesFromCssText(cssText) {
    let r = "";
    let m;
    _cssContentUnscopedRuleRe.lastIndex = 0;
    while ((m = _cssContentUnscopedRuleRe.exec(cssText)) !== null) {
      const rule = m[0].replace(m[2], "").replace(m[1], m[4]);
      r += rule + "\n\n";
    }
    return r;
  }
  _convertColonHost(cssText) {
    return cssText.replace(_cssColonHostRe, (_, hostSelectors, otherSelectors) => {
      if (hostSelectors) {
        const convertedSelectors = [];
        const hostSelectorArray = hostSelectors.split(",").map((p) => p.trim());
        for (const hostSelector of hostSelectorArray) {
          if (!hostSelector)
            break;
          const convertedSelector = _polyfillHostNoCombinator + hostSelector.replace(_polyfillHost, "") + otherSelectors;
          convertedSelectors.push(convertedSelector);
        }
        return convertedSelectors.join(",");
      } else {
        return _polyfillHostNoCombinator + otherSelectors;
      }
    });
  }
  _convertColonHostContext(cssText) {
    return cssText.replace(_cssColonHostContextReGlobal, (selectorText) => {
      var _a2;
      const contextSelectorGroups = [[]];
      let match;
      while (match = _cssColonHostContextRe.exec(selectorText)) {
        const newContextSelectors = ((_a2 = match[1]) != null ? _a2 : "").trim().split(",").map((m) => m.trim()).filter((m) => m !== "");
        const contextSelectorGroupsLength = contextSelectorGroups.length;
        repeatGroups(contextSelectorGroups, newContextSelectors.length);
        for (let i = 0; i < newContextSelectors.length; i++) {
          for (let j = 0; j < contextSelectorGroupsLength; j++) {
            contextSelectorGroups[j + i * contextSelectorGroupsLength].push(newContextSelectors[i]);
          }
        }
        selectorText = match[2];
      }
      return contextSelectorGroups.map((contextSelectors) => combineHostContextSelectors(contextSelectors, selectorText)).join(", ");
    });
  }
  _convertShadowDOMSelectors(cssText) {
    return _shadowDOMSelectorsRe.reduce((result, pattern) => result.replace(pattern, " "), cssText);
  }
  _scopeSelectors(cssText, scopeSelector, hostSelector) {
    return processRules(cssText, (rule) => {
      let selector = rule.selector;
      let content = rule.content;
      if (rule.selector[0] !== "@") {
        selector = this._scopeSelector(rule.selector, scopeSelector, hostSelector);
      } else if (rule.selector.startsWith("@media") || rule.selector.startsWith("@supports") || rule.selector.startsWith("@document") || rule.selector.startsWith("@layer") || rule.selector.startsWith("@container") || rule.selector.startsWith("@scope")) {
        content = this._scopeSelectors(rule.content, scopeSelector, hostSelector);
      } else if (rule.selector.startsWith("@font-face") || rule.selector.startsWith("@page")) {
        content = this._stripScopingSelectors(rule.content);
      }
      return new CssRule(selector, content);
    });
  }
  _stripScopingSelectors(cssText) {
    return processRules(cssText, (rule) => {
      const selector = rule.selector.replace(_shadowDeepSelectors, " ").replace(_polyfillHostNoCombinatorRe, " ");
      return new CssRule(selector, rule.content);
    });
  }
  _scopeSelector(selector, scopeSelector, hostSelector) {
    return selector.split(",").map((part) => part.trim().split(_shadowDeepSelectors)).map((deepParts) => {
      const [shallowPart, ...otherParts] = deepParts;
      const applyScope = (shallowPart2) => {
        if (this._selectorNeedsScoping(shallowPart2, scopeSelector)) {
          return this._applySelectorScope(shallowPart2, scopeSelector, hostSelector);
        } else {
          return shallowPart2;
        }
      };
      return [applyScope(shallowPart), ...otherParts].join(" ");
    }).join(", ");
  }
  _selectorNeedsScoping(selector, scopeSelector) {
    const re = this._makeScopeMatcher(scopeSelector);
    return !re.test(selector);
  }
  _makeScopeMatcher(scopeSelector) {
    const lre = /\[/g;
    const rre = /\]/g;
    scopeSelector = scopeSelector.replace(lre, "\\[").replace(rre, "\\]");
    return new RegExp("^(" + scopeSelector + ")" + _selectorReSuffix, "m");
  }
  _applySimpleSelectorScope(selector, scopeSelector, hostSelector) {
    _polyfillHostRe.lastIndex = 0;
    if (_polyfillHostRe.test(selector)) {
      const replaceBy = `[${hostSelector}]`;
      return selector.replace(_polyfillHostNoCombinatorRe, (hnc, selector2) => {
        return selector2.replace(/([^:]*)(:*)(.*)/, (_, before, colon, after) => {
          return before + replaceBy + colon + after;
        });
      }).replace(_polyfillHostRe, replaceBy + " ");
    }
    return scopeSelector + " " + selector;
  }
  _applySelectorScope(selector, scopeSelector, hostSelector) {
    var _a2;
    const isRe = /\[is=([^\]]*)\]/g;
    scopeSelector = scopeSelector.replace(isRe, (_, ...parts) => parts[0]);
    const attrName = "[" + scopeSelector + "]";
    const _scopeSelectorPart = (p) => {
      let scopedP = p.trim();
      if (!scopedP) {
        return "";
      }
      if (p.indexOf(_polyfillHostNoCombinator) > -1) {
        scopedP = this._applySimpleSelectorScope(p, scopeSelector, hostSelector);
      } else {
        const t = p.replace(_polyfillHostRe, "");
        if (t.length > 0) {
          const matches = t.match(/([^:]*)(:*)(.*)/);
          if (matches) {
            scopedP = matches[1] + attrName + matches[2] + matches[3];
          }
        }
      }
      return scopedP;
    };
    const safeContent = new SafeSelector(selector);
    selector = safeContent.content();
    let scopedSelector = "";
    let startIndex = 0;
    let res;
    const sep = /( |>|\+|~(?!=))\s*/g;
    const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
    let shouldScope = !hasHost;
    while ((res = sep.exec(selector)) !== null) {
      const separator = res[1];
      const part2 = selector.slice(startIndex, res.index).trim();
      if (part2.match(/__esc-ph-(\d+)__/) && ((_a2 = selector[res.index + 1]) == null ? void 0 : _a2.match(/[a-fA-F\d]/))) {
        continue;
      }
      shouldScope = shouldScope || part2.indexOf(_polyfillHostNoCombinator) > -1;
      const scopedPart = shouldScope ? _scopeSelectorPart(part2) : part2;
      scopedSelector += `${scopedPart} ${separator} `;
      startIndex = sep.lastIndex;
    }
    const part = selector.substring(startIndex);
    shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
    scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
    return safeContent.restore(scopedSelector);
  }
  _insertPolyfillHostInCssText(selector) {
    return selector.replace(_colonHostContextRe, _polyfillHostContext).replace(_colonHostRe, _polyfillHost);
  }
};
var SafeSelector = class {
  constructor(selector) {
    this.placeholders = [];
    this.index = 0;
    selector = this._escapeRegexMatches(selector, /(\[[^\]]*\])/g);
    selector = selector.replace(/(\\.)/g, (_, keep) => {
      const replaceBy = `__esc-ph-${this.index}__`;
      this.placeholders.push(keep);
      this.index++;
      return replaceBy;
    });
    this._content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
      const replaceBy = `__ph-${this.index}__`;
      this.placeholders.push(exp);
      this.index++;
      return pseudo + replaceBy;
    });
  }
  restore(content) {
    return content.replace(/__(?:ph|esc-ph)-(\d+)__/g, (_ph, index) => this.placeholders[+index]);
  }
  content() {
    return this._content;
  }
  _escapeRegexMatches(content, pattern) {
    return content.replace(pattern, (_, keep) => {
      const replaceBy = `__ph-${this.index}__`;
      this.placeholders.push(keep);
      this.index++;
      return replaceBy;
    });
  }
};
var _cssContentNextSelectorRe = /polyfill-next-selector[^}]*content:[\s]*?(['"])(.*?)\1[;\s]*}([^{]*?){/gim;
var _cssContentRuleRe = /(polyfill-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
var _cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
var _polyfillHost = "-shadowcsshost";
var _polyfillHostContext = "-shadowcsscontext";
var _parenSuffix = "(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
var _cssColonHostRe = new RegExp(_polyfillHost + _parenSuffix, "gim");
var _cssColonHostContextReGlobal = new RegExp(_polyfillHostContext + _parenSuffix, "gim");
var _cssColonHostContextRe = new RegExp(_polyfillHostContext + _parenSuffix, "im");
var _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
var _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
var _shadowDOMSelectorsRe = [
  /::shadow/g,
  /::content/g,
  /\/shadow-deep\//g,
  /\/shadow\//g
];
var _shadowDeepSelectors = /(?:>>>)|(?:\/deep\/)|(?:::ng-deep)/g;
var _selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$";
var _polyfillHostRe = /-shadowcsshost/gim;
var _colonHostRe = /:host/gim;
var _colonHostContextRe = /:host-context/gim;
var _newLinesRe = /\r?\n/g;
var _commentRe = /\/\*[\s\S]*?\*\//g;
var _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=/g;
var COMMENT_PLACEHOLDER = "%COMMENT%";
var _commentWithHashPlaceHolderRe = new RegExp(COMMENT_PLACEHOLDER, "g");
var BLOCK_PLACEHOLDER = "%BLOCK%";
var _ruleRe = new RegExp(`(\\s*(?:${COMMENT_PLACEHOLDER}\\s*)*)([^;\\{\\}]+?)(\\s*)((?:{%BLOCK%}?\\s*;?)|(?:\\s*;))`, "g");
var CONTENT_PAIRS = /* @__PURE__ */ new Map([["{", "}"]]);
var COMMA_IN_PLACEHOLDER = "%COMMA_IN_PLACEHOLDER%";
var SEMI_IN_PLACEHOLDER = "%SEMI_IN_PLACEHOLDER%";
var COLON_IN_PLACEHOLDER = "%COLON_IN_PLACEHOLDER%";
var _cssCommaInPlaceholderReGlobal = new RegExp(COMMA_IN_PLACEHOLDER, "g");
var _cssSemiInPlaceholderReGlobal = new RegExp(SEMI_IN_PLACEHOLDER, "g");
var _cssColonInPlaceholderReGlobal = new RegExp(COLON_IN_PLACEHOLDER, "g");
var CssRule = class {
  constructor(selector, content) {
    this.selector = selector;
    this.content = content;
  }
};
function processRules(input, ruleCallback) {
  const escaped = escapeInStrings(input);
  const inputWithEscapedBlocks = escapeBlocks(escaped, CONTENT_PAIRS, BLOCK_PLACEHOLDER);
  let nextBlockIndex = 0;
  const escapedResult = inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
    const selector = m[2];
    let content = "";
    let suffix = m[4];
    let contentPrefix = "";
    if (suffix && suffix.startsWith("{" + BLOCK_PLACEHOLDER)) {
      content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
      suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
      contentPrefix = "{";
    }
    const rule = ruleCallback(new CssRule(selector, content));
    return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
  });
  return unescapeInStrings(escapedResult);
}
var StringWithEscapedBlocks = class {
  constructor(escapedString, blocks) {
    this.escapedString = escapedString;
    this.blocks = blocks;
  }
};
function escapeBlocks(input, charPairs, placeholder) {
  const resultParts = [];
  const escapedBlocks = [];
  let openCharCount = 0;
  let nonBlockStartIndex = 0;
  let blockStartIndex = -1;
  let openChar;
  let closeChar;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "\\") {
      i++;
    } else if (char === closeChar) {
      openCharCount--;
      if (openCharCount === 0) {
        escapedBlocks.push(input.substring(blockStartIndex, i));
        resultParts.push(placeholder);
        nonBlockStartIndex = i;
        blockStartIndex = -1;
        openChar = closeChar = void 0;
      }
    } else if (char === openChar) {
      openCharCount++;
    } else if (openCharCount === 0 && charPairs.has(char)) {
      openChar = char;
      closeChar = charPairs.get(char);
      openCharCount = 1;
      blockStartIndex = i + 1;
      resultParts.push(input.substring(nonBlockStartIndex, blockStartIndex));
    }
  }
  if (blockStartIndex !== -1) {
    escapedBlocks.push(input.substring(blockStartIndex));
    resultParts.push(placeholder);
  } else {
    resultParts.push(input.substring(nonBlockStartIndex));
  }
  return new StringWithEscapedBlocks(resultParts.join(""), escapedBlocks);
}
var ESCAPE_IN_STRING_MAP = {
  ";": SEMI_IN_PLACEHOLDER,
  ",": COMMA_IN_PLACEHOLDER,
  ":": COLON_IN_PLACEHOLDER
};
function escapeInStrings(input) {
  let result = input;
  let currentQuoteChar = null;
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (char === "\\") {
      i++;
    } else {
      if (currentQuoteChar !== null) {
        if (char === currentQuoteChar) {
          currentQuoteChar = null;
        } else {
          const placeholder = ESCAPE_IN_STRING_MAP[char];
          if (placeholder) {
            result = `${result.substr(0, i)}${placeholder}${result.substr(i + 1)}`;
            i += placeholder.length - 1;
          }
        }
      } else if (char === "'" || char === '"') {
        currentQuoteChar = char;
      }
    }
  }
  return result;
}
function unescapeInStrings(input) {
  let result = input.replace(_cssCommaInPlaceholderReGlobal, ",");
  result = result.replace(_cssSemiInPlaceholderReGlobal, ";");
  result = result.replace(_cssColonInPlaceholderReGlobal, ":");
  return result;
}
function unescapeQuotes(str, isQuoted) {
  return !isQuoted ? str : str.replace(/((?:^|[^\\])(?:\\\\)*)\\(?=['"])/g, "$1");
}
function combineHostContextSelectors(contextSelectors, otherSelectors) {
  const hostMarker = _polyfillHostNoCombinator;
  _polyfillHostRe.lastIndex = 0;
  const otherSelectorsHasHost = _polyfillHostRe.test(otherSelectors);
  if (contextSelectors.length === 0) {
    return hostMarker + otherSelectors;
  }
  const combined = [contextSelectors.pop() || ""];
  while (contextSelectors.length > 0) {
    const length = combined.length;
    const contextSelector = contextSelectors.pop();
    for (let i = 0; i < length; i++) {
      const previousSelectors = combined[i];
      combined[length * 2 + i] = previousSelectors + " " + contextSelector;
      combined[length + i] = contextSelector + " " + previousSelectors;
      combined[i] = contextSelector + previousSelectors;
    }
  }
  return combined.map((s) => otherSelectorsHasHost ? `${s}${otherSelectors}` : `${s}${hostMarker}${otherSelectors}, ${s} ${hostMarker}${otherSelectors}`).join(",");
}
function repeatGroups(groups, multiples) {
  const length = groups.length;
  for (let i = 1; i < multiples; i++) {
    for (let j = 0; j < length; j++) {
      groups[j + i * length] = groups[j].slice(0);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/enums.mjs
var OpKind;
(function(OpKind2) {
  OpKind2[OpKind2["ListEnd"] = 0] = "ListEnd";
  OpKind2[OpKind2["Statement"] = 1] = "Statement";
  OpKind2[OpKind2["Variable"] = 2] = "Variable";
  OpKind2[OpKind2["ElementStart"] = 3] = "ElementStart";
  OpKind2[OpKind2["Element"] = 4] = "Element";
  OpKind2[OpKind2["Template"] = 5] = "Template";
  OpKind2[OpKind2["ElementEnd"] = 6] = "ElementEnd";
  OpKind2[OpKind2["ContainerStart"] = 7] = "ContainerStart";
  OpKind2[OpKind2["Container"] = 8] = "Container";
  OpKind2[OpKind2["ContainerEnd"] = 9] = "ContainerEnd";
  OpKind2[OpKind2["DisableBindings"] = 10] = "DisableBindings";
  OpKind2[OpKind2["Conditional"] = 11] = "Conditional";
  OpKind2[OpKind2["EnableBindings"] = 12] = "EnableBindings";
  OpKind2[OpKind2["Text"] = 13] = "Text";
  OpKind2[OpKind2["Listener"] = 14] = "Listener";
  OpKind2[OpKind2["InterpolateText"] = 15] = "InterpolateText";
  OpKind2[OpKind2["Binding"] = 16] = "Binding";
  OpKind2[OpKind2["Property"] = 17] = "Property";
  OpKind2[OpKind2["StyleProp"] = 18] = "StyleProp";
  OpKind2[OpKind2["ClassProp"] = 19] = "ClassProp";
  OpKind2[OpKind2["StyleMap"] = 20] = "StyleMap";
  OpKind2[OpKind2["ClassMap"] = 21] = "ClassMap";
  OpKind2[OpKind2["Advance"] = 22] = "Advance";
  OpKind2[OpKind2["Pipe"] = 23] = "Pipe";
  OpKind2[OpKind2["Attribute"] = 24] = "Attribute";
  OpKind2[OpKind2["ExtractedAttribute"] = 25] = "ExtractedAttribute";
  OpKind2[OpKind2["Defer"] = 26] = "Defer";
  OpKind2[OpKind2["DeferOn"] = 27] = "DeferOn";
  OpKind2[OpKind2["DeferWhen"] = 28] = "DeferWhen";
  OpKind2[OpKind2["I18nMessage"] = 29] = "I18nMessage";
  OpKind2[OpKind2["HostProperty"] = 30] = "HostProperty";
  OpKind2[OpKind2["Namespace"] = 31] = "Namespace";
  OpKind2[OpKind2["ProjectionDef"] = 32] = "ProjectionDef";
  OpKind2[OpKind2["Projection"] = 33] = "Projection";
  OpKind2[OpKind2["RepeaterCreate"] = 34] = "RepeaterCreate";
  OpKind2[OpKind2["Repeater"] = 35] = "Repeater";
  OpKind2[OpKind2["I18nStart"] = 36] = "I18nStart";
  OpKind2[OpKind2["I18n"] = 37] = "I18n";
  OpKind2[OpKind2["I18nEnd"] = 38] = "I18nEnd";
  OpKind2[OpKind2["I18nExpression"] = 39] = "I18nExpression";
  OpKind2[OpKind2["I18nApply"] = 40] = "I18nApply";
  OpKind2[OpKind2["IcuStart"] = 41] = "IcuStart";
  OpKind2[OpKind2["IcuEnd"] = 42] = "IcuEnd";
  OpKind2[OpKind2["I18nContext"] = 43] = "I18nContext";
  OpKind2[OpKind2["I18nAttributes"] = 44] = "I18nAttributes";
})(OpKind || (OpKind = {}));
var ExpressionKind;
(function(ExpressionKind2) {
  ExpressionKind2[ExpressionKind2["LexicalRead"] = 0] = "LexicalRead";
  ExpressionKind2[ExpressionKind2["Context"] = 1] = "Context";
  ExpressionKind2[ExpressionKind2["TrackContext"] = 2] = "TrackContext";
  ExpressionKind2[ExpressionKind2["ReadVariable"] = 3] = "ReadVariable";
  ExpressionKind2[ExpressionKind2["NextContext"] = 4] = "NextContext";
  ExpressionKind2[ExpressionKind2["Reference"] = 5] = "Reference";
  ExpressionKind2[ExpressionKind2["GetCurrentView"] = 6] = "GetCurrentView";
  ExpressionKind2[ExpressionKind2["RestoreView"] = 7] = "RestoreView";
  ExpressionKind2[ExpressionKind2["ResetView"] = 8] = "ResetView";
  ExpressionKind2[ExpressionKind2["PureFunctionExpr"] = 9] = "PureFunctionExpr";
  ExpressionKind2[ExpressionKind2["PureFunctionParameterExpr"] = 10] = "PureFunctionParameterExpr";
  ExpressionKind2[ExpressionKind2["PipeBinding"] = 11] = "PipeBinding";
  ExpressionKind2[ExpressionKind2["PipeBindingVariadic"] = 12] = "PipeBindingVariadic";
  ExpressionKind2[ExpressionKind2["SafePropertyRead"] = 13] = "SafePropertyRead";
  ExpressionKind2[ExpressionKind2["SafeKeyedRead"] = 14] = "SafeKeyedRead";
  ExpressionKind2[ExpressionKind2["SafeInvokeFunction"] = 15] = "SafeInvokeFunction";
  ExpressionKind2[ExpressionKind2["SafeTernaryExpr"] = 16] = "SafeTernaryExpr";
  ExpressionKind2[ExpressionKind2["EmptyExpr"] = 17] = "EmptyExpr";
  ExpressionKind2[ExpressionKind2["AssignTemporaryExpr"] = 18] = "AssignTemporaryExpr";
  ExpressionKind2[ExpressionKind2["ReadTemporaryExpr"] = 19] = "ReadTemporaryExpr";
  ExpressionKind2[ExpressionKind2["SanitizerExpr"] = 20] = "SanitizerExpr";
  ExpressionKind2[ExpressionKind2["SlotLiteralExpr"] = 21] = "SlotLiteralExpr";
  ExpressionKind2[ExpressionKind2["ConditionalCase"] = 22] = "ConditionalCase";
  ExpressionKind2[ExpressionKind2["DerivedRepeaterVar"] = 23] = "DerivedRepeaterVar";
  ExpressionKind2[ExpressionKind2["ConstCollected"] = 24] = "ConstCollected";
})(ExpressionKind || (ExpressionKind = {}));
var VariableFlags;
(function(VariableFlags2) {
  VariableFlags2[VariableFlags2["None"] = 0] = "None";
  VariableFlags2[VariableFlags2["AlwaysInline"] = 1] = "AlwaysInline";
})(VariableFlags || (VariableFlags = {}));
var SemanticVariableKind;
(function(SemanticVariableKind2) {
  SemanticVariableKind2[SemanticVariableKind2["Context"] = 0] = "Context";
  SemanticVariableKind2[SemanticVariableKind2["Identifier"] = 1] = "Identifier";
  SemanticVariableKind2[SemanticVariableKind2["SavedView"] = 2] = "SavedView";
  SemanticVariableKind2[SemanticVariableKind2["Alias"] = 3] = "Alias";
})(SemanticVariableKind || (SemanticVariableKind = {}));
var CompatibilityMode;
(function(CompatibilityMode2) {
  CompatibilityMode2[CompatibilityMode2["Normal"] = 0] = "Normal";
  CompatibilityMode2[CompatibilityMode2["TemplateDefinitionBuilder"] = 1] = "TemplateDefinitionBuilder";
})(CompatibilityMode || (CompatibilityMode = {}));
var SanitizerFn;
(function(SanitizerFn2) {
  SanitizerFn2[SanitizerFn2["Html"] = 0] = "Html";
  SanitizerFn2[SanitizerFn2["Script"] = 1] = "Script";
  SanitizerFn2[SanitizerFn2["Style"] = 2] = "Style";
  SanitizerFn2[SanitizerFn2["Url"] = 3] = "Url";
  SanitizerFn2[SanitizerFn2["ResourceUrl"] = 4] = "ResourceUrl";
  SanitizerFn2[SanitizerFn2["IframeAttribute"] = 5] = "IframeAttribute";
})(SanitizerFn || (SanitizerFn = {}));
var DeferSecondaryKind;
(function(DeferSecondaryKind2) {
  DeferSecondaryKind2[DeferSecondaryKind2["Loading"] = 0] = "Loading";
  DeferSecondaryKind2[DeferSecondaryKind2["Placeholder"] = 1] = "Placeholder";
  DeferSecondaryKind2[DeferSecondaryKind2["Error"] = 2] = "Error";
})(DeferSecondaryKind || (DeferSecondaryKind = {}));
var BindingKind;
(function(BindingKind2) {
  BindingKind2[BindingKind2["Attribute"] = 0] = "Attribute";
  BindingKind2[BindingKind2["ClassName"] = 1] = "ClassName";
  BindingKind2[BindingKind2["StyleProperty"] = 2] = "StyleProperty";
  BindingKind2[BindingKind2["Property"] = 3] = "Property";
  BindingKind2[BindingKind2["Template"] = 4] = "Template";
  BindingKind2[BindingKind2["I18n"] = 5] = "I18n";
  BindingKind2[BindingKind2["Animation"] = 6] = "Animation";
})(BindingKind || (BindingKind = {}));
var I18nParamResolutionTime;
(function(I18nParamResolutionTime2) {
  I18nParamResolutionTime2[I18nParamResolutionTime2["Creation"] = 0] = "Creation";
  I18nParamResolutionTime2[I18nParamResolutionTime2["Postproccessing"] = 1] = "Postproccessing";
})(I18nParamResolutionTime || (I18nParamResolutionTime = {}));
var I18nExpressionFor;
(function(I18nExpressionFor2) {
  I18nExpressionFor2[I18nExpressionFor2["I18nText"] = 0] = "I18nText";
  I18nExpressionFor2[I18nExpressionFor2["I18nAttribute"] = 1] = "I18nAttribute";
})(I18nExpressionFor || (I18nExpressionFor = {}));
var I18nParamValueFlags;
(function(I18nParamValueFlags2) {
  I18nParamValueFlags2[I18nParamValueFlags2["None"] = 0] = "None";
  I18nParamValueFlags2[I18nParamValueFlags2["ElementTag"] = 1] = "ElementTag";
  I18nParamValueFlags2[I18nParamValueFlags2["TemplateTag"] = 2] = "TemplateTag";
  I18nParamValueFlags2[I18nParamValueFlags2["OpenTag"] = 4] = "OpenTag";
  I18nParamValueFlags2[I18nParamValueFlags2["CloseTag"] = 8] = "CloseTag";
  I18nParamValueFlags2[I18nParamValueFlags2["ExpressionIndex"] = 16] = "ExpressionIndex";
})(I18nParamValueFlags || (I18nParamValueFlags = {}));
var Namespace;
(function(Namespace2) {
  Namespace2[Namespace2["HTML"] = 0] = "HTML";
  Namespace2[Namespace2["SVG"] = 1] = "SVG";
  Namespace2[Namespace2["Math"] = 2] = "Math";
})(Namespace || (Namespace = {}));
var DeferTriggerKind;
(function(DeferTriggerKind2) {
  DeferTriggerKind2[DeferTriggerKind2["Idle"] = 0] = "Idle";
  DeferTriggerKind2[DeferTriggerKind2["Immediate"] = 1] = "Immediate";
  DeferTriggerKind2[DeferTriggerKind2["Timer"] = 2] = "Timer";
  DeferTriggerKind2[DeferTriggerKind2["Hover"] = 3] = "Hover";
  DeferTriggerKind2[DeferTriggerKind2["Interaction"] = 4] = "Interaction";
  DeferTriggerKind2[DeferTriggerKind2["Viewport"] = 5] = "Viewport";
})(DeferTriggerKind || (DeferTriggerKind = {}));
var DerivedRepeaterVarIdentity;
(function(DerivedRepeaterVarIdentity2) {
  DerivedRepeaterVarIdentity2[DerivedRepeaterVarIdentity2["First"] = 0] = "First";
  DerivedRepeaterVarIdentity2[DerivedRepeaterVarIdentity2["Last"] = 1] = "Last";
  DerivedRepeaterVarIdentity2[DerivedRepeaterVarIdentity2["Even"] = 2] = "Even";
  DerivedRepeaterVarIdentity2[DerivedRepeaterVarIdentity2["Odd"] = 3] = "Odd";
})(DerivedRepeaterVarIdentity || (DerivedRepeaterVarIdentity = {}));
var I18nContextKind;
(function(I18nContextKind2) {
  I18nContextKind2[I18nContextKind2["RootI18n"] = 0] = "RootI18n";
  I18nContextKind2[I18nContextKind2["Icu"] = 1] = "Icu";
  I18nContextKind2[I18nContextKind2["Attr"] = 2] = "Attr";
})(I18nContextKind || (I18nContextKind = {}));
var TemplateKind;
(function(TemplateKind2) {
  TemplateKind2[TemplateKind2["NgTemplate"] = 0] = "NgTemplate";
  TemplateKind2[TemplateKind2["Structural"] = 1] = "Structural";
  TemplateKind2[TemplateKind2["Block"] = 2] = "Block";
})(TemplateKind || (TemplateKind = {}));

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/traits.mjs
var ConsumesSlot = Symbol("ConsumesSlot");
var DependsOnSlotContext = Symbol("DependsOnSlotContext");
var ConsumesVarsTrait = Symbol("ConsumesVars");
var UsesVarOffset = Symbol("UsesVarOffset");
var TRAIT_CONSUMES_SLOT = {
  [ConsumesSlot]: true,
  numSlotsUsed: 1
};
var TRAIT_DEPENDS_ON_SLOT_CONTEXT = {
  [DependsOnSlotContext]: true
};
var TRAIT_CONSUMES_VARS = {
  [ConsumesVarsTrait]: true
};
var TRAIT_USES_VAR_OFFSET = {
  [UsesVarOffset]: true,
  varOffset: null
};
function hasConsumesSlotTrait(op) {
  return op[ConsumesSlot] === true;
}
function hasDependsOnSlotContextTrait(op) {
  return op[DependsOnSlotContext] === true;
}
function hasConsumesVarsTrait(value) {
  return value[ConsumesVarsTrait] === true;
}
function hasUsesVarOffsetTrait(expr) {
  return expr[UsesVarOffset] === true;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/ops/shared.mjs
function createStatementOp(statement) {
  return __spreadValues({
    kind: OpKind.Statement,
    statement
  }, NEW_OP);
}
function createVariableOp(xref, variable2, initializer, flags) {
  return __spreadValues({
    kind: OpKind.Variable,
    xref,
    variable: variable2,
    initializer,
    flags
  }, NEW_OP);
}
var NEW_OP = {
  debugListId: null,
  prev: null,
  next: null
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/ops/update.mjs
function createInterpolateTextOp(xref, interpolation, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.InterpolateText,
    target: xref,
    interpolation,
    sourceSpan
  }, TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS), NEW_OP);
}
var Interpolation2 = class {
  constructor(strings, expressions, i18nPlaceholders) {
    this.strings = strings;
    this.expressions = expressions;
    this.i18nPlaceholders = i18nPlaceholders;
    if (i18nPlaceholders.length !== 0 && i18nPlaceholders.length !== expressions.length) {
      throw new Error(`Expected ${expressions.length} placeholders to match interpolation expression count, but got ${i18nPlaceholders.length}`);
    }
  }
};
function createBindingOp(target, kind, name, expression, unit, securityContext, isTextAttribute, isStructuralTemplate, i18nContext, sourceSpan) {
  return __spreadValues({
    kind: OpKind.Binding,
    bindingKind: kind,
    target,
    name,
    expression,
    unit,
    securityContext,
    isTextAttribute,
    isStructuralTemplate,
    i18nContext,
    sourceSpan
  }, NEW_OP);
}
function createPropertyOp(target, name, expression, isAnimationTrigger, securityContext, isStructuralTemplate, i18nContext, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.Property,
    target,
    name,
    expression,
    isAnimationTrigger,
    securityContext,
    sanitizer: null,
    isStructuralTemplate,
    i18nContext,
    sourceSpan
  }, TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS), NEW_OP);
}
function createStylePropOp(xref, name, expression, unit, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.StyleProp,
    target: xref,
    name,
    expression,
    unit,
    sourceSpan
  }, TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS), NEW_OP);
}
function createClassPropOp(xref, name, expression, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.ClassProp,
    target: xref,
    name,
    expression,
    sourceSpan
  }, TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS), NEW_OP);
}
function createStyleMapOp(xref, expression, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.StyleMap,
    target: xref,
    expression,
    sourceSpan
  }, TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS), NEW_OP);
}
function createClassMapOp(xref, expression, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.ClassMap,
    target: xref,
    expression,
    sourceSpan
  }, TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS), NEW_OP);
}
function createAttributeOp(target, name, expression, securityContext, isTextAttribute, isStructuralTemplate, i18nContext, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.Attribute,
    target,
    name,
    expression,
    securityContext,
    sanitizer: null,
    isTextAttribute,
    isStructuralTemplate,
    i18nContext,
    sourceSpan
  }, TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS), NEW_OP);
}
function createAdvanceOp(delta, sourceSpan) {
  return __spreadValues({
    kind: OpKind.Advance,
    delta,
    sourceSpan
  }, NEW_OP);
}
function createConditionalOp(target, targetSlot, test, conditions, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.Conditional,
    target,
    targetSlot,
    test,
    conditions,
    processed: null,
    sourceSpan,
    contextValue: null
  }, NEW_OP), TRAIT_DEPENDS_ON_SLOT_CONTEXT), TRAIT_CONSUMES_VARS);
}
function createRepeaterOp(repeaterCreate2, targetSlot, collection, sourceSpan) {
  return __spreadValues(__spreadValues({
    kind: OpKind.Repeater,
    target: repeaterCreate2,
    targetSlot,
    collection,
    sourceSpan
  }, NEW_OP), TRAIT_DEPENDS_ON_SLOT_CONTEXT);
}
function createDeferWhenOp(target, expr, prefetch, sourceSpan) {
  return __spreadValues(__spreadValues({
    kind: OpKind.DeferWhen,
    target,
    expr,
    prefetch,
    sourceSpan
  }, NEW_OP), TRAIT_DEPENDS_ON_SLOT_CONTEXT);
}
function createI18nExpressionOp(context, target, i18nOwner, handle, expression, i18nPlaceholder, resolutionTime, usage, name, sourceSpan) {
  return __spreadValues(__spreadValues(__spreadValues({
    kind: OpKind.I18nExpression,
    context,
    target,
    i18nOwner,
    handle,
    expression,
    i18nPlaceholder,
    resolutionTime,
    usage,
    name,
    sourceSpan
  }, NEW_OP), TRAIT_CONSUMES_VARS), TRAIT_DEPENDS_ON_SLOT_CONTEXT);
}
function createI18nApplyOp(owner, handle, sourceSpan) {
  return __spreadValues({
    kind: OpKind.I18nApply,
    owner,
    handle,
    sourceSpan
  }, NEW_OP);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/expression.mjs
var _a;
var _b;
var _c;
var _d;
var _e;
var _f;
function isIrExpression(expr) {
  return expr instanceof ExpressionBase;
}
var ExpressionBase = class extends Expression {
  constructor(sourceSpan = null) {
    super(null, sourceSpan);
  }
};
var LexicalReadExpr = class extends ExpressionBase {
  constructor(name) {
    super();
    this.name = name;
    this.kind = ExpressionKind.LexicalRead;
  }
  visitExpression(visitor, context) {
  }
  isEquivalent(other) {
    return this.name === other.name;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions() {
  }
  clone() {
    return new LexicalReadExpr(this.name);
  }
};
var ReferenceExpr = class extends ExpressionBase {
  constructor(target, targetSlot, offset) {
    super();
    this.target = target;
    this.targetSlot = targetSlot;
    this.offset = offset;
    this.kind = ExpressionKind.Reference;
  }
  visitExpression() {
  }
  isEquivalent(e) {
    return e instanceof ReferenceExpr && e.target === this.target;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions() {
  }
  clone() {
    return new ReferenceExpr(this.target, this.targetSlot, this.offset);
  }
};
var ContextExpr = class extends ExpressionBase {
  constructor(view) {
    super();
    this.view = view;
    this.kind = ExpressionKind.Context;
  }
  visitExpression() {
  }
  isEquivalent(e) {
    return e instanceof ContextExpr && e.view === this.view;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions() {
  }
  clone() {
    return new ContextExpr(this.view);
  }
};
var TrackContextExpr = class extends ExpressionBase {
  constructor(view) {
    super();
    this.view = view;
    this.kind = ExpressionKind.TrackContext;
  }
  visitExpression() {
  }
  isEquivalent(e) {
    return e instanceof TrackContextExpr && e.view === this.view;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions() {
  }
  clone() {
    return new TrackContextExpr(this.view);
  }
};
var NextContextExpr = class extends ExpressionBase {
  constructor() {
    super();
    this.kind = ExpressionKind.NextContext;
    this.steps = 1;
  }
  visitExpression() {
  }
  isEquivalent(e) {
    return e instanceof NextContextExpr && e.steps === this.steps;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions() {
  }
  clone() {
    const expr = new NextContextExpr();
    expr.steps = this.steps;
    return expr;
  }
};
var GetCurrentViewExpr = class extends ExpressionBase {
  constructor() {
    super();
    this.kind = ExpressionKind.GetCurrentView;
  }
  visitExpression() {
  }
  isEquivalent(e) {
    return e instanceof GetCurrentViewExpr;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions() {
  }
  clone() {
    return new GetCurrentViewExpr();
  }
};
var RestoreViewExpr = class extends ExpressionBase {
  constructor(view) {
    super();
    this.view = view;
    this.kind = ExpressionKind.RestoreView;
  }
  visitExpression(visitor, context) {
    if (typeof this.view !== "number") {
      this.view.visitExpression(visitor, context);
    }
  }
  isEquivalent(e) {
    if (!(e instanceof RestoreViewExpr) || typeof e.view !== typeof this.view) {
      return false;
    }
    if (typeof this.view === "number") {
      return this.view === e.view;
    } else {
      return this.view.isEquivalent(e.view);
    }
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    if (typeof this.view !== "number") {
      this.view = transformExpressionsInExpression(this.view, transform2, flags);
    }
  }
  clone() {
    return new RestoreViewExpr(this.view instanceof Expression ? this.view.clone() : this.view);
  }
};
var ResetViewExpr = class extends ExpressionBase {
  constructor(expr) {
    super();
    this.expr = expr;
    this.kind = ExpressionKind.ResetView;
  }
  visitExpression(visitor, context) {
    this.expr.visitExpression(visitor, context);
  }
  isEquivalent(e) {
    return e instanceof ResetViewExpr && this.expr.isEquivalent(e.expr);
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    this.expr = transformExpressionsInExpression(this.expr, transform2, flags);
  }
  clone() {
    return new ResetViewExpr(this.expr.clone());
  }
};
var ReadVariableExpr = class extends ExpressionBase {
  constructor(xref) {
    super();
    this.xref = xref;
    this.kind = ExpressionKind.ReadVariable;
    this.name = null;
  }
  visitExpression() {
  }
  isEquivalent(other) {
    return other instanceof ReadVariableExpr && other.xref === this.xref;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions() {
  }
  clone() {
    const expr = new ReadVariableExpr(this.xref);
    expr.name = this.name;
    return expr;
  }
};
var _PureFunctionExpr = class extends ExpressionBase {
  constructor(expression, args) {
    super();
    this.kind = ExpressionKind.PureFunctionExpr;
    this[_a] = true;
    this[_b] = true;
    this.varOffset = null;
    this.fn = null;
    this.body = expression;
    this.args = args;
  }
  visitExpression(visitor, context) {
    var _a2;
    (_a2 = this.body) == null ? void 0 : _a2.visitExpression(visitor, context);
    for (const arg of this.args) {
      arg.visitExpression(visitor, context);
    }
  }
  isEquivalent(other) {
    if (!(other instanceof _PureFunctionExpr) || other.args.length !== this.args.length) {
      return false;
    }
    return other.body !== null && this.body !== null && other.body.isEquivalent(this.body) && other.args.every((arg, idx) => arg.isEquivalent(this.args[idx]));
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    if (this.body !== null) {
      this.body = transformExpressionsInExpression(this.body, transform2, flags | VisitorContextFlag.InChildOperation);
    } else if (this.fn !== null) {
      this.fn = transformExpressionsInExpression(this.fn, transform2, flags);
    }
    for (let i = 0; i < this.args.length; i++) {
      this.args[i] = transformExpressionsInExpression(this.args[i], transform2, flags);
    }
  }
  clone() {
    var _a2, _b2, _c2, _d2;
    const expr = new _PureFunctionExpr((_b2 = (_a2 = this.body) == null ? void 0 : _a2.clone()) != null ? _b2 : null, this.args.map((arg) => arg.clone()));
    expr.fn = (_d2 = (_c2 = this.fn) == null ? void 0 : _c2.clone()) != null ? _d2 : null;
    expr.varOffset = this.varOffset;
    return expr;
  }
};
var PureFunctionExpr = _PureFunctionExpr;
(() => {
  _a = ConsumesVarsTrait, _b = UsesVarOffset;
})();
var PureFunctionParameterExpr = class extends ExpressionBase {
  constructor(index) {
    super();
    this.index = index;
    this.kind = ExpressionKind.PureFunctionParameterExpr;
  }
  visitExpression() {
  }
  isEquivalent(other) {
    return other instanceof PureFunctionParameterExpr && other.index === this.index;
  }
  isConstant() {
    return true;
  }
  transformInternalExpressions() {
  }
  clone() {
    return new PureFunctionParameterExpr(this.index);
  }
};
var _PipeBindingExpr = class extends ExpressionBase {
  constructor(target, targetSlot, name, args) {
    super();
    this.target = target;
    this.targetSlot = targetSlot;
    this.name = name;
    this.args = args;
    this.kind = ExpressionKind.PipeBinding;
    this[_c] = true;
    this[_d] = true;
    this.varOffset = null;
  }
  visitExpression(visitor, context) {
    for (const arg of this.args) {
      arg.visitExpression(visitor, context);
    }
  }
  isEquivalent() {
    return false;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    for (let idx = 0; idx < this.args.length; idx++) {
      this.args[idx] = transformExpressionsInExpression(this.args[idx], transform2, flags);
    }
  }
  clone() {
    const r = new _PipeBindingExpr(this.target, this.targetSlot, this.name, this.args.map((a) => a.clone()));
    r.varOffset = this.varOffset;
    return r;
  }
};
var PipeBindingExpr = _PipeBindingExpr;
(() => {
  _c = ConsumesVarsTrait, _d = UsesVarOffset;
})();
var _PipeBindingVariadicExpr = class extends ExpressionBase {
  constructor(target, targetSlot, name, args, numArgs) {
    super();
    this.target = target;
    this.targetSlot = targetSlot;
    this.name = name;
    this.args = args;
    this.numArgs = numArgs;
    this.kind = ExpressionKind.PipeBindingVariadic;
    this[_e] = true;
    this[_f] = true;
    this.varOffset = null;
  }
  visitExpression(visitor, context) {
    this.args.visitExpression(visitor, context);
  }
  isEquivalent() {
    return false;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    this.args = transformExpressionsInExpression(this.args, transform2, flags);
  }
  clone() {
    const r = new _PipeBindingVariadicExpr(this.target, this.targetSlot, this.name, this.args.clone(), this.numArgs);
    r.varOffset = this.varOffset;
    return r;
  }
};
var PipeBindingVariadicExpr = _PipeBindingVariadicExpr;
(() => {
  _e = ConsumesVarsTrait, _f = UsesVarOffset;
})();
var SafePropertyReadExpr = class extends ExpressionBase {
  constructor(receiver, name) {
    super();
    this.receiver = receiver;
    this.name = name;
    this.kind = ExpressionKind.SafePropertyRead;
  }
  get index() {
    return this.name;
  }
  visitExpression(visitor, context) {
    this.receiver.visitExpression(visitor, context);
  }
  isEquivalent() {
    return false;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    this.receiver = transformExpressionsInExpression(this.receiver, transform2, flags);
  }
  clone() {
    return new SafePropertyReadExpr(this.receiver.clone(), this.name);
  }
};
var SafeKeyedReadExpr = class extends ExpressionBase {
  constructor(receiver, index, sourceSpan) {
    super(sourceSpan);
    this.receiver = receiver;
    this.index = index;
    this.kind = ExpressionKind.SafeKeyedRead;
  }
  visitExpression(visitor, context) {
    this.receiver.visitExpression(visitor, context);
    this.index.visitExpression(visitor, context);
  }
  isEquivalent() {
    return false;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    this.receiver = transformExpressionsInExpression(this.receiver, transform2, flags);
    this.index = transformExpressionsInExpression(this.index, transform2, flags);
  }
  clone() {
    return new SafeKeyedReadExpr(this.receiver.clone(), this.index.clone(), this.sourceSpan);
  }
};
var SafeInvokeFunctionExpr = class extends ExpressionBase {
  constructor(receiver, args) {
    super();
    this.receiver = receiver;
    this.args = args;
    this.kind = ExpressionKind.SafeInvokeFunction;
  }
  visitExpression(visitor, context) {
    this.receiver.visitExpression(visitor, context);
    for (const a of this.args) {
      a.visitExpression(visitor, context);
    }
  }
  isEquivalent() {
    return false;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    this.receiver = transformExpressionsInExpression(this.receiver, transform2, flags);
    for (let i = 0; i < this.args.length; i++) {
      this.args[i] = transformExpressionsInExpression(this.args[i], transform2, flags);
    }
  }
  clone() {
    return new SafeInvokeFunctionExpr(this.receiver.clone(), this.args.map((a) => a.clone()));
  }
};
var SafeTernaryExpr = class extends ExpressionBase {
  constructor(guard, expr) {
    super();
    this.guard = guard;
    this.expr = expr;
    this.kind = ExpressionKind.SafeTernaryExpr;
  }
  visitExpression(visitor, context) {
    this.guard.visitExpression(visitor, context);
    this.expr.visitExpression(visitor, context);
  }
  isEquivalent() {
    return false;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    this.guard = transformExpressionsInExpression(this.guard, transform2, flags);
    this.expr = transformExpressionsInExpression(this.expr, transform2, flags);
  }
  clone() {
    return new SafeTernaryExpr(this.guard.clone(), this.expr.clone());
  }
};
var EmptyExpr2 = class extends ExpressionBase {
  constructor() {
    super(...arguments);
    this.kind = ExpressionKind.EmptyExpr;
  }
  visitExpression(visitor, context) {
  }
  isEquivalent(e) {
    return e instanceof EmptyExpr2;
  }
  isConstant() {
    return true;
  }
  clone() {
    return new EmptyExpr2();
  }
  transformInternalExpressions() {
  }
};
var AssignTemporaryExpr = class extends ExpressionBase {
  constructor(expr, xref) {
    super();
    this.expr = expr;
    this.xref = xref;
    this.kind = ExpressionKind.AssignTemporaryExpr;
    this.name = null;
  }
  visitExpression(visitor, context) {
    this.expr.visitExpression(visitor, context);
  }
  isEquivalent() {
    return false;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
    this.expr = transformExpressionsInExpression(this.expr, transform2, flags);
  }
  clone() {
    const a = new AssignTemporaryExpr(this.expr.clone(), this.xref);
    a.name = this.name;
    return a;
  }
};
var ReadTemporaryExpr = class extends ExpressionBase {
  constructor(xref) {
    super();
    this.xref = xref;
    this.kind = ExpressionKind.ReadTemporaryExpr;
    this.name = null;
  }
  visitExpression(visitor, context) {
  }
  isEquivalent() {
    return this.xref === this.xref;
  }
  isConstant() {
    return false;
  }
  transformInternalExpressions(transform2, flags) {
  }
  clone() {
    const r = new ReadTemporaryExpr(this.xref);
    r.name = this.name;
    return r;
  }
};
var SanitizerExpr = class extends ExpressionBase {
  constructor(fn2) {
    super();
    this.fn = fn2;
    this.kind = ExpressionKind.SanitizerExpr;
  }
  visitExpression(visitor, context) {
  }
  isEquivalent(e) {
    return e instanceof SanitizerExpr && e.fn === this.fn;
  }
  isConstant() {
    return true;
  }
  clone() {
    return new SanitizerExpr(this.fn);
  }
  transformInternalExpressions() {
  }
};
var SlotLiteralExpr = class extends ExpressionBase {
  constructor(slot) {
    super();
    this.slot = slot;
    this.kind = ExpressionKind.SlotLiteralExpr;
  }
  visitExpression(visitor, context) {
  }
  isEquivalent(e) {
    return e instanceof SlotLiteralExpr && e.slot === this.slot;
  }
  isConstant() {
    return true;
  }
  clone() {
    return new SlotLiteralExpr(this.slot);
  }
  transformInternalExpressions() {
  }
};
var ConditionalCaseExpr = class extends ExpressionBase {
  constructor(expr, target, targetSlot, alias = null) {
    super();
    this.expr = expr;
    this.target = target;
    this.targetSlot = targetSlot;
    this.alias = alias;
    this.kind = ExpressionKind.ConditionalCase;
  }
  visitExpression(visitor, context) {
    if (this.expr !== null) {
      this.expr.visitExpression(visitor, context);
    }
  }
  isEquivalent(e) {
    return e instanceof ConditionalCaseExpr && e.expr === this.expr;
  }
  isConstant() {
    return true;
  }
  clone() {
    return new ConditionalCaseExpr(this.expr, this.target, this.targetSlot);
  }
  transformInternalExpressions(transform2, flags) {
    if (this.expr !== null) {
      this.expr = transformExpressionsInExpression(this.expr, transform2, flags);
    }
  }
};
var DerivedRepeaterVarExpr = class extends ExpressionBase {
  constructor(xref, identity) {
    super();
    this.xref = xref;
    this.identity = identity;
    this.kind = ExpressionKind.DerivedRepeaterVar;
  }
  transformInternalExpressions(transform2, flags) {
  }
  visitExpression(visitor, context) {
  }
  isEquivalent(e) {
    return e instanceof DerivedRepeaterVarExpr && e.identity === this.identity && e.xref === this.xref;
  }
  isConstant() {
    return false;
  }
  clone() {
    return new DerivedRepeaterVarExpr(this.xref, this.identity);
  }
};
var ConstCollectedExpr = class extends ExpressionBase {
  constructor(expr) {
    super();
    this.expr = expr;
    this.kind = ExpressionKind.ConstCollected;
  }
  transformInternalExpressions(transform2, flags) {
    this.expr = transform2(this.expr, flags);
  }
  visitExpression(visitor, context) {
    this.expr.visitExpression(visitor, context);
  }
  isEquivalent(e) {
    if (!(e instanceof ConstCollectedExpr)) {
      return false;
    }
    return this.expr.isEquivalent(e.expr);
  }
  isConstant() {
    return this.expr.isConstant();
  }
  clone() {
    return new ConstCollectedExpr(this.expr);
  }
};
function visitExpressionsInOp(op, visitor) {
  transformExpressionsInOp(op, (expr, flags) => {
    visitor(expr, flags);
    return expr;
  }, VisitorContextFlag.None);
}
var VisitorContextFlag;
(function(VisitorContextFlag2) {
  VisitorContextFlag2[VisitorContextFlag2["None"] = 0] = "None";
  VisitorContextFlag2[VisitorContextFlag2["InChildOperation"] = 1] = "InChildOperation";
})(VisitorContextFlag || (VisitorContextFlag = {}));
function transformExpressionsInInterpolation(interpolation, transform2, flags) {
  for (let i = 0; i < interpolation.expressions.length; i++) {
    interpolation.expressions[i] = transformExpressionsInExpression(interpolation.expressions[i], transform2, flags);
  }
}
function transformExpressionsInOp(op, transform2, flags) {
  switch (op.kind) {
    case OpKind.StyleProp:
    case OpKind.StyleMap:
    case OpKind.ClassProp:
    case OpKind.ClassMap:
    case OpKind.Binding:
    case OpKind.HostProperty:
      if (op.expression instanceof Interpolation2) {
        transformExpressionsInInterpolation(op.expression, transform2, flags);
      } else {
        op.expression = transformExpressionsInExpression(op.expression, transform2, flags);
      }
      break;
    case OpKind.Property:
    case OpKind.Attribute:
      if (op.expression instanceof Interpolation2) {
        transformExpressionsInInterpolation(op.expression, transform2, flags);
      } else {
        op.expression = transformExpressionsInExpression(op.expression, transform2, flags);
      }
      op.sanitizer = op.sanitizer && transformExpressionsInExpression(op.sanitizer, transform2, flags);
      break;
    case OpKind.I18nExpression:
      op.expression = transformExpressionsInExpression(op.expression, transform2, flags);
      break;
    case OpKind.InterpolateText:
      transformExpressionsInInterpolation(op.interpolation, transform2, flags);
      break;
    case OpKind.Statement:
      transformExpressionsInStatement(op.statement, transform2, flags);
      break;
    case OpKind.Variable:
      op.initializer = transformExpressionsInExpression(op.initializer, transform2, flags);
      break;
    case OpKind.Conditional:
      for (const condition of op.conditions) {
        if (condition.expr === null) {
          continue;
        }
        condition.expr = transformExpressionsInExpression(condition.expr, transform2, flags);
      }
      if (op.processed !== null) {
        op.processed = transformExpressionsInExpression(op.processed, transform2, flags);
      }
      if (op.contextValue !== null) {
        op.contextValue = transformExpressionsInExpression(op.contextValue, transform2, flags);
      }
      break;
    case OpKind.Listener:
      for (const innerOp of op.handlerOps) {
        transformExpressionsInOp(innerOp, transform2, flags | VisitorContextFlag.InChildOperation);
      }
      break;
    case OpKind.ExtractedAttribute:
      op.expression = op.expression && transformExpressionsInExpression(op.expression, transform2, flags);
      break;
    case OpKind.RepeaterCreate:
      op.track = transformExpressionsInExpression(op.track, transform2, flags);
      if (op.trackByFn !== null) {
        op.trackByFn = transformExpressionsInExpression(op.trackByFn, transform2, flags);
      }
      break;
    case OpKind.Repeater:
      op.collection = transformExpressionsInExpression(op.collection, transform2, flags);
      break;
    case OpKind.Defer:
      if (op.loadingConfig !== null) {
        op.loadingConfig = transformExpressionsInExpression(op.loadingConfig, transform2, flags);
      }
      if (op.placeholderConfig !== null) {
        op.placeholderConfig = transformExpressionsInExpression(op.placeholderConfig, transform2, flags);
      }
      break;
    case OpKind.I18nMessage:
      for (const [placeholder, expr] of op.params) {
        op.params.set(placeholder, transformExpressionsInExpression(expr, transform2, flags));
      }
      for (const [placeholder, expr] of op.postprocessingParams) {
        op.postprocessingParams.set(placeholder, transformExpressionsInExpression(expr, transform2, flags));
      }
      break;
    case OpKind.DeferWhen:
      op.expr = transformExpressionsInExpression(op.expr, transform2, flags);
      break;
    case OpKind.Advance:
    case OpKind.Container:
    case OpKind.ContainerEnd:
    case OpKind.ContainerStart:
    case OpKind.DeferOn:
    case OpKind.DisableBindings:
    case OpKind.Element:
    case OpKind.ElementEnd:
    case OpKind.ElementStart:
    case OpKind.EnableBindings:
    case OpKind.I18n:
    case OpKind.I18nApply:
    case OpKind.I18nContext:
    case OpKind.I18nEnd:
    case OpKind.I18nStart:
    case OpKind.IcuEnd:
    case OpKind.IcuStart:
    case OpKind.Namespace:
    case OpKind.Pipe:
    case OpKind.Projection:
    case OpKind.ProjectionDef:
    case OpKind.Template:
    case OpKind.Text:
    case OpKind.I18nAttributes:
      break;
    default:
      throw new Error(`AssertionError: transformExpressionsInOp doesn't handle ${OpKind[op.kind]}`);
  }
}
function transformExpressionsInExpression(expr, transform2, flags) {
  if (expr instanceof ExpressionBase) {
    expr.transformInternalExpressions(transform2, flags);
  } else if (expr instanceof BinaryOperatorExpr) {
    expr.lhs = transformExpressionsInExpression(expr.lhs, transform2, flags);
    expr.rhs = transformExpressionsInExpression(expr.rhs, transform2, flags);
  } else if (expr instanceof UnaryOperatorExpr) {
    expr.expr = transformExpressionsInExpression(expr.expr, transform2, flags);
  } else if (expr instanceof ReadPropExpr) {
    expr.receiver = transformExpressionsInExpression(expr.receiver, transform2, flags);
  } else if (expr instanceof ReadKeyExpr) {
    expr.receiver = transformExpressionsInExpression(expr.receiver, transform2, flags);
    expr.index = transformExpressionsInExpression(expr.index, transform2, flags);
  } else if (expr instanceof WritePropExpr) {
    expr.receiver = transformExpressionsInExpression(expr.receiver, transform2, flags);
    expr.value = transformExpressionsInExpression(expr.value, transform2, flags);
  } else if (expr instanceof WriteKeyExpr) {
    expr.receiver = transformExpressionsInExpression(expr.receiver, transform2, flags);
    expr.index = transformExpressionsInExpression(expr.index, transform2, flags);
    expr.value = transformExpressionsInExpression(expr.value, transform2, flags);
  } else if (expr instanceof InvokeFunctionExpr) {
    expr.fn = transformExpressionsInExpression(expr.fn, transform2, flags);
    for (let i = 0; i < expr.args.length; i++) {
      expr.args[i] = transformExpressionsInExpression(expr.args[i], transform2, flags);
    }
  } else if (expr instanceof LiteralArrayExpr) {
    for (let i = 0; i < expr.entries.length; i++) {
      expr.entries[i] = transformExpressionsInExpression(expr.entries[i], transform2, flags);
    }
  } else if (expr instanceof LiteralMapExpr) {
    for (let i = 0; i < expr.entries.length; i++) {
      expr.entries[i].value = transformExpressionsInExpression(expr.entries[i].value, transform2, flags);
    }
  } else if (expr instanceof ConditionalExpr) {
    expr.condition = transformExpressionsInExpression(expr.condition, transform2, flags);
    expr.trueCase = transformExpressionsInExpression(expr.trueCase, transform2, flags);
    if (expr.falseCase !== null) {
      expr.falseCase = transformExpressionsInExpression(expr.falseCase, transform2, flags);
    }
  } else if (expr instanceof TypeofExpr) {
    expr.expr = transformExpressionsInExpression(expr.expr, transform2, flags);
  } else if (expr instanceof WriteVarExpr) {
    expr.value = transformExpressionsInExpression(expr.value, transform2, flags);
  } else if (expr instanceof LocalizedString) {
    for (let i = 0; i < expr.expressions.length; i++) {
      expr.expressions[i] = transformExpressionsInExpression(expr.expressions[i], transform2, flags);
    }
  } else if (expr instanceof NotExpr) {
    expr.condition = transformExpressionsInExpression(expr.condition, transform2, flags);
  } else if (expr instanceof ReadVarExpr || expr instanceof ExternalExpr || expr instanceof LiteralExpr) {
  } else {
    throw new Error(`Unhandled expression kind: ${expr.constructor.name}`);
  }
  return transform2(expr, flags);
}
function transformExpressionsInStatement(stmt, transform2, flags) {
  if (stmt instanceof ExpressionStatement) {
    stmt.expr = transformExpressionsInExpression(stmt.expr, transform2, flags);
  } else if (stmt instanceof ReturnStatement) {
    stmt.value = transformExpressionsInExpression(stmt.value, transform2, flags);
  } else if (stmt instanceof DeclareVarStmt) {
    if (stmt.value !== void 0) {
      stmt.value = transformExpressionsInExpression(stmt.value, transform2, flags);
    }
  } else if (stmt instanceof IfStmt) {
    stmt.condition = transformExpressionsInExpression(stmt.condition, transform2, flags);
    for (const caseStatement of stmt.trueCase) {
      transformExpressionsInStatement(caseStatement, transform2, flags);
    }
    for (const caseStatement of stmt.falseCase) {
      transformExpressionsInStatement(caseStatement, transform2, flags);
    }
  } else {
    throw new Error(`Unhandled statement kind: ${stmt.constructor.name}`);
  }
}
function isStringLiteral(expr) {
  return expr instanceof LiteralExpr && typeof expr.value === "string";
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/operations.mjs
var _OpList = class {
  constructor() {
    this.debugListId = _OpList.nextListId++;
    this.head = {
      kind: OpKind.ListEnd,
      next: null,
      prev: null,
      debugListId: this.debugListId
    };
    this.tail = {
      kind: OpKind.ListEnd,
      next: null,
      prev: null,
      debugListId: this.debugListId
    };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  push(op) {
    if (Array.isArray(op)) {
      for (const o of op) {
        this.push(o);
      }
      return;
    }
    _OpList.assertIsNotEnd(op);
    _OpList.assertIsUnowned(op);
    op.debugListId = this.debugListId;
    const oldLast = this.tail.prev;
    op.prev = oldLast;
    oldLast.next = op;
    op.next = this.tail;
    this.tail.prev = op;
  }
  prepend(ops) {
    if (ops.length === 0) {
      return;
    }
    for (const op of ops) {
      _OpList.assertIsNotEnd(op);
      _OpList.assertIsUnowned(op);
      op.debugListId = this.debugListId;
    }
    const first = this.head.next;
    let prev = this.head;
    for (const op of ops) {
      prev.next = op;
      op.prev = prev;
      prev = op;
    }
    prev.next = first;
    first.prev = prev;
  }
  *[Symbol.iterator]() {
    let current = this.head.next;
    while (current !== this.tail) {
      _OpList.assertIsOwned(current, this.debugListId);
      const next = current.next;
      yield current;
      current = next;
    }
  }
  *reversed() {
    let current = this.tail.prev;
    while (current !== this.head) {
      _OpList.assertIsOwned(current, this.debugListId);
      const prev = current.prev;
      yield current;
      current = prev;
    }
  }
  static replace(oldOp, newOp) {
    _OpList.assertIsNotEnd(oldOp);
    _OpList.assertIsNotEnd(newOp);
    _OpList.assertIsOwned(oldOp);
    _OpList.assertIsUnowned(newOp);
    newOp.debugListId = oldOp.debugListId;
    if (oldOp.prev !== null) {
      oldOp.prev.next = newOp;
      newOp.prev = oldOp.prev;
    }
    if (oldOp.next !== null) {
      oldOp.next.prev = newOp;
      newOp.next = oldOp.next;
    }
    oldOp.debugListId = null;
    oldOp.prev = null;
    oldOp.next = null;
  }
  static replaceWithMany(oldOp, newOps) {
    if (newOps.length === 0) {
      _OpList.remove(oldOp);
      return;
    }
    _OpList.assertIsNotEnd(oldOp);
    _OpList.assertIsOwned(oldOp);
    const listId = oldOp.debugListId;
    oldOp.debugListId = null;
    for (const newOp of newOps) {
      _OpList.assertIsNotEnd(newOp);
      _OpList.assertIsUnowned(newOp);
    }
    const { prev: oldPrev, next: oldNext } = oldOp;
    oldOp.prev = null;
    oldOp.next = null;
    let prev = oldPrev;
    for (const newOp of newOps) {
      this.assertIsUnowned(newOp);
      newOp.debugListId = listId;
      prev.next = newOp;
      newOp.prev = prev;
      newOp.next = null;
      prev = newOp;
    }
    const first = newOps[0];
    const last = prev;
    if (oldPrev !== null) {
      oldPrev.next = first;
      first.prev = oldPrev;
    }
    if (oldNext !== null) {
      oldNext.prev = last;
      last.next = oldNext;
    }
  }
  static remove(op) {
    _OpList.assertIsNotEnd(op);
    _OpList.assertIsOwned(op);
    op.prev.next = op.next;
    op.next.prev = op.prev;
    op.debugListId = null;
    op.prev = null;
    op.next = null;
  }
  static insertBefore(op, target) {
    if (Array.isArray(op)) {
      for (const o of op) {
        this.insertBefore(o, target);
      }
      return;
    }
    _OpList.assertIsOwned(target);
    if (target.prev === null) {
      throw new Error(`AssertionError: illegal operation on list start`);
    }
    _OpList.assertIsNotEnd(op);
    _OpList.assertIsUnowned(op);
    op.debugListId = target.debugListId;
    op.prev = null;
    target.prev.next = op;
    op.prev = target.prev;
    op.next = target;
    target.prev = op;
  }
  static insertAfter(op, target) {
    _OpList.assertIsOwned(target);
    if (target.next === null) {
      throw new Error(`AssertionError: illegal operation on list end`);
    }
    _OpList.assertIsNotEnd(op);
    _OpList.assertIsUnowned(op);
    op.debugListId = target.debugListId;
    target.next.prev = op;
    op.next = target.next;
    op.prev = target;
    target.next = op;
  }
  static assertIsUnowned(op) {
    if (op.debugListId !== null) {
      throw new Error(`AssertionError: illegal operation on owned node: ${OpKind[op.kind]}`);
    }
  }
  static assertIsOwned(op, byList) {
    if (op.debugListId === null) {
      throw new Error(`AssertionError: illegal operation on unowned node: ${OpKind[op.kind]}`);
    } else if (byList !== void 0 && op.debugListId !== byList) {
      throw new Error(`AssertionError: node belongs to the wrong list (expected ${byList}, actual ${op.debugListId})`);
    }
  }
  static assertIsNotEnd(op) {
    if (op.kind === OpKind.ListEnd) {
      throw new Error(`AssertionError: illegal operation on list head or tail`);
    }
  }
};
var OpList = _OpList;
(() => {
  _OpList.nextListId = 0;
})();

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/handle.mjs
var SlotHandle = class {
  constructor() {
    this.slot = null;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/ops/create.mjs
var elementContainerOpKinds = /* @__PURE__ */ new Set([
  OpKind.Element,
  OpKind.ElementStart,
  OpKind.Container,
  OpKind.ContainerStart,
  OpKind.Template,
  OpKind.RepeaterCreate
]);
function isElementOrContainerOp(op) {
  return elementContainerOpKinds.has(op.kind);
}
function createElementStartOp(tag, xref, namespace, i18nPlaceholder, sourceSpan) {
  return __spreadValues(__spreadValues({
    kind: OpKind.ElementStart,
    xref,
    tag,
    handle: new SlotHandle(),
    attributes: null,
    localRefs: [],
    nonBindable: false,
    namespace,
    i18nPlaceholder,
    sourceSpan
  }, TRAIT_CONSUMES_SLOT), NEW_OP);
}
function createTemplateOp(xref, templateKind, tag, functionNameSuffix, namespace, i18nPlaceholder, sourceSpan) {
  return __spreadValues(__spreadValues({
    kind: OpKind.Template,
    xref,
    templateKind,
    attributes: null,
    tag,
    handle: new SlotHandle(),
    functionNameSuffix,
    decls: null,
    vars: null,
    localRefs: [],
    nonBindable: false,
    namespace,
    i18nPlaceholder,
    sourceSpan
  }, TRAIT_CONSUMES_SLOT), NEW_OP);
}
function createRepeaterCreateOp(primaryView, emptyView, tag, track, varNames, sourceSpan) {
  return __spreadProps(__spreadValues(__spreadValues({
    kind: OpKind.RepeaterCreate,
    attributes: null,
    xref: primaryView,
    handle: new SlotHandle(),
    emptyView,
    track,
    trackByFn: null,
    tag,
    functionNameSuffix: "For",
    namespace: Namespace.HTML,
    nonBindable: false,
    localRefs: [],
    decls: null,
    vars: null,
    varNames,
    usesComponentInstance: false,
    sourceSpan
  }, TRAIT_CONSUMES_SLOT), NEW_OP), {
    numSlotsUsed: emptyView === null ? 2 : 3
  });
}
function createElementEndOp(xref, sourceSpan) {
  return __spreadValues({
    kind: OpKind.ElementEnd,
    xref,
    sourceSpan
  }, NEW_OP);
}
function createDisableBindingsOp(xref) {
  return __spreadValues({
    kind: OpKind.DisableBindings,
    xref
  }, NEW_OP);
}
function createEnableBindingsOp(xref) {
  return __spreadValues({
    kind: OpKind.EnableBindings,
    xref
  }, NEW_OP);
}
function createTextOp(xref, initialValue, sourceSpan) {
  return __spreadValues(__spreadValues({
    kind: OpKind.Text,
    xref,
    handle: new SlotHandle(),
    initialValue,
    sourceSpan
  }, TRAIT_CONSUMES_SLOT), NEW_OP);
}
function createListenerOp(target, targetSlot, name, tag, animationPhase, hostListener, sourceSpan) {
  return __spreadValues({
    kind: OpKind.Listener,
    target,
    targetSlot,
    tag,
    hostListener,
    name,
    handlerOps: new OpList(),
    handlerFnName: null,
    consumesDollarEvent: false,
    isAnimationListener: animationPhase !== null,
    animationPhase,
    sourceSpan
  }, NEW_OP);
}
function createPipeOp(xref, slot, name) {
  return __spreadValues(__spreadValues({
    kind: OpKind.Pipe,
    xref,
    handle: slot,
    name
  }, NEW_OP), TRAIT_CONSUMES_SLOT);
}
function createNamespaceOp(namespace) {
  return __spreadValues({
    kind: OpKind.Namespace,
    active: namespace
  }, NEW_OP);
}
function createProjectionDefOp(def) {
  return __spreadValues({
    kind: OpKind.ProjectionDef,
    def
  }, NEW_OP);
}
function createProjectionOp(xref, selector, i18nPlaceholder, attributes, sourceSpan) {
  return __spreadValues(__spreadValues({
    kind: OpKind.Projection,
    xref,
    handle: new SlotHandle(),
    selector,
    i18nPlaceholder,
    projectionSlotIndex: 0,
    attributes,
    localRefs: [],
    sourceSpan
  }, NEW_OP), TRAIT_CONSUMES_SLOT);
}
function createExtractedAttributeOp(target, bindingKind, name, expression, i18nContext) {
  return __spreadValues({
    kind: OpKind.ExtractedAttribute,
    target,
    bindingKind,
    name,
    expression,
    i18nContext
  }, NEW_OP);
}
function createDeferOp(xref, main, mainSlot, metadata, sourceSpan) {
  return __spreadProps(__spreadValues(__spreadValues({
    kind: OpKind.Defer,
    xref,
    handle: new SlotHandle(),
    mainView: main,
    mainSlot,
    loadingView: null,
    loadingSlot: null,
    loadingConfig: null,
    loadingMinimumTime: null,
    loadingAfterTime: null,
    placeholderView: null,
    placeholderSlot: null,
    placeholderConfig: null,
    placeholderMinimumTime: null,
    errorView: null,
    errorSlot: null,
    metadata,
    resolverFn: null,
    sourceSpan
  }, NEW_OP), TRAIT_CONSUMES_SLOT), {
    numSlotsUsed: 2
  });
}
function createDeferOnOp(defer2, trigger, prefetch, sourceSpan) {
  return __spreadValues({
    kind: OpKind.DeferOn,
    defer: defer2,
    trigger,
    prefetch,
    sourceSpan
  }, NEW_OP);
}
function createI18nMessageOp(xref, i18nContext, i18nBlock, message, messagePlaceholder, params, postprocessingParams, needsPostprocessing) {
  return __spreadValues({
    kind: OpKind.I18nMessage,
    xref,
    i18nContext,
    i18nBlock,
    message,
    messagePlaceholder,
    params,
    postprocessingParams,
    needsPostprocessing,
    subMessages: []
  }, NEW_OP);
}
function createI18nStartOp(xref, message, root) {
  return __spreadValues(__spreadValues({
    kind: OpKind.I18nStart,
    xref,
    handle: new SlotHandle(),
    root: root != null ? root : xref,
    message,
    messageIndex: null,
    subTemplateIndex: null,
    context: null
  }, NEW_OP), TRAIT_CONSUMES_SLOT);
}
function createI18nEndOp(xref) {
  return __spreadValues({
    kind: OpKind.I18nEnd,
    xref
  }, NEW_OP);
}
function createIcuStartOp(xref, message, messagePlaceholder, sourceSpan) {
  return __spreadValues({
    kind: OpKind.IcuStart,
    xref,
    message,
    messagePlaceholder,
    context: null,
    sourceSpan
  }, NEW_OP);
}
function createIcuEndOp(xref) {
  return __spreadValues({
    kind: OpKind.IcuEnd,
    xref
  }, NEW_OP);
}
function createI18nContextOp(contextKind, xref, i18nBlock, message, sourceSpan) {
  if (i18nBlock === null && contextKind !== I18nContextKind.Attr) {
    throw new Error("AssertionError: i18nBlock must be provided for non-attribute contexts.");
  }
  return __spreadValues({
    kind: OpKind.I18nContext,
    contextKind,
    xref,
    i18nBlock,
    message,
    sourceSpan,
    params: /* @__PURE__ */ new Map(),
    postprocessingParams: /* @__PURE__ */ new Map()
  }, NEW_OP);
}
function createI18nAttributesOp(xref, handle, target) {
  return __spreadValues(__spreadValues({
    kind: OpKind.I18nAttributes,
    xref,
    handle,
    target,
    i18nAttributesConfig: null
  }, NEW_OP), TRAIT_CONSUMES_SLOT);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/ops/host.mjs
function createHostPropertyOp(name, expression, isAnimationTrigger, i18nContext, sourceSpan) {
  return __spreadValues(__spreadValues({
    kind: OpKind.HostProperty,
    name,
    expression,
    isAnimationTrigger,
    i18nContext,
    sourceSpan
  }, TRAIT_CONSUMES_VARS), NEW_OP);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/ir/src/variable.mjs
var CTX_REF = "CTX_REF_MARKER";

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/compilation.mjs
var CompilationJobKind;
(function(CompilationJobKind2) {
  CompilationJobKind2[CompilationJobKind2["Tmpl"] = 0] = "Tmpl";
  CompilationJobKind2[CompilationJobKind2["Host"] = 1] = "Host";
  CompilationJobKind2[CompilationJobKind2["Both"] = 2] = "Both";
})(CompilationJobKind || (CompilationJobKind = {}));
var CompilationJob = class {
  constructor(componentName, pool, compatibility) {
    this.componentName = componentName;
    this.pool = pool;
    this.compatibility = compatibility;
    this.kind = CompilationJobKind.Both;
    this.nextXrefId = 0;
  }
  allocateXrefId() {
    return this.nextXrefId++;
  }
};
var ComponentCompilationJob = class extends CompilationJob {
  constructor(componentName, pool, compatibility, relativeContextFilePath, i18nUseExternalIds, deferBlocksMeta) {
    super(componentName, pool, compatibility);
    this.relativeContextFilePath = relativeContextFilePath;
    this.i18nUseExternalIds = i18nUseExternalIds;
    this.deferBlocksMeta = deferBlocksMeta;
    this.kind = CompilationJobKind.Tmpl;
    this.fnSuffix = "Template";
    this.views = /* @__PURE__ */ new Map();
    this.contentSelectors = null;
    this.consts = [];
    this.constsInitializers = [];
    this.root = new ViewCompilationUnit(this, this.allocateXrefId(), null);
    this.views.set(this.root.xref, this.root);
  }
  allocateView(parent) {
    const view = new ViewCompilationUnit(this, this.allocateXrefId(), parent);
    this.views.set(view.xref, view);
    return view;
  }
  get units() {
    return this.views.values();
  }
  addConst(newConst, initializers) {
    for (let idx2 = 0; idx2 < this.consts.length; idx2++) {
      if (this.consts[idx2].isEquivalent(newConst)) {
        return idx2;
      }
    }
    const idx = this.consts.length;
    this.consts.push(newConst);
    if (initializers) {
      this.constsInitializers.push(...initializers);
    }
    return idx;
  }
};
var CompilationUnit = class {
  constructor(xref) {
    this.xref = xref;
    this.create = new OpList();
    this.update = new OpList();
    this.fnName = null;
    this.vars = null;
  }
  *ops() {
    for (const op of this.create) {
      yield op;
      if (op.kind === OpKind.Listener) {
        for (const listenerOp of op.handlerOps) {
          yield listenerOp;
        }
      }
    }
    for (const op of this.update) {
      yield op;
    }
  }
};
var ViewCompilationUnit = class extends CompilationUnit {
  constructor(job, xref, parent) {
    super(xref);
    this.job = job;
    this.parent = parent;
    this.contextVariables = /* @__PURE__ */ new Map();
    this.aliases = /* @__PURE__ */ new Set();
    this.decls = null;
  }
};
var HostBindingCompilationJob = class extends CompilationJob {
  constructor(componentName, pool, compatibility) {
    super(componentName, pool, compatibility);
    this.kind = CompilationJobKind.Host;
    this.fnSuffix = "HostBindings";
    this.root = new HostBindingCompilationUnit(this);
  }
  get units() {
    return [this.root];
  }
};
var HostBindingCompilationUnit = class extends CompilationUnit {
  constructor(job) {
    super(0);
    this.job = job;
    this.attributes = null;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/any_cast.mjs
function deleteAnyCasts(job) {
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      transformExpressionsInOp(op, removeAnys, VisitorContextFlag.None);
    }
  }
}
function removeAnys(e) {
  if (e instanceof InvokeFunctionExpr && e.fn instanceof LexicalReadExpr && e.fn.name === "$any") {
    if (e.args.length !== 1) {
      throw new Error("The $any builtin function expects exactly one argument.");
    }
    return e.args[0];
  }
  return e;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/apply_i18n_expressions.mjs
function applyI18nExpressions(job) {
  const i18nContexts = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.I18nContext) {
        i18nContexts.set(op.xref, op);
      }
    }
  }
  for (const unit of job.units) {
    for (const op of unit.update) {
      if (op.kind === OpKind.I18nExpression && needsApplication(i18nContexts, op)) {
        OpList.insertAfter(createI18nApplyOp(op.i18nOwner, op.handle, null), op);
      }
    }
  }
}
function needsApplication(i18nContexts, op) {
  var _a2;
  if (((_a2 = op.next) == null ? void 0 : _a2.kind) !== OpKind.I18nExpression) {
    return true;
  }
  const context = i18nContexts.get(op.context);
  const nextContext2 = i18nContexts.get(op.next.context);
  if (context === void 0) {
    throw new Error("AssertionError: expected an I18nContextOp to exist for the I18nExpressionOp's context");
  }
  if (nextContext2 === void 0) {
    throw new Error("AssertionError: expected an I18nContextOp to exist for the next I18nExpressionOp's context");
  }
  if (context.i18nBlock !== null) {
    if (context.i18nBlock !== nextContext2.i18nBlock) {
      return true;
    }
    return false;
  }
  if (op.i18nOwner !== op.next.i18nOwner) {
    return true;
  }
  return false;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/assign_i18n_slot_dependencies.mjs
function assignI18nSlotDependencies(job) {
  const i18nLastSlotConsumers = /* @__PURE__ */ new Map();
  let lastSlotConsumer = null;
  let currentI18nOp = null;
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (hasConsumesSlotTrait(op)) {
        lastSlotConsumer = op.xref;
      }
      switch (op.kind) {
        case OpKind.I18nStart:
          currentI18nOp = op;
          break;
        case OpKind.I18nEnd:
          if (currentI18nOp === null) {
            throw new Error("AssertionError: Expected an active I18n block while calculating last slot consumers");
          }
          if (lastSlotConsumer === null) {
            throw new Error("AssertionError: Expected a last slot consumer while calculating last slot consumers");
          }
          i18nLastSlotConsumers.set(currentI18nOp.xref, lastSlotConsumer);
          currentI18nOp = null;
          break;
      }
    }
    let opsToMove = [];
    let moveAfterTarget = null;
    let previousTarget = null;
    for (const op of unit.update) {
      if (hasDependsOnSlotContextTrait(op)) {
        if (moveAfterTarget !== null && previousTarget === moveAfterTarget && op.target !== previousTarget) {
          OpList.insertBefore(opsToMove, op);
          moveAfterTarget = null;
          opsToMove = [];
        }
        previousTarget = op.target;
      }
      if (op.kind === OpKind.I18nExpression && op.usage === I18nExpressionFor.I18nText) {
        OpList.remove(op);
        opsToMove.push(op);
        const target = i18nLastSlotConsumers.get(op.i18nOwner);
        if (target === void 0) {
          throw new Error("AssertionError: Expected to find a last slot consumer for an I18nExpressionOp");
        }
        op.target = target;
        moveAfterTarget = op.target;
      }
    }
    if (moveAfterTarget !== null) {
      unit.update.push(opsToMove);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/util/elements.mjs
function createOpXrefMap(unit) {
  const map = /* @__PURE__ */ new Map();
  for (const op of unit.create) {
    if (!hasConsumesSlotTrait(op)) {
      continue;
    }
    map.set(op.xref, op);
  }
  return map;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/attribute_extraction.mjs
function extractAttributes(job) {
  for (const unit of job.units) {
    const elements = createOpXrefMap(unit);
    for (const op of unit.ops()) {
      switch (op.kind) {
        case OpKind.Attribute:
          extractAttributeOp(unit, op, elements);
          break;
        case OpKind.Property:
          if (!op.isAnimationTrigger) {
            let bindingKind;
            if (op.i18nContext !== null) {
              bindingKind = BindingKind.I18n;
            } else if (op.isStructuralTemplate) {
              bindingKind = BindingKind.Template;
            } else {
              bindingKind = BindingKind.Property;
            }
            OpList.insertBefore(createExtractedAttributeOp(op.target, bindingKind, op.name, null, null), lookupElement(elements, op.target));
          }
          break;
        case OpKind.StyleProp:
        case OpKind.ClassProp:
          if (unit.job.compatibility === CompatibilityMode.TemplateDefinitionBuilder && op.expression instanceof EmptyExpr2) {
            OpList.insertBefore(createExtractedAttributeOp(op.target, BindingKind.Property, op.name, null, null), lookupElement(elements, op.target));
          }
          break;
        case OpKind.Listener:
          if (!op.isAnimationListener) {
            const extractedAttributeOp = createExtractedAttributeOp(op.target, BindingKind.Property, op.name, null, null);
            if (job.kind === CompilationJobKind.Host) {
              unit.create.push(extractedAttributeOp);
            } else {
              OpList.insertBefore(extractedAttributeOp, lookupElement(elements, op.target));
            }
          }
          break;
      }
    }
  }
}
function lookupElement(elements, xref) {
  const el = elements.get(xref);
  if (el === void 0) {
    throw new Error("All attributes should have an element-like target.");
  }
  return el;
}
function extractAttributeOp(unit, op, elements) {
  if (op.expression instanceof Interpolation2) {
    return;
  }
  let extractable = op.expression.isConstant();
  if (unit.job.compatibility === CompatibilityMode.TemplateDefinitionBuilder) {
    extractable = isStringLiteral(op.expression);
    if (op.name === "style" || op.name === "class") {
      extractable && (extractable = op.isTextAttribute);
    }
    if (unit.job.kind === CompilationJobKind.Host) {
      extractable && (extractable = op.isTextAttribute);
    }
  }
  if (extractable) {
    const extractedAttributeOp = createExtractedAttributeOp(op.target, op.isStructuralTemplate ? BindingKind.Template : BindingKind.Attribute, op.name, op.expression, op.i18nContext);
    if (unit.job.kind === CompilationJobKind.Host) {
      unit.create.push(extractedAttributeOp);
    } else {
      const ownerOp = lookupElement(elements, op.target);
      OpList.insertBefore(extractedAttributeOp, ownerOp);
    }
    OpList.remove(op);
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/binding_specialization.mjs
function lookupElement2(elements, xref) {
  const el = elements.get(xref);
  if (el === void 0) {
    throw new Error("All attributes should have an element-like target.");
  }
  return el;
}
function specializeBindings(job) {
  const elements = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (!isElementOrContainerOp(op)) {
        continue;
      }
      elements.set(op.xref, op);
    }
  }
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      if (op.kind !== OpKind.Binding) {
        continue;
      }
      switch (op.bindingKind) {
        case BindingKind.Attribute:
          if (op.name === "ngNonBindable") {
            OpList.remove(op);
            const target = lookupElement2(elements, op.target);
            target.nonBindable = true;
          } else {
            OpList.replace(op, createAttributeOp(op.target, op.name, op.expression, op.securityContext, op.isTextAttribute, op.isStructuralTemplate, op.i18nContext, op.sourceSpan));
          }
          break;
        case BindingKind.Property:
        case BindingKind.Animation:
          if (job.kind === CompilationJobKind.Host) {
            OpList.replace(op, createHostPropertyOp(op.name, op.expression, op.bindingKind === BindingKind.Animation, op.i18nContext, op.sourceSpan));
          } else {
            OpList.replace(op, createPropertyOp(op.target, op.name, op.expression, op.bindingKind === BindingKind.Animation, op.securityContext, op.isStructuralTemplate, op.i18nContext, op.sourceSpan));
          }
          break;
        case BindingKind.I18n:
        case BindingKind.ClassName:
        case BindingKind.StyleProperty:
          throw new Error(`Unhandled binding of kind ${BindingKind[op.bindingKind]}`);
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/chaining.mjs
var CHAINABLE = /* @__PURE__ */ new Set([
  Identifiers.attribute,
  Identifiers.classProp,
  Identifiers.element,
  Identifiers.elementContainer,
  Identifiers.elementContainerEnd,
  Identifiers.elementContainerStart,
  Identifiers.elementEnd,
  Identifiers.elementStart,
  Identifiers.hostProperty,
  Identifiers.i18nExp,
  Identifiers.listener,
  Identifiers.listener,
  Identifiers.property,
  Identifiers.styleProp,
  Identifiers.stylePropInterpolate1,
  Identifiers.stylePropInterpolate2,
  Identifiers.stylePropInterpolate3,
  Identifiers.stylePropInterpolate4,
  Identifiers.stylePropInterpolate5,
  Identifiers.stylePropInterpolate6,
  Identifiers.stylePropInterpolate7,
  Identifiers.stylePropInterpolate8,
  Identifiers.stylePropInterpolateV,
  Identifiers.syntheticHostListener,
  Identifiers.syntheticHostProperty,
  Identifiers.templateCreate
]);
function chain(job) {
  for (const unit of job.units) {
    chainOperationsInList(unit.create);
    chainOperationsInList(unit.update);
  }
}
function chainOperationsInList(opList) {
  let chain2 = null;
  for (const op of opList) {
    if (op.kind !== OpKind.Statement || !(op.statement instanceof ExpressionStatement)) {
      chain2 = null;
      continue;
    }
    if (!(op.statement.expr instanceof InvokeFunctionExpr) || !(op.statement.expr.fn instanceof ExternalExpr)) {
      chain2 = null;
      continue;
    }
    const instruction = op.statement.expr.fn.value;
    if (!CHAINABLE.has(instruction)) {
      chain2 = null;
      continue;
    }
    if (chain2 !== null && chain2.instruction === instruction) {
      const expression = chain2.expression.callFn(op.statement.expr.args, op.statement.expr.sourceSpan, op.statement.expr.pure);
      chain2.expression = expression;
      chain2.op.statement = expression.toStmt();
      OpList.remove(op);
    } else {
      chain2 = {
        op,
        instruction,
        expression: op.statement.expr
      };
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/collapse_singleton_interpolations.mjs
function collapseSingletonInterpolations(job) {
  for (const unit of job.units) {
    for (const op of unit.update) {
      const eligibleOpKind = op.kind === OpKind.Attribute;
      if (eligibleOpKind && op.expression instanceof Interpolation2 && op.expression.strings.length === 2 && op.expression.strings.every((s) => s === "")) {
        op.expression = op.expression.expressions[0];
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/conditionals.mjs
function generateConditionalExpressions(job) {
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      if (op.kind !== OpKind.Conditional) {
        continue;
      }
      let test;
      const defaultCase = op.conditions.findIndex((cond) => cond.expr === null);
      if (defaultCase >= 0) {
        const slot = op.conditions.splice(defaultCase, 1)[0].targetSlot;
        test = new SlotLiteralExpr(slot);
      } else {
        test = literal(-1);
      }
      let tmp = op.test == null ? null : new AssignTemporaryExpr(op.test, job.allocateXrefId());
      for (let i = op.conditions.length - 1; i >= 0; i--) {
        let conditionalCase = op.conditions[i];
        if (conditionalCase.expr === null) {
          continue;
        }
        if (tmp !== null) {
          const useTmp = i === 0 ? tmp : new ReadTemporaryExpr(tmp.xref);
          conditionalCase.expr = new BinaryOperatorExpr(BinaryOperator.Identical, useTmp, conditionalCase.expr);
        } else if (conditionalCase.alias !== null) {
          const caseExpressionTemporaryXref = job.allocateXrefId();
          conditionalCase.expr = new AssignTemporaryExpr(conditionalCase.expr, caseExpressionTemporaryXref);
          op.contextValue = new ReadTemporaryExpr(caseExpressionTemporaryXref);
        }
        test = new ConditionalExpr(conditionalCase.expr, new SlotLiteralExpr(conditionalCase.targetSlot), test);
      }
      op.processed = test;
      op.conditions = [];
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/conversion.mjs
var BINARY_OPERATORS = /* @__PURE__ */ new Map([
  ["&&", BinaryOperator.And],
  [">", BinaryOperator.Bigger],
  [">=", BinaryOperator.BiggerEquals],
  ["&", BinaryOperator.BitwiseAnd],
  ["/", BinaryOperator.Divide],
  ["==", BinaryOperator.Equals],
  ["===", BinaryOperator.Identical],
  ["<", BinaryOperator.Lower],
  ["<=", BinaryOperator.LowerEquals],
  ["-", BinaryOperator.Minus],
  ["%", BinaryOperator.Modulo],
  ["*", BinaryOperator.Multiply],
  ["!=", BinaryOperator.NotEquals],
  ["!==", BinaryOperator.NotIdentical],
  ["??", BinaryOperator.NullishCoalesce],
  ["||", BinaryOperator.Or],
  ["+", BinaryOperator.Plus]
]);
function namespaceForKey(namespacePrefixKey) {
  var _a2;
  const NAMESPACES = /* @__PURE__ */ new Map([["svg", Namespace.SVG], ["math", Namespace.Math]]);
  if (namespacePrefixKey === null) {
    return Namespace.HTML;
  }
  return (_a2 = NAMESPACES.get(namespacePrefixKey)) != null ? _a2 : Namespace.HTML;
}
function keyForNamespace(namespace) {
  const NAMESPACES = /* @__PURE__ */ new Map([["svg", Namespace.SVG], ["math", Namespace.Math]]);
  for (const [k, n] of NAMESPACES.entries()) {
    if (n === namespace) {
      return k;
    }
  }
  return null;
}
function prefixWithNamespace(strippedTag, namespace) {
  if (namespace === Namespace.HTML) {
    return strippedTag;
  }
  return `:${keyForNamespace(namespace)}:${strippedTag}`;
}
function literalOrArrayLiteral(value) {
  if (Array.isArray(value)) {
    return literalArr(value.map(literalOrArrayLiteral));
  }
  return literal(value);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/const_collection.mjs
function collectElementConsts(job) {
  const allElementAttributes = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.ExtractedAttribute) {
        const attributes = allElementAttributes.get(op.target) || new ElementAttributes();
        allElementAttributes.set(op.target, attributes);
        attributes.add(op.bindingKind, op.name, op.expression);
        OpList.remove(op);
      }
    }
  }
  if (job instanceof ComponentCompilationJob) {
    for (const unit of job.units) {
      for (const op of unit.create) {
        if (isElementOrContainerOp(op)) {
          const attributes = allElementAttributes.get(op.xref);
          if (attributes !== void 0) {
            const attrArray = serializeAttributes(attributes);
            if (attrArray.entries.length > 0) {
              op.attributes = job.addConst(attrArray);
            }
          }
        }
      }
    }
  } else if (job instanceof HostBindingCompilationJob) {
    for (const [xref, attributes] of allElementAttributes.entries()) {
      if (xref !== job.root.xref) {
        throw new Error(`An attribute would be const collected into the host binding's template function, but is not associated with the root xref.`);
      }
      const attrArray = serializeAttributes(attributes);
      if (attrArray.entries.length > 0) {
        job.root.attributes = attrArray;
      }
    }
  }
}
var FLYWEIGHT_ARRAY = Object.freeze([]);
var ElementAttributes = class {
  constructor() {
    this.known = /* @__PURE__ */ new Set();
    this.byKind = /* @__PURE__ */ new Map();
    this.projectAs = null;
  }
  get attributes() {
    var _a2;
    return (_a2 = this.byKind.get(BindingKind.Attribute)) != null ? _a2 : FLYWEIGHT_ARRAY;
  }
  get classes() {
    var _a2;
    return (_a2 = this.byKind.get(BindingKind.ClassName)) != null ? _a2 : FLYWEIGHT_ARRAY;
  }
  get styles() {
    var _a2;
    return (_a2 = this.byKind.get(BindingKind.StyleProperty)) != null ? _a2 : FLYWEIGHT_ARRAY;
  }
  get bindings() {
    var _a2;
    return (_a2 = this.byKind.get(BindingKind.Property)) != null ? _a2 : FLYWEIGHT_ARRAY;
  }
  get template() {
    var _a2;
    return (_a2 = this.byKind.get(BindingKind.Template)) != null ? _a2 : FLYWEIGHT_ARRAY;
  }
  get i18n() {
    var _a2;
    return (_a2 = this.byKind.get(BindingKind.I18n)) != null ? _a2 : FLYWEIGHT_ARRAY;
  }
  add(kind, name, value) {
    var _a2;
    if (this.known.has(name)) {
      return;
    }
    this.known.add(name);
    if (name === "ngProjectAs") {
      if (value === null || !(value instanceof LiteralExpr) || value.value == null || typeof ((_a2 = value.value) == null ? void 0 : _a2.toString()) !== "string") {
        throw Error("ngProjectAs must have a string literal value");
      }
      this.projectAs = value.value.toString();
    }
    const array = this.arrayFor(kind);
    array.push(...getAttributeNameLiterals(name));
    if (kind === BindingKind.Attribute || kind === BindingKind.StyleProperty) {
      if (value === null) {
        throw Error("Attribute, i18n attribute, & style element attributes must have a value");
      }
      array.push(value);
    }
  }
  arrayFor(kind) {
    if (!this.byKind.has(kind)) {
      this.byKind.set(kind, []);
    }
    return this.byKind.get(kind);
  }
};
function getAttributeNameLiterals(name) {
  const [attributeNamespace, attributeName] = splitNsName(name);
  const nameLiteral = literal(attributeName);
  if (attributeNamespace) {
    return [
      literal(0),
      literal(attributeNamespace),
      nameLiteral
    ];
  }
  return [nameLiteral];
}
function serializeAttributes({ attributes, bindings, classes, i18n: i18n2, projectAs, styles, template: template2 }) {
  const attrArray = [...attributes];
  if (projectAs !== null) {
    const parsedR3Selector = parseSelectorToR3Selector(projectAs)[0];
    attrArray.push(literal(5), literalOrArrayLiteral(parsedR3Selector));
  }
  if (classes.length > 0) {
    attrArray.push(literal(1), ...classes);
  }
  if (styles.length > 0) {
    attrArray.push(literal(2), ...styles);
  }
  if (bindings.length > 0) {
    attrArray.push(literal(3), ...bindings);
  }
  if (template2.length > 0) {
    attrArray.push(literal(4), ...template2);
  }
  if (i18n2.length > 0) {
    attrArray.push(literal(6), ...i18n2);
  }
  return literalArr(attrArray);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/convert_i18n_bindings.mjs
function convertI18nBindings(job) {
  const i18nAttributesByElem = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.I18nAttributes) {
        i18nAttributesByElem.set(op.target, op);
      }
    }
    for (const op of unit.update) {
      switch (op.kind) {
        case OpKind.Property:
        case OpKind.Attribute:
          if (op.i18nContext === null) {
            continue;
          }
          if (!(op.expression instanceof Interpolation2)) {
            continue;
          }
          const i18nAttributesForElem = i18nAttributesByElem.get(op.target);
          if (i18nAttributesForElem === void 0) {
            throw new Error("AssertionError: An i18n attribute binding instruction requires the owning element to have an I18nAttributes create instruction");
          }
          if (i18nAttributesForElem.target !== op.target) {
            throw new Error("AssertionError: Expected i18nAttributes target element to match binding target element");
          }
          const ops = [];
          for (let i = 0; i < op.expression.expressions.length; i++) {
            const expr = op.expression.expressions[i];
            if (op.expression.i18nPlaceholders.length !== op.expression.expressions.length) {
              throw new Error(`AssertionError: An i18n attribute binding instruction requires the same number of expressions and placeholders, but found ${op.expression.i18nPlaceholders.length} placeholders and ${op.expression.expressions.length} expressions`);
            }
            ops.push(createI18nExpressionOp(op.i18nContext, i18nAttributesForElem.target, i18nAttributesForElem.xref, i18nAttributesForElem.handle, expr, op.expression.i18nPlaceholders[i], I18nParamResolutionTime.Creation, I18nExpressionFor.I18nAttribute, op.name, op.sourceSpan));
          }
          OpList.replaceWithMany(op, ops);
          break;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/create_defer_deps_fns.mjs
function createDeferDepsFns(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.Defer) {
        if (op.metadata.deps.length === 0) {
          continue;
        }
        const dependencies = [];
        for (const dep of op.metadata.deps) {
          if (dep.isDeferrable) {
            const innerFn = arrowFn([new FnParam("m", DYNAMIC_TYPE)], variable("m").prop(dep.symbolName));
            const importExpr2 = new DynamicImportExpr(dep.importPath).prop("then").callFn([innerFn]);
            dependencies.push(importExpr2);
          } else {
            dependencies.push(dep.type);
          }
        }
        const depsFnExpr = arrowFn([], literalArr(dependencies));
        if (op.handle.slot === null) {
          throw new Error("AssertionError: slot must be assigned bfore extracting defer deps functions");
        }
        op.resolverFn = job.pool.getSharedFunctionReference(depsFnExpr, `${job.componentName}_Defer_${op.handle.slot}_DepsFn`);
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/create_i18n_contexts.mjs
function createI18nContexts(job) {
  const rootContexts = /* @__PURE__ */ new Map();
  let currentI18nOp = null;
  let xref;
  for (const unit of job.units) {
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nStart:
          currentI18nOp = op;
          if (op.xref === op.root) {
            xref = job.allocateXrefId();
            unit.create.push(createI18nContextOp(I18nContextKind.RootI18n, xref, op.xref, op.message, null));
            op.context = xref;
            rootContexts.set(op.xref, xref);
          }
          break;
        case OpKind.I18nEnd:
          currentI18nOp = null;
          break;
        case OpKind.IcuStart:
          if (currentI18nOp === null) {
            throw Error("Unexpected ICU outside of an i18n block.");
          }
          if (op.message.id !== currentI18nOp.message.id) {
            xref = job.allocateXrefId();
            unit.create.push(createI18nContextOp(I18nContextKind.Icu, xref, currentI18nOp.xref, op.message, null));
            op.context = xref;
          } else {
            op.context = currentI18nOp.context;
          }
          break;
      }
    }
  }
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.I18nStart && op.xref !== op.root) {
        op.context = rootContexts.get(op.root);
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/defer_configs.mjs
function configureDeferInstructions(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind !== OpKind.Defer) {
        continue;
      }
      if (op.placeholderMinimumTime !== null) {
        op.placeholderConfig = new ConstCollectedExpr(literalOrArrayLiteral([op.placeholderMinimumTime]));
      }
      if (op.loadingMinimumTime !== null || op.loadingAfterTime !== null) {
        op.loadingConfig = new ConstCollectedExpr(literalOrArrayLiteral([op.loadingMinimumTime, op.loadingAfterTime]));
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/defer_resolve_targets.mjs
function resolveDeferTargetNames(job) {
  const scopes = /* @__PURE__ */ new Map();
  function getScopeForView2(view) {
    if (scopes.has(view.xref)) {
      return scopes.get(view.xref);
    }
    const scope = new Scope();
    for (const op of view.create) {
      if (!isElementOrContainerOp(op) || op.localRefs === null) {
        continue;
      }
      if (!Array.isArray(op.localRefs)) {
        throw new Error("LocalRefs were already processed, but were needed to resolve defer targets.");
      }
      for (const ref of op.localRefs) {
        if (ref.target !== "") {
          continue;
        }
        scope.targets.set(ref.name, { xref: op.xref, slot: op.handle });
      }
    }
    scopes.set(view.xref, scope);
    return scope;
  }
  function resolveTrigger(deferOwnerView, op, placeholderView) {
    switch (op.trigger.kind) {
      case DeferTriggerKind.Idle:
      case DeferTriggerKind.Immediate:
      case DeferTriggerKind.Timer:
        return;
      case DeferTriggerKind.Hover:
      case DeferTriggerKind.Interaction:
      case DeferTriggerKind.Viewport:
        if (op.trigger.targetName === null) {
          if (placeholderView === null) {
            throw new Error("defer on trigger with no target name must have a placeholder block");
          }
          const placeholder = job.views.get(placeholderView);
          if (placeholder == void 0) {
            throw new Error("AssertionError: could not find placeholder view for defer on trigger");
          }
          for (const placeholderOp of placeholder.create) {
            if (hasConsumesSlotTrait(placeholderOp) && (isElementOrContainerOp(placeholderOp) || placeholderOp.kind === OpKind.Projection)) {
              op.trigger.targetXref = placeholderOp.xref;
              op.trigger.targetView = placeholderView;
              op.trigger.targetSlotViewSteps = -1;
              op.trigger.targetSlot = placeholderOp.handle;
              return;
            }
          }
          return;
        }
        let view = placeholderView !== null ? job.views.get(placeholderView) : deferOwnerView;
        let step = placeholderView !== null ? -1 : 0;
        while (view !== null) {
          const scope = getScopeForView2(view);
          if (scope.targets.has(op.trigger.targetName)) {
            const { xref, slot } = scope.targets.get(op.trigger.targetName);
            op.trigger.targetXref = xref;
            op.trigger.targetView = view.xref;
            op.trigger.targetSlotViewSteps = step;
            op.trigger.targetSlot = slot;
            return;
          }
          view = view.parent !== null ? job.views.get(view.parent) : null;
          step++;
        }
        break;
      default:
        throw new Error(`Trigger kind ${op.trigger.kind} not handled`);
    }
  }
  for (const unit of job.units) {
    const defers = /* @__PURE__ */ new Map();
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.Defer:
          defers.set(op.xref, op);
          break;
        case OpKind.DeferOn:
          const deferOp = defers.get(op.defer);
          resolveTrigger(unit, op, deferOp.placeholderView);
          break;
      }
    }
  }
}
var Scope = class {
  constructor() {
    this.targets = /* @__PURE__ */ new Map();
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/empty_elements.mjs
var REPLACEMENTS = /* @__PURE__ */ new Map([
  [OpKind.ElementEnd, [OpKind.ElementStart, OpKind.Element]],
  [OpKind.ContainerEnd, [OpKind.ContainerStart, OpKind.Container]],
  [OpKind.I18nEnd, [OpKind.I18nStart, OpKind.I18n]]
]);
var IGNORED_OP_KINDS = /* @__PURE__ */ new Set([OpKind.Pipe]);
function collapseEmptyInstructions(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      const opReplacements = REPLACEMENTS.get(op.kind);
      if (opReplacements === void 0) {
        continue;
      }
      const [startKind, mergedKind] = opReplacements;
      let prevOp = op.prev;
      while (prevOp !== null && IGNORED_OP_KINDS.has(prevOp.kind)) {
        prevOp = prevOp.prev;
      }
      if (prevOp !== null && prevOp.kind === startKind) {
        prevOp.kind = mergedKind;
        OpList.remove(op);
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/expand_safe_reads.mjs
function expandSafeReads(job) {
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      transformExpressionsInOp(op, (e) => safeTransform(e, { job }), VisitorContextFlag.None);
      transformExpressionsInOp(op, ternaryTransform, VisitorContextFlag.None);
    }
  }
}
var requiresTemporary = [
  InvokeFunctionExpr,
  LiteralArrayExpr,
  LiteralMapExpr,
  SafeInvokeFunctionExpr,
  PipeBindingExpr
].map((e) => e.constructor.name);
function needsTemporaryInSafeAccess(e) {
  if (e instanceof UnaryOperatorExpr) {
    return needsTemporaryInSafeAccess(e.expr);
  } else if (e instanceof BinaryOperatorExpr) {
    return needsTemporaryInSafeAccess(e.lhs) || needsTemporaryInSafeAccess(e.rhs);
  } else if (e instanceof ConditionalExpr) {
    if (e.falseCase && needsTemporaryInSafeAccess(e.falseCase))
      return true;
    return needsTemporaryInSafeAccess(e.condition) || needsTemporaryInSafeAccess(e.trueCase);
  } else if (e instanceof NotExpr) {
    return needsTemporaryInSafeAccess(e.condition);
  } else if (e instanceof AssignTemporaryExpr) {
    return needsTemporaryInSafeAccess(e.expr);
  } else if (e instanceof ReadPropExpr) {
    return needsTemporaryInSafeAccess(e.receiver);
  } else if (e instanceof ReadKeyExpr) {
    return needsTemporaryInSafeAccess(e.receiver) || needsTemporaryInSafeAccess(e.index);
  }
  return e instanceof InvokeFunctionExpr || e instanceof LiteralArrayExpr || e instanceof LiteralMapExpr || e instanceof SafeInvokeFunctionExpr || e instanceof PipeBindingExpr;
}
function temporariesIn(e) {
  const temporaries = /* @__PURE__ */ new Set();
  transformExpressionsInExpression(e, (e2) => {
    if (e2 instanceof AssignTemporaryExpr) {
      temporaries.add(e2.xref);
    }
    return e2;
  }, VisitorContextFlag.None);
  return temporaries;
}
function eliminateTemporaryAssignments(e, tmps, ctx) {
  transformExpressionsInExpression(e, (e2) => {
    if (e2 instanceof AssignTemporaryExpr && tmps.has(e2.xref)) {
      const read = new ReadTemporaryExpr(e2.xref);
      return ctx.job.compatibility === CompatibilityMode.TemplateDefinitionBuilder ? new AssignTemporaryExpr(read, read.xref) : read;
    }
    return e2;
  }, VisitorContextFlag.None);
  return e;
}
function safeTernaryWithTemporary(guard, body, ctx) {
  let result;
  if (needsTemporaryInSafeAccess(guard)) {
    const xref = ctx.job.allocateXrefId();
    result = [new AssignTemporaryExpr(guard, xref), new ReadTemporaryExpr(xref)];
  } else {
    result = [guard, guard.clone()];
    eliminateTemporaryAssignments(result[1], temporariesIn(result[0]), ctx);
  }
  return new SafeTernaryExpr(result[0], body(result[1]));
}
function isSafeAccessExpression(e) {
  return e instanceof SafePropertyReadExpr || e instanceof SafeKeyedReadExpr || e instanceof SafeInvokeFunctionExpr;
}
function isUnsafeAccessExpression(e) {
  return e instanceof ReadPropExpr || e instanceof ReadKeyExpr || e instanceof InvokeFunctionExpr;
}
function isAccessExpression(e) {
  return isSafeAccessExpression(e) || isUnsafeAccessExpression(e);
}
function deepestSafeTernary(e) {
  if (isAccessExpression(e) && e.receiver instanceof SafeTernaryExpr) {
    let st = e.receiver;
    while (st.expr instanceof SafeTernaryExpr) {
      st = st.expr;
    }
    return st;
  }
  return null;
}
function safeTransform(e, ctx) {
  if (!isAccessExpression(e)) {
    return e;
  }
  const dst = deepestSafeTernary(e);
  if (dst) {
    if (e instanceof InvokeFunctionExpr) {
      dst.expr = dst.expr.callFn(e.args);
      return e.receiver;
    }
    if (e instanceof ReadPropExpr) {
      dst.expr = dst.expr.prop(e.name);
      return e.receiver;
    }
    if (e instanceof ReadKeyExpr) {
      dst.expr = dst.expr.key(e.index);
      return e.receiver;
    }
    if (e instanceof SafeInvokeFunctionExpr) {
      dst.expr = safeTernaryWithTemporary(dst.expr, (r) => r.callFn(e.args), ctx);
      return e.receiver;
    }
    if (e instanceof SafePropertyReadExpr) {
      dst.expr = safeTernaryWithTemporary(dst.expr, (r) => r.prop(e.name), ctx);
      return e.receiver;
    }
    if (e instanceof SafeKeyedReadExpr) {
      dst.expr = safeTernaryWithTemporary(dst.expr, (r) => r.key(e.index), ctx);
      return e.receiver;
    }
  } else {
    if (e instanceof SafeInvokeFunctionExpr) {
      return safeTernaryWithTemporary(e.receiver, (r) => r.callFn(e.args), ctx);
    }
    if (e instanceof SafePropertyReadExpr) {
      return safeTernaryWithTemporary(e.receiver, (r) => r.prop(e.name), ctx);
    }
    if (e instanceof SafeKeyedReadExpr) {
      return safeTernaryWithTemporary(e.receiver, (r) => r.key(e.index), ctx);
    }
  }
  return e;
}
function ternaryTransform(e) {
  if (!(e instanceof SafeTernaryExpr)) {
    return e;
  }
  return new ConditionalExpr(new BinaryOperatorExpr(BinaryOperator.Equals, e.guard, NULL_EXPR), NULL_EXPR, e.expr);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/extract_i18n_messages.mjs
var ESCAPE = "\uFFFD";
var ELEMENT_MARKER = "#";
var TEMPLATE_MARKER = "*";
var TAG_CLOSE_MARKER = "/";
var CONTEXT_MARKER = ":";
var LIST_START_MARKER = "[";
var LIST_END_MARKER = "]";
var LIST_DELIMITER = "|";
function extractI18nMessages(job) {
  const i18nContexts = /* @__PURE__ */ new Map();
  const i18nBlocks = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nContext:
          i18nContexts.set(op.xref, op);
          break;
        case OpKind.I18nStart:
          i18nBlocks.set(op.xref, op);
          break;
      }
    }
  }
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind !== OpKind.I18nContext || op.contextKind !== I18nContextKind.Attr) {
        continue;
      }
      const i18nMessageOp = createI18nMessage(job, op);
      unit.create.push(i18nMessageOp);
    }
  }
  const i18nBlockMessages = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.I18nStart && op.xref === op.root) {
        if (!op.context) {
          throw Error("I18n start op should have its context set.");
        }
        const i18nMessageOp = createI18nMessage(job, i18nContexts.get(op.context));
        i18nBlockMessages.set(op.xref, i18nMessageOp);
        unit.create.push(i18nMessageOp);
      }
    }
  }
  for (const unit of job.units) {
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.IcuStart:
          if (!op.context) {
            throw Error("ICU op should have its context set.");
          }
          const i18nContext = i18nContexts.get(op.context);
          if (i18nContext.contextKind === I18nContextKind.Icu) {
            if (i18nContext.i18nBlock === null) {
              throw Error("ICU context should have its i18n block set.");
            }
            const subMessage = createI18nMessage(job, i18nContext, op.messagePlaceholder);
            unit.create.push(subMessage);
            const rootI18nId = i18nBlocks.get(i18nContext.i18nBlock).root;
            const parentMessage = i18nBlockMessages.get(rootI18nId);
            parentMessage == null ? void 0 : parentMessage.subMessages.push(subMessage.xref);
          }
          OpList.remove(op);
          break;
        case OpKind.IcuEnd:
          OpList.remove(op);
          break;
      }
    }
  }
}
function createI18nMessage(job, context, messagePlaceholder) {
  let formattedParams = formatParams(context.params);
  const formattedPostprocessingParams = formatParams(context.postprocessingParams);
  let needsPostprocessing = formattedPostprocessingParams.size > 0;
  for (const values of context.params.values()) {
    if (values.length > 1) {
      needsPostprocessing = true;
    }
  }
  return createI18nMessageOp(job.allocateXrefId(), context.xref, context.i18nBlock, context.message, messagePlaceholder != null ? messagePlaceholder : null, formattedParams, formattedPostprocessingParams, needsPostprocessing);
}
function formatParams(params) {
  const formattedParams = /* @__PURE__ */ new Map();
  for (const [placeholder, placeholderValues] of params) {
    const serializedValues = formatParamValues(placeholderValues);
    if (serializedValues !== null) {
      formattedParams.set(placeholder, literal(serializedValues));
    }
  }
  return formattedParams;
}
function formatParamValues(values) {
  if (values.length === 0) {
    return null;
  }
  const serializedValues = values.map((value) => formatValue(value));
  return serializedValues.length === 1 ? serializedValues[0] : `${LIST_START_MARKER}${serializedValues.join(LIST_DELIMITER)}${LIST_END_MARKER}`;
}
function formatValue(value) {
  if (value.flags & I18nParamValueFlags.ElementTag && value.flags & I18nParamValueFlags.TemplateTag) {
    if (typeof value.value !== "object") {
      throw Error("AssertionError: Expected i18n param value to have an element and template slot");
    }
    const elementValue = formatValue(__spreadProps(__spreadValues({}, value), {
      value: value.value.element,
      flags: value.flags & ~I18nParamValueFlags.TemplateTag
    }));
    const templateValue = formatValue(__spreadProps(__spreadValues({}, value), {
      value: value.value.template,
      flags: value.flags & ~I18nParamValueFlags.ElementTag
    }));
    if (value.flags & I18nParamValueFlags.OpenTag && value.flags & I18nParamValueFlags.CloseTag) {
      return `${templateValue}${elementValue}${templateValue}`;
    }
    return value.flags & I18nParamValueFlags.CloseTag ? `${elementValue}${templateValue}` : `${templateValue}${elementValue}`;
  }
  if (value.flags & I18nParamValueFlags.OpenTag && value.flags & I18nParamValueFlags.CloseTag) {
    return `${formatValue(__spreadProps(__spreadValues({}, value), { flags: value.flags & ~I18nParamValueFlags.CloseTag }))}${formatValue(__spreadProps(__spreadValues({}, value), { flags: value.flags & ~I18nParamValueFlags.OpenTag }))}`;
  }
  if (value.flags === I18nParamValueFlags.None) {
    return `${value.value}`;
  }
  let tagMarker = "";
  let closeMarker = "";
  if (value.flags & I18nParamValueFlags.ElementTag) {
    tagMarker = ELEMENT_MARKER;
  } else if (value.flags & I18nParamValueFlags.TemplateTag) {
    tagMarker = TEMPLATE_MARKER;
  }
  if (tagMarker !== "") {
    closeMarker = value.flags & I18nParamValueFlags.CloseTag ? TAG_CLOSE_MARKER : "";
  }
  const context = value.subTemplateIndex === null ? "" : `${CONTEXT_MARKER}${value.subTemplateIndex}`;
  return `${ESCAPE}${closeMarker}${tagMarker}${value.value}${context}${ESCAPE}`;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/generate_advance.mjs
function generateAdvance(job) {
  for (const unit of job.units) {
    const slotMap = /* @__PURE__ */ new Map();
    for (const op of unit.create) {
      if (!hasConsumesSlotTrait(op)) {
        continue;
      } else if (op.handle.slot === null) {
        throw new Error(`AssertionError: expected slots to have been allocated before generating advance() calls`);
      }
      slotMap.set(op.xref, op.handle.slot);
    }
    let slotContext = 0;
    for (const op of unit.update) {
      if (!hasDependsOnSlotContextTrait(op)) {
        continue;
      } else if (!slotMap.has(op.target)) {
        throw new Error(`AssertionError: reference to unknown slot for target ${op.target}`);
      }
      const slot = slotMap.get(op.target);
      if (slotContext !== slot) {
        const delta = slot - slotContext;
        if (delta < 0) {
          throw new Error(`AssertionError: slot counter should never need to move backwards`);
        }
        OpList.insertBefore(createAdvanceOp(delta, op.sourceSpan), op);
        slotContext = slot;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/generate_projection_def.mjs
function generateProjectionDefs(job) {
  const share = job.compatibility === CompatibilityMode.TemplateDefinitionBuilder;
  const selectors = [];
  let projectionSlotIndex = 0;
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.Projection) {
        selectors.push(op.selector);
        op.projectionSlotIndex = projectionSlotIndex++;
      }
    }
  }
  if (selectors.length > 0) {
    let defExpr = null;
    if (selectors.length > 1 || selectors[0] !== "*") {
      const def = selectors.map((s) => s === "*" ? s : parseSelectorToR3Selector(s));
      defExpr = job.pool.getConstLiteral(literalOrArrayLiteral(def), share);
    }
    job.contentSelectors = job.pool.getConstLiteral(literalOrArrayLiteral(selectors), share);
    job.root.create.prepend([createProjectionDefOp(defExpr)]);
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/generate_variables.mjs
function generateVariables(job) {
  recursivelyProcessView(job.root, null);
}
function recursivelyProcessView(view, parentScope) {
  const scope = getScopeForView(view, parentScope);
  for (const op of view.create) {
    switch (op.kind) {
      case OpKind.Template:
      case OpKind.RepeaterCreate:
        recursivelyProcessView(view.job.views.get(op.xref), scope);
        break;
      case OpKind.Listener:
        op.handlerOps.prepend(generateVariablesInScopeForView(view, scope));
        break;
    }
  }
  const preambleOps = generateVariablesInScopeForView(view, scope);
  view.update.prepend(preambleOps);
}
function getScopeForView(view, parent) {
  const scope = {
    view: view.xref,
    viewContextVariable: {
      kind: SemanticVariableKind.Context,
      name: null,
      view: view.xref
    },
    contextVariables: /* @__PURE__ */ new Map(),
    aliases: view.aliases,
    references: [],
    parent
  };
  for (const identifier of view.contextVariables.keys()) {
    scope.contextVariables.set(identifier, {
      kind: SemanticVariableKind.Identifier,
      name: null,
      identifier
    });
  }
  for (const op of view.create) {
    switch (op.kind) {
      case OpKind.ElementStart:
      case OpKind.Template:
        if (!Array.isArray(op.localRefs)) {
          throw new Error(`AssertionError: expected localRefs to be an array`);
        }
        for (let offset = 0; offset < op.localRefs.length; offset++) {
          scope.references.push({
            name: op.localRefs[offset].name,
            targetId: op.xref,
            targetSlot: op.handle,
            offset,
            variable: {
              kind: SemanticVariableKind.Identifier,
              name: null,
              identifier: op.localRefs[offset].name
            }
          });
        }
        break;
    }
  }
  return scope;
}
function generateVariablesInScopeForView(view, scope) {
  const newOps = [];
  if (scope.view !== view.xref) {
    newOps.push(createVariableOp(view.job.allocateXrefId(), scope.viewContextVariable, new NextContextExpr(), VariableFlags.None));
  }
  const scopeView = view.job.views.get(scope.view);
  for (const [name, value] of scopeView.contextVariables) {
    const context = new ContextExpr(scope.view);
    const variable2 = value === CTX_REF ? context : new ReadPropExpr(context, value);
    newOps.push(createVariableOp(view.job.allocateXrefId(), scope.contextVariables.get(name), variable2, VariableFlags.None));
  }
  for (const alias of scopeView.aliases) {
    newOps.push(createVariableOp(view.job.allocateXrefId(), alias, alias.expression.clone(), VariableFlags.AlwaysInline));
  }
  for (const ref of scope.references) {
    newOps.push(createVariableOp(view.job.allocateXrefId(), ref.variable, new ReferenceExpr(ref.targetId, ref.targetSlot, ref.offset), VariableFlags.None));
  }
  if (scope.parent !== null) {
    newOps.push(...generateVariablesInScopeForView(view, scope.parent));
  }
  return newOps;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/has_const_expression_collection.mjs
function collectConstExpressions(job) {
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      transformExpressionsInOp(op, (expr) => {
        if (!(expr instanceof ConstCollectedExpr)) {
          return expr;
        }
        return literal(job.addConst(expr.expr));
      }, VisitorContextFlag.None);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/host_style_property_parsing.mjs
var STYLE_DOT = "style.";
var CLASS_DOT = "class.";
var STYLE_BANG = "style!";
var CLASS_BANG = "class!";
var BANG_IMPORTANT = "!important";
function parseHostStyleProperties(job) {
  for (const op of job.root.update) {
    if (op.kind !== OpKind.Binding) {
      continue;
    }
    if (op.name.endsWith(BANG_IMPORTANT)) {
      op.name = op.name.substring(0, op.name.length - BANG_IMPORTANT.length);
    }
    if (op.name.startsWith(STYLE_DOT)) {
      op.bindingKind = BindingKind.StyleProperty;
      op.name = op.name.substring(STYLE_DOT.length);
      if (isCssCustomProperty(op.name)) {
        op.name = hyphenate(op.name);
      }
      const { property: property2, suffix } = parseProperty(op.name);
      op.name = property2;
      op.unit = suffix;
    } else if (op.name.startsWith(STYLE_BANG)) {
      op.bindingKind = BindingKind.StyleProperty;
      op.name = "style";
    } else if (op.name.startsWith(CLASS_DOT)) {
      op.bindingKind = BindingKind.ClassName;
      op.name = parseProperty(op.name.substring(CLASS_DOT.length)).property;
    } else if (op.name.startsWith(CLASS_BANG)) {
      op.bindingKind = BindingKind.ClassName;
      op.name = parseProperty(op.name.substring(CLASS_BANG.length)).property;
    }
  }
}
function isCssCustomProperty(name) {
  return name.startsWith("--");
}
function hyphenate(value) {
  return value.replace(/[a-z][A-Z]/g, (v) => {
    return v.charAt(0) + "-" + v.charAt(1);
  }).toLowerCase();
}
function parseProperty(name) {
  const overrideIndex = name.indexOf("!important");
  if (overrideIndex !== -1) {
    name = overrideIndex > 0 ? name.substring(0, overrideIndex) : "";
  }
  let suffix = null;
  let property2 = name;
  const unitIndex = name.lastIndexOf(".");
  if (unitIndex > 0) {
    suffix = name.slice(unitIndex + 1);
    property2 = name.substring(0, unitIndex);
  }
  return { property: property2, suffix };
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/output/map_util.mjs
function mapLiteral(obj, quoted = false) {
  return literalMap(Object.keys(obj).map((key) => ({
    key,
    quoted,
    value: obj[key]
  })));
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/i18n/icu_serializer.mjs
var IcuSerializerVisitor = class {
  visitText(text2) {
    return text2.value;
  }
  visitContainer(container) {
    return container.children.map((child) => child.visit(this)).join("");
  }
  visitIcu(icu) {
    const strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    const result = `{${icu.expressionPlaceholder}, ${icu.type}, ${strCases.join(" ")}}`;
    return result;
  }
  visitTagPlaceholder(ph) {
    return ph.isVoid ? this.formatPh(ph.startName) : `${this.formatPh(ph.startName)}${ph.children.map((child) => child.visit(this)).join("")}${this.formatPh(ph.closeName)}`;
  }
  visitPlaceholder(ph) {
    return this.formatPh(ph.name);
  }
  visitBlockPlaceholder(ph) {
    return `${this.formatPh(ph.startName)}${ph.children.map((child) => child.visit(this)).join("")}${this.formatPh(ph.closeName)}`;
  }
  visitIcuPlaceholder(ph, context) {
    return this.formatPh(ph.name);
  }
  formatPh(value) {
    return `{${formatI18nPlaceholderName(value, false)}}`;
  }
};
var serializer = new IcuSerializerVisitor();
function serializeIcuNode(icu) {
  return icu.visit(serializer);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/expression_parser/lexer.mjs
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2["Character"] = 0] = "Character";
  TokenType2[TokenType2["Identifier"] = 1] = "Identifier";
  TokenType2[TokenType2["PrivateIdentifier"] = 2] = "PrivateIdentifier";
  TokenType2[TokenType2["Keyword"] = 3] = "Keyword";
  TokenType2[TokenType2["String"] = 4] = "String";
  TokenType2[TokenType2["Operator"] = 5] = "Operator";
  TokenType2[TokenType2["Number"] = 6] = "Number";
  TokenType2[TokenType2["Error"] = 7] = "Error";
})(TokenType || (TokenType = {}));
var KEYWORDS = ["var", "let", "as", "null", "undefined", "true", "false", "if", "else", "this"];
var Lexer = class {
  tokenize(text2) {
    const scanner = new _Scanner(text2);
    const tokens = [];
    let token = scanner.scanToken();
    while (token != null) {
      tokens.push(token);
      token = scanner.scanToken();
    }
    return tokens;
  }
};
var Token = class {
  constructor(index, end, type, numValue, strValue) {
    this.index = index;
    this.end = end;
    this.type = type;
    this.numValue = numValue;
    this.strValue = strValue;
  }
  isCharacter(code) {
    return this.type == TokenType.Character && this.numValue == code;
  }
  isNumber() {
    return this.type == TokenType.Number;
  }
  isString() {
    return this.type == TokenType.String;
  }
  isOperator(operator) {
    return this.type == TokenType.Operator && this.strValue == operator;
  }
  isIdentifier() {
    return this.type == TokenType.Identifier;
  }
  isPrivateIdentifier() {
    return this.type == TokenType.PrivateIdentifier;
  }
  isKeyword() {
    return this.type == TokenType.Keyword;
  }
  isKeywordLet() {
    return this.type == TokenType.Keyword && this.strValue == "let";
  }
  isKeywordAs() {
    return this.type == TokenType.Keyword && this.strValue == "as";
  }
  isKeywordNull() {
    return this.type == TokenType.Keyword && this.strValue == "null";
  }
  isKeywordUndefined() {
    return this.type == TokenType.Keyword && this.strValue == "undefined";
  }
  isKeywordTrue() {
    return this.type == TokenType.Keyword && this.strValue == "true";
  }
  isKeywordFalse() {
    return this.type == TokenType.Keyword && this.strValue == "false";
  }
  isKeywordThis() {
    return this.type == TokenType.Keyword && this.strValue == "this";
  }
  isError() {
    return this.type == TokenType.Error;
  }
  toNumber() {
    return this.type == TokenType.Number ? this.numValue : -1;
  }
  toString() {
    switch (this.type) {
      case TokenType.Character:
      case TokenType.Identifier:
      case TokenType.Keyword:
      case TokenType.Operator:
      case TokenType.PrivateIdentifier:
      case TokenType.String:
      case TokenType.Error:
        return this.strValue;
      case TokenType.Number:
        return this.numValue.toString();
      default:
        return null;
    }
  }
};
function newCharacterToken(index, end, code) {
  return new Token(index, end, TokenType.Character, code, String.fromCharCode(code));
}
function newIdentifierToken(index, end, text2) {
  return new Token(index, end, TokenType.Identifier, 0, text2);
}
function newPrivateIdentifierToken(index, end, text2) {
  return new Token(index, end, TokenType.PrivateIdentifier, 0, text2);
}
function newKeywordToken(index, end, text2) {
  return new Token(index, end, TokenType.Keyword, 0, text2);
}
function newOperatorToken(index, end, text2) {
  return new Token(index, end, TokenType.Operator, 0, text2);
}
function newStringToken(index, end, text2) {
  return new Token(index, end, TokenType.String, 0, text2);
}
function newNumberToken(index, end, n) {
  return new Token(index, end, TokenType.Number, n, "");
}
function newErrorToken(index, end, message) {
  return new Token(index, end, TokenType.Error, 0, message);
}
var EOF = new Token(-1, -1, TokenType.Character, 0, "");
var _Scanner = class {
  constructor(input) {
    this.input = input;
    this.peek = 0;
    this.index = -1;
    this.length = input.length;
    this.advance();
  }
  advance() {
    this.peek = ++this.index >= this.length ? $EOF : this.input.charCodeAt(this.index);
  }
  scanToken() {
    const input = this.input, length = this.length;
    let peek = this.peek, index = this.index;
    while (peek <= $SPACE) {
      if (++index >= length) {
        peek = $EOF;
        break;
      } else {
        peek = input.charCodeAt(index);
      }
    }
    this.peek = peek;
    this.index = index;
    if (index >= length) {
      return null;
    }
    if (isIdentifierStart(peek))
      return this.scanIdentifier();
    if (isDigit(peek))
      return this.scanNumber(index);
    const start = index;
    switch (peek) {
      case $PERIOD:
        this.advance();
        return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, this.index, $PERIOD);
      case $LPAREN:
      case $RPAREN:
      case $LBRACE:
      case $RBRACE:
      case $LBRACKET:
      case $RBRACKET:
      case $COMMA:
      case $COLON:
      case $SEMICOLON:
        return this.scanCharacter(start, peek);
      case $SQ:
      case $DQ:
        return this.scanString();
      case $HASH:
        return this.scanPrivateIdentifier();
      case $PLUS:
      case $MINUS:
      case $STAR:
      case $SLASH:
      case $PERCENT:
      case $CARET:
        return this.scanOperator(start, String.fromCharCode(peek));
      case $QUESTION:
        return this.scanQuestion(start);
      case $LT:
      case $GT:
        return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, "=");
      case $BANG:
      case $EQ:
        return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, "=", $EQ, "=");
      case $AMPERSAND:
        return this.scanComplexOperator(start, "&", $AMPERSAND, "&");
      case $BAR:
        return this.scanComplexOperator(start, "|", $BAR, "|");
      case $NBSP:
        while (isWhitespace(this.peek))
          this.advance();
        return this.scanToken();
    }
    this.advance();
    return this.error(`Unexpected character [${String.fromCharCode(peek)}]`, 0);
  }
  scanCharacter(start, code) {
    this.advance();
    return newCharacterToken(start, this.index, code);
  }
  scanOperator(start, str) {
    this.advance();
    return newOperatorToken(start, this.index, str);
  }
  scanComplexOperator(start, one, twoCode, two, threeCode, three) {
    this.advance();
    let str = one;
    if (this.peek == twoCode) {
      this.advance();
      str += two;
    }
    if (threeCode != null && this.peek == threeCode) {
      this.advance();
      str += three;
    }
    return newOperatorToken(start, this.index, str);
  }
  scanIdentifier() {
    const start = this.index;
    this.advance();
    while (isIdentifierPart(this.peek))
      this.advance();
    const str = this.input.substring(start, this.index);
    return KEYWORDS.indexOf(str) > -1 ? newKeywordToken(start, this.index, str) : newIdentifierToken(start, this.index, str);
  }
  scanPrivateIdentifier() {
    const start = this.index;
    this.advance();
    if (!isIdentifierStart(this.peek)) {
      return this.error("Invalid character [#]", -1);
    }
    while (isIdentifierPart(this.peek))
      this.advance();
    const identifierName2 = this.input.substring(start, this.index);
    return newPrivateIdentifierToken(start, this.index, identifierName2);
  }
  scanNumber(start) {
    let simple = this.index === start;
    let hasSeparators = false;
    this.advance();
    while (true) {
      if (isDigit(this.peek)) {
      } else if (this.peek === $_) {
        if (!isDigit(this.input.charCodeAt(this.index - 1)) || !isDigit(this.input.charCodeAt(this.index + 1))) {
          return this.error("Invalid numeric separator", 0);
        }
        hasSeparators = true;
      } else if (this.peek === $PERIOD) {
        simple = false;
      } else if (isExponentStart(this.peek)) {
        this.advance();
        if (isExponentSign(this.peek))
          this.advance();
        if (!isDigit(this.peek))
          return this.error("Invalid exponent", -1);
        simple = false;
      } else {
        break;
      }
      this.advance();
    }
    let str = this.input.substring(start, this.index);
    if (hasSeparators) {
      str = str.replace(/_/g, "");
    }
    const value = simple ? parseIntAutoRadix(str) : parseFloat(str);
    return newNumberToken(start, this.index, value);
  }
  scanString() {
    const start = this.index;
    const quote = this.peek;
    this.advance();
    let buffer = "";
    let marker = this.index;
    const input = this.input;
    while (this.peek != quote) {
      if (this.peek == $BACKSLASH) {
        buffer += input.substring(marker, this.index);
        let unescapedCode;
        this.advance();
        if (this.peek == $u) {
          const hex = input.substring(this.index + 1, this.index + 5);
          if (/^[0-9a-f]+$/i.test(hex)) {
            unescapedCode = parseInt(hex, 16);
          } else {
            return this.error(`Invalid unicode escape [\\u${hex}]`, 0);
          }
          for (let i = 0; i < 5; i++) {
            this.advance();
          }
        } else {
          unescapedCode = unescape(this.peek);
          this.advance();
        }
        buffer += String.fromCharCode(unescapedCode);
        marker = this.index;
      } else if (this.peek == $EOF) {
        return this.error("Unterminated quote", 0);
      } else {
        this.advance();
      }
    }
    const last = input.substring(marker, this.index);
    this.advance();
    return newStringToken(start, this.index, buffer + last);
  }
  scanQuestion(start) {
    this.advance();
    let str = "?";
    if (this.peek === $QUESTION || this.peek === $PERIOD) {
      str += this.peek === $PERIOD ? "." : "?";
      this.advance();
    }
    return newOperatorToken(start, this.index, str);
  }
  error(message, offset) {
    const position = this.index + offset;
    return newErrorToken(position, this.index, `Lexer Error: ${message} at column ${position} in expression [${this.input}]`);
  }
};
function isIdentifierStart(code) {
  return $a <= code && code <= $z || $A <= code && code <= $Z || code == $_ || code == $$;
}
function isIdentifierPart(code) {
  return isAsciiLetter(code) || isDigit(code) || code == $_ || code == $$;
}
function isExponentStart(code) {
  return code == $e || code == $E;
}
function isExponentSign(code) {
  return code == $MINUS || code == $PLUS;
}
function unescape(code) {
  switch (code) {
    case $n:
      return $LF;
    case $f:
      return $FF;
    case $r:
      return $CR;
    case $t:
      return $TAB;
    case $v:
      return $VTAB;
    default:
      return code;
  }
}
function parseIntAutoRadix(text2) {
  const result = parseInt(text2);
  if (isNaN(result)) {
    throw new Error("Invalid integer literal when parsing " + text2);
  }
  return result;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/expression_parser/parser.mjs
var SplitInterpolation = class {
  constructor(strings, expressions, offsets) {
    this.strings = strings;
    this.expressions = expressions;
    this.offsets = offsets;
  }
};
var TemplateBindingParseResult = class {
  constructor(templateBindings, warnings, errors) {
    this.templateBindings = templateBindings;
    this.warnings = warnings;
    this.errors = errors;
  }
};
var Parser = class {
  constructor(_lexer) {
    this._lexer = _lexer;
    this.errors = [];
  }
  parseAction(input, isAssignmentEvent, location, absoluteOffset, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    this._checkNoInterpolation(input, location, interpolationConfig);
    const sourceToLex = this._stripComments(input);
    const tokens = this._lexer.tokenize(sourceToLex);
    let flags = 1;
    if (isAssignmentEvent) {
      flags |= 2;
    }
    const ast = new _ParseAST(input, location, absoluteOffset, tokens, flags, this.errors, 0).parseChain();
    return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
  }
  parseBinding(input, location, absoluteOffset, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    const ast = this._parseBindingAst(input, location, absoluteOffset, interpolationConfig);
    return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
  }
  checkSimpleExpression(ast) {
    const checker = new SimpleExpressionChecker();
    ast.visit(checker);
    return checker.errors;
  }
  parseSimpleBinding(input, location, absoluteOffset, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    const ast = this._parseBindingAst(input, location, absoluteOffset, interpolationConfig);
    const errors = this.checkSimpleExpression(ast);
    if (errors.length > 0) {
      this._reportError(`Host binding expression cannot contain ${errors.join(" ")}`, input, location);
    }
    return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
  }
  _reportError(message, input, errLocation, ctxLocation) {
    this.errors.push(new ParserError(message, input, errLocation, ctxLocation));
  }
  _parseBindingAst(input, location, absoluteOffset, interpolationConfig) {
    this._checkNoInterpolation(input, location, interpolationConfig);
    const sourceToLex = this._stripComments(input);
    const tokens = this._lexer.tokenize(sourceToLex);
    return new _ParseAST(input, location, absoluteOffset, tokens, 0, this.errors, 0).parseChain();
  }
  parseTemplateBindings(templateKey, templateValue, templateUrl, absoluteKeyOffset, absoluteValueOffset) {
    const tokens = this._lexer.tokenize(templateValue);
    const parser = new _ParseAST(templateValue, templateUrl, absoluteValueOffset, tokens, 0, this.errors, 0);
    return parser.parseTemplateBindings({
      source: templateKey,
      span: new AbsoluteSourceSpan(absoluteKeyOffset, absoluteKeyOffset + templateKey.length)
    });
  }
  parseInterpolation(input, location, absoluteOffset, interpolatedTokens, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    const { strings, expressions, offsets } = this.splitInterpolation(input, location, interpolatedTokens, interpolationConfig);
    if (expressions.length === 0)
      return null;
    const expressionNodes = [];
    for (let i = 0; i < expressions.length; ++i) {
      const expressionText = expressions[i].text;
      const sourceToLex = this._stripComments(expressionText);
      const tokens = this._lexer.tokenize(sourceToLex);
      const ast = new _ParseAST(input, location, absoluteOffset, tokens, 0, this.errors, offsets[i]).parseChain();
      expressionNodes.push(ast);
    }
    return this.createInterpolationAst(strings.map((s) => s.text), expressionNodes, input, location, absoluteOffset);
  }
  parseInterpolationExpression(expression, location, absoluteOffset) {
    const sourceToLex = this._stripComments(expression);
    const tokens = this._lexer.tokenize(sourceToLex);
    const ast = new _ParseAST(expression, location, absoluteOffset, tokens, 0, this.errors, 0).parseChain();
    const strings = ["", ""];
    return this.createInterpolationAst(strings, [ast], expression, location, absoluteOffset);
  }
  createInterpolationAst(strings, expressions, input, location, absoluteOffset) {
    const span = new ParseSpan(0, input.length);
    const interpolation = new Interpolation(span, span.toAbsolute(absoluteOffset), strings, expressions);
    return new ASTWithSource(interpolation, input, location, absoluteOffset, this.errors);
  }
  splitInterpolation(input, location, interpolatedTokens, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    var _a2;
    const strings = [];
    const expressions = [];
    const offsets = [];
    const inputToTemplateIndexMap = interpolatedTokens ? getIndexMapForOriginalTemplate(interpolatedTokens) : null;
    let i = 0;
    let atInterpolation = false;
    let extendLastString = false;
    let { start: interpStart, end: interpEnd } = interpolationConfig;
    while (i < input.length) {
      if (!atInterpolation) {
        const start = i;
        i = input.indexOf(interpStart, i);
        if (i === -1) {
          i = input.length;
        }
        const text2 = input.substring(start, i);
        strings.push({ text: text2, start, end: i });
        atInterpolation = true;
      } else {
        const fullStart = i;
        const exprStart = fullStart + interpStart.length;
        const exprEnd = this._getInterpolationEndIndex(input, interpEnd, exprStart);
        if (exprEnd === -1) {
          atInterpolation = false;
          extendLastString = true;
          break;
        }
        const fullEnd = exprEnd + interpEnd.length;
        const text2 = input.substring(exprStart, exprEnd);
        if (text2.trim().length === 0) {
          this._reportError("Blank expressions are not allowed in interpolated strings", input, `at column ${i} in`, location);
        }
        expressions.push({ text: text2, start: fullStart, end: fullEnd });
        const startInOriginalTemplate = (_a2 = inputToTemplateIndexMap == null ? void 0 : inputToTemplateIndexMap.get(fullStart)) != null ? _a2 : fullStart;
        const offset = startInOriginalTemplate + interpStart.length;
        offsets.push(offset);
        i = fullEnd;
        atInterpolation = false;
      }
    }
    if (!atInterpolation) {
      if (extendLastString) {
        const piece = strings[strings.length - 1];
        piece.text += input.substring(i);
        piece.end = input.length;
      } else {
        strings.push({ text: input.substring(i), start: i, end: input.length });
      }
    }
    return new SplitInterpolation(strings, expressions, offsets);
  }
  wrapLiteralPrimitive(input, location, absoluteOffset) {
    const span = new ParseSpan(0, input == null ? 0 : input.length);
    return new ASTWithSource(new LiteralPrimitive(span, span.toAbsolute(absoluteOffset), input), input, location, absoluteOffset, this.errors);
  }
  _stripComments(input) {
    const i = this._commentStart(input);
    return i != null ? input.substring(0, i) : input;
  }
  _commentStart(input) {
    let outerQuote = null;
    for (let i = 0; i < input.length - 1; i++) {
      const char = input.charCodeAt(i);
      const nextChar = input.charCodeAt(i + 1);
      if (char === $SLASH && nextChar == $SLASH && outerQuote == null)
        return i;
      if (outerQuote === char) {
        outerQuote = null;
      } else if (outerQuote == null && isQuote(char)) {
        outerQuote = char;
      }
    }
    return null;
  }
  _checkNoInterpolation(input, location, { start, end }) {
    let startIndex = -1;
    let endIndex = -1;
    for (const charIndex of this._forEachUnquotedChar(input, 0)) {
      if (startIndex === -1) {
        if (input.startsWith(start)) {
          startIndex = charIndex;
        }
      } else {
        endIndex = this._getInterpolationEndIndex(input, end, charIndex);
        if (endIndex > -1) {
          break;
        }
      }
    }
    if (startIndex > -1 && endIndex > -1) {
      this._reportError(`Got interpolation (${start}${end}) where expression was expected`, input, `at column ${startIndex} in`, location);
    }
  }
  _getInterpolationEndIndex(input, expressionEnd, start) {
    for (const charIndex of this._forEachUnquotedChar(input, start)) {
      if (input.startsWith(expressionEnd, charIndex)) {
        return charIndex;
      }
      if (input.startsWith("//", charIndex)) {
        return input.indexOf(expressionEnd, charIndex);
      }
    }
    return -1;
  }
  *_forEachUnquotedChar(input, start) {
    let currentQuote = null;
    let escapeCount = 0;
    for (let i = start; i < input.length; i++) {
      const char = input[i];
      if (isQuote(input.charCodeAt(i)) && (currentQuote === null || currentQuote === char) && escapeCount % 2 === 0) {
        currentQuote = currentQuote === null ? char : null;
      } else if (currentQuote === null) {
        yield i;
      }
      escapeCount = char === "\\" ? escapeCount + 1 : 0;
    }
  }
};
var ParseContextFlags;
(function(ParseContextFlags2) {
  ParseContextFlags2[ParseContextFlags2["None"] = 0] = "None";
  ParseContextFlags2[ParseContextFlags2["Writable"] = 1] = "Writable";
})(ParseContextFlags || (ParseContextFlags = {}));
var _ParseAST = class {
  constructor(input, location, absoluteOffset, tokens, parseFlags, errors, offset) {
    this.input = input;
    this.location = location;
    this.absoluteOffset = absoluteOffset;
    this.tokens = tokens;
    this.parseFlags = parseFlags;
    this.errors = errors;
    this.offset = offset;
    this.rparensExpected = 0;
    this.rbracketsExpected = 0;
    this.rbracesExpected = 0;
    this.context = ParseContextFlags.None;
    this.sourceSpanCache = /* @__PURE__ */ new Map();
    this.index = 0;
  }
  peek(offset) {
    const i = this.index + offset;
    return i < this.tokens.length ? this.tokens[i] : EOF;
  }
  get next() {
    return this.peek(0);
  }
  get atEOF() {
    return this.index >= this.tokens.length;
  }
  get inputIndex() {
    return this.atEOF ? this.currentEndIndex : this.next.index + this.offset;
  }
  get currentEndIndex() {
    if (this.index > 0) {
      const curToken = this.peek(-1);
      return curToken.end + this.offset;
    }
    if (this.tokens.length === 0) {
      return this.input.length + this.offset;
    }
    return this.next.index + this.offset;
  }
  get currentAbsoluteOffset() {
    return this.absoluteOffset + this.inputIndex;
  }
  span(start, artificialEndIndex) {
    let endIndex = this.currentEndIndex;
    if (artificialEndIndex !== void 0 && artificialEndIndex > this.currentEndIndex) {
      endIndex = artificialEndIndex;
    }
    if (start > endIndex) {
      const tmp = endIndex;
      endIndex = start;
      start = tmp;
    }
    return new ParseSpan(start, endIndex);
  }
  sourceSpan(start, artificialEndIndex) {
    const serial = `${start}@${this.inputIndex}:${artificialEndIndex}`;
    if (!this.sourceSpanCache.has(serial)) {
      this.sourceSpanCache.set(serial, this.span(start, artificialEndIndex).toAbsolute(this.absoluteOffset));
    }
    return this.sourceSpanCache.get(serial);
  }
  advance() {
    this.index++;
  }
  withContext(context, cb) {
    this.context |= context;
    const ret = cb();
    this.context ^= context;
    return ret;
  }
  consumeOptionalCharacter(code) {
    if (this.next.isCharacter(code)) {
      this.advance();
      return true;
    } else {
      return false;
    }
  }
  peekKeywordLet() {
    return this.next.isKeywordLet();
  }
  peekKeywordAs() {
    return this.next.isKeywordAs();
  }
  expectCharacter(code) {
    if (this.consumeOptionalCharacter(code))
      return;
    this.error(`Missing expected ${String.fromCharCode(code)}`);
  }
  consumeOptionalOperator(op) {
    if (this.next.isOperator(op)) {
      this.advance();
      return true;
    } else {
      return false;
    }
  }
  expectOperator(operator) {
    if (this.consumeOptionalOperator(operator))
      return;
    this.error(`Missing expected operator ${operator}`);
  }
  prettyPrintToken(tok) {
    return tok === EOF ? "end of input" : `token ${tok}`;
  }
  expectIdentifierOrKeyword() {
    const n = this.next;
    if (!n.isIdentifier() && !n.isKeyword()) {
      if (n.isPrivateIdentifier()) {
        this._reportErrorForPrivateIdentifier(n, "expected identifier or keyword");
      } else {
        this.error(`Unexpected ${this.prettyPrintToken(n)}, expected identifier or keyword`);
      }
      return null;
    }
    this.advance();
    return n.toString();
  }
  expectIdentifierOrKeywordOrString() {
    const n = this.next;
    if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
      if (n.isPrivateIdentifier()) {
        this._reportErrorForPrivateIdentifier(n, "expected identifier, keyword or string");
      } else {
        this.error(`Unexpected ${this.prettyPrintToken(n)}, expected identifier, keyword, or string`);
      }
      return "";
    }
    this.advance();
    return n.toString();
  }
  parseChain() {
    const exprs = [];
    const start = this.inputIndex;
    while (this.index < this.tokens.length) {
      const expr = this.parsePipe();
      exprs.push(expr);
      if (this.consumeOptionalCharacter($SEMICOLON)) {
        if (!(this.parseFlags & 1)) {
          this.error("Binding expression cannot contain chained expression");
        }
        while (this.consumeOptionalCharacter($SEMICOLON)) {
        }
      } else if (this.index < this.tokens.length) {
        const errorIndex = this.index;
        this.error(`Unexpected token '${this.next}'`);
        if (this.index === errorIndex) {
          break;
        }
      }
    }
    if (exprs.length === 0) {
      const artificialStart = this.offset;
      const artificialEnd = this.offset + this.input.length;
      return new EmptyExpr(this.span(artificialStart, artificialEnd), this.sourceSpan(artificialStart, artificialEnd));
    }
    if (exprs.length == 1)
      return exprs[0];
    return new Chain(this.span(start), this.sourceSpan(start), exprs);
  }
  parsePipe() {
    const start = this.inputIndex;
    let result = this.parseExpression();
    if (this.consumeOptionalOperator("|")) {
      if (this.parseFlags & 1) {
        this.error("Cannot have a pipe in an action expression");
      }
      do {
        const nameStart = this.inputIndex;
        let nameId = this.expectIdentifierOrKeyword();
        let nameSpan;
        let fullSpanEnd = void 0;
        if (nameId !== null) {
          nameSpan = this.sourceSpan(nameStart);
        } else {
          nameId = "";
          fullSpanEnd = this.next.index !== -1 ? this.next.index : this.input.length + this.offset;
          nameSpan = new ParseSpan(fullSpanEnd, fullSpanEnd).toAbsolute(this.absoluteOffset);
        }
        const args = [];
        while (this.consumeOptionalCharacter($COLON)) {
          args.push(this.parseExpression());
        }
        result = new BindingPipe(this.span(start), this.sourceSpan(start, fullSpanEnd), result, nameId, args, nameSpan);
      } while (this.consumeOptionalOperator("|"));
    }
    return result;
  }
  parseExpression() {
    return this.parseConditional();
  }
  parseConditional() {
    const start = this.inputIndex;
    const result = this.parseLogicalOr();
    if (this.consumeOptionalOperator("?")) {
      const yes = this.parsePipe();
      let no;
      if (!this.consumeOptionalCharacter($COLON)) {
        const end = this.inputIndex;
        const expression = this.input.substring(start, end);
        this.error(`Conditional expression ${expression} requires all 3 expressions`);
        no = new EmptyExpr(this.span(start), this.sourceSpan(start));
      } else {
        no = this.parsePipe();
      }
      return new Conditional(this.span(start), this.sourceSpan(start), result, yes, no);
    } else {
      return result;
    }
  }
  parseLogicalOr() {
    const start = this.inputIndex;
    let result = this.parseLogicalAnd();
    while (this.consumeOptionalOperator("||")) {
      const right = this.parseLogicalAnd();
      result = new Binary(this.span(start), this.sourceSpan(start), "||", result, right);
    }
    return result;
  }
  parseLogicalAnd() {
    const start = this.inputIndex;
    let result = this.parseNullishCoalescing();
    while (this.consumeOptionalOperator("&&")) {
      const right = this.parseNullishCoalescing();
      result = new Binary(this.span(start), this.sourceSpan(start), "&&", result, right);
    }
    return result;
  }
  parseNullishCoalescing() {
    const start = this.inputIndex;
    let result = this.parseEquality();
    while (this.consumeOptionalOperator("??")) {
      const right = this.parseEquality();
      result = new Binary(this.span(start), this.sourceSpan(start), "??", result, right);
    }
    return result;
  }
  parseEquality() {
    const start = this.inputIndex;
    let result = this.parseRelational();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "==":
        case "===":
        case "!=":
        case "!==":
          this.advance();
          const right = this.parseRelational();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parseRelational() {
    const start = this.inputIndex;
    let result = this.parseAdditive();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "<":
        case ">":
        case "<=":
        case ">=":
          this.advance();
          const right = this.parseAdditive();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parseAdditive() {
    const start = this.inputIndex;
    let result = this.parseMultiplicative();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "+":
        case "-":
          this.advance();
          let right = this.parseMultiplicative();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parseMultiplicative() {
    const start = this.inputIndex;
    let result = this.parsePrefix();
    while (this.next.type == TokenType.Operator) {
      const operator = this.next.strValue;
      switch (operator) {
        case "*":
        case "%":
        case "/":
          this.advance();
          let right = this.parsePrefix();
          result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
          continue;
      }
      break;
    }
    return result;
  }
  parsePrefix() {
    if (this.next.type == TokenType.Operator) {
      const start = this.inputIndex;
      const operator = this.next.strValue;
      let result;
      switch (operator) {
        case "+":
          this.advance();
          result = this.parsePrefix();
          return Unary.createPlus(this.span(start), this.sourceSpan(start), result);
        case "-":
          this.advance();
          result = this.parsePrefix();
          return Unary.createMinus(this.span(start), this.sourceSpan(start), result);
        case "!":
          this.advance();
          result = this.parsePrefix();
          return new PrefixNot(this.span(start), this.sourceSpan(start), result);
      }
    }
    return this.parseCallChain();
  }
  parseCallChain() {
    const start = this.inputIndex;
    let result = this.parsePrimary();
    while (true) {
      if (this.consumeOptionalCharacter($PERIOD)) {
        result = this.parseAccessMember(result, start, false);
      } else if (this.consumeOptionalOperator("?.")) {
        if (this.consumeOptionalCharacter($LPAREN)) {
          result = this.parseCall(result, start, true);
        } else {
          result = this.consumeOptionalCharacter($LBRACKET) ? this.parseKeyedReadOrWrite(result, start, true) : this.parseAccessMember(result, start, true);
        }
      } else if (this.consumeOptionalCharacter($LBRACKET)) {
        result = this.parseKeyedReadOrWrite(result, start, false);
      } else if (this.consumeOptionalCharacter($LPAREN)) {
        result = this.parseCall(result, start, false);
      } else if (this.consumeOptionalOperator("!")) {
        result = new NonNullAssert(this.span(start), this.sourceSpan(start), result);
      } else {
        return result;
      }
    }
  }
  parsePrimary() {
    const start = this.inputIndex;
    if (this.consumeOptionalCharacter($LPAREN)) {
      this.rparensExpected++;
      const result = this.parsePipe();
      this.rparensExpected--;
      this.expectCharacter($RPAREN);
      return result;
    } else if (this.next.isKeywordNull()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), null);
    } else if (this.next.isKeywordUndefined()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), void 0);
    } else if (this.next.isKeywordTrue()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), true);
    } else if (this.next.isKeywordFalse()) {
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), false);
    } else if (this.next.isKeywordThis()) {
      this.advance();
      return new ThisReceiver(this.span(start), this.sourceSpan(start));
    } else if (this.consumeOptionalCharacter($LBRACKET)) {
      this.rbracketsExpected++;
      const elements = this.parseExpressionList($RBRACKET);
      this.rbracketsExpected--;
      this.expectCharacter($RBRACKET);
      return new LiteralArray(this.span(start), this.sourceSpan(start), elements);
    } else if (this.next.isCharacter($LBRACE)) {
      return this.parseLiteralMap();
    } else if (this.next.isIdentifier()) {
      return this.parseAccessMember(new ImplicitReceiver(this.span(start), this.sourceSpan(start)), start, false);
    } else if (this.next.isNumber()) {
      const value = this.next.toNumber();
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), value);
    } else if (this.next.isString()) {
      const literalValue = this.next.toString();
      this.advance();
      return new LiteralPrimitive(this.span(start), this.sourceSpan(start), literalValue);
    } else if (this.next.isPrivateIdentifier()) {
      this._reportErrorForPrivateIdentifier(this.next, null);
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    } else if (this.index >= this.tokens.length) {
      this.error(`Unexpected end of expression: ${this.input}`);
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    } else {
      this.error(`Unexpected token ${this.next}`);
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    }
  }
  parseExpressionList(terminator) {
    const result = [];
    do {
      if (!this.next.isCharacter(terminator)) {
        result.push(this.parsePipe());
      } else {
        break;
      }
    } while (this.consumeOptionalCharacter($COMMA));
    return result;
  }
  parseLiteralMap() {
    const keys = [];
    const values = [];
    const start = this.inputIndex;
    this.expectCharacter($LBRACE);
    if (!this.consumeOptionalCharacter($RBRACE)) {
      this.rbracesExpected++;
      do {
        const keyStart = this.inputIndex;
        const quoted = this.next.isString();
        const key = this.expectIdentifierOrKeywordOrString();
        keys.push({ key, quoted });
        if (quoted) {
          this.expectCharacter($COLON);
          values.push(this.parsePipe());
        } else if (this.consumeOptionalCharacter($COLON)) {
          values.push(this.parsePipe());
        } else {
          const span = this.span(keyStart);
          const sourceSpan = this.sourceSpan(keyStart);
          values.push(new PropertyRead(span, sourceSpan, sourceSpan, new ImplicitReceiver(span, sourceSpan), key));
        }
      } while (this.consumeOptionalCharacter($COMMA) && !this.next.isCharacter($RBRACE));
      this.rbracesExpected--;
      this.expectCharacter($RBRACE);
    }
    return new LiteralMap(this.span(start), this.sourceSpan(start), keys, values);
  }
  parseAccessMember(readReceiver, start, isSafe) {
    const nameStart = this.inputIndex;
    const id = this.withContext(ParseContextFlags.Writable, () => {
      var _a2;
      const id2 = (_a2 = this.expectIdentifierOrKeyword()) != null ? _a2 : "";
      if (id2.length === 0) {
        this.error(`Expected identifier for property access`, readReceiver.span.end);
      }
      return id2;
    });
    const nameSpan = this.sourceSpan(nameStart);
    let receiver;
    if (isSafe) {
      if (this.consumeOptionalAssignment()) {
        this.error("The '?.' operator cannot be used in the assignment");
        receiver = new EmptyExpr(this.span(start), this.sourceSpan(start));
      } else {
        receiver = new SafePropertyRead(this.span(start), this.sourceSpan(start), nameSpan, readReceiver, id);
      }
    } else {
      if (this.consumeOptionalAssignment()) {
        if (!(this.parseFlags & 1)) {
          this.error("Bindings cannot contain assignments");
          return new EmptyExpr(this.span(start), this.sourceSpan(start));
        }
        const value = this.parseConditional();
        receiver = new PropertyWrite(this.span(start), this.sourceSpan(start), nameSpan, readReceiver, id, value);
      } else {
        receiver = new PropertyRead(this.span(start), this.sourceSpan(start), nameSpan, readReceiver, id);
      }
    }
    return receiver;
  }
  parseCall(receiver, start, isSafe) {
    const argumentStart = this.inputIndex;
    this.rparensExpected++;
    const args = this.parseCallArguments();
    const argumentSpan = this.span(argumentStart, this.inputIndex).toAbsolute(this.absoluteOffset);
    this.expectCharacter($RPAREN);
    this.rparensExpected--;
    const span = this.span(start);
    const sourceSpan = this.sourceSpan(start);
    return isSafe ? new SafeCall(span, sourceSpan, receiver, args, argumentSpan) : new Call(span, sourceSpan, receiver, args, argumentSpan);
  }
  consumeOptionalAssignment() {
    if (this.parseFlags & 2 && this.next.isOperator("!") && this.peek(1).isOperator("=")) {
      this.advance();
      this.advance();
      return true;
    }
    return this.consumeOptionalOperator("=");
  }
  parseCallArguments() {
    if (this.next.isCharacter($RPAREN))
      return [];
    const positionals = [];
    do {
      positionals.push(this.parsePipe());
    } while (this.consumeOptionalCharacter($COMMA));
    return positionals;
  }
  expectTemplateBindingKey() {
    let result = "";
    let operatorFound = false;
    const start = this.currentAbsoluteOffset;
    do {
      result += this.expectIdentifierOrKeywordOrString();
      operatorFound = this.consumeOptionalOperator("-");
      if (operatorFound) {
        result += "-";
      }
    } while (operatorFound);
    return {
      source: result,
      span: new AbsoluteSourceSpan(start, start + result.length)
    };
  }
  parseTemplateBindings(templateKey) {
    const bindings = [];
    bindings.push(...this.parseDirectiveKeywordBindings(templateKey));
    while (this.index < this.tokens.length) {
      const letBinding = this.parseLetBinding();
      if (letBinding) {
        bindings.push(letBinding);
      } else {
        const key = this.expectTemplateBindingKey();
        const binding = this.parseAsBinding(key);
        if (binding) {
          bindings.push(binding);
        } else {
          key.source = templateKey.source + key.source.charAt(0).toUpperCase() + key.source.substring(1);
          bindings.push(...this.parseDirectiveKeywordBindings(key));
        }
      }
      this.consumeStatementTerminator();
    }
    return new TemplateBindingParseResult(bindings, [], this.errors);
  }
  parseKeyedReadOrWrite(receiver, start, isSafe) {
    return this.withContext(ParseContextFlags.Writable, () => {
      this.rbracketsExpected++;
      const key = this.parsePipe();
      if (key instanceof EmptyExpr) {
        this.error(`Key access cannot be empty`);
      }
      this.rbracketsExpected--;
      this.expectCharacter($RBRACKET);
      if (this.consumeOptionalOperator("=")) {
        if (isSafe) {
          this.error("The '?.' operator cannot be used in the assignment");
        } else {
          const value = this.parseConditional();
          return new KeyedWrite(this.span(start), this.sourceSpan(start), receiver, key, value);
        }
      } else {
        return isSafe ? new SafeKeyedRead(this.span(start), this.sourceSpan(start), receiver, key) : new KeyedRead(this.span(start), this.sourceSpan(start), receiver, key);
      }
      return new EmptyExpr(this.span(start), this.sourceSpan(start));
    });
  }
  parseDirectiveKeywordBindings(key) {
    const bindings = [];
    this.consumeOptionalCharacter($COLON);
    const value = this.getDirectiveBoundTarget();
    let spanEnd = this.currentAbsoluteOffset;
    const asBinding = this.parseAsBinding(key);
    if (!asBinding) {
      this.consumeStatementTerminator();
      spanEnd = this.currentAbsoluteOffset;
    }
    const sourceSpan = new AbsoluteSourceSpan(key.span.start, spanEnd);
    bindings.push(new ExpressionBinding(sourceSpan, key, value));
    if (asBinding) {
      bindings.push(asBinding);
    }
    return bindings;
  }
  getDirectiveBoundTarget() {
    if (this.next === EOF || this.peekKeywordAs() || this.peekKeywordLet()) {
      return null;
    }
    const ast = this.parsePipe();
    const { start, end } = ast.span;
    const value = this.input.substring(start, end);
    return new ASTWithSource(ast, value, this.location, this.absoluteOffset + start, this.errors);
  }
  parseAsBinding(value) {
    if (!this.peekKeywordAs()) {
      return null;
    }
    this.advance();
    const key = this.expectTemplateBindingKey();
    this.consumeStatementTerminator();
    const sourceSpan = new AbsoluteSourceSpan(value.span.start, this.currentAbsoluteOffset);
    return new VariableBinding(sourceSpan, key, value);
  }
  parseLetBinding() {
    if (!this.peekKeywordLet()) {
      return null;
    }
    const spanStart = this.currentAbsoluteOffset;
    this.advance();
    const key = this.expectTemplateBindingKey();
    let value = null;
    if (this.consumeOptionalOperator("=")) {
      value = this.expectTemplateBindingKey();
    }
    this.consumeStatementTerminator();
    const sourceSpan = new AbsoluteSourceSpan(spanStart, this.currentAbsoluteOffset);
    return new VariableBinding(sourceSpan, key, value);
  }
  consumeStatementTerminator() {
    this.consumeOptionalCharacter($SEMICOLON) || this.consumeOptionalCharacter($COMMA);
  }
  error(message, index = null) {
    this.errors.push(new ParserError(message, this.input, this.locationText(index), this.location));
    this.skip();
  }
  locationText(index = null) {
    if (index == null)
      index = this.index;
    return index < this.tokens.length ? `at column ${this.tokens[index].index + 1} in` : `at the end of the expression`;
  }
  _reportErrorForPrivateIdentifier(token, extraMessage) {
    let errorMessage = `Private identifiers are not supported. Unexpected private identifier: ${token}`;
    if (extraMessage !== null) {
      errorMessage += `, ${extraMessage}`;
    }
    this.error(errorMessage);
  }
  skip() {
    let n = this.next;
    while (this.index < this.tokens.length && !n.isCharacter($SEMICOLON) && !n.isOperator("|") && (this.rparensExpected <= 0 || !n.isCharacter($RPAREN)) && (this.rbracesExpected <= 0 || !n.isCharacter($RBRACE)) && (this.rbracketsExpected <= 0 || !n.isCharacter($RBRACKET)) && (!(this.context & ParseContextFlags.Writable) || !n.isOperator("="))) {
      if (this.next.isError()) {
        this.errors.push(new ParserError(this.next.toString(), this.input, this.locationText(), this.location));
      }
      this.advance();
      n = this.next;
    }
  }
};
var SimpleExpressionChecker = class extends RecursiveAstVisitor {
  constructor() {
    super(...arguments);
    this.errors = [];
  }
  visitPipe() {
    this.errors.push("pipes");
  }
};
function getIndexMapForOriginalTemplate(interpolatedTokens) {
  let offsetMap = /* @__PURE__ */ new Map();
  let consumedInOriginalTemplate = 0;
  let consumedInInput = 0;
  let tokenIndex = 0;
  while (tokenIndex < interpolatedTokens.length) {
    const currentToken = interpolatedTokens[tokenIndex];
    if (currentToken.type === 9) {
      const [decoded, encoded] = currentToken.parts;
      consumedInOriginalTemplate += encoded.length;
      consumedInInput += decoded.length;
    } else {
      const lengthOfParts = currentToken.parts.reduce((sum, current) => sum + current.length, 0);
      consumedInInput += lengthOfParts;
      consumedInOriginalTemplate += lengthOfParts;
    }
    offsetMap.set(consumedInInput, consumedInOriginalTemplate);
    tokenIndex++;
  }
  return offsetMap;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/ast.mjs
var NodeWithI18n = class {
  constructor(sourceSpan, i18n2) {
    this.sourceSpan = sourceSpan;
    this.i18n = i18n2;
  }
};
var Text4 = class extends NodeWithI18n {
  constructor(value, sourceSpan, tokens, i18n2) {
    super(sourceSpan, i18n2);
    this.value = value;
    this.tokens = tokens;
  }
  visit(visitor, context) {
    return visitor.visitText(this, context);
  }
};
var Expansion = class extends NodeWithI18n {
  constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan, i18n2) {
    super(sourceSpan, i18n2);
    this.switchValue = switchValue;
    this.type = type;
    this.cases = cases;
    this.switchValueSourceSpan = switchValueSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitExpansion(this, context);
  }
};
var ExpansionCase = class {
  constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
    this.value = value;
    this.expression = expression;
    this.sourceSpan = sourceSpan;
    this.valueSourceSpan = valueSourceSpan;
    this.expSourceSpan = expSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitExpansionCase(this, context);
  }
};
var Attribute = class extends NodeWithI18n {
  constructor(name, value, sourceSpan, keySpan, valueSpan, valueTokens, i18n2) {
    super(sourceSpan, i18n2);
    this.name = name;
    this.value = value;
    this.keySpan = keySpan;
    this.valueSpan = valueSpan;
    this.valueTokens = valueTokens;
  }
  visit(visitor, context) {
    return visitor.visitAttribute(this, context);
  }
};
var Element2 = class extends NodeWithI18n {
  constructor(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan = null, i18n2) {
    super(sourceSpan, i18n2);
    this.name = name;
    this.attrs = attrs;
    this.children = children;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitElement(this, context);
  }
};
var Comment2 = class {
  constructor(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitComment(this, context);
  }
};
var Block = class extends NodeWithI18n {
  constructor(name, parameters, children, sourceSpan, nameSpan, startSourceSpan, endSourceSpan = null, i18n2) {
    super(sourceSpan, i18n2);
    this.name = name;
    this.parameters = parameters;
    this.children = children;
    this.nameSpan = nameSpan;
    this.startSourceSpan = startSourceSpan;
    this.endSourceSpan = endSourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitBlock(this, context);
  }
};
var BlockParameter = class {
  constructor(expression, sourceSpan) {
    this.expression = expression;
    this.sourceSpan = sourceSpan;
  }
  visit(visitor, context) {
    return visitor.visitBlockParameter(this, context);
  }
};
function visitAll2(visitor, nodes, context = null) {
  const result = [];
  const visit = visitor.visit ? (ast) => visitor.visit(ast, context) || ast.visit(visitor, context) : (ast) => ast.visit(visitor, context);
  nodes.forEach((ast) => {
    const astResult = visit(ast);
    if (astResult) {
      result.push(astResult);
    }
  });
  return result;
}
var RecursiveVisitor = class {
  constructor() {
  }
  visitElement(ast, context) {
    this.visitChildren(context, (visit) => {
      visit(ast.attrs);
      visit(ast.children);
    });
  }
  visitAttribute(ast, context) {
  }
  visitText(ast, context) {
  }
  visitComment(ast, context) {
  }
  visitExpansion(ast, context) {
    return this.visitChildren(context, (visit) => {
      visit(ast.cases);
    });
  }
  visitExpansionCase(ast, context) {
  }
  visitBlock(block, context) {
    this.visitChildren(context, (visit) => {
      visit(block.parameters);
      visit(block.children);
    });
  }
  visitBlockParameter(ast, context) {
  }
  visitChildren(context, cb) {
    let results = [];
    let t = this;
    function visit(children) {
      if (children)
        results.push(visitAll2(t, children, context));
    }
    cb(visit);
    return Array.prototype.concat.apply([], results);
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/schema/element_schema_registry.mjs
var ElementSchemaRegistry = class {
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/schema/dom_element_schema_registry.mjs
var BOOLEAN = "boolean";
var NUMBER = "number";
var STRING = "string";
var OBJECT = "object";
var SCHEMA = [
  "[Element]|textContent,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColSpan,%ariaCurrent,%ariaDescription,%ariaDisabled,%ariaExpanded,%ariaHasPopup,%ariaHidden,%ariaKeyShortcuts,%ariaLabel,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored",
  "[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
  "abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
  "media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume",
  ":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex",
  ":svg:graphics^:svg:|",
  ":svg:animation^:svg:|*begin,*end,*repeat",
  ":svg:geometry^:svg:|",
  ":svg:componentTransferFunction^:svg:|",
  ":svg:gradient^:svg:|",
  ":svg:textContent^:svg:graphics|",
  ":svg:textPositioning^:svg:textContent|",
  "a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username",
  "area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username",
  "audio^media|",
  "br^[HTMLElement]|clear",
  "base^[HTMLElement]|href,target",
  "body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink",
  "button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value",
  "canvas^[HTMLElement]|#height,#width",
  "content^[HTMLElement]|select",
  "dl^[HTMLElement]|!compact",
  "data^[HTMLElement]|value",
  "datalist^[HTMLElement]|",
  "details^[HTMLElement]|!open",
  "dialog^[HTMLElement]|!open,returnValue",
  "dir^[HTMLElement]|!compact",
  "div^[HTMLElement]|align",
  "embed^[HTMLElement]|align,height,name,src,type,width",
  "fieldset^[HTMLElement]|!disabled,name",
  "font^[HTMLElement]|color,face,size",
  "form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target",
  "frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src",
  "frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows",
  "hr^[HTMLElement]|align,color,!noShade,size,width",
  "head^[HTMLElement]|",
  "h1,h2,h3,h4,h5,h6^[HTMLElement]|align",
  "html^[HTMLElement]|version",
  "iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width",
  "img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width",
  "input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width",
  "li^[HTMLElement]|type,#value",
  "label^[HTMLElement]|htmlFor",
  "legend^[HTMLElement]|align",
  "link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type",
  "map^[HTMLElement]|name",
  "marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width",
  "menu^[HTMLElement]|!compact",
  "meta^[HTMLElement]|content,httpEquiv,media,name,scheme",
  "meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value",
  "ins,del^[HTMLElement]|cite,dateTime",
  "ol^[HTMLElement]|!compact,!reversed,#start,type",
  "object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width",
  "optgroup^[HTMLElement]|!disabled,label",
  "option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value",
  "output^[HTMLElement]|defaultValue,%htmlFor,name,value",
  "p^[HTMLElement]|align",
  "param^[HTMLElement]|name,type,value,valueType",
  "picture^[HTMLElement]|",
  "pre^[HTMLElement]|#width",
  "progress^[HTMLElement]|#max,#value",
  "q,blockquote,cite^[HTMLElement]|",
  "script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type",
  "select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value",
  "slot^[HTMLElement]|name",
  "source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width",
  "span^[HTMLElement]|",
  "style^[HTMLElement]|!disabled,media,type",
  "caption^[HTMLElement]|align",
  "th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width",
  "col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width",
  "table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width",
  "tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign",
  "tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign",
  "template^[HTMLElement]|",
  "textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap",
  "time^[HTMLElement]|dateTime",
  "title^[HTMLElement]|text",
  "track^[HTMLElement]|!default,kind,label,src,srclang",
  "ul^[HTMLElement]|!compact,type",
  "unknown^[HTMLElement]|",
  "video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width",
  ":svg:a^:svg:graphics|",
  ":svg:animate^:svg:animation|",
  ":svg:animateMotion^:svg:animation|",
  ":svg:animateTransform^:svg:animation|",
  ":svg:circle^:svg:geometry|",
  ":svg:clipPath^:svg:graphics|",
  ":svg:defs^:svg:graphics|",
  ":svg:desc^:svg:|",
  ":svg:discard^:svg:|",
  ":svg:ellipse^:svg:geometry|",
  ":svg:feBlend^:svg:|",
  ":svg:feColorMatrix^:svg:|",
  ":svg:feComponentTransfer^:svg:|",
  ":svg:feComposite^:svg:|",
  ":svg:feConvolveMatrix^:svg:|",
  ":svg:feDiffuseLighting^:svg:|",
  ":svg:feDisplacementMap^:svg:|",
  ":svg:feDistantLight^:svg:|",
  ":svg:feDropShadow^:svg:|",
  ":svg:feFlood^:svg:|",
  ":svg:feFuncA^:svg:componentTransferFunction|",
  ":svg:feFuncB^:svg:componentTransferFunction|",
  ":svg:feFuncG^:svg:componentTransferFunction|",
  ":svg:feFuncR^:svg:componentTransferFunction|",
  ":svg:feGaussianBlur^:svg:|",
  ":svg:feImage^:svg:|",
  ":svg:feMerge^:svg:|",
  ":svg:feMergeNode^:svg:|",
  ":svg:feMorphology^:svg:|",
  ":svg:feOffset^:svg:|",
  ":svg:fePointLight^:svg:|",
  ":svg:feSpecularLighting^:svg:|",
  ":svg:feSpotLight^:svg:|",
  ":svg:feTile^:svg:|",
  ":svg:feTurbulence^:svg:|",
  ":svg:filter^:svg:|",
  ":svg:foreignObject^:svg:graphics|",
  ":svg:g^:svg:graphics|",
  ":svg:image^:svg:graphics|decoding",
  ":svg:line^:svg:geometry|",
  ":svg:linearGradient^:svg:gradient|",
  ":svg:mpath^:svg:|",
  ":svg:marker^:svg:|",
  ":svg:mask^:svg:|",
  ":svg:metadata^:svg:|",
  ":svg:path^:svg:geometry|",
  ":svg:pattern^:svg:|",
  ":svg:polygon^:svg:geometry|",
  ":svg:polyline^:svg:geometry|",
  ":svg:radialGradient^:svg:gradient|",
  ":svg:rect^:svg:geometry|",
  ":svg:svg^:svg:graphics|#currentScale,#zoomAndPan",
  ":svg:script^:svg:|type",
  ":svg:set^:svg:animation|",
  ":svg:stop^:svg:|",
  ":svg:style^:svg:|!disabled,media,title,type",
  ":svg:switch^:svg:graphics|",
  ":svg:symbol^:svg:|",
  ":svg:tspan^:svg:textPositioning|",
  ":svg:text^:svg:textPositioning|",
  ":svg:textPath^:svg:textContent|",
  ":svg:title^:svg:|",
  ":svg:use^:svg:graphics|",
  ":svg:view^:svg:|#zoomAndPan",
  "data^[HTMLElement]|value",
  "keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name",
  "menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default",
  "summary^[HTMLElement]|",
  "time^[HTMLElement]|dateTime",
  ":svg:cursor^:svg:|"
];
var _ATTR_TO_PROP = new Map(Object.entries({
  "class": "className",
  "for": "htmlFor",
  "formaction": "formAction",
  "innerHtml": "innerHTML",
  "readonly": "readOnly",
  "tabindex": "tabIndex"
}));
var _PROP_TO_ATTR = Array.from(_ATTR_TO_PROP).reduce((inverted, [propertyName, attributeName]) => {
  inverted.set(propertyName, attributeName);
  return inverted;
}, /* @__PURE__ */ new Map());
var DomElementSchemaRegistry = class extends ElementSchemaRegistry {
  constructor() {
    super();
    this._schema = /* @__PURE__ */ new Map();
    this._eventSchema = /* @__PURE__ */ new Map();
    SCHEMA.forEach((encodedType) => {
      const type = /* @__PURE__ */ new Map();
      const events = /* @__PURE__ */ new Set();
      const [strType, strProperties] = encodedType.split("|");
      const properties = strProperties.split(",");
      const [typeNames, superName] = strType.split("^");
      typeNames.split(",").forEach((tag) => {
        this._schema.set(tag.toLowerCase(), type);
        this._eventSchema.set(tag.toLowerCase(), events);
      });
      const superType = superName && this._schema.get(superName.toLowerCase());
      if (superType) {
        for (const [prop, value] of superType) {
          type.set(prop, value);
        }
        for (const superEvent of this._eventSchema.get(superName.toLowerCase())) {
          events.add(superEvent);
        }
      }
      properties.forEach((property2) => {
        if (property2.length > 0) {
          switch (property2[0]) {
            case "*":
              events.add(property2.substring(1));
              break;
            case "!":
              type.set(property2.substring(1), BOOLEAN);
              break;
            case "#":
              type.set(property2.substring(1), NUMBER);
              break;
            case "%":
              type.set(property2.substring(1), OBJECT);
              break;
            default:
              type.set(property2, STRING);
          }
        }
      });
    });
  }
  hasProperty(tagName, propName, schemaMetas) {
    if (schemaMetas.some((schema) => schema.name === NO_ERRORS_SCHEMA.name)) {
      return true;
    }
    if (tagName.indexOf("-") > -1) {
      if (isNgContainer(tagName) || isNgContent(tagName)) {
        return false;
      }
      if (schemaMetas.some((schema) => schema.name === CUSTOM_ELEMENTS_SCHEMA.name)) {
        return true;
      }
    }
    const elementProperties = this._schema.get(tagName.toLowerCase()) || this._schema.get("unknown");
    return elementProperties.has(propName);
  }
  hasElement(tagName, schemaMetas) {
    if (schemaMetas.some((schema) => schema.name === NO_ERRORS_SCHEMA.name)) {
      return true;
    }
    if (tagName.indexOf("-") > -1) {
      if (isNgContainer(tagName) || isNgContent(tagName)) {
        return true;
      }
      if (schemaMetas.some((schema) => schema.name === CUSTOM_ELEMENTS_SCHEMA.name)) {
        return true;
      }
    }
    return this._schema.has(tagName.toLowerCase());
  }
  securityContext(tagName, propName, isAttribute) {
    if (isAttribute) {
      propName = this.getMappedPropName(propName);
    }
    tagName = tagName.toLowerCase();
    propName = propName.toLowerCase();
    let ctx = SECURITY_SCHEMA()[tagName + "|" + propName];
    if (ctx) {
      return ctx;
    }
    ctx = SECURITY_SCHEMA()["*|" + propName];
    return ctx ? ctx : SecurityContext.NONE;
  }
  getMappedPropName(propName) {
    var _a2;
    return (_a2 = _ATTR_TO_PROP.get(propName)) != null ? _a2 : propName;
  }
  getDefaultComponentElementName() {
    return "ng-component";
  }
  validateProperty(name) {
    if (name.toLowerCase().startsWith("on")) {
      const msg = `Binding to event property '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...
If '${name}' is a directive input, make sure the directive is imported by the current module.`;
      return { error: true, msg };
    } else {
      return { error: false };
    }
  }
  validateAttribute(name) {
    if (name.toLowerCase().startsWith("on")) {
      const msg = `Binding to event attribute '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...`;
      return { error: true, msg };
    } else {
      return { error: false };
    }
  }
  allKnownElementNames() {
    return Array.from(this._schema.keys());
  }
  allKnownAttributesOfElement(tagName) {
    const elementProperties = this._schema.get(tagName.toLowerCase()) || this._schema.get("unknown");
    return Array.from(elementProperties.keys()).map((prop) => {
      var _a2;
      return (_a2 = _PROP_TO_ATTR.get(prop)) != null ? _a2 : prop;
    });
  }
  allKnownEventsOfElement(tagName) {
    var _a2;
    return Array.from((_a2 = this._eventSchema.get(tagName.toLowerCase())) != null ? _a2 : []);
  }
  normalizeAnimationStyleProperty(propName) {
    return dashCaseToCamelCase(propName);
  }
  normalizeAnimationStyleValue(camelCaseProp, userProvidedProp, val) {
    let unit = "";
    const strVal = val.toString().trim();
    let errorMsg = null;
    if (_isPixelDimensionStyle(camelCaseProp) && val !== 0 && val !== "0") {
      if (typeof val === "number") {
        unit = "px";
      } else {
        const valAndSuffixMatch = val.match(/^[+-]?[\d\.]+([a-z]*)$/);
        if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
          errorMsg = `Please provide a CSS unit value for ${userProvidedProp}:${val}`;
        }
      }
    }
    return { error: errorMsg, value: strVal + unit };
  }
};
function _isPixelDimensionStyle(prop) {
  switch (prop) {
    case "width":
    case "height":
    case "minWidth":
    case "minHeight":
    case "maxWidth":
    case "maxHeight":
    case "left":
    case "top":
    case "bottom":
    case "right":
    case "fontSize":
    case "outlineWidth":
    case "outlineOffset":
    case "paddingTop":
    case "paddingLeft":
    case "paddingBottom":
    case "paddingRight":
    case "marginTop":
    case "marginLeft":
    case "marginBottom":
    case "marginRight":
    case "borderRadius":
    case "borderWidth":
    case "borderTopWidth":
    case "borderLeftWidth":
    case "borderRightWidth":
    case "borderBottomWidth":
    case "textIndent":
      return true;
    default:
      return false;
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/html_tags.mjs
var HtmlTagDefinition = class {
  constructor({ closedByChildren, implicitNamespacePrefix, contentType = TagContentType.PARSABLE_DATA, closedByParent = false, isVoid = false, ignoreFirstLf = false, preventNamespaceInheritance = false, canSelfClose = false } = {}) {
    this.closedByChildren = {};
    this.closedByParent = false;
    if (closedByChildren && closedByChildren.length > 0) {
      closedByChildren.forEach((tagName) => this.closedByChildren[tagName] = true);
    }
    this.isVoid = isVoid;
    this.closedByParent = closedByParent || isVoid;
    this.implicitNamespacePrefix = implicitNamespacePrefix || null;
    this.contentType = contentType;
    this.ignoreFirstLf = ignoreFirstLf;
    this.preventNamespaceInheritance = preventNamespaceInheritance;
    this.canSelfClose = canSelfClose != null ? canSelfClose : isVoid;
  }
  isClosedByChild(name) {
    return this.isVoid || name.toLowerCase() in this.closedByChildren;
  }
  getContentType(prefix) {
    if (typeof this.contentType === "object") {
      const overrideType = prefix === void 0 ? void 0 : this.contentType[prefix];
      return overrideType != null ? overrideType : this.contentType.default;
    }
    return this.contentType;
  }
};
var DEFAULT_TAG_DEFINITION;
var TAG_DEFINITIONS;
function getHtmlTagDefinition(tagName) {
  var _a2, _b2;
  if (!TAG_DEFINITIONS) {
    DEFAULT_TAG_DEFINITION = new HtmlTagDefinition({ canSelfClose: true });
    TAG_DEFINITIONS = Object.assign(/* @__PURE__ */ Object.create(null), {
      "base": new HtmlTagDefinition({ isVoid: true }),
      "meta": new HtmlTagDefinition({ isVoid: true }),
      "area": new HtmlTagDefinition({ isVoid: true }),
      "embed": new HtmlTagDefinition({ isVoid: true }),
      "link": new HtmlTagDefinition({ isVoid: true }),
      "img": new HtmlTagDefinition({ isVoid: true }),
      "input": new HtmlTagDefinition({ isVoid: true }),
      "param": new HtmlTagDefinition({ isVoid: true }),
      "hr": new HtmlTagDefinition({ isVoid: true }),
      "br": new HtmlTagDefinition({ isVoid: true }),
      "source": new HtmlTagDefinition({ isVoid: true }),
      "track": new HtmlTagDefinition({ isVoid: true }),
      "wbr": new HtmlTagDefinition({ isVoid: true }),
      "p": new HtmlTagDefinition({
        closedByChildren: [
          "address",
          "article",
          "aside",
          "blockquote",
          "div",
          "dl",
          "fieldset",
          "footer",
          "form",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "header",
          "hgroup",
          "hr",
          "main",
          "nav",
          "ol",
          "p",
          "pre",
          "section",
          "table",
          "ul"
        ],
        closedByParent: true
      }),
      "thead": new HtmlTagDefinition({ closedByChildren: ["tbody", "tfoot"] }),
      "tbody": new HtmlTagDefinition({ closedByChildren: ["tbody", "tfoot"], closedByParent: true }),
      "tfoot": new HtmlTagDefinition({ closedByChildren: ["tbody"], closedByParent: true }),
      "tr": new HtmlTagDefinition({ closedByChildren: ["tr"], closedByParent: true }),
      "td": new HtmlTagDefinition({ closedByChildren: ["td", "th"], closedByParent: true }),
      "th": new HtmlTagDefinition({ closedByChildren: ["td", "th"], closedByParent: true }),
      "col": new HtmlTagDefinition({ isVoid: true }),
      "svg": new HtmlTagDefinition({ implicitNamespacePrefix: "svg" }),
      "foreignObject": new HtmlTagDefinition({
        implicitNamespacePrefix: "svg",
        preventNamespaceInheritance: true
      }),
      "math": new HtmlTagDefinition({ implicitNamespacePrefix: "math" }),
      "li": new HtmlTagDefinition({ closedByChildren: ["li"], closedByParent: true }),
      "dt": new HtmlTagDefinition({ closedByChildren: ["dt", "dd"] }),
      "dd": new HtmlTagDefinition({ closedByChildren: ["dt", "dd"], closedByParent: true }),
      "rb": new HtmlTagDefinition({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }),
      "rt": new HtmlTagDefinition({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }),
      "rtc": new HtmlTagDefinition({ closedByChildren: ["rb", "rtc", "rp"], closedByParent: true }),
      "rp": new HtmlTagDefinition({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }),
      "optgroup": new HtmlTagDefinition({ closedByChildren: ["optgroup"], closedByParent: true }),
      "option": new HtmlTagDefinition({ closedByChildren: ["option", "optgroup"], closedByParent: true }),
      "pre": new HtmlTagDefinition({ ignoreFirstLf: true }),
      "listing": new HtmlTagDefinition({ ignoreFirstLf: true }),
      "style": new HtmlTagDefinition({ contentType: TagContentType.RAW_TEXT }),
      "script": new HtmlTagDefinition({ contentType: TagContentType.RAW_TEXT }),
      "title": new HtmlTagDefinition({
        contentType: { default: TagContentType.ESCAPABLE_RAW_TEXT, svg: TagContentType.PARSABLE_DATA }
      }),
      "textarea": new HtmlTagDefinition({ contentType: TagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true })
    });
    new DomElementSchemaRegistry().allKnownElementNames().forEach((knownTagName) => {
      if (!TAG_DEFINITIONS[knownTagName] && getNsPrefix(knownTagName) === null) {
        TAG_DEFINITIONS[knownTagName] = new HtmlTagDefinition({ canSelfClose: false });
      }
    });
  }
  return (_b2 = (_a2 = TAG_DEFINITIONS[tagName]) != null ? _a2 : TAG_DEFINITIONS[tagName.toLowerCase()]) != null ? _b2 : DEFAULT_TAG_DEFINITION;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/serializers/placeholder.mjs
var TAG_TO_PLACEHOLDER_NAMES = {
  "A": "LINK",
  "B": "BOLD_TEXT",
  "BR": "LINE_BREAK",
  "EM": "EMPHASISED_TEXT",
  "H1": "HEADING_LEVEL1",
  "H2": "HEADING_LEVEL2",
  "H3": "HEADING_LEVEL3",
  "H4": "HEADING_LEVEL4",
  "H5": "HEADING_LEVEL5",
  "H6": "HEADING_LEVEL6",
  "HR": "HORIZONTAL_RULE",
  "I": "ITALIC_TEXT",
  "LI": "LIST_ITEM",
  "LINK": "MEDIA_LINK",
  "OL": "ORDERED_LIST",
  "P": "PARAGRAPH",
  "Q": "QUOTATION",
  "S": "STRIKETHROUGH_TEXT",
  "SMALL": "SMALL_TEXT",
  "SUB": "SUBSTRIPT",
  "SUP": "SUPERSCRIPT",
  "TBODY": "TABLE_BODY",
  "TD": "TABLE_CELL",
  "TFOOT": "TABLE_FOOTER",
  "TH": "TABLE_HEADER_CELL",
  "THEAD": "TABLE_HEADER",
  "TR": "TABLE_ROW",
  "TT": "MONOSPACED_TEXT",
  "U": "UNDERLINED_TEXT",
  "UL": "UNORDERED_LIST"
};
var PlaceholderRegistry = class {
  constructor() {
    this._placeHolderNameCounts = {};
    this._signatureToName = {};
  }
  getStartTagPlaceholderName(tag, attrs, isVoid) {
    const signature = this._hashTag(tag, attrs, isVoid);
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const upperTag = tag.toUpperCase();
    const baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || `TAG_${upperTag}`;
    const name = this._generateUniqueName(isVoid ? baseName : `START_${baseName}`);
    this._signatureToName[signature] = name;
    return name;
  }
  getCloseTagPlaceholderName(tag) {
    const signature = this._hashClosingTag(tag);
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const upperTag = tag.toUpperCase();
    const baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || `TAG_${upperTag}`;
    const name = this._generateUniqueName(`CLOSE_${baseName}`);
    this._signatureToName[signature] = name;
    return name;
  }
  getPlaceholderName(name, content) {
    const upperName = name.toUpperCase();
    const signature = `PH: ${upperName}=${content}`;
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const uniqueName = this._generateUniqueName(upperName);
    this._signatureToName[signature] = uniqueName;
    return uniqueName;
  }
  getUniquePlaceholder(name) {
    return this._generateUniqueName(name.toUpperCase());
  }
  getStartBlockPlaceholderName(name, parameters) {
    const signature = this._hashBlock(name, parameters);
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const placeholder = this._generateUniqueName(`START_BLOCK_${this._toSnakeCase(name)}`);
    this._signatureToName[signature] = placeholder;
    return placeholder;
  }
  getCloseBlockPlaceholderName(name) {
    const signature = this._hashClosingBlock(name);
    if (this._signatureToName[signature]) {
      return this._signatureToName[signature];
    }
    const placeholder = this._generateUniqueName(`CLOSE_BLOCK_${this._toSnakeCase(name)}`);
    this._signatureToName[signature] = placeholder;
    return placeholder;
  }
  _hashTag(tag, attrs, isVoid) {
    const start = `<${tag}`;
    const strAttrs = Object.keys(attrs).sort().map((name) => ` ${name}=${attrs[name]}`).join("");
    const end = isVoid ? "/>" : `></${tag}>`;
    return start + strAttrs + end;
  }
  _hashClosingTag(tag) {
    return this._hashTag(`/${tag}`, {}, false);
  }
  _hashBlock(name, parameters) {
    const params = parameters.length === 0 ? "" : ` (${parameters.sort().join("; ")})`;
    return `@${name}${params} {}`;
  }
  _hashClosingBlock(name) {
    return this._hashBlock(`close_${name}`, []);
  }
  _toSnakeCase(name) {
    return name.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  }
  _generateUniqueName(base) {
    const seen = this._placeHolderNameCounts.hasOwnProperty(base);
    if (!seen) {
      this._placeHolderNameCounts[base] = 1;
      return base;
    }
    const id = this._placeHolderNameCounts[base];
    this._placeHolderNameCounts[base] = id + 1;
    return `${base}_${id}`;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/i18n_parser.mjs
var _expParser = new Parser(new Lexer());
function createI18nMessageFactory(interpolationConfig, containerBlocks) {
  const visitor = new _I18nVisitor(_expParser, interpolationConfig, containerBlocks);
  return (nodes, meaning, description, customId, visitNodeFn) => visitor.toI18nMessage(nodes, meaning, description, customId, visitNodeFn);
}
function noopVisitNodeFn(_html, i18n2) {
  return i18n2;
}
var _I18nVisitor = class {
  constructor(_expressionParser, _interpolationConfig, _containerBlocks) {
    this._expressionParser = _expressionParser;
    this._interpolationConfig = _interpolationConfig;
    this._containerBlocks = _containerBlocks;
  }
  toI18nMessage(nodes, meaning = "", description = "", customId = "", visitNodeFn) {
    const context = {
      isIcu: nodes.length == 1 && nodes[0] instanceof Expansion,
      icuDepth: 0,
      placeholderRegistry: new PlaceholderRegistry(),
      placeholderToContent: {},
      placeholderToMessage: {},
      visitNodeFn: visitNodeFn || noopVisitNodeFn
    };
    const i18nodes = visitAll2(this, nodes, context);
    return new Message(i18nodes, context.placeholderToContent, context.placeholderToMessage, meaning, description, customId);
  }
  visitElement(el, context) {
    var _a2;
    const children = visitAll2(this, el.children, context);
    const attrs = {};
    el.attrs.forEach((attr) => {
      attrs[attr.name] = attr.value;
    });
    const isVoid = getHtmlTagDefinition(el.name).isVoid;
    const startPhName = context.placeholderRegistry.getStartTagPlaceholderName(el.name, attrs, isVoid);
    context.placeholderToContent[startPhName] = {
      text: el.startSourceSpan.toString(),
      sourceSpan: el.startSourceSpan
    };
    let closePhName = "";
    if (!isVoid) {
      closePhName = context.placeholderRegistry.getCloseTagPlaceholderName(el.name);
      context.placeholderToContent[closePhName] = {
        text: `</${el.name}>`,
        sourceSpan: (_a2 = el.endSourceSpan) != null ? _a2 : el.sourceSpan
      };
    }
    const node = new TagPlaceholder(el.name, attrs, startPhName, closePhName, children, isVoid, el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
    return context.visitNodeFn(el, node);
  }
  visitAttribute(attribute2, context) {
    const node = attribute2.valueTokens === void 0 || attribute2.valueTokens.length === 1 ? new Text2(attribute2.value, attribute2.valueSpan || attribute2.sourceSpan) : this._visitTextWithInterpolation(attribute2.valueTokens, attribute2.valueSpan || attribute2.sourceSpan, context, attribute2.i18n);
    return context.visitNodeFn(attribute2, node);
  }
  visitText(text2, context) {
    const node = text2.tokens.length === 1 ? new Text2(text2.value, text2.sourceSpan) : this._visitTextWithInterpolation(text2.tokens, text2.sourceSpan, context, text2.i18n);
    return context.visitNodeFn(text2, node);
  }
  visitComment(comment, context) {
    return null;
  }
  visitExpansion(icu, context) {
    context.icuDepth++;
    const i18nIcuCases = {};
    const i18nIcu = new Icu2(icu.switchValue, icu.type, i18nIcuCases, icu.sourceSpan);
    icu.cases.forEach((caze) => {
      i18nIcuCases[caze.value] = new Container(caze.expression.map((node2) => node2.visit(this, context)), caze.expSourceSpan);
    });
    context.icuDepth--;
    if (context.isIcu || context.icuDepth > 0) {
      const expPh = context.placeholderRegistry.getUniquePlaceholder(`VAR_${icu.type}`);
      i18nIcu.expressionPlaceholder = expPh;
      context.placeholderToContent[expPh] = {
        text: icu.switchValue,
        sourceSpan: icu.switchValueSourceSpan
      };
      return context.visitNodeFn(icu, i18nIcu);
    }
    const phName = context.placeholderRegistry.getPlaceholderName("ICU", icu.sourceSpan.toString());
    context.placeholderToMessage[phName] = this.toI18nMessage([icu], "", "", "", void 0);
    const node = new IcuPlaceholder(i18nIcu, phName, icu.sourceSpan);
    return context.visitNodeFn(icu, node);
  }
  visitExpansionCase(_icuCase, _context) {
    throw new Error("Unreachable code");
  }
  visitBlock(block, context) {
    var _a2;
    const children = visitAll2(this, block.children, context);
    if (this._containerBlocks.has(block.name)) {
      return new Container(children, block.sourceSpan);
    }
    const parameters = block.parameters.map((param) => param.expression);
    const startPhName = context.placeholderRegistry.getStartBlockPlaceholderName(block.name, parameters);
    const closePhName = context.placeholderRegistry.getCloseBlockPlaceholderName(block.name);
    context.placeholderToContent[startPhName] = {
      text: block.startSourceSpan.toString(),
      sourceSpan: block.startSourceSpan
    };
    context.placeholderToContent[closePhName] = {
      text: block.endSourceSpan ? block.endSourceSpan.toString() : "}",
      sourceSpan: (_a2 = block.endSourceSpan) != null ? _a2 : block.sourceSpan
    };
    const node = new BlockPlaceholder(block.name, parameters, startPhName, closePhName, children, block.sourceSpan, block.startSourceSpan, block.endSourceSpan);
    return context.visitNodeFn(block, node);
  }
  visitBlockParameter(_parameter, _context) {
    throw new Error("Unreachable code");
  }
  _visitTextWithInterpolation(tokens, sourceSpan, context, previousI18n) {
    const nodes = [];
    let hasInterpolation = false;
    for (const token of tokens) {
      switch (token.type) {
        case 8:
        case 17:
          hasInterpolation = true;
          const expression = token.parts[1];
          const baseName = extractPlaceholderName(expression) || "INTERPOLATION";
          const phName = context.placeholderRegistry.getPlaceholderName(baseName, expression);
          context.placeholderToContent[phName] = {
            text: token.parts.join(""),
            sourceSpan: token.sourceSpan
          };
          nodes.push(new Placeholder(expression, phName, token.sourceSpan));
          break;
        default:
          if (token.parts[0].length > 0) {
            const previous = nodes[nodes.length - 1];
            if (previous instanceof Text2) {
              previous.value += token.parts[0];
              previous.sourceSpan = new ParseSourceSpan(previous.sourceSpan.start, token.sourceSpan.end, previous.sourceSpan.fullStart, previous.sourceSpan.details);
            } else {
              nodes.push(new Text2(token.parts[0], token.sourceSpan));
            }
          }
          break;
      }
    }
    if (hasInterpolation) {
      reusePreviousSourceSpans(nodes, previousI18n);
      return new Container(nodes, sourceSpan);
    } else {
      return nodes[0];
    }
  }
};
function reusePreviousSourceSpans(nodes, previousI18n) {
  if (previousI18n instanceof Message) {
    assertSingleContainerMessage(previousI18n);
    previousI18n = previousI18n.nodes[0];
  }
  if (previousI18n instanceof Container) {
    assertEquivalentNodes(previousI18n.children, nodes);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].sourceSpan = previousI18n.children[i].sourceSpan;
    }
  }
}
function assertSingleContainerMessage(message) {
  const nodes = message.nodes;
  if (nodes.length !== 1 || !(nodes[0] instanceof Container)) {
    throw new Error("Unexpected previous i18n message - expected it to consist of only a single `Container` node.");
  }
}
function assertEquivalentNodes(previousNodes, nodes) {
  if (previousNodes.length !== nodes.length) {
    throw new Error("The number of i18n message children changed between first and second pass.");
  }
  if (previousNodes.some((node, i) => nodes[i].constructor !== node.constructor)) {
    throw new Error("The types of the i18n message children changed between first and second pass.");
  }
}
var _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*("|')([\s\S]*?)\1[\s\S]*\)/g;
function extractPlaceholderName(input) {
  return input.split(_CUSTOM_PH_EXP)[2];
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/parse_util.mjs
var I18nError = class extends ParseError {
  constructor(span, msg) {
    super(span, msg);
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/entities.mjs
var NAMED_ENTITIES = {
  "AElig": "\xC6",
  "AMP": "&",
  "amp": "&",
  "Aacute": "\xC1",
  "Abreve": "\u0102",
  "Acirc": "\xC2",
  "Acy": "\u0410",
  "Afr": "\u{1D504}",
  "Agrave": "\xC0",
  "Alpha": "\u0391",
  "Amacr": "\u0100",
  "And": "\u2A53",
  "Aogon": "\u0104",
  "Aopf": "\u{1D538}",
  "ApplyFunction": "\u2061",
  "af": "\u2061",
  "Aring": "\xC5",
  "angst": "\xC5",
  "Ascr": "\u{1D49C}",
  "Assign": "\u2254",
  "colone": "\u2254",
  "coloneq": "\u2254",
  "Atilde": "\xC3",
  "Auml": "\xC4",
  "Backslash": "\u2216",
  "setminus": "\u2216",
  "setmn": "\u2216",
  "smallsetminus": "\u2216",
  "ssetmn": "\u2216",
  "Barv": "\u2AE7",
  "Barwed": "\u2306",
  "doublebarwedge": "\u2306",
  "Bcy": "\u0411",
  "Because": "\u2235",
  "becaus": "\u2235",
  "because": "\u2235",
  "Bernoullis": "\u212C",
  "Bscr": "\u212C",
  "bernou": "\u212C",
  "Beta": "\u0392",
  "Bfr": "\u{1D505}",
  "Bopf": "\u{1D539}",
  "Breve": "\u02D8",
  "breve": "\u02D8",
  "Bumpeq": "\u224E",
  "HumpDownHump": "\u224E",
  "bump": "\u224E",
  "CHcy": "\u0427",
  "COPY": "\xA9",
  "copy": "\xA9",
  "Cacute": "\u0106",
  "Cap": "\u22D2",
  "CapitalDifferentialD": "\u2145",
  "DD": "\u2145",
  "Cayleys": "\u212D",
  "Cfr": "\u212D",
  "Ccaron": "\u010C",
  "Ccedil": "\xC7",
  "Ccirc": "\u0108",
  "Cconint": "\u2230",
  "Cdot": "\u010A",
  "Cedilla": "\xB8",
  "cedil": "\xB8",
  "CenterDot": "\xB7",
  "centerdot": "\xB7",
  "middot": "\xB7",
  "Chi": "\u03A7",
  "CircleDot": "\u2299",
  "odot": "\u2299",
  "CircleMinus": "\u2296",
  "ominus": "\u2296",
  "CirclePlus": "\u2295",
  "oplus": "\u2295",
  "CircleTimes": "\u2297",
  "otimes": "\u2297",
  "ClockwiseContourIntegral": "\u2232",
  "cwconint": "\u2232",
  "CloseCurlyDoubleQuote": "\u201D",
  "rdquo": "\u201D",
  "rdquor": "\u201D",
  "CloseCurlyQuote": "\u2019",
  "rsquo": "\u2019",
  "rsquor": "\u2019",
  "Colon": "\u2237",
  "Proportion": "\u2237",
  "Colone": "\u2A74",
  "Congruent": "\u2261",
  "equiv": "\u2261",
  "Conint": "\u222F",
  "DoubleContourIntegral": "\u222F",
  "ContourIntegral": "\u222E",
  "conint": "\u222E",
  "oint": "\u222E",
  "Copf": "\u2102",
  "complexes": "\u2102",
  "Coproduct": "\u2210",
  "coprod": "\u2210",
  "CounterClockwiseContourIntegral": "\u2233",
  "awconint": "\u2233",
  "Cross": "\u2A2F",
  "Cscr": "\u{1D49E}",
  "Cup": "\u22D3",
  "CupCap": "\u224D",
  "asympeq": "\u224D",
  "DDotrahd": "\u2911",
  "DJcy": "\u0402",
  "DScy": "\u0405",
  "DZcy": "\u040F",
  "Dagger": "\u2021",
  "ddagger": "\u2021",
  "Darr": "\u21A1",
  "Dashv": "\u2AE4",
  "DoubleLeftTee": "\u2AE4",
  "Dcaron": "\u010E",
  "Dcy": "\u0414",
  "Del": "\u2207",
  "nabla": "\u2207",
  "Delta": "\u0394",
  "Dfr": "\u{1D507}",
  "DiacriticalAcute": "\xB4",
  "acute": "\xB4",
  "DiacriticalDot": "\u02D9",
  "dot": "\u02D9",
  "DiacriticalDoubleAcute": "\u02DD",
  "dblac": "\u02DD",
  "DiacriticalGrave": "`",
  "grave": "`",
  "DiacriticalTilde": "\u02DC",
  "tilde": "\u02DC",
  "Diamond": "\u22C4",
  "diam": "\u22C4",
  "diamond": "\u22C4",
  "DifferentialD": "\u2146",
  "dd": "\u2146",
  "Dopf": "\u{1D53B}",
  "Dot": "\xA8",
  "DoubleDot": "\xA8",
  "die": "\xA8",
  "uml": "\xA8",
  "DotDot": "\u20DC",
  "DotEqual": "\u2250",
  "doteq": "\u2250",
  "esdot": "\u2250",
  "DoubleDownArrow": "\u21D3",
  "Downarrow": "\u21D3",
  "dArr": "\u21D3",
  "DoubleLeftArrow": "\u21D0",
  "Leftarrow": "\u21D0",
  "lArr": "\u21D0",
  "DoubleLeftRightArrow": "\u21D4",
  "Leftrightarrow": "\u21D4",
  "hArr": "\u21D4",
  "iff": "\u21D4",
  "DoubleLongLeftArrow": "\u27F8",
  "Longleftarrow": "\u27F8",
  "xlArr": "\u27F8",
  "DoubleLongLeftRightArrow": "\u27FA",
  "Longleftrightarrow": "\u27FA",
  "xhArr": "\u27FA",
  "DoubleLongRightArrow": "\u27F9",
  "Longrightarrow": "\u27F9",
  "xrArr": "\u27F9",
  "DoubleRightArrow": "\u21D2",
  "Implies": "\u21D2",
  "Rightarrow": "\u21D2",
  "rArr": "\u21D2",
  "DoubleRightTee": "\u22A8",
  "vDash": "\u22A8",
  "DoubleUpArrow": "\u21D1",
  "Uparrow": "\u21D1",
  "uArr": "\u21D1",
  "DoubleUpDownArrow": "\u21D5",
  "Updownarrow": "\u21D5",
  "vArr": "\u21D5",
  "DoubleVerticalBar": "\u2225",
  "par": "\u2225",
  "parallel": "\u2225",
  "shortparallel": "\u2225",
  "spar": "\u2225",
  "DownArrow": "\u2193",
  "ShortDownArrow": "\u2193",
  "darr": "\u2193",
  "downarrow": "\u2193",
  "DownArrowBar": "\u2913",
  "DownArrowUpArrow": "\u21F5",
  "duarr": "\u21F5",
  "DownBreve": "\u0311",
  "DownLeftRightVector": "\u2950",
  "DownLeftTeeVector": "\u295E",
  "DownLeftVector": "\u21BD",
  "leftharpoondown": "\u21BD",
  "lhard": "\u21BD",
  "DownLeftVectorBar": "\u2956",
  "DownRightTeeVector": "\u295F",
  "DownRightVector": "\u21C1",
  "rhard": "\u21C1",
  "rightharpoondown": "\u21C1",
  "DownRightVectorBar": "\u2957",
  "DownTee": "\u22A4",
  "top": "\u22A4",
  "DownTeeArrow": "\u21A7",
  "mapstodown": "\u21A7",
  "Dscr": "\u{1D49F}",
  "Dstrok": "\u0110",
  "ENG": "\u014A",
  "ETH": "\xD0",
  "Eacute": "\xC9",
  "Ecaron": "\u011A",
  "Ecirc": "\xCA",
  "Ecy": "\u042D",
  "Edot": "\u0116",
  "Efr": "\u{1D508}",
  "Egrave": "\xC8",
  "Element": "\u2208",
  "in": "\u2208",
  "isin": "\u2208",
  "isinv": "\u2208",
  "Emacr": "\u0112",
  "EmptySmallSquare": "\u25FB",
  "EmptyVerySmallSquare": "\u25AB",
  "Eogon": "\u0118",
  "Eopf": "\u{1D53C}",
  "Epsilon": "\u0395",
  "Equal": "\u2A75",
  "EqualTilde": "\u2242",
  "eqsim": "\u2242",
  "esim": "\u2242",
  "Equilibrium": "\u21CC",
  "rightleftharpoons": "\u21CC",
  "rlhar": "\u21CC",
  "Escr": "\u2130",
  "expectation": "\u2130",
  "Esim": "\u2A73",
  "Eta": "\u0397",
  "Euml": "\xCB",
  "Exists": "\u2203",
  "exist": "\u2203",
  "ExponentialE": "\u2147",
  "ee": "\u2147",
  "exponentiale": "\u2147",
  "Fcy": "\u0424",
  "Ffr": "\u{1D509}",
  "FilledSmallSquare": "\u25FC",
  "FilledVerySmallSquare": "\u25AA",
  "blacksquare": "\u25AA",
  "squarf": "\u25AA",
  "squf": "\u25AA",
  "Fopf": "\u{1D53D}",
  "ForAll": "\u2200",
  "forall": "\u2200",
  "Fouriertrf": "\u2131",
  "Fscr": "\u2131",
  "GJcy": "\u0403",
  "GT": ">",
  "gt": ">",
  "Gamma": "\u0393",
  "Gammad": "\u03DC",
  "Gbreve": "\u011E",
  "Gcedil": "\u0122",
  "Gcirc": "\u011C",
  "Gcy": "\u0413",
  "Gdot": "\u0120",
  "Gfr": "\u{1D50A}",
  "Gg": "\u22D9",
  "ggg": "\u22D9",
  "Gopf": "\u{1D53E}",
  "GreaterEqual": "\u2265",
  "ge": "\u2265",
  "geq": "\u2265",
  "GreaterEqualLess": "\u22DB",
  "gel": "\u22DB",
  "gtreqless": "\u22DB",
  "GreaterFullEqual": "\u2267",
  "gE": "\u2267",
  "geqq": "\u2267",
  "GreaterGreater": "\u2AA2",
  "GreaterLess": "\u2277",
  "gl": "\u2277",
  "gtrless": "\u2277",
  "GreaterSlantEqual": "\u2A7E",
  "geqslant": "\u2A7E",
  "ges": "\u2A7E",
  "GreaterTilde": "\u2273",
  "gsim": "\u2273",
  "gtrsim": "\u2273",
  "Gscr": "\u{1D4A2}",
  "Gt": "\u226B",
  "NestedGreaterGreater": "\u226B",
  "gg": "\u226B",
  "HARDcy": "\u042A",
  "Hacek": "\u02C7",
  "caron": "\u02C7",
  "Hat": "^",
  "Hcirc": "\u0124",
  "Hfr": "\u210C",
  "Poincareplane": "\u210C",
  "HilbertSpace": "\u210B",
  "Hscr": "\u210B",
  "hamilt": "\u210B",
  "Hopf": "\u210D",
  "quaternions": "\u210D",
  "HorizontalLine": "\u2500",
  "boxh": "\u2500",
  "Hstrok": "\u0126",
  "HumpEqual": "\u224F",
  "bumpe": "\u224F",
  "bumpeq": "\u224F",
  "IEcy": "\u0415",
  "IJlig": "\u0132",
  "IOcy": "\u0401",
  "Iacute": "\xCD",
  "Icirc": "\xCE",
  "Icy": "\u0418",
  "Idot": "\u0130",
  "Ifr": "\u2111",
  "Im": "\u2111",
  "image": "\u2111",
  "imagpart": "\u2111",
  "Igrave": "\xCC",
  "Imacr": "\u012A",
  "ImaginaryI": "\u2148",
  "ii": "\u2148",
  "Int": "\u222C",
  "Integral": "\u222B",
  "int": "\u222B",
  "Intersection": "\u22C2",
  "bigcap": "\u22C2",
  "xcap": "\u22C2",
  "InvisibleComma": "\u2063",
  "ic": "\u2063",
  "InvisibleTimes": "\u2062",
  "it": "\u2062",
  "Iogon": "\u012E",
  "Iopf": "\u{1D540}",
  "Iota": "\u0399",
  "Iscr": "\u2110",
  "imagline": "\u2110",
  "Itilde": "\u0128",
  "Iukcy": "\u0406",
  "Iuml": "\xCF",
  "Jcirc": "\u0134",
  "Jcy": "\u0419",
  "Jfr": "\u{1D50D}",
  "Jopf": "\u{1D541}",
  "Jscr": "\u{1D4A5}",
  "Jsercy": "\u0408",
  "Jukcy": "\u0404",
  "KHcy": "\u0425",
  "KJcy": "\u040C",
  "Kappa": "\u039A",
  "Kcedil": "\u0136",
  "Kcy": "\u041A",
  "Kfr": "\u{1D50E}",
  "Kopf": "\u{1D542}",
  "Kscr": "\u{1D4A6}",
  "LJcy": "\u0409",
  "LT": "<",
  "lt": "<",
  "Lacute": "\u0139",
  "Lambda": "\u039B",
  "Lang": "\u27EA",
  "Laplacetrf": "\u2112",
  "Lscr": "\u2112",
  "lagran": "\u2112",
  "Larr": "\u219E",
  "twoheadleftarrow": "\u219E",
  "Lcaron": "\u013D",
  "Lcedil": "\u013B",
  "Lcy": "\u041B",
  "LeftAngleBracket": "\u27E8",
  "lang": "\u27E8",
  "langle": "\u27E8",
  "LeftArrow": "\u2190",
  "ShortLeftArrow": "\u2190",
  "larr": "\u2190",
  "leftarrow": "\u2190",
  "slarr": "\u2190",
  "LeftArrowBar": "\u21E4",
  "larrb": "\u21E4",
  "LeftArrowRightArrow": "\u21C6",
  "leftrightarrows": "\u21C6",
  "lrarr": "\u21C6",
  "LeftCeiling": "\u2308",
  "lceil": "\u2308",
  "LeftDoubleBracket": "\u27E6",
  "lobrk": "\u27E6",
  "LeftDownTeeVector": "\u2961",
  "LeftDownVector": "\u21C3",
  "dharl": "\u21C3",
  "downharpoonleft": "\u21C3",
  "LeftDownVectorBar": "\u2959",
  "LeftFloor": "\u230A",
  "lfloor": "\u230A",
  "LeftRightArrow": "\u2194",
  "harr": "\u2194",
  "leftrightarrow": "\u2194",
  "LeftRightVector": "\u294E",
  "LeftTee": "\u22A3",
  "dashv": "\u22A3",
  "LeftTeeArrow": "\u21A4",
  "mapstoleft": "\u21A4",
  "LeftTeeVector": "\u295A",
  "LeftTriangle": "\u22B2",
  "vartriangleleft": "\u22B2",
  "vltri": "\u22B2",
  "LeftTriangleBar": "\u29CF",
  "LeftTriangleEqual": "\u22B4",
  "ltrie": "\u22B4",
  "trianglelefteq": "\u22B4",
  "LeftUpDownVector": "\u2951",
  "LeftUpTeeVector": "\u2960",
  "LeftUpVector": "\u21BF",
  "uharl": "\u21BF",
  "upharpoonleft": "\u21BF",
  "LeftUpVectorBar": "\u2958",
  "LeftVector": "\u21BC",
  "leftharpoonup": "\u21BC",
  "lharu": "\u21BC",
  "LeftVectorBar": "\u2952",
  "LessEqualGreater": "\u22DA",
  "leg": "\u22DA",
  "lesseqgtr": "\u22DA",
  "LessFullEqual": "\u2266",
  "lE": "\u2266",
  "leqq": "\u2266",
  "LessGreater": "\u2276",
  "lessgtr": "\u2276",
  "lg": "\u2276",
  "LessLess": "\u2AA1",
  "LessSlantEqual": "\u2A7D",
  "leqslant": "\u2A7D",
  "les": "\u2A7D",
  "LessTilde": "\u2272",
  "lesssim": "\u2272",
  "lsim": "\u2272",
  "Lfr": "\u{1D50F}",
  "Ll": "\u22D8",
  "Lleftarrow": "\u21DA",
  "lAarr": "\u21DA",
  "Lmidot": "\u013F",
  "LongLeftArrow": "\u27F5",
  "longleftarrow": "\u27F5",
  "xlarr": "\u27F5",
  "LongLeftRightArrow": "\u27F7",
  "longleftrightarrow": "\u27F7",
  "xharr": "\u27F7",
  "LongRightArrow": "\u27F6",
  "longrightarrow": "\u27F6",
  "xrarr": "\u27F6",
  "Lopf": "\u{1D543}",
  "LowerLeftArrow": "\u2199",
  "swarr": "\u2199",
  "swarrow": "\u2199",
  "LowerRightArrow": "\u2198",
  "searr": "\u2198",
  "searrow": "\u2198",
  "Lsh": "\u21B0",
  "lsh": "\u21B0",
  "Lstrok": "\u0141",
  "Lt": "\u226A",
  "NestedLessLess": "\u226A",
  "ll": "\u226A",
  "Map": "\u2905",
  "Mcy": "\u041C",
  "MediumSpace": "\u205F",
  "Mellintrf": "\u2133",
  "Mscr": "\u2133",
  "phmmat": "\u2133",
  "Mfr": "\u{1D510}",
  "MinusPlus": "\u2213",
  "mnplus": "\u2213",
  "mp": "\u2213",
  "Mopf": "\u{1D544}",
  "Mu": "\u039C",
  "NJcy": "\u040A",
  "Nacute": "\u0143",
  "Ncaron": "\u0147",
  "Ncedil": "\u0145",
  "Ncy": "\u041D",
  "NegativeMediumSpace": "\u200B",
  "NegativeThickSpace": "\u200B",
  "NegativeThinSpace": "\u200B",
  "NegativeVeryThinSpace": "\u200B",
  "ZeroWidthSpace": "\u200B",
  "NewLine": "\n",
  "Nfr": "\u{1D511}",
  "NoBreak": "\u2060",
  "NonBreakingSpace": "\xA0",
  "nbsp": "\xA0",
  "Nopf": "\u2115",
  "naturals": "\u2115",
  "Not": "\u2AEC",
  "NotCongruent": "\u2262",
  "nequiv": "\u2262",
  "NotCupCap": "\u226D",
  "NotDoubleVerticalBar": "\u2226",
  "npar": "\u2226",
  "nparallel": "\u2226",
  "nshortparallel": "\u2226",
  "nspar": "\u2226",
  "NotElement": "\u2209",
  "notin": "\u2209",
  "notinva": "\u2209",
  "NotEqual": "\u2260",
  "ne": "\u2260",
  "NotEqualTilde": "\u2242\u0338",
  "nesim": "\u2242\u0338",
  "NotExists": "\u2204",
  "nexist": "\u2204",
  "nexists": "\u2204",
  "NotGreater": "\u226F",
  "ngt": "\u226F",
  "ngtr": "\u226F",
  "NotGreaterEqual": "\u2271",
  "nge": "\u2271",
  "ngeq": "\u2271",
  "NotGreaterFullEqual": "\u2267\u0338",
  "ngE": "\u2267\u0338",
  "ngeqq": "\u2267\u0338",
  "NotGreaterGreater": "\u226B\u0338",
  "nGtv": "\u226B\u0338",
  "NotGreaterLess": "\u2279",
  "ntgl": "\u2279",
  "NotGreaterSlantEqual": "\u2A7E\u0338",
  "ngeqslant": "\u2A7E\u0338",
  "nges": "\u2A7E\u0338",
  "NotGreaterTilde": "\u2275",
  "ngsim": "\u2275",
  "NotHumpDownHump": "\u224E\u0338",
  "nbump": "\u224E\u0338",
  "NotHumpEqual": "\u224F\u0338",
  "nbumpe": "\u224F\u0338",
  "NotLeftTriangle": "\u22EA",
  "nltri": "\u22EA",
  "ntriangleleft": "\u22EA",
  "NotLeftTriangleBar": "\u29CF\u0338",
  "NotLeftTriangleEqual": "\u22EC",
  "nltrie": "\u22EC",
  "ntrianglelefteq": "\u22EC",
  "NotLess": "\u226E",
  "nless": "\u226E",
  "nlt": "\u226E",
  "NotLessEqual": "\u2270",
  "nle": "\u2270",
  "nleq": "\u2270",
  "NotLessGreater": "\u2278",
  "ntlg": "\u2278",
  "NotLessLess": "\u226A\u0338",
  "nLtv": "\u226A\u0338",
  "NotLessSlantEqual": "\u2A7D\u0338",
  "nleqslant": "\u2A7D\u0338",
  "nles": "\u2A7D\u0338",
  "NotLessTilde": "\u2274",
  "nlsim": "\u2274",
  "NotNestedGreaterGreater": "\u2AA2\u0338",
  "NotNestedLessLess": "\u2AA1\u0338",
  "NotPrecedes": "\u2280",
  "npr": "\u2280",
  "nprec": "\u2280",
  "NotPrecedesEqual": "\u2AAF\u0338",
  "npre": "\u2AAF\u0338",
  "npreceq": "\u2AAF\u0338",
  "NotPrecedesSlantEqual": "\u22E0",
  "nprcue": "\u22E0",
  "NotReverseElement": "\u220C",
  "notni": "\u220C",
  "notniva": "\u220C",
  "NotRightTriangle": "\u22EB",
  "nrtri": "\u22EB",
  "ntriangleright": "\u22EB",
  "NotRightTriangleBar": "\u29D0\u0338",
  "NotRightTriangleEqual": "\u22ED",
  "nrtrie": "\u22ED",
  "ntrianglerighteq": "\u22ED",
  "NotSquareSubset": "\u228F\u0338",
  "NotSquareSubsetEqual": "\u22E2",
  "nsqsube": "\u22E2",
  "NotSquareSuperset": "\u2290\u0338",
  "NotSquareSupersetEqual": "\u22E3",
  "nsqsupe": "\u22E3",
  "NotSubset": "\u2282\u20D2",
  "nsubset": "\u2282\u20D2",
  "vnsub": "\u2282\u20D2",
  "NotSubsetEqual": "\u2288",
  "nsube": "\u2288",
  "nsubseteq": "\u2288",
  "NotSucceeds": "\u2281",
  "nsc": "\u2281",
  "nsucc": "\u2281",
  "NotSucceedsEqual": "\u2AB0\u0338",
  "nsce": "\u2AB0\u0338",
  "nsucceq": "\u2AB0\u0338",
  "NotSucceedsSlantEqual": "\u22E1",
  "nsccue": "\u22E1",
  "NotSucceedsTilde": "\u227F\u0338",
  "NotSuperset": "\u2283\u20D2",
  "nsupset": "\u2283\u20D2",
  "vnsup": "\u2283\u20D2",
  "NotSupersetEqual": "\u2289",
  "nsupe": "\u2289",
  "nsupseteq": "\u2289",
  "NotTilde": "\u2241",
  "nsim": "\u2241",
  "NotTildeEqual": "\u2244",
  "nsime": "\u2244",
  "nsimeq": "\u2244",
  "NotTildeFullEqual": "\u2247",
  "ncong": "\u2247",
  "NotTildeTilde": "\u2249",
  "nap": "\u2249",
  "napprox": "\u2249",
  "NotVerticalBar": "\u2224",
  "nmid": "\u2224",
  "nshortmid": "\u2224",
  "nsmid": "\u2224",
  "Nscr": "\u{1D4A9}",
  "Ntilde": "\xD1",
  "Nu": "\u039D",
  "OElig": "\u0152",
  "Oacute": "\xD3",
  "Ocirc": "\xD4",
  "Ocy": "\u041E",
  "Odblac": "\u0150",
  "Ofr": "\u{1D512}",
  "Ograve": "\xD2",
  "Omacr": "\u014C",
  "Omega": "\u03A9",
  "ohm": "\u03A9",
  "Omicron": "\u039F",
  "Oopf": "\u{1D546}",
  "OpenCurlyDoubleQuote": "\u201C",
  "ldquo": "\u201C",
  "OpenCurlyQuote": "\u2018",
  "lsquo": "\u2018",
  "Or": "\u2A54",
  "Oscr": "\u{1D4AA}",
  "Oslash": "\xD8",
  "Otilde": "\xD5",
  "Otimes": "\u2A37",
  "Ouml": "\xD6",
  "OverBar": "\u203E",
  "oline": "\u203E",
  "OverBrace": "\u23DE",
  "OverBracket": "\u23B4",
  "tbrk": "\u23B4",
  "OverParenthesis": "\u23DC",
  "PartialD": "\u2202",
  "part": "\u2202",
  "Pcy": "\u041F",
  "Pfr": "\u{1D513}",
  "Phi": "\u03A6",
  "Pi": "\u03A0",
  "PlusMinus": "\xB1",
  "plusmn": "\xB1",
  "pm": "\xB1",
  "Popf": "\u2119",
  "primes": "\u2119",
  "Pr": "\u2ABB",
  "Precedes": "\u227A",
  "pr": "\u227A",
  "prec": "\u227A",
  "PrecedesEqual": "\u2AAF",
  "pre": "\u2AAF",
  "preceq": "\u2AAF",
  "PrecedesSlantEqual": "\u227C",
  "prcue": "\u227C",
  "preccurlyeq": "\u227C",
  "PrecedesTilde": "\u227E",
  "precsim": "\u227E",
  "prsim": "\u227E",
  "Prime": "\u2033",
  "Product": "\u220F",
  "prod": "\u220F",
  "Proportional": "\u221D",
  "prop": "\u221D",
  "propto": "\u221D",
  "varpropto": "\u221D",
  "vprop": "\u221D",
  "Pscr": "\u{1D4AB}",
  "Psi": "\u03A8",
  "QUOT": '"',
  "quot": '"',
  "Qfr": "\u{1D514}",
  "Qopf": "\u211A",
  "rationals": "\u211A",
  "Qscr": "\u{1D4AC}",
  "RBarr": "\u2910",
  "drbkarow": "\u2910",
  "REG": "\xAE",
  "circledR": "\xAE",
  "reg": "\xAE",
  "Racute": "\u0154",
  "Rang": "\u27EB",
  "Rarr": "\u21A0",
  "twoheadrightarrow": "\u21A0",
  "Rarrtl": "\u2916",
  "Rcaron": "\u0158",
  "Rcedil": "\u0156",
  "Rcy": "\u0420",
  "Re": "\u211C",
  "Rfr": "\u211C",
  "real": "\u211C",
  "realpart": "\u211C",
  "ReverseElement": "\u220B",
  "SuchThat": "\u220B",
  "ni": "\u220B",
  "niv": "\u220B",
  "ReverseEquilibrium": "\u21CB",
  "leftrightharpoons": "\u21CB",
  "lrhar": "\u21CB",
  "ReverseUpEquilibrium": "\u296F",
  "duhar": "\u296F",
  "Rho": "\u03A1",
  "RightAngleBracket": "\u27E9",
  "rang": "\u27E9",
  "rangle": "\u27E9",
  "RightArrow": "\u2192",
  "ShortRightArrow": "\u2192",
  "rarr": "\u2192",
  "rightarrow": "\u2192",
  "srarr": "\u2192",
  "RightArrowBar": "\u21E5",
  "rarrb": "\u21E5",
  "RightArrowLeftArrow": "\u21C4",
  "rightleftarrows": "\u21C4",
  "rlarr": "\u21C4",
  "RightCeiling": "\u2309",
  "rceil": "\u2309",
  "RightDoubleBracket": "\u27E7",
  "robrk": "\u27E7",
  "RightDownTeeVector": "\u295D",
  "RightDownVector": "\u21C2",
  "dharr": "\u21C2",
  "downharpoonright": "\u21C2",
  "RightDownVectorBar": "\u2955",
  "RightFloor": "\u230B",
  "rfloor": "\u230B",
  "RightTee": "\u22A2",
  "vdash": "\u22A2",
  "RightTeeArrow": "\u21A6",
  "map": "\u21A6",
  "mapsto": "\u21A6",
  "RightTeeVector": "\u295B",
  "RightTriangle": "\u22B3",
  "vartriangleright": "\u22B3",
  "vrtri": "\u22B3",
  "RightTriangleBar": "\u29D0",
  "RightTriangleEqual": "\u22B5",
  "rtrie": "\u22B5",
  "trianglerighteq": "\u22B5",
  "RightUpDownVector": "\u294F",
  "RightUpTeeVector": "\u295C",
  "RightUpVector": "\u21BE",
  "uharr": "\u21BE",
  "upharpoonright": "\u21BE",
  "RightUpVectorBar": "\u2954",
  "RightVector": "\u21C0",
  "rharu": "\u21C0",
  "rightharpoonup": "\u21C0",
  "RightVectorBar": "\u2953",
  "Ropf": "\u211D",
  "reals": "\u211D",
  "RoundImplies": "\u2970",
  "Rrightarrow": "\u21DB",
  "rAarr": "\u21DB",
  "Rscr": "\u211B",
  "realine": "\u211B",
  "Rsh": "\u21B1",
  "rsh": "\u21B1",
  "RuleDelayed": "\u29F4",
  "SHCHcy": "\u0429",
  "SHcy": "\u0428",
  "SOFTcy": "\u042C",
  "Sacute": "\u015A",
  "Sc": "\u2ABC",
  "Scaron": "\u0160",
  "Scedil": "\u015E",
  "Scirc": "\u015C",
  "Scy": "\u0421",
  "Sfr": "\u{1D516}",
  "ShortUpArrow": "\u2191",
  "UpArrow": "\u2191",
  "uarr": "\u2191",
  "uparrow": "\u2191",
  "Sigma": "\u03A3",
  "SmallCircle": "\u2218",
  "compfn": "\u2218",
  "Sopf": "\u{1D54A}",
  "Sqrt": "\u221A",
  "radic": "\u221A",
  "Square": "\u25A1",
  "squ": "\u25A1",
  "square": "\u25A1",
  "SquareIntersection": "\u2293",
  "sqcap": "\u2293",
  "SquareSubset": "\u228F",
  "sqsub": "\u228F",
  "sqsubset": "\u228F",
  "SquareSubsetEqual": "\u2291",
  "sqsube": "\u2291",
  "sqsubseteq": "\u2291",
  "SquareSuperset": "\u2290",
  "sqsup": "\u2290",
  "sqsupset": "\u2290",
  "SquareSupersetEqual": "\u2292",
  "sqsupe": "\u2292",
  "sqsupseteq": "\u2292",
  "SquareUnion": "\u2294",
  "sqcup": "\u2294",
  "Sscr": "\u{1D4AE}",
  "Star": "\u22C6",
  "sstarf": "\u22C6",
  "Sub": "\u22D0",
  "Subset": "\u22D0",
  "SubsetEqual": "\u2286",
  "sube": "\u2286",
  "subseteq": "\u2286",
  "Succeeds": "\u227B",
  "sc": "\u227B",
  "succ": "\u227B",
  "SucceedsEqual": "\u2AB0",
  "sce": "\u2AB0",
  "succeq": "\u2AB0",
  "SucceedsSlantEqual": "\u227D",
  "sccue": "\u227D",
  "succcurlyeq": "\u227D",
  "SucceedsTilde": "\u227F",
  "scsim": "\u227F",
  "succsim": "\u227F",
  "Sum": "\u2211",
  "sum": "\u2211",
  "Sup": "\u22D1",
  "Supset": "\u22D1",
  "Superset": "\u2283",
  "sup": "\u2283",
  "supset": "\u2283",
  "SupersetEqual": "\u2287",
  "supe": "\u2287",
  "supseteq": "\u2287",
  "THORN": "\xDE",
  "TRADE": "\u2122",
  "trade": "\u2122",
  "TSHcy": "\u040B",
  "TScy": "\u0426",
  "Tab": "	",
  "Tau": "\u03A4",
  "Tcaron": "\u0164",
  "Tcedil": "\u0162",
  "Tcy": "\u0422",
  "Tfr": "\u{1D517}",
  "Therefore": "\u2234",
  "there4": "\u2234",
  "therefore": "\u2234",
  "Theta": "\u0398",
  "ThickSpace": "\u205F\u200A",
  "ThinSpace": "\u2009",
  "thinsp": "\u2009",
  "Tilde": "\u223C",
  "sim": "\u223C",
  "thicksim": "\u223C",
  "thksim": "\u223C",
  "TildeEqual": "\u2243",
  "sime": "\u2243",
  "simeq": "\u2243",
  "TildeFullEqual": "\u2245",
  "cong": "\u2245",
  "TildeTilde": "\u2248",
  "ap": "\u2248",
  "approx": "\u2248",
  "asymp": "\u2248",
  "thickapprox": "\u2248",
  "thkap": "\u2248",
  "Topf": "\u{1D54B}",
  "TripleDot": "\u20DB",
  "tdot": "\u20DB",
  "Tscr": "\u{1D4AF}",
  "Tstrok": "\u0166",
  "Uacute": "\xDA",
  "Uarr": "\u219F",
  "Uarrocir": "\u2949",
  "Ubrcy": "\u040E",
  "Ubreve": "\u016C",
  "Ucirc": "\xDB",
  "Ucy": "\u0423",
  "Udblac": "\u0170",
  "Ufr": "\u{1D518}",
  "Ugrave": "\xD9",
  "Umacr": "\u016A",
  "UnderBar": "_",
  "lowbar": "_",
  "UnderBrace": "\u23DF",
  "UnderBracket": "\u23B5",
  "bbrk": "\u23B5",
  "UnderParenthesis": "\u23DD",
  "Union": "\u22C3",
  "bigcup": "\u22C3",
  "xcup": "\u22C3",
  "UnionPlus": "\u228E",
  "uplus": "\u228E",
  "Uogon": "\u0172",
  "Uopf": "\u{1D54C}",
  "UpArrowBar": "\u2912",
  "UpArrowDownArrow": "\u21C5",
  "udarr": "\u21C5",
  "UpDownArrow": "\u2195",
  "updownarrow": "\u2195",
  "varr": "\u2195",
  "UpEquilibrium": "\u296E",
  "udhar": "\u296E",
  "UpTee": "\u22A5",
  "bot": "\u22A5",
  "bottom": "\u22A5",
  "perp": "\u22A5",
  "UpTeeArrow": "\u21A5",
  "mapstoup": "\u21A5",
  "UpperLeftArrow": "\u2196",
  "nwarr": "\u2196",
  "nwarrow": "\u2196",
  "UpperRightArrow": "\u2197",
  "nearr": "\u2197",
  "nearrow": "\u2197",
  "Upsi": "\u03D2",
  "upsih": "\u03D2",
  "Upsilon": "\u03A5",
  "Uring": "\u016E",
  "Uscr": "\u{1D4B0}",
  "Utilde": "\u0168",
  "Uuml": "\xDC",
  "VDash": "\u22AB",
  "Vbar": "\u2AEB",
  "Vcy": "\u0412",
  "Vdash": "\u22A9",
  "Vdashl": "\u2AE6",
  "Vee": "\u22C1",
  "bigvee": "\u22C1",
  "xvee": "\u22C1",
  "Verbar": "\u2016",
  "Vert": "\u2016",
  "VerticalBar": "\u2223",
  "mid": "\u2223",
  "shortmid": "\u2223",
  "smid": "\u2223",
  "VerticalLine": "|",
  "verbar": "|",
  "vert": "|",
  "VerticalSeparator": "\u2758",
  "VerticalTilde": "\u2240",
  "wr": "\u2240",
  "wreath": "\u2240",
  "VeryThinSpace": "\u200A",
  "hairsp": "\u200A",
  "Vfr": "\u{1D519}",
  "Vopf": "\u{1D54D}",
  "Vscr": "\u{1D4B1}",
  "Vvdash": "\u22AA",
  "Wcirc": "\u0174",
  "Wedge": "\u22C0",
  "bigwedge": "\u22C0",
  "xwedge": "\u22C0",
  "Wfr": "\u{1D51A}",
  "Wopf": "\u{1D54E}",
  "Wscr": "\u{1D4B2}",
  "Xfr": "\u{1D51B}",
  "Xi": "\u039E",
  "Xopf": "\u{1D54F}",
  "Xscr": "\u{1D4B3}",
  "YAcy": "\u042F",
  "YIcy": "\u0407",
  "YUcy": "\u042E",
  "Yacute": "\xDD",
  "Ycirc": "\u0176",
  "Ycy": "\u042B",
  "Yfr": "\u{1D51C}",
  "Yopf": "\u{1D550}",
  "Yscr": "\u{1D4B4}",
  "Yuml": "\u0178",
  "ZHcy": "\u0416",
  "Zacute": "\u0179",
  "Zcaron": "\u017D",
  "Zcy": "\u0417",
  "Zdot": "\u017B",
  "Zeta": "\u0396",
  "Zfr": "\u2128",
  "zeetrf": "\u2128",
  "Zopf": "\u2124",
  "integers": "\u2124",
  "Zscr": "\u{1D4B5}",
  "aacute": "\xE1",
  "abreve": "\u0103",
  "ac": "\u223E",
  "mstpos": "\u223E",
  "acE": "\u223E\u0333",
  "acd": "\u223F",
  "acirc": "\xE2",
  "acy": "\u0430",
  "aelig": "\xE6",
  "afr": "\u{1D51E}",
  "agrave": "\xE0",
  "alefsym": "\u2135",
  "aleph": "\u2135",
  "alpha": "\u03B1",
  "amacr": "\u0101",
  "amalg": "\u2A3F",
  "and": "\u2227",
  "wedge": "\u2227",
  "andand": "\u2A55",
  "andd": "\u2A5C",
  "andslope": "\u2A58",
  "andv": "\u2A5A",
  "ang": "\u2220",
  "angle": "\u2220",
  "ange": "\u29A4",
  "angmsd": "\u2221",
  "measuredangle": "\u2221",
  "angmsdaa": "\u29A8",
  "angmsdab": "\u29A9",
  "angmsdac": "\u29AA",
  "angmsdad": "\u29AB",
  "angmsdae": "\u29AC",
  "angmsdaf": "\u29AD",
  "angmsdag": "\u29AE",
  "angmsdah": "\u29AF",
  "angrt": "\u221F",
  "angrtvb": "\u22BE",
  "angrtvbd": "\u299D",
  "angsph": "\u2222",
  "angzarr": "\u237C",
  "aogon": "\u0105",
  "aopf": "\u{1D552}",
  "apE": "\u2A70",
  "apacir": "\u2A6F",
  "ape": "\u224A",
  "approxeq": "\u224A",
  "apid": "\u224B",
  "apos": "'",
  "aring": "\xE5",
  "ascr": "\u{1D4B6}",
  "ast": "*",
  "midast": "*",
  "atilde": "\xE3",
  "auml": "\xE4",
  "awint": "\u2A11",
  "bNot": "\u2AED",
  "backcong": "\u224C",
  "bcong": "\u224C",
  "backepsilon": "\u03F6",
  "bepsi": "\u03F6",
  "backprime": "\u2035",
  "bprime": "\u2035",
  "backsim": "\u223D",
  "bsim": "\u223D",
  "backsimeq": "\u22CD",
  "bsime": "\u22CD",
  "barvee": "\u22BD",
  "barwed": "\u2305",
  "barwedge": "\u2305",
  "bbrktbrk": "\u23B6",
  "bcy": "\u0431",
  "bdquo": "\u201E",
  "ldquor": "\u201E",
  "bemptyv": "\u29B0",
  "beta": "\u03B2",
  "beth": "\u2136",
  "between": "\u226C",
  "twixt": "\u226C",
  "bfr": "\u{1D51F}",
  "bigcirc": "\u25EF",
  "xcirc": "\u25EF",
  "bigodot": "\u2A00",
  "xodot": "\u2A00",
  "bigoplus": "\u2A01",
  "xoplus": "\u2A01",
  "bigotimes": "\u2A02",
  "xotime": "\u2A02",
  "bigsqcup": "\u2A06",
  "xsqcup": "\u2A06",
  "bigstar": "\u2605",
  "starf": "\u2605",
  "bigtriangledown": "\u25BD",
  "xdtri": "\u25BD",
  "bigtriangleup": "\u25B3",
  "xutri": "\u25B3",
  "biguplus": "\u2A04",
  "xuplus": "\u2A04",
  "bkarow": "\u290D",
  "rbarr": "\u290D",
  "blacklozenge": "\u29EB",
  "lozf": "\u29EB",
  "blacktriangle": "\u25B4",
  "utrif": "\u25B4",
  "blacktriangledown": "\u25BE",
  "dtrif": "\u25BE",
  "blacktriangleleft": "\u25C2",
  "ltrif": "\u25C2",
  "blacktriangleright": "\u25B8",
  "rtrif": "\u25B8",
  "blank": "\u2423",
  "blk12": "\u2592",
  "blk14": "\u2591",
  "blk34": "\u2593",
  "block": "\u2588",
  "bne": "=\u20E5",
  "bnequiv": "\u2261\u20E5",
  "bnot": "\u2310",
  "bopf": "\u{1D553}",
  "bowtie": "\u22C8",
  "boxDL": "\u2557",
  "boxDR": "\u2554",
  "boxDl": "\u2556",
  "boxDr": "\u2553",
  "boxH": "\u2550",
  "boxHD": "\u2566",
  "boxHU": "\u2569",
  "boxHd": "\u2564",
  "boxHu": "\u2567",
  "boxUL": "\u255D",
  "boxUR": "\u255A",
  "boxUl": "\u255C",
  "boxUr": "\u2559",
  "boxV": "\u2551",
  "boxVH": "\u256C",
  "boxVL": "\u2563",
  "boxVR": "\u2560",
  "boxVh": "\u256B",
  "boxVl": "\u2562",
  "boxVr": "\u255F",
  "boxbox": "\u29C9",
  "boxdL": "\u2555",
  "boxdR": "\u2552",
  "boxdl": "\u2510",
  "boxdr": "\u250C",
  "boxhD": "\u2565",
  "boxhU": "\u2568",
  "boxhd": "\u252C",
  "boxhu": "\u2534",
  "boxminus": "\u229F",
  "minusb": "\u229F",
  "boxplus": "\u229E",
  "plusb": "\u229E",
  "boxtimes": "\u22A0",
  "timesb": "\u22A0",
  "boxuL": "\u255B",
  "boxuR": "\u2558",
  "boxul": "\u2518",
  "boxur": "\u2514",
  "boxv": "\u2502",
  "boxvH": "\u256A",
  "boxvL": "\u2561",
  "boxvR": "\u255E",
  "boxvh": "\u253C",
  "boxvl": "\u2524",
  "boxvr": "\u251C",
  "brvbar": "\xA6",
  "bscr": "\u{1D4B7}",
  "bsemi": "\u204F",
  "bsol": "\\",
  "bsolb": "\u29C5",
  "bsolhsub": "\u27C8",
  "bull": "\u2022",
  "bullet": "\u2022",
  "bumpE": "\u2AAE",
  "cacute": "\u0107",
  "cap": "\u2229",
  "capand": "\u2A44",
  "capbrcup": "\u2A49",
  "capcap": "\u2A4B",
  "capcup": "\u2A47",
  "capdot": "\u2A40",
  "caps": "\u2229\uFE00",
  "caret": "\u2041",
  "ccaps": "\u2A4D",
  "ccaron": "\u010D",
  "ccedil": "\xE7",
  "ccirc": "\u0109",
  "ccups": "\u2A4C",
  "ccupssm": "\u2A50",
  "cdot": "\u010B",
  "cemptyv": "\u29B2",
  "cent": "\xA2",
  "cfr": "\u{1D520}",
  "chcy": "\u0447",
  "check": "\u2713",
  "checkmark": "\u2713",
  "chi": "\u03C7",
  "cir": "\u25CB",
  "cirE": "\u29C3",
  "circ": "\u02C6",
  "circeq": "\u2257",
  "cire": "\u2257",
  "circlearrowleft": "\u21BA",
  "olarr": "\u21BA",
  "circlearrowright": "\u21BB",
  "orarr": "\u21BB",
  "circledS": "\u24C8",
  "oS": "\u24C8",
  "circledast": "\u229B",
  "oast": "\u229B",
  "circledcirc": "\u229A",
  "ocir": "\u229A",
  "circleddash": "\u229D",
  "odash": "\u229D",
  "cirfnint": "\u2A10",
  "cirmid": "\u2AEF",
  "cirscir": "\u29C2",
  "clubs": "\u2663",
  "clubsuit": "\u2663",
  "colon": ":",
  "comma": ",",
  "commat": "@",
  "comp": "\u2201",
  "complement": "\u2201",
  "congdot": "\u2A6D",
  "copf": "\u{1D554}",
  "copysr": "\u2117",
  "crarr": "\u21B5",
  "cross": "\u2717",
  "cscr": "\u{1D4B8}",
  "csub": "\u2ACF",
  "csube": "\u2AD1",
  "csup": "\u2AD0",
  "csupe": "\u2AD2",
  "ctdot": "\u22EF",
  "cudarrl": "\u2938",
  "cudarrr": "\u2935",
  "cuepr": "\u22DE",
  "curlyeqprec": "\u22DE",
  "cuesc": "\u22DF",
  "curlyeqsucc": "\u22DF",
  "cularr": "\u21B6",
  "curvearrowleft": "\u21B6",
  "cularrp": "\u293D",
  "cup": "\u222A",
  "cupbrcap": "\u2A48",
  "cupcap": "\u2A46",
  "cupcup": "\u2A4A",
  "cupdot": "\u228D",
  "cupor": "\u2A45",
  "cups": "\u222A\uFE00",
  "curarr": "\u21B7",
  "curvearrowright": "\u21B7",
  "curarrm": "\u293C",
  "curlyvee": "\u22CE",
  "cuvee": "\u22CE",
  "curlywedge": "\u22CF",
  "cuwed": "\u22CF",
  "curren": "\xA4",
  "cwint": "\u2231",
  "cylcty": "\u232D",
  "dHar": "\u2965",
  "dagger": "\u2020",
  "daleth": "\u2138",
  "dash": "\u2010",
  "hyphen": "\u2010",
  "dbkarow": "\u290F",
  "rBarr": "\u290F",
  "dcaron": "\u010F",
  "dcy": "\u0434",
  "ddarr": "\u21CA",
  "downdownarrows": "\u21CA",
  "ddotseq": "\u2A77",
  "eDDot": "\u2A77",
  "deg": "\xB0",
  "delta": "\u03B4",
  "demptyv": "\u29B1",
  "dfisht": "\u297F",
  "dfr": "\u{1D521}",
  "diamondsuit": "\u2666",
  "diams": "\u2666",
  "digamma": "\u03DD",
  "gammad": "\u03DD",
  "disin": "\u22F2",
  "div": "\xF7",
  "divide": "\xF7",
  "divideontimes": "\u22C7",
  "divonx": "\u22C7",
  "djcy": "\u0452",
  "dlcorn": "\u231E",
  "llcorner": "\u231E",
  "dlcrop": "\u230D",
  "dollar": "$",
  "dopf": "\u{1D555}",
  "doteqdot": "\u2251",
  "eDot": "\u2251",
  "dotminus": "\u2238",
  "minusd": "\u2238",
  "dotplus": "\u2214",
  "plusdo": "\u2214",
  "dotsquare": "\u22A1",
  "sdotb": "\u22A1",
  "drcorn": "\u231F",
  "lrcorner": "\u231F",
  "drcrop": "\u230C",
  "dscr": "\u{1D4B9}",
  "dscy": "\u0455",
  "dsol": "\u29F6",
  "dstrok": "\u0111",
  "dtdot": "\u22F1",
  "dtri": "\u25BF",
  "triangledown": "\u25BF",
  "dwangle": "\u29A6",
  "dzcy": "\u045F",
  "dzigrarr": "\u27FF",
  "eacute": "\xE9",
  "easter": "\u2A6E",
  "ecaron": "\u011B",
  "ecir": "\u2256",
  "eqcirc": "\u2256",
  "ecirc": "\xEA",
  "ecolon": "\u2255",
  "eqcolon": "\u2255",
  "ecy": "\u044D",
  "edot": "\u0117",
  "efDot": "\u2252",
  "fallingdotseq": "\u2252",
  "efr": "\u{1D522}",
  "eg": "\u2A9A",
  "egrave": "\xE8",
  "egs": "\u2A96",
  "eqslantgtr": "\u2A96",
  "egsdot": "\u2A98",
  "el": "\u2A99",
  "elinters": "\u23E7",
  "ell": "\u2113",
  "els": "\u2A95",
  "eqslantless": "\u2A95",
  "elsdot": "\u2A97",
  "emacr": "\u0113",
  "empty": "\u2205",
  "emptyset": "\u2205",
  "emptyv": "\u2205",
  "varnothing": "\u2205",
  "emsp13": "\u2004",
  "emsp14": "\u2005",
  "emsp": "\u2003",
  "eng": "\u014B",
  "ensp": "\u2002",
  "eogon": "\u0119",
  "eopf": "\u{1D556}",
  "epar": "\u22D5",
  "eparsl": "\u29E3",
  "eplus": "\u2A71",
  "epsi": "\u03B5",
  "epsilon": "\u03B5",
  "epsiv": "\u03F5",
  "straightepsilon": "\u03F5",
  "varepsilon": "\u03F5",
  "equals": "=",
  "equest": "\u225F",
  "questeq": "\u225F",
  "equivDD": "\u2A78",
  "eqvparsl": "\u29E5",
  "erDot": "\u2253",
  "risingdotseq": "\u2253",
  "erarr": "\u2971",
  "escr": "\u212F",
  "eta": "\u03B7",
  "eth": "\xF0",
  "euml": "\xEB",
  "euro": "\u20AC",
  "excl": "!",
  "fcy": "\u0444",
  "female": "\u2640",
  "ffilig": "\uFB03",
  "fflig": "\uFB00",
  "ffllig": "\uFB04",
  "ffr": "\u{1D523}",
  "filig": "\uFB01",
  "fjlig": "fj",
  "flat": "\u266D",
  "fllig": "\uFB02",
  "fltns": "\u25B1",
  "fnof": "\u0192",
  "fopf": "\u{1D557}",
  "fork": "\u22D4",
  "pitchfork": "\u22D4",
  "forkv": "\u2AD9",
  "fpartint": "\u2A0D",
  "frac12": "\xBD",
  "half": "\xBD",
  "frac13": "\u2153",
  "frac14": "\xBC",
  "frac15": "\u2155",
  "frac16": "\u2159",
  "frac18": "\u215B",
  "frac23": "\u2154",
  "frac25": "\u2156",
  "frac34": "\xBE",
  "frac35": "\u2157",
  "frac38": "\u215C",
  "frac45": "\u2158",
  "frac56": "\u215A",
  "frac58": "\u215D",
  "frac78": "\u215E",
  "frasl": "\u2044",
  "frown": "\u2322",
  "sfrown": "\u2322",
  "fscr": "\u{1D4BB}",
  "gEl": "\u2A8C",
  "gtreqqless": "\u2A8C",
  "gacute": "\u01F5",
  "gamma": "\u03B3",
  "gap": "\u2A86",
  "gtrapprox": "\u2A86",
  "gbreve": "\u011F",
  "gcirc": "\u011D",
  "gcy": "\u0433",
  "gdot": "\u0121",
  "gescc": "\u2AA9",
  "gesdot": "\u2A80",
  "gesdoto": "\u2A82",
  "gesdotol": "\u2A84",
  "gesl": "\u22DB\uFE00",
  "gesles": "\u2A94",
  "gfr": "\u{1D524}",
  "gimel": "\u2137",
  "gjcy": "\u0453",
  "glE": "\u2A92",
  "gla": "\u2AA5",
  "glj": "\u2AA4",
  "gnE": "\u2269",
  "gneqq": "\u2269",
  "gnap": "\u2A8A",
  "gnapprox": "\u2A8A",
  "gne": "\u2A88",
  "gneq": "\u2A88",
  "gnsim": "\u22E7",
  "gopf": "\u{1D558}",
  "gscr": "\u210A",
  "gsime": "\u2A8E",
  "gsiml": "\u2A90",
  "gtcc": "\u2AA7",
  "gtcir": "\u2A7A",
  "gtdot": "\u22D7",
  "gtrdot": "\u22D7",
  "gtlPar": "\u2995",
  "gtquest": "\u2A7C",
  "gtrarr": "\u2978",
  "gvertneqq": "\u2269\uFE00",
  "gvnE": "\u2269\uFE00",
  "hardcy": "\u044A",
  "harrcir": "\u2948",
  "harrw": "\u21AD",
  "leftrightsquigarrow": "\u21AD",
  "hbar": "\u210F",
  "hslash": "\u210F",
  "planck": "\u210F",
  "plankv": "\u210F",
  "hcirc": "\u0125",
  "hearts": "\u2665",
  "heartsuit": "\u2665",
  "hellip": "\u2026",
  "mldr": "\u2026",
  "hercon": "\u22B9",
  "hfr": "\u{1D525}",
  "hksearow": "\u2925",
  "searhk": "\u2925",
  "hkswarow": "\u2926",
  "swarhk": "\u2926",
  "hoarr": "\u21FF",
  "homtht": "\u223B",
  "hookleftarrow": "\u21A9",
  "larrhk": "\u21A9",
  "hookrightarrow": "\u21AA",
  "rarrhk": "\u21AA",
  "hopf": "\u{1D559}",
  "horbar": "\u2015",
  "hscr": "\u{1D4BD}",
  "hstrok": "\u0127",
  "hybull": "\u2043",
  "iacute": "\xED",
  "icirc": "\xEE",
  "icy": "\u0438",
  "iecy": "\u0435",
  "iexcl": "\xA1",
  "ifr": "\u{1D526}",
  "igrave": "\xEC",
  "iiiint": "\u2A0C",
  "qint": "\u2A0C",
  "iiint": "\u222D",
  "tint": "\u222D",
  "iinfin": "\u29DC",
  "iiota": "\u2129",
  "ijlig": "\u0133",
  "imacr": "\u012B",
  "imath": "\u0131",
  "inodot": "\u0131",
  "imof": "\u22B7",
  "imped": "\u01B5",
  "incare": "\u2105",
  "infin": "\u221E",
  "infintie": "\u29DD",
  "intcal": "\u22BA",
  "intercal": "\u22BA",
  "intlarhk": "\u2A17",
  "intprod": "\u2A3C",
  "iprod": "\u2A3C",
  "iocy": "\u0451",
  "iogon": "\u012F",
  "iopf": "\u{1D55A}",
  "iota": "\u03B9",
  "iquest": "\xBF",
  "iscr": "\u{1D4BE}",
  "isinE": "\u22F9",
  "isindot": "\u22F5",
  "isins": "\u22F4",
  "isinsv": "\u22F3",
  "itilde": "\u0129",
  "iukcy": "\u0456",
  "iuml": "\xEF",
  "jcirc": "\u0135",
  "jcy": "\u0439",
  "jfr": "\u{1D527}",
  "jmath": "\u0237",
  "jopf": "\u{1D55B}",
  "jscr": "\u{1D4BF}",
  "jsercy": "\u0458",
  "jukcy": "\u0454",
  "kappa": "\u03BA",
  "kappav": "\u03F0",
  "varkappa": "\u03F0",
  "kcedil": "\u0137",
  "kcy": "\u043A",
  "kfr": "\u{1D528}",
  "kgreen": "\u0138",
  "khcy": "\u0445",
  "kjcy": "\u045C",
  "kopf": "\u{1D55C}",
  "kscr": "\u{1D4C0}",
  "lAtail": "\u291B",
  "lBarr": "\u290E",
  "lEg": "\u2A8B",
  "lesseqqgtr": "\u2A8B",
  "lHar": "\u2962",
  "lacute": "\u013A",
  "laemptyv": "\u29B4",
  "lambda": "\u03BB",
  "langd": "\u2991",
  "lap": "\u2A85",
  "lessapprox": "\u2A85",
  "laquo": "\xAB",
  "larrbfs": "\u291F",
  "larrfs": "\u291D",
  "larrlp": "\u21AB",
  "looparrowleft": "\u21AB",
  "larrpl": "\u2939",
  "larrsim": "\u2973",
  "larrtl": "\u21A2",
  "leftarrowtail": "\u21A2",
  "lat": "\u2AAB",
  "latail": "\u2919",
  "late": "\u2AAD",
  "lates": "\u2AAD\uFE00",
  "lbarr": "\u290C",
  "lbbrk": "\u2772",
  "lbrace": "{",
  "lcub": "{",
  "lbrack": "[",
  "lsqb": "[",
  "lbrke": "\u298B",
  "lbrksld": "\u298F",
  "lbrkslu": "\u298D",
  "lcaron": "\u013E",
  "lcedil": "\u013C",
  "lcy": "\u043B",
  "ldca": "\u2936",
  "ldrdhar": "\u2967",
  "ldrushar": "\u294B",
  "ldsh": "\u21B2",
  "le": "\u2264",
  "leq": "\u2264",
  "leftleftarrows": "\u21C7",
  "llarr": "\u21C7",
  "leftthreetimes": "\u22CB",
  "lthree": "\u22CB",
  "lescc": "\u2AA8",
  "lesdot": "\u2A7F",
  "lesdoto": "\u2A81",
  "lesdotor": "\u2A83",
  "lesg": "\u22DA\uFE00",
  "lesges": "\u2A93",
  "lessdot": "\u22D6",
  "ltdot": "\u22D6",
  "lfisht": "\u297C",
  "lfr": "\u{1D529}",
  "lgE": "\u2A91",
  "lharul": "\u296A",
  "lhblk": "\u2584",
  "ljcy": "\u0459",
  "llhard": "\u296B",
  "lltri": "\u25FA",
  "lmidot": "\u0140",
  "lmoust": "\u23B0",
  "lmoustache": "\u23B0",
  "lnE": "\u2268",
  "lneqq": "\u2268",
  "lnap": "\u2A89",
  "lnapprox": "\u2A89",
  "lne": "\u2A87",
  "lneq": "\u2A87",
  "lnsim": "\u22E6",
  "loang": "\u27EC",
  "loarr": "\u21FD",
  "longmapsto": "\u27FC",
  "xmap": "\u27FC",
  "looparrowright": "\u21AC",
  "rarrlp": "\u21AC",
  "lopar": "\u2985",
  "lopf": "\u{1D55D}",
  "loplus": "\u2A2D",
  "lotimes": "\u2A34",
  "lowast": "\u2217",
  "loz": "\u25CA",
  "lozenge": "\u25CA",
  "lpar": "(",
  "lparlt": "\u2993",
  "lrhard": "\u296D",
  "lrm": "\u200E",
  "lrtri": "\u22BF",
  "lsaquo": "\u2039",
  "lscr": "\u{1D4C1}",
  "lsime": "\u2A8D",
  "lsimg": "\u2A8F",
  "lsquor": "\u201A",
  "sbquo": "\u201A",
  "lstrok": "\u0142",
  "ltcc": "\u2AA6",
  "ltcir": "\u2A79",
  "ltimes": "\u22C9",
  "ltlarr": "\u2976",
  "ltquest": "\u2A7B",
  "ltrPar": "\u2996",
  "ltri": "\u25C3",
  "triangleleft": "\u25C3",
  "lurdshar": "\u294A",
  "luruhar": "\u2966",
  "lvertneqq": "\u2268\uFE00",
  "lvnE": "\u2268\uFE00",
  "mDDot": "\u223A",
  "macr": "\xAF",
  "strns": "\xAF",
  "male": "\u2642",
  "malt": "\u2720",
  "maltese": "\u2720",
  "marker": "\u25AE",
  "mcomma": "\u2A29",
  "mcy": "\u043C",
  "mdash": "\u2014",
  "mfr": "\u{1D52A}",
  "mho": "\u2127",
  "micro": "\xB5",
  "midcir": "\u2AF0",
  "minus": "\u2212",
  "minusdu": "\u2A2A",
  "mlcp": "\u2ADB",
  "models": "\u22A7",
  "mopf": "\u{1D55E}",
  "mscr": "\u{1D4C2}",
  "mu": "\u03BC",
  "multimap": "\u22B8",
  "mumap": "\u22B8",
  "nGg": "\u22D9\u0338",
  "nGt": "\u226B\u20D2",
  "nLeftarrow": "\u21CD",
  "nlArr": "\u21CD",
  "nLeftrightarrow": "\u21CE",
  "nhArr": "\u21CE",
  "nLl": "\u22D8\u0338",
  "nLt": "\u226A\u20D2",
  "nRightarrow": "\u21CF",
  "nrArr": "\u21CF",
  "nVDash": "\u22AF",
  "nVdash": "\u22AE",
  "nacute": "\u0144",
  "nang": "\u2220\u20D2",
  "napE": "\u2A70\u0338",
  "napid": "\u224B\u0338",
  "napos": "\u0149",
  "natur": "\u266E",
  "natural": "\u266E",
  "ncap": "\u2A43",
  "ncaron": "\u0148",
  "ncedil": "\u0146",
  "ncongdot": "\u2A6D\u0338",
  "ncup": "\u2A42",
  "ncy": "\u043D",
  "ndash": "\u2013",
  "neArr": "\u21D7",
  "nearhk": "\u2924",
  "nedot": "\u2250\u0338",
  "nesear": "\u2928",
  "toea": "\u2928",
  "nfr": "\u{1D52B}",
  "nharr": "\u21AE",
  "nleftrightarrow": "\u21AE",
  "nhpar": "\u2AF2",
  "nis": "\u22FC",
  "nisd": "\u22FA",
  "njcy": "\u045A",
  "nlE": "\u2266\u0338",
  "nleqq": "\u2266\u0338",
  "nlarr": "\u219A",
  "nleftarrow": "\u219A",
  "nldr": "\u2025",
  "nopf": "\u{1D55F}",
  "not": "\xAC",
  "notinE": "\u22F9\u0338",
  "notindot": "\u22F5\u0338",
  "notinvb": "\u22F7",
  "notinvc": "\u22F6",
  "notnivb": "\u22FE",
  "notnivc": "\u22FD",
  "nparsl": "\u2AFD\u20E5",
  "npart": "\u2202\u0338",
  "npolint": "\u2A14",
  "nrarr": "\u219B",
  "nrightarrow": "\u219B",
  "nrarrc": "\u2933\u0338",
  "nrarrw": "\u219D\u0338",
  "nscr": "\u{1D4C3}",
  "nsub": "\u2284",
  "nsubE": "\u2AC5\u0338",
  "nsubseteqq": "\u2AC5\u0338",
  "nsup": "\u2285",
  "nsupE": "\u2AC6\u0338",
  "nsupseteqq": "\u2AC6\u0338",
  "ntilde": "\xF1",
  "nu": "\u03BD",
  "num": "#",
  "numero": "\u2116",
  "numsp": "\u2007",
  "nvDash": "\u22AD",
  "nvHarr": "\u2904",
  "nvap": "\u224D\u20D2",
  "nvdash": "\u22AC",
  "nvge": "\u2265\u20D2",
  "nvgt": ">\u20D2",
  "nvinfin": "\u29DE",
  "nvlArr": "\u2902",
  "nvle": "\u2264\u20D2",
  "nvlt": "<\u20D2",
  "nvltrie": "\u22B4\u20D2",
  "nvrArr": "\u2903",
  "nvrtrie": "\u22B5\u20D2",
  "nvsim": "\u223C\u20D2",
  "nwArr": "\u21D6",
  "nwarhk": "\u2923",
  "nwnear": "\u2927",
  "oacute": "\xF3",
  "ocirc": "\xF4",
  "ocy": "\u043E",
  "odblac": "\u0151",
  "odiv": "\u2A38",
  "odsold": "\u29BC",
  "oelig": "\u0153",
  "ofcir": "\u29BF",
  "ofr": "\u{1D52C}",
  "ogon": "\u02DB",
  "ograve": "\xF2",
  "ogt": "\u29C1",
  "ohbar": "\u29B5",
  "olcir": "\u29BE",
  "olcross": "\u29BB",
  "olt": "\u29C0",
  "omacr": "\u014D",
  "omega": "\u03C9",
  "omicron": "\u03BF",
  "omid": "\u29B6",
  "oopf": "\u{1D560}",
  "opar": "\u29B7",
  "operp": "\u29B9",
  "or": "\u2228",
  "vee": "\u2228",
  "ord": "\u2A5D",
  "order": "\u2134",
  "orderof": "\u2134",
  "oscr": "\u2134",
  "ordf": "\xAA",
  "ordm": "\xBA",
  "origof": "\u22B6",
  "oror": "\u2A56",
  "orslope": "\u2A57",
  "orv": "\u2A5B",
  "oslash": "\xF8",
  "osol": "\u2298",
  "otilde": "\xF5",
  "otimesas": "\u2A36",
  "ouml": "\xF6",
  "ovbar": "\u233D",
  "para": "\xB6",
  "parsim": "\u2AF3",
  "parsl": "\u2AFD",
  "pcy": "\u043F",
  "percnt": "%",
  "period": ".",
  "permil": "\u2030",
  "pertenk": "\u2031",
  "pfr": "\u{1D52D}",
  "phi": "\u03C6",
  "phiv": "\u03D5",
  "straightphi": "\u03D5",
  "varphi": "\u03D5",
  "phone": "\u260E",
  "pi": "\u03C0",
  "piv": "\u03D6",
  "varpi": "\u03D6",
  "planckh": "\u210E",
  "plus": "+",
  "plusacir": "\u2A23",
  "pluscir": "\u2A22",
  "plusdu": "\u2A25",
  "pluse": "\u2A72",
  "plussim": "\u2A26",
  "plustwo": "\u2A27",
  "pointint": "\u2A15",
  "popf": "\u{1D561}",
  "pound": "\xA3",
  "prE": "\u2AB3",
  "prap": "\u2AB7",
  "precapprox": "\u2AB7",
  "precnapprox": "\u2AB9",
  "prnap": "\u2AB9",
  "precneqq": "\u2AB5",
  "prnE": "\u2AB5",
  "precnsim": "\u22E8",
  "prnsim": "\u22E8",
  "prime": "\u2032",
  "profalar": "\u232E",
  "profline": "\u2312",
  "profsurf": "\u2313",
  "prurel": "\u22B0",
  "pscr": "\u{1D4C5}",
  "psi": "\u03C8",
  "puncsp": "\u2008",
  "qfr": "\u{1D52E}",
  "qopf": "\u{1D562}",
  "qprime": "\u2057",
  "qscr": "\u{1D4C6}",
  "quatint": "\u2A16",
  "quest": "?",
  "rAtail": "\u291C",
  "rHar": "\u2964",
  "race": "\u223D\u0331",
  "racute": "\u0155",
  "raemptyv": "\u29B3",
  "rangd": "\u2992",
  "range": "\u29A5",
  "raquo": "\xBB",
  "rarrap": "\u2975",
  "rarrbfs": "\u2920",
  "rarrc": "\u2933",
  "rarrfs": "\u291E",
  "rarrpl": "\u2945",
  "rarrsim": "\u2974",
  "rarrtl": "\u21A3",
  "rightarrowtail": "\u21A3",
  "rarrw": "\u219D",
  "rightsquigarrow": "\u219D",
  "ratail": "\u291A",
  "ratio": "\u2236",
  "rbbrk": "\u2773",
  "rbrace": "}",
  "rcub": "}",
  "rbrack": "]",
  "rsqb": "]",
  "rbrke": "\u298C",
  "rbrksld": "\u298E",
  "rbrkslu": "\u2990",
  "rcaron": "\u0159",
  "rcedil": "\u0157",
  "rcy": "\u0440",
  "rdca": "\u2937",
  "rdldhar": "\u2969",
  "rdsh": "\u21B3",
  "rect": "\u25AD",
  "rfisht": "\u297D",
  "rfr": "\u{1D52F}",
  "rharul": "\u296C",
  "rho": "\u03C1",
  "rhov": "\u03F1",
  "varrho": "\u03F1",
  "rightrightarrows": "\u21C9",
  "rrarr": "\u21C9",
  "rightthreetimes": "\u22CC",
  "rthree": "\u22CC",
  "ring": "\u02DA",
  "rlm": "\u200F",
  "rmoust": "\u23B1",
  "rmoustache": "\u23B1",
  "rnmid": "\u2AEE",
  "roang": "\u27ED",
  "roarr": "\u21FE",
  "ropar": "\u2986",
  "ropf": "\u{1D563}",
  "roplus": "\u2A2E",
  "rotimes": "\u2A35",
  "rpar": ")",
  "rpargt": "\u2994",
  "rppolint": "\u2A12",
  "rsaquo": "\u203A",
  "rscr": "\u{1D4C7}",
  "rtimes": "\u22CA",
  "rtri": "\u25B9",
  "triangleright": "\u25B9",
  "rtriltri": "\u29CE",
  "ruluhar": "\u2968",
  "rx": "\u211E",
  "sacute": "\u015B",
  "scE": "\u2AB4",
  "scap": "\u2AB8",
  "succapprox": "\u2AB8",
  "scaron": "\u0161",
  "scedil": "\u015F",
  "scirc": "\u015D",
  "scnE": "\u2AB6",
  "succneqq": "\u2AB6",
  "scnap": "\u2ABA",
  "succnapprox": "\u2ABA",
  "scnsim": "\u22E9",
  "succnsim": "\u22E9",
  "scpolint": "\u2A13",
  "scy": "\u0441",
  "sdot": "\u22C5",
  "sdote": "\u2A66",
  "seArr": "\u21D8",
  "sect": "\xA7",
  "semi": ";",
  "seswar": "\u2929",
  "tosa": "\u2929",
  "sext": "\u2736",
  "sfr": "\u{1D530}",
  "sharp": "\u266F",
  "shchcy": "\u0449",
  "shcy": "\u0448",
  "shy": "\xAD",
  "sigma": "\u03C3",
  "sigmaf": "\u03C2",
  "sigmav": "\u03C2",
  "varsigma": "\u03C2",
  "simdot": "\u2A6A",
  "simg": "\u2A9E",
  "simgE": "\u2AA0",
  "siml": "\u2A9D",
  "simlE": "\u2A9F",
  "simne": "\u2246",
  "simplus": "\u2A24",
  "simrarr": "\u2972",
  "smashp": "\u2A33",
  "smeparsl": "\u29E4",
  "smile": "\u2323",
  "ssmile": "\u2323",
  "smt": "\u2AAA",
  "smte": "\u2AAC",
  "smtes": "\u2AAC\uFE00",
  "softcy": "\u044C",
  "sol": "/",
  "solb": "\u29C4",
  "solbar": "\u233F",
  "sopf": "\u{1D564}",
  "spades": "\u2660",
  "spadesuit": "\u2660",
  "sqcaps": "\u2293\uFE00",
  "sqcups": "\u2294\uFE00",
  "sscr": "\u{1D4C8}",
  "star": "\u2606",
  "sub": "\u2282",
  "subset": "\u2282",
  "subE": "\u2AC5",
  "subseteqq": "\u2AC5",
  "subdot": "\u2ABD",
  "subedot": "\u2AC3",
  "submult": "\u2AC1",
  "subnE": "\u2ACB",
  "subsetneqq": "\u2ACB",
  "subne": "\u228A",
  "subsetneq": "\u228A",
  "subplus": "\u2ABF",
  "subrarr": "\u2979",
  "subsim": "\u2AC7",
  "subsub": "\u2AD5",
  "subsup": "\u2AD3",
  "sung": "\u266A",
  "sup1": "\xB9",
  "sup2": "\xB2",
  "sup3": "\xB3",
  "supE": "\u2AC6",
  "supseteqq": "\u2AC6",
  "supdot": "\u2ABE",
  "supdsub": "\u2AD8",
  "supedot": "\u2AC4",
  "suphsol": "\u27C9",
  "suphsub": "\u2AD7",
  "suplarr": "\u297B",
  "supmult": "\u2AC2",
  "supnE": "\u2ACC",
  "supsetneqq": "\u2ACC",
  "supne": "\u228B",
  "supsetneq": "\u228B",
  "supplus": "\u2AC0",
  "supsim": "\u2AC8",
  "supsub": "\u2AD4",
  "supsup": "\u2AD6",
  "swArr": "\u21D9",
  "swnwar": "\u292A",
  "szlig": "\xDF",
  "target": "\u2316",
  "tau": "\u03C4",
  "tcaron": "\u0165",
  "tcedil": "\u0163",
  "tcy": "\u0442",
  "telrec": "\u2315",
  "tfr": "\u{1D531}",
  "theta": "\u03B8",
  "thetasym": "\u03D1",
  "thetav": "\u03D1",
  "vartheta": "\u03D1",
  "thorn": "\xFE",
  "times": "\xD7",
  "timesbar": "\u2A31",
  "timesd": "\u2A30",
  "topbot": "\u2336",
  "topcir": "\u2AF1",
  "topf": "\u{1D565}",
  "topfork": "\u2ADA",
  "tprime": "\u2034",
  "triangle": "\u25B5",
  "utri": "\u25B5",
  "triangleq": "\u225C",
  "trie": "\u225C",
  "tridot": "\u25EC",
  "triminus": "\u2A3A",
  "triplus": "\u2A39",
  "trisb": "\u29CD",
  "tritime": "\u2A3B",
  "trpezium": "\u23E2",
  "tscr": "\u{1D4C9}",
  "tscy": "\u0446",
  "tshcy": "\u045B",
  "tstrok": "\u0167",
  "uHar": "\u2963",
  "uacute": "\xFA",
  "ubrcy": "\u045E",
  "ubreve": "\u016D",
  "ucirc": "\xFB",
  "ucy": "\u0443",
  "udblac": "\u0171",
  "ufisht": "\u297E",
  "ufr": "\u{1D532}",
  "ugrave": "\xF9",
  "uhblk": "\u2580",
  "ulcorn": "\u231C",
  "ulcorner": "\u231C",
  "ulcrop": "\u230F",
  "ultri": "\u25F8",
  "umacr": "\u016B",
  "uogon": "\u0173",
  "uopf": "\u{1D566}",
  "upsi": "\u03C5",
  "upsilon": "\u03C5",
  "upuparrows": "\u21C8",
  "uuarr": "\u21C8",
  "urcorn": "\u231D",
  "urcorner": "\u231D",
  "urcrop": "\u230E",
  "uring": "\u016F",
  "urtri": "\u25F9",
  "uscr": "\u{1D4CA}",
  "utdot": "\u22F0",
  "utilde": "\u0169",
  "uuml": "\xFC",
  "uwangle": "\u29A7",
  "vBar": "\u2AE8",
  "vBarv": "\u2AE9",
  "vangrt": "\u299C",
  "varsubsetneq": "\u228A\uFE00",
  "vsubne": "\u228A\uFE00",
  "varsubsetneqq": "\u2ACB\uFE00",
  "vsubnE": "\u2ACB\uFE00",
  "varsupsetneq": "\u228B\uFE00",
  "vsupne": "\u228B\uFE00",
  "varsupsetneqq": "\u2ACC\uFE00",
  "vsupnE": "\u2ACC\uFE00",
  "vcy": "\u0432",
  "veebar": "\u22BB",
  "veeeq": "\u225A",
  "vellip": "\u22EE",
  "vfr": "\u{1D533}",
  "vopf": "\u{1D567}",
  "vscr": "\u{1D4CB}",
  "vzigzag": "\u299A",
  "wcirc": "\u0175",
  "wedbar": "\u2A5F",
  "wedgeq": "\u2259",
  "weierp": "\u2118",
  "wp": "\u2118",
  "wfr": "\u{1D534}",
  "wopf": "\u{1D568}",
  "wscr": "\u{1D4CC}",
  "xfr": "\u{1D535}",
  "xi": "\u03BE",
  "xnis": "\u22FB",
  "xopf": "\u{1D569}",
  "xscr": "\u{1D4CD}",
  "yacute": "\xFD",
  "yacy": "\u044F",
  "ycirc": "\u0177",
  "ycy": "\u044B",
  "yen": "\xA5",
  "yfr": "\u{1D536}",
  "yicy": "\u0457",
  "yopf": "\u{1D56A}",
  "yscr": "\u{1D4CE}",
  "yucy": "\u044E",
  "yuml": "\xFF",
  "zacute": "\u017A",
  "zcaron": "\u017E",
  "zcy": "\u0437",
  "zdot": "\u017C",
  "zeta": "\u03B6",
  "zfr": "\u{1D537}",
  "zhcy": "\u0436",
  "zigrarr": "\u21DD",
  "zopf": "\u{1D56B}",
  "zscr": "\u{1D4CF}",
  "zwj": "\u200D",
  "zwnj": "\u200C"
};
var NGSP_UNICODE = "\uE500";
NAMED_ENTITIES["ngsp"] = NGSP_UNICODE;

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/lexer.mjs
var TokenError = class extends ParseError {
  constructor(errorMsg, tokenType, span) {
    super(span, errorMsg);
    this.tokenType = tokenType;
  }
};
var TokenizeResult = class {
  constructor(tokens, errors, nonNormalizedIcuExpressions) {
    this.tokens = tokens;
    this.errors = errors;
    this.nonNormalizedIcuExpressions = nonNormalizedIcuExpressions;
  }
};
function tokenize(source, url, getTagDefinition, options = {}) {
  const tokenizer = new _Tokenizer(new ParseSourceFile(source, url), getTagDefinition, options);
  tokenizer.tokenize();
  return new TokenizeResult(mergeTextTokens(tokenizer.tokens), tokenizer.errors, tokenizer.nonNormalizedIcuExpressions);
}
var _CR_OR_CRLF_REGEXP = /\r\n?/g;
function _unexpectedCharacterErrorMsg(charCode) {
  const char = charCode === $EOF ? "EOF" : String.fromCharCode(charCode);
  return `Unexpected character "${char}"`;
}
function _unknownEntityErrorMsg(entitySrc) {
  return `Unknown entity "${entitySrc}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
function _unparsableEntityErrorMsg(type, entityStr) {
  return `Unable to parse entity "${entityStr}" - ${type} character reference entities must end with ";"`;
}
var CharacterReferenceType;
(function(CharacterReferenceType2) {
  CharacterReferenceType2["HEX"] = "hexadecimal";
  CharacterReferenceType2["DEC"] = "decimal";
})(CharacterReferenceType || (CharacterReferenceType = {}));
var _ControlFlowError = class {
  constructor(error2) {
    this.error = error2;
  }
};
var _Tokenizer = class {
  constructor(_file, _getTagDefinition, options) {
    var _a2;
    this._getTagDefinition = _getTagDefinition;
    this._currentTokenStart = null;
    this._currentTokenType = null;
    this._expansionCaseStack = [];
    this._inInterpolation = false;
    this.tokens = [];
    this.errors = [];
    this.nonNormalizedIcuExpressions = [];
    this._tokenizeIcu = options.tokenizeExpansionForms || false;
    this._interpolationConfig = options.interpolationConfig || DEFAULT_INTERPOLATION_CONFIG;
    this._leadingTriviaCodePoints = options.leadingTriviaChars && options.leadingTriviaChars.map((c) => c.codePointAt(0) || 0);
    const range = options.range || { endPos: _file.content.length, startPos: 0, startLine: 0, startCol: 0 };
    this._cursor = options.escapedString ? new EscapedCharacterCursor(_file, range) : new PlainCharacterCursor(_file, range);
    this._preserveLineEndings = options.preserveLineEndings || false;
    this._i18nNormalizeLineEndingsInICUs = options.i18nNormalizeLineEndingsInICUs || false;
    this._tokenizeBlocks = (_a2 = options.tokenizeBlocks) != null ? _a2 : true;
    try {
      this._cursor.init();
    } catch (e) {
      this.handleError(e);
    }
  }
  _processCarriageReturns(content) {
    if (this._preserveLineEndings) {
      return content;
    }
    return content.replace(_CR_OR_CRLF_REGEXP, "\n");
  }
  tokenize() {
    while (this._cursor.peek() !== $EOF) {
      const start = this._cursor.clone();
      try {
        if (this._attemptCharCode($LT)) {
          if (this._attemptCharCode($BANG)) {
            if (this._attemptCharCode($LBRACKET)) {
              this._consumeCdata(start);
            } else if (this._attemptCharCode($MINUS)) {
              this._consumeComment(start);
            } else {
              this._consumeDocType(start);
            }
          } else if (this._attemptCharCode($SLASH)) {
            this._consumeTagClose(start);
          } else {
            this._consumeTagOpen(start);
          }
        } else if (this._tokenizeBlocks && this._attemptCharCode($AT)) {
          this._consumeBlockStart(start);
        } else if (this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansionCase() && !this._isInExpansionForm() && this._attemptCharCode($RBRACE)) {
          this._consumeBlockEnd(start);
        } else if (!(this._tokenizeIcu && this._tokenizeExpansionForm())) {
          this._consumeWithInterpolation(5, 8, () => this._isTextEnd(), () => this._isTagStart());
        }
      } catch (e) {
        this.handleError(e);
      }
    }
    this._beginToken(29);
    this._endToken([]);
  }
  _getBlockName() {
    let spacesInNameAllowed = false;
    const nameCursor = this._cursor.clone();
    this._attemptCharCodeUntilFn((code) => {
      if (isWhitespace(code)) {
        return !spacesInNameAllowed;
      }
      if (isBlockNameChar(code)) {
        spacesInNameAllowed = true;
        return false;
      }
      return true;
    });
    return this._cursor.getChars(nameCursor).trim();
  }
  _consumeBlockStart(start) {
    this._beginToken(24, start);
    const startToken = this._endToken([this._getBlockName()]);
    if (this._cursor.peek() === $LPAREN) {
      this._cursor.advance();
      this._consumeBlockParameters();
      this._attemptCharCodeUntilFn(isNotWhitespace);
      if (this._attemptCharCode($RPAREN)) {
        this._attemptCharCodeUntilFn(isNotWhitespace);
      } else {
        startToken.type = 28;
        return;
      }
    }
    if (this._attemptCharCode($LBRACE)) {
      this._beginToken(25);
      this._endToken([]);
    } else {
      startToken.type = 28;
    }
  }
  _consumeBlockEnd(start) {
    this._beginToken(26, start);
    this._endToken([]);
  }
  _consumeBlockParameters() {
    this._attemptCharCodeUntilFn(isBlockParameterChar);
    while (this._cursor.peek() !== $RPAREN && this._cursor.peek() !== $EOF) {
      this._beginToken(27);
      const start = this._cursor.clone();
      let inQuote = null;
      let openParens = 0;
      while (this._cursor.peek() !== $SEMICOLON && this._cursor.peek() !== $EOF || inQuote !== null) {
        const char = this._cursor.peek();
        if (char === $BACKSLASH) {
          this._cursor.advance();
        } else if (char === inQuote) {
          inQuote = null;
        } else if (inQuote === null && isQuote(char)) {
          inQuote = char;
        } else if (char === $LPAREN && inQuote === null) {
          openParens++;
        } else if (char === $RPAREN && inQuote === null) {
          if (openParens === 0) {
            break;
          } else if (openParens > 0) {
            openParens--;
          }
        }
        this._cursor.advance();
      }
      this._endToken([this._cursor.getChars(start)]);
      this._attemptCharCodeUntilFn(isBlockParameterChar);
    }
  }
  _tokenizeExpansionForm() {
    if (this.isExpansionFormStart()) {
      this._consumeExpansionFormStart();
      return true;
    }
    if (isExpansionCaseStart(this._cursor.peek()) && this._isInExpansionForm()) {
      this._consumeExpansionCaseStart();
      return true;
    }
    if (this._cursor.peek() === $RBRACE) {
      if (this._isInExpansionCase()) {
        this._consumeExpansionCaseEnd();
        return true;
      }
      if (this._isInExpansionForm()) {
        this._consumeExpansionFormEnd();
        return true;
      }
    }
    return false;
  }
  _beginToken(type, start = this._cursor.clone()) {
    this._currentTokenStart = start;
    this._currentTokenType = type;
  }
  _endToken(parts, end) {
    if (this._currentTokenStart === null) {
      throw new TokenError("Programming error - attempted to end a token when there was no start to the token", this._currentTokenType, this._cursor.getSpan(end));
    }
    if (this._currentTokenType === null) {
      throw new TokenError("Programming error - attempted to end a token which has no token type", null, this._cursor.getSpan(this._currentTokenStart));
    }
    const token = {
      type: this._currentTokenType,
      parts,
      sourceSpan: (end != null ? end : this._cursor).getSpan(this._currentTokenStart, this._leadingTriviaCodePoints)
    };
    this.tokens.push(token);
    this._currentTokenStart = null;
    this._currentTokenType = null;
    return token;
  }
  _createError(msg, span) {
    if (this._isInExpansionForm()) {
      msg += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`;
    }
    const error2 = new TokenError(msg, this._currentTokenType, span);
    this._currentTokenStart = null;
    this._currentTokenType = null;
    return new _ControlFlowError(error2);
  }
  handleError(e) {
    if (e instanceof CursorError) {
      e = this._createError(e.msg, this._cursor.getSpan(e.cursor));
    }
    if (e instanceof _ControlFlowError) {
      this.errors.push(e.error);
    } else {
      throw e;
    }
  }
  _attemptCharCode(charCode) {
    if (this._cursor.peek() === charCode) {
      this._cursor.advance();
      return true;
    }
    return false;
  }
  _attemptCharCodeCaseInsensitive(charCode) {
    if (compareCharCodeCaseInsensitive(this._cursor.peek(), charCode)) {
      this._cursor.advance();
      return true;
    }
    return false;
  }
  _requireCharCode(charCode) {
    const location = this._cursor.clone();
    if (!this._attemptCharCode(charCode)) {
      throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(location));
    }
  }
  _attemptStr(chars) {
    const len = chars.length;
    if (this._cursor.charsLeft() < len) {
      return false;
    }
    const initialPosition = this._cursor.clone();
    for (let i = 0; i < len; i++) {
      if (!this._attemptCharCode(chars.charCodeAt(i))) {
        this._cursor = initialPosition;
        return false;
      }
    }
    return true;
  }
  _attemptStrCaseInsensitive(chars) {
    for (let i = 0; i < chars.length; i++) {
      if (!this._attemptCharCodeCaseInsensitive(chars.charCodeAt(i))) {
        return false;
      }
    }
    return true;
  }
  _requireStr(chars) {
    const location = this._cursor.clone();
    if (!this._attemptStr(chars)) {
      throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(location));
    }
  }
  _attemptCharCodeUntilFn(predicate) {
    while (!predicate(this._cursor.peek())) {
      this._cursor.advance();
    }
  }
  _requireCharCodeUntilFn(predicate, len) {
    const start = this._cursor.clone();
    this._attemptCharCodeUntilFn(predicate);
    if (this._cursor.diff(start) < len) {
      throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(start));
    }
  }
  _attemptUntilChar(char) {
    while (this._cursor.peek() !== char) {
      this._cursor.advance();
    }
  }
  _readChar() {
    const char = String.fromCodePoint(this._cursor.peek());
    this._cursor.advance();
    return char;
  }
  _consumeEntity(textTokenType) {
    this._beginToken(9);
    const start = this._cursor.clone();
    this._cursor.advance();
    if (this._attemptCharCode($HASH)) {
      const isHex = this._attemptCharCode($x) || this._attemptCharCode($X);
      const codeStart = this._cursor.clone();
      this._attemptCharCodeUntilFn(isDigitEntityEnd);
      if (this._cursor.peek() != $SEMICOLON) {
        this._cursor.advance();
        const entityType = isHex ? CharacterReferenceType.HEX : CharacterReferenceType.DEC;
        throw this._createError(_unparsableEntityErrorMsg(entityType, this._cursor.getChars(start)), this._cursor.getSpan());
      }
      const strNum = this._cursor.getChars(codeStart);
      this._cursor.advance();
      try {
        const charCode = parseInt(strNum, isHex ? 16 : 10);
        this._endToken([String.fromCharCode(charCode), this._cursor.getChars(start)]);
      } catch (e) {
        throw this._createError(_unknownEntityErrorMsg(this._cursor.getChars(start)), this._cursor.getSpan());
      }
    } else {
      const nameStart = this._cursor.clone();
      this._attemptCharCodeUntilFn(isNamedEntityEnd);
      if (this._cursor.peek() != $SEMICOLON) {
        this._beginToken(textTokenType, start);
        this._cursor = nameStart;
        this._endToken(["&"]);
      } else {
        const name = this._cursor.getChars(nameStart);
        this._cursor.advance();
        const char = NAMED_ENTITIES[name];
        if (!char) {
          throw this._createError(_unknownEntityErrorMsg(name), this._cursor.getSpan(start));
        }
        this._endToken([char, `&${name};`]);
      }
    }
  }
  _consumeRawText(consumeEntities, endMarkerPredicate) {
    this._beginToken(consumeEntities ? 6 : 7);
    const parts = [];
    while (true) {
      const tagCloseStart = this._cursor.clone();
      const foundEndMarker = endMarkerPredicate();
      this._cursor = tagCloseStart;
      if (foundEndMarker) {
        break;
      }
      if (consumeEntities && this._cursor.peek() === $AMPERSAND) {
        this._endToken([this._processCarriageReturns(parts.join(""))]);
        parts.length = 0;
        this._consumeEntity(6);
        this._beginToken(6);
      } else {
        parts.push(this._readChar());
      }
    }
    this._endToken([this._processCarriageReturns(parts.join(""))]);
  }
  _consumeComment(start) {
    this._beginToken(10, start);
    this._requireCharCode($MINUS);
    this._endToken([]);
    this._consumeRawText(false, () => this._attemptStr("-->"));
    this._beginToken(11);
    this._requireStr("-->");
    this._endToken([]);
  }
  _consumeCdata(start) {
    this._beginToken(12, start);
    this._requireStr("CDATA[");
    this._endToken([]);
    this._consumeRawText(false, () => this._attemptStr("]]>"));
    this._beginToken(13);
    this._requireStr("]]>");
    this._endToken([]);
  }
  _consumeDocType(start) {
    this._beginToken(18, start);
    const contentStart = this._cursor.clone();
    this._attemptUntilChar($GT);
    const content = this._cursor.getChars(contentStart);
    this._cursor.advance();
    this._endToken([content]);
  }
  _consumePrefixAndName() {
    const nameOrPrefixStart = this._cursor.clone();
    let prefix = "";
    while (this._cursor.peek() !== $COLON && !isPrefixEnd(this._cursor.peek())) {
      this._cursor.advance();
    }
    let nameStart;
    if (this._cursor.peek() === $COLON) {
      prefix = this._cursor.getChars(nameOrPrefixStart);
      this._cursor.advance();
      nameStart = this._cursor.clone();
    } else {
      nameStart = nameOrPrefixStart;
    }
    this._requireCharCodeUntilFn(isNameEnd, prefix === "" ? 0 : 1);
    const name = this._cursor.getChars(nameStart);
    return [prefix, name];
  }
  _consumeTagOpen(start) {
    let tagName;
    let prefix;
    let openTagToken;
    try {
      if (!isAsciiLetter(this._cursor.peek())) {
        throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(start));
      }
      openTagToken = this._consumeTagOpenStart(start);
      prefix = openTagToken.parts[0];
      tagName = openTagToken.parts[1];
      this._attemptCharCodeUntilFn(isNotWhitespace);
      while (this._cursor.peek() !== $SLASH && this._cursor.peek() !== $GT && this._cursor.peek() !== $LT && this._cursor.peek() !== $EOF) {
        this._consumeAttributeName();
        this._attemptCharCodeUntilFn(isNotWhitespace);
        if (this._attemptCharCode($EQ)) {
          this._attemptCharCodeUntilFn(isNotWhitespace);
          this._consumeAttributeValue();
        }
        this._attemptCharCodeUntilFn(isNotWhitespace);
      }
      this._consumeTagOpenEnd();
    } catch (e) {
      if (e instanceof _ControlFlowError) {
        if (openTagToken) {
          openTagToken.type = 4;
        } else {
          this._beginToken(5, start);
          this._endToken(["<"]);
        }
        return;
      }
      throw e;
    }
    const contentTokenType = this._getTagDefinition(tagName).getContentType(prefix);
    if (contentTokenType === TagContentType.RAW_TEXT) {
      this._consumeRawTextWithTagClose(prefix, tagName, false);
    } else if (contentTokenType === TagContentType.ESCAPABLE_RAW_TEXT) {
      this._consumeRawTextWithTagClose(prefix, tagName, true);
    }
  }
  _consumeRawTextWithTagClose(prefix, tagName, consumeEntities) {
    this._consumeRawText(consumeEntities, () => {
      if (!this._attemptCharCode($LT))
        return false;
      if (!this._attemptCharCode($SLASH))
        return false;
      this._attemptCharCodeUntilFn(isNotWhitespace);
      if (!this._attemptStrCaseInsensitive(tagName))
        return false;
      this._attemptCharCodeUntilFn(isNotWhitespace);
      return this._attemptCharCode($GT);
    });
    this._beginToken(3);
    this._requireCharCodeUntilFn((code) => code === $GT, 3);
    this._cursor.advance();
    this._endToken([prefix, tagName]);
  }
  _consumeTagOpenStart(start) {
    this._beginToken(0, start);
    const parts = this._consumePrefixAndName();
    return this._endToken(parts);
  }
  _consumeAttributeName() {
    const attrNameStart = this._cursor.peek();
    if (attrNameStart === $SQ || attrNameStart === $DQ) {
      throw this._createError(_unexpectedCharacterErrorMsg(attrNameStart), this._cursor.getSpan());
    }
    this._beginToken(14);
    const prefixAndName = this._consumePrefixAndName();
    this._endToken(prefixAndName);
  }
  _consumeAttributeValue() {
    if (this._cursor.peek() === $SQ || this._cursor.peek() === $DQ) {
      const quoteChar = this._cursor.peek();
      this._consumeQuote(quoteChar);
      const endPredicate = () => this._cursor.peek() === quoteChar;
      this._consumeWithInterpolation(16, 17, endPredicate, endPredicate);
      this._consumeQuote(quoteChar);
    } else {
      const endPredicate = () => isNameEnd(this._cursor.peek());
      this._consumeWithInterpolation(16, 17, endPredicate, endPredicate);
    }
  }
  _consumeQuote(quoteChar) {
    this._beginToken(15);
    this._requireCharCode(quoteChar);
    this._endToken([String.fromCodePoint(quoteChar)]);
  }
  _consumeTagOpenEnd() {
    const tokenType = this._attemptCharCode($SLASH) ? 2 : 1;
    this._beginToken(tokenType);
    this._requireCharCode($GT);
    this._endToken([]);
  }
  _consumeTagClose(start) {
    this._beginToken(3, start);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    const prefixAndName = this._consumePrefixAndName();
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._requireCharCode($GT);
    this._endToken(prefixAndName);
  }
  _consumeExpansionFormStart() {
    this._beginToken(19);
    this._requireCharCode($LBRACE);
    this._endToken([]);
    this._expansionCaseStack.push(19);
    this._beginToken(7);
    const condition = this._readUntil($COMMA);
    const normalizedCondition = this._processCarriageReturns(condition);
    if (this._i18nNormalizeLineEndingsInICUs) {
      this._endToken([normalizedCondition]);
    } else {
      const conditionToken = this._endToken([condition]);
      if (normalizedCondition !== condition) {
        this.nonNormalizedIcuExpressions.push(conditionToken);
      }
    }
    this._requireCharCode($COMMA);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._beginToken(7);
    const type = this._readUntil($COMMA);
    this._endToken([type]);
    this._requireCharCode($COMMA);
    this._attemptCharCodeUntilFn(isNotWhitespace);
  }
  _consumeExpansionCaseStart() {
    this._beginToken(20);
    const value = this._readUntil($LBRACE).trim();
    this._endToken([value]);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._beginToken(21);
    this._requireCharCode($LBRACE);
    this._endToken([]);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._expansionCaseStack.push(21);
  }
  _consumeExpansionCaseEnd() {
    this._beginToken(22);
    this._requireCharCode($RBRACE);
    this._endToken([]);
    this._attemptCharCodeUntilFn(isNotWhitespace);
    this._expansionCaseStack.pop();
  }
  _consumeExpansionFormEnd() {
    this._beginToken(23);
    this._requireCharCode($RBRACE);
    this._endToken([]);
    this._expansionCaseStack.pop();
  }
  _consumeWithInterpolation(textTokenType, interpolationTokenType, endPredicate, endInterpolation) {
    this._beginToken(textTokenType);
    const parts = [];
    while (!endPredicate()) {
      const current = this._cursor.clone();
      if (this._interpolationConfig && this._attemptStr(this._interpolationConfig.start)) {
        this._endToken([this._processCarriageReturns(parts.join(""))], current);
        parts.length = 0;
        this._consumeInterpolation(interpolationTokenType, current, endInterpolation);
        this._beginToken(textTokenType);
      } else if (this._cursor.peek() === $AMPERSAND) {
        this._endToken([this._processCarriageReturns(parts.join(""))]);
        parts.length = 0;
        this._consumeEntity(textTokenType);
        this._beginToken(textTokenType);
      } else {
        parts.push(this._readChar());
      }
    }
    this._inInterpolation = false;
    this._endToken([this._processCarriageReturns(parts.join(""))]);
  }
  _consumeInterpolation(interpolationTokenType, interpolationStart, prematureEndPredicate) {
    const parts = [];
    this._beginToken(interpolationTokenType, interpolationStart);
    parts.push(this._interpolationConfig.start);
    const expressionStart = this._cursor.clone();
    let inQuote = null;
    let inComment = false;
    while (this._cursor.peek() !== $EOF && (prematureEndPredicate === null || !prematureEndPredicate())) {
      const current = this._cursor.clone();
      if (this._isTagStart()) {
        this._cursor = current;
        parts.push(this._getProcessedChars(expressionStart, current));
        this._endToken(parts);
        return;
      }
      if (inQuote === null) {
        if (this._attemptStr(this._interpolationConfig.end)) {
          parts.push(this._getProcessedChars(expressionStart, current));
          parts.push(this._interpolationConfig.end);
          this._endToken(parts);
          return;
        } else if (this._attemptStr("//")) {
          inComment = true;
        }
      }
      const char = this._cursor.peek();
      this._cursor.advance();
      if (char === $BACKSLASH) {
        this._cursor.advance();
      } else if (char === inQuote) {
        inQuote = null;
      } else if (!inComment && inQuote === null && isQuote(char)) {
        inQuote = char;
      }
    }
    parts.push(this._getProcessedChars(expressionStart, this._cursor));
    this._endToken(parts);
  }
  _getProcessedChars(start, end) {
    return this._processCarriageReturns(end.getChars(start));
  }
  _isTextEnd() {
    if (this._isTagStart() || this._cursor.peek() === $EOF) {
      return true;
    }
    if (this._tokenizeIcu && !this._inInterpolation) {
      if (this.isExpansionFormStart()) {
        return true;
      }
      if (this._cursor.peek() === $RBRACE && this._isInExpansionCase()) {
        return true;
      }
    }
    if (this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansion() && (this._cursor.peek() === $AT || this._cursor.peek() === $RBRACE)) {
      return true;
    }
    return false;
  }
  _isTagStart() {
    if (this._cursor.peek() === $LT) {
      const tmp = this._cursor.clone();
      tmp.advance();
      const code = tmp.peek();
      if ($a <= code && code <= $z || $A <= code && code <= $Z || code === $SLASH || code === $BANG) {
        return true;
      }
    }
    return false;
  }
  _readUntil(char) {
    const start = this._cursor.clone();
    this._attemptUntilChar(char);
    return this._cursor.getChars(start);
  }
  _isInExpansion() {
    return this._isInExpansionCase() || this._isInExpansionForm();
  }
  _isInExpansionCase() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 21;
  }
  _isInExpansionForm() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 19;
  }
  isExpansionFormStart() {
    if (this._cursor.peek() !== $LBRACE) {
      return false;
    }
    if (this._interpolationConfig) {
      const start = this._cursor.clone();
      const isInterpolation = this._attemptStr(this._interpolationConfig.start);
      this._cursor = start;
      return !isInterpolation;
    }
    return true;
  }
};
function isNotWhitespace(code) {
  return !isWhitespace(code) || code === $EOF;
}
function isNameEnd(code) {
  return isWhitespace(code) || code === $GT || code === $LT || code === $SLASH || code === $SQ || code === $DQ || code === $EQ || code === $EOF;
}
function isPrefixEnd(code) {
  return (code < $a || $z < code) && (code < $A || $Z < code) && (code < $0 || code > $9);
}
function isDigitEntityEnd(code) {
  return code === $SEMICOLON || code === $EOF || !isAsciiHexDigit(code);
}
function isNamedEntityEnd(code) {
  return code === $SEMICOLON || code === $EOF || !isAsciiLetter(code);
}
function isExpansionCaseStart(peek) {
  return peek !== $RBRACE;
}
function compareCharCodeCaseInsensitive(code1, code2) {
  return toUpperCaseCharCode(code1) === toUpperCaseCharCode(code2);
}
function toUpperCaseCharCode(code) {
  return code >= $a && code <= $z ? code - $a + $A : code;
}
function isBlockNameChar(code) {
  return isAsciiLetter(code) || isDigit(code) || code === $_;
}
function isBlockParameterChar(code) {
  return code !== $SEMICOLON && isNotWhitespace(code);
}
function mergeTextTokens(srcTokens) {
  const dstTokens = [];
  let lastDstToken = void 0;
  for (let i = 0; i < srcTokens.length; i++) {
    const token = srcTokens[i];
    if (lastDstToken && lastDstToken.type === 5 && token.type === 5 || lastDstToken && lastDstToken.type === 16 && token.type === 16) {
      lastDstToken.parts[0] += token.parts[0];
      lastDstToken.sourceSpan.end = token.sourceSpan.end;
    } else {
      lastDstToken = token;
      dstTokens.push(lastDstToken);
    }
  }
  return dstTokens;
}
var PlainCharacterCursor = class {
  constructor(fileOrCursor, range) {
    if (fileOrCursor instanceof PlainCharacterCursor) {
      this.file = fileOrCursor.file;
      this.input = fileOrCursor.input;
      this.end = fileOrCursor.end;
      const state = fileOrCursor.state;
      this.state = {
        peek: state.peek,
        offset: state.offset,
        line: state.line,
        column: state.column
      };
    } else {
      if (!range) {
        throw new Error("Programming error: the range argument must be provided with a file argument.");
      }
      this.file = fileOrCursor;
      this.input = fileOrCursor.content;
      this.end = range.endPos;
      this.state = {
        peek: -1,
        offset: range.startPos,
        line: range.startLine,
        column: range.startCol
      };
    }
  }
  clone() {
    return new PlainCharacterCursor(this);
  }
  peek() {
    return this.state.peek;
  }
  charsLeft() {
    return this.end - this.state.offset;
  }
  diff(other) {
    return this.state.offset - other.state.offset;
  }
  advance() {
    this.advanceState(this.state);
  }
  init() {
    this.updatePeek(this.state);
  }
  getSpan(start, leadingTriviaCodePoints) {
    start = start || this;
    let fullStart = start;
    if (leadingTriviaCodePoints) {
      while (this.diff(start) > 0 && leadingTriviaCodePoints.indexOf(start.peek()) !== -1) {
        if (fullStart === start) {
          start = start.clone();
        }
        start.advance();
      }
    }
    const startLocation = this.locationFromCursor(start);
    const endLocation = this.locationFromCursor(this);
    const fullStartLocation = fullStart !== start ? this.locationFromCursor(fullStart) : startLocation;
    return new ParseSourceSpan(startLocation, endLocation, fullStartLocation);
  }
  getChars(start) {
    return this.input.substring(start.state.offset, this.state.offset);
  }
  charAt(pos) {
    return this.input.charCodeAt(pos);
  }
  advanceState(state) {
    if (state.offset >= this.end) {
      this.state = state;
      throw new CursorError('Unexpected character "EOF"', this);
    }
    const currentChar = this.charAt(state.offset);
    if (currentChar === $LF) {
      state.line++;
      state.column = 0;
    } else if (!isNewLine(currentChar)) {
      state.column++;
    }
    state.offset++;
    this.updatePeek(state);
  }
  updatePeek(state) {
    state.peek = state.offset >= this.end ? $EOF : this.charAt(state.offset);
  }
  locationFromCursor(cursor) {
    return new ParseLocation(cursor.file, cursor.state.offset, cursor.state.line, cursor.state.column);
  }
};
var EscapedCharacterCursor = class extends PlainCharacterCursor {
  constructor(fileOrCursor, range) {
    if (fileOrCursor instanceof EscapedCharacterCursor) {
      super(fileOrCursor);
      this.internalState = __spreadValues({}, fileOrCursor.internalState);
    } else {
      super(fileOrCursor, range);
      this.internalState = this.state;
    }
  }
  advance() {
    this.state = this.internalState;
    super.advance();
    this.processEscapeSequence();
  }
  init() {
    super.init();
    this.processEscapeSequence();
  }
  clone() {
    return new EscapedCharacterCursor(this);
  }
  getChars(start) {
    const cursor = start.clone();
    let chars = "";
    while (cursor.internalState.offset < this.internalState.offset) {
      chars += String.fromCodePoint(cursor.peek());
      cursor.advance();
    }
    return chars;
  }
  processEscapeSequence() {
    const peek = () => this.internalState.peek;
    if (peek() === $BACKSLASH) {
      this.internalState = __spreadValues({}, this.state);
      this.advanceState(this.internalState);
      if (peek() === $n) {
        this.state.peek = $LF;
      } else if (peek() === $r) {
        this.state.peek = $CR;
      } else if (peek() === $v) {
        this.state.peek = $VTAB;
      } else if (peek() === $t) {
        this.state.peek = $TAB;
      } else if (peek() === $b) {
        this.state.peek = $BSPACE;
      } else if (peek() === $f) {
        this.state.peek = $FF;
      } else if (peek() === $u) {
        this.advanceState(this.internalState);
        if (peek() === $LBRACE) {
          this.advanceState(this.internalState);
          const digitStart = this.clone();
          let length = 0;
          while (peek() !== $RBRACE) {
            this.advanceState(this.internalState);
            length++;
          }
          this.state.peek = this.decodeHexDigits(digitStart, length);
        } else {
          const digitStart = this.clone();
          this.advanceState(this.internalState);
          this.advanceState(this.internalState);
          this.advanceState(this.internalState);
          this.state.peek = this.decodeHexDigits(digitStart, 4);
        }
      } else if (peek() === $x) {
        this.advanceState(this.internalState);
        const digitStart = this.clone();
        this.advanceState(this.internalState);
        this.state.peek = this.decodeHexDigits(digitStart, 2);
      } else if (isOctalDigit(peek())) {
        let octal = "";
        let length = 0;
        let previous = this.clone();
        while (isOctalDigit(peek()) && length < 3) {
          previous = this.clone();
          octal += String.fromCodePoint(peek());
          this.advanceState(this.internalState);
          length++;
        }
        this.state.peek = parseInt(octal, 8);
        this.internalState = previous.internalState;
      } else if (isNewLine(this.internalState.peek)) {
        this.advanceState(this.internalState);
        this.state = this.internalState;
      } else {
        this.state.peek = this.internalState.peek;
      }
    }
  }
  decodeHexDigits(start, length) {
    const hex = this.input.slice(start.internalState.offset, start.internalState.offset + length);
    const charCode = parseInt(hex, 16);
    if (!isNaN(charCode)) {
      return charCode;
    } else {
      start.state = start.internalState;
      throw new CursorError("Invalid hexadecimal escape sequence", start);
    }
  }
};
var CursorError = class {
  constructor(msg, cursor) {
    this.msg = msg;
    this.cursor = cursor;
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/parser.mjs
var TreeError = class extends ParseError {
  static create(elementName, span, msg) {
    return new TreeError(elementName, span, msg);
  }
  constructor(elementName, span, msg) {
    super(span, msg);
    this.elementName = elementName;
  }
};
var ParseTreeResult = class {
  constructor(rootNodes, errors) {
    this.rootNodes = rootNodes;
    this.errors = errors;
  }
};
var Parser2 = class {
  constructor(getTagDefinition) {
    this.getTagDefinition = getTagDefinition;
  }
  parse(source, url, options) {
    const tokenizeResult = tokenize(source, url, this.getTagDefinition, options);
    const parser = new _TreeBuilder(tokenizeResult.tokens, this.getTagDefinition);
    parser.build();
    return new ParseTreeResult(parser.rootNodes, tokenizeResult.errors.concat(parser.errors));
  }
};
var _TreeBuilder = class {
  constructor(tokens, getTagDefinition) {
    this.tokens = tokens;
    this.getTagDefinition = getTagDefinition;
    this._index = -1;
    this._containerStack = [];
    this.rootNodes = [];
    this.errors = [];
    this._advance();
  }
  build() {
    while (this._peek.type !== 29) {
      if (this._peek.type === 0 || this._peek.type === 4) {
        this._consumeStartTag(this._advance());
      } else if (this._peek.type === 3) {
        this._consumeEndTag(this._advance());
      } else if (this._peek.type === 12) {
        this._closeVoidElement();
        this._consumeCdata(this._advance());
      } else if (this._peek.type === 10) {
        this._closeVoidElement();
        this._consumeComment(this._advance());
      } else if (this._peek.type === 5 || this._peek.type === 7 || this._peek.type === 6) {
        this._closeVoidElement();
        this._consumeText(this._advance());
      } else if (this._peek.type === 19) {
        this._consumeExpansion(this._advance());
      } else if (this._peek.type === 24) {
        this._closeVoidElement();
        this._consumeBlockOpen(this._advance());
      } else if (this._peek.type === 26) {
        this._closeVoidElement();
        this._consumeBlockClose(this._advance());
      } else if (this._peek.type === 28) {
        this._closeVoidElement();
        this._consumeIncompleteBlock(this._advance());
      } else {
        this._advance();
      }
    }
    for (const leftoverContainer of this._containerStack) {
      if (leftoverContainer instanceof Block) {
        this.errors.push(TreeError.create(leftoverContainer.name, leftoverContainer.sourceSpan, `Unclosed block "${leftoverContainer.name}"`));
      }
    }
  }
  _advance() {
    const prev = this._peek;
    if (this._index < this.tokens.length - 1) {
      this._index++;
    }
    this._peek = this.tokens[this._index];
    return prev;
  }
  _advanceIf(type) {
    if (this._peek.type === type) {
      return this._advance();
    }
    return null;
  }
  _consumeCdata(_startToken) {
    this._consumeText(this._advance());
    this._advanceIf(13);
  }
  _consumeComment(token) {
    const text2 = this._advanceIf(7);
    const endToken = this._advanceIf(11);
    const value = text2 != null ? text2.parts[0].trim() : null;
    const sourceSpan = endToken == null ? token.sourceSpan : new ParseSourceSpan(token.sourceSpan.start, endToken.sourceSpan.end, token.sourceSpan.fullStart);
    this._addToParent(new Comment2(value, sourceSpan));
  }
  _consumeExpansion(token) {
    const switchValue = this._advance();
    const type = this._advance();
    const cases = [];
    while (this._peek.type === 20) {
      const expCase = this._parseExpansionCase();
      if (!expCase)
        return;
      cases.push(expCase);
    }
    if (this._peek.type !== 23) {
      this.errors.push(TreeError.create(null, this._peek.sourceSpan, `Invalid ICU message. Missing '}'.`));
      return;
    }
    const sourceSpan = new ParseSourceSpan(token.sourceSpan.start, this._peek.sourceSpan.end, token.sourceSpan.fullStart);
    this._addToParent(new Expansion(switchValue.parts[0], type.parts[0], cases, sourceSpan, switchValue.sourceSpan));
    this._advance();
  }
  _parseExpansionCase() {
    const value = this._advance();
    if (this._peek.type !== 21) {
      this.errors.push(TreeError.create(null, this._peek.sourceSpan, `Invalid ICU message. Missing '{'.`));
      return null;
    }
    const start = this._advance();
    const exp = this._collectExpansionExpTokens(start);
    if (!exp)
      return null;
    const end = this._advance();
    exp.push({ type: 29, parts: [], sourceSpan: end.sourceSpan });
    const expansionCaseParser = new _TreeBuilder(exp, this.getTagDefinition);
    expansionCaseParser.build();
    if (expansionCaseParser.errors.length > 0) {
      this.errors = this.errors.concat(expansionCaseParser.errors);
      return null;
    }
    const sourceSpan = new ParseSourceSpan(value.sourceSpan.start, end.sourceSpan.end, value.sourceSpan.fullStart);
    const expSourceSpan = new ParseSourceSpan(start.sourceSpan.start, end.sourceSpan.end, start.sourceSpan.fullStart);
    return new ExpansionCase(value.parts[0], expansionCaseParser.rootNodes, sourceSpan, value.sourceSpan, expSourceSpan);
  }
  _collectExpansionExpTokens(start) {
    const exp = [];
    const expansionFormStack = [21];
    while (true) {
      if (this._peek.type === 19 || this._peek.type === 21) {
        expansionFormStack.push(this._peek.type);
      }
      if (this._peek.type === 22) {
        if (lastOnStack(expansionFormStack, 21)) {
          expansionFormStack.pop();
          if (expansionFormStack.length === 0)
            return exp;
        } else {
          this.errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
          return null;
        }
      }
      if (this._peek.type === 23) {
        if (lastOnStack(expansionFormStack, 19)) {
          expansionFormStack.pop();
        } else {
          this.errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
          return null;
        }
      }
      if (this._peek.type === 29) {
        this.errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
        return null;
      }
      exp.push(this._advance());
    }
  }
  _consumeText(token) {
    const tokens = [token];
    const startSpan = token.sourceSpan;
    let text2 = token.parts[0];
    if (text2.length > 0 && text2[0] === "\n") {
      const parent = this._getContainer();
      if (parent != null && parent.children.length === 0 && this.getTagDefinition(parent.name).ignoreFirstLf) {
        text2 = text2.substring(1);
        tokens[0] = { type: token.type, sourceSpan: token.sourceSpan, parts: [text2] };
      }
    }
    while (this._peek.type === 8 || this._peek.type === 5 || this._peek.type === 9) {
      token = this._advance();
      tokens.push(token);
      if (token.type === 8) {
        text2 += token.parts.join("").replace(/&([^;]+);/g, decodeEntity);
      } else if (token.type === 9) {
        text2 += token.parts[0];
      } else {
        text2 += token.parts.join("");
      }
    }
    if (text2.length > 0) {
      const endSpan = token.sourceSpan;
      this._addToParent(new Text4(text2, new ParseSourceSpan(startSpan.start, endSpan.end, startSpan.fullStart, startSpan.details), tokens));
    }
  }
  _closeVoidElement() {
    const el = this._getContainer();
    if (el instanceof Element2 && this.getTagDefinition(el.name).isVoid) {
      this._containerStack.pop();
    }
  }
  _consumeStartTag(startTagToken) {
    const [prefix, name] = startTagToken.parts;
    const attrs = [];
    while (this._peek.type === 14) {
      attrs.push(this._consumeAttr(this._advance()));
    }
    const fullName = this._getElementFullName(prefix, name, this._getClosestParentElement());
    let selfClosing = false;
    if (this._peek.type === 2) {
      this._advance();
      selfClosing = true;
      const tagDef = this.getTagDefinition(fullName);
      if (!(tagDef.canSelfClose || getNsPrefix(fullName) !== null || tagDef.isVoid)) {
        this.errors.push(TreeError.create(fullName, startTagToken.sourceSpan, `Only void, custom and foreign elements can be self closed "${startTagToken.parts[1]}"`));
      }
    } else if (this._peek.type === 1) {
      this._advance();
      selfClosing = false;
    }
    const end = this._peek.sourceSpan.fullStart;
    const span = new ParseSourceSpan(startTagToken.sourceSpan.start, end, startTagToken.sourceSpan.fullStart);
    const startSpan = new ParseSourceSpan(startTagToken.sourceSpan.start, end, startTagToken.sourceSpan.fullStart);
    const el = new Element2(fullName, attrs, [], span, startSpan, void 0);
    const parentEl = this._getContainer();
    this._pushContainer(el, parentEl instanceof Element2 && this.getTagDefinition(parentEl.name).isClosedByChild(el.name));
    if (selfClosing) {
      this._popContainer(fullName, Element2, span);
    } else if (startTagToken.type === 4) {
      this._popContainer(fullName, Element2, null);
      this.errors.push(TreeError.create(fullName, span, `Opening tag "${fullName}" not terminated.`));
    }
  }
  _pushContainer(node, isClosedByChild) {
    if (isClosedByChild) {
      this._containerStack.pop();
    }
    this._addToParent(node);
    this._containerStack.push(node);
  }
  _consumeEndTag(endTagToken) {
    const fullName = this._getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getClosestParentElement());
    if (this.getTagDefinition(fullName).isVoid) {
      this.errors.push(TreeError.create(fullName, endTagToken.sourceSpan, `Void elements do not have end tags "${endTagToken.parts[1]}"`));
    } else if (!this._popContainer(fullName, Element2, endTagToken.sourceSpan)) {
      const errMsg = `Unexpected closing tag "${fullName}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
      this.errors.push(TreeError.create(fullName, endTagToken.sourceSpan, errMsg));
    }
  }
  _popContainer(expectedName, expectedType, endSourceSpan) {
    let unexpectedCloseTagDetected = false;
    for (let stackIndex = this._containerStack.length - 1; stackIndex >= 0; stackIndex--) {
      const node = this._containerStack[stackIndex];
      if ((node.name === expectedName || expectedName === null) && node instanceof expectedType) {
        node.endSourceSpan = endSourceSpan;
        node.sourceSpan.end = endSourceSpan !== null ? endSourceSpan.end : node.sourceSpan.end;
        this._containerStack.splice(stackIndex, this._containerStack.length - stackIndex);
        return !unexpectedCloseTagDetected;
      }
      if (node instanceof Block || node instanceof Element2 && !this.getTagDefinition(node.name).closedByParent) {
        unexpectedCloseTagDetected = true;
      }
    }
    return false;
  }
  _consumeAttr(attrName) {
    const fullName = mergeNsAndName(attrName.parts[0], attrName.parts[1]);
    let attrEnd = attrName.sourceSpan.end;
    if (this._peek.type === 15) {
      this._advance();
    }
    let value = "";
    const valueTokens = [];
    let valueStartSpan = void 0;
    let valueEnd = void 0;
    const nextTokenType = this._peek.type;
    if (nextTokenType === 16) {
      valueStartSpan = this._peek.sourceSpan;
      valueEnd = this._peek.sourceSpan.end;
      while (this._peek.type === 16 || this._peek.type === 17 || this._peek.type === 9) {
        const valueToken = this._advance();
        valueTokens.push(valueToken);
        if (valueToken.type === 17) {
          value += valueToken.parts.join("").replace(/&([^;]+);/g, decodeEntity);
        } else if (valueToken.type === 9) {
          value += valueToken.parts[0];
        } else {
          value += valueToken.parts.join("");
        }
        valueEnd = attrEnd = valueToken.sourceSpan.end;
      }
    }
    if (this._peek.type === 15) {
      const quoteToken = this._advance();
      attrEnd = quoteToken.sourceSpan.end;
    }
    const valueSpan = valueStartSpan && valueEnd && new ParseSourceSpan(valueStartSpan.start, valueEnd, valueStartSpan.fullStart);
    return new Attribute(fullName, value, new ParseSourceSpan(attrName.sourceSpan.start, attrEnd, attrName.sourceSpan.fullStart), attrName.sourceSpan, valueSpan, valueTokens.length > 0 ? valueTokens : void 0, void 0);
  }
  _consumeBlockOpen(token) {
    const parameters = [];
    while (this._peek.type === 27) {
      const paramToken = this._advance();
      parameters.push(new BlockParameter(paramToken.parts[0], paramToken.sourceSpan));
    }
    if (this._peek.type === 25) {
      this._advance();
    }
    const end = this._peek.sourceSpan.fullStart;
    const span = new ParseSourceSpan(token.sourceSpan.start, end, token.sourceSpan.fullStart);
    const startSpan = new ParseSourceSpan(token.sourceSpan.start, end, token.sourceSpan.fullStart);
    const block = new Block(token.parts[0], parameters, [], span, token.sourceSpan, startSpan);
    this._pushContainer(block, false);
  }
  _consumeBlockClose(token) {
    if (!this._popContainer(null, Block, token.sourceSpan)) {
      this.errors.push(TreeError.create(null, token.sourceSpan, `Unexpected closing block. The block may have been closed earlier. If you meant to write the } character, you should use the "&#125;" HTML entity instead.`));
    }
  }
  _consumeIncompleteBlock(token) {
    const parameters = [];
    while (this._peek.type === 27) {
      const paramToken = this._advance();
      parameters.push(new BlockParameter(paramToken.parts[0], paramToken.sourceSpan));
    }
    const end = this._peek.sourceSpan.fullStart;
    const span = new ParseSourceSpan(token.sourceSpan.start, end, token.sourceSpan.fullStart);
    const startSpan = new ParseSourceSpan(token.sourceSpan.start, end, token.sourceSpan.fullStart);
    const block = new Block(token.parts[0], parameters, [], span, token.sourceSpan, startSpan);
    this._pushContainer(block, false);
    this._popContainer(null, Block, null);
    this.errors.push(TreeError.create(token.parts[0], span, `Incomplete block "${token.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`));
  }
  _getContainer() {
    return this._containerStack.length > 0 ? this._containerStack[this._containerStack.length - 1] : null;
  }
  _getClosestParentElement() {
    for (let i = this._containerStack.length - 1; i > -1; i--) {
      if (this._containerStack[i] instanceof Element2) {
        return this._containerStack[i];
      }
    }
    return null;
  }
  _addToParent(node) {
    const parent = this._getContainer();
    if (parent === null) {
      this.rootNodes.push(node);
    } else {
      parent.children.push(node);
    }
  }
  _getElementFullName(prefix, localName, parentElement) {
    if (prefix === "") {
      prefix = this.getTagDefinition(localName).implicitNamespacePrefix || "";
      if (prefix === "" && parentElement != null) {
        const parentTagName = splitNsName(parentElement.name)[1];
        const parentTagDefinition = this.getTagDefinition(parentTagName);
        if (!parentTagDefinition.preventNamespaceInheritance) {
          prefix = getNsPrefix(parentElement.name);
        }
      }
    }
    return mergeNsAndName(prefix, localName);
  }
};
function lastOnStack(stack, element2) {
  return stack.length > 0 && stack[stack.length - 1] === element2;
}
function decodeEntity(match, entity) {
  if (NAMED_ENTITIES[entity] !== void 0) {
    return NAMED_ENTITIES[entity] || match;
  }
  if (/^#x[a-f0-9]+$/i.test(entity)) {
    return String.fromCodePoint(parseInt(entity.slice(2), 16));
  }
  if (/^#\d+$/.test(entity)) {
    return String.fromCodePoint(parseInt(entity.slice(1), 10));
  }
  return match;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/schema/trusted_types_sinks.mjs
var TRUSTED_TYPES_SINKS = /* @__PURE__ */ new Set([
  "iframe|srcdoc",
  "*|innerhtml",
  "*|outerhtml",
  "embed|src",
  "object|codebase",
  "object|data"
]);
function isTrustedTypesSink(tagName, propName) {
  tagName = tagName.toLowerCase();
  propName = propName.toLowerCase();
  return TRUSTED_TYPES_SINKS.has(tagName + "|" + propName) || TRUSTED_TYPES_SINKS.has("*|" + propName);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/i18n/meta.mjs
var setI18nRefs = (htmlNode, i18nNode) => {
  if (htmlNode instanceof NodeWithI18n) {
    if (i18nNode instanceof IcuPlaceholder && htmlNode.i18n instanceof Message) {
      i18nNode.previousMessage = htmlNode.i18n;
    }
    htmlNode.i18n = i18nNode;
  }
  return i18nNode;
};
var I18nMetaVisitor = class {
  constructor(interpolationConfig = DEFAULT_INTERPOLATION_CONFIG, keepI18nAttrs = false, enableI18nLegacyMessageIdFormat = false, containerBlocks = DEFAULT_CONTAINER_BLOCKS) {
    this.interpolationConfig = interpolationConfig;
    this.keepI18nAttrs = keepI18nAttrs;
    this.enableI18nLegacyMessageIdFormat = enableI18nLegacyMessageIdFormat;
    this.containerBlocks = containerBlocks;
    this.hasI18nMeta = false;
    this._errors = [];
  }
  _generateI18nMessage(nodes, meta = "", visitNodeFn) {
    const { meaning, description, customId } = this._parseMetadata(meta);
    const createI18nMessage2 = createI18nMessageFactory(this.interpolationConfig, this.containerBlocks);
    const message = createI18nMessage2(nodes, meaning, description, customId, visitNodeFn);
    this._setMessageId(message, meta);
    this._setLegacyIds(message, meta);
    return message;
  }
  visitAllWithErrors(nodes) {
    const result = nodes.map((node) => node.visit(this, null));
    return new ParseTreeResult(result, this._errors);
  }
  visitElement(element2) {
    let message = void 0;
    if (hasI18nAttrs(element2)) {
      this.hasI18nMeta = true;
      const attrs = [];
      const attrsMeta = {};
      for (const attr of element2.attrs) {
        if (attr.name === I18N_ATTR) {
          const i18n2 = element2.i18n || attr.value;
          message = this._generateI18nMessage(element2.children, i18n2, setI18nRefs);
          if (message.nodes.length === 0) {
            message = void 0;
          }
          element2.i18n = message;
        } else if (attr.name.startsWith(I18N_ATTR_PREFIX)) {
          const name = attr.name.slice(I18N_ATTR_PREFIX.length);
          if (isTrustedTypesSink(element2.name, name)) {
            this._reportError(attr, `Translating attribute '${name}' is disallowed for security reasons.`);
          } else {
            attrsMeta[name] = attr.value;
          }
        } else {
          attrs.push(attr);
        }
      }
      if (Object.keys(attrsMeta).length) {
        for (const attr of attrs) {
          const meta = attrsMeta[attr.name];
          if (meta !== void 0 && attr.value) {
            attr.i18n = this._generateI18nMessage([attr], attr.i18n || meta);
          }
        }
      }
      if (!this.keepI18nAttrs) {
        element2.attrs = attrs;
      }
    }
    visitAll2(this, element2.children, message);
    return element2;
  }
  visitExpansion(expansion, currentMessage) {
    let message;
    const meta = expansion.i18n;
    this.hasI18nMeta = true;
    if (meta instanceof IcuPlaceholder) {
      const name = meta.name;
      message = this._generateI18nMessage([expansion], meta);
      const icu = icuFromI18nMessage(message);
      icu.name = name;
      if (currentMessage !== null) {
        currentMessage.placeholderToMessage[name] = message;
      }
    } else {
      message = this._generateI18nMessage([expansion], currentMessage || meta);
    }
    expansion.i18n = message;
    return expansion;
  }
  visitText(text2) {
    return text2;
  }
  visitAttribute(attribute2) {
    return attribute2;
  }
  visitComment(comment) {
    return comment;
  }
  visitExpansionCase(expansionCase) {
    return expansionCase;
  }
  visitBlock(block, context) {
    visitAll2(this, block.children, context);
    return block;
  }
  visitBlockParameter(parameter, context) {
    return parameter;
  }
  _parseMetadata(meta) {
    return typeof meta === "string" ? parseI18nMeta(meta) : meta instanceof Message ? meta : {};
  }
  _setMessageId(message, meta) {
    if (!message.id) {
      message.id = meta instanceof Message && meta.id || decimalDigest(message);
    }
  }
  _setLegacyIds(message, meta) {
    if (this.enableI18nLegacyMessageIdFormat) {
      message.legacyIds = [computeDigest(message), computeDecimalDigest(message)];
    } else if (typeof meta !== "string") {
      const previousMessage = meta instanceof Message ? meta : meta instanceof IcuPlaceholder ? meta.previousMessage : void 0;
      message.legacyIds = previousMessage ? previousMessage.legacyIds : [];
    }
  }
  _reportError(node, msg) {
    this._errors.push(new I18nError(node.sourceSpan, msg));
  }
};
var I18N_MEANING_SEPARATOR = "|";
var I18N_ID_SEPARATOR = "@@";
function parseI18nMeta(meta = "") {
  let customId;
  let meaning;
  let description;
  meta = meta.trim();
  if (meta) {
    const idIndex = meta.indexOf(I18N_ID_SEPARATOR);
    const descIndex = meta.indexOf(I18N_MEANING_SEPARATOR);
    let meaningAndDesc;
    [meaningAndDesc, customId] = idIndex > -1 ? [meta.slice(0, idIndex), meta.slice(idIndex + 2)] : [meta, ""];
    [meaning, description] = descIndex > -1 ? [meaningAndDesc.slice(0, descIndex), meaningAndDesc.slice(descIndex + 1)] : ["", meaningAndDesc];
  }
  return { customId, meaning, description };
}
function i18nMetaToJSDoc(meta) {
  const tags = [];
  if (meta.description) {
    tags.push({ tagName: "desc", text: meta.description });
  } else {
    tags.push({ tagName: "suppress", text: "{msgDescriptions}" });
  }
  if (meta.meaning) {
    tags.push({ tagName: "meaning", text: meta.meaning });
  }
  return jsDocComment(tags);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/i18n/get_msg_utils.mjs
var GOOG_GET_MSG = "goog.getMsg";
function createGoogleGetMsgStatements(variable2, message, closureVar, placeholderValues) {
  const messageString = serializeI18nMessageForGetMsg(message);
  const args = [literal(messageString)];
  if (Object.keys(placeholderValues).length) {
    args.push(mapLiteral(formatI18nPlaceholderNamesInMap(placeholderValues, true), true));
    args.push(mapLiteral({
      original_code: literalMap(Object.keys(placeholderValues).map((param) => ({
        key: formatI18nPlaceholderName(param),
        quoted: true,
        value: message.placeholders[param] ? literal(message.placeholders[param].sourceSpan.toString()) : literal(message.placeholderToMessage[param].nodes.map((node) => node.sourceSpan.toString()).join(""))
      })))
    }));
  }
  const googGetMsgStmt = closureVar.set(variable(GOOG_GET_MSG).callFn(args)).toConstDecl();
  googGetMsgStmt.addLeadingComment(i18nMetaToJSDoc(message));
  const i18nAssignmentStmt = new ExpressionStatement(variable2.set(closureVar));
  return [googGetMsgStmt, i18nAssignmentStmt];
}
var GetMsgSerializerVisitor = class {
  formatPh(value) {
    return `{$${formatI18nPlaceholderName(value)}}`;
  }
  visitText(text2) {
    return text2.value;
  }
  visitContainer(container) {
    return container.children.map((child) => child.visit(this)).join("");
  }
  visitIcu(icu) {
    return serializeIcuNode(icu);
  }
  visitTagPlaceholder(ph) {
    return ph.isVoid ? this.formatPh(ph.startName) : `${this.formatPh(ph.startName)}${ph.children.map((child) => child.visit(this)).join("")}${this.formatPh(ph.closeName)}`;
  }
  visitPlaceholder(ph) {
    return this.formatPh(ph.name);
  }
  visitBlockPlaceholder(ph) {
    return `${this.formatPh(ph.startName)}${ph.children.map((child) => child.visit(this)).join("")}${this.formatPh(ph.closeName)}`;
  }
  visitIcuPlaceholder(ph, context) {
    return this.formatPh(ph.name);
  }
};
var serializerVisitor2 = new GetMsgSerializerVisitor();
function serializeI18nMessageForGetMsg(message) {
  return message.nodes.map((node) => node.visit(serializerVisitor2, null)).join("");
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/i18n/localize_utils.mjs
function createLocalizeStatements(variable2, message, params) {
  const { messageParts, placeHolders } = serializeI18nMessageForLocalize(message);
  const sourceSpan = getSourceSpan(message);
  const expressions = placeHolders.map((ph) => params[ph.text]);
  const localizedString2 = localizedString(message, messageParts, placeHolders, expressions, sourceSpan);
  const variableInitialization = variable2.set(localizedString2);
  return [new ExpressionStatement(variableInitialization)];
}
var LocalizeSerializerVisitor = class {
  constructor(placeholderToMessage, pieces) {
    this.placeholderToMessage = placeholderToMessage;
    this.pieces = pieces;
  }
  visitText(text2) {
    if (this.pieces[this.pieces.length - 1] instanceof LiteralPiece) {
      this.pieces[this.pieces.length - 1].text += text2.value;
    } else {
      const sourceSpan = new ParseSourceSpan(text2.sourceSpan.fullStart, text2.sourceSpan.end, text2.sourceSpan.fullStart, text2.sourceSpan.details);
      this.pieces.push(new LiteralPiece(text2.value, sourceSpan));
    }
  }
  visitContainer(container) {
    container.children.forEach((child) => child.visit(this));
  }
  visitIcu(icu) {
    this.pieces.push(new LiteralPiece(serializeIcuNode(icu), icu.sourceSpan));
  }
  visitTagPlaceholder(ph) {
    var _a2, _b2;
    this.pieces.push(this.createPlaceholderPiece(ph.startName, (_a2 = ph.startSourceSpan) != null ? _a2 : ph.sourceSpan));
    if (!ph.isVoid) {
      ph.children.forEach((child) => child.visit(this));
      this.pieces.push(this.createPlaceholderPiece(ph.closeName, (_b2 = ph.endSourceSpan) != null ? _b2 : ph.sourceSpan));
    }
  }
  visitPlaceholder(ph) {
    this.pieces.push(this.createPlaceholderPiece(ph.name, ph.sourceSpan));
  }
  visitBlockPlaceholder(ph) {
    var _a2, _b2;
    this.pieces.push(this.createPlaceholderPiece(ph.startName, (_a2 = ph.startSourceSpan) != null ? _a2 : ph.sourceSpan));
    ph.children.forEach((child) => child.visit(this));
    this.pieces.push(this.createPlaceholderPiece(ph.closeName, (_b2 = ph.endSourceSpan) != null ? _b2 : ph.sourceSpan));
  }
  visitIcuPlaceholder(ph) {
    this.pieces.push(this.createPlaceholderPiece(ph.name, ph.sourceSpan, this.placeholderToMessage[ph.name]));
  }
  createPlaceholderPiece(name, sourceSpan, associatedMessage) {
    return new PlaceholderPiece(formatI18nPlaceholderName(name, false), sourceSpan, associatedMessage);
  }
};
function serializeI18nMessageForLocalize(message) {
  const pieces = [];
  const serializerVisitor3 = new LocalizeSerializerVisitor(message.placeholderToMessage, pieces);
  message.nodes.forEach((node) => node.visit(serializerVisitor3));
  return processMessagePieces(pieces);
}
function getSourceSpan(message) {
  const startNode = message.nodes[0];
  const endNode = message.nodes[message.nodes.length - 1];
  return new ParseSourceSpan(startNode.sourceSpan.fullStart, endNode.sourceSpan.end, startNode.sourceSpan.fullStart, startNode.sourceSpan.details);
}
function processMessagePieces(pieces) {
  const messageParts = [];
  const placeHolders = [];
  if (pieces[0] instanceof PlaceholderPiece) {
    messageParts.push(createEmptyMessagePart(pieces[0].sourceSpan.start));
  }
  for (let i = 0; i < pieces.length; i++) {
    const part = pieces[i];
    if (part instanceof LiteralPiece) {
      messageParts.push(part);
    } else {
      placeHolders.push(part);
      if (pieces[i - 1] instanceof PlaceholderPiece) {
        messageParts.push(createEmptyMessagePart(pieces[i - 1].sourceSpan.end));
      }
    }
  }
  if (pieces[pieces.length - 1] instanceof PlaceholderPiece) {
    messageParts.push(createEmptyMessagePart(pieces[pieces.length - 1].sourceSpan.end));
  }
  return { messageParts, placeHolders };
}
function createEmptyMessagePart(location) {
  return new LiteralPiece("", new ParseSourceSpan(location, location));
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/i18n_const_collection.mjs
var NG_I18N_CLOSURE_MODE = "ngI18nClosureMode";
var TRANSLATION_VAR_PREFIX2 = "i18n_";
var I18N_ICU_MAPPING_PREFIX2 = "I18N_EXP_";
var ESCAPE2 = "\uFFFD";
function collectI18nConsts(job) {
  var _a2;
  const fileBasedI18nSuffix = job.relativeContextFilePath.replace(/[^A-Za-z0-9]/g, "_").toUpperCase() + "_";
  const extractedAttributesByI18nContext = /* @__PURE__ */ new Map();
  const i18nAttributesByElement = /* @__PURE__ */ new Map();
  const i18nExpressionsByElement = /* @__PURE__ */ new Map();
  const messages = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      if (op.kind === OpKind.ExtractedAttribute && op.i18nContext !== null) {
        extractedAttributesByI18nContext.set(op.i18nContext, op);
      } else if (op.kind === OpKind.I18nAttributes) {
        i18nAttributesByElement.set(op.target, op);
      } else if (op.kind === OpKind.I18nExpression && op.usage === I18nExpressionFor.I18nAttribute) {
        const expressions = (_a2 = i18nExpressionsByElement.get(op.target)) != null ? _a2 : [];
        expressions.push(op);
        i18nExpressionsByElement.set(op.target, expressions);
      } else if (op.kind === OpKind.I18nMessage) {
        messages.set(op.xref, op);
      }
    }
  }
  const i18nValuesByContext = /* @__PURE__ */ new Map();
  const messageConstIndices = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.I18nMessage) {
        if (op.messagePlaceholder === null) {
          const { mainVar, statements } = collectMessage(job, fileBasedI18nSuffix, messages, op);
          if (op.i18nBlock !== null) {
            const i18nConst = job.addConst(mainVar, statements);
            messageConstIndices.set(op.i18nBlock, i18nConst);
          } else {
            job.constsInitializers.push(...statements);
            i18nValuesByContext.set(op.i18nContext, mainVar);
            const attributeForMessage = extractedAttributesByI18nContext.get(op.i18nContext);
            if (attributeForMessage !== void 0) {
              attributeForMessage.expression = mainVar;
            }
          }
        }
        OpList.remove(op);
      }
    }
  }
  for (const unit of job.units) {
    for (const elem of unit.create) {
      if (isElementOrContainerOp(elem)) {
        const i18nAttributes2 = i18nAttributesByElement.get(elem.xref);
        if (i18nAttributes2 === void 0) {
          continue;
        }
        let i18nExpressions = i18nExpressionsByElement.get(elem.xref);
        if (i18nExpressions === void 0) {
          throw new Error("AssertionError: Could not find any i18n expressions associated with an I18nAttributes instruction");
        }
        const seenPropertyNames = /* @__PURE__ */ new Set();
        i18nExpressions = i18nExpressions.filter((i18nExpr) => {
          const seen = seenPropertyNames.has(i18nExpr.name);
          seenPropertyNames.add(i18nExpr.name);
          return !seen;
        });
        const i18nAttributeConfig = i18nExpressions.flatMap((i18nExpr) => {
          const i18nExprValue = i18nValuesByContext.get(i18nExpr.context);
          if (i18nExprValue === void 0) {
            throw new Error("AssertionError: Could not find i18n expression's value");
          }
          return [literal(i18nExpr.name), i18nExprValue];
        });
        i18nAttributes2.i18nAttributesConfig = job.addConst(new LiteralArrayExpr(i18nAttributeConfig));
      }
    }
  }
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.I18nStart) {
        const msgIndex = messageConstIndices.get(op.root);
        if (msgIndex === void 0) {
          throw new Error("AssertionError: Could not find corresponding i18n block index for an i18n message op; was an i18n message incorrectly assumed to correspond to an attribute?");
        }
        op.messageIndex = msgIndex;
      }
    }
  }
}
function collectMessage(job, fileBasedI18nSuffix, messages, messageOp) {
  var _a2;
  const statements = [];
  const subMessagePlaceholders = /* @__PURE__ */ new Map();
  for (const subMessageId of messageOp.subMessages) {
    const subMessage = messages.get(subMessageId);
    const { mainVar: subMessageVar, statements: subMessageStatements } = collectMessage(job, fileBasedI18nSuffix, messages, subMessage);
    statements.push(...subMessageStatements);
    const subMessages = (_a2 = subMessagePlaceholders.get(subMessage.messagePlaceholder)) != null ? _a2 : [];
    subMessages.push(subMessageVar);
    subMessagePlaceholders.set(subMessage.messagePlaceholder, subMessages);
  }
  addSubMessageParams(messageOp, subMessagePlaceholders);
  messageOp.params = new Map([...messageOp.params.entries()].sort());
  const mainVar = variable(job.pool.uniqueName(TRANSLATION_VAR_PREFIX2));
  const closureVar = i18nGenerateClosureVar(job.pool, messageOp.message.id, fileBasedI18nSuffix, job.i18nUseExternalIds);
  let transformFn = void 0;
  if (messageOp.needsPostprocessing) {
    const postprocessingParams = Object.fromEntries([...messageOp.postprocessingParams.entries()].sort());
    const formattedPostprocessingParams = formatI18nPlaceholderNamesInMap(postprocessingParams, false);
    const extraTransformFnParams = [];
    if (messageOp.postprocessingParams.size > 0) {
      extraTransformFnParams.push(mapLiteral(formattedPostprocessingParams, true));
    }
    transformFn = (expr) => importExpr(Identifiers.i18nPostprocess).callFn([expr, ...extraTransformFnParams]);
  }
  statements.push(...getTranslationDeclStmts(messageOp.message, mainVar, closureVar, messageOp.params, transformFn));
  return { mainVar, statements };
}
function addSubMessageParams(messageOp, subMessagePlaceholders) {
  for (const [placeholder, subMessages] of subMessagePlaceholders) {
    if (subMessages.length === 1) {
      messageOp.params.set(placeholder, subMessages[0]);
    } else {
      messageOp.params.set(placeholder, literal(`${ESCAPE2}${I18N_ICU_MAPPING_PREFIX2}${placeholder}${ESCAPE2}`));
      messageOp.postprocessingParams.set(placeholder, literalArr(subMessages));
      messageOp.needsPostprocessing = true;
    }
  }
}
function getTranslationDeclStmts(message, variable2, closureVar, params, transformFn) {
  const paramsObject = Object.fromEntries(params);
  const statements = [
    declareI18nVariable(variable2),
    ifStmt(createClosureModeGuard(), createGoogleGetMsgStatements(variable2, message, closureVar, paramsObject), createLocalizeStatements(variable2, message, formatI18nPlaceholderNamesInMap(paramsObject, false)))
  ];
  if (transformFn) {
    statements.push(new ExpressionStatement(variable2.set(transformFn(variable2))));
  }
  return statements;
}
function createClosureModeGuard() {
  return typeofExpr(variable(NG_I18N_CLOSURE_MODE)).notIdentical(literal("undefined", STRING_TYPE)).and(variable(NG_I18N_CLOSURE_MODE));
}
function i18nGenerateClosureVar(pool, messageId, fileBasedI18nSuffix, useExternalIds) {
  let name;
  const suffix = fileBasedI18nSuffix;
  if (useExternalIds) {
    const prefix = getTranslationConstPrefix(`EXTERNAL_`);
    const uniqueSuffix = pool.uniqueName(suffix);
    name = `${prefix}${sanitizeIdentifier(messageId)}$$${uniqueSuffix}`;
  } else {
    const prefix = getTranslationConstPrefix(suffix);
    name = pool.uniqueName(prefix);
  }
  return variable(name);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/i18n_text_extraction.mjs
function convertI18nText(job) {
  var _a2;
  for (const unit of job.units) {
    let currentI18n = null;
    let currentIcu = null;
    const textNodeI18nBlocks = /* @__PURE__ */ new Map();
    const textNodeIcus = /* @__PURE__ */ new Map();
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nStart:
          if (op.context === null) {
            throw Error("I18n op should have its context set.");
          }
          currentI18n = op;
          break;
        case OpKind.I18nEnd:
          currentI18n = null;
          break;
        case OpKind.IcuStart:
          if (op.context === null) {
            throw Error("Icu op should have its context set.");
          }
          currentIcu = op;
          break;
        case OpKind.IcuEnd:
          currentIcu = null;
          break;
        case OpKind.Text:
          if (currentI18n !== null) {
            textNodeI18nBlocks.set(op.xref, currentI18n);
            textNodeIcus.set(op.xref, currentIcu);
            OpList.remove(op);
          }
          break;
      }
    }
    for (const op of unit.update) {
      switch (op.kind) {
        case OpKind.InterpolateText:
          if (!textNodeI18nBlocks.has(op.target)) {
            continue;
          }
          const i18nOp = textNodeI18nBlocks.get(op.target);
          const icuOp = textNodeIcus.get(op.target);
          const contextId = icuOp ? icuOp.context : i18nOp.context;
          const resolutionTime = icuOp ? I18nParamResolutionTime.Postproccessing : I18nParamResolutionTime.Creation;
          const ops = [];
          for (let i = 0; i < op.interpolation.expressions.length; i++) {
            const expr = op.interpolation.expressions[i];
            ops.push(createI18nExpressionOp(contextId, i18nOp.xref, i18nOp.xref, i18nOp.handle, expr, op.interpolation.i18nPlaceholders[i], resolutionTime, I18nExpressionFor.I18nText, "", (_a2 = expr.sourceSpan) != null ? _a2 : op.sourceSpan));
          }
          OpList.replaceWithMany(op, ops);
          break;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/local_refs.mjs
function liftLocalRefs(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.ElementStart:
        case OpKind.Template:
          if (!Array.isArray(op.localRefs)) {
            throw new Error(`AssertionError: expected localRefs to be an array still`);
          }
          op.numSlotsUsed += op.localRefs.length;
          if (op.localRefs.length > 0) {
            const localRefs = serializeLocalRefs(op.localRefs);
            op.localRefs = job.addConst(localRefs);
          } else {
            op.localRefs = null;
          }
          break;
      }
    }
  }
}
function serializeLocalRefs(refs) {
  const constRefs = [];
  for (const ref of refs) {
    constRefs.push(literal(ref.name), literal(ref.target));
  }
  return literalArr(constRefs);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/namespace.mjs
function emitNamespaceChanges(job) {
  for (const unit of job.units) {
    let activeNamespace = Namespace.HTML;
    for (const op of unit.create) {
      if (op.kind !== OpKind.ElementStart) {
        continue;
      }
      if (op.namespace !== activeNamespace) {
        OpList.insertBefore(createNamespaceOp(op.namespace), op);
        activeNamespace = op.namespace;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/style_parser.mjs
function parse(value) {
  const styles = [];
  let i = 0;
  let parenDepth = 0;
  let quote = 0;
  let valueStart = 0;
  let propStart = 0;
  let currentProp = null;
  while (i < value.length) {
    const token = value.charCodeAt(i++);
    switch (token) {
      case 40:
        parenDepth++;
        break;
      case 41:
        parenDepth--;
        break;
      case 39:
        if (quote === 0) {
          quote = 39;
        } else if (quote === 39 && value.charCodeAt(i - 1) !== 92) {
          quote = 0;
        }
        break;
      case 34:
        if (quote === 0) {
          quote = 34;
        } else if (quote === 34 && value.charCodeAt(i - 1) !== 92) {
          quote = 0;
        }
        break;
      case 58:
        if (!currentProp && parenDepth === 0 && quote === 0) {
          currentProp = hyphenate2(value.substring(propStart, i - 1).trim());
          valueStart = i;
        }
        break;
      case 59:
        if (currentProp && valueStart > 0 && parenDepth === 0 && quote === 0) {
          const styleVal = value.substring(valueStart, i - 1).trim();
          styles.push(currentProp, styleVal);
          propStart = i;
          valueStart = 0;
          currentProp = null;
        }
        break;
    }
  }
  if (currentProp && valueStart) {
    const styleVal = value.slice(valueStart).trim();
    styles.push(currentProp, styleVal);
  }
  return styles;
}
function hyphenate2(value) {
  return value.replace(/[a-z][A-Z]/g, (v) => {
    return v.charAt(0) + "-" + v.charAt(1);
  }).toLowerCase();
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/naming.mjs
function nameFunctionsAndVariables(job) {
  addNamesToView(job.root, job.componentName, { index: 0 }, job.compatibility === CompatibilityMode.TemplateDefinitionBuilder);
}
function addNamesToView(unit, baseName, state, compatibility) {
  if (unit.fnName === null) {
    unit.fnName = sanitizeIdentifier(`${baseName}_${unit.job.fnSuffix}`);
  }
  const varNames = /* @__PURE__ */ new Map();
  for (const op of unit.ops()) {
    switch (op.kind) {
      case OpKind.Property:
      case OpKind.HostProperty:
        if (op.isAnimationTrigger) {
          op.name = "@" + op.name;
        }
        break;
      case OpKind.Listener:
        if (op.handlerFnName !== null) {
          break;
        }
        if (!op.hostListener && op.targetSlot.slot === null) {
          throw new Error(`Expected a slot to be assigned`);
        }
        let animation = "";
        if (op.isAnimationListener) {
          op.name = `@${op.name}.${op.animationPhase}`;
          animation = "animation";
        }
        if (op.hostListener) {
          op.handlerFnName = `${baseName}_${animation}${op.name}_HostBindingHandler`;
        } else {
          op.handlerFnName = `${unit.fnName}_${op.tag.replace("-", "_")}_${animation}${op.name}_${op.targetSlot.slot}_listener`;
        }
        op.handlerFnName = sanitizeIdentifier(op.handlerFnName);
        break;
      case OpKind.Variable:
        varNames.set(op.xref, getVariableName(op.variable, state));
        break;
      case OpKind.RepeaterCreate:
        if (!(unit instanceof ViewCompilationUnit)) {
          throw new Error(`AssertionError: must be compiling a component`);
        }
        if (op.handle.slot === null) {
          throw new Error(`Expected slot to be assigned`);
        }
        if (op.emptyView !== null) {
          const emptyView = unit.job.views.get(op.emptyView);
          addNamesToView(emptyView, `${baseName}_${`${op.functionNameSuffix}Empty`}_${op.handle.slot + 2}`, state, compatibility);
        }
        addNamesToView(unit.job.views.get(op.xref), `${baseName}_${op.functionNameSuffix}_${op.handle.slot + 1}`, state, compatibility);
        break;
      case OpKind.Template:
        if (!(unit instanceof ViewCompilationUnit)) {
          throw new Error(`AssertionError: must be compiling a component`);
        }
        const childView = unit.job.views.get(op.xref);
        if (op.handle.slot === null) {
          throw new Error(`Expected slot to be assigned`);
        }
        const suffix = op.functionNameSuffix.length === 0 ? "" : `_${op.functionNameSuffix}`;
        addNamesToView(childView, `${baseName}${suffix}_${op.handle.slot}`, state, compatibility);
        break;
      case OpKind.StyleProp:
        op.name = normalizeStylePropName(op.name);
        if (compatibility) {
          op.name = stripImportant(op.name);
        }
        break;
      case OpKind.ClassProp:
        if (compatibility) {
          op.name = stripImportant(op.name);
        }
        break;
    }
  }
  for (const op of unit.ops()) {
    visitExpressionsInOp(op, (expr) => {
      if (!(expr instanceof ReadVariableExpr) || expr.name !== null) {
        return;
      }
      if (!varNames.has(expr.xref)) {
        throw new Error(`Variable ${expr.xref} not yet named`);
      }
      expr.name = varNames.get(expr.xref);
    });
  }
}
function getVariableName(variable2, state) {
  if (variable2.name === null) {
    switch (variable2.kind) {
      case SemanticVariableKind.Context:
        variable2.name = `ctx_r${state.index++}`;
        break;
      case SemanticVariableKind.Identifier:
        variable2.name = `${variable2.identifier}_r${++state.index}`;
        break;
      default:
        variable2.name = `_r${++state.index}`;
        break;
    }
  }
  return variable2.name;
}
function normalizeStylePropName(name) {
  return name.startsWith("--") ? name : hyphenate2(name);
}
function stripImportant(name) {
  const importantIndex = name.indexOf("!important");
  if (importantIndex > -1) {
    return name.substring(0, importantIndex);
  }
  return name;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/next_context_merging.mjs
function mergeNextContextExpressions(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.Listener) {
        mergeNextContextsInOps(op.handlerOps);
      }
    }
    mergeNextContextsInOps(unit.update);
  }
}
function mergeNextContextsInOps(ops) {
  for (const op of ops) {
    if (op.kind !== OpKind.Statement || !(op.statement instanceof ExpressionStatement) || !(op.statement.expr instanceof NextContextExpr)) {
      continue;
    }
    const mergeSteps = op.statement.expr.steps;
    let tryToMerge = true;
    for (let candidate = op.next; candidate.kind !== OpKind.ListEnd && tryToMerge; candidate = candidate.next) {
      visitExpressionsInOp(candidate, (expr, flags) => {
        if (!isIrExpression(expr)) {
          return expr;
        }
        if (!tryToMerge) {
          return;
        }
        if (flags & VisitorContextFlag.InChildOperation) {
          return;
        }
        switch (expr.kind) {
          case ExpressionKind.NextContext:
            expr.steps += mergeSteps;
            OpList.remove(op);
            tryToMerge = false;
            break;
          case ExpressionKind.GetCurrentView:
          case ExpressionKind.Reference:
            tryToMerge = false;
            break;
        }
        return;
      });
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/ng_container.mjs
var CONTAINER_TAG = "ng-container";
function generateNgContainerOps(job) {
  for (const unit of job.units) {
    const updatedElementXrefs = /* @__PURE__ */ new Set();
    for (const op of unit.create) {
      if (op.kind === OpKind.ElementStart && op.tag === CONTAINER_TAG) {
        op.kind = OpKind.ContainerStart;
        updatedElementXrefs.add(op.xref);
      }
      if (op.kind === OpKind.ElementEnd && updatedElementXrefs.has(op.xref)) {
        op.kind = OpKind.ContainerEnd;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/nonbindable.mjs
function lookupElement3(elements, xref) {
  const el = elements.get(xref);
  if (el === void 0) {
    throw new Error("All attributes should have an element-like target.");
  }
  return el;
}
function disableBindings(job) {
  const elements = /* @__PURE__ */ new Map();
  for (const view of job.units) {
    for (const op of view.create) {
      if (!isElementOrContainerOp(op)) {
        continue;
      }
      elements.set(op.xref, op);
    }
  }
  for (const unit of job.units) {
    for (const op of unit.create) {
      if ((op.kind === OpKind.ElementStart || op.kind === OpKind.ContainerStart) && op.nonBindable) {
        OpList.insertAfter(createDisableBindingsOp(op.xref), op);
      }
      if ((op.kind === OpKind.ElementEnd || op.kind === OpKind.ContainerEnd) && lookupElement3(elements, op.xref).nonBindable) {
        OpList.insertBefore(createEnableBindingsOp(op.xref), op);
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/nullish_coalescing.mjs
function generateNullishCoalesceExpressions(job) {
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      transformExpressionsInOp(op, (expr) => {
        if (!(expr instanceof BinaryOperatorExpr) || expr.operator !== BinaryOperator.NullishCoalesce) {
          return expr;
        }
        const assignment = new AssignTemporaryExpr(expr.lhs.clone(), job.allocateXrefId());
        const read = new ReadTemporaryExpr(assignment.xref);
        return new ConditionalExpr(new BinaryOperatorExpr(BinaryOperator.And, new BinaryOperatorExpr(BinaryOperator.NotIdentical, assignment, NULL_EXPR), new BinaryOperatorExpr(BinaryOperator.NotIdentical, read, new LiteralExpr(void 0))), read.clone(), expr.rhs);
      }, VisitorContextFlag.None);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/ordering.mjs
function kindTest(kind) {
  return (op) => op.kind === kind;
}
function kindWithInterpolationTest(kind, interpolation) {
  return (op) => {
    return op.kind === kind && interpolation === op.expression instanceof Interpolation2;
  };
}
var CREATE_ORDERING = [
  { test: (op) => op.kind === OpKind.Listener && op.hostListener && op.isAnimationListener },
  { test: (op) => op.kind === OpKind.Listener && !(op.hostListener && op.isAnimationListener) }
];
var UPDATE_ORDERING = [
  { test: kindWithInterpolationTest(OpKind.HostProperty, true) },
  { test: kindWithInterpolationTest(OpKind.HostProperty, false) },
  { test: kindTest(OpKind.StyleMap), transform: keepLast },
  { test: kindTest(OpKind.ClassMap), transform: keepLast },
  { test: kindTest(OpKind.StyleProp) },
  { test: kindTest(OpKind.ClassProp) },
  { test: kindWithInterpolationTest(OpKind.Property, true) },
  { test: kindWithInterpolationTest(OpKind.Attribute, true) },
  { test: kindWithInterpolationTest(OpKind.Property, false) },
  { test: kindWithInterpolationTest(OpKind.Attribute, false) }
];
var handledOpKinds = /* @__PURE__ */ new Set([
  OpKind.Listener,
  OpKind.StyleMap,
  OpKind.ClassMap,
  OpKind.StyleProp,
  OpKind.ClassProp,
  OpKind.Property,
  OpKind.HostProperty,
  OpKind.Attribute
]);
function orderOps(job) {
  for (const unit of job.units) {
    orderWithin(unit.create, CREATE_ORDERING);
    orderWithin(unit.update, UPDATE_ORDERING);
  }
}
function orderWithin(opList, ordering) {
  let opsToOrder = [];
  let firstTargetInGroup = null;
  for (const op of opList) {
    const currentTarget = hasDependsOnSlotContextTrait(op) ? op.target : null;
    if (!handledOpKinds.has(op.kind) || currentTarget !== firstTargetInGroup && (firstTargetInGroup !== null && currentTarget !== null)) {
      OpList.insertBefore(reorder(opsToOrder, ordering), op);
      opsToOrder = [];
      firstTargetInGroup = null;
    }
    if (handledOpKinds.has(op.kind)) {
      opsToOrder.push(op);
      OpList.remove(op);
      firstTargetInGroup = currentTarget != null ? currentTarget : firstTargetInGroup;
    }
  }
  opList.push(reorder(opsToOrder, ordering));
}
function reorder(ops, ordering) {
  const groups = Array.from(ordering, () => new Array());
  for (const op of ops) {
    const groupIndex = ordering.findIndex((o) => o.test(op));
    groups[groupIndex].push(op);
  }
  return groups.flatMap((group, i) => {
    const transform2 = ordering[i].transform;
    return transform2 ? transform2(group) : group;
  });
}
function keepLast(ops) {
  return ops.slice(ops.length - 1);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/parse_extracted_styles.mjs
function parseExtractedStyles(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.ExtractedAttribute && op.bindingKind === BindingKind.Attribute && isStringLiteral(op.expression)) {
        if (op.name === "style") {
          const parsedStyles = parse(op.expression.value);
          for (let i = 0; i < parsedStyles.length - 1; i += 2) {
            OpList.insertBefore(createExtractedAttributeOp(op.target, BindingKind.StyleProperty, parsedStyles[i], literal(parsedStyles[i + 1]), null), op);
          }
          OpList.remove(op);
        } else if (op.name === "class") {
          const parsedClasses = op.expression.value.trim().split(/\s+/g);
          for (const parsedClass of parsedClasses) {
            OpList.insertBefore(createExtractedAttributeOp(op.target, BindingKind.ClassName, parsedClass, null, null), op);
          }
          OpList.remove(op);
        }
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/phase_remove_content_selectors.mjs
function removeContentSelectors(job) {
  for (const unit of job.units) {
    const elements = createOpXrefMap(unit);
    for (const op of unit.ops()) {
      switch (op.kind) {
        case OpKind.Binding:
          const target = lookupInXrefMap(elements, op.target);
          if (isSelectAttribute(op.name) && target.kind === OpKind.Projection) {
            OpList.remove(op);
          }
          break;
        case OpKind.Projection:
          for (let i = op.attributes.length - 2; i >= 0; i -= 2) {
            if (isSelectAttribute(op.attributes[i])) {
              op.attributes.splice(i, 2);
            }
          }
          break;
      }
    }
  }
}
function isSelectAttribute(name) {
  return name.toLowerCase() === "select";
}
function lookupInXrefMap(map, xref) {
  const el = map.get(xref);
  if (el === void 0) {
    throw new Error("All attributes should have an slottable target.");
  }
  return el;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/pipe_creation.mjs
function createPipes(job) {
  for (const unit of job.units) {
    processPipeBindingsInView(unit);
  }
}
function processPipeBindingsInView(unit) {
  for (const updateOp of unit.update) {
    visitExpressionsInOp(updateOp, (expr, flags) => {
      if (!isIrExpression(expr)) {
        return;
      }
      if (expr.kind !== ExpressionKind.PipeBinding) {
        return;
      }
      if (flags & VisitorContextFlag.InChildOperation) {
        throw new Error(`AssertionError: pipe bindings should not appear in child expressions`);
      }
      if (unit.job.compatibility) {
        const slotHandle = updateOp.target;
        if (slotHandle == void 0) {
          throw new Error(`AssertionError: expected slot handle to be assigned for pipe creation`);
        }
        addPipeToCreationBlock(unit, updateOp.target, expr);
      } else {
        unit.create.push(createPipeOp(expr.target, expr.targetSlot, expr.name));
      }
    });
  }
}
function addPipeToCreationBlock(unit, afterTargetXref, binding) {
  for (let op = unit.create.head.next; op.kind !== OpKind.ListEnd; op = op.next) {
    if (!hasConsumesSlotTrait(op)) {
      continue;
    }
    if (op.xref !== afterTargetXref) {
      continue;
    }
    while (op.next.kind === OpKind.Pipe) {
      op = op.next;
    }
    const pipe2 = createPipeOp(binding.target, binding.targetSlot, binding.name);
    OpList.insertBefore(pipe2, op.next);
    return;
  }
  throw new Error(`AssertionError: unable to find insertion point for pipe ${binding.name}`);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/pipe_variadic.mjs
function createVariadicPipes(job) {
  for (const unit of job.units) {
    for (const op of unit.update) {
      transformExpressionsInOp(op, (expr) => {
        if (!(expr instanceof PipeBindingExpr)) {
          return expr;
        }
        if (expr.args.length <= 4) {
          return expr;
        }
        return new PipeBindingVariadicExpr(expr.target, expr.targetSlot, expr.name, literalArr(expr.args), expr.args.length);
      }, VisitorContextFlag.None);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/propagate_i18n_blocks.mjs
function propagateI18nBlocks(job) {
  propagateI18nBlocksToTemplates(job.root, 0);
}
function propagateI18nBlocksToTemplates(unit, subTemplateIndex) {
  let i18nBlock = null;
  for (const op of unit.create) {
    switch (op.kind) {
      case OpKind.I18nStart:
        op.subTemplateIndex = subTemplateIndex === 0 ? null : subTemplateIndex;
        i18nBlock = op;
        break;
      case OpKind.I18nEnd:
        if (i18nBlock.subTemplateIndex === null) {
          subTemplateIndex = 0;
        }
        i18nBlock = null;
        break;
      case OpKind.Template:
        const templateView = unit.job.views.get(op.xref);
        if (op.i18nPlaceholder !== void 0) {
          if (i18nBlock === null) {
            throw Error("Expected template with i18n placeholder to be in an i18n block.");
          }
          subTemplateIndex++;
          wrapTemplateWithI18n(templateView, i18nBlock);
        }
        subTemplateIndex = propagateI18nBlocksToTemplates(templateView, subTemplateIndex);
    }
  }
  return subTemplateIndex;
}
function wrapTemplateWithI18n(unit, parentI18n) {
  var _a2;
  if (((_a2 = unit.create.head.next) == null ? void 0 : _a2.kind) !== OpKind.I18nStart) {
    const id = unit.job.allocateXrefId();
    OpList.insertAfter(createI18nStartOp(id, parentI18n.message, parentI18n.root), unit.create.head);
    OpList.insertBefore(createI18nEndOp(id), unit.create.tail);
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/pure_function_extraction.mjs
function extractPureFunctions(job) {
  for (const view of job.units) {
    for (const op of view.ops()) {
      visitExpressionsInOp(op, (expr) => {
        if (!(expr instanceof PureFunctionExpr) || expr.body === null) {
          return;
        }
        const constantDef = new PureFunctionConstant(expr.args.length);
        expr.fn = job.pool.getSharedConstant(constantDef, expr.body);
        expr.body = null;
      });
    }
  }
}
var PureFunctionConstant = class extends GenericKeyFn {
  constructor(numArgs) {
    super();
    this.numArgs = numArgs;
  }
  keyOf(expr) {
    if (expr instanceof PureFunctionParameterExpr) {
      return `param(${expr.index})`;
    } else {
      return super.keyOf(expr);
    }
  }
  toSharedConstantDeclaration(declName, keyExpr) {
    const fnParams = [];
    for (let idx = 0; idx < this.numArgs; idx++) {
      fnParams.push(new FnParam("a" + idx));
    }
    const returnExpr = transformExpressionsInExpression(keyExpr, (expr) => {
      if (!(expr instanceof PureFunctionParameterExpr)) {
        return expr;
      }
      return variable("a" + expr.index);
    }, VisitorContextFlag.None);
    return new DeclareVarStmt(declName, new ArrowFunctionExpr(fnParams, returnExpr), void 0, StmtModifier.Final);
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/pure_literal_structures.mjs
function generatePureLiteralStructures(job) {
  for (const unit of job.units) {
    for (const op of unit.update) {
      transformExpressionsInOp(op, (expr, flags) => {
        if (flags & VisitorContextFlag.InChildOperation) {
          return expr;
        }
        if (expr instanceof LiteralArrayExpr) {
          return transformLiteralArray(expr);
        } else if (expr instanceof LiteralMapExpr) {
          return transformLiteralMap(expr);
        }
        return expr;
      }, VisitorContextFlag.None);
    }
  }
}
function transformLiteralArray(expr) {
  const derivedEntries = [];
  const nonConstantArgs = [];
  for (const entry of expr.entries) {
    if (entry.isConstant()) {
      derivedEntries.push(entry);
    } else {
      const idx = nonConstantArgs.length;
      nonConstantArgs.push(entry);
      derivedEntries.push(new PureFunctionParameterExpr(idx));
    }
  }
  return new PureFunctionExpr(literalArr(derivedEntries), nonConstantArgs);
}
function transformLiteralMap(expr) {
  let derivedEntries = [];
  const nonConstantArgs = [];
  for (const entry of expr.entries) {
    if (entry.value.isConstant()) {
      derivedEntries.push(entry);
    } else {
      const idx = nonConstantArgs.length;
      nonConstantArgs.push(entry.value);
      derivedEntries.push(new LiteralMapEntry(entry.key, new PureFunctionParameterExpr(idx), entry.quoted));
    }
  }
  return new PureFunctionExpr(literalMap(derivedEntries), nonConstantArgs);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/instruction.mjs
function element(slot, tag, constIndex, localRefIndex, sourceSpan) {
  return elementOrContainerBase(Identifiers.element, slot, tag, constIndex, localRefIndex, sourceSpan);
}
function elementStart(slot, tag, constIndex, localRefIndex, sourceSpan) {
  return elementOrContainerBase(Identifiers.elementStart, slot, tag, constIndex, localRefIndex, sourceSpan);
}
function elementOrContainerBase(instruction, slot, tag, constIndex, localRefIndex, sourceSpan) {
  const args = [literal(slot)];
  if (tag !== null) {
    args.push(literal(tag));
  }
  if (localRefIndex !== null) {
    args.push(
      literal(constIndex),
      literal(localRefIndex)
    );
  } else if (constIndex !== null) {
    args.push(literal(constIndex));
  }
  return call(instruction, args, sourceSpan);
}
function elementEnd(sourceSpan) {
  return call(Identifiers.elementEnd, [], sourceSpan);
}
function elementContainerStart(slot, constIndex, localRefIndex, sourceSpan) {
  return elementOrContainerBase(Identifiers.elementContainerStart, slot, null, constIndex, localRefIndex, sourceSpan);
}
function elementContainer(slot, constIndex, localRefIndex, sourceSpan) {
  return elementOrContainerBase(Identifiers.elementContainer, slot, null, constIndex, localRefIndex, sourceSpan);
}
function elementContainerEnd() {
  return call(Identifiers.elementContainerEnd, [], null);
}
function template(slot, templateFnRef, decls, vars, tag, constIndex, localRefs, sourceSpan) {
  const args = [
    literal(slot),
    templateFnRef,
    literal(decls),
    literal(vars),
    literal(tag),
    literal(constIndex)
  ];
  if (localRefs !== null) {
    args.push(literal(localRefs));
    args.push(importExpr(Identifiers.templateRefExtractor));
  }
  while (args[args.length - 1].isEquivalent(NULL_EXPR)) {
    args.pop();
  }
  return call(Identifiers.templateCreate, args, sourceSpan);
}
function disableBindings2() {
  return call(Identifiers.disableBindings, [], null);
}
function enableBindings() {
  return call(Identifiers.enableBindings, [], null);
}
function listener(name, handlerFn, sourceSpan) {
  return call(Identifiers.listener, [
    literal(name),
    handlerFn
  ], sourceSpan);
}
function syntheticHostListener(name, handlerFn, sourceSpan) {
  return call(Identifiers.syntheticHostListener, [
    literal(name),
    handlerFn
  ], sourceSpan);
}
function pipe(slot, name) {
  return call(Identifiers.pipe, [
    literal(slot),
    literal(name)
  ], null);
}
function namespaceHTML() {
  return call(Identifiers.namespaceHTML, [], null);
}
function namespaceSVG() {
  return call(Identifiers.namespaceSVG, [], null);
}
function namespaceMath() {
  return call(Identifiers.namespaceMathML, [], null);
}
function advance(delta, sourceSpan) {
  return call(Identifiers.advance, [
    literal(delta)
  ], sourceSpan);
}
function reference(slot) {
  return importExpr(Identifiers.reference).callFn([
    literal(slot)
  ]);
}
function nextContext(steps) {
  return importExpr(Identifiers.nextContext).callFn(steps === 1 ? [] : [literal(steps)]);
}
function getCurrentView() {
  return importExpr(Identifiers.getCurrentView).callFn([]);
}
function restoreView(savedView) {
  return importExpr(Identifiers.restoreView).callFn([
    savedView
  ]);
}
function resetView(returnValue) {
  return importExpr(Identifiers.resetView).callFn([
    returnValue
  ]);
}
function text(slot, initialValue, sourceSpan) {
  const args = [literal(slot, null)];
  if (initialValue !== "") {
    args.push(literal(initialValue));
  }
  return call(Identifiers.text, args, sourceSpan);
}
function defer(selfSlot, primarySlot, dependencyResolverFn, loadingSlot, placeholderSlot, errorSlot, loadingConfig, placeholderConfig, enableTimerScheduling, sourceSpan) {
  const args = [
    literal(selfSlot),
    literal(primarySlot),
    dependencyResolverFn != null ? dependencyResolverFn : literal(null),
    literal(loadingSlot),
    literal(placeholderSlot),
    literal(errorSlot),
    loadingConfig != null ? loadingConfig : literal(null),
    placeholderConfig != null ? placeholderConfig : literal(null),
    enableTimerScheduling ? importExpr(Identifiers.deferEnableTimerScheduling) : literal(null)
  ];
  let expr;
  while ((expr = args[args.length - 1]) !== null && expr instanceof LiteralExpr && expr.value === null) {
    args.pop();
  }
  return call(Identifiers.defer, args, sourceSpan);
}
var deferTriggerToR3TriggerInstructionsMap = /* @__PURE__ */ new Map([
  [DeferTriggerKind.Idle, [Identifiers.deferOnIdle, Identifiers.deferPrefetchOnIdle]],
  [
    DeferTriggerKind.Immediate,
    [Identifiers.deferOnImmediate, Identifiers.deferPrefetchOnImmediate]
  ],
  [DeferTriggerKind.Timer, [Identifiers.deferOnTimer, Identifiers.deferPrefetchOnTimer]],
  [DeferTriggerKind.Hover, [Identifiers.deferOnHover, Identifiers.deferPrefetchOnHover]],
  [
    DeferTriggerKind.Interaction,
    [Identifiers.deferOnInteraction, Identifiers.deferPrefetchOnInteraction]
  ],
  [
    DeferTriggerKind.Viewport,
    [Identifiers.deferOnViewport, Identifiers.deferPrefetchOnViewport]
  ]
]);
function deferOn(trigger, args, prefetch, sourceSpan) {
  const instructions = deferTriggerToR3TriggerInstructionsMap.get(trigger);
  if (instructions === void 0) {
    throw new Error(`Unable to determine instruction for trigger ${trigger}`);
  }
  const instructionToCall = prefetch ? instructions[1] : instructions[0];
  return call(instructionToCall, args.map((a) => literal(a)), sourceSpan);
}
function projectionDef(def) {
  return call(Identifiers.projectionDef, def ? [def] : [], null);
}
function projection(slot, projectionSlotIndex, attributes, sourceSpan) {
  const args = [literal(slot)];
  if (projectionSlotIndex !== 0 || attributes.length > 0) {
    args.push(literal(projectionSlotIndex));
    if (attributes.length > 0) {
      args.push(literalArr(attributes.map((attr) => literal(attr))));
    }
  }
  return call(Identifiers.projection, args, sourceSpan);
}
function i18nStart(slot, constIndex, subTemplateIndex) {
  const args = [literal(slot), literal(constIndex)];
  if (subTemplateIndex !== null) {
    args.push(literal(subTemplateIndex));
  }
  return call(Identifiers.i18nStart, args, null);
}
function repeaterCreate(slot, viewFnName, decls, vars, tag, constIndex, trackByFn, trackByUsesComponentInstance, emptyViewFnName, emptyDecls, emptyVars, sourceSpan) {
  const args = [
    literal(slot),
    variable(viewFnName),
    literal(decls),
    literal(vars),
    literal(tag),
    literal(constIndex),
    trackByFn
  ];
  if (trackByUsesComponentInstance || emptyViewFnName !== null) {
    args.push(literal(trackByUsesComponentInstance));
    if (emptyViewFnName !== null) {
      args.push(variable(emptyViewFnName), literal(emptyDecls), literal(emptyVars));
    }
  }
  return call(Identifiers.repeaterCreate, args, sourceSpan);
}
function repeater(collection, sourceSpan) {
  return call(Identifiers.repeater, [collection], sourceSpan);
}
function deferWhen(prefetch, expr, sourceSpan) {
  return call(prefetch ? Identifiers.deferPrefetchWhen : Identifiers.deferWhen, [expr], sourceSpan);
}
function i18n(slot, constIndex, subTemplateIndex) {
  const args = [literal(slot), literal(constIndex)];
  if (subTemplateIndex) {
    args.push(literal(subTemplateIndex));
  }
  return call(Identifiers.i18n, args, null);
}
function i18nEnd() {
  return call(Identifiers.i18nEnd, [], null);
}
function i18nAttributes(slot, i18nAttributesConfig) {
  const args = [literal(slot), literal(i18nAttributesConfig)];
  return call(Identifiers.i18nAttributes, args, null);
}
function property(name, expression, sanitizer, sourceSpan) {
  const args = [literal(name), expression];
  if (sanitizer !== null) {
    args.push(sanitizer);
  }
  return call(Identifiers.property, args, sourceSpan);
}
function attribute(name, expression, sanitizer) {
  const args = [literal(name), expression];
  if (sanitizer !== null) {
    args.push(sanitizer);
  }
  return call(Identifiers.attribute, args, null);
}
function styleProp(name, expression, unit, sourceSpan) {
  const args = [literal(name), expression];
  if (unit !== null) {
    args.push(literal(unit));
  }
  return call(Identifiers.styleProp, args, sourceSpan);
}
function classProp(name, expression, sourceSpan) {
  return call(Identifiers.classProp, [literal(name), expression], sourceSpan);
}
function styleMap(expression, sourceSpan) {
  return call(Identifiers.styleMap, [expression], sourceSpan);
}
function classMap(expression, sourceSpan) {
  return call(Identifiers.classMap, [expression], sourceSpan);
}
var PIPE_BINDINGS = [
  Identifiers.pipeBind1,
  Identifiers.pipeBind2,
  Identifiers.pipeBind3,
  Identifiers.pipeBind4
];
function pipeBind(slot, varOffset, args) {
  if (args.length < 1 || args.length > PIPE_BINDINGS.length) {
    throw new Error(`pipeBind() argument count out of bounds`);
  }
  const instruction = PIPE_BINDINGS[args.length - 1];
  return importExpr(instruction).callFn([
    literal(slot),
    literal(varOffset),
    ...args
  ]);
}
function pipeBindV(slot, varOffset, args) {
  return importExpr(Identifiers.pipeBindV).callFn([
    literal(slot),
    literal(varOffset),
    args
  ]);
}
function textInterpolate(strings, expressions, sourceSpan) {
  if (strings.length < 1 || expressions.length !== strings.length - 1) {
    throw new Error(`AssertionError: expected specific shape of args for strings/expressions in interpolation`);
  }
  const interpolationArgs = [];
  if (expressions.length === 1 && strings[0] === "" && strings[1] === "") {
    interpolationArgs.push(expressions[0]);
  } else {
    let idx;
    for (idx = 0; idx < expressions.length; idx++) {
      interpolationArgs.push(literal(strings[idx]), expressions[idx]);
    }
    interpolationArgs.push(literal(strings[idx]));
  }
  return callVariadicInstruction(TEXT_INTERPOLATE_CONFIG, [], interpolationArgs, [], sourceSpan);
}
function i18nExp(expr, sourceSpan) {
  return call(Identifiers.i18nExp, [expr], sourceSpan);
}
function i18nApply(slot, sourceSpan) {
  return call(Identifiers.i18nApply, [literal(slot)], sourceSpan);
}
function propertyInterpolate(name, strings, expressions, sanitizer, sourceSpan) {
  const interpolationArgs = collateInterpolationArgs(strings, expressions);
  const extraArgs = [];
  if (sanitizer !== null) {
    extraArgs.push(sanitizer);
  }
  return callVariadicInstruction(PROPERTY_INTERPOLATE_CONFIG, [literal(name)], interpolationArgs, extraArgs, sourceSpan);
}
function attributeInterpolate(name, strings, expressions, sanitizer, sourceSpan) {
  const interpolationArgs = collateInterpolationArgs(strings, expressions);
  const extraArgs = [];
  if (sanitizer !== null) {
    extraArgs.push(sanitizer);
  }
  return callVariadicInstruction(ATTRIBUTE_INTERPOLATE_CONFIG, [literal(name)], interpolationArgs, extraArgs, sourceSpan);
}
function stylePropInterpolate(name, strings, expressions, unit, sourceSpan) {
  const interpolationArgs = collateInterpolationArgs(strings, expressions);
  const extraArgs = [];
  if (unit !== null) {
    extraArgs.push(literal(unit));
  }
  return callVariadicInstruction(STYLE_PROP_INTERPOLATE_CONFIG, [literal(name)], interpolationArgs, extraArgs, sourceSpan);
}
function styleMapInterpolate(strings, expressions, sourceSpan) {
  const interpolationArgs = collateInterpolationArgs(strings, expressions);
  return callVariadicInstruction(STYLE_MAP_INTERPOLATE_CONFIG, [], interpolationArgs, [], sourceSpan);
}
function classMapInterpolate(strings, expressions, sourceSpan) {
  const interpolationArgs = collateInterpolationArgs(strings, expressions);
  return callVariadicInstruction(CLASS_MAP_INTERPOLATE_CONFIG, [], interpolationArgs, [], sourceSpan);
}
function hostProperty(name, expression, sourceSpan) {
  return call(Identifiers.hostProperty, [literal(name), expression], sourceSpan);
}
function syntheticHostProperty(name, expression, sourceSpan) {
  return call(Identifiers.syntheticHostProperty, [literal(name), expression], sourceSpan);
}
function pureFunction(varOffset, fn2, args) {
  return callVariadicInstructionExpr(PURE_FUNCTION_CONFIG, [
    literal(varOffset),
    fn2
  ], args, [], null);
}
function collateInterpolationArgs(strings, expressions) {
  if (strings.length < 1 || expressions.length !== strings.length - 1) {
    throw new Error(`AssertionError: expected specific shape of args for strings/expressions in interpolation`);
  }
  const interpolationArgs = [];
  if (expressions.length === 1 && strings[0] === "" && strings[1] === "") {
    interpolationArgs.push(expressions[0]);
  } else {
    let idx;
    for (idx = 0; idx < expressions.length; idx++) {
      interpolationArgs.push(literal(strings[idx]), expressions[idx]);
    }
    interpolationArgs.push(literal(strings[idx]));
  }
  return interpolationArgs;
}
function call(instruction, args, sourceSpan) {
  const expr = importExpr(instruction).callFn(args, sourceSpan);
  return createStatementOp(new ExpressionStatement(expr, sourceSpan));
}
function conditional(slot, condition, contextValue, sourceSpan) {
  const args = [literal(slot), condition];
  if (contextValue !== null) {
    args.push(contextValue);
  }
  return call(Identifiers.conditional, args, sourceSpan);
}
var TEXT_INTERPOLATE_CONFIG = {
  constant: [
    Identifiers.textInterpolate,
    Identifiers.textInterpolate1,
    Identifiers.textInterpolate2,
    Identifiers.textInterpolate3,
    Identifiers.textInterpolate4,
    Identifiers.textInterpolate5,
    Identifiers.textInterpolate6,
    Identifiers.textInterpolate7,
    Identifiers.textInterpolate8
  ],
  variable: Identifiers.textInterpolateV,
  mapping: (n) => {
    if (n % 2 === 0) {
      throw new Error(`Expected odd number of arguments`);
    }
    return (n - 1) / 2;
  }
};
var PROPERTY_INTERPOLATE_CONFIG = {
  constant: [
    Identifiers.propertyInterpolate,
    Identifiers.propertyInterpolate1,
    Identifiers.propertyInterpolate2,
    Identifiers.propertyInterpolate3,
    Identifiers.propertyInterpolate4,
    Identifiers.propertyInterpolate5,
    Identifiers.propertyInterpolate6,
    Identifiers.propertyInterpolate7,
    Identifiers.propertyInterpolate8
  ],
  variable: Identifiers.propertyInterpolateV,
  mapping: (n) => {
    if (n % 2 === 0) {
      throw new Error(`Expected odd number of arguments`);
    }
    return (n - 1) / 2;
  }
};
var STYLE_PROP_INTERPOLATE_CONFIG = {
  constant: [
    Identifiers.styleProp,
    Identifiers.stylePropInterpolate1,
    Identifiers.stylePropInterpolate2,
    Identifiers.stylePropInterpolate3,
    Identifiers.stylePropInterpolate4,
    Identifiers.stylePropInterpolate5,
    Identifiers.stylePropInterpolate6,
    Identifiers.stylePropInterpolate7,
    Identifiers.stylePropInterpolate8
  ],
  variable: Identifiers.stylePropInterpolateV,
  mapping: (n) => {
    if (n % 2 === 0) {
      throw new Error(`Expected odd number of arguments`);
    }
    return (n - 1) / 2;
  }
};
var ATTRIBUTE_INTERPOLATE_CONFIG = {
  constant: [
    Identifiers.attribute,
    Identifiers.attributeInterpolate1,
    Identifiers.attributeInterpolate2,
    Identifiers.attributeInterpolate3,
    Identifiers.attributeInterpolate4,
    Identifiers.attributeInterpolate5,
    Identifiers.attributeInterpolate6,
    Identifiers.attributeInterpolate7,
    Identifiers.attributeInterpolate8
  ],
  variable: Identifiers.attributeInterpolateV,
  mapping: (n) => {
    if (n % 2 === 0) {
      throw new Error(`Expected odd number of arguments`);
    }
    return (n - 1) / 2;
  }
};
var STYLE_MAP_INTERPOLATE_CONFIG = {
  constant: [
    Identifiers.styleMap,
    Identifiers.styleMapInterpolate1,
    Identifiers.styleMapInterpolate2,
    Identifiers.styleMapInterpolate3,
    Identifiers.styleMapInterpolate4,
    Identifiers.styleMapInterpolate5,
    Identifiers.styleMapInterpolate6,
    Identifiers.styleMapInterpolate7,
    Identifiers.styleMapInterpolate8
  ],
  variable: Identifiers.styleMapInterpolateV,
  mapping: (n) => {
    if (n % 2 === 0) {
      throw new Error(`Expected odd number of arguments`);
    }
    return (n - 1) / 2;
  }
};
var CLASS_MAP_INTERPOLATE_CONFIG = {
  constant: [
    Identifiers.classMap,
    Identifiers.classMapInterpolate1,
    Identifiers.classMapInterpolate2,
    Identifiers.classMapInterpolate3,
    Identifiers.classMapInterpolate4,
    Identifiers.classMapInterpolate5,
    Identifiers.classMapInterpolate6,
    Identifiers.classMapInterpolate7,
    Identifiers.classMapInterpolate8
  ],
  variable: Identifiers.classMapInterpolateV,
  mapping: (n) => {
    if (n % 2 === 0) {
      throw new Error(`Expected odd number of arguments`);
    }
    return (n - 1) / 2;
  }
};
var PURE_FUNCTION_CONFIG = {
  constant: [
    Identifiers.pureFunction0,
    Identifiers.pureFunction1,
    Identifiers.pureFunction2,
    Identifiers.pureFunction3,
    Identifiers.pureFunction4,
    Identifiers.pureFunction5,
    Identifiers.pureFunction6,
    Identifiers.pureFunction7,
    Identifiers.pureFunction8
  ],
  variable: Identifiers.pureFunctionV,
  mapping: (n) => n
};
function callVariadicInstructionExpr(config, baseArgs, interpolationArgs, extraArgs, sourceSpan) {
  const n = config.mapping(interpolationArgs.length);
  if (n < config.constant.length) {
    return importExpr(config.constant[n]).callFn([...baseArgs, ...interpolationArgs, ...extraArgs], sourceSpan);
  } else if (config.variable !== null) {
    return importExpr(config.variable).callFn([...baseArgs, literalArr(interpolationArgs), ...extraArgs], sourceSpan);
  } else {
    throw new Error(`AssertionError: unable to call variadic function`);
  }
}
function callVariadicInstruction(config, baseArgs, interpolationArgs, extraArgs, sourceSpan) {
  return createStatementOp(callVariadicInstructionExpr(config, baseArgs, interpolationArgs, extraArgs, sourceSpan).toStmt());
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/reify.mjs
var sanitizerIdentifierMap = /* @__PURE__ */ new Map([
  [SanitizerFn.Html, Identifiers.sanitizeHtml],
  [SanitizerFn.IframeAttribute, Identifiers.validateIframeAttribute],
  [SanitizerFn.ResourceUrl, Identifiers.sanitizeResourceUrl],
  [SanitizerFn.Script, Identifiers.sanitizeScript],
  [SanitizerFn.Style, Identifiers.sanitizeStyle],
  [SanitizerFn.Url, Identifiers.sanitizeUrl]
]);
function reify(job) {
  for (const unit of job.units) {
    reifyCreateOperations(unit, unit.create);
    reifyUpdateOperations(unit, unit.update);
  }
}
function reifyCreateOperations(unit, ops) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g;
  for (const op of ops) {
    transformExpressionsInOp(op, reifyIrExpression, VisitorContextFlag.None);
    switch (op.kind) {
      case OpKind.Text:
        OpList.replace(op, text(op.handle.slot, op.initialValue, op.sourceSpan));
        break;
      case OpKind.ElementStart:
        OpList.replace(op, elementStart(op.handle.slot, op.tag, op.attributes, op.localRefs, op.sourceSpan));
        break;
      case OpKind.Element:
        OpList.replace(op, element(op.handle.slot, op.tag, op.attributes, op.localRefs, op.sourceSpan));
        break;
      case OpKind.ElementEnd:
        OpList.replace(op, elementEnd(op.sourceSpan));
        break;
      case OpKind.ContainerStart:
        OpList.replace(op, elementContainerStart(op.handle.slot, op.attributes, op.localRefs, op.sourceSpan));
        break;
      case OpKind.Container:
        OpList.replace(op, elementContainer(op.handle.slot, op.attributes, op.localRefs, op.sourceSpan));
        break;
      case OpKind.ContainerEnd:
        OpList.replace(op, elementContainerEnd());
        break;
      case OpKind.I18nStart:
        OpList.replace(op, i18nStart(op.handle.slot, op.messageIndex, op.subTemplateIndex));
        break;
      case OpKind.I18nEnd:
        OpList.replace(op, i18nEnd());
        break;
      case OpKind.I18n:
        OpList.replace(op, i18n(op.handle.slot, op.messageIndex, op.subTemplateIndex));
        break;
      case OpKind.I18nAttributes:
        if (op.i18nAttributesConfig === null) {
          throw new Error(`AssertionError: i18nAttributesConfig was not set`);
        }
        OpList.replace(op, i18nAttributes(op.handle.slot, op.i18nAttributesConfig));
        break;
      case OpKind.Template:
        if (!(unit instanceof ViewCompilationUnit)) {
          throw new Error(`AssertionError: must be compiling a component`);
        }
        if (Array.isArray(op.localRefs)) {
          throw new Error(`AssertionError: local refs array should have been extracted into a constant`);
        }
        const childView = unit.job.views.get(op.xref);
        OpList.replace(op, template(op.handle.slot, variable(childView.fnName), childView.decls, childView.vars, op.tag, op.attributes, op.localRefs, op.sourceSpan));
        break;
      case OpKind.DisableBindings:
        OpList.replace(op, disableBindings2());
        break;
      case OpKind.EnableBindings:
        OpList.replace(op, enableBindings());
        break;
      case OpKind.Pipe:
        OpList.replace(op, pipe(op.handle.slot, op.name));
        break;
      case OpKind.Listener:
        const listenerFn = reifyListenerHandler(unit, op.handlerFnName, op.handlerOps, op.consumesDollarEvent);
        const reified = op.hostListener && op.isAnimationListener ? syntheticHostListener(op.name, listenerFn, op.sourceSpan) : listener(op.name, listenerFn, op.sourceSpan);
        OpList.replace(op, reified);
        break;
      case OpKind.Variable:
        if (op.variable.name === null) {
          throw new Error(`AssertionError: unnamed variable ${op.xref}`);
        }
        OpList.replace(op, createStatementOp(new DeclareVarStmt(op.variable.name, op.initializer, void 0, StmtModifier.Final)));
        break;
      case OpKind.Namespace:
        switch (op.active) {
          case Namespace.HTML:
            OpList.replace(op, namespaceHTML());
            break;
          case Namespace.SVG:
            OpList.replace(op, namespaceSVG());
            break;
          case Namespace.Math:
            OpList.replace(op, namespaceMath());
            break;
        }
        break;
      case OpKind.Defer:
        const timerScheduling = !!op.loadingMinimumTime || !!op.loadingAfterTime || !!op.placeholderMinimumTime;
        OpList.replace(op, defer(op.handle.slot, op.mainSlot.slot, op.resolverFn, (_b2 = (_a2 = op.loadingSlot) == null ? void 0 : _a2.slot) != null ? _b2 : null, (_d2 = (_c2 = op.placeholderSlot) == null ? void 0 : _c2.slot) != null ? _d2 : null, (_f2 = (_e2 = op.errorSlot) == null ? void 0 : _e2.slot) != null ? _f2 : null, op.loadingConfig, op.placeholderConfig, timerScheduling, op.sourceSpan));
        break;
      case OpKind.DeferOn:
        let args = [];
        switch (op.trigger.kind) {
          case DeferTriggerKind.Idle:
          case DeferTriggerKind.Immediate:
            break;
          case DeferTriggerKind.Timer:
            args = [op.trigger.delay];
            break;
          case DeferTriggerKind.Interaction:
          case DeferTriggerKind.Hover:
          case DeferTriggerKind.Viewport:
            if (((_g = op.trigger.targetSlot) == null ? void 0 : _g.slot) == null || op.trigger.targetSlotViewSteps === null) {
              throw new Error(`Slot or view steps not set in trigger reification for trigger kind ${op.trigger.kind}`);
            }
            args = [op.trigger.targetSlot.slot];
            if (op.trigger.targetSlotViewSteps !== 0) {
              args.push(op.trigger.targetSlotViewSteps);
            }
            break;
          default:
            throw new Error(`AssertionError: Unsupported reification of defer trigger kind ${op.trigger.kind}`);
        }
        OpList.replace(op, deferOn(op.trigger.kind, args, op.prefetch, op.sourceSpan));
        break;
      case OpKind.ProjectionDef:
        OpList.replace(op, projectionDef(op.def));
        break;
      case OpKind.Projection:
        if (op.handle.slot === null) {
          throw new Error("No slot was assigned for project instruction");
        }
        OpList.replace(op, projection(op.handle.slot, op.projectionSlotIndex, op.attributes, op.sourceSpan));
        break;
      case OpKind.RepeaterCreate:
        if (op.handle.slot === null) {
          throw new Error("No slot was assigned for repeater instruction");
        }
        if (!(unit instanceof ViewCompilationUnit)) {
          throw new Error(`AssertionError: must be compiling a component`);
        }
        const repeaterView = unit.job.views.get(op.xref);
        if (repeaterView.fnName === null) {
          throw new Error(`AssertionError: expected repeater primary view to have been named`);
        }
        let emptyViewFnName = null;
        let emptyDecls = null;
        let emptyVars = null;
        if (op.emptyView !== null) {
          const emptyView = unit.job.views.get(op.emptyView);
          if (emptyView === void 0) {
            throw new Error("AssertionError: repeater had empty view xref, but empty view was not found");
          }
          if (emptyView.fnName === null || emptyView.decls === null || emptyView.vars === null) {
            throw new Error(`AssertionError: expected repeater empty view to have been named and counted`);
          }
          emptyViewFnName = emptyView.fnName;
          emptyDecls = emptyView.decls;
          emptyVars = emptyView.vars;
        }
        OpList.replace(op, repeaterCreate(op.handle.slot, repeaterView.fnName, op.decls, op.vars, op.tag, op.attributes, op.trackByFn, op.usesComponentInstance, emptyViewFnName, emptyDecls, emptyVars, op.sourceSpan));
        break;
      case OpKind.Statement:
        break;
      default:
        throw new Error(`AssertionError: Unsupported reification of create op ${OpKind[op.kind]}`);
    }
  }
}
function reifyUpdateOperations(_unit, ops) {
  for (const op of ops) {
    transformExpressionsInOp(op, reifyIrExpression, VisitorContextFlag.None);
    switch (op.kind) {
      case OpKind.Advance:
        OpList.replace(op, advance(op.delta, op.sourceSpan));
        break;
      case OpKind.Property:
        if (op.expression instanceof Interpolation2) {
          OpList.replace(op, propertyInterpolate(op.name, op.expression.strings, op.expression.expressions, op.sanitizer, op.sourceSpan));
        } else {
          OpList.replace(op, property(op.name, op.expression, op.sanitizer, op.sourceSpan));
        }
        break;
      case OpKind.StyleProp:
        if (op.expression instanceof Interpolation2) {
          OpList.replace(op, stylePropInterpolate(op.name, op.expression.strings, op.expression.expressions, op.unit, op.sourceSpan));
        } else {
          OpList.replace(op, styleProp(op.name, op.expression, op.unit, op.sourceSpan));
        }
        break;
      case OpKind.ClassProp:
        OpList.replace(op, classProp(op.name, op.expression, op.sourceSpan));
        break;
      case OpKind.StyleMap:
        if (op.expression instanceof Interpolation2) {
          OpList.replace(op, styleMapInterpolate(op.expression.strings, op.expression.expressions, op.sourceSpan));
        } else {
          OpList.replace(op, styleMap(op.expression, op.sourceSpan));
        }
        break;
      case OpKind.ClassMap:
        if (op.expression instanceof Interpolation2) {
          OpList.replace(op, classMapInterpolate(op.expression.strings, op.expression.expressions, op.sourceSpan));
        } else {
          OpList.replace(op, classMap(op.expression, op.sourceSpan));
        }
        break;
      case OpKind.I18nExpression:
        OpList.replace(op, i18nExp(op.expression, op.sourceSpan));
        break;
      case OpKind.I18nApply:
        OpList.replace(op, i18nApply(op.handle.slot, op.sourceSpan));
        break;
      case OpKind.InterpolateText:
        OpList.replace(op, textInterpolate(op.interpolation.strings, op.interpolation.expressions, op.sourceSpan));
        break;
      case OpKind.Attribute:
        if (op.expression instanceof Interpolation2) {
          OpList.replace(op, attributeInterpolate(op.name, op.expression.strings, op.expression.expressions, op.sanitizer, op.sourceSpan));
        } else {
          OpList.replace(op, attribute(op.name, op.expression, op.sanitizer));
        }
        break;
      case OpKind.HostProperty:
        if (op.expression instanceof Interpolation2) {
          throw new Error("not yet handled");
        } else {
          if (op.isAnimationTrigger) {
            OpList.replace(op, syntheticHostProperty(op.name, op.expression, op.sourceSpan));
          } else {
            OpList.replace(op, hostProperty(op.name, op.expression, op.sourceSpan));
          }
        }
        break;
      case OpKind.Variable:
        if (op.variable.name === null) {
          throw new Error(`AssertionError: unnamed variable ${op.xref}`);
        }
        OpList.replace(op, createStatementOp(new DeclareVarStmt(op.variable.name, op.initializer, void 0, StmtModifier.Final)));
        break;
      case OpKind.Conditional:
        if (op.processed === null) {
          throw new Error(`Conditional test was not set.`);
        }
        if (op.targetSlot.slot === null) {
          throw new Error(`Conditional slot was not set.`);
        }
        OpList.replace(op, conditional(op.targetSlot.slot, op.processed, op.contextValue, op.sourceSpan));
        break;
      case OpKind.Repeater:
        OpList.replace(op, repeater(op.collection, op.sourceSpan));
        break;
      case OpKind.DeferWhen:
        OpList.replace(op, deferWhen(op.prefetch, op.expr, op.sourceSpan));
        break;
      case OpKind.Statement:
        break;
      default:
        throw new Error(`AssertionError: Unsupported reification of update op ${OpKind[op.kind]}`);
    }
  }
}
function reifyIrExpression(expr) {
  if (!isIrExpression(expr)) {
    return expr;
  }
  switch (expr.kind) {
    case ExpressionKind.NextContext:
      return nextContext(expr.steps);
    case ExpressionKind.Reference:
      return reference(expr.targetSlot.slot + 1 + expr.offset);
    case ExpressionKind.LexicalRead:
      throw new Error(`AssertionError: unresolved LexicalRead of ${expr.name}`);
    case ExpressionKind.RestoreView:
      if (typeof expr.view === "number") {
        throw new Error(`AssertionError: unresolved RestoreView`);
      }
      return restoreView(expr.view);
    case ExpressionKind.ResetView:
      return resetView(expr.expr);
    case ExpressionKind.GetCurrentView:
      return getCurrentView();
    case ExpressionKind.ReadVariable:
      if (expr.name === null) {
        throw new Error(`Read of unnamed variable ${expr.xref}`);
      }
      return variable(expr.name);
    case ExpressionKind.ReadTemporaryExpr:
      if (expr.name === null) {
        throw new Error(`Read of unnamed temporary ${expr.xref}`);
      }
      return variable(expr.name);
    case ExpressionKind.AssignTemporaryExpr:
      if (expr.name === null) {
        throw new Error(`Assign of unnamed temporary ${expr.xref}`);
      }
      return variable(expr.name).set(expr.expr);
    case ExpressionKind.PureFunctionExpr:
      if (expr.fn === null) {
        throw new Error(`AssertionError: expected PureFunctions to have been extracted`);
      }
      return pureFunction(expr.varOffset, expr.fn, expr.args);
    case ExpressionKind.PureFunctionParameterExpr:
      throw new Error(`AssertionError: expected PureFunctionParameterExpr to have been extracted`);
    case ExpressionKind.PipeBinding:
      return pipeBind(expr.targetSlot.slot, expr.varOffset, expr.args);
    case ExpressionKind.PipeBindingVariadic:
      return pipeBindV(expr.targetSlot.slot, expr.varOffset, expr.args);
    case ExpressionKind.SanitizerExpr:
      return importExpr(sanitizerIdentifierMap.get(expr.fn));
    case ExpressionKind.SlotLiteralExpr:
      return literal(expr.slot.slot);
    default:
      throw new Error(`AssertionError: Unsupported reification of ir.Expression kind: ${ExpressionKind[expr.kind]}`);
  }
}
function reifyListenerHandler(unit, name, handlerOps, consumesDollarEvent) {
  reifyUpdateOperations(unit, handlerOps);
  const handlerStmts = [];
  for (const op of handlerOps) {
    if (op.kind !== OpKind.Statement) {
      throw new Error(`AssertionError: expected reified statements, but found op ${OpKind[op.kind]}`);
    }
    handlerStmts.push(op.statement);
  }
  const params = [];
  if (consumesDollarEvent) {
    params.push(new FnParam("$event"));
  }
  return fn(params, handlerStmts, void 0, void 0, name);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/remove_empty_bindings.mjs
function removeEmptyBindings(job) {
  for (const unit of job.units) {
    for (const op of unit.update) {
      switch (op.kind) {
        case OpKind.Attribute:
        case OpKind.Binding:
        case OpKind.ClassProp:
        case OpKind.ClassMap:
        case OpKind.Property:
        case OpKind.StyleProp:
        case OpKind.StyleMap:
          if (op.expression instanceof EmptyExpr2) {
            OpList.remove(op);
          }
          break;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/remove_i18n_contexts.mjs
function removeI18nContexts(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nContext:
          OpList.remove(op);
          break;
        case OpKind.I18nStart:
          op.context = null;
          break;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/remove_unused_i18n_attrs.mjs
function removeUnusedI18nAttributesOps(job) {
  for (const unit of job.units) {
    const ownersWithI18nExpressions = /* @__PURE__ */ new Set();
    for (const op of unit.update) {
      switch (op.kind) {
        case OpKind.I18nExpression:
          ownersWithI18nExpressions.add(op.i18nOwner);
      }
    }
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nAttributes:
          if (ownersWithI18nExpressions.has(op.xref)) {
            continue;
          }
          OpList.remove(op);
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/repeater_derived_vars.mjs
function generateRepeaterDerivedVars(job) {
  const repeaters = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      if (op.kind === OpKind.RepeaterCreate) {
        repeaters.set(op.xref, op);
      }
    }
  }
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      transformExpressionsInOp(op, (expr) => {
        if (!(expr instanceof DerivedRepeaterVarExpr)) {
          return expr;
        }
        const repeaterOp = repeaters.get(expr.xref);
        switch (expr.identity) {
          case DerivedRepeaterVarIdentity.First:
            return new BinaryOperatorExpr(BinaryOperator.Identical, new LexicalReadExpr(repeaterOp.varNames.$index), literal(0));
          case DerivedRepeaterVarIdentity.Last:
            return new BinaryOperatorExpr(BinaryOperator.Identical, new LexicalReadExpr(repeaterOp.varNames.$index), new BinaryOperatorExpr(BinaryOperator.Minus, new LexicalReadExpr(repeaterOp.varNames.$count), literal(1)));
          case DerivedRepeaterVarIdentity.Even:
            return new BinaryOperatorExpr(BinaryOperator.Identical, new BinaryOperatorExpr(BinaryOperator.Modulo, new LexicalReadExpr(repeaterOp.varNames.$index), literal(2)), literal(0));
          case DerivedRepeaterVarIdentity.Odd:
            return new BinaryOperatorExpr(BinaryOperator.NotIdentical, new BinaryOperatorExpr(BinaryOperator.Modulo, new LexicalReadExpr(repeaterOp.varNames.$index), literal(2)), literal(0));
        }
      }, VisitorContextFlag.None);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/resolve_contexts.mjs
function resolveContexts(job) {
  for (const unit of job.units) {
    processLexicalScope(unit, unit.create);
    processLexicalScope(unit, unit.update);
  }
}
function processLexicalScope(view, ops) {
  const scope = /* @__PURE__ */ new Map();
  scope.set(view.xref, variable("ctx"));
  for (const op of ops) {
    switch (op.kind) {
      case OpKind.Variable:
        switch (op.variable.kind) {
          case SemanticVariableKind.Context:
            scope.set(op.variable.view, new ReadVariableExpr(op.xref));
            break;
        }
        break;
      case OpKind.Listener:
        processLexicalScope(view, op.handlerOps);
        break;
    }
  }
  if (view === view.job.root) {
    scope.set(view.xref, variable("ctx"));
  }
  for (const op of ops) {
    transformExpressionsInOp(op, (expr) => {
      if (expr instanceof ContextExpr) {
        if (!scope.has(expr.view)) {
          throw new Error(`No context found for reference to view ${expr.view} from view ${view.xref}`);
        }
        return scope.get(expr.view);
      } else {
        return expr;
      }
    }, VisitorContextFlag.None);
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/resolve_dollar_event.mjs
function resolveDollarEvent(job) {
  for (const unit of job.units) {
    transformDollarEvent(unit, unit.create);
    transformDollarEvent(unit, unit.update);
  }
}
function transformDollarEvent(unit, ops) {
  for (const op of ops) {
    if (op.kind === OpKind.Listener) {
      transformExpressionsInOp(op, (expr) => {
        if (expr instanceof LexicalReadExpr && expr.name === "$event") {
          op.consumesDollarEvent = true;
          return new ReadVarExpr(expr.name);
        }
        return expr;
      }, VisitorContextFlag.InChildOperation);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/resolve_i18n_element_placeholders.mjs
function resolveI18nElementPlaceholders(job) {
  const i18nContexts = /* @__PURE__ */ new Map();
  const elements = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nContext:
          i18nContexts.set(op.xref, op);
          break;
        case OpKind.ElementStart:
          elements.set(op.xref, op);
          break;
      }
    }
  }
  resolvePlaceholdersForView(job, job.root, i18nContexts, elements);
}
function resolvePlaceholdersForView(job, unit, i18nContexts, elements, pendingStructuralDirective) {
  let currentOps = null;
  let pendingStructuralDirectiveCloses = /* @__PURE__ */ new Map();
  for (const op of unit.create) {
    switch (op.kind) {
      case OpKind.I18nStart:
        if (!op.context) {
          throw Error("Could not find i18n context for i18n op");
        }
        currentOps = { i18nBlock: op, i18nContext: i18nContexts.get(op.context) };
        break;
      case OpKind.I18nEnd:
        currentOps = null;
        break;
      case OpKind.ElementStart:
        if (op.i18nPlaceholder !== void 0) {
          if (currentOps === null) {
            throw Error("i18n tag placeholder should only occur inside an i18n block");
          }
          recordElementStart(op, currentOps.i18nContext, currentOps.i18nBlock, pendingStructuralDirective);
          if (pendingStructuralDirective && op.i18nPlaceholder.closeName) {
            pendingStructuralDirectiveCloses.set(op.xref, pendingStructuralDirective);
          }
          pendingStructuralDirective = void 0;
        }
        break;
      case OpKind.ElementEnd:
        const startOp = elements.get(op.xref);
        if (startOp && startOp.i18nPlaceholder !== void 0) {
          if (currentOps === null) {
            throw Error("AssertionError: i18n tag placeholder should only occur inside an i18n block");
          }
          recordElementClose(startOp, currentOps.i18nContext, currentOps.i18nBlock, pendingStructuralDirectiveCloses.get(op.xref));
          pendingStructuralDirectiveCloses.delete(op.xref);
        }
        break;
      case OpKind.Projection:
        if (op.i18nPlaceholder !== void 0) {
          if (currentOps === null) {
            throw Error("i18n tag placeholder should only occur inside an i18n block");
          }
          recordElementStart(op, currentOps.i18nContext, currentOps.i18nBlock, pendingStructuralDirective);
          recordElementClose(op, currentOps.i18nContext, currentOps.i18nBlock, pendingStructuralDirective);
          pendingStructuralDirective = void 0;
        }
        break;
      case OpKind.Template:
        if (op.i18nPlaceholder === void 0) {
          resolvePlaceholdersForView(job, job.views.get(op.xref), i18nContexts, elements);
        } else {
          if (currentOps === null) {
            throw Error("i18n tag placeholder should only occur inside an i18n block");
          }
          if (op.templateKind === TemplateKind.Structural) {
            resolvePlaceholdersForView(job, job.views.get(op.xref), i18nContexts, elements, op);
          } else {
            recordTemplateStart(job, op, currentOps.i18nContext, currentOps.i18nBlock, pendingStructuralDirective);
            resolvePlaceholdersForView(job, job.views.get(op.xref), i18nContexts, elements);
            recordTemplateClose(job, op, currentOps.i18nContext, currentOps.i18nBlock, pendingStructuralDirective);
            pendingStructuralDirective = void 0;
          }
        }
        break;
    }
  }
}
function recordElementStart(op, i18nContext, i18nBlock, structuralDirective) {
  const { startName, closeName } = op.i18nPlaceholder;
  let flags = I18nParamValueFlags.ElementTag | I18nParamValueFlags.OpenTag;
  let value = op.handle.slot;
  if (structuralDirective !== void 0) {
    flags |= I18nParamValueFlags.TemplateTag;
    value = { element: value, template: structuralDirective.handle.slot };
  }
  if (!closeName) {
    flags |= I18nParamValueFlags.CloseTag;
  }
  addParam(i18nContext.params, startName, value, i18nBlock.subTemplateIndex, flags);
}
function recordElementClose(op, i18nContext, i18nBlock, structuralDirective) {
  const { closeName } = op.i18nPlaceholder;
  if (closeName) {
    let flags = I18nParamValueFlags.ElementTag | I18nParamValueFlags.CloseTag;
    let value = op.handle.slot;
    if (structuralDirective !== void 0) {
      flags |= I18nParamValueFlags.TemplateTag;
      value = { element: value, template: structuralDirective.handle.slot };
    }
    addParam(i18nContext.params, closeName, value, i18nBlock.subTemplateIndex, flags);
  }
}
function recordTemplateStart(job, op, i18nContext, i18nBlock, structuralDirective) {
  let { startName, closeName } = op.i18nPlaceholder;
  let flags = I18nParamValueFlags.TemplateTag | I18nParamValueFlags.OpenTag;
  if (!closeName) {
    flags |= I18nParamValueFlags.CloseTag;
  }
  if (structuralDirective !== void 0) {
    addParam(i18nContext.params, startName, structuralDirective.handle.slot, i18nBlock.subTemplateIndex, flags);
  }
  addParam(i18nContext.params, startName, op.handle.slot, getSubTemplateIndexForTemplateTag(job, i18nBlock, op), flags);
}
function recordTemplateClose(job, op, i18nContext, i18nBlock, structuralDirective) {
  const { startName, closeName } = op.i18nPlaceholder;
  const flags = I18nParamValueFlags.TemplateTag | I18nParamValueFlags.CloseTag;
  if (closeName) {
    addParam(i18nContext.params, closeName, op.handle.slot, getSubTemplateIndexForTemplateTag(job, i18nBlock, op), flags);
    if (structuralDirective !== void 0) {
      addParam(i18nContext.params, closeName, structuralDirective.handle.slot, i18nBlock.subTemplateIndex, flags);
    }
  }
}
function getSubTemplateIndexForTemplateTag(job, i18nOp, op) {
  for (const childOp of job.views.get(op.xref).create) {
    if (childOp.kind === OpKind.I18nStart) {
      return childOp.subTemplateIndex;
    }
  }
  return i18nOp.subTemplateIndex;
}
function addParam(params, placeholder, value, subTemplateIndex, flags) {
  var _a2;
  const values = (_a2 = params.get(placeholder)) != null ? _a2 : [];
  values.push({ value, subTemplateIndex, flags });
  params.set(placeholder, values);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/resolve_i18n_expression_placeholders.mjs
function resolveI18nExpressionPlaceholders(job) {
  var _a2;
  const subTemplateIndicies = /* @__PURE__ */ new Map();
  const i18nContexts = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nStart:
          subTemplateIndicies.set(op.xref, op.subTemplateIndex);
          break;
        case OpKind.I18nContext:
          i18nContexts.set(op.xref, op);
          break;
      }
    }
  }
  const expressionIndices = /* @__PURE__ */ new Map();
  const referenceIndex = (op) => op.usage === I18nExpressionFor.I18nText ? op.i18nOwner : op.context;
  for (const unit of job.units) {
    for (const op of unit.update) {
      if (op.kind === OpKind.I18nExpression) {
        const i18nContext = i18nContexts.get(op.context);
        const index = expressionIndices.get(referenceIndex(op)) || 0;
        const subTemplateIndex = (_a2 = subTemplateIndicies.get(op.i18nOwner)) != null ? _a2 : null;
        const params = op.resolutionTime === I18nParamResolutionTime.Creation ? i18nContext.params : i18nContext.postprocessingParams;
        const values = params.get(op.i18nPlaceholder) || [];
        values.push({
          value: index,
          subTemplateIndex,
          flags: I18nParamValueFlags.ExpressionIndex
        });
        params.set(op.i18nPlaceholder, values);
        expressionIndices.set(referenceIndex(op), index + 1);
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/resolve_i18n_icu_placeholders.mjs
function resolveI18nIcuPlaceholders(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind === OpKind.I18nContext && op.contextKind === I18nContextKind.Icu) {
        for (const node of op.message.nodes) {
          node.visit(new ResolveIcuPlaceholdersVisitor(op.postprocessingParams));
        }
      }
    }
  }
}
var ResolveIcuPlaceholdersVisitor = class extends RecurseVisitor {
  constructor(params) {
    super();
    this.params = params;
  }
  visitContainerPlaceholder(placeholder) {
    var _a2, _b2;
    if (placeholder.startName && placeholder.startSourceSpan && !this.params.has(placeholder.startName)) {
      this.params.set(placeholder.startName, [{
        value: (_a2 = placeholder.startSourceSpan) == null ? void 0 : _a2.toString(),
        subTemplateIndex: null,
        flags: I18nParamValueFlags.None
      }]);
    }
    if (placeholder.closeName && placeholder.endSourceSpan && !this.params.has(placeholder.closeName)) {
      this.params.set(placeholder.closeName, [{
        value: (_b2 = placeholder.endSourceSpan) == null ? void 0 : _b2.toString(),
        subTemplateIndex: null,
        flags: I18nParamValueFlags.None
      }]);
    }
  }
  visitTagPlaceholder(placeholder) {
    super.visitTagPlaceholder(placeholder);
    this.visitContainerPlaceholder(placeholder);
  }
  visitBlockPlaceholder(placeholder) {
    super.visitBlockPlaceholder(placeholder);
    this.visitContainerPlaceholder(placeholder);
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/resolve_names.mjs
function resolveNames(job) {
  for (const unit of job.units) {
    processLexicalScope2(unit, unit.create, null);
    processLexicalScope2(unit, unit.update, null);
  }
}
function processLexicalScope2(unit, ops, savedView) {
  const scope = /* @__PURE__ */ new Map();
  for (const op of ops) {
    switch (op.kind) {
      case OpKind.Variable:
        switch (op.variable.kind) {
          case SemanticVariableKind.Identifier:
          case SemanticVariableKind.Alias:
            if (scope.has(op.variable.identifier)) {
              continue;
            }
            scope.set(op.variable.identifier, op.xref);
            break;
          case SemanticVariableKind.SavedView:
            savedView = {
              view: op.variable.view,
              variable: op.xref
            };
            break;
        }
        break;
      case OpKind.Listener:
        processLexicalScope2(unit, op.handlerOps, savedView);
        break;
    }
  }
  for (const op of ops) {
    if (op.kind == OpKind.Listener) {
      continue;
    }
    transformExpressionsInOp(op, (expr, flags) => {
      if (expr instanceof LexicalReadExpr) {
        if (scope.has(expr.name)) {
          return new ReadVariableExpr(scope.get(expr.name));
        } else {
          return new ReadPropExpr(new ContextExpr(unit.job.root.xref), expr.name);
        }
      } else if (expr instanceof RestoreViewExpr && typeof expr.view === "number") {
        if (savedView === null || savedView.view !== expr.view) {
          throw new Error(`AssertionError: no saved view ${expr.view} from view ${unit.xref}`);
        }
        expr.view = new ReadVariableExpr(savedView.variable);
        return expr;
      } else {
        return expr;
      }
    }, VisitorContextFlag.None);
  }
  for (const op of ops) {
    visitExpressionsInOp(op, (expr) => {
      if (expr instanceof LexicalReadExpr) {
        throw new Error(`AssertionError: no lexical reads should remain, but found read of ${expr.name}`);
      }
    });
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/resolve_sanitizers.mjs
var sanitizers = /* @__PURE__ */ new Map([
  [SecurityContext.HTML, SanitizerFn.Html],
  [SecurityContext.SCRIPT, SanitizerFn.Script],
  [SecurityContext.STYLE, SanitizerFn.Style],
  [SecurityContext.URL, SanitizerFn.Url],
  [SecurityContext.RESOURCE_URL, SanitizerFn.ResourceUrl]
]);
function resolveSanitizers(job) {
  for (const unit of job.units) {
    const elements = createOpXrefMap(unit);
    let sanitizerFn;
    for (const op of unit.update) {
      switch (op.kind) {
        case OpKind.Property:
        case OpKind.Attribute:
          sanitizerFn = sanitizers.get(op.securityContext) || null;
          op.sanitizer = sanitizerFn ? new SanitizerExpr(sanitizerFn) : null;
          if (op.sanitizer === null) {
            const ownerOp = elements.get(op.target);
            if (ownerOp === void 0 || !isElementOrContainerOp(ownerOp)) {
              throw Error("Property should have an element-like owner");
            }
            if (isIframeElement(ownerOp) && isIframeSecuritySensitiveAttr(op.name)) {
              op.sanitizer = new SanitizerExpr(SanitizerFn.IframeAttribute);
            }
          }
          break;
      }
    }
  }
}
function isIframeElement(op) {
  var _a2;
  return op.kind === OpKind.ElementStart && ((_a2 = op.tag) == null ? void 0 : _a2.toLowerCase()) === "iframe";
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/save_restore_view.mjs
function saveAndRestoreView(job) {
  for (const unit of job.units) {
    unit.create.prepend([
      createVariableOp(unit.job.allocateXrefId(), {
        kind: SemanticVariableKind.SavedView,
        name: null,
        view: unit.xref
      }, new GetCurrentViewExpr(), VariableFlags.None)
    ]);
    for (const op of unit.create) {
      if (op.kind !== OpKind.Listener) {
        continue;
      }
      let needsRestoreView = unit !== job.root;
      if (!needsRestoreView) {
        for (const handlerOp of op.handlerOps) {
          visitExpressionsInOp(handlerOp, (expr) => {
            if (expr instanceof ReferenceExpr) {
              needsRestoreView = true;
            }
          });
        }
      }
      if (needsRestoreView) {
        addSaveRestoreViewOperationToListener(unit, op);
      }
    }
  }
}
function addSaveRestoreViewOperationToListener(unit, op) {
  op.handlerOps.prepend([
    createVariableOp(unit.job.allocateXrefId(), {
      kind: SemanticVariableKind.Context,
      name: null,
      view: unit.xref
    }, new RestoreViewExpr(unit.xref), VariableFlags.None)
  ]);
  for (const handlerOp of op.handlerOps) {
    if (handlerOp.kind === OpKind.Statement && handlerOp.statement instanceof ReturnStatement) {
      handlerOp.statement.value = new ResetViewExpr(handlerOp.statement.value);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/slot_allocation.mjs
function allocateSlots(job) {
  const slotMap = /* @__PURE__ */ new Map();
  for (const unit of job.units) {
    let slotCount = 0;
    for (const op of unit.create) {
      if (!hasConsumesSlotTrait(op)) {
        continue;
      }
      op.handle.slot = slotCount;
      slotMap.set(op.xref, op.handle.slot);
      slotCount += op.numSlotsUsed;
    }
    unit.decls = slotCount;
  }
  for (const unit of job.units) {
    for (const op of unit.ops()) {
      if (op.kind === OpKind.Template || op.kind === OpKind.RepeaterCreate) {
        const childView = job.views.get(op.xref);
        op.decls = childView.decls;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/style_binding_specialization.mjs
function specializeStyleBindings(job) {
  for (const unit of job.units) {
    for (const op of unit.update) {
      if (op.kind !== OpKind.Binding) {
        continue;
      }
      switch (op.bindingKind) {
        case BindingKind.ClassName:
          if (op.expression instanceof Interpolation2) {
            throw new Error(`Unexpected interpolation in ClassName binding`);
          }
          OpList.replace(op, createClassPropOp(op.target, op.name, op.expression, op.sourceSpan));
          break;
        case BindingKind.StyleProperty:
          OpList.replace(op, createStylePropOp(op.target, op.name, op.expression, op.unit, op.sourceSpan));
          break;
        case BindingKind.Property:
        case BindingKind.Template:
          if (op.name === "style") {
            OpList.replace(op, createStyleMapOp(op.target, op.expression, op.sourceSpan));
          } else if (op.name === "class") {
            OpList.replace(op, createClassMapOp(op.target, op.expression, op.sourceSpan));
          }
          break;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/temporary_variables.mjs
function generateTemporaryVariables(job) {
  for (const unit of job.units) {
    unit.create.prepend(generateTemporaries(unit.create));
    unit.update.prepend(generateTemporaries(unit.update));
  }
}
function generateTemporaries(ops) {
  let opCount = 0;
  let generatedStatements = [];
  for (const op of ops) {
    const finalReads = /* @__PURE__ */ new Map();
    visitExpressionsInOp(op, (expr, flag) => {
      if (flag & VisitorContextFlag.InChildOperation) {
        return;
      }
      if (expr instanceof ReadTemporaryExpr) {
        finalReads.set(expr.xref, expr);
      }
    });
    let count = 0;
    const assigned = /* @__PURE__ */ new Set();
    const released = /* @__PURE__ */ new Set();
    const defs = /* @__PURE__ */ new Map();
    visitExpressionsInOp(op, (expr, flag) => {
      if (flag & VisitorContextFlag.InChildOperation) {
        return;
      }
      if (expr instanceof AssignTemporaryExpr) {
        if (!assigned.has(expr.xref)) {
          assigned.add(expr.xref);
          defs.set(expr.xref, `tmp_${opCount}_${count++}`);
        }
        assignName(defs, expr);
      } else if (expr instanceof ReadTemporaryExpr) {
        if (finalReads.get(expr.xref) === expr) {
          released.add(expr.xref);
          count--;
        }
        assignName(defs, expr);
      }
    });
    generatedStatements.push(...Array.from(new Set(defs.values())).map((name) => createStatementOp(new DeclareVarStmt(name))));
    opCount++;
    if (op.kind === OpKind.Listener) {
      op.handlerOps.prepend(generateTemporaries(op.handlerOps));
    }
  }
  return generatedStatements;
}
function assignName(names, expr) {
  const name = names.get(expr.xref);
  if (name === void 0) {
    throw new Error(`Found xref with unassigned name: ${expr.xref}`);
  }
  expr.name = name;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/track_fn_generation.mjs
function generateTrackFns(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind !== OpKind.RepeaterCreate) {
        continue;
      }
      if (op.trackByFn !== null) {
        continue;
      }
      let usesComponentContext = false;
      op.track = transformExpressionsInExpression(op.track, (expr) => {
        if (expr instanceof TrackContextExpr) {
          usesComponentContext = true;
          return variable("this");
        }
        return expr;
      }, VisitorContextFlag.None);
      let fn2;
      const fnParams = [new FnParam("$index"), new FnParam("$item")];
      if (usesComponentContext) {
        fn2 = new FunctionExpr(fnParams, [new ReturnStatement(op.track)]);
      } else {
        fn2 = arrowFn(fnParams, op.track);
      }
      op.trackByFn = job.pool.getSharedFunctionReference(fn2, "_forTrack");
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/track_fn_optimization.mjs
function optimizeTrackFns(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind !== OpKind.RepeaterCreate) {
        continue;
      }
      if (op.track instanceof ReadVarExpr && op.track.name === "$index") {
        op.trackByFn = importExpr(Identifiers.repeaterTrackByIndex);
      } else if (op.track instanceof ReadVarExpr && op.track.name === "$item") {
        op.trackByFn = importExpr(Identifiers.repeaterTrackByIdentity);
      } else if (isTrackByFunctionCall(job.root.xref, op.track)) {
        if (op.track.receiver.receiver.view === unit.xref) {
          op.trackByFn = op.track.receiver;
        } else {
          op.trackByFn = importExpr(Identifiers.componentInstance).callFn([]).prop(op.track.receiver.name);
          op.track = op.trackByFn;
        }
      } else {
        op.track = transformExpressionsInExpression(op.track, (expr) => {
          if (expr instanceof ContextExpr) {
            op.usesComponentInstance = true;
            return new TrackContextExpr(expr.view);
          }
          return expr;
        }, VisitorContextFlag.None);
      }
    }
  }
}
function isTrackByFunctionCall(rootView, expr) {
  if (!(expr instanceof InvokeFunctionExpr) || expr.args.length !== 2) {
    return false;
  }
  if (!(expr.receiver instanceof ReadPropExpr && expr.receiver.receiver instanceof ContextExpr) || expr.receiver.receiver.view !== rootView) {
    return false;
  }
  const [arg0, arg1] = expr.args;
  if (!(arg0 instanceof ReadVarExpr) || arg0.name !== "$index") {
    return false;
  }
  if (!(arg1 instanceof ReadVarExpr) || arg1.name !== "$item") {
    return false;
  }
  return true;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/track_variables.mjs
function generateTrackVariables(job) {
  for (const unit of job.units) {
    for (const op of unit.create) {
      if (op.kind !== OpKind.RepeaterCreate) {
        continue;
      }
      op.track = transformExpressionsInExpression(op.track, (expr) => {
        if (expr instanceof LexicalReadExpr) {
          if (expr.name === op.varNames.$index) {
            return variable("$index");
          } else if (expr.name === op.varNames.$implicit) {
            return variable("$item");
          }
        }
        return expr;
      }, VisitorContextFlag.None);
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/var_counting.mjs
function countVariables(job) {
  for (const unit of job.units) {
    let varCount = 0;
    for (const op of unit.ops()) {
      if (hasConsumesVarsTrait(op)) {
        varCount += varsUsedByOp(op);
      }
    }
    for (const op of unit.ops()) {
      visitExpressionsInOp(op, (expr) => {
        if (!isIrExpression(expr)) {
          return;
        }
        if (job.compatibility === CompatibilityMode.TemplateDefinitionBuilder && expr instanceof PureFunctionExpr) {
          return;
        }
        if (hasUsesVarOffsetTrait(expr)) {
          expr.varOffset = varCount;
        }
        if (hasConsumesVarsTrait(expr)) {
          varCount += varsUsedByIrExpression(expr);
        }
      });
    }
    if (job.compatibility === CompatibilityMode.TemplateDefinitionBuilder) {
      for (const op of unit.ops()) {
        visitExpressionsInOp(op, (expr) => {
          if (!isIrExpression(expr) || !(expr instanceof PureFunctionExpr)) {
            return;
          }
          if (hasUsesVarOffsetTrait(expr)) {
            expr.varOffset = varCount;
          }
          if (hasConsumesVarsTrait(expr)) {
            varCount += varsUsedByIrExpression(expr);
          }
        });
      }
    }
    unit.vars = varCount;
  }
  if (job instanceof ComponentCompilationJob) {
    for (const unit of job.units) {
      for (const op of unit.create) {
        if (op.kind !== OpKind.Template && op.kind !== OpKind.RepeaterCreate) {
          continue;
        }
        const childView = job.views.get(op.xref);
        op.vars = childView.vars;
      }
    }
  }
}
function varsUsedByOp(op) {
  let slots;
  switch (op.kind) {
    case OpKind.Property:
    case OpKind.HostProperty:
    case OpKind.Attribute:
      slots = 1;
      if (op.expression instanceof Interpolation2 && !isSingletonInterpolation(op.expression)) {
        slots += op.expression.expressions.length;
      }
      return slots;
    case OpKind.StyleProp:
    case OpKind.ClassProp:
    case OpKind.StyleMap:
    case OpKind.ClassMap:
      slots = 2;
      if (op.expression instanceof Interpolation2) {
        slots += op.expression.expressions.length;
      }
      return slots;
    case OpKind.InterpolateText:
      return op.interpolation.expressions.length;
    case OpKind.I18nExpression:
    case OpKind.Conditional:
      return 1;
    default:
      throw new Error(`Unhandled op: ${OpKind[op.kind]}`);
  }
}
function varsUsedByIrExpression(expr) {
  switch (expr.kind) {
    case ExpressionKind.PureFunctionExpr:
      return 1 + expr.args.length;
    case ExpressionKind.PipeBinding:
      return 1 + expr.args.length;
    case ExpressionKind.PipeBindingVariadic:
      return 1 + expr.numArgs;
    default:
      throw new Error(`AssertionError: unhandled ConsumesVarsTrait expression ${expr.constructor.name}`);
  }
}
function isSingletonInterpolation(expr) {
  if (expr.expressions.length !== 1 || expr.strings.length !== 2) {
    return false;
  }
  if (expr.strings[0] !== "" || expr.strings[1] !== "") {
    return false;
  }
  return true;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/variable_optimization.mjs
function optimizeVariables(job) {
  for (const unit of job.units) {
    inlineAlwaysInlineVariables(unit.create);
    inlineAlwaysInlineVariables(unit.update);
    for (const op of unit.create) {
      if (op.kind === OpKind.Listener) {
        inlineAlwaysInlineVariables(op.handlerOps);
      }
    }
    optimizeVariablesInOpList(unit.create, job.compatibility);
    optimizeVariablesInOpList(unit.update, job.compatibility);
    for (const op of unit.create) {
      if (op.kind === OpKind.Listener) {
        optimizeVariablesInOpList(op.handlerOps, job.compatibility);
      }
    }
  }
}
var Fence;
(function(Fence2) {
  Fence2[Fence2["None"] = 0] = "None";
  Fence2[Fence2["ViewContextRead"] = 1] = "ViewContextRead";
  Fence2[Fence2["ViewContextWrite"] = 2] = "ViewContextWrite";
  Fence2[Fence2["SideEffectful"] = 4] = "SideEffectful";
})(Fence || (Fence = {}));
function inlineAlwaysInlineVariables(ops) {
  const vars = /* @__PURE__ */ new Map();
  for (const op of ops) {
    if (op.kind === OpKind.Variable && op.flags & VariableFlags.AlwaysInline) {
      visitExpressionsInOp(op, (expr) => {
        if (isIrExpression(expr) && fencesForIrExpression(expr) !== Fence.None) {
          throw new Error(`AssertionError: A context-sensitive variable was marked AlwaysInline`);
        }
      });
      vars.set(op.xref, op);
    }
    transformExpressionsInOp(op, (expr) => {
      if (expr instanceof ReadVariableExpr && vars.has(expr.xref)) {
        const varOp = vars.get(expr.xref);
        return varOp.initializer.clone();
      }
      return expr;
    }, VisitorContextFlag.None);
  }
  for (const op of vars.values()) {
    OpList.remove(op);
  }
}
function optimizeVariablesInOpList(ops, compatibility) {
  const varDecls = /* @__PURE__ */ new Map();
  const varUsages = /* @__PURE__ */ new Map();
  const varRemoteUsages = /* @__PURE__ */ new Set();
  const opMap = /* @__PURE__ */ new Map();
  for (const op of ops) {
    if (op.kind === OpKind.Variable) {
      if (varDecls.has(op.xref) || varUsages.has(op.xref)) {
        throw new Error(`Should not see two declarations of the same variable: ${op.xref}`);
      }
      varDecls.set(op.xref, op);
      varUsages.set(op.xref, 0);
    }
    opMap.set(op, collectOpInfo(op));
    countVariableUsages(op, varUsages, varRemoteUsages);
  }
  let contextIsUsed = false;
  for (const op of ops.reversed()) {
    const opInfo = opMap.get(op);
    if (op.kind === OpKind.Variable && varUsages.get(op.xref) === 0) {
      if (contextIsUsed && opInfo.fences & Fence.ViewContextWrite || opInfo.fences & Fence.SideEffectful) {
        const stmtOp = createStatementOp(op.initializer.toStmt());
        opMap.set(stmtOp, opInfo);
        OpList.replace(op, stmtOp);
      } else {
        uncountVariableUsages(op, varUsages);
        OpList.remove(op);
      }
      opMap.delete(op);
      varDecls.delete(op.xref);
      varUsages.delete(op.xref);
      continue;
    }
    if (opInfo.fences & Fence.ViewContextRead) {
      contextIsUsed = true;
    }
  }
  const toInline = [];
  for (const [id, count] of varUsages) {
    const decl = varDecls.get(id);
    const varInfo = opMap.get(decl);
    const isAlwaysInline = !!(decl.flags & VariableFlags.AlwaysInline);
    if (count !== 1 || isAlwaysInline) {
      continue;
    }
    if (varRemoteUsages.has(id)) {
      continue;
    }
    toInline.push(id);
  }
  let candidate;
  while (candidate = toInline.pop()) {
    const decl = varDecls.get(candidate);
    const varInfo = opMap.get(decl);
    const isAlwaysInline = !!(decl.flags & VariableFlags.AlwaysInline);
    if (isAlwaysInline) {
      throw new Error(`AssertionError: Found an 'AlwaysInline' variable after the always inlining pass.`);
    }
    for (let targetOp = decl.next; targetOp.kind !== OpKind.ListEnd; targetOp = targetOp.next) {
      const opInfo = opMap.get(targetOp);
      if (opInfo.variablesUsed.has(candidate)) {
        if (compatibility === CompatibilityMode.TemplateDefinitionBuilder && !allowConservativeInlining(decl, targetOp)) {
          break;
        }
        if (tryInlineVariableInitializer(candidate, decl.initializer, targetOp, varInfo.fences)) {
          opInfo.variablesUsed.delete(candidate);
          for (const id of varInfo.variablesUsed) {
            opInfo.variablesUsed.add(id);
          }
          opInfo.fences |= varInfo.fences;
          varDecls.delete(candidate);
          varUsages.delete(candidate);
          opMap.delete(decl);
          OpList.remove(decl);
        }
        break;
      }
      if (!safeToInlinePastFences(opInfo.fences, varInfo.fences)) {
        break;
      }
    }
  }
}
function fencesForIrExpression(expr) {
  switch (expr.kind) {
    case ExpressionKind.NextContext:
      return Fence.ViewContextRead | Fence.ViewContextWrite;
    case ExpressionKind.RestoreView:
      return Fence.ViewContextRead | Fence.ViewContextWrite | Fence.SideEffectful;
    case ExpressionKind.Reference:
      return Fence.ViewContextRead;
    default:
      return Fence.None;
  }
}
function collectOpInfo(op) {
  let fences = Fence.None;
  const variablesUsed = /* @__PURE__ */ new Set();
  visitExpressionsInOp(op, (expr) => {
    if (!isIrExpression(expr)) {
      return;
    }
    switch (expr.kind) {
      case ExpressionKind.ReadVariable:
        variablesUsed.add(expr.xref);
        break;
      default:
        fences |= fencesForIrExpression(expr);
    }
  });
  return { fences, variablesUsed };
}
function countVariableUsages(op, varUsages, varRemoteUsage) {
  visitExpressionsInOp(op, (expr, flags) => {
    if (!isIrExpression(expr)) {
      return;
    }
    if (expr.kind !== ExpressionKind.ReadVariable) {
      return;
    }
    const count = varUsages.get(expr.xref);
    if (count === void 0) {
      return;
    }
    varUsages.set(expr.xref, count + 1);
    if (flags & VisitorContextFlag.InChildOperation) {
      varRemoteUsage.add(expr.xref);
    }
  });
}
function uncountVariableUsages(op, varUsages) {
  visitExpressionsInOp(op, (expr) => {
    if (!isIrExpression(expr)) {
      return;
    }
    if (expr.kind !== ExpressionKind.ReadVariable) {
      return;
    }
    const count = varUsages.get(expr.xref);
    if (count === void 0) {
      return;
    } else if (count === 0) {
      throw new Error(`Inaccurate variable count: ${expr.xref} - found another read but count is already 0`);
    }
    varUsages.set(expr.xref, count - 1);
  });
}
function safeToInlinePastFences(fences, declFences) {
  if (fences & Fence.ViewContextWrite) {
    if (declFences & Fence.ViewContextRead) {
      return false;
    }
  } else if (fences & Fence.ViewContextRead) {
    if (declFences & Fence.ViewContextWrite) {
      return false;
    }
  }
  return true;
}
function tryInlineVariableInitializer(id, initializer, target, declFences) {
  let inlined = false;
  let inliningAllowed = true;
  transformExpressionsInOp(target, (expr, flags) => {
    if (!isIrExpression(expr)) {
      return expr;
    }
    if (inlined || !inliningAllowed) {
      return expr;
    } else if (flags & VisitorContextFlag.InChildOperation && declFences & Fence.ViewContextRead) {
      return expr;
    }
    switch (expr.kind) {
      case ExpressionKind.ReadVariable:
        if (expr.xref === id) {
          inlined = true;
          return initializer;
        }
        break;
      default:
        const exprFences = fencesForIrExpression(expr);
        inliningAllowed = inliningAllowed && safeToInlinePastFences(exprFences, declFences);
        break;
    }
    return expr;
  }, VisitorContextFlag.None);
  return inlined;
}
function allowConservativeInlining(decl, target) {
  switch (decl.variable.kind) {
    case SemanticVariableKind.Identifier:
      if (decl.initializer instanceof ReadVarExpr && decl.initializer.name === "ctx") {
        return true;
      }
      return false;
    case SemanticVariableKind.Context:
      return target.kind === OpKind.Variable;
    default:
      return true;
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/phases/wrap_icus.mjs
function wrapI18nIcus(job) {
  for (const unit of job.units) {
    let currentI18nOp = null;
    let addedI18nId = null;
    for (const op of unit.create) {
      switch (op.kind) {
        case OpKind.I18nStart:
          currentI18nOp = op;
          break;
        case OpKind.I18nEnd:
          currentI18nOp = null;
          break;
        case OpKind.IcuStart:
          if (currentI18nOp === null) {
            addedI18nId = job.allocateXrefId();
            OpList.insertBefore(createI18nStartOp(addedI18nId, op.message), op);
          }
          break;
        case OpKind.IcuEnd:
          if (addedI18nId !== null) {
            OpList.insertAfter(createI18nEndOp(addedI18nId), op);
            addedI18nId = null;
          }
          break;
      }
    }
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/emit.mjs
var phases = [
  { kind: CompilationJobKind.Tmpl, fn: removeContentSelectors },
  { kind: CompilationJobKind.Host, fn: parseHostStyleProperties },
  { kind: CompilationJobKind.Tmpl, fn: emitNamespaceChanges },
  { kind: CompilationJobKind.Tmpl, fn: propagateI18nBlocks },
  { kind: CompilationJobKind.Tmpl, fn: wrapI18nIcus },
  { kind: CompilationJobKind.Tmpl, fn: createI18nContexts },
  { kind: CompilationJobKind.Both, fn: specializeStyleBindings },
  { kind: CompilationJobKind.Both, fn: specializeBindings },
  { kind: CompilationJobKind.Both, fn: extractAttributes },
  { kind: CompilationJobKind.Both, fn: parseExtractedStyles },
  { kind: CompilationJobKind.Tmpl, fn: removeEmptyBindings },
  { kind: CompilationJobKind.Both, fn: collapseSingletonInterpolations },
  { kind: CompilationJobKind.Both, fn: orderOps },
  { kind: CompilationJobKind.Tmpl, fn: generateConditionalExpressions },
  { kind: CompilationJobKind.Tmpl, fn: createPipes },
  { kind: CompilationJobKind.Tmpl, fn: configureDeferInstructions },
  { kind: CompilationJobKind.Tmpl, fn: convertI18nText },
  { kind: CompilationJobKind.Tmpl, fn: convertI18nBindings },
  { kind: CompilationJobKind.Tmpl, fn: removeUnusedI18nAttributesOps },
  { kind: CompilationJobKind.Tmpl, fn: assignI18nSlotDependencies },
  { kind: CompilationJobKind.Tmpl, fn: applyI18nExpressions },
  { kind: CompilationJobKind.Tmpl, fn: createVariadicPipes },
  { kind: CompilationJobKind.Both, fn: generatePureLiteralStructures },
  { kind: CompilationJobKind.Tmpl, fn: generateProjectionDefs },
  { kind: CompilationJobKind.Tmpl, fn: generateVariables },
  { kind: CompilationJobKind.Tmpl, fn: saveAndRestoreView },
  { kind: CompilationJobKind.Tmpl, fn: deleteAnyCasts },
  { kind: CompilationJobKind.Both, fn: resolveDollarEvent },
  { kind: CompilationJobKind.Tmpl, fn: generateRepeaterDerivedVars },
  { kind: CompilationJobKind.Tmpl, fn: generateTrackVariables },
  { kind: CompilationJobKind.Both, fn: resolveNames },
  { kind: CompilationJobKind.Tmpl, fn: resolveDeferTargetNames },
  { kind: CompilationJobKind.Tmpl, fn: optimizeTrackFns },
  { kind: CompilationJobKind.Both, fn: resolveContexts },
  { kind: CompilationJobKind.Tmpl, fn: resolveSanitizers },
  { kind: CompilationJobKind.Tmpl, fn: liftLocalRefs },
  { kind: CompilationJobKind.Both, fn: generateNullishCoalesceExpressions },
  { kind: CompilationJobKind.Both, fn: expandSafeReads },
  { kind: CompilationJobKind.Both, fn: generateTemporaryVariables },
  { kind: CompilationJobKind.Tmpl, fn: allocateSlots },
  { kind: CompilationJobKind.Tmpl, fn: createDeferDepsFns },
  { kind: CompilationJobKind.Tmpl, fn: resolveI18nElementPlaceholders },
  { kind: CompilationJobKind.Tmpl, fn: resolveI18nExpressionPlaceholders },
  { kind: CompilationJobKind.Tmpl, fn: resolveI18nIcuPlaceholders },
  { kind: CompilationJobKind.Tmpl, fn: extractI18nMessages },
  { kind: CompilationJobKind.Tmpl, fn: generateTrackFns },
  { kind: CompilationJobKind.Tmpl, fn: collectI18nConsts },
  { kind: CompilationJobKind.Tmpl, fn: collectConstExpressions },
  { kind: CompilationJobKind.Both, fn: collectElementConsts },
  { kind: CompilationJobKind.Tmpl, fn: removeI18nContexts },
  { kind: CompilationJobKind.Both, fn: countVariables },
  { kind: CompilationJobKind.Tmpl, fn: generateAdvance },
  { kind: CompilationJobKind.Both, fn: optimizeVariables },
  { kind: CompilationJobKind.Both, fn: nameFunctionsAndVariables },
  { kind: CompilationJobKind.Tmpl, fn: mergeNextContextExpressions },
  { kind: CompilationJobKind.Tmpl, fn: generateNgContainerOps },
  { kind: CompilationJobKind.Tmpl, fn: collapseEmptyInstructions },
  { kind: CompilationJobKind.Tmpl, fn: disableBindings },
  { kind: CompilationJobKind.Both, fn: extractPureFunctions },
  { kind: CompilationJobKind.Both, fn: reify },
  { kind: CompilationJobKind.Both, fn: chain }
];
function transform(job, kind) {
  for (const phase of phases) {
    if (phase.kind === kind || phase.kind === CompilationJobKind.Both) {
      phase.fn(job);
    }
  }
}
function emitTemplateFn(tpl, pool) {
  const rootFn = emitView(tpl.root);
  emitChildViews(tpl.root, pool);
  return rootFn;
}
function emitChildViews(parent, pool) {
  for (const unit of parent.job.units) {
    if (unit.parent !== parent.xref) {
      continue;
    }
    emitChildViews(unit, pool);
    const viewFn = emitView(unit);
    pool.statements.push(viewFn.toDeclStmt(viewFn.name));
  }
}
function emitView(view) {
  if (view.fnName === null) {
    throw new Error(`AssertionError: view ${view.xref} is unnamed`);
  }
  const createStatements = [];
  for (const op of view.create) {
    if (op.kind !== OpKind.Statement) {
      throw new Error(`AssertionError: expected all create ops to have been compiled, but got ${OpKind[op.kind]}`);
    }
    createStatements.push(op.statement);
  }
  const updateStatements = [];
  for (const op of view.update) {
    if (op.kind !== OpKind.Statement) {
      throw new Error(`AssertionError: expected all update ops to have been compiled, but got ${OpKind[op.kind]}`);
    }
    updateStatements.push(op.statement);
  }
  const createCond = maybeGenerateRfBlock(1, createStatements);
  const updateCond = maybeGenerateRfBlock(2, updateStatements);
  return fn(
    [
      new FnParam("rf"),
      new FnParam("ctx")
    ],
    [
      ...createCond,
      ...updateCond
    ],
    void 0,
    void 0,
    view.fnName
  );
}
function maybeGenerateRfBlock(flag, statements) {
  if (statements.length === 0) {
    return [];
  }
  return [
    ifStmt(new BinaryOperatorExpr(BinaryOperator.BitwiseAnd, variable("rf"), literal(flag)), statements)
  ];
}
function emitHostBindingFunction(job) {
  if (job.root.fnName === null) {
    throw new Error(`AssertionError: host binding function is unnamed`);
  }
  const createStatements = [];
  for (const op of job.root.create) {
    if (op.kind !== OpKind.Statement) {
      throw new Error(`AssertionError: expected all create ops to have been compiled, but got ${OpKind[op.kind]}`);
    }
    createStatements.push(op.statement);
  }
  const updateStatements = [];
  for (const op of job.root.update) {
    if (op.kind !== OpKind.Statement) {
      throw new Error(`AssertionError: expected all update ops to have been compiled, but got ${OpKind[op.kind]}`);
    }
    updateStatements.push(op.statement);
  }
  if (createStatements.length === 0 && updateStatements.length === 0) {
    return null;
  }
  const createCond = maybeGenerateRfBlock(1, createStatements);
  const updateCond = maybeGenerateRfBlock(2, updateStatements);
  return fn(
    [
      new FnParam("rf"),
      new FnParam("ctx")
    ],
    [
      ...createCond,
      ...updateCond
    ],
    void 0,
    void 0,
    job.root.fnName
  );
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/src/ingest.mjs
var compatibilityMode = CompatibilityMode.TemplateDefinitionBuilder;
function ingestComponent(componentName, template2, constantPool, relativeContextFilePath, i18nUseExternalIds, deferBlocksMeta) {
  const job = new ComponentCompilationJob(componentName, constantPool, compatibilityMode, relativeContextFilePath, i18nUseExternalIds, deferBlocksMeta);
  ingestNodes(job.root, template2);
  return job;
}
function ingestHostBinding(input, bindingParser, constantPool) {
  var _a2, _b2, _c2;
  const job = new HostBindingCompilationJob(input.componentName, constantPool, compatibilityMode);
  for (const property2 of (_a2 = input.properties) != null ? _a2 : []) {
    ingestHostProperty(job, property2, false);
  }
  for (const [name, expr] of (_b2 = Object.entries(input.attributes)) != null ? _b2 : []) {
    ingestHostAttribute(job, name, expr);
  }
  for (const event of (_c2 = input.events) != null ? _c2 : []) {
    ingestHostEvent(job, event);
  }
  return job;
}
function ingestHostProperty(job, property2, isTextAttribute) {
  let expression;
  const ast = property2.expression.ast;
  if (ast instanceof Interpolation) {
    expression = new Interpolation2(ast.strings, ast.expressions.map((expr) => convertAst(expr, job, property2.sourceSpan)), []);
  } else {
    expression = convertAst(ast, job, property2.sourceSpan);
  }
  let bindingKind = BindingKind.Property;
  if (property2.name.startsWith("attr.")) {
    property2.name = property2.name.substring("attr.".length);
    bindingKind = BindingKind.Attribute;
  }
  if (property2.isAnimation) {
    bindingKind = BindingKind.Animation;
  }
  job.root.update.push(createBindingOp(job.root.xref, bindingKind, property2.name, expression, null, SecurityContext.NONE, isTextAttribute, false, null, property2.sourceSpan));
}
function ingestHostAttribute(job, name, value) {
  const attrBinding = createBindingOp(
    job.root.xref,
    BindingKind.Attribute,
    name,
    value,
    null,
    SecurityContext.NONE,
    true,
    false,
    null,
    null
  );
  job.root.update.push(attrBinding);
}
function ingestHostEvent(job, event) {
  const eventBinding = createListenerOp(job.root.xref, new SlotHandle(), event.name, null, event.targetOrPhase, true, event.sourceSpan);
  eventBinding.handlerOps.push(createStatementOp(new ReturnStatement(convertAst(event.handler.ast, job, event.sourceSpan), event.handlerSpan)));
  job.root.create.push(eventBinding);
}
function ingestNodes(unit, template2) {
  for (const node of template2) {
    if (node instanceof Element) {
      ingestElement(unit, node);
    } else if (node instanceof Template) {
      ingestTemplate(unit, node);
    } else if (node instanceof Content) {
      ingestContent(unit, node);
    } else if (node instanceof Text) {
      ingestText(unit, node);
    } else if (node instanceof BoundText) {
      ingestBoundText(unit, node);
    } else if (node instanceof IfBlock) {
      ingestIfBlock(unit, node);
    } else if (node instanceof SwitchBlock) {
      ingestSwitchBlock(unit, node);
    } else if (node instanceof DeferredBlock) {
      ingestDeferBlock(unit, node);
    } else if (node instanceof Icu) {
      ingestIcu(unit, node);
    } else if (node instanceof ForLoopBlock) {
      ingestForBlock(unit, node);
    } else {
      throw new Error(`Unsupported template node: ${node.constructor.name}`);
    }
  }
}
function ingestElement(unit, element2) {
  var _a2;
  if (element2.i18n !== void 0 && !(element2.i18n instanceof Message || element2.i18n instanceof TagPlaceholder)) {
    throw Error(`Unhandled i18n metadata type for element: ${element2.i18n.constructor.name}`);
  }
  const id = unit.job.allocateXrefId();
  const [namespaceKey, elementName] = splitNsName(element2.name);
  const startOp = createElementStartOp(elementName, id, namespaceForKey(namespaceKey), element2.i18n instanceof TagPlaceholder ? element2.i18n : void 0, element2.startSourceSpan);
  unit.create.push(startOp);
  ingestBindings(unit, startOp, element2);
  ingestReferences(startOp, element2);
  ingestNodes(unit, element2.children);
  const endOp = createElementEndOp(id, (_a2 = element2.endSourceSpan) != null ? _a2 : element2.startSourceSpan);
  unit.create.push(endOp);
  if (element2.i18n instanceof Message) {
    const i18nBlockId = unit.job.allocateXrefId();
    OpList.insertAfter(createI18nStartOp(i18nBlockId, element2.i18n), startOp);
    OpList.insertBefore(createI18nEndOp(i18nBlockId), endOp);
  }
}
function ingestTemplate(unit, tmpl) {
  if (tmpl.i18n !== void 0 && !(tmpl.i18n instanceof Message || tmpl.i18n instanceof TagPlaceholder)) {
    throw Error(`Unhandled i18n metadata type for template: ${tmpl.i18n.constructor.name}`);
  }
  const childView = unit.job.allocateView(unit.xref);
  let tagNameWithoutNamespace = tmpl.tagName;
  let namespacePrefix = "";
  if (tmpl.tagName) {
    [namespacePrefix, tagNameWithoutNamespace] = splitNsName(tmpl.tagName);
  }
  const i18nPlaceholder = tmpl.i18n instanceof TagPlaceholder ? tmpl.i18n : void 0;
  const namespace = namespaceForKey(namespacePrefix);
  const functionNameSuffix = tagNameWithoutNamespace === null ? "" : prefixWithNamespace(tagNameWithoutNamespace, namespace);
  const templateKind = isPlainTemplate(tmpl) ? TemplateKind.NgTemplate : TemplateKind.Structural;
  const templateOp = createTemplateOp(childView.xref, templateKind, tagNameWithoutNamespace, functionNameSuffix, namespace, i18nPlaceholder, tmpl.startSourceSpan);
  unit.create.push(templateOp);
  ingestBindings(unit, templateOp, tmpl);
  ingestReferences(templateOp, tmpl);
  ingestNodes(childView, tmpl.children);
  for (const { name, value } of tmpl.variables) {
    childView.contextVariables.set(name, value !== "" ? value : "$implicit");
  }
  if (templateKind === TemplateKind.NgTemplate && tmpl.i18n instanceof Message) {
    const id = unit.job.allocateXrefId();
    OpList.insertAfter(createI18nStartOp(id, tmpl.i18n), childView.create.head);
    OpList.insertBefore(createI18nEndOp(id), childView.create.tail);
  }
}
function ingestContent(unit, content) {
  if (content.i18n !== void 0 && !(content.i18n instanceof TagPlaceholder)) {
    throw Error(`Unhandled i18n metadata type for element: ${content.i18n.constructor.name}`);
  }
  const attrs = content.attributes.flatMap((a) => [a.name, a.value]);
  const op = createProjectionOp(unit.job.allocateXrefId(), content.selector, content.i18n, attrs, content.sourceSpan);
  for (const attr of content.attributes) {
    ingestBinding(unit, op.xref, attr.name, literal(attr.value), 1, null, SecurityContext.NONE, attr.sourceSpan, BindingFlags.TextValue, attr.i18n);
  }
  unit.create.push(op);
}
function ingestText(unit, text2) {
  unit.create.push(createTextOp(unit.job.allocateXrefId(), text2.value, text2.sourceSpan));
}
function ingestBoundText(unit, text2, i18nPlaceholders) {
  var _a2;
  let value = text2.value;
  if (value instanceof ASTWithSource) {
    value = value.ast;
  }
  if (!(value instanceof Interpolation)) {
    throw new Error(`AssertionError: expected Interpolation for BoundText node, got ${value.constructor.name}`);
  }
  if (text2.i18n !== void 0 && !(text2.i18n instanceof Container)) {
    throw Error(`Unhandled i18n metadata type for text interpolation: ${(_a2 = text2.i18n) == null ? void 0 : _a2.constructor.name}`);
  }
  if (i18nPlaceholders === void 0) {
    i18nPlaceholders = text2.i18n instanceof Container ? text2.i18n.children.filter((node) => node instanceof Placeholder).map((placeholder) => placeholder.name) : [];
  }
  if (i18nPlaceholders.length > 0 && i18nPlaceholders.length !== value.expressions.length) {
    throw Error(`Unexpected number of i18n placeholders (${value.expressions.length}) for BoundText with ${value.expressions.length} expressions`);
  }
  const textXref = unit.job.allocateXrefId();
  unit.create.push(createTextOp(textXref, "", text2.sourceSpan));
  const baseSourceSpan = unit.job.compatibility ? null : text2.sourceSpan;
  unit.update.push(createInterpolateTextOp(textXref, new Interpolation2(value.strings, value.expressions.map((expr) => convertAst(expr, unit.job, baseSourceSpan)), i18nPlaceholders), text2.sourceSpan));
}
function ingestIfBlock(unit, ifBlock) {
  var _a2;
  let firstXref = null;
  let firstSlotHandle = null;
  let conditions = [];
  for (let i = 0; i < ifBlock.branches.length; i++) {
    const ifCase = ifBlock.branches[i];
    const cView = unit.job.allocateView(unit.xref);
    let tagName = null;
    if (i === 0) {
      tagName = ingestControlFlowInsertionPoint(unit, cView.xref, ifCase);
    }
    if (ifCase.expressionAlias !== null) {
      cView.contextVariables.set(ifCase.expressionAlias.name, CTX_REF);
    }
    let ifCaseI18nMeta = void 0;
    if (ifCase.i18n !== void 0) {
      if (!(ifCase.i18n instanceof BlockPlaceholder)) {
        throw Error(`Unhandled i18n metadata type for if block: ${(_a2 = ifCase.i18n) == null ? void 0 : _a2.constructor.name}`);
      }
      ifCaseI18nMeta = ifCase.i18n;
    }
    const templateOp = createTemplateOp(cView.xref, TemplateKind.Block, tagName, "Conditional", Namespace.HTML, ifCaseI18nMeta, ifCase.sourceSpan);
    unit.create.push(templateOp);
    if (firstXref === null) {
      firstXref = cView.xref;
      firstSlotHandle = templateOp.handle;
    }
    const caseExpr = ifCase.expression ? convertAst(ifCase.expression, unit.job, null) : null;
    const conditionalCaseExpr = new ConditionalCaseExpr(caseExpr, templateOp.xref, templateOp.handle, ifCase.expressionAlias);
    conditions.push(conditionalCaseExpr);
    ingestNodes(cView, ifCase.children);
  }
  const conditional2 = createConditionalOp(firstXref, firstSlotHandle, null, conditions, ifBlock.sourceSpan);
  unit.update.push(conditional2);
}
function ingestSwitchBlock(unit, switchBlock) {
  var _a2;
  let firstXref = null;
  let firstSlotHandle = null;
  let conditions = [];
  for (const switchCase of switchBlock.cases) {
    const cView = unit.job.allocateView(unit.xref);
    let switchCaseI18nMeta = void 0;
    if (switchCase.i18n !== void 0) {
      if (!(switchCase.i18n instanceof BlockPlaceholder)) {
        throw Error(`Unhandled i18n metadata type for switch block: ${(_a2 = switchCase.i18n) == null ? void 0 : _a2.constructor.name}`);
      }
      switchCaseI18nMeta = switchCase.i18n;
    }
    const templateOp = createTemplateOp(cView.xref, TemplateKind.Block, null, "Case", Namespace.HTML, switchCaseI18nMeta, switchCase.sourceSpan);
    unit.create.push(templateOp);
    if (firstXref === null) {
      firstXref = cView.xref;
      firstSlotHandle = templateOp.handle;
    }
    const caseExpr = switchCase.expression ? convertAst(switchCase.expression, unit.job, switchBlock.startSourceSpan) : null;
    const conditionalCaseExpr = new ConditionalCaseExpr(caseExpr, templateOp.xref, templateOp.handle);
    conditions.push(conditionalCaseExpr);
    ingestNodes(cView, switchCase.children);
  }
  const conditional2 = createConditionalOp(firstXref, firstSlotHandle, convertAst(switchBlock.expression, unit.job, null), conditions, switchBlock.sourceSpan);
  unit.update.push(conditional2);
}
function ingestDeferView(unit, suffix, children, sourceSpan) {
  if (children === void 0) {
    return null;
  }
  const secondaryView = unit.job.allocateView(unit.xref);
  ingestNodes(secondaryView, children);
  const templateOp = createTemplateOp(secondaryView.xref, TemplateKind.Block, null, `Defer${suffix}`, Namespace.HTML, void 0, sourceSpan);
  unit.create.push(templateOp);
  return templateOp;
}
function ingestDeferBlock(unit, deferBlock) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const blockMeta = unit.job.deferBlocksMeta.get(deferBlock);
  if (blockMeta === void 0) {
    throw new Error(`AssertionError: unable to find metadata for deferred block`);
  }
  const main = ingestDeferView(unit, "", deferBlock.children, deferBlock.sourceSpan);
  const loading = ingestDeferView(unit, "Loading", (_a2 = deferBlock.loading) == null ? void 0 : _a2.children, (_b2 = deferBlock.loading) == null ? void 0 : _b2.sourceSpan);
  const placeholder = ingestDeferView(unit, "Placeholder", (_c2 = deferBlock.placeholder) == null ? void 0 : _c2.children, (_d2 = deferBlock.placeholder) == null ? void 0 : _d2.sourceSpan);
  const error2 = ingestDeferView(unit, "Error", (_e2 = deferBlock.error) == null ? void 0 : _e2.children, (_f2 = deferBlock.error) == null ? void 0 : _f2.sourceSpan);
  const deferXref = unit.job.allocateXrefId();
  const deferOp = createDeferOp(deferXref, main.xref, main.handle, blockMeta, deferBlock.sourceSpan);
  deferOp.placeholderView = (_g = placeholder == null ? void 0 : placeholder.xref) != null ? _g : null;
  deferOp.placeholderSlot = (_h = placeholder == null ? void 0 : placeholder.handle) != null ? _h : null;
  deferOp.loadingSlot = (_i = loading == null ? void 0 : loading.handle) != null ? _i : null;
  deferOp.errorSlot = (_j = error2 == null ? void 0 : error2.handle) != null ? _j : null;
  deferOp.placeholderMinimumTime = (_l = (_k = deferBlock.placeholder) == null ? void 0 : _k.minimumTime) != null ? _l : null;
  deferOp.loadingMinimumTime = (_n = (_m = deferBlock.loading) == null ? void 0 : _m.minimumTime) != null ? _n : null;
  deferOp.loadingAfterTime = (_p = (_o = deferBlock.loading) == null ? void 0 : _o.afterTime) != null ? _p : null;
  unit.create.push(deferOp);
  let prefetch = false;
  let deferOnOps = [];
  let deferWhenOps = [];
  for (const triggers of [deferBlock.triggers, deferBlock.prefetchTriggers]) {
    if (triggers.idle !== void 0) {
      const deferOnOp = createDeferOnOp(deferXref, { kind: DeferTriggerKind.Idle }, prefetch, triggers.idle.sourceSpan);
      deferOnOps.push(deferOnOp);
    }
    if (triggers.immediate !== void 0) {
      const deferOnOp = createDeferOnOp(deferXref, { kind: DeferTriggerKind.Immediate }, prefetch, triggers.immediate.sourceSpan);
      deferOnOps.push(deferOnOp);
    }
    if (triggers.timer !== void 0) {
      const deferOnOp = createDeferOnOp(deferXref, { kind: DeferTriggerKind.Timer, delay: triggers.timer.delay }, prefetch, triggers.timer.sourceSpan);
      deferOnOps.push(deferOnOp);
    }
    if (triggers.hover !== void 0) {
      const deferOnOp = createDeferOnOp(deferXref, {
        kind: DeferTriggerKind.Hover,
        targetName: triggers.hover.reference,
        targetXref: null,
        targetSlot: null,
        targetView: null,
        targetSlotViewSteps: null
      }, prefetch, triggers.hover.sourceSpan);
      deferOnOps.push(deferOnOp);
    }
    if (triggers.interaction !== void 0) {
      const deferOnOp = createDeferOnOp(deferXref, {
        kind: DeferTriggerKind.Interaction,
        targetName: triggers.interaction.reference,
        targetXref: null,
        targetSlot: null,
        targetView: null,
        targetSlotViewSteps: null
      }, prefetch, triggers.interaction.sourceSpan);
      deferOnOps.push(deferOnOp);
    }
    if (triggers.viewport !== void 0) {
      const deferOnOp = createDeferOnOp(deferXref, {
        kind: DeferTriggerKind.Viewport,
        targetName: triggers.viewport.reference,
        targetXref: null,
        targetSlot: null,
        targetView: null,
        targetSlotViewSteps: null
      }, prefetch, triggers.viewport.sourceSpan);
      deferOnOps.push(deferOnOp);
    }
    if (triggers.when !== void 0) {
      const deferOnOp = createDeferWhenOp(deferXref, convertAst(triggers.when.value, unit.job, triggers.when.sourceSpan), prefetch, triggers.when.sourceSpan);
      deferWhenOps.push(deferOnOp);
    }
    if (deferOnOps.length === 0 && deferWhenOps.length === 0) {
      deferOnOps.push(createDeferOnOp(deferXref, { kind: DeferTriggerKind.Idle }, false, null));
    }
    prefetch = true;
  }
  unit.create.push(deferOnOps);
  unit.update.push(deferWhenOps);
}
function ingestIcu(unit, icu) {
  var _a2;
  if (icu.i18n instanceof Message && isSingleI18nIcu(icu.i18n)) {
    const xref = unit.job.allocateXrefId();
    const icuNode = icu.i18n.nodes[0];
    unit.create.push(createIcuStartOp(xref, icu.i18n, icuFromI18nMessage(icu.i18n).name, null));
    for (const [placeholder, text2] of Object.entries(__spreadValues(__spreadValues({}, icu.vars), icu.placeholders))) {
      if (text2 instanceof BoundText) {
        ingestBoundText(unit, text2, [placeholder]);
      } else {
        ingestText(unit, text2);
      }
    }
    unit.create.push(createIcuEndOp(xref));
  } else {
    throw Error(`Unhandled i18n metadata type for ICU: ${(_a2 = icu.i18n) == null ? void 0 : _a2.constructor.name}`);
  }
}
function ingestForBlock(unit, forBlock) {
  var _a2;
  const repeaterView = unit.job.allocateView(unit.xref);
  const createRepeaterAlias = (ident, repeaterVar) => {
    repeaterView.aliases.add({
      kind: SemanticVariableKind.Alias,
      name: null,
      identifier: ident,
      expression: new DerivedRepeaterVarExpr(repeaterView.xref, repeaterVar)
    });
  };
  repeaterView.contextVariables.set(forBlock.item.name, forBlock.item.value);
  repeaterView.contextVariables.set(forBlock.contextVariables.$index.name, forBlock.contextVariables.$index.value);
  repeaterView.contextVariables.set(forBlock.contextVariables.$count.name, forBlock.contextVariables.$count.value);
  createRepeaterAlias(forBlock.contextVariables.$first.name, DerivedRepeaterVarIdentity.First);
  createRepeaterAlias(forBlock.contextVariables.$last.name, DerivedRepeaterVarIdentity.Last);
  createRepeaterAlias(forBlock.contextVariables.$even.name, DerivedRepeaterVarIdentity.Even);
  createRepeaterAlias(forBlock.contextVariables.$odd.name, DerivedRepeaterVarIdentity.Odd);
  const sourceSpan = convertSourceSpan(forBlock.trackBy.span, forBlock.sourceSpan);
  const track = convertAst(forBlock.trackBy, unit.job, sourceSpan);
  ingestNodes(repeaterView, forBlock.children);
  let emptyView = null;
  if (forBlock.empty !== null) {
    emptyView = unit.job.allocateView(unit.xref);
    ingestNodes(emptyView, forBlock.empty.children);
  }
  const varNames = {
    $index: forBlock.contextVariables.$index.name,
    $count: forBlock.contextVariables.$count.name,
    $first: forBlock.contextVariables.$first.name,
    $last: forBlock.contextVariables.$last.name,
    $even: forBlock.contextVariables.$even.name,
    $odd: forBlock.contextVariables.$odd.name,
    $implicit: forBlock.item.name
  };
  const tagName = ingestControlFlowInsertionPoint(unit, repeaterView.xref, forBlock);
  const repeaterCreate2 = createRepeaterCreateOp(repeaterView.xref, (_a2 = emptyView == null ? void 0 : emptyView.xref) != null ? _a2 : null, tagName, track, varNames, forBlock.sourceSpan);
  unit.create.push(repeaterCreate2);
  const expression = convertAst(forBlock.expression, unit.job, convertSourceSpan(forBlock.expression.span, forBlock.sourceSpan));
  const repeater2 = createRepeaterOp(repeaterCreate2.xref, repeaterCreate2.handle, expression, forBlock.sourceSpan);
  unit.update.push(repeater2);
}
function convertAst(ast, job, baseSourceSpan) {
  if (ast instanceof ASTWithSource) {
    return convertAst(ast.ast, job, baseSourceSpan);
  } else if (ast instanceof PropertyRead) {
    if (ast.receiver instanceof ImplicitReceiver && !(ast.receiver instanceof ThisReceiver)) {
      return new LexicalReadExpr(ast.name);
    } else {
      return new ReadPropExpr(convertAst(ast.receiver, job, baseSourceSpan), ast.name, null, convertSourceSpan(ast.span, baseSourceSpan));
    }
  } else if (ast instanceof PropertyWrite) {
    if (ast.receiver instanceof ImplicitReceiver) {
      return new WritePropExpr(
        new ContextExpr(job.root.xref),
        ast.name,
        convertAst(ast.value, job, baseSourceSpan),
        null,
        convertSourceSpan(ast.span, baseSourceSpan)
      );
    }
    return new WritePropExpr(convertAst(ast.receiver, job, baseSourceSpan), ast.name, convertAst(ast.value, job, baseSourceSpan), void 0, convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof KeyedWrite) {
    return new WriteKeyExpr(convertAst(ast.receiver, job, baseSourceSpan), convertAst(ast.key, job, baseSourceSpan), convertAst(ast.value, job, baseSourceSpan), void 0, convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof Call) {
    if (ast.receiver instanceof ImplicitReceiver) {
      throw new Error(`Unexpected ImplicitReceiver`);
    } else {
      return new InvokeFunctionExpr(convertAst(ast.receiver, job, baseSourceSpan), ast.args.map((arg) => convertAst(arg, job, baseSourceSpan)), void 0, convertSourceSpan(ast.span, baseSourceSpan));
    }
  } else if (ast instanceof LiteralPrimitive) {
    return literal(ast.value, void 0, convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof Unary) {
    switch (ast.operator) {
      case "+":
        return new UnaryOperatorExpr(UnaryOperator.Plus, convertAst(ast.expr, job, baseSourceSpan), void 0, convertSourceSpan(ast.span, baseSourceSpan));
      case "-":
        return new UnaryOperatorExpr(UnaryOperator.Minus, convertAst(ast.expr, job, baseSourceSpan), void 0, convertSourceSpan(ast.span, baseSourceSpan));
      default:
        throw new Error(`AssertionError: unknown unary operator ${ast.operator}`);
    }
  } else if (ast instanceof Binary) {
    const operator = BINARY_OPERATORS.get(ast.operation);
    if (operator === void 0) {
      throw new Error(`AssertionError: unknown binary operator ${ast.operation}`);
    }
    return new BinaryOperatorExpr(operator, convertAst(ast.left, job, baseSourceSpan), convertAst(ast.right, job, baseSourceSpan), void 0, convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof ThisReceiver) {
    return new ContextExpr(job.root.xref);
  } else if (ast instanceof KeyedRead) {
    return new ReadKeyExpr(convertAst(ast.receiver, job, baseSourceSpan), convertAst(ast.key, job, baseSourceSpan), void 0, convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof Chain) {
    throw new Error(`AssertionError: Chain in unknown context`);
  } else if (ast instanceof LiteralMap) {
    const entries = ast.keys.map((key, idx) => {
      const value = ast.values[idx];
      return new LiteralMapEntry(key.key, convertAst(value, job, baseSourceSpan), key.quoted);
    });
    return new LiteralMapExpr(entries, void 0, convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof LiteralArray) {
    return new LiteralArrayExpr(ast.expressions.map((expr) => convertAst(expr, job, baseSourceSpan)));
  } else if (ast instanceof Conditional) {
    return new ConditionalExpr(convertAst(ast.condition, job, baseSourceSpan), convertAst(ast.trueExp, job, baseSourceSpan), convertAst(ast.falseExp, job, baseSourceSpan), void 0, convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof NonNullAssert) {
    return convertAst(ast.expression, job, baseSourceSpan);
  } else if (ast instanceof BindingPipe) {
    return new PipeBindingExpr(job.allocateXrefId(), new SlotHandle(), ast.name, [
      convertAst(ast.exp, job, baseSourceSpan),
      ...ast.args.map((arg) => convertAst(arg, job, baseSourceSpan))
    ]);
  } else if (ast instanceof SafeKeyedRead) {
    return new SafeKeyedReadExpr(convertAst(ast.receiver, job, baseSourceSpan), convertAst(ast.key, job, baseSourceSpan), convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof SafePropertyRead) {
    return new SafePropertyReadExpr(convertAst(ast.receiver, job, baseSourceSpan), ast.name);
  } else if (ast instanceof SafeCall) {
    return new SafeInvokeFunctionExpr(convertAst(ast.receiver, job, baseSourceSpan), ast.args.map((a) => convertAst(a, job, baseSourceSpan)));
  } else if (ast instanceof EmptyExpr) {
    return new EmptyExpr2(convertSourceSpan(ast.span, baseSourceSpan));
  } else if (ast instanceof PrefixNot) {
    return not(convertAst(ast.expression, job, baseSourceSpan), convertSourceSpan(ast.span, baseSourceSpan));
  } else {
    throw new Error(`Unhandled expression type "${ast.constructor.name}" in file "${baseSourceSpan == null ? void 0 : baseSourceSpan.start.file.url}"`);
  }
}
function isPlainTemplate(tmpl) {
  var _a2;
  return splitNsName((_a2 = tmpl.tagName) != null ? _a2 : "")[1] === "ng-template";
}
function ingestBindings(unit, op, element2) {
  let flags = BindingFlags.None;
  let hasI18nAttributes = false;
  if (element2 instanceof Template) {
    flags |= BindingFlags.OnNgTemplateElement;
    if (element2 instanceof Template && isPlainTemplate(element2)) {
      flags |= BindingFlags.BindingTargetsTemplate;
    }
    const templateAttrFlags = flags | BindingFlags.BindingTargetsTemplate | BindingFlags.IsStructuralTemplateAttribute;
    for (const attr of element2.templateAttrs) {
      if (attr instanceof TextAttribute) {
        ingestBinding(unit, op.xref, attr.name, literal(attr.value), 1, null, SecurityContext.NONE, attr.sourceSpan, templateAttrFlags | BindingFlags.TextValue, attr.i18n);
        hasI18nAttributes || (hasI18nAttributes = attr.i18n !== void 0);
      } else {
        ingestBinding(unit, op.xref, attr.name, attr.value, attr.type, attr.unit, attr.securityContext, attr.sourceSpan, templateAttrFlags, attr.i18n);
        hasI18nAttributes || (hasI18nAttributes = attr.i18n !== void 0);
      }
    }
  }
  for (const attr of element2.attributes) {
    ingestBinding(unit, op.xref, attr.name, literal(attr.value), 1, null, SecurityContext.NONE, attr.sourceSpan, flags | BindingFlags.TextValue, attr.i18n);
    hasI18nAttributes || (hasI18nAttributes = attr.i18n !== void 0);
  }
  for (const input of element2.inputs) {
    ingestBinding(unit, op.xref, input.name, input.value, input.type, input.unit, input.securityContext, input.sourceSpan, flags, input.i18n);
    hasI18nAttributes || (hasI18nAttributes = input.i18n !== void 0);
  }
  for (const output of element2.outputs) {
    let listenerOp;
    if (output.type === 1) {
      if (output.phase === null) {
        throw Error("Animation listener should have a phase");
      }
    }
    if (element2 instanceof Template && !isPlainTemplate(element2)) {
      unit.create.push(createExtractedAttributeOp(op.xref, BindingKind.Property, output.name, null, null));
      continue;
    }
    listenerOp = createListenerOp(op.xref, op.handle, output.name, op.tag, output.phase, false, output.sourceSpan);
    let handlerExprs;
    let handler = output.handler;
    if (handler instanceof ASTWithSource) {
      handler = handler.ast;
    }
    if (handler instanceof Chain) {
      handlerExprs = handler.expressions;
    } else {
      handlerExprs = [handler];
    }
    if (handlerExprs.length === 0) {
      throw new Error("Expected listener to have non-empty expression list.");
    }
    const expressions = handlerExprs.map((expr) => convertAst(expr, unit.job, output.handlerSpan));
    const returnExpr = expressions.pop();
    for (const expr of expressions) {
      const stmtOp = createStatementOp(new ExpressionStatement(expr, expr.sourceSpan));
      listenerOp.handlerOps.push(stmtOp);
    }
    listenerOp.handlerOps.push(createStatementOp(new ReturnStatement(returnExpr, returnExpr.sourceSpan)));
    unit.create.push(listenerOp);
  }
  if (hasI18nAttributes) {
    unit.create.push(createI18nAttributesOp(unit.job.allocateXrefId(), new SlotHandle(), op.xref));
  }
}
var BINDING_KINDS = /* @__PURE__ */ new Map([
  [0, BindingKind.Property],
  [1, BindingKind.Attribute],
  [2, BindingKind.ClassName],
  [3, BindingKind.StyleProperty],
  [4, BindingKind.Animation]
]);
var BindingFlags;
(function(BindingFlags2) {
  BindingFlags2[BindingFlags2["None"] = 0] = "None";
  BindingFlags2[BindingFlags2["TextValue"] = 1] = "TextValue";
  BindingFlags2[BindingFlags2["BindingTargetsTemplate"] = 2] = "BindingTargetsTemplate";
  BindingFlags2[BindingFlags2["IsStructuralTemplateAttribute"] = 4] = "IsStructuralTemplateAttribute";
  BindingFlags2[BindingFlags2["OnNgTemplateElement"] = 8] = "OnNgTemplateElement";
})(BindingFlags || (BindingFlags = {}));
function ingestBinding(view, xref, name, value, type, unit, securityContext, sourceSpan, flags, i18nMeta) {
  if (value instanceof ASTWithSource) {
    value = value.ast;
  }
  let i18nContext = null;
  if (i18nMeta !== void 0) {
    if (!(i18nMeta instanceof Message)) {
      throw Error(`Unhandled i18n metadata type for binding: ${i18nMeta.constructor.name}`);
    }
    i18nContext = view.job.allocateXrefId();
    view.create.push(createI18nContextOp(I18nContextKind.Attr, i18nContext, null, i18nMeta, null));
  }
  if (flags & BindingFlags.OnNgTemplateElement && !(flags & BindingFlags.BindingTargetsTemplate) && type === 0) {
    view.create.push(createExtractedAttributeOp(xref, BindingKind.Property, name, null, i18nContext));
    return;
  }
  let expression;
  if (value instanceof Interpolation) {
    let i18nPlaceholders = [];
    if (i18nMeta !== void 0) {
      i18nPlaceholders = Object.keys(i18nMeta.placeholders);
    }
    expression = new Interpolation2(value.strings, value.expressions.map((expr) => convertAst(expr, view.job, null)), i18nPlaceholders);
  } else if (value instanceof AST) {
    expression = convertAst(value, view.job, null);
  } else {
    expression = value;
  }
  const kind = BINDING_KINDS.get(type);
  view.update.push(createBindingOp(xref, kind, name, expression, unit, securityContext, !!(flags & BindingFlags.TextValue), !!(flags & BindingFlags.IsStructuralTemplateAttribute), i18nContext, sourceSpan));
}
function ingestReferences(op, element2) {
  assertIsArray(op.localRefs);
  for (const { name, value } of element2.references) {
    op.localRefs.push({
      name,
      target: value
    });
  }
}
function assertIsArray(value) {
  if (!Array.isArray(value)) {
    throw new Error(`AssertionError: expected an array`);
  }
}
function convertSourceSpan(span, baseSourceSpan) {
  if (baseSourceSpan === null) {
    return null;
  }
  const start = baseSourceSpan.start.moveBy(span.start);
  const end = baseSourceSpan.start.moveBy(span.end);
  const fullStart = baseSourceSpan.fullStart.moveBy(span.start);
  return new ParseSourceSpan(start, end, fullStart);
}
function ingestControlFlowInsertionPoint(unit, xref, node) {
  let root = null;
  for (const child of node.children) {
    if (child instanceof Comment) {
      continue;
    }
    if (root !== null) {
      return null;
    }
    if (child instanceof Element || child instanceof Template && child.tagName !== null) {
      root = child;
    }
  }
  if (root !== null) {
    for (const attr of root.attributes) {
      ingestBinding(unit, xref, attr.name, literal(attr.value), 1, null, SecurityContext.NONE, attr.sourceSpan, BindingFlags.TextValue, attr.i18n);
    }
    const tagName = root instanceof Element ? root.name : root.tagName;
    return tagName === "ng-template" ? null : tagName;
  }
  return null;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template/pipeline/switch/index.mjs
var USE_TEMPLATE_PIPELINE = false;

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/styling_builder.mjs
var IMPORTANT_FLAG = "!important";
var MIN_STYLING_BINDING_SLOTS_REQUIRED = 2;
var StylingBuilder = class {
  constructor(_directiveExpr) {
    this._directiveExpr = _directiveExpr;
    this._hasInitialValues = false;
    this.hasBindings = false;
    this.hasBindingsWithPipes = false;
    this._classMapInput = null;
    this._styleMapInput = null;
    this._singleStyleInputs = null;
    this._singleClassInputs = null;
    this._lastStylingInput = null;
    this._firstStylingInput = null;
    this._stylesIndex = /* @__PURE__ */ new Map();
    this._classesIndex = /* @__PURE__ */ new Map();
    this._initialStyleValues = [];
    this._initialClassValues = [];
  }
  registerBoundInput(input) {
    let binding = null;
    let name = input.name;
    switch (input.type) {
      case 0:
        binding = this.registerInputBasedOnName(name, input.value, input.sourceSpan);
        break;
      case 3:
        binding = this.registerStyleInput(name, false, input.value, input.sourceSpan, input.unit);
        break;
      case 2:
        binding = this.registerClassInput(name, false, input.value, input.sourceSpan);
        break;
    }
    return binding ? true : false;
  }
  registerInputBasedOnName(name, expression, sourceSpan) {
    let binding = null;
    const prefix = name.substring(0, 6);
    const isStyle = name === "style" || prefix === "style." || prefix === "style!";
    const isClass = !isStyle && (name === "class" || prefix === "class." || prefix === "class!");
    if (isStyle || isClass) {
      const isMapBased = name.charAt(5) !== ".";
      const property2 = name.slice(isMapBased ? 5 : 6);
      if (isStyle) {
        binding = this.registerStyleInput(property2, isMapBased, expression, sourceSpan);
      } else {
        binding = this.registerClassInput(property2, isMapBased, expression, sourceSpan);
      }
    }
    return binding;
  }
  registerStyleInput(name, isMapBased, value, sourceSpan, suffix) {
    if (isEmptyExpression(value)) {
      return null;
    }
    if (!isCssCustomProperty2(name)) {
      name = hyphenate2(name);
    }
    const { property: property2, hasOverrideFlag, suffix: bindingSuffix } = parseProperty2(name);
    suffix = typeof suffix === "string" && suffix.length !== 0 ? suffix : bindingSuffix;
    const entry = { name: property2, suffix, value, sourceSpan, hasOverrideFlag };
    if (isMapBased) {
      this._styleMapInput = entry;
    } else {
      (this._singleStyleInputs = this._singleStyleInputs || []).push(entry);
      registerIntoMap(this._stylesIndex, property2);
    }
    this._lastStylingInput = entry;
    this._firstStylingInput = this._firstStylingInput || entry;
    this._checkForPipes(value);
    this.hasBindings = true;
    return entry;
  }
  registerClassInput(name, isMapBased, value, sourceSpan) {
    if (isEmptyExpression(value)) {
      return null;
    }
    const { property: property2, hasOverrideFlag } = parseProperty2(name);
    const entry = { name: property2, value, sourceSpan, hasOverrideFlag, suffix: null };
    if (isMapBased) {
      this._classMapInput = entry;
    } else {
      (this._singleClassInputs = this._singleClassInputs || []).push(entry);
      registerIntoMap(this._classesIndex, property2);
    }
    this._lastStylingInput = entry;
    this._firstStylingInput = this._firstStylingInput || entry;
    this._checkForPipes(value);
    this.hasBindings = true;
    return entry;
  }
  _checkForPipes(value) {
    if (value instanceof ASTWithSource && value.ast instanceof BindingPipe) {
      this.hasBindingsWithPipes = true;
    }
  }
  registerStyleAttr(value) {
    this._initialStyleValues = parse(value);
    this._hasInitialValues = true;
  }
  registerClassAttr(value) {
    this._initialClassValues = value.trim().split(/\s+/g);
    this._hasInitialValues = true;
  }
  populateInitialStylingAttrs(attrs) {
    if (this._initialClassValues.length) {
      attrs.push(literal(1));
      for (let i = 0; i < this._initialClassValues.length; i++) {
        attrs.push(literal(this._initialClassValues[i]));
      }
    }
    if (this._initialStyleValues.length) {
      attrs.push(literal(2));
      for (let i = 0; i < this._initialStyleValues.length; i += 2) {
        attrs.push(literal(this._initialStyleValues[i]), literal(this._initialStyleValues[i + 1]));
      }
    }
  }
  assignHostAttrs(attrs, definitionMap) {
    if (this._directiveExpr && (attrs.length || this._hasInitialValues)) {
      this.populateInitialStylingAttrs(attrs);
      definitionMap.set("hostAttrs", literalArr(attrs));
    }
  }
  buildClassMapInstruction(valueConverter) {
    if (this._classMapInput) {
      return this._buildMapBasedInstruction(valueConverter, true, this._classMapInput);
    }
    return null;
  }
  buildStyleMapInstruction(valueConverter) {
    if (this._styleMapInput) {
      return this._buildMapBasedInstruction(valueConverter, false, this._styleMapInput);
    }
    return null;
  }
  _buildMapBasedInstruction(valueConverter, isClassBased, stylingInput) {
    let totalBindingSlotsRequired = MIN_STYLING_BINDING_SLOTS_REQUIRED;
    const mapValue = stylingInput.value.visit(valueConverter);
    let reference2;
    if (mapValue instanceof Interpolation) {
      totalBindingSlotsRequired += mapValue.expressions.length;
      reference2 = isClassBased ? getClassMapInterpolationExpression(mapValue) : getStyleMapInterpolationExpression(mapValue);
    } else {
      reference2 = isClassBased ? Identifiers.classMap : Identifiers.styleMap;
    }
    return {
      reference: reference2,
      calls: [{
        supportsInterpolation: true,
        sourceSpan: stylingInput.sourceSpan,
        allocateBindingSlots: totalBindingSlotsRequired,
        params: (convertFn) => {
          const convertResult = convertFn(mapValue);
          const params = Array.isArray(convertResult) ? convertResult : [convertResult];
          return params;
        }
      }]
    };
  }
  _buildSingleInputs(reference2, inputs, valueConverter, getInterpolationExpressionFn, isClassBased) {
    const instructions = [];
    inputs.forEach((input) => {
      const previousInstruction = instructions[instructions.length - 1];
      const value = input.value.visit(valueConverter);
      let referenceForCall = reference2;
      let totalBindingSlotsRequired = MIN_STYLING_BINDING_SLOTS_REQUIRED;
      if (value instanceof Interpolation) {
        totalBindingSlotsRequired += value.expressions.length;
        if (getInterpolationExpressionFn) {
          referenceForCall = getInterpolationExpressionFn(value);
        }
      }
      const call2 = {
        sourceSpan: input.sourceSpan,
        allocateBindingSlots: totalBindingSlotsRequired,
        supportsInterpolation: !!getInterpolationExpressionFn,
        params: (convertFn) => {
          const params = [];
          params.push(literal(input.name));
          const convertResult = convertFn(value);
          if (Array.isArray(convertResult)) {
            params.push(...convertResult);
          } else {
            params.push(convertResult);
          }
          if (!isClassBased && input.suffix !== null) {
            params.push(literal(input.suffix));
          }
          return params;
        }
      };
      if (previousInstruction && previousInstruction.reference === referenceForCall) {
        previousInstruction.calls.push(call2);
      } else {
        instructions.push({ reference: referenceForCall, calls: [call2] });
      }
    });
    return instructions;
  }
  _buildClassInputs(valueConverter) {
    if (this._singleClassInputs) {
      return this._buildSingleInputs(Identifiers.classProp, this._singleClassInputs, valueConverter, null, true);
    }
    return [];
  }
  _buildStyleInputs(valueConverter) {
    if (this._singleStyleInputs) {
      return this._buildSingleInputs(Identifiers.styleProp, this._singleStyleInputs, valueConverter, getStylePropInterpolationExpression, false);
    }
    return [];
  }
  buildUpdateLevelInstructions(valueConverter) {
    const instructions = [];
    if (this.hasBindings) {
      const styleMapInstruction = this.buildStyleMapInstruction(valueConverter);
      if (styleMapInstruction) {
        instructions.push(styleMapInstruction);
      }
      const classMapInstruction = this.buildClassMapInstruction(valueConverter);
      if (classMapInstruction) {
        instructions.push(classMapInstruction);
      }
      instructions.push(...this._buildStyleInputs(valueConverter));
      instructions.push(...this._buildClassInputs(valueConverter));
    }
    return instructions;
  }
};
function registerIntoMap(map, key) {
  if (!map.has(key)) {
    map.set(key, map.size);
  }
}
function parseProperty2(name) {
  let hasOverrideFlag = false;
  const overrideIndex = name.indexOf(IMPORTANT_FLAG);
  if (overrideIndex !== -1) {
    name = overrideIndex > 0 ? name.substring(0, overrideIndex) : "";
    hasOverrideFlag = true;
  }
  let suffix = null;
  let property2 = name;
  const unitIndex = name.lastIndexOf(".");
  if (unitIndex > 0) {
    suffix = name.slice(unitIndex + 1);
    property2 = name.substring(0, unitIndex);
  }
  return { property: property2, suffix, hasOverrideFlag };
}
function getClassMapInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.classMap;
    case 3:
      return Identifiers.classMapInterpolate1;
    case 5:
      return Identifiers.classMapInterpolate2;
    case 7:
      return Identifiers.classMapInterpolate3;
    case 9:
      return Identifiers.classMapInterpolate4;
    case 11:
      return Identifiers.classMapInterpolate5;
    case 13:
      return Identifiers.classMapInterpolate6;
    case 15:
      return Identifiers.classMapInterpolate7;
    case 17:
      return Identifiers.classMapInterpolate8;
    default:
      return Identifiers.classMapInterpolateV;
  }
}
function getStyleMapInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.styleMap;
    case 3:
      return Identifiers.styleMapInterpolate1;
    case 5:
      return Identifiers.styleMapInterpolate2;
    case 7:
      return Identifiers.styleMapInterpolate3;
    case 9:
      return Identifiers.styleMapInterpolate4;
    case 11:
      return Identifiers.styleMapInterpolate5;
    case 13:
      return Identifiers.styleMapInterpolate6;
    case 15:
      return Identifiers.styleMapInterpolate7;
    case 17:
      return Identifiers.styleMapInterpolate8;
    default:
      return Identifiers.styleMapInterpolateV;
  }
}
function getStylePropInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.styleProp;
    case 3:
      return Identifiers.stylePropInterpolate1;
    case 5:
      return Identifiers.stylePropInterpolate2;
    case 7:
      return Identifiers.stylePropInterpolate3;
    case 9:
      return Identifiers.stylePropInterpolate4;
    case 11:
      return Identifiers.stylePropInterpolate5;
    case 13:
      return Identifiers.stylePropInterpolate6;
    case 15:
      return Identifiers.stylePropInterpolate7;
    case 17:
      return Identifiers.stylePropInterpolate8;
    default:
      return Identifiers.stylePropInterpolateV;
  }
}
function isCssCustomProperty2(name) {
  return name.startsWith("--");
}
function isEmptyExpression(ast) {
  if (ast instanceof ASTWithSource) {
    ast = ast.ast;
  }
  return ast instanceof EmptyExpr;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/html_parser.mjs
var HtmlParser = class extends Parser2 {
  constructor() {
    super(getHtmlTagDefinition);
  }
  parse(source, url, options) {
    return super.parse(source, url, options);
  }
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/html_whitespaces.mjs
var PRESERVE_WS_ATTR_NAME = "ngPreserveWhitespaces";
var SKIP_WS_TRIM_TAGS = /* @__PURE__ */ new Set(["pre", "template", "textarea", "script", "style"]);
var WS_CHARS = " \f\n\r	\v\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF";
var NO_WS_REGEXP = new RegExp(`[^${WS_CHARS}]`);
var WS_REPLACE_REGEXP = new RegExp(`[${WS_CHARS}]{2,}`, "g");
function hasPreserveWhitespacesAttr(attrs) {
  return attrs.some((attr) => attr.name === PRESERVE_WS_ATTR_NAME);
}
function replaceNgsp(value) {
  return value.replace(new RegExp(NGSP_UNICODE, "g"), " ");
}
var WhitespaceVisitor = class {
  visitElement(element2, context) {
    if (SKIP_WS_TRIM_TAGS.has(element2.name) || hasPreserveWhitespacesAttr(element2.attrs)) {
      return new Element2(element2.name, visitAll2(this, element2.attrs), element2.children, element2.sourceSpan, element2.startSourceSpan, element2.endSourceSpan, element2.i18n);
    }
    return new Element2(element2.name, element2.attrs, visitAllWithSiblings(this, element2.children), element2.sourceSpan, element2.startSourceSpan, element2.endSourceSpan, element2.i18n);
  }
  visitAttribute(attribute2, context) {
    return attribute2.name !== PRESERVE_WS_ATTR_NAME ? attribute2 : null;
  }
  visitText(text2, context) {
    const isNotBlank = text2.value.match(NO_WS_REGEXP);
    const hasExpansionSibling = context && (context.prev instanceof Expansion || context.next instanceof Expansion);
    if (isNotBlank || hasExpansionSibling) {
      const tokens = text2.tokens.map((token) => token.type === 5 ? createWhitespaceProcessedTextToken(token) : token);
      const value = processWhitespace(text2.value);
      return new Text4(value, text2.sourceSpan, tokens, text2.i18n);
    }
    return null;
  }
  visitComment(comment, context) {
    return comment;
  }
  visitExpansion(expansion, context) {
    return expansion;
  }
  visitExpansionCase(expansionCase, context) {
    return expansionCase;
  }
  visitBlock(block, context) {
    return new Block(block.name, block.parameters, visitAllWithSiblings(this, block.children), block.sourceSpan, block.nameSpan, block.startSourceSpan, block.endSourceSpan);
  }
  visitBlockParameter(parameter, context) {
    return parameter;
  }
};
function createWhitespaceProcessedTextToken({ type, parts, sourceSpan }) {
  return { type, parts: [processWhitespace(parts[0])], sourceSpan };
}
function processWhitespace(text2) {
  return replaceNgsp(text2).replace(WS_REPLACE_REGEXP, " ");
}
function visitAllWithSiblings(visitor, nodes) {
  const result = [];
  nodes.forEach((ast, i) => {
    const context = { prev: nodes[i - 1], next: nodes[i + 1] };
    const astResult = ast.visit(visitor, context);
    if (astResult) {
      result.push(astResult);
    }
  });
  return result;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template_parser/binding_parser.mjs
var PROPERTY_PARTS_SEPARATOR = ".";
var ATTRIBUTE_PREFIX = "attr";
var CLASS_PREFIX = "class";
var STYLE_PREFIX = "style";
var TEMPLATE_ATTR_PREFIX = "*";
var ANIMATE_PROP_PREFIX = "animate-";
var BindingParser = class {
  constructor(_exprParser, _interpolationConfig, _schemaRegistry, errors) {
    this._exprParser = _exprParser;
    this._interpolationConfig = _interpolationConfig;
    this._schemaRegistry = _schemaRegistry;
    this.errors = errors;
  }
  get interpolationConfig() {
    return this._interpolationConfig;
  }
  createBoundHostProperties(properties, sourceSpan) {
    const boundProps = [];
    for (const propName of Object.keys(properties)) {
      const expression = properties[propName];
      if (typeof expression === "string") {
        this.parsePropertyBinding(
          propName,
          expression,
          true,
          sourceSpan,
          sourceSpan.start.offset,
          void 0,
          [],
          boundProps,
          sourceSpan
        );
      } else {
        this._reportError(`Value of the host property binding "${propName}" needs to be a string representing an expression but got "${expression}" (${typeof expression})`, sourceSpan);
      }
    }
    return boundProps;
  }
  createDirectiveHostEventAsts(hostListeners, sourceSpan) {
    const targetEvents = [];
    for (const propName of Object.keys(hostListeners)) {
      const expression = hostListeners[propName];
      if (typeof expression === "string") {
        this.parseEvent(propName, expression, false, sourceSpan, sourceSpan, [], targetEvents, sourceSpan);
      } else {
        this._reportError(`Value of the host listener "${propName}" needs to be a string representing an expression but got "${expression}" (${typeof expression})`, sourceSpan);
      }
    }
    return targetEvents;
  }
  parseInterpolation(value, sourceSpan, interpolatedTokens) {
    const sourceInfo = sourceSpan.start.toString();
    const absoluteOffset = sourceSpan.fullStart.offset;
    try {
      const ast = this._exprParser.parseInterpolation(value, sourceInfo, absoluteOffset, interpolatedTokens, this._interpolationConfig);
      if (ast)
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  parseInterpolationExpression(expression, sourceSpan) {
    const sourceInfo = sourceSpan.start.toString();
    const absoluteOffset = sourceSpan.start.offset;
    try {
      const ast = this._exprParser.parseInterpolationExpression(expression, sourceInfo, absoluteOffset);
      if (ast)
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  parseInlineTemplateBinding(tplKey, tplValue, sourceSpan, absoluteValueOffset, targetMatchableAttrs, targetProps, targetVars, isIvyAst) {
    const absoluteKeyOffset = sourceSpan.start.offset + TEMPLATE_ATTR_PREFIX.length;
    const bindings = this._parseTemplateBindings(tplKey, tplValue, sourceSpan, absoluteKeyOffset, absoluteValueOffset);
    for (const binding of bindings) {
      const bindingSpan = moveParseSourceSpan(sourceSpan, binding.sourceSpan);
      const key = binding.key.source;
      const keySpan = moveParseSourceSpan(sourceSpan, binding.key.span);
      if (binding instanceof VariableBinding) {
        const value = binding.value ? binding.value.source : "$implicit";
        const valueSpan = binding.value ? moveParseSourceSpan(sourceSpan, binding.value.span) : void 0;
        targetVars.push(new ParsedVariable(key, value, bindingSpan, keySpan, valueSpan));
      } else if (binding.value) {
        const srcSpan = isIvyAst ? bindingSpan : sourceSpan;
        const valueSpan = moveParseSourceSpan(sourceSpan, binding.value.ast.sourceSpan);
        this._parsePropertyAst(key, binding.value, srcSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
      } else {
        targetMatchableAttrs.push([key, ""]);
        this.parseLiteralAttr(key, null, keySpan, absoluteValueOffset, void 0, targetMatchableAttrs, targetProps, keySpan);
      }
    }
  }
  _parseTemplateBindings(tplKey, tplValue, sourceSpan, absoluteKeyOffset, absoluteValueOffset) {
    const sourceInfo = sourceSpan.start.toString();
    try {
      const bindingsResult = this._exprParser.parseTemplateBindings(tplKey, tplValue, sourceInfo, absoluteKeyOffset, absoluteValueOffset);
      this._reportExpressionParserErrors(bindingsResult.errors, sourceSpan);
      bindingsResult.warnings.forEach((warning) => {
        this._reportError(warning, sourceSpan, ParseErrorLevel.WARNING);
      });
      return bindingsResult.templateBindings;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return [];
    }
  }
  parseLiteralAttr(name, value, sourceSpan, absoluteOffset, valueSpan, targetMatchableAttrs, targetProps, keySpan) {
    if (isAnimationLabel(name)) {
      name = name.substring(1);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
      }
      if (value) {
        this._reportError(`Assigning animation triggers via @prop="exp" attributes with an expression is invalid. Use property bindings (e.g. [@prop]="exp") or use an attribute without a value (e.g. @prop) instead.`, sourceSpan, ParseErrorLevel.ERROR);
      }
      this._parseAnimation(name, value, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps);
    } else {
      targetProps.push(new ParsedProperty(name, this._exprParser.wrapLiteralPrimitive(value, "", absoluteOffset), ParsedPropertyType.LITERAL_ATTR, sourceSpan, keySpan, valueSpan));
    }
  }
  parsePropertyBinding(name, expression, isHost, sourceSpan, absoluteOffset, valueSpan, targetMatchableAttrs, targetProps, keySpan) {
    if (name.length === 0) {
      this._reportError(`Property name is missing in binding`, sourceSpan);
    }
    let isAnimationProp = false;
    if (name.startsWith(ANIMATE_PROP_PREFIX)) {
      isAnimationProp = true;
      name = name.substring(ANIMATE_PROP_PREFIX.length);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + ANIMATE_PROP_PREFIX.length, keySpan.end.offset));
      }
    } else if (isAnimationLabel(name)) {
      isAnimationProp = true;
      name = name.substring(1);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
      }
    }
    if (isAnimationProp) {
      this._parseAnimation(name, expression, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps);
    } else {
      this._parsePropertyAst(name, this.parseBinding(expression, isHost, valueSpan || sourceSpan, absoluteOffset), sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
    }
  }
  parsePropertyInterpolation(name, value, sourceSpan, valueSpan, targetMatchableAttrs, targetProps, keySpan, interpolatedTokens) {
    const expr = this.parseInterpolation(value, valueSpan || sourceSpan, interpolatedTokens);
    if (expr) {
      this._parsePropertyAst(name, expr, sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps);
      return true;
    }
    return false;
  }
  _parsePropertyAst(name, ast, sourceSpan, keySpan, valueSpan, targetMatchableAttrs, targetProps) {
    targetMatchableAttrs.push([name, ast.source]);
    targetProps.push(new ParsedProperty(name, ast, ParsedPropertyType.DEFAULT, sourceSpan, keySpan, valueSpan));
  }
  _parseAnimation(name, expression, sourceSpan, absoluteOffset, keySpan, valueSpan, targetMatchableAttrs, targetProps) {
    if (name.length === 0) {
      this._reportError("Animation trigger is missing", sourceSpan);
    }
    const ast = this.parseBinding(expression || "undefined", false, valueSpan || sourceSpan, absoluteOffset);
    targetMatchableAttrs.push([name, ast.source]);
    targetProps.push(new ParsedProperty(name, ast, ParsedPropertyType.ANIMATION, sourceSpan, keySpan, valueSpan));
  }
  parseBinding(value, isHostBinding2, sourceSpan, absoluteOffset) {
    const sourceInfo = (sourceSpan && sourceSpan.start || "(unknown)").toString();
    try {
      const ast = isHostBinding2 ? this._exprParser.parseSimpleBinding(value, sourceInfo, absoluteOffset, this._interpolationConfig) : this._exprParser.parseBinding(value, sourceInfo, absoluteOffset, this._interpolationConfig);
      if (ast)
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  createBoundElementProperty(elementSelector, boundProp, skipValidation = false, mapPropertyName = true) {
    if (boundProp.isAnimation) {
      return new BoundElementProperty(boundProp.name, 4, SecurityContext.NONE, boundProp.expression, null, boundProp.sourceSpan, boundProp.keySpan, boundProp.valueSpan);
    }
    let unit = null;
    let bindingType = void 0;
    let boundPropertyName = null;
    const parts = boundProp.name.split(PROPERTY_PARTS_SEPARATOR);
    let securityContexts = void 0;
    if (parts.length > 1) {
      if (parts[0] == ATTRIBUTE_PREFIX) {
        boundPropertyName = parts.slice(1).join(PROPERTY_PARTS_SEPARATOR);
        if (!skipValidation) {
          this._validatePropertyOrAttributeName(boundPropertyName, boundProp.sourceSpan, true);
        }
        securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, boundPropertyName, true);
        const nsSeparatorIdx = boundPropertyName.indexOf(":");
        if (nsSeparatorIdx > -1) {
          const ns = boundPropertyName.substring(0, nsSeparatorIdx);
          const name = boundPropertyName.substring(nsSeparatorIdx + 1);
          boundPropertyName = mergeNsAndName(ns, name);
        }
        bindingType = 1;
      } else if (parts[0] == CLASS_PREFIX) {
        boundPropertyName = parts[1];
        bindingType = 2;
        securityContexts = [SecurityContext.NONE];
      } else if (parts[0] == STYLE_PREFIX) {
        unit = parts.length > 2 ? parts[2] : null;
        boundPropertyName = parts[1];
        bindingType = 3;
        securityContexts = [SecurityContext.STYLE];
      }
    }
    if (boundPropertyName === null) {
      const mappedPropName = this._schemaRegistry.getMappedPropName(boundProp.name);
      boundPropertyName = mapPropertyName ? mappedPropName : boundProp.name;
      securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, mappedPropName, false);
      bindingType = 0;
      if (!skipValidation) {
        this._validatePropertyOrAttributeName(mappedPropName, boundProp.sourceSpan, false);
      }
    }
    return new BoundElementProperty(boundPropertyName, bindingType, securityContexts[0], boundProp.expression, unit, boundProp.sourceSpan, boundProp.keySpan, boundProp.valueSpan);
  }
  parseEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan) {
    if (name.length === 0) {
      this._reportError(`Event name is missing in binding`, sourceSpan);
    }
    if (isAnimationLabel(name)) {
      name = name.slice(1);
      if (keySpan !== void 0) {
        keySpan = moveParseSourceSpan(keySpan, new AbsoluteSourceSpan(keySpan.start.offset + 1, keySpan.end.offset));
      }
      this._parseAnimationEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetEvents, keySpan);
    } else {
      this._parseRegularEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan);
    }
  }
  calcPossibleSecurityContexts(selector, propName, isAttribute) {
    const prop = this._schemaRegistry.getMappedPropName(propName);
    return calcPossibleSecurityContexts(this._schemaRegistry, selector, prop, isAttribute);
  }
  _parseAnimationEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetEvents, keySpan) {
    const matches = splitAtPeriod(name, [name, ""]);
    const eventName = matches[0];
    const phase = matches[1].toLowerCase();
    const ast = this._parseAction(expression, isAssignmentEvent, handlerSpan);
    targetEvents.push(new ParsedEvent(eventName, phase, 1, ast, sourceSpan, handlerSpan, keySpan));
    if (eventName.length === 0) {
      this._reportError(`Animation event name is missing in binding`, sourceSpan);
    }
    if (phase) {
      if (phase !== "start" && phase !== "done") {
        this._reportError(`The provided animation output phase value "${phase}" for "@${eventName}" is not supported (use start or done)`, sourceSpan);
      }
    } else {
      this._reportError(`The animation trigger output event (@${eventName}) is missing its phase value name (start or done are currently supported)`, sourceSpan);
    }
  }
  _parseRegularEvent(name, expression, isAssignmentEvent, sourceSpan, handlerSpan, targetMatchableAttrs, targetEvents, keySpan) {
    const [target, eventName] = splitAtColon(name, [null, name]);
    const ast = this._parseAction(expression, isAssignmentEvent, handlerSpan);
    targetMatchableAttrs.push([name, ast.source]);
    targetEvents.push(new ParsedEvent(eventName, target, 0, ast, sourceSpan, handlerSpan, keySpan));
  }
  _parseAction(value, isAssignmentEvent, sourceSpan) {
    const sourceInfo = (sourceSpan && sourceSpan.start || "(unknown").toString();
    const absoluteOffset = sourceSpan && sourceSpan.start ? sourceSpan.start.offset : 0;
    try {
      const ast = this._exprParser.parseAction(value, isAssignmentEvent, sourceInfo, absoluteOffset, this._interpolationConfig);
      if (ast) {
        this._reportExpressionParserErrors(ast.errors, sourceSpan);
      }
      if (!ast || ast.ast instanceof EmptyExpr) {
        this._reportError(`Empty expressions are not allowed`, sourceSpan);
        return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
      }
      return ast;
    } catch (e) {
      this._reportError(`${e}`, sourceSpan);
      return this._exprParser.wrapLiteralPrimitive("ERROR", sourceInfo, absoluteOffset);
    }
  }
  _reportError(message, sourceSpan, level = ParseErrorLevel.ERROR) {
    this.errors.push(new ParseError(sourceSpan, message, level));
  }
  _reportExpressionParserErrors(errors, sourceSpan) {
    for (const error2 of errors) {
      this._reportError(error2.message, sourceSpan);
    }
  }
  _validatePropertyOrAttributeName(propName, sourceSpan, isAttr) {
    const report = isAttr ? this._schemaRegistry.validateAttribute(propName) : this._schemaRegistry.validateProperty(propName);
    if (report.error) {
      this._reportError(report.msg, sourceSpan, ParseErrorLevel.ERROR);
    }
  }
};
function isAnimationLabel(name) {
  return name[0] == "@";
}
function calcPossibleSecurityContexts(registry, selector, propName, isAttribute) {
  const ctxs = [];
  CssSelector.parse(selector).forEach((selector2) => {
    const elementNames = selector2.element ? [selector2.element] : registry.allKnownElementNames();
    const notElementNames = new Set(selector2.notSelectors.filter((selector3) => selector3.isElementSelector()).map((selector3) => selector3.element));
    const possibleElementNames = elementNames.filter((elementName) => !notElementNames.has(elementName));
    ctxs.push(...possibleElementNames.map((elementName) => registry.securityContext(elementName, propName, isAttribute)));
  });
  return ctxs.length === 0 ? [SecurityContext.NONE] : Array.from(new Set(ctxs)).sort();
}
function moveParseSourceSpan(sourceSpan, absoluteSpan) {
  const startDiff = absoluteSpan.start - sourceSpan.start.offset;
  const endDiff = absoluteSpan.end - sourceSpan.end.offset;
  return new ParseSourceSpan(sourceSpan.start.moveBy(startDiff), sourceSpan.end.moveBy(endDiff), sourceSpan.fullStart.moveBy(startDiff), sourceSpan.details);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/style_url_resolver.mjs
function isStyleUrlResolvable(url) {
  if (url == null || url.length === 0 || url[0] == "/")
    return false;
  const schemeMatch = url.match(URL_WITH_SCHEMA_REGEXP);
  return schemeMatch === null || schemeMatch[1] == "package" || schemeMatch[1] == "asset";
}
var URL_WITH_SCHEMA_REGEXP = /^([^:/?#]+):/;

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/template_parser/template_preparser.mjs
var NG_CONTENT_SELECT_ATTR = "select";
var LINK_ELEMENT = "link";
var LINK_STYLE_REL_ATTR = "rel";
var LINK_STYLE_HREF_ATTR = "href";
var LINK_STYLE_REL_VALUE = "stylesheet";
var STYLE_ELEMENT = "style";
var SCRIPT_ELEMENT = "script";
var NG_NON_BINDABLE_ATTR = "ngNonBindable";
var NG_PROJECT_AS = "ngProjectAs";
function preparseElement(ast) {
  let selectAttr = null;
  let hrefAttr = null;
  let relAttr = null;
  let nonBindable = false;
  let projectAs = "";
  ast.attrs.forEach((attr) => {
    const lcAttrName = attr.name.toLowerCase();
    if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
      selectAttr = attr.value;
    } else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
      hrefAttr = attr.value;
    } else if (lcAttrName == LINK_STYLE_REL_ATTR) {
      relAttr = attr.value;
    } else if (attr.name == NG_NON_BINDABLE_ATTR) {
      nonBindable = true;
    } else if (attr.name == NG_PROJECT_AS) {
      if (attr.value.length > 0) {
        projectAs = attr.value;
      }
    }
  });
  selectAttr = normalizeNgContentSelect(selectAttr);
  const nodeName = ast.name.toLowerCase();
  let type = PreparsedElementType.OTHER;
  if (isNgContent(nodeName)) {
    type = PreparsedElementType.NG_CONTENT;
  } else if (nodeName == STYLE_ELEMENT) {
    type = PreparsedElementType.STYLE;
  } else if (nodeName == SCRIPT_ELEMENT) {
    type = PreparsedElementType.SCRIPT;
  } else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
    type = PreparsedElementType.STYLESHEET;
  }
  return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
}
var PreparsedElementType;
(function(PreparsedElementType2) {
  PreparsedElementType2[PreparsedElementType2["NG_CONTENT"] = 0] = "NG_CONTENT";
  PreparsedElementType2[PreparsedElementType2["STYLE"] = 1] = "STYLE";
  PreparsedElementType2[PreparsedElementType2["STYLESHEET"] = 2] = "STYLESHEET";
  PreparsedElementType2[PreparsedElementType2["SCRIPT"] = 3] = "SCRIPT";
  PreparsedElementType2[PreparsedElementType2["OTHER"] = 4] = "OTHER";
})(PreparsedElementType || (PreparsedElementType = {}));
var PreparsedElement = class {
  constructor(type, selectAttr, hrefAttr, nonBindable, projectAs) {
    this.type = type;
    this.selectAttr = selectAttr;
    this.hrefAttr = hrefAttr;
    this.nonBindable = nonBindable;
    this.projectAs = projectAs;
  }
};
function normalizeNgContentSelect(selectAttr) {
  if (selectAttr === null || selectAttr.length === 0) {
    return "*";
  }
  return selectAttr;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_control_flow.mjs
var FOR_LOOP_EXPRESSION_PATTERN = /^\s*([0-9A-Za-z_$]*)\s+of\s+([\S\s]*)/;
var FOR_LOOP_TRACK_PATTERN = /^track\s+([\S\s]*)/;
var CONDITIONAL_ALIAS_PATTERN = /^as\s+(.*)/;
var ELSE_IF_PATTERN = /^else[^\S\r\n]+if/;
var FOR_LOOP_LET_PATTERN = /^let\s+([\S\s]*)/;
var ALLOWED_FOR_LOOP_LET_VARIABLES = /* @__PURE__ */ new Set(["$index", "$first", "$last", "$even", "$odd", "$count"]);
function isConnectedForLoopBlock(name) {
  return name === "empty";
}
function isConnectedIfLoopBlock(name) {
  return name === "else" || ELSE_IF_PATTERN.test(name);
}
function createIfBlock(ast, connectedBlocks, visitor, bindingParser) {
  const errors = validateIfConnectedBlocks(connectedBlocks);
  const branches = [];
  const mainBlockParams = parseConditionalBlockParameters(ast, errors, bindingParser);
  if (mainBlockParams !== null) {
    branches.push(new IfBlockBranch(mainBlockParams.expression, visitAll2(visitor, ast.children, ast.children), mainBlockParams.expressionAlias, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.nameSpan, ast.i18n));
  }
  for (const block of connectedBlocks) {
    if (ELSE_IF_PATTERN.test(block.name)) {
      const params = parseConditionalBlockParameters(block, errors, bindingParser);
      if (params !== null) {
        const children = visitAll2(visitor, block.children, block.children);
        branches.push(new IfBlockBranch(params.expression, children, params.expressionAlias, block.sourceSpan, block.startSourceSpan, block.endSourceSpan, block.nameSpan, block.i18n));
      }
    } else if (block.name === "else") {
      const children = visitAll2(visitor, block.children, block.children);
      branches.push(new IfBlockBranch(null, children, null, block.sourceSpan, block.startSourceSpan, block.endSourceSpan, block.nameSpan, block.i18n));
    }
  }
  const ifBlockStartSourceSpan = branches.length > 0 ? branches[0].startSourceSpan : ast.startSourceSpan;
  const ifBlockEndSourceSpan = branches.length > 0 ? branches[branches.length - 1].endSourceSpan : ast.endSourceSpan;
  let wholeSourceSpan = ast.sourceSpan;
  const lastBranch = branches[branches.length - 1];
  if (lastBranch !== void 0) {
    wholeSourceSpan = new ParseSourceSpan(ifBlockStartSourceSpan.start, lastBranch.sourceSpan.end);
  }
  return {
    node: new IfBlock(branches, wholeSourceSpan, ast.startSourceSpan, ifBlockEndSourceSpan, ast.nameSpan),
    errors
  };
}
function createForLoop(ast, connectedBlocks, visitor, bindingParser) {
  var _a2, _b2;
  const errors = [];
  const params = parseForLoopParameters(ast, errors, bindingParser);
  let node = null;
  let empty = null;
  for (const block of connectedBlocks) {
    if (block.name === "empty") {
      if (empty !== null) {
        errors.push(new ParseError(block.sourceSpan, "@for loop can only have one @empty block"));
      } else if (block.parameters.length > 0) {
        errors.push(new ParseError(block.sourceSpan, "@empty block cannot have parameters"));
      } else {
        empty = new ForLoopBlockEmpty(visitAll2(visitor, block.children, block.children), block.sourceSpan, block.startSourceSpan, block.endSourceSpan, block.nameSpan, block.i18n);
      }
    } else {
      errors.push(new ParseError(block.sourceSpan, `Unrecognized @for loop block "${block.name}"`));
    }
  }
  if (params !== null) {
    if (params.trackBy === null) {
      errors.push(new ParseError(ast.sourceSpan, '@for loop must have a "track" expression'));
    } else {
      const endSpan = (_a2 = empty == null ? void 0 : empty.endSourceSpan) != null ? _a2 : ast.endSourceSpan;
      const sourceSpan = new ParseSourceSpan(ast.sourceSpan.start, (_b2 = endSpan == null ? void 0 : endSpan.end) != null ? _b2 : ast.sourceSpan.end);
      node = new ForLoopBlock(params.itemName, params.expression, params.trackBy.expression, params.trackBy.keywordSpan, params.context, visitAll2(visitor, ast.children, ast.children), empty, sourceSpan, ast.sourceSpan, ast.startSourceSpan, endSpan, ast.nameSpan, ast.i18n);
    }
  }
  return { node, errors };
}
function createSwitchBlock(ast, visitor, bindingParser) {
  const errors = validateSwitchBlock(ast);
  const primaryExpression = ast.parameters.length > 0 ? parseBlockParameterToBinding(ast.parameters[0], bindingParser) : bindingParser.parseBinding("", false, ast.sourceSpan, 0);
  const cases = [];
  const unknownBlocks = [];
  let defaultCase = null;
  for (const node of ast.children) {
    if (!(node instanceof Block)) {
      continue;
    }
    if ((node.name !== "case" || node.parameters.length === 0) && node.name !== "default") {
      unknownBlocks.push(new UnknownBlock(node.name, node.sourceSpan, node.nameSpan));
      continue;
    }
    const expression = node.name === "case" ? parseBlockParameterToBinding(node.parameters[0], bindingParser) : null;
    const ast2 = new SwitchBlockCase(expression, visitAll2(visitor, node.children, node.children), node.sourceSpan, node.startSourceSpan, node.endSourceSpan, node.nameSpan, node.i18n);
    if (expression === null) {
      defaultCase = ast2;
    } else {
      cases.push(ast2);
    }
  }
  if (defaultCase !== null) {
    cases.push(defaultCase);
  }
  return {
    node: new SwitchBlock(primaryExpression, cases, unknownBlocks, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.nameSpan),
    errors
  };
}
function parseForLoopParameters(block, errors, bindingParser) {
  var _a2;
  if (block.parameters.length === 0) {
    errors.push(new ParseError(block.sourceSpan, "@for loop does not have an expression"));
    return null;
  }
  const [expressionParam, ...secondaryParams] = block.parameters;
  const match = (_a2 = stripOptionalParentheses(expressionParam, errors)) == null ? void 0 : _a2.match(FOR_LOOP_EXPRESSION_PATTERN);
  if (!match || match[2].trim().length === 0) {
    errors.push(new ParseError(expressionParam.sourceSpan, 'Cannot parse expression. @for loop expression must match the pattern "<identifier> of <expression>"'));
    return null;
  }
  const [, itemName, rawExpression] = match;
  const result = {
    itemName: new Variable(itemName, "$implicit", expressionParam.sourceSpan, expressionParam.sourceSpan),
    trackBy: null,
    expression: parseBlockParameterToBinding(expressionParam, bindingParser, rawExpression),
    context: {}
  };
  for (const param of secondaryParams) {
    const letMatch = param.expression.match(FOR_LOOP_LET_PATTERN);
    if (letMatch !== null) {
      parseLetParameter(param.sourceSpan, letMatch[1], param.sourceSpan, result.context, errors);
      continue;
    }
    const trackMatch = param.expression.match(FOR_LOOP_TRACK_PATTERN);
    if (trackMatch !== null) {
      if (result.trackBy !== null) {
        errors.push(new ParseError(param.sourceSpan, '@for loop can only have one "track" expression'));
      } else {
        const expression = parseBlockParameterToBinding(param, bindingParser, trackMatch[1]);
        const keywordSpan = new ParseSourceSpan(param.sourceSpan.start, param.sourceSpan.start.moveBy("track".length));
        result.trackBy = { expression, keywordSpan };
      }
      continue;
    }
    errors.push(new ParseError(param.sourceSpan, `Unrecognized @for loop paramater "${param.expression}"`));
  }
  for (const variableName of ALLOWED_FOR_LOOP_LET_VARIABLES) {
    if (!result.context.hasOwnProperty(variableName)) {
      const emptySpanAfterForBlockStart = new ParseSourceSpan(block.startSourceSpan.end, block.startSourceSpan.end);
      result.context[variableName] = new Variable(variableName, variableName, emptySpanAfterForBlockStart, emptySpanAfterForBlockStart);
    }
  }
  return result;
}
function parseLetParameter(sourceSpan, expression, span, context, errors) {
  const parts = expression.split(",");
  for (const part of parts) {
    const expressionParts = part.split("=");
    const name = expressionParts.length === 2 ? expressionParts[0].trim() : "";
    const variableName = expressionParts.length === 2 ? expressionParts[1].trim() : "";
    if (name.length === 0 || variableName.length === 0) {
      errors.push(new ParseError(sourceSpan, `Invalid @for loop "let" parameter. Parameter should match the pattern "<name> = <variable name>"`));
    } else if (!ALLOWED_FOR_LOOP_LET_VARIABLES.has(variableName)) {
      errors.push(new ParseError(sourceSpan, `Unknown "let" parameter variable "${variableName}". The allowed variables are: ${Array.from(ALLOWED_FOR_LOOP_LET_VARIABLES).join(", ")}`));
    } else if (context.hasOwnProperty(variableName)) {
      errors.push(new ParseError(sourceSpan, `Duplicate "let" parameter variable "${variableName}"`));
    } else {
      context[variableName] = new Variable(name, variableName, span, span);
    }
  }
}
function validateIfConnectedBlocks(connectedBlocks) {
  const errors = [];
  let hasElse = false;
  for (let i = 0; i < connectedBlocks.length; i++) {
    const block = connectedBlocks[i];
    if (block.name === "else") {
      if (hasElse) {
        errors.push(new ParseError(block.sourceSpan, "Conditional can only have one @else block"));
      } else if (connectedBlocks.length > 1 && i < connectedBlocks.length - 1) {
        errors.push(new ParseError(block.sourceSpan, "@else block must be last inside the conditional"));
      } else if (block.parameters.length > 0) {
        errors.push(new ParseError(block.sourceSpan, "@else block cannot have parameters"));
      }
      hasElse = true;
    } else if (!ELSE_IF_PATTERN.test(block.name)) {
      errors.push(new ParseError(block.sourceSpan, `Unrecognized conditional block @${block.name}`));
    }
  }
  return errors;
}
function validateSwitchBlock(ast) {
  const errors = [];
  let hasDefault = false;
  if (ast.parameters.length !== 1) {
    errors.push(new ParseError(ast.sourceSpan, "@switch block must have exactly one parameter"));
    return errors;
  }
  for (const node of ast.children) {
    if (node instanceof Comment2 || node instanceof Text4 && node.value.trim().length === 0) {
      continue;
    }
    if (!(node instanceof Block) || node.name !== "case" && node.name !== "default") {
      errors.push(new ParseError(node.sourceSpan, "@switch block can only contain @case and @default blocks"));
      continue;
    }
    if (node.name === "default") {
      if (hasDefault) {
        errors.push(new ParseError(node.sourceSpan, "@switch block can only have one @default block"));
      } else if (node.parameters.length > 0) {
        errors.push(new ParseError(node.sourceSpan, "@default block cannot have parameters"));
      }
      hasDefault = true;
    } else if (node.name === "case" && node.parameters.length !== 1) {
      errors.push(new ParseError(node.sourceSpan, "@case block must have exactly one parameter"));
    }
  }
  return errors;
}
function parseBlockParameterToBinding(ast, bindingParser, part) {
  let start;
  let end;
  if (typeof part === "string") {
    start = Math.max(0, ast.expression.lastIndexOf(part));
    end = start + part.length;
  } else {
    start = 0;
    end = ast.expression.length;
  }
  return bindingParser.parseBinding(ast.expression.slice(start, end), false, ast.sourceSpan, ast.sourceSpan.start.offset + start);
}
function parseConditionalBlockParameters(block, errors, bindingParser) {
  if (block.parameters.length === 0) {
    errors.push(new ParseError(block.sourceSpan, "Conditional block does not have an expression"));
    return null;
  }
  const expression = parseBlockParameterToBinding(block.parameters[0], bindingParser);
  let expressionAlias = null;
  for (let i = 1; i < block.parameters.length; i++) {
    const param = block.parameters[i];
    const aliasMatch = param.expression.match(CONDITIONAL_ALIAS_PATTERN);
    if (aliasMatch === null) {
      errors.push(new ParseError(param.sourceSpan, `Unrecognized conditional paramater "${param.expression}"`));
    } else if (block.name !== "if") {
      errors.push(new ParseError(param.sourceSpan, '"as" expression is only allowed on the primary @if block'));
    } else if (expressionAlias !== null) {
      errors.push(new ParseError(param.sourceSpan, 'Conditional can only have one "as" expression'));
    } else {
      const name = aliasMatch[1].trim();
      expressionAlias = new Variable(name, name, param.sourceSpan, param.sourceSpan);
    }
  }
  return { expression, expressionAlias };
}
function stripOptionalParentheses(param, errors) {
  const expression = param.expression;
  const spaceRegex = /^\s$/;
  let openParens = 0;
  let start = 0;
  let end = expression.length - 1;
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === "(") {
      start = i + 1;
      openParens++;
    } else if (spaceRegex.test(char)) {
      continue;
    } else {
      break;
    }
  }
  if (openParens === 0) {
    return expression;
  }
  for (let i = expression.length - 1; i > -1; i--) {
    const char = expression[i];
    if (char === ")") {
      end = i;
      openParens--;
      if (openParens === 0) {
        break;
      }
    } else if (spaceRegex.test(char)) {
      continue;
    } else {
      break;
    }
  }
  if (openParens !== 0) {
    errors.push(new ParseError(param.sourceSpan, "Unclosed parentheses in expression"));
    return null;
  }
  return expression.slice(start, end);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_deferred_triggers.mjs
var TIME_PATTERN = /^\d+\.?\d*(ms|s)?$/;
var SEPARATOR_PATTERN = /^\s$/;
var COMMA_DELIMITED_SYNTAX = /* @__PURE__ */ new Map([
  [$LBRACE, $RBRACE],
  [$LBRACKET, $RBRACKET],
  [$LPAREN, $RPAREN]
]);
var OnTriggerType;
(function(OnTriggerType2) {
  OnTriggerType2["IDLE"] = "idle";
  OnTriggerType2["TIMER"] = "timer";
  OnTriggerType2["INTERACTION"] = "interaction";
  OnTriggerType2["IMMEDIATE"] = "immediate";
  OnTriggerType2["HOVER"] = "hover";
  OnTriggerType2["VIEWPORT"] = "viewport";
})(OnTriggerType || (OnTriggerType = {}));
function parseWhenTrigger({ expression, sourceSpan }, bindingParser, triggers, errors) {
  const whenIndex = expression.indexOf("when");
  const whenSourceSpan = new ParseSourceSpan(sourceSpan.start.moveBy(whenIndex), sourceSpan.start.moveBy(whenIndex + "when".length));
  const prefetchSpan = getPrefetchSpan(expression, sourceSpan);
  if (whenIndex === -1) {
    errors.push(new ParseError(sourceSpan, `Could not find "when" keyword in expression`));
  } else {
    const start = getTriggerParametersStart(expression, whenIndex + 1);
    const parsed = bindingParser.parseBinding(expression.slice(start), false, sourceSpan, sourceSpan.start.offset + start);
    trackTrigger("when", triggers, errors, new BoundDeferredTrigger(parsed, sourceSpan, prefetchSpan, whenSourceSpan));
  }
}
function parseOnTrigger({ expression, sourceSpan }, triggers, errors, placeholder) {
  const onIndex = expression.indexOf("on");
  const onSourceSpan = new ParseSourceSpan(sourceSpan.start.moveBy(onIndex), sourceSpan.start.moveBy(onIndex + "on".length));
  const prefetchSpan = getPrefetchSpan(expression, sourceSpan);
  if (onIndex === -1) {
    errors.push(new ParseError(sourceSpan, `Could not find "on" keyword in expression`));
  } else {
    const start = getTriggerParametersStart(expression, onIndex + 1);
    const parser = new OnTriggerParser(expression, start, sourceSpan, triggers, errors, placeholder, prefetchSpan, onSourceSpan);
    parser.parse();
  }
}
function getPrefetchSpan(expression, sourceSpan) {
  if (!expression.startsWith("prefetch")) {
    return null;
  }
  return new ParseSourceSpan(sourceSpan.start, sourceSpan.start.moveBy("prefetch".length));
}
var OnTriggerParser = class {
  constructor(expression, start, span, triggers, errors, placeholder, prefetchSpan, onSourceSpan) {
    this.expression = expression;
    this.start = start;
    this.span = span;
    this.triggers = triggers;
    this.errors = errors;
    this.placeholder = placeholder;
    this.prefetchSpan = prefetchSpan;
    this.onSourceSpan = onSourceSpan;
    this.index = 0;
    this.tokens = new Lexer().tokenize(expression.slice(start));
  }
  parse() {
    while (this.tokens.length > 0 && this.index < this.tokens.length) {
      const token = this.token();
      if (!token.isIdentifier()) {
        this.unexpectedToken(token);
        break;
      }
      if (this.isFollowedByOrLast($COMMA)) {
        this.consumeTrigger(token, []);
        this.advance();
      } else if (this.isFollowedByOrLast($LPAREN)) {
        this.advance();
        const prevErrors = this.errors.length;
        const parameters = this.consumeParameters();
        if (this.errors.length !== prevErrors) {
          break;
        }
        this.consumeTrigger(token, parameters);
        this.advance();
      } else if (this.index < this.tokens.length - 1) {
        this.unexpectedToken(this.tokens[this.index + 1]);
      }
      this.advance();
    }
  }
  advance() {
    this.index++;
  }
  isFollowedByOrLast(char) {
    if (this.index === this.tokens.length - 1) {
      return true;
    }
    return this.tokens[this.index + 1].isCharacter(char);
  }
  token() {
    return this.tokens[Math.min(this.index, this.tokens.length - 1)];
  }
  consumeTrigger(identifier, parameters) {
    const triggerNameStartSpan = this.span.start.moveBy(this.start + identifier.index - this.tokens[0].index);
    const nameSpan = new ParseSourceSpan(triggerNameStartSpan, triggerNameStartSpan.moveBy(identifier.strValue.length));
    const endSpan = triggerNameStartSpan.moveBy(this.token().end - identifier.index);
    const isFirstTrigger = identifier.index === 0;
    const onSourceSpan = isFirstTrigger ? this.onSourceSpan : null;
    const prefetchSourceSpan = isFirstTrigger ? this.prefetchSpan : null;
    const sourceSpan = new ParseSourceSpan(isFirstTrigger ? this.span.start : triggerNameStartSpan, endSpan);
    try {
      switch (identifier.toString()) {
        case OnTriggerType.IDLE:
          this.trackTrigger("idle", createIdleTrigger(parameters, nameSpan, sourceSpan, prefetchSourceSpan, onSourceSpan));
          break;
        case OnTriggerType.TIMER:
          this.trackTrigger("timer", createTimerTrigger(parameters, nameSpan, sourceSpan, this.prefetchSpan, this.onSourceSpan));
          break;
        case OnTriggerType.INTERACTION:
          this.trackTrigger("interaction", createInteractionTrigger(parameters, nameSpan, sourceSpan, this.prefetchSpan, this.onSourceSpan, this.placeholder));
          break;
        case OnTriggerType.IMMEDIATE:
          this.trackTrigger("immediate", createImmediateTrigger(parameters, nameSpan, sourceSpan, this.prefetchSpan, this.onSourceSpan));
          break;
        case OnTriggerType.HOVER:
          this.trackTrigger("hover", createHoverTrigger(parameters, nameSpan, sourceSpan, this.prefetchSpan, this.onSourceSpan, this.placeholder));
          break;
        case OnTriggerType.VIEWPORT:
          this.trackTrigger("viewport", createViewportTrigger(parameters, nameSpan, sourceSpan, this.prefetchSpan, this.onSourceSpan, this.placeholder));
          break;
        default:
          throw new Error(`Unrecognized trigger type "${identifier}"`);
      }
    } catch (e) {
      this.error(identifier, e.message);
    }
  }
  consumeParameters() {
    const parameters = [];
    if (!this.token().isCharacter($LPAREN)) {
      this.unexpectedToken(this.token());
      return parameters;
    }
    this.advance();
    const commaDelimStack = [];
    let current = "";
    while (this.index < this.tokens.length) {
      const token = this.token();
      if (token.isCharacter($RPAREN) && commaDelimStack.length === 0) {
        if (current.length) {
          parameters.push(current);
        }
        break;
      }
      if (token.type === TokenType.Character && COMMA_DELIMITED_SYNTAX.has(token.numValue)) {
        commaDelimStack.push(COMMA_DELIMITED_SYNTAX.get(token.numValue));
      }
      if (commaDelimStack.length > 0 && token.isCharacter(commaDelimStack[commaDelimStack.length - 1])) {
        commaDelimStack.pop();
      }
      if (commaDelimStack.length === 0 && token.isCharacter($COMMA) && current.length > 0) {
        parameters.push(current);
        current = "";
        this.advance();
        continue;
      }
      current += this.tokenText();
      this.advance();
    }
    if (!this.token().isCharacter($RPAREN) || commaDelimStack.length > 0) {
      this.error(this.token(), "Unexpected end of expression");
    }
    if (this.index < this.tokens.length - 1 && !this.tokens[this.index + 1].isCharacter($COMMA)) {
      this.unexpectedToken(this.tokens[this.index + 1]);
    }
    return parameters;
  }
  tokenText() {
    return this.expression.slice(this.start + this.token().index, this.start + this.token().end);
  }
  trackTrigger(name, trigger) {
    trackTrigger(name, this.triggers, this.errors, trigger);
  }
  error(token, message) {
    const newStart = this.span.start.moveBy(this.start + token.index);
    const newEnd = newStart.moveBy(token.end - token.index);
    this.errors.push(new ParseError(new ParseSourceSpan(newStart, newEnd), message));
  }
  unexpectedToken(token) {
    this.error(token, `Unexpected token "${token}"`);
  }
};
function trackTrigger(name, allTriggers, errors, trigger) {
  if (allTriggers[name]) {
    errors.push(new ParseError(trigger.sourceSpan, `Duplicate "${name}" trigger is not allowed`));
  } else {
    allTriggers[name] = trigger;
  }
}
function createIdleTrigger(parameters, nameSpan, sourceSpan, prefetchSpan, onSourceSpan) {
  if (parameters.length > 0) {
    throw new Error(`"${OnTriggerType.IDLE}" trigger cannot have parameters`);
  }
  return new IdleDeferredTrigger(nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
}
function createTimerTrigger(parameters, nameSpan, sourceSpan, prefetchSpan, onSourceSpan) {
  if (parameters.length !== 1) {
    throw new Error(`"${OnTriggerType.TIMER}" trigger must have exactly one parameter`);
  }
  const delay = parseDeferredTime(parameters[0]);
  if (delay === null) {
    throw new Error(`Could not parse time value of trigger "${OnTriggerType.TIMER}"`);
  }
  return new TimerDeferredTrigger(delay, nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
}
function createImmediateTrigger(parameters, nameSpan, sourceSpan, prefetchSpan, onSourceSpan) {
  if (parameters.length > 0) {
    throw new Error(`"${OnTriggerType.IMMEDIATE}" trigger cannot have parameters`);
  }
  return new ImmediateDeferredTrigger(nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
}
function createHoverTrigger(parameters, nameSpan, sourceSpan, prefetchSpan, onSourceSpan, placeholder) {
  var _a2;
  validateReferenceBasedTrigger(OnTriggerType.HOVER, parameters, placeholder);
  return new HoverDeferredTrigger((_a2 = parameters[0]) != null ? _a2 : null, nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
}
function createInteractionTrigger(parameters, nameSpan, sourceSpan, prefetchSpan, onSourceSpan, placeholder) {
  var _a2;
  validateReferenceBasedTrigger(OnTriggerType.INTERACTION, parameters, placeholder);
  return new InteractionDeferredTrigger((_a2 = parameters[0]) != null ? _a2 : null, nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
}
function createViewportTrigger(parameters, nameSpan, sourceSpan, prefetchSpan, onSourceSpan, placeholder) {
  var _a2;
  validateReferenceBasedTrigger(OnTriggerType.VIEWPORT, parameters, placeholder);
  return new ViewportDeferredTrigger((_a2 = parameters[0]) != null ? _a2 : null, nameSpan, sourceSpan, prefetchSpan, onSourceSpan);
}
function validateReferenceBasedTrigger(type, parameters, placeholder) {
  if (parameters.length > 1) {
    throw new Error(`"${type}" trigger can only have zero or one parameters`);
  }
  if (parameters.length === 0) {
    if (placeholder === null) {
      throw new Error(`"${type}" trigger with no parameters can only be placed on an @defer that has a @placeholder block`);
    }
    if (placeholder.children.length !== 1 || !(placeholder.children[0] instanceof Element)) {
      throw new Error(`"${type}" trigger with no parameters can only be placed on an @defer that has a @placeholder block with exactly one root element node`);
    }
  }
}
function getTriggerParametersStart(value, startPosition = 0) {
  let hasFoundSeparator = false;
  for (let i = startPosition; i < value.length; i++) {
    if (SEPARATOR_PATTERN.test(value[i])) {
      hasFoundSeparator = true;
    } else if (hasFoundSeparator) {
      return i;
    }
  }
  return -1;
}
function parseDeferredTime(value) {
  const match = value.match(TIME_PATTERN);
  if (!match) {
    return null;
  }
  const [time, units] = match;
  return parseFloat(time) * (units === "s" ? 1e3 : 1);
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_deferred_blocks.mjs
var PREFETCH_WHEN_PATTERN = /^prefetch\s+when\s/;
var PREFETCH_ON_PATTERN = /^prefetch\s+on\s/;
var MINIMUM_PARAMETER_PATTERN = /^minimum\s/;
var AFTER_PARAMETER_PATTERN = /^after\s/;
var WHEN_PARAMETER_PATTERN = /^when\s/;
var ON_PARAMETER_PATTERN = /^on\s/;
function isConnectedDeferLoopBlock(name) {
  return name === "placeholder" || name === "loading" || name === "error";
}
function createDeferredBlock(ast, connectedBlocks, visitor, bindingParser) {
  const errors = [];
  const { placeholder, loading, error: error2 } = parseConnectedBlocks(connectedBlocks, errors, visitor);
  const { triggers, prefetchTriggers } = parsePrimaryTriggers(ast.parameters, bindingParser, errors, placeholder);
  let lastEndSourceSpan = ast.endSourceSpan;
  let endOfLastSourceSpan = ast.sourceSpan.end;
  if (connectedBlocks.length > 0) {
    const lastConnectedBlock = connectedBlocks[connectedBlocks.length - 1];
    lastEndSourceSpan = lastConnectedBlock.endSourceSpan;
    endOfLastSourceSpan = lastConnectedBlock.sourceSpan.end;
  }
  const sourceSpanWithConnectedBlocks = new ParseSourceSpan(ast.sourceSpan.start, endOfLastSourceSpan);
  const node = new DeferredBlock(visitAll2(visitor, ast.children, ast.children), triggers, prefetchTriggers, placeholder, loading, error2, ast.nameSpan, sourceSpanWithConnectedBlocks, ast.sourceSpan, ast.startSourceSpan, lastEndSourceSpan, ast.i18n);
  return { node, errors };
}
function parseConnectedBlocks(connectedBlocks, errors, visitor) {
  let placeholder = null;
  let loading = null;
  let error2 = null;
  for (const block of connectedBlocks) {
    try {
      if (!isConnectedDeferLoopBlock(block.name)) {
        errors.push(new ParseError(block.startSourceSpan, `Unrecognized block "@${block.name}"`));
        break;
      }
      switch (block.name) {
        case "placeholder":
          if (placeholder !== null) {
            errors.push(new ParseError(block.startSourceSpan, `@defer block can only have one @placeholder block`));
          } else {
            placeholder = parsePlaceholderBlock(block, visitor);
          }
          break;
        case "loading":
          if (loading !== null) {
            errors.push(new ParseError(block.startSourceSpan, `@defer block can only have one @loading block`));
          } else {
            loading = parseLoadingBlock(block, visitor);
          }
          break;
        case "error":
          if (error2 !== null) {
            errors.push(new ParseError(block.startSourceSpan, `@defer block can only have one @error block`));
          } else {
            error2 = parseErrorBlock(block, visitor);
          }
          break;
      }
    } catch (e) {
      errors.push(new ParseError(block.startSourceSpan, e.message));
    }
  }
  return { placeholder, loading, error: error2 };
}
function parsePlaceholderBlock(ast, visitor) {
  let minimumTime = null;
  for (const param of ast.parameters) {
    if (MINIMUM_PARAMETER_PATTERN.test(param.expression)) {
      if (minimumTime != null) {
        throw new Error(`@placeholder block can only have one "minimum" parameter`);
      }
      const parsedTime = parseDeferredTime(param.expression.slice(getTriggerParametersStart(param.expression)));
      if (parsedTime === null) {
        throw new Error(`Could not parse time value of parameter "minimum"`);
      }
      minimumTime = parsedTime;
    } else {
      throw new Error(`Unrecognized parameter in @placeholder block: "${param.expression}"`);
    }
  }
  return new DeferredBlockPlaceholder(visitAll2(visitor, ast.children, ast.children), minimumTime, ast.nameSpan, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.i18n);
}
function parseLoadingBlock(ast, visitor) {
  let afterTime = null;
  let minimumTime = null;
  for (const param of ast.parameters) {
    if (AFTER_PARAMETER_PATTERN.test(param.expression)) {
      if (afterTime != null) {
        throw new Error(`@loading block can only have one "after" parameter`);
      }
      const parsedTime = parseDeferredTime(param.expression.slice(getTriggerParametersStart(param.expression)));
      if (parsedTime === null) {
        throw new Error(`Could not parse time value of parameter "after"`);
      }
      afterTime = parsedTime;
    } else if (MINIMUM_PARAMETER_PATTERN.test(param.expression)) {
      if (minimumTime != null) {
        throw new Error(`@loading block can only have one "minimum" parameter`);
      }
      const parsedTime = parseDeferredTime(param.expression.slice(getTriggerParametersStart(param.expression)));
      if (parsedTime === null) {
        throw new Error(`Could not parse time value of parameter "minimum"`);
      }
      minimumTime = parsedTime;
    } else {
      throw new Error(`Unrecognized parameter in @loading block: "${param.expression}"`);
    }
  }
  return new DeferredBlockLoading(visitAll2(visitor, ast.children, ast.children), afterTime, minimumTime, ast.nameSpan, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.i18n);
}
function parseErrorBlock(ast, visitor) {
  if (ast.parameters.length > 0) {
    throw new Error(`@error block cannot have parameters`);
  }
  return new DeferredBlockError(visitAll2(visitor, ast.children, ast.children), ast.nameSpan, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.i18n);
}
function parsePrimaryTriggers(params, bindingParser, errors, placeholder) {
  const triggers = {};
  const prefetchTriggers = {};
  for (const param of params) {
    if (WHEN_PARAMETER_PATTERN.test(param.expression)) {
      parseWhenTrigger(param, bindingParser, triggers, errors);
    } else if (ON_PARAMETER_PATTERN.test(param.expression)) {
      parseOnTrigger(param, triggers, errors, placeholder);
    } else if (PREFETCH_WHEN_PATTERN.test(param.expression)) {
      parseWhenTrigger(param, bindingParser, prefetchTriggers, errors);
    } else if (PREFETCH_ON_PATTERN.test(param.expression)) {
      parseOnTrigger(param, prefetchTriggers, errors, placeholder);
    } else {
      errors.push(new ParseError(param.sourceSpan, "Unrecognized trigger"));
    }
  }
  return { triggers, prefetchTriggers };
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/r3_template_transform.mjs
var BIND_NAME_REGEXP = /^(?:(bind-)|(let-)|(ref-|#)|(on-)|(bindon-)|(@))(.*)$/;
var KW_BIND_IDX = 1;
var KW_LET_IDX = 2;
var KW_REF_IDX = 3;
var KW_ON_IDX = 4;
var KW_BINDON_IDX = 5;
var KW_AT_IDX = 6;
var IDENT_KW_IDX = 7;
var BINDING_DELIMS = {
  BANANA_BOX: { start: "[(", end: ")]" },
  PROPERTY: { start: "[", end: "]" },
  EVENT: { start: "(", end: ")" }
};
var TEMPLATE_ATTR_PREFIX2 = "*";
function htmlAstToRender3Ast(htmlNodes, bindingParser, options) {
  const transformer = new HtmlAstToIvyAst(bindingParser, options);
  const ivyNodes = visitAll2(transformer, htmlNodes, htmlNodes);
  const allErrors = bindingParser.errors.concat(transformer.errors);
  const result = {
    nodes: ivyNodes,
    errors: allErrors,
    styleUrls: transformer.styleUrls,
    styles: transformer.styles,
    ngContentSelectors: transformer.ngContentSelectors
  };
  if (options.collectCommentNodes) {
    result.commentNodes = transformer.commentNodes;
  }
  return result;
}
var HtmlAstToIvyAst = class {
  constructor(bindingParser, options) {
    this.bindingParser = bindingParser;
    this.options = options;
    this.errors = [];
    this.styles = [];
    this.styleUrls = [];
    this.ngContentSelectors = [];
    this.commentNodes = [];
    this.inI18nBlock = false;
    this.processedNodes = /* @__PURE__ */ new Set();
  }
  visitElement(element2) {
    const isI18nRootElement = isI18nRootNode(element2.i18n);
    if (isI18nRootElement) {
      if (this.inI18nBlock) {
        this.reportError("Cannot mark an element as translatable inside of a translatable section. Please remove the nested i18n marker.", element2.sourceSpan);
      }
      this.inI18nBlock = true;
    }
    const preparsedElement = preparseElement(element2);
    if (preparsedElement.type === PreparsedElementType.SCRIPT) {
      return null;
    } else if (preparsedElement.type === PreparsedElementType.STYLE) {
      const contents = textContents(element2);
      if (contents !== null) {
        this.styles.push(contents);
      }
      return null;
    } else if (preparsedElement.type === PreparsedElementType.STYLESHEET && isStyleUrlResolvable(preparsedElement.hrefAttr)) {
      this.styleUrls.push(preparsedElement.hrefAttr);
      return null;
    }
    const isTemplateElement = isNgTemplate(element2.name);
    const parsedProperties = [];
    const boundEvents = [];
    const variables = [];
    const references = [];
    const attributes = [];
    const i18nAttrsMeta = {};
    const templateParsedProperties = [];
    const templateVariables = [];
    let elementHasInlineTemplate = false;
    for (const attribute2 of element2.attrs) {
      let hasBinding = false;
      const normalizedName = normalizeAttributeName(attribute2.name);
      let isTemplateBinding = false;
      if (attribute2.i18n) {
        i18nAttrsMeta[attribute2.name] = attribute2.i18n;
      }
      if (normalizedName.startsWith(TEMPLATE_ATTR_PREFIX2)) {
        if (elementHasInlineTemplate) {
          this.reportError(`Can't have multiple template bindings on one element. Use only one attribute prefixed with *`, attribute2.sourceSpan);
        }
        isTemplateBinding = true;
        elementHasInlineTemplate = true;
        const templateValue = attribute2.value;
        const templateKey = normalizedName.substring(TEMPLATE_ATTR_PREFIX2.length);
        const parsedVariables = [];
        const absoluteValueOffset = attribute2.valueSpan ? attribute2.valueSpan.start.offset : attribute2.sourceSpan.start.offset + attribute2.name.length;
        this.bindingParser.parseInlineTemplateBinding(templateKey, templateValue, attribute2.sourceSpan, absoluteValueOffset, [], templateParsedProperties, parsedVariables, true);
        templateVariables.push(...parsedVariables.map((v) => new Variable(v.name, v.value, v.sourceSpan, v.keySpan, v.valueSpan)));
      } else {
        hasBinding = this.parseAttribute(isTemplateElement, attribute2, [], parsedProperties, boundEvents, variables, references);
      }
      if (!hasBinding && !isTemplateBinding) {
        attributes.push(this.visitAttribute(attribute2));
      }
    }
    let children;
    if (preparsedElement.nonBindable) {
      children = visitAll2(NON_BINDABLE_VISITOR, element2.children).flat(Infinity);
    } else {
      children = visitAll2(this, element2.children, element2.children);
    }
    let parsedElement;
    if (preparsedElement.type === PreparsedElementType.NG_CONTENT) {
      if (element2.children && !element2.children.every((node) => isEmptyTextNode(node) || isCommentNode(node))) {
        this.reportError(`<ng-content> element cannot have content.`, element2.sourceSpan);
      }
      const selector = preparsedElement.selectAttr;
      const attrs = element2.attrs.map((attr) => this.visitAttribute(attr));
      parsedElement = new Content(selector, attrs, element2.sourceSpan, element2.i18n);
      this.ngContentSelectors.push(selector);
    } else if (isTemplateElement) {
      const attrs = this.extractAttributes(element2.name, parsedProperties, i18nAttrsMeta);
      parsedElement = new Template(element2.name, attributes, attrs.bound, boundEvents, [], children, references, variables, element2.sourceSpan, element2.startSourceSpan, element2.endSourceSpan, element2.i18n);
    } else {
      const attrs = this.extractAttributes(element2.name, parsedProperties, i18nAttrsMeta);
      parsedElement = new Element(element2.name, attributes, attrs.bound, boundEvents, children, references, element2.sourceSpan, element2.startSourceSpan, element2.endSourceSpan, element2.i18n);
    }
    if (elementHasInlineTemplate) {
      const attrs = this.extractAttributes("ng-template", templateParsedProperties, i18nAttrsMeta);
      const templateAttrs = [];
      attrs.literal.forEach((attr) => templateAttrs.push(attr));
      attrs.bound.forEach((attr) => templateAttrs.push(attr));
      const hoistedAttrs = parsedElement instanceof Element ? {
        attributes: parsedElement.attributes,
        inputs: parsedElement.inputs,
        outputs: parsedElement.outputs
      } : { attributes: [], inputs: [], outputs: [] };
      const i18n2 = isTemplateElement && isI18nRootElement ? void 0 : element2.i18n;
      const name = parsedElement instanceof Template ? null : parsedElement.name;
      parsedElement = new Template(name, hoistedAttrs.attributes, hoistedAttrs.inputs, hoistedAttrs.outputs, templateAttrs, [parsedElement], [], templateVariables, element2.sourceSpan, element2.startSourceSpan, element2.endSourceSpan, i18n2);
    }
    if (isI18nRootElement) {
      this.inI18nBlock = false;
    }
    return parsedElement;
  }
  visitAttribute(attribute2) {
    return new TextAttribute(attribute2.name, attribute2.value, attribute2.sourceSpan, attribute2.keySpan, attribute2.valueSpan, attribute2.i18n);
  }
  visitText(text2) {
    return this.processedNodes.has(text2) ? null : this._visitTextWithInterpolation(text2.value, text2.sourceSpan, text2.tokens, text2.i18n);
  }
  visitExpansion(expansion) {
    if (!expansion.i18n) {
      return null;
    }
    if (!isI18nRootNode(expansion.i18n)) {
      throw new Error(`Invalid type "${expansion.i18n.constructor}" for "i18n" property of ${expansion.sourceSpan.toString()}. Expected a "Message"`);
    }
    const message = expansion.i18n;
    const vars = {};
    const placeholders = {};
    Object.keys(message.placeholders).forEach((key) => {
      const value = message.placeholders[key];
      if (key.startsWith(I18N_ICU_VAR_PREFIX)) {
        const formattedKey = key.trim();
        const ast = this.bindingParser.parseInterpolationExpression(value.text, value.sourceSpan);
        vars[formattedKey] = new BoundText(ast, value.sourceSpan);
      } else {
        placeholders[key] = this._visitTextWithInterpolation(value.text, value.sourceSpan, null);
      }
    });
    return new Icu(vars, placeholders, expansion.sourceSpan, message);
  }
  visitExpansionCase(expansionCase) {
    return null;
  }
  visitComment(comment) {
    if (this.options.collectCommentNodes) {
      this.commentNodes.push(new Comment(comment.value || "", comment.sourceSpan));
    }
    return null;
  }
  visitBlockParameter() {
    return null;
  }
  visitBlock(block, context) {
    const index = Array.isArray(context) ? context.indexOf(block) : -1;
    if (index === -1) {
      throw new Error("Visitor invoked incorrectly. Expecting visitBlock to be invoked siblings array as its context");
    }
    if (this.processedNodes.has(block)) {
      return null;
    }
    let result = null;
    switch (block.name) {
      case "defer":
        result = createDeferredBlock(block, this.findConnectedBlocks(index, context, isConnectedDeferLoopBlock), this, this.bindingParser);
        break;
      case "switch":
        result = createSwitchBlock(block, this, this.bindingParser);
        break;
      case "for":
        result = createForLoop(block, this.findConnectedBlocks(index, context, isConnectedForLoopBlock), this, this.bindingParser);
        break;
      case "if":
        result = createIfBlock(block, this.findConnectedBlocks(index, context, isConnectedIfLoopBlock), this, this.bindingParser);
        break;
      default:
        let errorMessage;
        if (isConnectedDeferLoopBlock(block.name)) {
          errorMessage = `@${block.name} block can only be used after an @defer block.`;
          this.processedNodes.add(block);
        } else if (isConnectedForLoopBlock(block.name)) {
          errorMessage = `@${block.name} block can only be used after an @for block.`;
          this.processedNodes.add(block);
        } else if (isConnectedIfLoopBlock(block.name)) {
          errorMessage = `@${block.name} block can only be used after an @if or @else if block.`;
          this.processedNodes.add(block);
        } else {
          errorMessage = `Unrecognized block @${block.name}.`;
        }
        result = {
          node: new UnknownBlock(block.name, block.sourceSpan, block.nameSpan),
          errors: [new ParseError(block.sourceSpan, errorMessage)]
        };
        break;
    }
    this.errors.push(...result.errors);
    return result.node;
  }
  findConnectedBlocks(primaryBlockIndex, siblings, predicate) {
    const relatedBlocks = [];
    for (let i = primaryBlockIndex + 1; i < siblings.length; i++) {
      const node = siblings[i];
      if (node instanceof Text4 && node.value.trim().length === 0) {
        this.processedNodes.add(node);
        continue;
      }
      if (!(node instanceof Block) || !predicate(node.name)) {
        break;
      }
      relatedBlocks.push(node);
      this.processedNodes.add(node);
    }
    return relatedBlocks;
  }
  extractAttributes(elementName, properties, i18nPropsMeta) {
    const bound = [];
    const literal2 = [];
    properties.forEach((prop) => {
      const i18n2 = i18nPropsMeta[prop.name];
      if (prop.isLiteral) {
        literal2.push(new TextAttribute(prop.name, prop.expression.source || "", prop.sourceSpan, prop.keySpan, prop.valueSpan, i18n2));
      } else {
        const bep = this.bindingParser.createBoundElementProperty(elementName, prop, true, false);
        bound.push(BoundAttribute.fromBoundElementProperty(bep, i18n2));
      }
    });
    return { bound, literal: literal2 };
  }
  parseAttribute(isTemplateElement, attribute2, matchableAttributes, parsedProperties, boundEvents, variables, references) {
    var _a2;
    const name = normalizeAttributeName(attribute2.name);
    const value = attribute2.value;
    const srcSpan = attribute2.sourceSpan;
    const absoluteOffset = attribute2.valueSpan ? attribute2.valueSpan.start.offset : srcSpan.start.offset;
    function createKeySpan(srcSpan2, prefix, identifier) {
      const normalizationAdjustment = attribute2.name.length - name.length;
      const keySpanStart = srcSpan2.start.moveBy(prefix.length + normalizationAdjustment);
      const keySpanEnd = keySpanStart.moveBy(identifier.length);
      return new ParseSourceSpan(keySpanStart, keySpanEnd, keySpanStart, identifier);
    }
    const bindParts = name.match(BIND_NAME_REGEXP);
    if (bindParts) {
      if (bindParts[KW_BIND_IDX] != null) {
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_BIND_IDX], identifier);
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute2.valueSpan, matchableAttributes, parsedProperties, keySpan2);
      } else if (bindParts[KW_LET_IDX]) {
        if (isTemplateElement) {
          const identifier = bindParts[IDENT_KW_IDX];
          const keySpan2 = createKeySpan(srcSpan, bindParts[KW_LET_IDX], identifier);
          this.parseVariable(identifier, value, srcSpan, keySpan2, attribute2.valueSpan, variables);
        } else {
          this.reportError(`"let-" is only supported on ng-template elements.`, srcSpan);
        }
      } else if (bindParts[KW_REF_IDX]) {
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_REF_IDX], identifier);
        this.parseReference(identifier, value, srcSpan, keySpan2, attribute2.valueSpan, references);
      } else if (bindParts[KW_ON_IDX]) {
        const events = [];
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_ON_IDX], identifier);
        this.bindingParser.parseEvent(identifier, value, false, srcSpan, attribute2.valueSpan || srcSpan, matchableAttributes, events, keySpan2);
        addEvents(events, boundEvents);
      } else if (bindParts[KW_BINDON_IDX]) {
        const identifier = bindParts[IDENT_KW_IDX];
        const keySpan2 = createKeySpan(srcSpan, bindParts[KW_BINDON_IDX], identifier);
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute2.valueSpan, matchableAttributes, parsedProperties, keySpan2);
        this.parseAssignmentEvent(identifier, value, srcSpan, attribute2.valueSpan, matchableAttributes, boundEvents, keySpan2);
      } else if (bindParts[KW_AT_IDX]) {
        const keySpan2 = createKeySpan(srcSpan, "", name);
        this.bindingParser.parseLiteralAttr(name, value, srcSpan, absoluteOffset, attribute2.valueSpan, matchableAttributes, parsedProperties, keySpan2);
      }
      return true;
    }
    let delims = null;
    if (name.startsWith(BINDING_DELIMS.BANANA_BOX.start)) {
      delims = BINDING_DELIMS.BANANA_BOX;
    } else if (name.startsWith(BINDING_DELIMS.PROPERTY.start)) {
      delims = BINDING_DELIMS.PROPERTY;
    } else if (name.startsWith(BINDING_DELIMS.EVENT.start)) {
      delims = BINDING_DELIMS.EVENT;
    }
    if (delims !== null && name.endsWith(delims.end) && name.length > delims.start.length + delims.end.length) {
      const identifier = name.substring(delims.start.length, name.length - delims.end.length);
      const keySpan2 = createKeySpan(srcSpan, delims.start, identifier);
      if (delims.start === BINDING_DELIMS.BANANA_BOX.start) {
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute2.valueSpan, matchableAttributes, parsedProperties, keySpan2);
        this.parseAssignmentEvent(identifier, value, srcSpan, attribute2.valueSpan, matchableAttributes, boundEvents, keySpan2);
      } else if (delims.start === BINDING_DELIMS.PROPERTY.start) {
        this.bindingParser.parsePropertyBinding(identifier, value, false, srcSpan, absoluteOffset, attribute2.valueSpan, matchableAttributes, parsedProperties, keySpan2);
      } else {
        const events = [];
        this.bindingParser.parseEvent(identifier, value, false, srcSpan, attribute2.valueSpan || srcSpan, matchableAttributes, events, keySpan2);
        addEvents(events, boundEvents);
      }
      return true;
    }
    const keySpan = createKeySpan(srcSpan, "", name);
    const hasBinding = this.bindingParser.parsePropertyInterpolation(name, value, srcSpan, attribute2.valueSpan, matchableAttributes, parsedProperties, keySpan, (_a2 = attribute2.valueTokens) != null ? _a2 : null);
    return hasBinding;
  }
  _visitTextWithInterpolation(value, sourceSpan, interpolatedTokens, i18n2) {
    const valueNoNgsp = replaceNgsp(value);
    const expr = this.bindingParser.parseInterpolation(valueNoNgsp, sourceSpan, interpolatedTokens);
    return expr ? new BoundText(expr, sourceSpan, i18n2) : new Text(valueNoNgsp, sourceSpan);
  }
  parseVariable(identifier, value, sourceSpan, keySpan, valueSpan, variables) {
    if (identifier.indexOf("-") > -1) {
      this.reportError(`"-" is not allowed in variable names`, sourceSpan);
    } else if (identifier.length === 0) {
      this.reportError(`Variable does not have a name`, sourceSpan);
    }
    variables.push(new Variable(identifier, value, sourceSpan, keySpan, valueSpan));
  }
  parseReference(identifier, value, sourceSpan, keySpan, valueSpan, references) {
    if (identifier.indexOf("-") > -1) {
      this.reportError(`"-" is not allowed in reference names`, sourceSpan);
    } else if (identifier.length === 0) {
      this.reportError(`Reference does not have a name`, sourceSpan);
    } else if (references.some((reference2) => reference2.name === identifier)) {
      this.reportError(`Reference "#${identifier}" is defined more than once`, sourceSpan);
    }
    references.push(new Reference(identifier, value, sourceSpan, keySpan, valueSpan));
  }
  parseAssignmentEvent(name, expression, sourceSpan, valueSpan, targetMatchableAttrs, boundEvents, keySpan) {
    const events = [];
    this.bindingParser.parseEvent(`${name}Change`, `${expression} =$event`, true, sourceSpan, valueSpan || sourceSpan, targetMatchableAttrs, events, keySpan);
    addEvents(events, boundEvents);
  }
  reportError(message, sourceSpan, level = ParseErrorLevel.ERROR) {
    this.errors.push(new ParseError(sourceSpan, message, level));
  }
};
var NonBindableVisitor = class {
  visitElement(ast) {
    const preparsedElement = preparseElement(ast);
    if (preparsedElement.type === PreparsedElementType.SCRIPT || preparsedElement.type === PreparsedElementType.STYLE || preparsedElement.type === PreparsedElementType.STYLESHEET) {
      return null;
    }
    const children = visitAll2(this, ast.children, null);
    return new Element(
      ast.name,
      visitAll2(this, ast.attrs),
      [],
      [],
      children,
      [],
      ast.sourceSpan,
      ast.startSourceSpan,
      ast.endSourceSpan
    );
  }
  visitComment(comment) {
    return null;
  }
  visitAttribute(attribute2) {
    return new TextAttribute(attribute2.name, attribute2.value, attribute2.sourceSpan, attribute2.keySpan, attribute2.valueSpan, attribute2.i18n);
  }
  visitText(text2) {
    return new Text(text2.value, text2.sourceSpan);
  }
  visitExpansion(expansion) {
    return null;
  }
  visitExpansionCase(expansionCase) {
    return null;
  }
  visitBlock(block, context) {
    const nodes = [
      new Text(block.startSourceSpan.toString(), block.startSourceSpan),
      ...visitAll2(this, block.children)
    ];
    if (block.endSourceSpan !== null) {
      nodes.push(new Text(block.endSourceSpan.toString(), block.endSourceSpan));
    }
    return nodes;
  }
  visitBlockParameter(parameter, context) {
    return null;
  }
};
var NON_BINDABLE_VISITOR = new NonBindableVisitor();
function normalizeAttributeName(attrName) {
  return /^data-/i.test(attrName) ? attrName.substring(5) : attrName;
}
function addEvents(events, boundEvents) {
  boundEvents.push(...events.map((e) => BoundEvent.fromParsedEvent(e)));
}
function isEmptyTextNode(node) {
  return node instanceof Text4 && node.value.trim().length == 0;
}
function isCommentNode(node) {
  return node instanceof Comment2;
}
function textContents(node) {
  if (node.children.length !== 1 || !(node.children[0] instanceof Text4)) {
    return null;
  } else {
    return node.children[0].value;
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/i18n/context.mjs
var TagType;
(function(TagType2) {
  TagType2[TagType2["ELEMENT"] = 0] = "ELEMENT";
  TagType2[TagType2["TEMPLATE"] = 1] = "TEMPLATE";
})(TagType || (TagType = {}));
function setupRegistry() {
  return { getUniqueId: getSeqNumberGenerator(), icus: /* @__PURE__ */ new Map() };
}
var I18nContext = class {
  constructor(index, ref, level = 0, templateIndex = null, meta, registry) {
    this.index = index;
    this.ref = ref;
    this.level = level;
    this.templateIndex = templateIndex;
    this.meta = meta;
    this.registry = registry;
    this.bindings = /* @__PURE__ */ new Set();
    this.placeholders = /* @__PURE__ */ new Map();
    this.isEmitted = false;
    this._unresolvedCtxCount = 0;
    this._registry = registry || setupRegistry();
    this.id = this._registry.getUniqueId();
  }
  appendTag(type, node, index, closed) {
    if (node.isVoid && closed) {
      return;
    }
    const ph = node.isVoid || !closed ? node.startName : node.closeName;
    const content = { type, index, ctx: this.id, isVoid: node.isVoid, closed };
    updatePlaceholderMap(this.placeholders, ph, content);
  }
  appendBlockPart(node, index, closed) {
    const ph = closed ? node.closeName : node.startName;
    const content = { type: TagType.TEMPLATE, index, ctx: this.id, closed };
    updatePlaceholderMap(this.placeholders, ph, content);
  }
  get icus() {
    return this._registry.icus;
  }
  get isRoot() {
    return this.level === 0;
  }
  get isResolved() {
    return this._unresolvedCtxCount === 0;
  }
  getSerializedPlaceholders() {
    const result = /* @__PURE__ */ new Map();
    this.placeholders.forEach((values, key) => result.set(key, values.map(serializePlaceholderValue)));
    return result;
  }
  appendBinding(binding) {
    this.bindings.add(binding);
  }
  appendIcu(name, ref) {
    updatePlaceholderMap(this._registry.icus, name, ref);
  }
  appendBoundText(node) {
    const phs = assembleBoundTextPlaceholders(node, this.bindings.size, this.id);
    phs.forEach((values, key) => updatePlaceholderMap(this.placeholders, key, ...values));
  }
  appendTemplate(node, index) {
    this.appendTag(TagType.TEMPLATE, node, index, false);
    this.appendTag(TagType.TEMPLATE, node, index, true);
    this._unresolvedCtxCount++;
  }
  appendBlock(node, index) {
    this.appendBlockPart(node, index, false);
    this.appendBlockPart(node, index, true);
    this._unresolvedCtxCount++;
  }
  appendElement(node, index, closed) {
    this.appendTag(TagType.ELEMENT, node, index, closed);
  }
  appendProjection(node, index) {
    this.appendTag(TagType.ELEMENT, node, index, false);
    this.appendTag(TagType.ELEMENT, node, index, true);
  }
  forkChildContext(index, templateIndex, meta) {
    return new I18nContext(index, this.ref, this.level + 1, templateIndex, meta, this._registry);
  }
  reconcileChildContext(context) {
    ["start", "close"].forEach((op) => {
      const key = context.meta[`${op}Name`];
      const phs = this.placeholders.get(key) || [];
      const tag = phs.find(findTemplateFn(this.id, context.templateIndex));
      if (tag) {
        tag.ctx = context.id;
      }
    });
    const childPhs = context.placeholders;
    childPhs.forEach((values, key) => {
      const phs = this.placeholders.get(key);
      if (!phs) {
        this.placeholders.set(key, values);
        return;
      }
      const tmplIdx = phs.findIndex(findTemplateFn(context.id, context.templateIndex));
      if (tmplIdx >= 0) {
        const isCloseTag = key.startsWith("CLOSE");
        const isTemplateTag = key.endsWith("NG-TEMPLATE");
        if (isTemplateTag) {
          phs.splice(tmplIdx + (isCloseTag ? 0 : 1), 0, ...values);
        } else {
          const idx = isCloseTag ? values.length - 1 : 0;
          values[idx].tmpl = phs[tmplIdx];
          phs.splice(tmplIdx, 1, ...values);
        }
      } else {
        phs.push(...values);
      }
      this.placeholders.set(key, phs);
    });
    this._unresolvedCtxCount--;
  }
};
function wrap(symbol, index, contextId, closed) {
  const state = closed ? "/" : "";
  return wrapI18nPlaceholder(`${state}${symbol}${index}`, contextId);
}
function wrapTag(symbol, { index, ctx, isVoid }, closed) {
  return isVoid ? wrap(symbol, index, ctx) + wrap(symbol, index, ctx, true) : wrap(symbol, index, ctx, closed);
}
function findTemplateFn(ctx, templateIndex) {
  return (token) => typeof token === "object" && token.type === TagType.TEMPLATE && token.index === templateIndex && token.ctx === ctx;
}
function serializePlaceholderValue(value) {
  const element2 = (data, closed) => wrapTag("#", data, closed);
  const template2 = (data, closed) => wrapTag("*", data, closed);
  switch (value.type) {
    case TagType.ELEMENT:
      if (value.closed) {
        return element2(value, true) + (value.tmpl ? template2(value.tmpl, true) : "");
      }
      if (value.tmpl) {
        return template2(value.tmpl) + element2(value) + (value.isVoid ? template2(value.tmpl, true) : "");
      }
      return element2(value);
    case TagType.TEMPLATE:
      return template2(value, value.closed);
    default:
      return value;
  }
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/template.mjs
var NG_CONTENT_SELECT_ATTR2 = "select";
var NG_PROJECT_AS_ATTR_NAME = "ngProjectAs";
var EVENT_BINDING_SCOPE_GLOBALS = /* @__PURE__ */ new Set(["$event"]);
var NG_TEMPLATE_TAG_NAME = "ng-template";
var GLOBAL_TARGET_RESOLVERS = /* @__PURE__ */ new Map([["window", Identifiers.resolveWindow], ["document", Identifiers.resolveDocument], ["body", Identifiers.resolveBody]]);
var LEADING_TRIVIA_CHARS = [" ", "\n", "\r", "	"];
function renderFlagCheckIfStmt(flags, statements) {
  return ifStmt(variable(RENDER_FLAGS).bitwiseAnd(literal(flags), null, false), statements);
}
function prepareEventListenerParameters(eventAst, handlerName = null, scope = null) {
  const { type, name, target, phase, handler } = eventAst;
  if (target && !GLOBAL_TARGET_RESOLVERS.has(target)) {
    throw new Error(`Unexpected global target '${target}' defined for '${name}' event.
        Supported list of global targets: ${Array.from(GLOBAL_TARGET_RESOLVERS.keys())}.`);
  }
  const eventArgumentName = "$event";
  const implicitReceiverAccesses = /* @__PURE__ */ new Set();
  const implicitReceiverExpr = scope === null || scope.bindingLevel === 0 ? variable(CONTEXT_NAME) : scope.getOrCreateSharedContextVar(0);
  const bindingStatements = convertActionBinding(scope, implicitReceiverExpr, handler, "b", eventAst.handlerSpan, implicitReceiverAccesses, EVENT_BINDING_SCOPE_GLOBALS);
  const statements = [];
  const variableDeclarations = scope == null ? void 0 : scope.variableDeclarations();
  const restoreViewStatement = scope == null ? void 0 : scope.restoreViewStatement();
  if (variableDeclarations) {
    statements.push(...variableDeclarations);
  }
  statements.push(...bindingStatements);
  if (restoreViewStatement) {
    statements.unshift(restoreViewStatement);
    const lastStatement = statements[statements.length - 1];
    if (lastStatement instanceof ReturnStatement) {
      statements[statements.length - 1] = new ReturnStatement(invokeInstruction(lastStatement.value.sourceSpan, Identifiers.resetView, [lastStatement.value]));
    } else {
      statements.push(new ExpressionStatement(invokeInstruction(null, Identifiers.resetView, [])));
    }
  }
  const eventName = type === 1 ? prepareSyntheticListenerName(name, phase) : name;
  const fnName = handlerName && sanitizeIdentifier(handlerName);
  const fnArgs = [];
  if (implicitReceiverAccesses.has(eventArgumentName)) {
    fnArgs.push(new FnParam(eventArgumentName, DYNAMIC_TYPE));
  }
  const handlerFn = fn(fnArgs, statements, INFERRED_TYPE, null, fnName);
  const params = [literal(eventName), handlerFn];
  if (target) {
    params.push(
      literal(false),
      importExpr(GLOBAL_TARGET_RESOLVERS.get(target))
    );
  }
  return params;
}
function createComponentDefConsts() {
  return {
    prepareStatements: [],
    constExpressions: [],
    i18nVarRefsCache: /* @__PURE__ */ new Map()
  };
}
var TemplateData = class {
  constructor(name, index, scope, visitor) {
    this.name = name;
    this.index = index;
    this.scope = scope;
    this.visitor = visitor;
  }
  getConstCount() {
    return this.visitor.getConstCount();
  }
  getVarCount() {
    return this.visitor.getVarCount();
  }
};
var TemplateDefinitionBuilder = class {
  constructor(constantPool, parentBindingScope, level = 0, contextName, i18nContext, templateIndex, templateName, _namespace, relativeContextFilePath, i18nUseExternalIds, deferBlocks, elementLocations, _constants = createComponentDefConsts()) {
    this.constantPool = constantPool;
    this.level = level;
    this.contextName = contextName;
    this.i18nContext = i18nContext;
    this.templateIndex = templateIndex;
    this.templateName = templateName;
    this._namespace = _namespace;
    this.i18nUseExternalIds = i18nUseExternalIds;
    this.deferBlocks = deferBlocks;
    this.elementLocations = elementLocations;
    this._constants = _constants;
    this._dataIndex = 0;
    this._bindingContext = 0;
    this._prefixCode = [];
    this._creationCodeFns = [];
    this._updateCodeFns = [];
    this._currentIndex = 0;
    this._tempVariables = [];
    this._controlFlowTempVariable = null;
    this._nestedTemplateFns = [];
    this.i18n = null;
    this._pureFunctionSlots = 0;
    this._bindingSlots = 0;
    this._ngContentReservedSlots = [];
    this._ngContentSelectorsOffset = 0;
    this._implicitReceiverExpr = null;
    this.visitReference = invalid;
    this.visitVariable = invalid;
    this.visitTextAttribute = invalid;
    this.visitBoundAttribute = invalid;
    this.visitBoundEvent = invalid;
    this.visitDeferredTrigger = invalid;
    this.visitDeferredBlockError = invalid;
    this.visitDeferredBlockLoading = invalid;
    this.visitDeferredBlockPlaceholder = invalid;
    this.visitIfBlockBranch = invalid;
    this.visitSwitchBlockCase = invalid;
    this.visitForLoopBlockEmpty = invalid;
    this.visitUnknownBlock = invalid;
    this._bindingScope = parentBindingScope.nestedScope(level);
    this.fileBasedI18nSuffix = relativeContextFilePath.replace(/[^A-Za-z0-9]/g, "_") + "_";
    this._valueConverter = new ValueConverter(constantPool, () => this.allocateDataSlot(), (numSlots) => this.allocatePureFunctionSlots(numSlots), (name, localName, slot, value) => {
      this._bindingScope.set(this.level, localName, value);
      this.creationInstruction(null, Identifiers.pipe, [literal(slot), literal(name)]);
    });
  }
  buildTemplateFunction(nodes, variables, ngContentSelectorsOffset = 0, i18n2, variableAliases) {
    this._ngContentSelectorsOffset = ngContentSelectorsOffset;
    if (this._namespace !== Identifiers.namespaceHTML) {
      this.creationInstruction(null, this._namespace);
    }
    variables.forEach((v) => {
      const alias = variableAliases == null ? void 0 : variableAliases[v.name];
      this.registerContextVariables(v.name, v.value);
      if (alias) {
        this.registerContextVariables(alias, v.value);
      }
    });
    const initI18nContext = this.i18nContext || isI18nRootNode(i18n2) && !isSingleI18nIcu(i18n2) && !(isSingleElementTemplate(nodes) && nodes[0].i18n === i18n2);
    const selfClosingI18nInstruction = hasTextChildrenOnly(nodes);
    if (initI18nContext) {
      this.i18nStart(null, i18n2, selfClosingI18nInstruction);
    }
    visitAll(this, nodes);
    this._pureFunctionSlots += this._bindingSlots;
    this._valueConverter.updatePipeSlotOffsets(this._bindingSlots);
    this._nestedTemplateFns.forEach((buildTemplateFn) => buildTemplateFn());
    if (this.level === 0 && this._ngContentReservedSlots.length) {
      const parameters = [];
      if (this._ngContentReservedSlots.length > 1 || this._ngContentReservedSlots[0] !== "*") {
        const r3ReservedSlots = this._ngContentReservedSlots.map((s) => s !== "*" ? parseSelectorToR3Selector(s) : s);
        parameters.push(this.constantPool.getConstLiteral(asLiteral(r3ReservedSlots), true));
      }
      this.creationInstruction(null, Identifiers.projectionDef, parameters, true);
    }
    if (initI18nContext) {
      this.i18nEnd(null, selfClosingI18nInstruction);
    }
    const creationStatements = getInstructionStatements(this._creationCodeFns);
    const updateStatements = getInstructionStatements(this._updateCodeFns);
    const creationVariables = this._bindingScope.viewSnapshotStatements();
    const updateVariables = this._bindingScope.variableDeclarations().concat(this._tempVariables);
    const creationBlock = creationStatements.length > 0 ? [renderFlagCheckIfStmt(1, creationVariables.concat(creationStatements))] : [];
    const updateBlock = updateStatements.length > 0 ? [renderFlagCheckIfStmt(2, updateVariables.concat(updateStatements))] : [];
    return fn(
      [new FnParam(RENDER_FLAGS, NUMBER_TYPE), new FnParam(CONTEXT_NAME, null)],
      [
        ...this._prefixCode,
        ...creationBlock,
        ...updateBlock
      ],
      INFERRED_TYPE,
      null,
      this.templateName
    );
  }
  getLocal(name) {
    return this._bindingScope.get(name);
  }
  notifyImplicitReceiverUse() {
    this._bindingScope.notifyImplicitReceiverUse();
  }
  maybeRestoreView() {
    this._bindingScope.maybeRestoreView();
  }
  i18nTranslate(message, params = {}, ref, transformFn) {
    const _ref = ref || this.i18nGenerateMainBlockVar();
    const closureVar = this.i18nGenerateClosureVar(message.id);
    const statements = getTranslationDeclStmts2(message, _ref, closureVar, params, transformFn);
    this._constants.prepareStatements.push(...statements);
    return _ref;
  }
  registerContextVariables(name, value) {
    const scopedName = this._bindingScope.freshReferenceName();
    const retrievalLevel = this.level;
    const isDirect = value === DIRECT_CONTEXT_REFERENCE;
    const lhs = variable(name + scopedName);
    this._bindingScope.set(retrievalLevel, name, (scope) => {
      return isDirect && scope.bindingLevel === retrievalLevel && !scope.isListenerScope() ? variable(CONTEXT_NAME) : lhs;
    }, 1, (scope, relativeLevel) => {
      let rhs;
      if (scope.bindingLevel === retrievalLevel) {
        if (scope.isListenerScope() && scope.hasRestoreViewVariable()) {
          rhs = variable(RESTORED_VIEW_CONTEXT_NAME);
          scope.notifyRestoredViewContextUse();
        } else if (isDirect) {
          return [];
        } else {
          rhs = variable(CONTEXT_NAME);
        }
      } else {
        const sharedCtxVar = scope.getSharedContextName(retrievalLevel);
        rhs = sharedCtxVar ? sharedCtxVar : generateNextContextExpr(relativeLevel);
      }
      return [
        lhs.set(isDirect ? rhs : rhs.prop(value || IMPLICIT_REFERENCE)).toConstDecl()
      ];
    });
  }
  i18nAppendBindings(expressions) {
    if (expressions.length > 0) {
      expressions.forEach((expression) => this.i18n.appendBinding(expression));
    }
  }
  i18nBindProps(props) {
    const bound = {};
    Object.keys(props).forEach((key) => {
      const prop = props[key];
      if (prop instanceof Text) {
        bound[key] = literal(prop.value);
      } else {
        const value = prop.value.visit(this._valueConverter);
        this.allocateBindingSlots(value);
        if (value instanceof Interpolation) {
          const { strings, expressions } = value;
          const { id, bindings } = this.i18n;
          const label = assembleI18nBoundString(strings, bindings.size, id);
          this.i18nAppendBindings(expressions);
          bound[key] = literal(label);
        }
      }
    });
    return bound;
  }
  i18nGenerateMainBlockVar() {
    return variable(this.constantPool.uniqueName(TRANSLATION_VAR_PREFIX));
  }
  i18nGenerateClosureVar(messageId) {
    let name;
    const suffix = this.fileBasedI18nSuffix.toUpperCase();
    if (this.i18nUseExternalIds) {
      const prefix = getTranslationConstPrefix(`EXTERNAL_`);
      const uniqueSuffix = this.constantPool.uniqueName(suffix);
      name = `${prefix}${sanitizeIdentifier(messageId)}$$${uniqueSuffix}`;
    } else {
      const prefix = getTranslationConstPrefix(suffix);
      name = this.constantPool.uniqueName(prefix);
    }
    return variable(name);
  }
  i18nUpdateRef(context) {
    const { icus, meta, isRoot, isResolved, isEmitted } = context;
    if (isRoot && isResolved && !isEmitted && !isSingleI18nIcu(meta)) {
      context.isEmitted = true;
      const placeholders = context.getSerializedPlaceholders();
      let icuMapping = {};
      let params = placeholders.size ? placeholdersToParams(placeholders) : {};
      if (icus.size) {
        icus.forEach((refs, key) => {
          if (refs.length === 1) {
            params[key] = refs[0];
          } else {
            const placeholder = wrapI18nPlaceholder(`${I18N_ICU_MAPPING_PREFIX}${key}`);
            params[key] = literal(placeholder);
            icuMapping[key] = literalArr(refs);
          }
        });
      }
      const needsPostprocessing = Array.from(placeholders.values()).some((value) => value.length > 1) || Object.keys(icuMapping).length;
      let transformFn;
      if (needsPostprocessing) {
        transformFn = (raw) => {
          const args = [raw];
          if (Object.keys(icuMapping).length) {
            args.push(mapLiteral(icuMapping, true));
          }
          return invokeInstruction(null, Identifiers.i18nPostprocess, args);
        };
      }
      this.i18nTranslate(meta, params, context.ref, transformFn);
    }
  }
  i18nStart(span = null, meta, selfClosing) {
    const index = this.allocateDataSlot();
    this.i18n = this.i18nContext ? this.i18nContext.forkChildContext(index, this.templateIndex, meta) : new I18nContext(index, this.i18nGenerateMainBlockVar(), 0, this.templateIndex, meta);
    const { id, ref } = this.i18n;
    const params = [literal(index), this.addToConsts(ref)];
    if (id > 0) {
      params.push(literal(id));
    }
    this.creationInstruction(span, selfClosing ? Identifiers.i18n : Identifiers.i18nStart, params);
  }
  i18nEnd(span = null, selfClosing) {
    if (!this.i18n) {
      throw new Error("i18nEnd is executed with no i18n context present");
    }
    if (this.i18nContext) {
      this.i18nContext.reconcileChildContext(this.i18n);
      this.i18nUpdateRef(this.i18nContext);
    } else {
      this.i18nUpdateRef(this.i18n);
    }
    const { index, bindings } = this.i18n;
    if (bindings.size) {
      for (const binding of bindings) {
        this.updateInstructionWithAdvance(this.getConstCount() - 1, span, Identifiers.i18nExp, () => this.convertPropertyBinding(binding));
      }
      this.updateInstruction(span, Identifiers.i18nApply, [literal(index)]);
    }
    if (!selfClosing) {
      this.creationInstruction(span, Identifiers.i18nEnd);
    }
    this.i18n = null;
  }
  i18nAttributesInstruction(nodeIndex, attrs, sourceSpan) {
    let hasBindings = false;
    const i18nAttrArgs = [];
    attrs.forEach((attr) => {
      const message = attr.i18n;
      const converted = attr.value.visit(this._valueConverter);
      this.allocateBindingSlots(converted);
      if (converted instanceof Interpolation) {
        const placeholders = assembleBoundTextPlaceholders(message);
        const params = placeholdersToParams(placeholders);
        i18nAttrArgs.push(literal(attr.name), this.i18nTranslate(message, params));
        converted.expressions.forEach((expression) => {
          hasBindings = true;
          this.updateInstructionWithAdvance(nodeIndex, sourceSpan, Identifiers.i18nExp, () => this.convertPropertyBinding(expression));
        });
      }
    });
    if (i18nAttrArgs.length > 0) {
      const index = literal(this.allocateDataSlot());
      const constIndex = this.addToConsts(literalArr(i18nAttrArgs));
      this.creationInstruction(sourceSpan, Identifiers.i18nAttributes, [index, constIndex]);
      if (hasBindings) {
        this.updateInstruction(sourceSpan, Identifiers.i18nApply, [index]);
      }
    }
  }
  getNamespaceInstruction(namespaceKey) {
    switch (namespaceKey) {
      case "math":
        return Identifiers.namespaceMathML;
      case "svg":
        return Identifiers.namespaceSVG;
      default:
        return Identifiers.namespaceHTML;
    }
  }
  addNamespaceInstruction(nsInstruction, element2) {
    this._namespace = nsInstruction;
    this.creationInstruction(element2.startSourceSpan, nsInstruction);
  }
  interpolatedUpdateInstruction(instruction, elementIndex, attrName, input, value, params) {
    this.updateInstructionWithAdvance(elementIndex, input.sourceSpan, instruction, () => [literal(attrName), ...this.getUpdateInstructionArguments(value), ...params]);
  }
  visitContent(ngContent) {
    const slot = this.allocateDataSlot();
    const projectionSlotIdx = this._ngContentSelectorsOffset + this._ngContentReservedSlots.length;
    const parameters = [literal(slot)];
    this._ngContentReservedSlots.push(ngContent.selector);
    const nonContentSelectAttributes = ngContent.attributes.filter((attr) => attr.name.toLowerCase() !== NG_CONTENT_SELECT_ATTR2);
    const attributes = this.getAttributeExpressions(ngContent.name, nonContentSelectAttributes, [], []);
    if (attributes.length > 0) {
      parameters.push(literal(projectionSlotIdx), literalArr(attributes));
    } else if (projectionSlotIdx !== 0) {
      parameters.push(literal(projectionSlotIdx));
    }
    this.creationInstruction(ngContent.sourceSpan, Identifiers.projection, parameters);
    if (this.i18n) {
      this.i18n.appendProjection(ngContent.i18n, slot);
    }
  }
  visitElement(element2) {
    var _a2, _b2;
    const elementIndex = this.allocateDataSlot();
    const stylingBuilder = new StylingBuilder(null);
    this.elementLocations.set(element2, { index: elementIndex, level: this.level });
    let isNonBindableMode = false;
    const isI18nRootElement = isI18nRootNode(element2.i18n) && !isSingleI18nIcu(element2.i18n);
    const outputAttrs = [];
    const [namespaceKey, elementName] = splitNsName(element2.name);
    const isNgContainer2 = isNgContainer(element2.name);
    for (const attr of element2.attributes) {
      const { name, value } = attr;
      if (name === NON_BINDABLE_ATTR) {
        isNonBindableMode = true;
      } else if (name === "style") {
        stylingBuilder.registerStyleAttr(value);
      } else if (name === "class") {
        stylingBuilder.registerClassAttr(value);
      } else {
        outputAttrs.push(attr);
      }
    }
    const parameters = [literal(elementIndex)];
    if (!isNgContainer2) {
      parameters.push(literal(elementName));
    }
    const allOtherInputs = [];
    const boundI18nAttrs = [];
    element2.inputs.forEach((input) => {
      const stylingInputWasSet = stylingBuilder.registerBoundInput(input);
      if (!stylingInputWasSet) {
        if (input.type === 0 && input.i18n) {
          boundI18nAttrs.push(input);
        } else {
          allOtherInputs.push(input);
        }
      }
    });
    const attributes = this.getAttributeExpressions(element2.name, outputAttrs, allOtherInputs, element2.outputs, stylingBuilder, [], boundI18nAttrs);
    parameters.push(this.addAttrsToConsts(attributes));
    const refs = this.prepareRefsArray(element2.references);
    parameters.push(this.addToConsts(refs));
    const wasInNamespace = this._namespace;
    const currentNamespace = this.getNamespaceInstruction(namespaceKey);
    if (currentNamespace !== wasInNamespace) {
      this.addNamespaceInstruction(currentNamespace, element2);
    }
    if (this.i18n) {
      this.i18n.appendElement(element2.i18n, elementIndex);
    }
    const hasChildren = !isI18nRootElement && this.i18n ? !hasTextChildrenOnly(element2.children) : element2.children.length > 0;
    const createSelfClosingInstruction = !stylingBuilder.hasBindingsWithPipes && element2.outputs.length === 0 && boundI18nAttrs.length === 0 && !hasChildren;
    const createSelfClosingI18nInstruction = !createSelfClosingInstruction && hasTextChildrenOnly(element2.children);
    if (createSelfClosingInstruction) {
      this.creationInstruction(element2.sourceSpan, isNgContainer2 ? Identifiers.elementContainer : Identifiers.element, trimTrailingNulls(parameters));
    } else {
      this.creationInstruction(element2.startSourceSpan, isNgContainer2 ? Identifiers.elementContainerStart : Identifiers.elementStart, trimTrailingNulls(parameters));
      if (isNonBindableMode) {
        this.creationInstruction(element2.startSourceSpan, Identifiers.disableBindings);
      }
      if (boundI18nAttrs.length > 0) {
        this.i18nAttributesInstruction(elementIndex, boundI18nAttrs, (_a2 = element2.startSourceSpan) != null ? _a2 : element2.sourceSpan);
      }
      if (element2.outputs.length > 0) {
        for (const outputAst of element2.outputs) {
          this.creationInstruction(outputAst.sourceSpan, Identifiers.listener, this.prepareListenerParameter(element2.name, outputAst, elementIndex));
        }
      }
      if (isI18nRootElement) {
        this.i18nStart(element2.startSourceSpan, element2.i18n, createSelfClosingI18nInstruction);
      }
    }
    const stylingInstructions = stylingBuilder.buildUpdateLevelInstructions(this._valueConverter);
    const limit = stylingInstructions.length - 1;
    for (let i = 0; i <= limit; i++) {
      const instruction = stylingInstructions[i];
      this._bindingSlots += this.processStylingUpdateInstruction(elementIndex, instruction);
    }
    const emptyValueBindInstruction = literal(void 0);
    const propertyBindings = [];
    const attributeBindings = [];
    allOtherInputs.forEach((input) => {
      const inputType = input.type;
      if (inputType === 4) {
        const value = input.value.visit(this._valueConverter);
        const hasValue = value instanceof LiteralPrimitive ? !!value.value : true;
        this.allocateBindingSlots(value);
        propertyBindings.push({
          span: input.sourceSpan,
          paramsOrFn: getBindingFunctionParams(() => hasValue ? this.convertPropertyBinding(value) : emptyValueBindInstruction, prepareSyntheticPropertyName(input.name))
        });
      } else {
        if (input.i18n)
          return;
        const value = input.value.visit(this._valueConverter);
        if (value !== void 0) {
          const params = [];
          const [attrNamespace, attrName] = splitNsName(input.name);
          const isAttributeBinding = inputType === 1;
          let sanitizationRef = resolveSanitizationFn(input.securityContext, isAttributeBinding);
          if (!sanitizationRef) {
            if (isIframeElement2(element2.name) && isIframeSecuritySensitiveAttr(input.name)) {
              sanitizationRef = importExpr(Identifiers.validateIframeAttribute);
            }
          }
          if (sanitizationRef) {
            params.push(sanitizationRef);
          }
          if (attrNamespace) {
            const namespaceLiteral = literal(attrNamespace);
            if (sanitizationRef) {
              params.push(namespaceLiteral);
            } else {
              params.push(literal(null), namespaceLiteral);
            }
          }
          this.allocateBindingSlots(value);
          if (inputType === 0) {
            if (value instanceof Interpolation) {
              this.interpolatedUpdateInstruction(getPropertyInterpolationExpression(value), elementIndex, attrName, input, value, params);
            } else {
              propertyBindings.push({
                span: input.sourceSpan,
                paramsOrFn: getBindingFunctionParams(() => this.convertPropertyBinding(value), attrName, params)
              });
            }
          } else if (inputType === 1) {
            if (value instanceof Interpolation && getInterpolationArgsLength(value) > 1) {
              this.interpolatedUpdateInstruction(getAttributeInterpolationExpression(value), elementIndex, attrName, input, value, params);
            } else {
              const boundValue = value instanceof Interpolation ? value.expressions[0] : value;
              attributeBindings.push({
                span: input.sourceSpan,
                paramsOrFn: getBindingFunctionParams(() => this.convertPropertyBinding(boundValue), attrName, params)
              });
            }
          } else {
            this.updateInstructionWithAdvance(elementIndex, input.sourceSpan, Identifiers.classProp, () => {
              return [
                literal(elementIndex),
                literal(attrName),
                this.convertPropertyBinding(value),
                ...params
              ];
            });
          }
        }
      }
    });
    for (const propertyBinding of propertyBindings) {
      this.updateInstructionWithAdvance(elementIndex, propertyBinding.span, Identifiers.property, propertyBinding.paramsOrFn);
    }
    for (const attributeBinding of attributeBindings) {
      this.updateInstructionWithAdvance(elementIndex, attributeBinding.span, Identifiers.attribute, attributeBinding.paramsOrFn);
    }
    visitAll(this, element2.children);
    if (!isI18nRootElement && this.i18n) {
      this.i18n.appendElement(element2.i18n, elementIndex, true);
    }
    if (!createSelfClosingInstruction) {
      const span = (_b2 = element2.endSourceSpan) != null ? _b2 : element2.sourceSpan;
      if (isI18nRootElement) {
        this.i18nEnd(span, createSelfClosingI18nInstruction);
      }
      if (isNonBindableMode) {
        this.creationInstruction(span, Identifiers.enableBindings);
      }
      this.creationInstruction(span, isNgContainer2 ? Identifiers.elementContainerEnd : Identifiers.elementEnd);
    }
  }
  prepareEmbeddedTemplateFn(children, contextNameSuffix, variables = [], i18nMeta, variableAliases) {
    const index = this.allocateDataSlot();
    if (this.i18n && i18nMeta) {
      if (i18nMeta instanceof BlockPlaceholder) {
        this.i18n.appendBlock(i18nMeta, index);
      } else {
        this.i18n.appendTemplate(i18nMeta, index);
      }
    }
    const contextName = `${this.contextName}${contextNameSuffix}_${index}`;
    const name = `${contextName}_Template`;
    const visitor = new TemplateDefinitionBuilder(this.constantPool, this._bindingScope, this.level + 1, contextName, this.i18n, index, name, this._namespace, this.fileBasedI18nSuffix, this.i18nUseExternalIds, this.deferBlocks, this.elementLocations, this._constants);
    this._nestedTemplateFns.push(() => {
      const templateFunctionExpr = visitor.buildTemplateFunction(children, variables, this._ngContentReservedSlots.length + this._ngContentSelectorsOffset, i18nMeta, variableAliases);
      this.constantPool.statements.push(templateFunctionExpr.toDeclStmt(name));
      if (visitor._ngContentReservedSlots.length) {
        this._ngContentReservedSlots.push(...visitor._ngContentReservedSlots);
      }
    });
    return new TemplateData(name, index, visitor._bindingScope, visitor);
  }
  createEmbeddedTemplateFn(tagName, children, contextNameSuffix, sourceSpan, variables = [], attrsExprs, references, i18n2) {
    const data = this.prepareEmbeddedTemplateFn(children, contextNameSuffix, variables, i18n2);
    const parameters = [
      literal(data.index),
      variable(data.name),
      literal(tagName),
      this.addAttrsToConsts(attrsExprs || null)
    ];
    if (references && references.length > 0) {
      const refs = this.prepareRefsArray(references);
      parameters.push(this.addToConsts(refs));
      parameters.push(importExpr(Identifiers.templateRefExtractor));
    }
    this.creationInstruction(sourceSpan, Identifiers.templateCreate, () => {
      parameters.splice(2, 0, literal(data.getConstCount()), literal(data.getVarCount()));
      return trimTrailingNulls(parameters);
    });
    return data.index;
  }
  visitTemplate(template2) {
    var _a2;
    const tagNameWithoutNamespace = template2.tagName ? splitNsName(template2.tagName)[1] : template2.tagName;
    const contextNameSuffix = template2.tagName ? "_" + sanitizeIdentifier(template2.tagName) : "";
    const attrsExprs = this.getAttributeExpressions(NG_TEMPLATE_TAG_NAME, template2.attributes, template2.inputs, template2.outputs, void 0, template2.templateAttrs);
    const templateIndex = this.createEmbeddedTemplateFn(tagNameWithoutNamespace, template2.children, contextNameSuffix, template2.sourceSpan, template2.variables, attrsExprs, template2.references, template2.i18n);
    this.templatePropertyBindings(templateIndex, template2.templateAttrs);
    if (tagNameWithoutNamespace === NG_TEMPLATE_TAG_NAME) {
      const [i18nInputs, inputs] = partitionArray(template2.inputs, hasI18nMeta);
      if (i18nInputs.length > 0) {
        this.i18nAttributesInstruction(templateIndex, i18nInputs, (_a2 = template2.startSourceSpan) != null ? _a2 : template2.sourceSpan);
      }
      if (inputs.length > 0) {
        this.templatePropertyBindings(templateIndex, inputs);
      }
      for (const outputAst of template2.outputs) {
        this.creationInstruction(outputAst.sourceSpan, Identifiers.listener, this.prepareListenerParameter("ng_template", outputAst, templateIndex));
      }
    }
  }
  visitBoundText(text2) {
    if (this.i18n) {
      const value2 = text2.value.visit(this._valueConverter);
      this.allocateBindingSlots(value2);
      if (value2 instanceof Interpolation) {
        this.i18n.appendBoundText(text2.i18n);
        this.i18nAppendBindings(value2.expressions);
      }
      return;
    }
    const nodeIndex = this.allocateDataSlot();
    this.creationInstruction(text2.sourceSpan, Identifiers.text, [literal(nodeIndex)]);
    const value = text2.value.visit(this._valueConverter);
    this.allocateBindingSlots(value);
    if (value instanceof Interpolation) {
      this.updateInstructionWithAdvance(nodeIndex, text2.sourceSpan, getTextInterpolationExpression(value), () => this.getUpdateInstructionArguments(value));
    } else {
      error("Text nodes should be interpolated and never bound directly.");
    }
  }
  visitText(text2) {
    if (!this.i18n) {
      this.creationInstruction(text2.sourceSpan, Identifiers.text, [literal(this.allocateDataSlot()), literal(text2.value)]);
    }
  }
  visitIcu(icu) {
    let initWasInvoked = false;
    if (!this.i18n) {
      initWasInvoked = true;
      this.i18nStart(null, icu.i18n, true);
    }
    const i18n2 = this.i18n;
    const vars = this.i18nBindProps(icu.vars);
    const placeholders = this.i18nBindProps(icu.placeholders);
    const message = icu.i18n;
    const transformFn = (raw) => {
      const params = Object.fromEntries(Object.entries(__spreadValues(__spreadValues({}, vars), placeholders)).sort());
      const formatted = formatI18nPlaceholderNamesInMap(params, false);
      return invokeInstruction(null, Identifiers.i18nPostprocess, [raw, mapLiteral(formatted, true)]);
    };
    if (isSingleI18nIcu(i18n2.meta)) {
      this.i18nTranslate(message, {}, i18n2.ref, transformFn);
    } else {
      const ref = this.i18nTranslate(message, {}, void 0, transformFn);
      i18n2.appendIcu(icuFromI18nMessage(message).name, ref);
    }
    if (initWasInvoked) {
      this.i18nEnd(null, true);
    }
    return null;
  }
  visitIfBlock(block) {
    this.allocateBindingSlots(null);
    const branchData = block.branches.map((branch, branchIndex) => {
      const { expression, expressionAlias, children, sourceSpan } = branch;
      const variables = expressionAlias !== null ? [new Variable(expressionAlias.name, DIRECT_CONTEXT_REFERENCE, expressionAlias.sourceSpan, expressionAlias.keySpan)] : void 0;
      let tagName = null;
      let attrsExprs;
      if (branchIndex === 0) {
        const inferredData = this.inferProjectionDataFromInsertionPoint(branch);
        tagName = inferredData.tagName;
        attrsExprs = inferredData.attrsExprs;
      }
      const templateIndex = this.createEmbeddedTemplateFn(tagName, children, "_Conditional", sourceSpan, variables, attrsExprs, void 0, branch.i18n);
      const processedExpression = expression === null ? null : expression.visit(this._valueConverter);
      return { index: templateIndex, expression: processedExpression, alias: expressionAlias };
    });
    const containerIndex = branchData[0].index;
    const paramsCallback = () => {
      let contextVariable = null;
      const generateBranch = (branchIndex) => {
        if (branchIndex > branchData.length - 1) {
          return literal(-1);
        }
        const { index, expression, alias } = branchData[branchIndex];
        if (expression === null) {
          return literal(index);
        }
        let comparisonTarget;
        if (alias) {
          contextVariable = this.allocateControlFlowTempVariable();
          comparisonTarget = contextVariable.set(this.convertPropertyBinding(expression));
        } else {
          comparisonTarget = this.convertPropertyBinding(expression);
        }
        return comparisonTarget.conditional(literal(index), generateBranch(branchIndex + 1));
      };
      const params = [literal(containerIndex), generateBranch(0)];
      if (contextVariable !== null) {
        params.push(contextVariable);
      }
      return params;
    };
    this.updateInstructionWithAdvance(containerIndex, block.branches[0].sourceSpan, Identifiers.conditional, paramsCallback);
  }
  visitSwitchBlock(block) {
    const caseData = block.cases.map((currentCase) => {
      const index = this.createEmbeddedTemplateFn(null, currentCase.children, "_Case", currentCase.sourceSpan, void 0, void 0, void 0, currentCase.i18n);
      const expression = currentCase.expression === null ? null : currentCase.expression.visit(this._valueConverter);
      return { index, expression };
    });
    const containerIndex = caseData[0].index;
    const blockExpression = block.expression.visit(this._valueConverter);
    this.allocateBindingSlots(null);
    this.updateInstructionWithAdvance(containerIndex, block.sourceSpan, Identifiers.conditional, () => {
      const generateCases = (caseIndex) => {
        if (caseIndex > caseData.length - 1) {
          return literal(-1);
        }
        const { index, expression } = caseData[caseIndex];
        if (expression === null) {
          return literal(index);
        }
        const comparisonTarget = caseIndex === 0 ? this.allocateControlFlowTempVariable().set(this.convertPropertyBinding(blockExpression)) : this.allocateControlFlowTempVariable();
        return comparisonTarget.identical(this.convertPropertyBinding(expression)).conditional(literal(index), generateCases(caseIndex + 1));
      };
      return [literal(containerIndex), generateCases(0)];
    });
  }
  visitDeferredBlock(deferred) {
    const { loading, placeholder, error: error2, triggers, prefetchTriggers } = deferred;
    const metadata = this.deferBlocks.get(deferred);
    if (!metadata) {
      throw new Error("Could not resolve `defer` block metadata. Block may need to be analyzed.");
    }
    const primaryTemplateIndex = this.createEmbeddedTemplateFn(null, deferred.children, "_Defer", deferred.sourceSpan, void 0, void 0, void 0, deferred.i18n);
    const loadingIndex = loading ? this.createEmbeddedTemplateFn(null, loading.children, "_DeferLoading", loading.sourceSpan, void 0, void 0, void 0, loading.i18n) : null;
    const loadingConsts = loading ? trimTrailingNulls([literal(loading.minimumTime), literal(loading.afterTime)]) : null;
    const placeholderIndex = placeholder ? this.createEmbeddedTemplateFn(null, placeholder.children, "_DeferPlaceholder", placeholder.sourceSpan, void 0, void 0, void 0, placeholder.i18n) : null;
    const placeholderConsts = placeholder && placeholder.minimumTime !== null ? literalArr([literal(placeholder.minimumTime)]) : null;
    const errorIndex = error2 ? this.createEmbeddedTemplateFn(null, error2.children, "_DeferError", error2.sourceSpan, void 0, void 0, void 0, error2.i18n) : null;
    const deferredIndex = this.allocateDataSlot();
    const depsFnName = `${this.contextName}_Defer_${deferredIndex}_DepsFn`;
    this.creationInstruction(deferred.sourceSpan, Identifiers.defer, trimTrailingNulls([
      literal(deferredIndex),
      literal(primaryTemplateIndex),
      this.createDeferredDepsFunction(depsFnName, metadata),
      literal(loadingIndex),
      literal(placeholderIndex),
      literal(errorIndex),
      (loadingConsts == null ? void 0 : loadingConsts.length) ? this.addToConsts(literalArr(loadingConsts)) : TYPED_NULL_EXPR,
      placeholderConsts ? this.addToConsts(placeholderConsts) : TYPED_NULL_EXPR,
      (loadingConsts == null ? void 0 : loadingConsts.length) || placeholderConsts ? importExpr(Identifiers.deferEnableTimerScheduling) : TYPED_NULL_EXPR
    ]));
    this.allocateDataSlot();
    this.createDeferTriggerInstructions(deferredIndex, triggers, metadata, false);
    this.createDeferTriggerInstructions(deferredIndex, prefetchTriggers, metadata, true);
  }
  createDeferredDepsFunction(name, metadata) {
    if (metadata.deps.length === 0) {
      return TYPED_NULL_EXPR;
    }
    const dependencyExp = [];
    for (const deferredDep of metadata.deps) {
      if (deferredDep.isDeferrable) {
        const innerFn = arrowFn([new FnParam("m", DYNAMIC_TYPE)], variable("m").prop(deferredDep.symbolName));
        const importExpr2 = new DynamicImportExpr(deferredDep.importPath).prop("then").callFn([innerFn]);
        dependencyExp.push(importExpr2);
      } else {
        dependencyExp.push(deferredDep.type);
      }
    }
    const depsFnExpr = arrowFn([], literalArr(dependencyExp));
    this.constantPool.statements.push(depsFnExpr.toDeclStmt(name, StmtModifier.Final));
    return variable(name);
  }
  createDeferTriggerInstructions(deferredIndex, triggers, metadata, prefetch) {
    const { when, idle, immediate, timer, hover, interaction, viewport } = triggers;
    if (when) {
      const value = when.value.visit(this._valueConverter);
      this.allocateBindingSlots(value);
      this.updateInstructionWithAdvance(deferredIndex, when.sourceSpan, prefetch ? Identifiers.deferPrefetchWhen : Identifiers.deferWhen, () => this.convertPropertyBinding(value));
    }
    if (idle || !prefetch && Object.keys(triggers).length === 0) {
      this.creationInstruction((idle == null ? void 0 : idle.sourceSpan) || null, prefetch ? Identifiers.deferPrefetchOnIdle : Identifiers.deferOnIdle);
    }
    if (immediate) {
      this.creationInstruction(immediate.sourceSpan, prefetch ? Identifiers.deferPrefetchOnImmediate : Identifiers.deferOnImmediate);
    }
    if (timer) {
      this.creationInstruction(timer.sourceSpan, prefetch ? Identifiers.deferPrefetchOnTimer : Identifiers.deferOnTimer, [literal(timer.delay)]);
    }
    if (hover) {
      this.domNodeBasedTrigger("hover", hover, metadata, prefetch ? Identifiers.deferPrefetchOnHover : Identifiers.deferOnHover);
    }
    if (interaction) {
      this.domNodeBasedTrigger("interaction", interaction, metadata, prefetch ? Identifiers.deferPrefetchOnInteraction : Identifiers.deferOnInteraction);
    }
    if (viewport) {
      this.domNodeBasedTrigger("viewport", viewport, metadata, prefetch ? Identifiers.deferPrefetchOnViewport : Identifiers.deferOnViewport);
    }
  }
  domNodeBasedTrigger(name, trigger, metadata, instructionRef) {
    const triggerEl = metadata.triggerElements.get(trigger);
    if (!triggerEl) {
      return;
    }
    this.creationInstruction(trigger.sourceSpan, instructionRef, () => {
      const location = this.elementLocations.get(triggerEl);
      if (!location) {
        throw new Error(`Could not determine location of reference passed into '${name}' trigger. Template may not have been fully analyzed.`);
      }
      const depth = Math.max(this.level - location.level, -1);
      const params = [literal(location.index)];
      if (depth !== 0) {
        params.push(literal(depth));
      }
      return params;
    });
  }
  inferProjectionDataFromInsertionPoint(node) {
    let root = null;
    let tagName = null;
    let attrsExprs;
    for (const child of node.children) {
      if (child instanceof Comment) {
        continue;
      }
      if (root !== null) {
        root = null;
        break;
      }
      if (child instanceof Element || child instanceof Template && child.tagName !== null) {
        root = child;
      }
    }
    if (root !== null) {
      const name = root instanceof Element ? root.name : root.tagName;
      tagName = name === NG_TEMPLATE_TAG_NAME ? null : name;
      attrsExprs = this.getAttributeExpressions(NG_TEMPLATE_TAG_NAME, root.attributes, root.inputs, []);
    }
    return { tagName, attrsExprs };
  }
  allocateDataSlot() {
    return this._dataIndex++;
  }
  visitForLoopBlock(block) {
    const blockIndex = this.allocateDataSlot();
    const { tagName, attrsExprs } = this.inferProjectionDataFromInsertionPoint(block);
    const primaryData = this.prepareEmbeddedTemplateFn(block.children, "_For", [block.item, block.contextVariables.$index, block.contextVariables.$count], block.i18n, {
      [block.contextVariables.$index.name]: this.getLevelSpecificVariableName("$index", this.level + 1),
      [block.contextVariables.$count.name]: this.getLevelSpecificVariableName("$count", this.level + 1)
    });
    const { expression: trackByExpression, usesComponentInstance: trackByUsesComponentInstance } = this.createTrackByFunction(block);
    let emptyData = null;
    if (block.empty !== null) {
      emptyData = this.prepareEmbeddedTemplateFn(block.empty.children, "_ForEmpty", void 0, block.empty.i18n);
      this.allocateBindingSlots(null);
    }
    this.registerComputedLoopVariables(block, primaryData.scope);
    this.creationInstruction(block.sourceSpan, Identifiers.repeaterCreate, () => {
      const params = [
        literal(blockIndex),
        variable(primaryData.name),
        literal(primaryData.getConstCount()),
        literal(primaryData.getVarCount()),
        literal(tagName),
        this.addAttrsToConsts(attrsExprs || null),
        trackByExpression
      ];
      if (emptyData !== null) {
        params.push(literal(trackByUsesComponentInstance), variable(emptyData.name), literal(emptyData.getConstCount()), literal(emptyData.getVarCount()));
      } else if (trackByUsesComponentInstance) {
        params.push(literal(trackByUsesComponentInstance));
      }
      return params;
    });
    const value = block.expression.visit(this._valueConverter);
    this.updateInstructionWithAdvance(blockIndex, block.sourceSpan, Identifiers.repeater, () => [this.convertPropertyBinding(value)]);
  }
  registerComputedLoopVariables(block, bindingScope) {
    const level = bindingScope.bindingLevel;
    bindingScope.set(level, block.contextVariables.$odd.name, (scope, retrievalLevel) => {
      return this.getLevelSpecificForLoopVariable(block, scope, retrievalLevel, "$index").modulo(literal(2)).notIdentical(literal(0));
    });
    bindingScope.set(level, block.contextVariables.$even.name, (scope, retrievalLevel) => {
      return this.getLevelSpecificForLoopVariable(block, scope, retrievalLevel, "$index").modulo(literal(2)).identical(literal(0));
    });
    bindingScope.set(level, block.contextVariables.$first.name, (scope, retrievalLevel) => {
      return this.getLevelSpecificForLoopVariable(block, scope, retrievalLevel, "$index").identical(literal(0));
    });
    bindingScope.set(level, block.contextVariables.$last.name, (scope, retrievalLevel) => {
      const index = this.getLevelSpecificForLoopVariable(block, scope, retrievalLevel, "$index");
      const count = this.getLevelSpecificForLoopVariable(block, scope, retrievalLevel, "$count");
      return index.identical(count.minus(literal(1)));
    });
  }
  getLevelSpecificVariableName(name, level) {
    return `\u0275${name}_${level}`;
  }
  getLevelSpecificForLoopVariable(block, scope, retrievalLevel, name) {
    const scopeName = scope.bindingLevel === retrievalLevel ? block.contextVariables[name].name : this.getLevelSpecificVariableName(name, retrievalLevel);
    return scope.get(scopeName);
  }
  optimizeTrackByFunction(block) {
    const indexLocalName = block.contextVariables.$index.name;
    const itemName = block.item.name;
    const ast = block.trackBy.ast;
    if (ast instanceof PropertyRead && ast.receiver instanceof ImplicitReceiver && ast.name === indexLocalName) {
      return { expression: importExpr(Identifiers.repeaterTrackByIndex), usesComponentInstance: false };
    }
    if (ast instanceof PropertyRead && ast.receiver instanceof ImplicitReceiver && ast.name === itemName) {
      return { expression: importExpr(Identifiers.repeaterTrackByIdentity), usesComponentInstance: false };
    }
    if (ast instanceof Call && ast.receiver instanceof PropertyRead && ast.receiver.receiver instanceof ImplicitReceiver && ast.args.length === 2) {
      const firstIsIndex = ast.args[0] instanceof PropertyRead && ast.args[0].receiver instanceof ImplicitReceiver && ast.args[0].name === indexLocalName;
      const secondIsItem = ast.args[1] instanceof PropertyRead && ast.args[1].receiver instanceof ImplicitReceiver && ast.args[1].name === itemName;
      if (firstIsIndex && secondIsItem) {
        const receiver = this.level === 0 ? variable(CONTEXT_NAME) : new ExternalExpr(Identifiers.componentInstance).callFn([]);
        return { expression: receiver.prop(ast.receiver.name), usesComponentInstance: false };
      }
    }
    return null;
  }
  createTrackByFunction(block) {
    const optimizedFn = this.optimizeTrackByFunction(block);
    if (optimizedFn !== null) {
      return optimizedFn;
    }
    const contextVars = block.contextVariables;
    const scope = new TrackByBindingScope(this._bindingScope, {
      [contextVars.$index.name]: "$index",
      [block.item.name]: "$item",
      [contextVars.$count.name]: contextVars.$count.name,
      [contextVars.$first.name]: contextVars.$first.name,
      [contextVars.$last.name]: contextVars.$last.name,
      [contextVars.$even.name]: contextVars.$even.name,
      [contextVars.$odd.name]: contextVars.$odd.name
    });
    const params = [new FnParam("$index"), new FnParam("$item")];
    const stmts = convertPureComponentScopeFunction(block.trackBy.ast, scope, variable(CONTEXT_NAME), "track");
    const usesComponentInstance = scope.getComponentAccessCount() > 0;
    let fn2;
    if (!usesComponentInstance && stmts.length === 1 && stmts[0] instanceof ExpressionStatement) {
      fn2 = arrowFn(params, stmts[0].expr);
    } else {
      if (stmts.length > 0) {
        const lastStatement = stmts[stmts.length - 1];
        if (lastStatement instanceof ExpressionStatement) {
          stmts[stmts.length - 1] = new ReturnStatement(lastStatement.expr);
        }
      }
      fn2 = fn(params, stmts);
    }
    return {
      expression: this.constantPool.getSharedFunctionReference(fn2, "_forTrack"),
      usesComponentInstance
    };
  }
  getConstCount() {
    return this._dataIndex;
  }
  getVarCount() {
    return this._pureFunctionSlots;
  }
  getConsts() {
    return this._constants;
  }
  getNgContentSelectors() {
    return this._ngContentReservedSlots.length ? this.constantPool.getConstLiteral(asLiteral(this._ngContentReservedSlots), true) : null;
  }
  bindingContext() {
    return `${this._bindingContext++}`;
  }
  templatePropertyBindings(templateIndex, attrs) {
    const propertyBindings = [];
    for (const input of attrs) {
      if (!(input instanceof BoundAttribute)) {
        continue;
      }
      const value = input.value.visit(this._valueConverter);
      if (value === void 0) {
        continue;
      }
      this.allocateBindingSlots(value);
      if (value instanceof Interpolation) {
        const params = [];
        this.interpolatedUpdateInstruction(getPropertyInterpolationExpression(value), templateIndex, input.name, input, value, params);
      } else {
        propertyBindings.push({
          span: input.sourceSpan,
          paramsOrFn: getBindingFunctionParams(() => this.convertPropertyBinding(value), input.name)
        });
      }
    }
    for (const propertyBinding of propertyBindings) {
      this.updateInstructionWithAdvance(templateIndex, propertyBinding.span, Identifiers.property, propertyBinding.paramsOrFn);
    }
  }
  instructionFn(fns, span, reference2, paramsOrFn, prepend = false) {
    fns[prepend ? "unshift" : "push"]({ span, reference: reference2, paramsOrFn });
  }
  processStylingUpdateInstruction(elementIndex, instruction) {
    let allocateBindingSlots = 0;
    if (instruction) {
      for (const call2 of instruction.calls) {
        allocateBindingSlots += call2.allocateBindingSlots;
        this.updateInstructionWithAdvance(elementIndex, call2.sourceSpan, instruction.reference, () => call2.params((value) => call2.supportsInterpolation && value instanceof Interpolation ? this.getUpdateInstructionArguments(value) : this.convertPropertyBinding(value)));
      }
    }
    return allocateBindingSlots;
  }
  creationInstruction(span, reference2, paramsOrFn, prepend) {
    this.instructionFn(this._creationCodeFns, span, reference2, paramsOrFn || [], prepend);
  }
  updateInstructionWithAdvance(nodeIndex, span, reference2, paramsOrFn) {
    this.addAdvanceInstructionIfNecessary(nodeIndex, span);
    this.updateInstruction(span, reference2, paramsOrFn);
  }
  updateInstruction(span, reference2, paramsOrFn) {
    this.instructionFn(this._updateCodeFns, span, reference2, paramsOrFn || []);
  }
  addAdvanceInstructionIfNecessary(nodeIndex, span) {
    if (nodeIndex !== this._currentIndex) {
      const delta = nodeIndex - this._currentIndex;
      if (delta < 1) {
        throw new Error("advance instruction can only go forwards");
      }
      this.instructionFn(this._updateCodeFns, span, Identifiers.advance, [literal(delta)]);
      this._currentIndex = nodeIndex;
    }
  }
  allocatePureFunctionSlots(numSlots) {
    const originalSlots = this._pureFunctionSlots;
    this._pureFunctionSlots += numSlots;
    return originalSlots;
  }
  allocateBindingSlots(value) {
    this._bindingSlots += value instanceof Interpolation ? value.expressions.length : 1;
  }
  getImplicitReceiverExpr() {
    if (this._implicitReceiverExpr) {
      return this._implicitReceiverExpr;
    }
    return this._implicitReceiverExpr = this.level === 0 ? variable(CONTEXT_NAME) : this._bindingScope.getOrCreateSharedContextVar(0);
  }
  convertPropertyBinding(value) {
    const convertedPropertyBinding = convertPropertyBinding(this, this.getImplicitReceiverExpr(), value, this.bindingContext());
    const valExpr = convertedPropertyBinding.currValExpr;
    this._tempVariables.push(...convertedPropertyBinding.stmts);
    return valExpr;
  }
  getUpdateInstructionArguments(value) {
    const { args, stmts } = convertUpdateArguments(this, this.getImplicitReceiverExpr(), value, this.bindingContext());
    this._tempVariables.push(...stmts);
    return args;
  }
  allocateControlFlowTempVariable() {
    if (this._controlFlowTempVariable === null) {
      const name = `${this.contextName}_contFlowTmp`;
      this._tempVariables.push(new DeclareVarStmt(name));
      this._controlFlowTempVariable = variable(name);
    }
    return this._controlFlowTempVariable;
  }
  getAttributeExpressions(elementName, renderAttributes, inputs, outputs, styles, templateAttrs = [], boundI18nAttrs = []) {
    const alreadySeen = /* @__PURE__ */ new Set();
    const attrExprs = [];
    let ngProjectAsAttr;
    for (const attr of renderAttributes) {
      if (attr.name === NG_PROJECT_AS_ATTR_NAME) {
        ngProjectAsAttr = attr;
      }
      if (attr.i18n) {
        const { i18nVarRefsCache } = this._constants;
        let i18nVarRef;
        if (i18nVarRefsCache.has(attr.i18n)) {
          i18nVarRef = i18nVarRefsCache.get(attr.i18n);
        } else {
          i18nVarRef = this.i18nTranslate(attr.i18n);
          i18nVarRefsCache.set(attr.i18n, i18nVarRef);
        }
        attrExprs.push(literal(attr.name), i18nVarRef);
      } else {
        attrExprs.push(...getAttributeNameLiterals2(attr.name), trustedConstAttribute(elementName, attr));
      }
    }
    if (ngProjectAsAttr) {
      attrExprs.push(...getNgProjectAsLiteral(ngProjectAsAttr));
    }
    function addAttrExpr(key, value) {
      if (typeof key === "string") {
        if (!alreadySeen.has(key)) {
          attrExprs.push(...getAttributeNameLiterals2(key));
          value !== void 0 && attrExprs.push(value);
          alreadySeen.add(key);
        }
      } else {
        attrExprs.push(literal(key));
      }
    }
    if (styles) {
      styles.populateInitialStylingAttrs(attrExprs);
    }
    if (inputs.length || outputs.length) {
      const attrsLengthBeforeInputs = attrExprs.length;
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.type !== 4 && input.type !== 1) {
          addAttrExpr(input.name);
        }
      }
      for (let i = 0; i < outputs.length; i++) {
        const output = outputs[i];
        if (output.type !== 1) {
          addAttrExpr(output.name);
        }
      }
      if (attrExprs.length !== attrsLengthBeforeInputs) {
        attrExprs.splice(attrsLengthBeforeInputs, 0, literal(3));
      }
    }
    if (templateAttrs.length) {
      attrExprs.push(literal(4));
      templateAttrs.forEach((attr) => addAttrExpr(attr.name));
    }
    if (boundI18nAttrs.length) {
      attrExprs.push(literal(6));
      boundI18nAttrs.forEach((attr) => addAttrExpr(attr.name));
    }
    return attrExprs;
  }
  addToConsts(expression) {
    if (isNull(expression)) {
      return TYPED_NULL_EXPR;
    }
    const consts = this._constants.constExpressions;
    for (let i = 0; i < consts.length; i++) {
      if (consts[i].isEquivalent(expression)) {
        return literal(i);
      }
    }
    return literal(consts.push(expression) - 1);
  }
  addAttrsToConsts(attrs) {
    return attrs !== null && attrs.length > 0 ? this.addToConsts(literalArr(attrs)) : TYPED_NULL_EXPR;
  }
  prepareRefsArray(references) {
    if (!references || references.length === 0) {
      return TYPED_NULL_EXPR;
    }
    const refsParam = references.flatMap((reference2) => {
      const slot = this.allocateDataSlot();
      const variableName = this._bindingScope.freshReferenceName();
      const retrievalLevel = this.level;
      const lhs = variable(variableName);
      this._bindingScope.set(retrievalLevel, reference2.name, lhs, 0, (scope, relativeLevel) => {
        const nextContextStmt = relativeLevel > 0 ? [generateNextContextExpr(relativeLevel).toStmt()] : [];
        const refExpr = lhs.set(importExpr(Identifiers.reference).callFn([literal(slot)]));
        return nextContextStmt.concat(refExpr.toConstDecl());
      }, true);
      return [reference2.name, reference2.value];
    });
    return asLiteral(refsParam);
  }
  prepareListenerParameter(tagName, outputAst, index) {
    return () => {
      const eventName = outputAst.name;
      const bindingFnName = outputAst.type === 1 ? prepareSyntheticListenerFunctionName(eventName, outputAst.phase) : sanitizeIdentifier(eventName);
      const handlerName = `${this.templateName}_${tagName}_${bindingFnName}_${index}_listener`;
      const scope = this._bindingScope.nestedScope(this._bindingScope.bindingLevel, EVENT_BINDING_SCOPE_GLOBALS);
      return prepareEventListenerParameters(outputAst, handlerName, scope);
    };
  }
};
var ValueConverter = class extends AstMemoryEfficientTransformer {
  constructor(constantPool, allocateSlot, allocatePureFunctionSlots, definePipe) {
    super();
    this.constantPool = constantPool;
    this.allocateSlot = allocateSlot;
    this.allocatePureFunctionSlots = allocatePureFunctionSlots;
    this.definePipe = definePipe;
    this._pipeBindExprs = [];
  }
  visitPipe(pipe2, context) {
    const slot = this.allocateSlot();
    const slotPseudoLocal = `PIPE:${slot}`;
    const pureFunctionSlot = this.allocatePureFunctionSlots(2 + pipe2.args.length);
    const target = new PropertyRead(pipe2.span, pipe2.sourceSpan, pipe2.nameSpan, new ImplicitReceiver(pipe2.span, pipe2.sourceSpan), slotPseudoLocal);
    const { identifier, isVarLength } = pipeBindingCallInfo(pipe2.args);
    this.definePipe(pipe2.name, slotPseudoLocal, slot, importExpr(identifier));
    const args = [pipe2.exp, ...pipe2.args];
    const convertedArgs = isVarLength ? this.visitAll([new LiteralArray(pipe2.span, pipe2.sourceSpan, args)]) : this.visitAll(args);
    const pipeBindExpr = new Call(pipe2.span, pipe2.sourceSpan, target, [
      new LiteralPrimitive(pipe2.span, pipe2.sourceSpan, slot),
      new LiteralPrimitive(pipe2.span, pipe2.sourceSpan, pureFunctionSlot),
      ...convertedArgs
    ], null);
    this._pipeBindExprs.push(pipeBindExpr);
    return pipeBindExpr;
  }
  updatePipeSlotOffsets(bindingSlots) {
    this._pipeBindExprs.forEach((pipe2) => {
      const slotOffset = pipe2.args[1];
      slotOffset.value += bindingSlots;
    });
  }
  visitLiteralArray(array, context) {
    return new BuiltinFunctionCall(array.span, array.sourceSpan, this.visitAll(array.expressions), (values) => {
      const literal2 = literalArr(values);
      return getLiteralFactory(this.constantPool, literal2, this.allocatePureFunctionSlots);
    });
  }
  visitLiteralMap(map, context) {
    return new BuiltinFunctionCall(map.span, map.sourceSpan, this.visitAll(map.values), (values) => {
      const literal2 = literalMap(values.map((value, index) => ({ key: map.keys[index].key, value, quoted: map.keys[index].quoted })));
      return getLiteralFactory(this.constantPool, literal2, this.allocatePureFunctionSlots);
    });
  }
};
var pipeBindingIdentifiers = [Identifiers.pipeBind1, Identifiers.pipeBind2, Identifiers.pipeBind3, Identifiers.pipeBind4];
function pipeBindingCallInfo(args) {
  const identifier = pipeBindingIdentifiers[args.length];
  return {
    identifier: identifier || Identifiers.pipeBindV,
    isVarLength: !identifier
  };
}
var pureFunctionIdentifiers = [
  Identifiers.pureFunction0,
  Identifiers.pureFunction1,
  Identifiers.pureFunction2,
  Identifiers.pureFunction3,
  Identifiers.pureFunction4,
  Identifiers.pureFunction5,
  Identifiers.pureFunction6,
  Identifiers.pureFunction7,
  Identifiers.pureFunction8
];
function pureFunctionCallInfo(args) {
  const identifier = pureFunctionIdentifiers[args.length];
  return {
    identifier: identifier || Identifiers.pureFunctionV,
    isVarLength: !identifier
  };
}
function generateNextContextExpr(relativeLevelDiff) {
  return importExpr(Identifiers.nextContext).callFn(relativeLevelDiff > 1 ? [literal(relativeLevelDiff)] : []);
}
function getLiteralFactory(constantPool, literal2, allocateSlots2) {
  const { literalFactory, literalFactoryArguments } = constantPool.getLiteralFactory(literal2);
  const startSlot = allocateSlots2(1 + literalFactoryArguments.length);
  const { identifier, isVarLength } = pureFunctionCallInfo(literalFactoryArguments);
  const args = [literal(startSlot), literalFactory];
  if (isVarLength) {
    args.push(literalArr(literalFactoryArguments));
  } else {
    args.push(...literalFactoryArguments);
  }
  return importExpr(identifier).callFn(args);
}
function getAttributeNameLiterals2(name) {
  const [attributeNamespace, attributeName] = splitNsName(name);
  const nameLiteral = literal(attributeName);
  if (attributeNamespace) {
    return [
      literal(0),
      literal(attributeNamespace),
      nameLiteral
    ];
  }
  return [nameLiteral];
}
var SHARED_CONTEXT_KEY = "$$shared_ctx$$";
var BindingScope = class {
  static createRootScope() {
    return new BindingScope();
  }
  constructor(bindingLevel = 0, parent = null, globals) {
    this.bindingLevel = bindingLevel;
    this.parent = parent;
    this.globals = globals;
    this.map = /* @__PURE__ */ new Map();
    this.referenceNameIndex = 0;
    this.restoreViewVariable = null;
    this.usesRestoredViewContext = false;
    if (globals !== void 0) {
      for (const name of globals) {
        this.set(0, name, variable(name));
      }
    }
  }
  get(name) {
    let current = this;
    while (current) {
      let value = current.map.get(name);
      if (value != null) {
        if (current !== this) {
          value = {
            retrievalLevel: value.retrievalLevel,
            lhs: value.lhs,
            declareLocalCallback: value.declareLocalCallback,
            declare: false,
            priority: value.priority
          };
          this.map.set(name, value);
          this.maybeGenerateSharedContextVar(value);
          this.maybeRestoreView();
        }
        if (value.declareLocalCallback && !value.declare) {
          value.declare = true;
        }
        return typeof value.lhs === "function" ? value.lhs(this, value.retrievalLevel) : value.lhs;
      }
      current = current.parent;
    }
    return this.bindingLevel === 0 ? null : this.getComponentProperty(name);
  }
  hasLocal(name) {
    return this.map.has(name);
  }
  set(retrievalLevel, name, lhs, priority = 0, declareLocalCallback, localRef) {
    if (this.map.has(name)) {
      if (localRef) {
        return this;
      }
      error(`The name ${name} is already defined in scope to be ${this.map.get(name)}`);
    }
    this.map.set(name, {
      retrievalLevel,
      lhs,
      declare: false,
      declareLocalCallback,
      priority
    });
    return this;
  }
  getLocal(name) {
    return this.get(name);
  }
  notifyImplicitReceiverUse() {
    if (this.bindingLevel !== 0) {
      this.map.get(SHARED_CONTEXT_KEY + 0).declare = true;
    }
  }
  nestedScope(level, globals) {
    const newScope = new BindingScope(level, this, globals);
    if (level > 0)
      newScope.generateSharedContextVar(0);
    return newScope;
  }
  getOrCreateSharedContextVar(retrievalLevel) {
    const bindingKey = SHARED_CONTEXT_KEY + retrievalLevel;
    if (!this.map.has(bindingKey)) {
      this.generateSharedContextVar(retrievalLevel);
    }
    return this.map.get(bindingKey).lhs;
  }
  getSharedContextName(retrievalLevel) {
    const sharedCtxObj = this.map.get(SHARED_CONTEXT_KEY + retrievalLevel);
    return sharedCtxObj && sharedCtxObj.declare ? sharedCtxObj.lhs : null;
  }
  maybeGenerateSharedContextVar(value) {
    if (value.priority === 1 && value.retrievalLevel < this.bindingLevel) {
      const sharedCtxObj = this.map.get(SHARED_CONTEXT_KEY + value.retrievalLevel);
      if (sharedCtxObj) {
        sharedCtxObj.declare = true;
      } else {
        this.generateSharedContextVar(value.retrievalLevel);
      }
    }
  }
  generateSharedContextVar(retrievalLevel) {
    const lhs = variable(CONTEXT_NAME + this.freshReferenceName());
    this.map.set(SHARED_CONTEXT_KEY + retrievalLevel, {
      retrievalLevel,
      lhs,
      declareLocalCallback: (scope, relativeLevel) => {
        return [lhs.set(generateNextContextExpr(relativeLevel)).toConstDecl()];
      },
      declare: false,
      priority: 2
    });
  }
  getComponentProperty(name) {
    const componentValue = this.map.get(SHARED_CONTEXT_KEY + 0);
    componentValue.declare = true;
    this.maybeRestoreView();
    const lhs = typeof componentValue.lhs === "function" ? componentValue.lhs(this, componentValue.retrievalLevel) : componentValue.lhs;
    return name === DIRECT_CONTEXT_REFERENCE ? lhs : lhs.prop(name);
  }
  maybeRestoreView() {
    if (this.isListenerScope()) {
      if (!this.parent.restoreViewVariable) {
        this.parent.restoreViewVariable = variable(this.parent.freshReferenceName());
      }
      this.restoreViewVariable = this.parent.restoreViewVariable;
    }
  }
  restoreViewStatement() {
    if (this.restoreViewVariable) {
      const restoreCall = invokeInstruction(null, Identifiers.restoreView, [this.restoreViewVariable]);
      return this.usesRestoredViewContext ? variable(RESTORED_VIEW_CONTEXT_NAME).set(restoreCall).toConstDecl() : restoreCall.toStmt();
    }
    return null;
  }
  viewSnapshotStatements() {
    return this.restoreViewVariable ? [
      this.restoreViewVariable.set(invokeInstruction(null, Identifiers.getCurrentView, [])).toConstDecl()
    ] : [];
  }
  isListenerScope() {
    return this.parent && this.parent.bindingLevel === this.bindingLevel;
  }
  variableDeclarations() {
    let currentContextLevel = 0;
    return Array.from(this.map.values()).filter((value) => value.declare).sort((a, b) => b.retrievalLevel - a.retrievalLevel || b.priority - a.priority).reduce((stmts, value) => {
      const levelDiff = this.bindingLevel - value.retrievalLevel;
      const currStmts = value.declareLocalCallback(this, levelDiff - currentContextLevel);
      currentContextLevel = levelDiff;
      return stmts.concat(currStmts);
    }, []);
  }
  freshReferenceName() {
    let current = this;
    while (current.parent)
      current = current.parent;
    const ref = `${REFERENCE_PREFIX}${current.referenceNameIndex++}`;
    return ref;
  }
  hasRestoreViewVariable() {
    return !!this.restoreViewVariable;
  }
  notifyRestoredViewContextUse() {
    this.usesRestoredViewContext = true;
  }
};
var TrackByBindingScope = class extends BindingScope {
  constructor(parentScope, globalAliases) {
    super(parentScope.bindingLevel + 1, parentScope);
    this.globalAliases = globalAliases;
    this.componentAccessCount = 0;
  }
  get(name) {
    let current = this.parent;
    while (current) {
      if (current.hasLocal(name)) {
        return null;
      }
      current = current.parent;
    }
    if (this.globalAliases[name]) {
      return variable(this.globalAliases[name]);
    }
    this.componentAccessCount++;
    return variable("this").prop(name);
  }
  getComponentAccessCount() {
    return this.componentAccessCount;
  }
};
function getNgProjectAsLiteral(attribute2) {
  const parsedR3Selector = parseSelectorToR3Selector(attribute2.value)[0];
  return [literal(5), asLiteral(parsedR3Selector)];
}
function getPropertyInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.propertyInterpolate;
    case 3:
      return Identifiers.propertyInterpolate1;
    case 5:
      return Identifiers.propertyInterpolate2;
    case 7:
      return Identifiers.propertyInterpolate3;
    case 9:
      return Identifiers.propertyInterpolate4;
    case 11:
      return Identifiers.propertyInterpolate5;
    case 13:
      return Identifiers.propertyInterpolate6;
    case 15:
      return Identifiers.propertyInterpolate7;
    case 17:
      return Identifiers.propertyInterpolate8;
    default:
      return Identifiers.propertyInterpolateV;
  }
}
function getAttributeInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 3:
      return Identifiers.attributeInterpolate1;
    case 5:
      return Identifiers.attributeInterpolate2;
    case 7:
      return Identifiers.attributeInterpolate3;
    case 9:
      return Identifiers.attributeInterpolate4;
    case 11:
      return Identifiers.attributeInterpolate5;
    case 13:
      return Identifiers.attributeInterpolate6;
    case 15:
      return Identifiers.attributeInterpolate7;
    case 17:
      return Identifiers.attributeInterpolate8;
    default:
      return Identifiers.attributeInterpolateV;
  }
}
function getTextInterpolationExpression(interpolation) {
  switch (getInterpolationArgsLength(interpolation)) {
    case 1:
      return Identifiers.textInterpolate;
    case 3:
      return Identifiers.textInterpolate1;
    case 5:
      return Identifiers.textInterpolate2;
    case 7:
      return Identifiers.textInterpolate3;
    case 9:
      return Identifiers.textInterpolate4;
    case 11:
      return Identifiers.textInterpolate5;
    case 13:
      return Identifiers.textInterpolate6;
    case 15:
      return Identifiers.textInterpolate7;
    case 17:
      return Identifiers.textInterpolate8;
    default:
      return Identifiers.textInterpolateV;
  }
}
function parseTemplate(template2, templateUrl, options = {}) {
  var _a2;
  const { interpolationConfig, preserveWhitespaces, enableI18nLegacyMessageIdFormat } = options;
  const bindingParser = makeBindingParser(interpolationConfig);
  const htmlParser = new HtmlParser();
  const parseResult = htmlParser.parse(template2, templateUrl, __spreadProps(__spreadValues({
    leadingTriviaChars: LEADING_TRIVIA_CHARS
  }, options), {
    tokenizeExpansionForms: true,
    tokenizeBlocks: (_a2 = options.enableBlockSyntax) != null ? _a2 : true
  }));
  if (!options.alwaysAttemptHtmlToR3AstConversion && parseResult.errors && parseResult.errors.length > 0) {
    const parsedTemplate2 = {
      interpolationConfig,
      preserveWhitespaces,
      errors: parseResult.errors,
      nodes: [],
      styleUrls: [],
      styles: [],
      ngContentSelectors: []
    };
    if (options.collectCommentNodes) {
      parsedTemplate2.commentNodes = [];
    }
    return parsedTemplate2;
  }
  let rootNodes = parseResult.rootNodes;
  const i18nMetaVisitor = new I18nMetaVisitor(interpolationConfig, !preserveWhitespaces, enableI18nLegacyMessageIdFormat);
  const i18nMetaResult = i18nMetaVisitor.visitAllWithErrors(rootNodes);
  if (!options.alwaysAttemptHtmlToR3AstConversion && i18nMetaResult.errors && i18nMetaResult.errors.length > 0) {
    const parsedTemplate2 = {
      interpolationConfig,
      preserveWhitespaces,
      errors: i18nMetaResult.errors,
      nodes: [],
      styleUrls: [],
      styles: [],
      ngContentSelectors: []
    };
    if (options.collectCommentNodes) {
      parsedTemplate2.commentNodes = [];
    }
    return parsedTemplate2;
  }
  rootNodes = i18nMetaResult.rootNodes;
  if (!preserveWhitespaces) {
    rootNodes = visitAll2(new WhitespaceVisitor(), rootNodes);
    if (i18nMetaVisitor.hasI18nMeta) {
      rootNodes = visitAll2(new I18nMetaVisitor(interpolationConfig, false), rootNodes);
    }
  }
  const { nodes, errors, styleUrls, styles, ngContentSelectors, commentNodes } = htmlAstToRender3Ast(rootNodes, bindingParser, { collectCommentNodes: !!options.collectCommentNodes });
  errors.push(...parseResult.errors, ...i18nMetaResult.errors);
  const parsedTemplate = {
    interpolationConfig,
    preserveWhitespaces,
    errors: errors.length > 0 ? errors : null,
    nodes,
    styleUrls,
    styles,
    ngContentSelectors
  };
  if (options.collectCommentNodes) {
    parsedTemplate.commentNodes = commentNodes;
  }
  return parsedTemplate;
}
var elementRegistry = new DomElementSchemaRegistry();
function makeBindingParser(interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
  return new BindingParser(new Parser(new Lexer()), interpolationConfig, elementRegistry, []);
}
function resolveSanitizationFn(context, isAttribute) {
  switch (context) {
    case SecurityContext.HTML:
      return importExpr(Identifiers.sanitizeHtml);
    case SecurityContext.SCRIPT:
      return importExpr(Identifiers.sanitizeScript);
    case SecurityContext.STYLE:
      return isAttribute ? importExpr(Identifiers.sanitizeStyle) : null;
    case SecurityContext.URL:
      return importExpr(Identifiers.sanitizeUrl);
    case SecurityContext.RESOURCE_URL:
      return importExpr(Identifiers.sanitizeResourceUrl);
    default:
      return null;
  }
}
function trustedConstAttribute(tagName, attr) {
  const value = asLiteral(attr.value);
  if (isTrustedTypesSink(tagName, attr.name)) {
    switch (elementRegistry.securityContext(tagName, attr.name, true)) {
      case SecurityContext.HTML:
        return taggedTemplate(importExpr(Identifiers.trustConstantHtml), new TemplateLiteral([new TemplateLiteralElement(attr.value)], []), void 0, attr.valueSpan);
      case SecurityContext.RESOURCE_URL:
        return taggedTemplate(importExpr(Identifiers.trustConstantResourceUrl), new TemplateLiteral([new TemplateLiteralElement(attr.value)], []), void 0, attr.valueSpan);
      default:
        return value;
    }
  } else {
    return value;
  }
}
function isSingleElementTemplate(children) {
  return children.length === 1 && children[0] instanceof Element;
}
function isTextNode(node) {
  return node instanceof Text || node instanceof BoundText || node instanceof Icu;
}
function isIframeElement2(tagName) {
  return tagName.toLowerCase() === "iframe";
}
function hasTextChildrenOnly(children) {
  return children.every(isTextNode);
}
function getBindingFunctionParams(deferredParams, name, eagerParams) {
  return () => {
    const value = deferredParams();
    const fnParams = Array.isArray(value) ? value : [value];
    if (eagerParams) {
      fnParams.push(...eagerParams);
    }
    if (name) {
      fnParams.unshift(literal(name));
    }
    return fnParams;
  };
}
var NG_I18N_CLOSURE_MODE2 = "ngI18nClosureMode";
function getTranslationDeclStmts2(message, variable2, closureVar, params = {}, transformFn) {
  params = Object.fromEntries(Object.entries(params).sort());
  const statements = [
    declareI18nVariable(variable2),
    ifStmt(createClosureModeGuard2(), createGoogleGetMsgStatements(variable2, message, closureVar, params), createLocalizeStatements(variable2, message, formatI18nPlaceholderNamesInMap(params, false)))
  ];
  if (transformFn) {
    statements.push(new ExpressionStatement(variable2.set(transformFn(variable2))));
  }
  return statements;
}
function createClosureModeGuard2() {
  return typeofExpr(variable(NG_I18N_CLOSURE_MODE2)).notIdentical(literal("undefined", STRING_TYPE)).and(variable(NG_I18N_CLOSURE_MODE2));
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/compiler.mjs
var ATTR_REGEX = /attr\.([^\]]+)/;
var COMPONENT_VARIABLE = "%COMP%";
var HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
var CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
function baseDirectiveFields(meta, constantPool, bindingParser) {
  const definitionMap = new DefinitionMap();
  const selectors = parseSelectorToR3Selector(meta.selector);
  definitionMap.set("type", meta.type.value);
  if (selectors.length > 0) {
    definitionMap.set("selectors", asLiteral(selectors));
  }
  if (meta.queries.length > 0) {
    definitionMap.set("contentQueries", createContentQueriesFunction(meta.queries, constantPool, meta.name));
  }
  if (meta.viewQueries.length) {
    definitionMap.set("viewQuery", createViewQueriesFunction(meta.viewQueries, constantPool, meta.name));
  }
  definitionMap.set("hostBindings", createHostBindingsFunction(meta.host, meta.typeSourceSpan, bindingParser, constantPool, meta.selector || "", meta.name, definitionMap));
  definitionMap.set("inputs", conditionallyCreateDirectiveBindingLiteral(meta.inputs, true));
  definitionMap.set("outputs", conditionallyCreateDirectiveBindingLiteral(meta.outputs));
  if (meta.exportAs !== null) {
    definitionMap.set("exportAs", literalArr(meta.exportAs.map((e) => literal(e))));
  }
  if (meta.isStandalone) {
    definitionMap.set("standalone", literal(true));
  }
  if (meta.isSignal) {
    definitionMap.set("signals", literal(true));
  }
  return definitionMap;
}
function addFeatures(definitionMap, meta) {
  var _a2;
  const features = [];
  const providers = meta.providers;
  const viewProviders = meta.viewProviders;
  const inputKeys = Object.keys(meta.inputs);
  if (providers || viewProviders) {
    const args = [providers || new LiteralArrayExpr([])];
    if (viewProviders) {
      args.push(viewProviders);
    }
    features.push(importExpr(Identifiers.ProvidersFeature).callFn(args));
  }
  for (const key of inputKeys) {
    if (meta.inputs[key].transformFunction !== null) {
      features.push(importExpr(Identifiers.InputTransformsFeatureFeature));
      break;
    }
  }
  if ((_a2 = meta.hostDirectives) == null ? void 0 : _a2.length) {
    features.push(importExpr(Identifiers.HostDirectivesFeature).callFn([createHostDirectivesFeatureArg(meta.hostDirectives)]));
  }
  if (meta.usesInheritance) {
    features.push(importExpr(Identifiers.InheritDefinitionFeature));
  }
  if (meta.fullInheritance) {
    features.push(importExpr(Identifiers.CopyDefinitionFeature));
  }
  if (meta.lifecycle.usesOnChanges) {
    features.push(importExpr(Identifiers.NgOnChangesFeature));
  }
  if (meta.hasOwnProperty("template") && meta.isStandalone) {
    features.push(importExpr(Identifiers.StandaloneFeature));
  }
  if (features.length) {
    definitionMap.set("features", literalArr(features));
  }
}
function compileDirectiveFromMetadata(meta, constantPool, bindingParser) {
  const definitionMap = baseDirectiveFields(meta, constantPool, bindingParser);
  addFeatures(definitionMap, meta);
  const expression = importExpr(Identifiers.defineDirective).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createDirectiveType(meta);
  return { expression, type, statements: [] };
}
function compileComponentFromMetadata(meta, constantPool, bindingParser) {
  const definitionMap = baseDirectiveFields(meta, constantPool, bindingParser);
  addFeatures(definitionMap, meta);
  const selector = meta.selector && CssSelector.parse(meta.selector);
  const firstSelector = selector && selector[0];
  if (firstSelector) {
    const selectorAttributes = firstSelector.getAttrs();
    if (selectorAttributes.length) {
      definitionMap.set("attrs", constantPool.getConstLiteral(
        literalArr(selectorAttributes.map((value) => value != null ? literal(value) : literal(void 0))),
        true
      ));
    }
  }
  const templateTypeName = meta.name;
  const templateName = templateTypeName ? `${templateTypeName}_Template` : null;
  if (!USE_TEMPLATE_PIPELINE) {
    const template2 = meta.template;
    const templateBuilder = new TemplateDefinitionBuilder(constantPool, BindingScope.createRootScope(), 0, templateTypeName, null, null, templateName, Identifiers.namespaceHTML, meta.relativeContextFilePath, meta.i18nUseExternalIds, meta.deferBlocks, /* @__PURE__ */ new Map());
    const templateFunctionExpression = templateBuilder.buildTemplateFunction(template2.nodes, []);
    const ngContentSelectors = templateBuilder.getNgContentSelectors();
    if (ngContentSelectors) {
      definitionMap.set("ngContentSelectors", ngContentSelectors);
    }
    definitionMap.set("decls", literal(templateBuilder.getConstCount()));
    definitionMap.set("vars", literal(templateBuilder.getVarCount()));
    const { constExpressions, prepareStatements } = templateBuilder.getConsts();
    if (constExpressions.length > 0) {
      let constsExpr = literalArr(constExpressions);
      if (prepareStatements.length > 0) {
        constsExpr = arrowFn([], [...prepareStatements, new ReturnStatement(constsExpr)]);
      }
      definitionMap.set("consts", constsExpr);
    }
    definitionMap.set("template", templateFunctionExpression);
  } else {
    const tpl = ingestComponent(meta.name, meta.template.nodes, constantPool, meta.relativeContextFilePath, meta.i18nUseExternalIds, meta.deferBlocks);
    transform(tpl, CompilationJobKind.Tmpl);
    const templateFn = emitTemplateFn(tpl, constantPool);
    if (tpl.contentSelectors !== null) {
      definitionMap.set("ngContentSelectors", tpl.contentSelectors);
    }
    definitionMap.set("decls", literal(tpl.root.decls));
    definitionMap.set("vars", literal(tpl.root.vars));
    if (tpl.consts.length > 0) {
      if (tpl.constsInitializers.length > 0) {
        definitionMap.set("consts", arrowFn([], [
          ...tpl.constsInitializers,
          new ReturnStatement(literalArr(tpl.consts))
        ]));
      } else {
        definitionMap.set("consts", literalArr(tpl.consts));
      }
    }
    definitionMap.set("template", templateFn);
  }
  if (meta.declarationListEmitMode !== 3 && meta.declarations.length > 0) {
    definitionMap.set("dependencies", compileDeclarationList(literalArr(meta.declarations.map((decl) => decl.type)), meta.declarationListEmitMode));
  } else if (meta.declarationListEmitMode === 3) {
    const args = [meta.type.value];
    if (meta.rawImports) {
      args.push(meta.rawImports);
    }
    definitionMap.set("dependencies", importExpr(Identifiers.getComponentDepsFactory).callFn(args));
  }
  if (meta.encapsulation === null) {
    meta.encapsulation = ViewEncapsulation.Emulated;
  }
  if (meta.styles && meta.styles.length) {
    const styleValues = meta.encapsulation == ViewEncapsulation.Emulated ? compileStyles(meta.styles, CONTENT_ATTR, HOST_ATTR) : meta.styles;
    const styleNodes = styleValues.reduce((result, style) => {
      if (style.trim().length > 0) {
        result.push(constantPool.getConstLiteral(literal(style)));
      }
      return result;
    }, []);
    if (styleNodes.length > 0) {
      definitionMap.set("styles", literalArr(styleNodes));
    }
  } else if (meta.encapsulation === ViewEncapsulation.Emulated) {
    meta.encapsulation = ViewEncapsulation.None;
  }
  if (meta.encapsulation !== ViewEncapsulation.Emulated) {
    definitionMap.set("encapsulation", literal(meta.encapsulation));
  }
  if (meta.animations !== null) {
    definitionMap.set("data", literalMap([{ key: "animation", value: meta.animations, quoted: false }]));
  }
  if (meta.changeDetection !== null) {
    if (typeof meta.changeDetection === "number" && meta.changeDetection !== ChangeDetectionStrategy.Default) {
      definitionMap.set("changeDetection", literal(meta.changeDetection));
    } else if (typeof meta.changeDetection === "object") {
      definitionMap.set("changeDetection", meta.changeDetection);
    }
  }
  const expression = importExpr(Identifiers.defineComponent).callFn([definitionMap.toLiteralMap()], void 0, true);
  const type = createComponentType(meta);
  return { expression, type, statements: [] };
}
function createComponentType(meta) {
  const typeParams = createBaseDirectiveTypeParams(meta);
  typeParams.push(stringArrayAsType(meta.template.ngContentSelectors));
  typeParams.push(expressionType(literal(meta.isStandalone)));
  typeParams.push(createHostDirectivesType(meta));
  if (meta.isSignal) {
    typeParams.push(expressionType(literal(meta.isSignal)));
  }
  return expressionType(importExpr(Identifiers.ComponentDeclaration, typeParams));
}
function compileDeclarationList(list, mode) {
  switch (mode) {
    case 0:
      return list;
    case 1:
      return arrowFn([], list);
    case 2:
      const resolvedList = list.prop("map").callFn([importExpr(Identifiers.resolveForwardRef)]);
      return arrowFn([], resolvedList);
    case 3:
      throw new Error(`Unsupported with an array of pre-resolved dependencies`);
  }
}
function prepareQueryParams(query, constantPool) {
  const parameters = [getQueryPredicate(query, constantPool), literal(toQueryFlags(query))];
  if (query.read) {
    parameters.push(query.read);
  }
  return parameters;
}
function toQueryFlags(query) {
  return (query.descendants ? 1 : 0) | (query.static ? 2 : 0) | (query.emitDistinctChangesOnly ? 4 : 0);
}
function convertAttributesToExpressions(attributes) {
  const values = [];
  for (let key of Object.getOwnPropertyNames(attributes)) {
    const value = attributes[key];
    values.push(literal(key), value);
  }
  return values;
}
function createContentQueriesFunction(queries, constantPool, name) {
  const createStatements = [];
  const updateStatements = [];
  const tempAllocator = temporaryAllocator(updateStatements, TEMPORARY_NAME);
  for (const query of queries) {
    createStatements.push(importExpr(Identifiers.contentQuery).callFn([variable("dirIndex"), ...prepareQueryParams(query, constantPool)]).toStmt());
    const temporary = tempAllocator();
    const getQueryList = importExpr(Identifiers.loadQuery).callFn([]);
    const refresh = importExpr(Identifiers.queryRefresh).callFn([temporary.set(getQueryList)]);
    const updateDirective = variable(CONTEXT_NAME).prop(query.propertyName).set(query.first ? temporary.prop("first") : temporary);
    updateStatements.push(refresh.and(updateDirective).toStmt());
  }
  const contentQueriesFnName = name ? `${name}_ContentQueries` : null;
  return fn([
    new FnParam(RENDER_FLAGS, NUMBER_TYPE),
    new FnParam(CONTEXT_NAME, null),
    new FnParam("dirIndex", null)
  ], [
    renderFlagCheckIfStmt(1, createStatements),
    renderFlagCheckIfStmt(2, updateStatements)
  ], INFERRED_TYPE, null, contentQueriesFnName);
}
function stringAsType(str) {
  return expressionType(literal(str));
}
function stringMapAsLiteralExpression(map) {
  const mapValues = Object.keys(map).map((key) => {
    const value = Array.isArray(map[key]) ? map[key][0] : map[key];
    return {
      key,
      value: literal(value),
      quoted: true
    };
  });
  return literalMap(mapValues);
}
function stringArrayAsType(arr) {
  return arr.length > 0 ? expressionType(literalArr(arr.map((value) => literal(value)))) : NONE_TYPE;
}
function createBaseDirectiveTypeParams(meta) {
  const selectorForType = meta.selector !== null ? meta.selector.replace(/\n/g, "") : null;
  return [
    typeWithParameters(meta.type.type, meta.typeArgumentCount),
    selectorForType !== null ? stringAsType(selectorForType) : NONE_TYPE,
    meta.exportAs !== null ? stringArrayAsType(meta.exportAs) : NONE_TYPE,
    expressionType(getInputsTypeExpression(meta)),
    expressionType(stringMapAsLiteralExpression(meta.outputs)),
    stringArrayAsType(meta.queries.map((q) => q.propertyName))
  ];
}
function getInputsTypeExpression(meta) {
  return literalMap(Object.keys(meta.inputs).map((key) => {
    const value = meta.inputs[key];
    return {
      key,
      value: literalMap([
        { key: "alias", value: literal(value.bindingPropertyName), quoted: true },
        { key: "required", value: literal(value.required), quoted: true }
      ]),
      quoted: true
    };
  }));
}
function createDirectiveType(meta) {
  const typeParams = createBaseDirectiveTypeParams(meta);
  typeParams.push(NONE_TYPE);
  typeParams.push(expressionType(literal(meta.isStandalone)));
  typeParams.push(createHostDirectivesType(meta));
  if (meta.isSignal) {
    typeParams.push(expressionType(literal(meta.isSignal)));
  }
  return expressionType(importExpr(Identifiers.DirectiveDeclaration, typeParams));
}
function createViewQueriesFunction(viewQueries, constantPool, name) {
  const createStatements = [];
  const updateStatements = [];
  const tempAllocator = temporaryAllocator(updateStatements, TEMPORARY_NAME);
  viewQueries.forEach((query) => {
    const queryDefinition = importExpr(Identifiers.viewQuery).callFn(prepareQueryParams(query, constantPool));
    createStatements.push(queryDefinition.toStmt());
    const temporary = tempAllocator();
    const getQueryList = importExpr(Identifiers.loadQuery).callFn([]);
    const refresh = importExpr(Identifiers.queryRefresh).callFn([temporary.set(getQueryList)]);
    const updateDirective = variable(CONTEXT_NAME).prop(query.propertyName).set(query.first ? temporary.prop("first") : temporary);
    updateStatements.push(refresh.and(updateDirective).toStmt());
  });
  const viewQueryFnName = name ? `${name}_Query` : null;
  return fn([new FnParam(RENDER_FLAGS, NUMBER_TYPE), new FnParam(CONTEXT_NAME, null)], [
    renderFlagCheckIfStmt(1, createStatements),
    renderFlagCheckIfStmt(2, updateStatements)
  ], INFERRED_TYPE, null, viewQueryFnName);
}
function createHostBindingsFunction(hostBindingsMetadata, typeSourceSpan, bindingParser, constantPool, selector, name, definitionMap) {
  const bindings = bindingParser.createBoundHostProperties(hostBindingsMetadata.properties, typeSourceSpan);
  const eventBindings = bindingParser.createDirectiveHostEventAsts(hostBindingsMetadata.listeners, typeSourceSpan);
  if (USE_TEMPLATE_PIPELINE) {
    if (hostBindingsMetadata.specialAttributes.styleAttr) {
      hostBindingsMetadata.attributes["style"] = literal(hostBindingsMetadata.specialAttributes.styleAttr);
    }
    if (hostBindingsMetadata.specialAttributes.classAttr) {
      hostBindingsMetadata.attributes["class"] = literal(hostBindingsMetadata.specialAttributes.classAttr);
    }
    const hostJob = ingestHostBinding({
      componentName: name,
      properties: bindings,
      events: eventBindings,
      attributes: hostBindingsMetadata.attributes
    }, bindingParser, constantPool);
    transform(hostJob, CompilationJobKind.Host);
    definitionMap.set("hostAttrs", hostJob.root.attributes);
    const varCount = hostJob.root.vars;
    if (varCount !== null && varCount > 0) {
      definitionMap.set("hostVars", literal(varCount));
    }
    return emitHostBindingFunction(hostJob);
  }
  let bindingId = 0;
  const getNextBindingId = () => `${bindingId++}`;
  const bindingContext = variable(CONTEXT_NAME);
  const styleBuilder = new StylingBuilder(bindingContext);
  const { styleAttr, classAttr } = hostBindingsMetadata.specialAttributes;
  if (styleAttr !== void 0) {
    styleBuilder.registerStyleAttr(styleAttr);
  }
  if (classAttr !== void 0) {
    styleBuilder.registerClassAttr(classAttr);
  }
  const createInstructions = [];
  const updateInstructions = [];
  const updateVariables = [];
  const hostBindingSourceSpan = typeSourceSpan;
  if (eventBindings && eventBindings.length) {
    createInstructions.push(...createHostListeners(eventBindings, name));
  }
  const allOtherBindings = [];
  let totalHostVarsCount = 0;
  bindings && bindings.forEach((binding) => {
    const stylingInputWasSet = styleBuilder.registerInputBasedOnName(binding.name, binding.expression, hostBindingSourceSpan);
    if (stylingInputWasSet) {
      totalHostVarsCount += MIN_STYLING_BINDING_SLOTS_REQUIRED;
    } else {
      allOtherBindings.push(binding);
      totalHostVarsCount++;
    }
  });
  let valueConverter;
  const getValueConverter = () => {
    if (!valueConverter) {
      const hostVarsCountFn = (numSlots) => {
        const originalVarsCount = totalHostVarsCount;
        totalHostVarsCount += numSlots;
        return originalVarsCount;
      };
      valueConverter = new ValueConverter(
        constantPool,
        () => error("Unexpected node"),
        hostVarsCountFn,
        () => error("Unexpected pipe")
      );
    }
    return valueConverter;
  };
  const propertyBindings = [];
  const attributeBindings = [];
  const syntheticHostBindings = [];
  for (const binding of allOtherBindings) {
    const value = binding.expression.visit(getValueConverter());
    const bindingExpr = bindingFn(bindingContext, value, getNextBindingId);
    const { bindingName, instruction, isAttribute } = getBindingNameAndInstruction(binding);
    const securityContexts = bindingParser.calcPossibleSecurityContexts(selector, bindingName, isAttribute).filter((context) => context !== SecurityContext.NONE);
    let sanitizerFn = null;
    if (securityContexts.length) {
      if (securityContexts.length === 2 && securityContexts.indexOf(SecurityContext.URL) > -1 && securityContexts.indexOf(SecurityContext.RESOURCE_URL) > -1) {
        sanitizerFn = importExpr(Identifiers.sanitizeUrlOrResourceUrl);
      } else {
        sanitizerFn = resolveSanitizationFn(securityContexts[0], isAttribute);
      }
    }
    const instructionParams = [literal(bindingName), bindingExpr.currValExpr];
    if (sanitizerFn) {
      instructionParams.push(sanitizerFn);
    } else {
      if (isIframeSecuritySensitiveAttr(bindingName)) {
        instructionParams.push(importExpr(Identifiers.validateIframeAttribute));
      }
    }
    updateVariables.push(...bindingExpr.stmts);
    if (instruction === Identifiers.hostProperty) {
      propertyBindings.push(instructionParams);
    } else if (instruction === Identifiers.attribute) {
      attributeBindings.push(instructionParams);
    } else if (instruction === Identifiers.syntheticHostProperty) {
      syntheticHostBindings.push(instructionParams);
    } else {
      updateInstructions.push({ reference: instruction, paramsOrFn: instructionParams, span: null });
    }
  }
  for (const bindingParams of propertyBindings) {
    updateInstructions.push({ reference: Identifiers.hostProperty, paramsOrFn: bindingParams, span: null });
  }
  for (const bindingParams of attributeBindings) {
    updateInstructions.push({ reference: Identifiers.attribute, paramsOrFn: bindingParams, span: null });
  }
  for (const bindingParams of syntheticHostBindings) {
    updateInstructions.push({ reference: Identifiers.syntheticHostProperty, paramsOrFn: bindingParams, span: null });
  }
  const hostAttrs = convertAttributesToExpressions(hostBindingsMetadata.attributes);
  styleBuilder.assignHostAttrs(hostAttrs, definitionMap);
  if (styleBuilder.hasBindings) {
    styleBuilder.buildUpdateLevelInstructions(getValueConverter()).forEach((instruction) => {
      for (const call2 of instruction.calls) {
        totalHostVarsCount += Math.max(call2.allocateBindingSlots - MIN_STYLING_BINDING_SLOTS_REQUIRED, 0);
        const { params, stmts } = convertStylingCall(call2, bindingContext, bindingFn, getNextBindingId);
        updateVariables.push(...stmts);
        updateInstructions.push({
          reference: instruction.reference,
          paramsOrFn: params,
          span: null
        });
      }
    });
  }
  if (totalHostVarsCount) {
    definitionMap.set("hostVars", literal(totalHostVarsCount));
  }
  if (createInstructions.length > 0 || updateInstructions.length > 0) {
    const hostBindingsFnName = name ? `${name}_HostBindings` : null;
    const statements = [];
    if (createInstructions.length > 0) {
      statements.push(renderFlagCheckIfStmt(1, getInstructionStatements(createInstructions)));
    }
    if (updateInstructions.length > 0) {
      statements.push(renderFlagCheckIfStmt(2, updateVariables.concat(getInstructionStatements(updateInstructions))));
    }
    return fn([new FnParam(RENDER_FLAGS, NUMBER_TYPE), new FnParam(CONTEXT_NAME, null)], statements, INFERRED_TYPE, null, hostBindingsFnName);
  }
  return null;
}
function bindingFn(implicit, value, getNextBindingIdFn) {
  return convertPropertyBinding(null, implicit, value, getNextBindingIdFn());
}
function convertStylingCall(call2, bindingContext, bindingFn2, getNextBindingIdFn) {
  const stmts = [];
  const params = call2.params((value) => {
    const result = bindingFn2(bindingContext, value, getNextBindingIdFn);
    if (Array.isArray(result.stmts) && result.stmts.length > 0) {
      stmts.push(...result.stmts);
    }
    return result.currValExpr;
  });
  return { params, stmts };
}
function getBindingNameAndInstruction(binding) {
  let bindingName = binding.name;
  let instruction;
  const attrMatches = bindingName.match(ATTR_REGEX);
  if (attrMatches) {
    bindingName = attrMatches[1];
    instruction = Identifiers.attribute;
  } else {
    if (binding.isAnimation) {
      bindingName = prepareSyntheticPropertyName(bindingName);
      instruction = Identifiers.syntheticHostProperty;
    } else {
      instruction = Identifiers.hostProperty;
    }
  }
  return { bindingName, instruction, isAttribute: !!attrMatches };
}
function createHostListeners(eventBindings, name) {
  const listenerParams = [];
  const syntheticListenerParams = [];
  const instructions = [];
  for (const binding of eventBindings) {
    let bindingName = binding.name && sanitizeIdentifier(binding.name);
    const bindingFnName = binding.type === 1 ? prepareSyntheticListenerFunctionName(bindingName, binding.targetOrPhase) : bindingName;
    const handlerName = name && bindingName ? `${name}_${bindingFnName}_HostBindingHandler` : null;
    const params = prepareEventListenerParameters(BoundEvent.fromParsedEvent(binding), handlerName);
    if (binding.type == 1) {
      syntheticListenerParams.push(params);
    } else {
      listenerParams.push(params);
    }
  }
  for (const params of syntheticListenerParams) {
    instructions.push({ reference: Identifiers.syntheticHostListener, paramsOrFn: params, span: null });
  }
  for (const params of listenerParams) {
    instructions.push({ reference: Identifiers.listener, paramsOrFn: params, span: null });
  }
  return instructions;
}
var HOST_REG_EXP = /^(?:\[([^\]]+)\])|(?:\(([^\)]+)\))$/;
function parseHostBindings(host) {
  const attributes = {};
  const listeners = {};
  const properties = {};
  const specialAttributes = {};
  for (const key of Object.keys(host)) {
    const value = host[key];
    const matches = key.match(HOST_REG_EXP);
    if (matches === null) {
      switch (key) {
        case "class":
          if (typeof value !== "string") {
            throw new Error(`Class binding must be string`);
          }
          specialAttributes.classAttr = value;
          break;
        case "style":
          if (typeof value !== "string") {
            throw new Error(`Style binding must be string`);
          }
          specialAttributes.styleAttr = value;
          break;
        default:
          if (typeof value === "string") {
            attributes[key] = literal(value);
          } else {
            attributes[key] = value;
          }
      }
    } else if (matches[1] != null) {
      if (typeof value !== "string") {
        throw new Error(`Property binding must be string`);
      }
      properties[matches[1]] = value;
    } else if (matches[2] != null) {
      if (typeof value !== "string") {
        throw new Error(`Event binding must be string`);
      }
      listeners[matches[2]] = value;
    }
  }
  return { attributes, listeners, properties, specialAttributes };
}
function verifyHostBindings(bindings, sourceSpan) {
  const bindingParser = makeBindingParser();
  bindingParser.createDirectiveHostEventAsts(bindings.listeners, sourceSpan);
  bindingParser.createBoundHostProperties(bindings.properties, sourceSpan);
  return bindingParser.errors;
}
function compileStyles(styles, selector, hostSelector) {
  const shadowCss = new ShadowCss();
  return styles.map((style) => {
    return shadowCss.shimCssText(style, selector, hostSelector);
  });
}
function createHostDirectivesType(meta) {
  var _a2;
  if (!((_a2 = meta.hostDirectives) == null ? void 0 : _a2.length)) {
    return NONE_TYPE;
  }
  return expressionType(literalArr(meta.hostDirectives.map((hostMeta) => literalMap([
    { key: "directive", value: typeofExpr(hostMeta.directive.type), quoted: false },
    { key: "inputs", value: stringMapAsLiteralExpression(hostMeta.inputs || {}), quoted: false },
    { key: "outputs", value: stringMapAsLiteralExpression(hostMeta.outputs || {}), quoted: false }
  ]))));
}
function createHostDirectivesFeatureArg(hostDirectives) {
  const expressions = [];
  let hasForwardRef = false;
  for (const current of hostDirectives) {
    if (!current.inputs && !current.outputs) {
      expressions.push(current.directive.type);
    } else {
      const keys = [{ key: "directive", value: current.directive.type, quoted: false }];
      if (current.inputs) {
        const inputsLiteral = createHostDirectivesMappingArray(current.inputs);
        if (inputsLiteral) {
          keys.push({ key: "inputs", value: inputsLiteral, quoted: false });
        }
      }
      if (current.outputs) {
        const outputsLiteral = createHostDirectivesMappingArray(current.outputs);
        if (outputsLiteral) {
          keys.push({ key: "outputs", value: outputsLiteral, quoted: false });
        }
      }
      expressions.push(literalMap(keys));
    }
    if (current.isForwardReference) {
      hasForwardRef = true;
    }
  }
  return hasForwardRef ? new FunctionExpr([], [new ReturnStatement(literalArr(expressions))]) : literalArr(expressions);
}
function createHostDirectivesMappingArray(mapping) {
  const elements = [];
  for (const publicName in mapping) {
    if (mapping.hasOwnProperty(publicName)) {
      elements.push(literal(publicName), literal(mapping[publicName]));
    }
  }
  return elements.length > 0 ? literalArr(elements) : null;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/view/t2_binder.mjs
var R3TargetBinder = class {
  constructor(directiveMatcher) {
    this.directiveMatcher = directiveMatcher;
  }
  bind(target) {
    if (!target.template) {
      throw new Error("Binding without a template not yet supported");
    }
    const scope = Scope2.apply(target.template);
    const scopedNodeEntities = extractScopedNodeEntities(scope);
    const { directives, eagerDirectives, bindings, references } = DirectiveBinder.apply(target.template, this.directiveMatcher);
    const { expressions, symbols, nestingLevel, usedPipes, eagerPipes, deferBlocks } = TemplateBinder.applyWithScope(target.template, scope);
    return new R3BoundTarget(target, directives, eagerDirectives, bindings, references, expressions, symbols, nestingLevel, scopedNodeEntities, usedPipes, eagerPipes, deferBlocks);
  }
};
var Scope2 = class {
  constructor(parentScope, rootNode) {
    this.parentScope = parentScope;
    this.rootNode = rootNode;
    this.namedEntities = /* @__PURE__ */ new Map();
    this.childScopes = /* @__PURE__ */ new Map();
    this.isDeferred = parentScope !== null && parentScope.isDeferred ? true : rootNode instanceof DeferredBlock;
  }
  static newRootScope() {
    return new Scope2(null, null);
  }
  static apply(template2) {
    const scope = Scope2.newRootScope();
    scope.ingest(template2);
    return scope;
  }
  ingest(nodeOrNodes) {
    if (nodeOrNodes instanceof Template) {
      nodeOrNodes.variables.forEach((node) => this.visitVariable(node));
      nodeOrNodes.children.forEach((node) => node.visit(this));
    } else if (nodeOrNodes instanceof IfBlockBranch) {
      if (nodeOrNodes.expressionAlias !== null) {
        this.visitVariable(nodeOrNodes.expressionAlias);
      }
      nodeOrNodes.children.forEach((node) => node.visit(this));
    } else if (nodeOrNodes instanceof ForLoopBlock) {
      this.visitVariable(nodeOrNodes.item);
      Object.values(nodeOrNodes.contextVariables).forEach((v) => this.visitVariable(v));
      nodeOrNodes.children.forEach((node) => node.visit(this));
    } else if (nodeOrNodes instanceof SwitchBlockCase || nodeOrNodes instanceof ForLoopBlockEmpty || nodeOrNodes instanceof DeferredBlock || nodeOrNodes instanceof DeferredBlockError || nodeOrNodes instanceof DeferredBlockPlaceholder || nodeOrNodes instanceof DeferredBlockLoading) {
      nodeOrNodes.children.forEach((node) => node.visit(this));
    } else {
      nodeOrNodes.forEach((node) => node.visit(this));
    }
  }
  visitElement(element2) {
    element2.references.forEach((node) => this.visitReference(node));
    element2.children.forEach((node) => node.visit(this));
  }
  visitTemplate(template2) {
    template2.references.forEach((node) => this.visitReference(node));
    this.ingestScopedNode(template2);
  }
  visitVariable(variable2) {
    this.maybeDeclare(variable2);
  }
  visitReference(reference2) {
    this.maybeDeclare(reference2);
  }
  visitDeferredBlock(deferred) {
    var _a2, _b2, _c2;
    this.ingestScopedNode(deferred);
    (_a2 = deferred.placeholder) == null ? void 0 : _a2.visit(this);
    (_b2 = deferred.loading) == null ? void 0 : _b2.visit(this);
    (_c2 = deferred.error) == null ? void 0 : _c2.visit(this);
  }
  visitDeferredBlockPlaceholder(block) {
    this.ingestScopedNode(block);
  }
  visitDeferredBlockError(block) {
    this.ingestScopedNode(block);
  }
  visitDeferredBlockLoading(block) {
    this.ingestScopedNode(block);
  }
  visitSwitchBlock(block) {
    block.cases.forEach((node) => node.visit(this));
  }
  visitSwitchBlockCase(block) {
    this.ingestScopedNode(block);
  }
  visitForLoopBlock(block) {
    var _a2;
    this.ingestScopedNode(block);
    (_a2 = block.empty) == null ? void 0 : _a2.visit(this);
  }
  visitForLoopBlockEmpty(block) {
    this.ingestScopedNode(block);
  }
  visitIfBlock(block) {
    block.branches.forEach((node) => node.visit(this));
  }
  visitIfBlockBranch(block) {
    this.ingestScopedNode(block);
  }
  visitContent(content) {
  }
  visitBoundAttribute(attr) {
  }
  visitBoundEvent(event) {
  }
  visitBoundText(text2) {
  }
  visitText(text2) {
  }
  visitTextAttribute(attr) {
  }
  visitIcu(icu) {
  }
  visitDeferredTrigger(trigger) {
  }
  visitUnknownBlock(block) {
  }
  maybeDeclare(thing) {
    if (!this.namedEntities.has(thing.name)) {
      this.namedEntities.set(thing.name, thing);
    }
  }
  lookup(name) {
    if (this.namedEntities.has(name)) {
      return this.namedEntities.get(name);
    } else if (this.parentScope !== null) {
      return this.parentScope.lookup(name);
    } else {
      return null;
    }
  }
  getChildScope(node) {
    const res = this.childScopes.get(node);
    if (res === void 0) {
      throw new Error(`Assertion error: child scope for ${node} not found`);
    }
    return res;
  }
  ingestScopedNode(node) {
    const scope = new Scope2(this, node);
    scope.ingest(node);
    this.childScopes.set(node, scope);
  }
};
var DirectiveBinder = class {
  constructor(matcher, directives, eagerDirectives, bindings, references) {
    this.matcher = matcher;
    this.directives = directives;
    this.eagerDirectives = eagerDirectives;
    this.bindings = bindings;
    this.references = references;
    this.isInDeferBlock = false;
  }
  static apply(template2, selectorMatcher) {
    const directives = /* @__PURE__ */ new Map();
    const bindings = /* @__PURE__ */ new Map();
    const references = /* @__PURE__ */ new Map();
    const eagerDirectives = [];
    const matcher = new DirectiveBinder(selectorMatcher, directives, eagerDirectives, bindings, references);
    matcher.ingest(template2);
    return { directives, eagerDirectives, bindings, references };
  }
  ingest(template2) {
    template2.forEach((node) => node.visit(this));
  }
  visitElement(element2) {
    this.visitElementOrTemplate(element2);
  }
  visitTemplate(template2) {
    this.visitElementOrTemplate(template2);
  }
  visitElementOrTemplate(node) {
    const cssSelector = createCssSelectorFromNode(node);
    const directives = [];
    this.matcher.match(cssSelector, (_selector, results) => directives.push(...results));
    if (directives.length > 0) {
      this.directives.set(node, directives);
      if (!this.isInDeferBlock) {
        this.eagerDirectives.push(...directives);
      }
    }
    node.references.forEach((ref) => {
      let dirTarget = null;
      if (ref.value.trim() === "") {
        dirTarget = directives.find((dir) => dir.isComponent) || null;
      } else {
        dirTarget = directives.find((dir) => dir.exportAs !== null && dir.exportAs.some((value) => value === ref.value)) || null;
        if (dirTarget === null) {
          return;
        }
      }
      if (dirTarget !== null) {
        this.references.set(ref, { directive: dirTarget, node });
      } else {
        this.references.set(ref, node);
      }
    });
    const setAttributeBinding = (attribute2, ioType) => {
      const dir = directives.find((dir2) => dir2[ioType].hasBindingPropertyName(attribute2.name));
      const binding = dir !== void 0 ? dir : node;
      this.bindings.set(attribute2, binding);
    };
    node.inputs.forEach((input) => setAttributeBinding(input, "inputs"));
    node.attributes.forEach((attr) => setAttributeBinding(attr, "inputs"));
    if (node instanceof Template) {
      node.templateAttrs.forEach((attr) => setAttributeBinding(attr, "inputs"));
    }
    node.outputs.forEach((output) => setAttributeBinding(output, "outputs"));
    node.children.forEach((child) => child.visit(this));
  }
  visitDeferredBlock(deferred) {
    var _a2, _b2, _c2;
    const wasInDeferBlock = this.isInDeferBlock;
    this.isInDeferBlock = true;
    deferred.children.forEach((child) => child.visit(this));
    this.isInDeferBlock = wasInDeferBlock;
    (_a2 = deferred.placeholder) == null ? void 0 : _a2.visit(this);
    (_b2 = deferred.loading) == null ? void 0 : _b2.visit(this);
    (_c2 = deferred.error) == null ? void 0 : _c2.visit(this);
  }
  visitDeferredBlockPlaceholder(block) {
    block.children.forEach((child) => child.visit(this));
  }
  visitDeferredBlockError(block) {
    block.children.forEach((child) => child.visit(this));
  }
  visitDeferredBlockLoading(block) {
    block.children.forEach((child) => child.visit(this));
  }
  visitSwitchBlock(block) {
    block.cases.forEach((node) => node.visit(this));
  }
  visitSwitchBlockCase(block) {
    block.children.forEach((node) => node.visit(this));
  }
  visitForLoopBlock(block) {
    var _a2;
    block.item.visit(this);
    Object.values(block.contextVariables).forEach((v) => v.visit(this));
    block.children.forEach((node) => node.visit(this));
    (_a2 = block.empty) == null ? void 0 : _a2.visit(this);
  }
  visitForLoopBlockEmpty(block) {
    block.children.forEach((node) => node.visit(this));
  }
  visitIfBlock(block) {
    block.branches.forEach((node) => node.visit(this));
  }
  visitIfBlockBranch(block) {
    var _a2;
    (_a2 = block.expressionAlias) == null ? void 0 : _a2.visit(this);
    block.children.forEach((node) => node.visit(this));
  }
  visitContent(content) {
  }
  visitVariable(variable2) {
  }
  visitReference(reference2) {
  }
  visitTextAttribute(attribute2) {
  }
  visitBoundAttribute(attribute2) {
  }
  visitBoundEvent(attribute2) {
  }
  visitBoundAttributeOrEvent(node) {
  }
  visitText(text2) {
  }
  visitBoundText(text2) {
  }
  visitIcu(icu) {
  }
  visitDeferredTrigger(trigger) {
  }
  visitUnknownBlock(block) {
  }
};
var TemplateBinder = class extends RecursiveAstVisitor {
  constructor(bindings, symbols, usedPipes, eagerPipes, deferBlocks, nestingLevel, scope, rootNode, level) {
    super();
    this.bindings = bindings;
    this.symbols = symbols;
    this.usedPipes = usedPipes;
    this.eagerPipes = eagerPipes;
    this.deferBlocks = deferBlocks;
    this.nestingLevel = nestingLevel;
    this.scope = scope;
    this.rootNode = rootNode;
    this.level = level;
    this.visitNode = (node) => node.visit(this);
  }
  visit(node, context) {
    if (node instanceof AST) {
      node.visit(this, context);
    } else {
      node.visit(this);
    }
  }
  static applyWithScope(nodes, scope) {
    const expressions = /* @__PURE__ */ new Map();
    const symbols = /* @__PURE__ */ new Map();
    const nestingLevel = /* @__PURE__ */ new Map();
    const usedPipes = /* @__PURE__ */ new Set();
    const eagerPipes = /* @__PURE__ */ new Set();
    const template2 = nodes instanceof Template ? nodes : null;
    const deferBlocks = /* @__PURE__ */ new Set();
    const binder = new TemplateBinder(expressions, symbols, usedPipes, eagerPipes, deferBlocks, nestingLevel, scope, template2, 0);
    binder.ingest(nodes);
    return { expressions, symbols, nestingLevel, usedPipes, eagerPipes, deferBlocks };
  }
  ingest(nodeOrNodes) {
    if (nodeOrNodes instanceof Template) {
      nodeOrNodes.variables.forEach(this.visitNode);
      nodeOrNodes.children.forEach(this.visitNode);
      this.nestingLevel.set(nodeOrNodes, this.level);
    } else if (nodeOrNodes instanceof IfBlockBranch) {
      if (nodeOrNodes.expressionAlias !== null) {
        this.visitNode(nodeOrNodes.expressionAlias);
      }
      nodeOrNodes.children.forEach(this.visitNode);
      this.nestingLevel.set(nodeOrNodes, this.level);
    } else if (nodeOrNodes instanceof ForLoopBlock) {
      this.visitNode(nodeOrNodes.item);
      Object.values(nodeOrNodes.contextVariables).forEach((v) => this.visitNode(v));
      nodeOrNodes.trackBy.visit(this);
      nodeOrNodes.children.forEach(this.visitNode);
      this.nestingLevel.set(nodeOrNodes, this.level);
    } else if (nodeOrNodes instanceof SwitchBlockCase || nodeOrNodes instanceof ForLoopBlockEmpty || nodeOrNodes instanceof DeferredBlock || nodeOrNodes instanceof DeferredBlockError || nodeOrNodes instanceof DeferredBlockPlaceholder || nodeOrNodes instanceof DeferredBlockLoading) {
      nodeOrNodes.children.forEach((node) => node.visit(this));
      this.nestingLevel.set(nodeOrNodes, this.level);
    } else {
      nodeOrNodes.forEach(this.visitNode);
    }
  }
  visitElement(element2) {
    element2.inputs.forEach(this.visitNode);
    element2.outputs.forEach(this.visitNode);
    element2.children.forEach(this.visitNode);
    element2.references.forEach(this.visitNode);
  }
  visitTemplate(template2) {
    template2.inputs.forEach(this.visitNode);
    template2.outputs.forEach(this.visitNode);
    template2.templateAttrs.forEach(this.visitNode);
    template2.references.forEach(this.visitNode);
    this.ingestScopedNode(template2);
  }
  visitVariable(variable2) {
    if (this.rootNode !== null) {
      this.symbols.set(variable2, this.rootNode);
    }
  }
  visitReference(reference2) {
    if (this.rootNode !== null) {
      this.symbols.set(reference2, this.rootNode);
    }
  }
  visitText(text2) {
  }
  visitContent(content) {
  }
  visitTextAttribute(attribute2) {
  }
  visitUnknownBlock(block) {
  }
  visitDeferredTrigger() {
  }
  visitIcu(icu) {
    Object.keys(icu.vars).forEach((key) => icu.vars[key].visit(this));
    Object.keys(icu.placeholders).forEach((key) => icu.placeholders[key].visit(this));
  }
  visitBoundAttribute(attribute2) {
    attribute2.value.visit(this);
  }
  visitBoundEvent(event) {
    event.handler.visit(this);
  }
  visitDeferredBlock(deferred) {
    var _a2, _b2;
    this.deferBlocks.add(deferred);
    this.ingestScopedNode(deferred);
    (_a2 = deferred.triggers.when) == null ? void 0 : _a2.value.visit(this);
    (_b2 = deferred.prefetchTriggers.when) == null ? void 0 : _b2.value.visit(this);
    deferred.placeholder && this.visitNode(deferred.placeholder);
    deferred.loading && this.visitNode(deferred.loading);
    deferred.error && this.visitNode(deferred.error);
  }
  visitDeferredBlockPlaceholder(block) {
    this.ingestScopedNode(block);
  }
  visitDeferredBlockError(block) {
    this.ingestScopedNode(block);
  }
  visitDeferredBlockLoading(block) {
    this.ingestScopedNode(block);
  }
  visitSwitchBlock(block) {
    block.expression.visit(this);
    block.cases.forEach(this.visitNode);
  }
  visitSwitchBlockCase(block) {
    var _a2;
    (_a2 = block.expression) == null ? void 0 : _a2.visit(this);
    this.ingestScopedNode(block);
  }
  visitForLoopBlock(block) {
    var _a2;
    block.expression.visit(this);
    this.ingestScopedNode(block);
    (_a2 = block.empty) == null ? void 0 : _a2.visit(this);
  }
  visitForLoopBlockEmpty(block) {
    this.ingestScopedNode(block);
  }
  visitIfBlock(block) {
    block.branches.forEach((node) => node.visit(this));
  }
  visitIfBlockBranch(block) {
    var _a2;
    (_a2 = block.expression) == null ? void 0 : _a2.visit(this);
    this.ingestScopedNode(block);
  }
  visitBoundText(text2) {
    text2.value.visit(this);
  }
  visitPipe(ast, context) {
    this.usedPipes.add(ast.name);
    if (!this.scope.isDeferred) {
      this.eagerPipes.add(ast.name);
    }
    return super.visitPipe(ast, context);
  }
  visitPropertyRead(ast, context) {
    this.maybeMap(ast, ast.name);
    return super.visitPropertyRead(ast, context);
  }
  visitSafePropertyRead(ast, context) {
    this.maybeMap(ast, ast.name);
    return super.visitSafePropertyRead(ast, context);
  }
  visitPropertyWrite(ast, context) {
    this.maybeMap(ast, ast.name);
    return super.visitPropertyWrite(ast, context);
  }
  ingestScopedNode(node) {
    const childScope = this.scope.getChildScope(node);
    const binder = new TemplateBinder(this.bindings, this.symbols, this.usedPipes, this.eagerPipes, this.deferBlocks, this.nestingLevel, childScope, node, this.level + 1);
    binder.ingest(node);
  }
  maybeMap(ast, name) {
    if (!(ast.receiver instanceof ImplicitReceiver)) {
      return;
    }
    let target = this.scope.lookup(name);
    if (target !== null) {
      this.bindings.set(ast, target);
    }
  }
};
var R3BoundTarget = class {
  constructor(target, directives, eagerDirectives, bindings, references, exprTargets, symbols, nestingLevel, scopedNodeEntities, usedPipes, eagerPipes, deferredBlocks) {
    this.target = target;
    this.directives = directives;
    this.eagerDirectives = eagerDirectives;
    this.bindings = bindings;
    this.references = references;
    this.exprTargets = exprTargets;
    this.symbols = symbols;
    this.nestingLevel = nestingLevel;
    this.scopedNodeEntities = scopedNodeEntities;
    this.usedPipes = usedPipes;
    this.eagerPipes = eagerPipes;
    this.deferredBlocks = deferredBlocks;
  }
  getEntitiesInScope(node) {
    var _a2;
    return (_a2 = this.scopedNodeEntities.get(node)) != null ? _a2 : /* @__PURE__ */ new Set();
  }
  getDirectivesOfNode(node) {
    return this.directives.get(node) || null;
  }
  getReferenceTarget(ref) {
    return this.references.get(ref) || null;
  }
  getConsumerOfBinding(binding) {
    return this.bindings.get(binding) || null;
  }
  getExpressionTarget(expr) {
    return this.exprTargets.get(expr) || null;
  }
  getDefinitionNodeOfSymbol(symbol) {
    return this.symbols.get(symbol) || null;
  }
  getNestingLevel(node) {
    return this.nestingLevel.get(node) || 0;
  }
  getUsedDirectives() {
    const set = /* @__PURE__ */ new Set();
    this.directives.forEach((dirs) => dirs.forEach((dir) => set.add(dir)));
    return Array.from(set.values());
  }
  getEagerlyUsedDirectives() {
    const set = new Set(this.eagerDirectives);
    return Array.from(set.values());
  }
  getUsedPipes() {
    return Array.from(this.usedPipes);
  }
  getEagerlyUsedPipes() {
    return Array.from(this.eagerPipes);
  }
  getDeferBlocks() {
    return Array.from(this.deferredBlocks);
  }
  getDeferredTriggerTarget(block, trigger) {
    if (!(trigger instanceof InteractionDeferredTrigger) && !(trigger instanceof ViewportDeferredTrigger) && !(trigger instanceof HoverDeferredTrigger)) {
      return null;
    }
    const name = trigger.reference;
    if (name === null) {
      let trigger2 = null;
      if (block.placeholder !== null) {
        for (const child of block.placeholder.children) {
          if (child instanceof Comment) {
            continue;
          }
          if (trigger2 !== null) {
            return null;
          }
          if (child instanceof Element) {
            trigger2 = child;
          }
        }
      }
      return trigger2;
    }
    const outsideRef = this.findEntityInScope(block, name);
    if (outsideRef instanceof Reference && this.getDefinitionNodeOfSymbol(outsideRef) !== block) {
      const target = this.getReferenceTarget(outsideRef);
      if (target !== null) {
        return this.referenceTargetToElement(target);
      }
    }
    if (block.placeholder !== null) {
      const refInPlaceholder = this.findEntityInScope(block.placeholder, name);
      const targetInPlaceholder = refInPlaceholder instanceof Reference ? this.getReferenceTarget(refInPlaceholder) : null;
      if (targetInPlaceholder !== null) {
        return this.referenceTargetToElement(targetInPlaceholder);
      }
    }
    return null;
  }
  findEntityInScope(rootNode, name) {
    const entities = this.getEntitiesInScope(rootNode);
    for (const entitity of entities) {
      if (entitity.name === name) {
        return entitity;
      }
    }
    return null;
  }
  referenceTargetToElement(target) {
    if (target instanceof Element) {
      return target;
    }
    if (target instanceof Template) {
      return null;
    }
    return this.referenceTargetToElement(target.node);
  }
};
function extractScopedNodeEntities(rootScope) {
  const entityMap = /* @__PURE__ */ new Map();
  function extractScopeEntities(scope) {
    if (entityMap.has(scope.rootNode)) {
      return entityMap.get(scope.rootNode);
    }
    const currentEntities = scope.namedEntities;
    let entities;
    if (scope.parentScope !== null) {
      entities = new Map([...extractScopeEntities(scope.parentScope), ...currentEntities]);
    } else {
      entities = new Map(currentEntities);
    }
    entityMap.set(scope.rootNode, entities);
    return entities;
  }
  const scopesToProcess = [rootScope];
  while (scopesToProcess.length > 0) {
    const scope = scopesToProcess.pop();
    for (const childScope of scope.childScopes.values()) {
      scopesToProcess.push(childScope);
    }
    extractScopeEntities(scope);
  }
  const templateEntities = /* @__PURE__ */ new Map();
  for (const [template2, entities] of entityMap) {
    templateEntities.set(template2, new Set(entities.values()));
  }
  return templateEntities;
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/resource_loader.mjs
var ResourceLoader = class {
};

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/jit_compiler_facade.mjs
var CompilerFacadeImpl = class {
  constructor(jitEvaluator = new JitEvaluator()) {
    this.jitEvaluator = jitEvaluator;
    this.FactoryTarget = FactoryTarget;
    this.ResourceLoader = ResourceLoader;
    this.elementSchemaRegistry = new DomElementSchemaRegistry();
  }
  compilePipe(angularCoreEnv, sourceMapUrl, facade) {
    const metadata = {
      name: facade.name,
      type: wrapReference(facade.type),
      typeArgumentCount: 0,
      deps: null,
      pipeName: facade.pipeName,
      pure: facade.pure,
      isStandalone: facade.isStandalone
    };
    const res = compilePipeFromMetadata(metadata);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compilePipeDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const meta = convertDeclarePipeFacadeToMetadata(declaration);
    const res = compilePipeFromMetadata(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileInjectable(angularCoreEnv, sourceMapUrl, facade) {
    var _a2;
    const { expression, statements } = compileInjectable(
      {
        name: facade.name,
        type: wrapReference(facade.type),
        typeArgumentCount: facade.typeArgumentCount,
        providedIn: computeProvidedIn(facade.providedIn),
        useClass: convertToProviderExpression(facade, "useClass"),
        useFactory: wrapExpression(facade, "useFactory"),
        useValue: convertToProviderExpression(facade, "useValue"),
        useExisting: convertToProviderExpression(facade, "useExisting"),
        deps: (_a2 = facade.deps) == null ? void 0 : _a2.map(convertR3DependencyMetadata)
      },
      true
    );
    return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, statements);
  }
  compileInjectableDeclaration(angularCoreEnv, sourceMapUrl, facade) {
    var _a2;
    const { expression, statements } = compileInjectable(
      {
        name: facade.type.name,
        type: wrapReference(facade.type),
        typeArgumentCount: 0,
        providedIn: computeProvidedIn(facade.providedIn),
        useClass: convertToProviderExpression(facade, "useClass"),
        useFactory: wrapExpression(facade, "useFactory"),
        useValue: convertToProviderExpression(facade, "useValue"),
        useExisting: convertToProviderExpression(facade, "useExisting"),
        deps: (_a2 = facade.deps) == null ? void 0 : _a2.map(convertR3DeclareDependencyMetadata)
      },
      true
    );
    return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, statements);
  }
  compileInjector(angularCoreEnv, sourceMapUrl, facade) {
    const meta = {
      name: facade.name,
      type: wrapReference(facade.type),
      providers: facade.providers && facade.providers.length > 0 ? new WrappedNodeExpr(facade.providers) : null,
      imports: facade.imports.map((i) => new WrappedNodeExpr(i))
    };
    const res = compileInjector(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileInjectorDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const meta = convertDeclareInjectorFacadeToMetadata(declaration);
    const res = compileInjector(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileNgModule(angularCoreEnv, sourceMapUrl, facade) {
    const meta = {
      kind: R3NgModuleMetadataKind.Global,
      type: wrapReference(facade.type),
      bootstrap: facade.bootstrap.map(wrapReference),
      declarations: facade.declarations.map(wrapReference),
      publicDeclarationTypes: null,
      imports: facade.imports.map(wrapReference),
      includeImportTypes: true,
      exports: facade.exports.map(wrapReference),
      selectorScopeMode: R3SelectorScopeMode.Inline,
      containsForwardDecls: false,
      schemas: facade.schemas ? facade.schemas.map(wrapReference) : null,
      id: facade.id ? new WrappedNodeExpr(facade.id) : null
    };
    const res = compileNgModule(meta);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileNgModuleDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const expression = compileNgModuleDeclarationExpression(declaration);
    return this.jitExpression(expression, angularCoreEnv, sourceMapUrl, []);
  }
  compileDirective(angularCoreEnv, sourceMapUrl, facade) {
    const meta = convertDirectiveFacadeToMetadata(facade);
    return this.compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta);
  }
  compileDirectiveDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const typeSourceSpan = this.createParseSourceSpan("Directive", declaration.type.name, sourceMapUrl);
    const meta = convertDeclareDirectiveFacadeToMetadata(declaration, typeSourceSpan);
    return this.compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta);
  }
  compileDirectiveFromMeta(angularCoreEnv, sourceMapUrl, meta) {
    const constantPool = new ConstantPool();
    const bindingParser = makeBindingParser();
    const res = compileDirectiveFromMetadata(meta, constantPool, bindingParser);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, constantPool.statements);
  }
  compileComponent(angularCoreEnv, sourceMapUrl, facade) {
    var _a2;
    const { template: template2, interpolation, deferBlocks } = parseJitTemplate(facade.template, facade.name, sourceMapUrl, facade.preserveWhitespaces, facade.interpolation);
    const meta = __spreadProps(__spreadValues(__spreadValues({}, facade), convertDirectiveFacadeToMetadata(facade)), {
      selector: facade.selector || this.elementSchemaRegistry.getDefaultComponentElementName(),
      template: template2,
      declarations: facade.declarations.map(convertDeclarationFacadeToMetadata),
      declarationListEmitMode: 0,
      deferBlocks,
      deferrableDeclToImportDecl: /* @__PURE__ */ new Map(),
      styles: [...facade.styles, ...template2.styles],
      encapsulation: facade.encapsulation,
      interpolation,
      changeDetection: (_a2 = facade.changeDetection) != null ? _a2 : null,
      animations: facade.animations != null ? new WrappedNodeExpr(facade.animations) : null,
      viewProviders: facade.viewProviders != null ? new WrappedNodeExpr(facade.viewProviders) : null,
      relativeContextFilePath: "",
      i18nUseExternalIds: true
    });
    const jitExpressionSourceMap = `ng:///${facade.name}.js`;
    return this.compileComponentFromMeta(angularCoreEnv, jitExpressionSourceMap, meta);
  }
  compileComponentDeclaration(angularCoreEnv, sourceMapUrl, declaration) {
    const typeSourceSpan = this.createParseSourceSpan("Component", declaration.type.name, sourceMapUrl);
    const meta = convertDeclareComponentFacadeToMetadata(declaration, typeSourceSpan, sourceMapUrl);
    return this.compileComponentFromMeta(angularCoreEnv, sourceMapUrl, meta);
  }
  compileComponentFromMeta(angularCoreEnv, sourceMapUrl, meta) {
    const constantPool = new ConstantPool();
    const bindingParser = makeBindingParser(meta.interpolation);
    const res = compileComponentFromMetadata(meta, constantPool, bindingParser);
    return this.jitExpression(res.expression, angularCoreEnv, sourceMapUrl, constantPool.statements);
  }
  compileFactory(angularCoreEnv, sourceMapUrl, meta) {
    const factoryRes = compileFactoryFunction({
      name: meta.name,
      type: wrapReference(meta.type),
      typeArgumentCount: meta.typeArgumentCount,
      deps: convertR3DependencyMetadataArray(meta.deps),
      target: meta.target
    });
    return this.jitExpression(factoryRes.expression, angularCoreEnv, sourceMapUrl, factoryRes.statements);
  }
  compileFactoryDeclaration(angularCoreEnv, sourceMapUrl, meta) {
    const factoryRes = compileFactoryFunction({
      name: meta.type.name,
      type: wrapReference(meta.type),
      typeArgumentCount: 0,
      deps: Array.isArray(meta.deps) ? meta.deps.map(convertR3DeclareDependencyMetadata) : meta.deps,
      target: meta.target
    });
    return this.jitExpression(factoryRes.expression, angularCoreEnv, sourceMapUrl, factoryRes.statements);
  }
  createParseSourceSpan(kind, typeName, sourceUrl) {
    return r3JitTypeSourceSpan(kind, typeName, sourceUrl);
  }
  jitExpression(def, context, sourceUrl, preStatements) {
    const statements = [
      ...preStatements,
      new DeclareVarStmt("$def", def, void 0, StmtModifier.Exported)
    ];
    const res = this.jitEvaluator.evaluateStatements(sourceUrl, statements, new R3JitReflector(context), true);
    return res["$def"];
  }
};
function convertToR3QueryMetadata(facade) {
  return __spreadProps(__spreadValues({}, facade), {
    predicate: convertQueryPredicate(facade.predicate),
    read: facade.read ? new WrappedNodeExpr(facade.read) : null,
    static: facade.static,
    emitDistinctChangesOnly: facade.emitDistinctChangesOnly
  });
}
function convertQueryDeclarationToMetadata(declaration) {
  var _a2, _b2, _c2, _d2;
  return {
    propertyName: declaration.propertyName,
    first: (_a2 = declaration.first) != null ? _a2 : false,
    predicate: convertQueryPredicate(declaration.predicate),
    descendants: (_b2 = declaration.descendants) != null ? _b2 : false,
    read: declaration.read ? new WrappedNodeExpr(declaration.read) : null,
    static: (_c2 = declaration.static) != null ? _c2 : false,
    emitDistinctChangesOnly: (_d2 = declaration.emitDistinctChangesOnly) != null ? _d2 : true
  };
}
function convertQueryPredicate(predicate) {
  return Array.isArray(predicate) ? predicate : createMayBeForwardRefExpression(new WrappedNodeExpr(predicate), 1);
}
function convertDirectiveFacadeToMetadata(facade) {
  const inputsFromMetadata = parseInputsArray(facade.inputs || []);
  const outputsFromMetadata = parseMappingStringArray(facade.outputs || []);
  const propMetadata = facade.propMetadata;
  const inputsFromType = {};
  const outputsFromType = {};
  for (const field in propMetadata) {
    if (propMetadata.hasOwnProperty(field)) {
      propMetadata[field].forEach((ann) => {
        if (isInput(ann)) {
          inputsFromType[field] = {
            bindingPropertyName: ann.alias || field,
            classPropertyName: field,
            required: ann.required || false,
            transformFunction: ann.transform != null ? new WrappedNodeExpr(ann.transform) : null
          };
        } else if (isOutput(ann)) {
          outputsFromType[field] = ann.alias || field;
        }
      });
    }
  }
  return __spreadProps(__spreadValues({}, facade), {
    typeArgumentCount: 0,
    typeSourceSpan: facade.typeSourceSpan,
    type: wrapReference(facade.type),
    deps: null,
    host: extractHostBindings(facade.propMetadata, facade.typeSourceSpan, facade.host),
    inputs: __spreadValues(__spreadValues({}, inputsFromMetadata), inputsFromType),
    outputs: __spreadValues(__spreadValues({}, outputsFromMetadata), outputsFromType),
    queries: facade.queries.map(convertToR3QueryMetadata),
    providers: facade.providers != null ? new WrappedNodeExpr(facade.providers) : null,
    viewQueries: facade.viewQueries.map(convertToR3QueryMetadata),
    fullInheritance: false,
    hostDirectives: convertHostDirectivesToMetadata(facade)
  });
}
function convertDeclareDirectiveFacadeToMetadata(declaration, typeSourceSpan) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
  return {
    name: declaration.type.name,
    type: wrapReference(declaration.type),
    typeSourceSpan,
    selector: (_a2 = declaration.selector) != null ? _a2 : null,
    inputs: declaration.inputs ? inputsMappingToInputMetadata(declaration.inputs) : {},
    outputs: (_b2 = declaration.outputs) != null ? _b2 : {},
    host: convertHostDeclarationToMetadata(declaration.host),
    queries: ((_c2 = declaration.queries) != null ? _c2 : []).map(convertQueryDeclarationToMetadata),
    viewQueries: ((_d2 = declaration.viewQueries) != null ? _d2 : []).map(convertQueryDeclarationToMetadata),
    providers: declaration.providers !== void 0 ? new WrappedNodeExpr(declaration.providers) : null,
    exportAs: (_e2 = declaration.exportAs) != null ? _e2 : null,
    usesInheritance: (_f2 = declaration.usesInheritance) != null ? _f2 : false,
    lifecycle: { usesOnChanges: (_g = declaration.usesOnChanges) != null ? _g : false },
    deps: null,
    typeArgumentCount: 0,
    fullInheritance: false,
    isStandalone: (_h = declaration.isStandalone) != null ? _h : false,
    isSignal: (_i = declaration.isSignal) != null ? _i : false,
    hostDirectives: convertHostDirectivesToMetadata(declaration)
  };
}
function convertHostDeclarationToMetadata(host = {}) {
  var _a2, _b2, _c2;
  return {
    attributes: convertOpaqueValuesToExpressions((_a2 = host.attributes) != null ? _a2 : {}),
    listeners: (_b2 = host.listeners) != null ? _b2 : {},
    properties: (_c2 = host.properties) != null ? _c2 : {},
    specialAttributes: {
      classAttr: host.classAttribute,
      styleAttr: host.styleAttribute
    }
  };
}
function convertHostDirectivesToMetadata(metadata) {
  var _a2;
  if ((_a2 = metadata.hostDirectives) == null ? void 0 : _a2.length) {
    return metadata.hostDirectives.map((hostDirective) => {
      return typeof hostDirective === "function" ? {
        directive: wrapReference(hostDirective),
        inputs: null,
        outputs: null,
        isForwardReference: false
      } : {
        directive: wrapReference(hostDirective.directive),
        isForwardReference: false,
        inputs: hostDirective.inputs ? parseMappingStringArray(hostDirective.inputs) : null,
        outputs: hostDirective.outputs ? parseMappingStringArray(hostDirective.outputs) : null
      };
    });
  }
  return null;
}
function convertOpaqueValuesToExpressions(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    result[key] = new WrappedNodeExpr(obj[key]);
  }
  return result;
}
function convertDeclareComponentFacadeToMetadata(decl, typeSourceSpan, sourceMapUrl) {
  var _a2, _b2, _c2, _d2;
  const { template: template2, interpolation, deferBlocks } = parseJitTemplate(decl.template, decl.type.name, sourceMapUrl, (_a2 = decl.preserveWhitespaces) != null ? _a2 : false, decl.interpolation);
  const declarations = [];
  if (decl.dependencies) {
    for (const innerDep of decl.dependencies) {
      switch (innerDep.kind) {
        case "directive":
        case "component":
          declarations.push(convertDirectiveDeclarationToMetadata(innerDep));
          break;
        case "pipe":
          declarations.push(convertPipeDeclarationToMetadata(innerDep));
          break;
      }
    }
  } else if (decl.components || decl.directives || decl.pipes) {
    decl.components && declarations.push(...decl.components.map((dir) => convertDirectiveDeclarationToMetadata(dir, true)));
    decl.directives && declarations.push(...decl.directives.map((dir) => convertDirectiveDeclarationToMetadata(dir)));
    decl.pipes && declarations.push(...convertPipeMapToMetadata(decl.pipes));
  }
  return __spreadProps(__spreadValues({}, convertDeclareDirectiveFacadeToMetadata(decl, typeSourceSpan)), {
    template: template2,
    styles: (_b2 = decl.styles) != null ? _b2 : [],
    declarations,
    viewProviders: decl.viewProviders !== void 0 ? new WrappedNodeExpr(decl.viewProviders) : null,
    animations: decl.animations !== void 0 ? new WrappedNodeExpr(decl.animations) : null,
    deferBlocks,
    deferrableDeclToImportDecl: /* @__PURE__ */ new Map(),
    changeDetection: (_c2 = decl.changeDetection) != null ? _c2 : ChangeDetectionStrategy.Default,
    encapsulation: (_d2 = decl.encapsulation) != null ? _d2 : ViewEncapsulation.Emulated,
    interpolation,
    declarationListEmitMode: 2,
    relativeContextFilePath: "",
    i18nUseExternalIds: true
  });
}
function convertDeclarationFacadeToMetadata(declaration) {
  return __spreadProps(__spreadValues({}, declaration), {
    type: new WrappedNodeExpr(declaration.type)
  });
}
function convertDirectiveDeclarationToMetadata(declaration, isComponent = null) {
  var _a2, _b2, _c2;
  return {
    kind: R3TemplateDependencyKind.Directive,
    isComponent: isComponent || declaration.kind === "component",
    selector: declaration.selector,
    type: new WrappedNodeExpr(declaration.type),
    inputs: (_a2 = declaration.inputs) != null ? _a2 : [],
    outputs: (_b2 = declaration.outputs) != null ? _b2 : [],
    exportAs: (_c2 = declaration.exportAs) != null ? _c2 : null
  };
}
function convertPipeMapToMetadata(pipes) {
  if (!pipes) {
    return [];
  }
  return Object.keys(pipes).map((name) => {
    return {
      kind: R3TemplateDependencyKind.Pipe,
      name,
      type: new WrappedNodeExpr(pipes[name])
    };
  });
}
function convertPipeDeclarationToMetadata(pipe2) {
  return {
    kind: R3TemplateDependencyKind.Pipe,
    name: pipe2.name,
    type: new WrappedNodeExpr(pipe2.type)
  };
}
function parseJitTemplate(template2, typeName, sourceMapUrl, preserveWhitespaces, interpolation) {
  const interpolationConfig = interpolation ? InterpolationConfig.fromArray(interpolation) : DEFAULT_INTERPOLATION_CONFIG;
  const parsed = parseTemplate(template2, sourceMapUrl, { preserveWhitespaces, interpolationConfig });
  if (parsed.errors !== null) {
    const errors = parsed.errors.map((err) => err.toString()).join(", ");
    throw new Error(`Errors during JIT compilation of template for ${typeName}: ${errors}`);
  }
  const binder = new R3TargetBinder(new SelectorMatcher());
  const boundTarget = binder.bind({ template: parsed.nodes });
  return {
    template: parsed,
    interpolation: interpolationConfig,
    deferBlocks: createR3DeferredMetadata(boundTarget)
  };
}
function convertToProviderExpression(obj, property2) {
  if (obj.hasOwnProperty(property2)) {
    return createMayBeForwardRefExpression(new WrappedNodeExpr(obj[property2]), 0);
  } else {
    return void 0;
  }
}
function wrapExpression(obj, property2) {
  if (obj.hasOwnProperty(property2)) {
    return new WrappedNodeExpr(obj[property2]);
  } else {
    return void 0;
  }
}
function computeProvidedIn(providedIn) {
  const expression = typeof providedIn === "function" ? new WrappedNodeExpr(providedIn) : new LiteralExpr(providedIn != null ? providedIn : null);
  return createMayBeForwardRefExpression(expression, 0);
}
function convertR3DependencyMetadataArray(facades) {
  return facades == null ? null : facades.map(convertR3DependencyMetadata);
}
function convertR3DependencyMetadata(facade) {
  const isAttributeDep = facade.attribute != null;
  const rawToken = facade.token === null ? null : new WrappedNodeExpr(facade.token);
  const token = isAttributeDep ? new WrappedNodeExpr(facade.attribute) : rawToken;
  return createR3DependencyMetadata(token, isAttributeDep, facade.host, facade.optional, facade.self, facade.skipSelf);
}
function convertR3DeclareDependencyMetadata(facade) {
  var _a2, _b2, _c2, _d2, _e2;
  const isAttributeDep = (_a2 = facade.attribute) != null ? _a2 : false;
  const token = facade.token === null ? null : new WrappedNodeExpr(facade.token);
  return createR3DependencyMetadata(token, isAttributeDep, (_b2 = facade.host) != null ? _b2 : false, (_c2 = facade.optional) != null ? _c2 : false, (_d2 = facade.self) != null ? _d2 : false, (_e2 = facade.skipSelf) != null ? _e2 : false);
}
function createR3DependencyMetadata(token, isAttributeDep, host, optional, self, skipSelf) {
  const attributeNameType = isAttributeDep ? literal("unknown") : null;
  return { token, attributeNameType, host, optional, self, skipSelf };
}
function createR3DeferredMetadata(boundTarget) {
  const deferredBlocks = boundTarget.getDeferBlocks();
  const meta = /* @__PURE__ */ new Map();
  for (const block of deferredBlocks) {
    const triggerElements = /* @__PURE__ */ new Map();
    resolveDeferTriggers(block, block.triggers, boundTarget, triggerElements);
    resolveDeferTriggers(block, block.prefetchTriggers, boundTarget, triggerElements);
    meta.set(block, { deps: [], triggerElements });
  }
  return meta;
}
function resolveDeferTriggers(block, triggers, boundTarget, triggerElements) {
  Object.keys(triggers).forEach((key) => {
    const trigger = triggers[key];
    triggerElements.set(trigger, boundTarget.getDeferredTriggerTarget(block, trigger));
  });
}
function extractHostBindings(propMetadata, sourceSpan, host) {
  const bindings = parseHostBindings(host || {});
  const errors = verifyHostBindings(bindings, sourceSpan);
  if (errors.length) {
    throw new Error(errors.map((error2) => error2.msg).join("\n"));
  }
  for (const field in propMetadata) {
    if (propMetadata.hasOwnProperty(field)) {
      propMetadata[field].forEach((ann) => {
        if (isHostBinding(ann)) {
          bindings.properties[ann.hostPropertyName || field] = getSafePropertyAccessString("this", field);
        } else if (isHostListener(ann)) {
          bindings.listeners[ann.eventName || field] = `${field}(${(ann.args || []).join(",")})`;
        }
      });
    }
  }
  return bindings;
}
function isHostBinding(value) {
  return value.ngMetadataName === "HostBinding";
}
function isHostListener(value) {
  return value.ngMetadataName === "HostListener";
}
function isInput(value) {
  return value.ngMetadataName === "Input";
}
function isOutput(value) {
  return value.ngMetadataName === "Output";
}
function inputsMappingToInputMetadata(inputs) {
  return Object.keys(inputs).reduce((result, key) => {
    const value = inputs[key];
    if (typeof value === "string") {
      result[key] = {
        bindingPropertyName: value,
        classPropertyName: value,
        transformFunction: null,
        required: false
      };
    } else {
      result[key] = {
        bindingPropertyName: value[0],
        classPropertyName: value[1],
        transformFunction: value[2] ? new WrappedNodeExpr(value[2]) : null,
        required: false
      };
    }
    return result;
  }, {});
}
function parseInputsArray(values) {
  return values.reduce((results, value) => {
    if (typeof value === "string") {
      const [bindingPropertyName, classPropertyName] = parseMappingString(value);
      results[classPropertyName] = {
        bindingPropertyName,
        classPropertyName,
        required: false,
        transformFunction: null
      };
    } else {
      results[value.name] = {
        bindingPropertyName: value.alias || value.name,
        classPropertyName: value.name,
        required: value.required || false,
        transformFunction: value.transform != null ? new WrappedNodeExpr(value.transform) : null
      };
    }
    return results;
  }, {});
}
function parseMappingStringArray(values) {
  return values.reduce((results, value) => {
    const [alias, fieldName] = parseMappingString(value);
    results[fieldName] = alias;
    return results;
  }, {});
}
function parseMappingString(value) {
  const [fieldName, bindingPropertyName] = value.split(":", 2).map((str) => str.trim());
  return [bindingPropertyName != null ? bindingPropertyName : fieldName, fieldName];
}
function convertDeclarePipeFacadeToMetadata(declaration) {
  var _a2, _b2;
  return {
    name: declaration.type.name,
    type: wrapReference(declaration.type),
    typeArgumentCount: 0,
    pipeName: declaration.name,
    deps: null,
    pure: (_a2 = declaration.pure) != null ? _a2 : true,
    isStandalone: (_b2 = declaration.isStandalone) != null ? _b2 : false
  };
}
function convertDeclareInjectorFacadeToMetadata(declaration) {
  return {
    name: declaration.type.name,
    type: wrapReference(declaration.type),
    providers: declaration.providers !== void 0 && declaration.providers.length > 0 ? new WrappedNodeExpr(declaration.providers) : null,
    imports: declaration.imports !== void 0 ? declaration.imports.map((i) => new WrappedNodeExpr(i)) : []
  };
}
function publishFacade(global) {
  const ng = global.ng || (global.ng = {});
  ng.\u0275compilerFacade = new CompilerFacadeImpl();
}

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/version.mjs
var VERSION2 = new Version("17.0.6");

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/i18n/extractor_merger.mjs
var _VisitorMode;
(function(_VisitorMode2) {
  _VisitorMode2[_VisitorMode2["Extract"] = 0] = "Extract";
  _VisitorMode2[_VisitorMode2["Merge"] = 1] = "Merge";
})(_VisitorMode || (_VisitorMode = {}));

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/ml_parser/xml_tags.mjs
var XmlTagDefinition = class {
  constructor() {
    this.closedByParent = false;
    this.implicitNamespacePrefix = null;
    this.isVoid = false;
    this.ignoreFirstLf = false;
    this.canSelfClose = true;
    this.preventNamespaceInheritance = false;
  }
  requireExtraParent(currentParent) {
    return false;
  }
  isClosedByChild(name) {
    return false;
  }
  getContentType() {
    return TagContentType.PARSABLE_DATA;
  }
};
var _TAG_DEFINITION = new XmlTagDefinition();

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/render3/partial/api.mjs
var FactoryTarget2;
(function(FactoryTarget3) {
  FactoryTarget3[FactoryTarget3["Directive"] = 0] = "Directive";
  FactoryTarget3[FactoryTarget3["Component"] = 1] = "Component";
  FactoryTarget3[FactoryTarget3["Injectable"] = 2] = "Injectable";
  FactoryTarget3[FactoryTarget3["Pipe"] = 3] = "Pipe";
  FactoryTarget3[FactoryTarget3["NgModule"] = 4] = "NgModule";
})(FactoryTarget2 || (FactoryTarget2 = {}));

// bazel-out/darwin-fastbuild/bin/packages/compiler/src/compiler.mjs
publishFacade(_global);

// bazel-out/darwin-fastbuild/bin/packages/core/schematics/migrations/block-template-entities/util.mjs
var import_path2 = require("path");
var import_typescript3 = __toESM(require("typescript"), 1);
var REPLACEMENTS2 = {
  "@": "&#64;",
  "}": "&#125;"
};
var CONTROL_FLOW_CHARS_PATTERN = /@|}/;
var AnalyzedFile = class {
  constructor() {
    __publicField(this, "ranges", []);
  }
  getSortedRanges() {
    return this.ranges.slice().sort(([aStart], [bStart]) => bStart - aStart);
  }
  static addRange(path2, analyzedFiles, range) {
    let analysis = analyzedFiles.get(path2);
    if (!analysis) {
      analysis = new AnalyzedFile();
      analyzedFiles.set(path2, analysis);
    }
    const duplicate = analysis.ranges.find((current) => current[0] === range[0] && current[1] === range[1]);
    if (!duplicate) {
      analysis.ranges.push(range);
    }
  }
};
function analyze(sourceFile, analyzedFiles) {
  forEachClass(sourceFile, (node) => {
    var _a2;
    const decorator = (_a2 = import_typescript3.default.getDecorators(node)) == null ? void 0 : _a2.find((dec) => {
      return import_typescript3.default.isCallExpression(dec.expression) && import_typescript3.default.isIdentifier(dec.expression.expression) && dec.expression.expression.text === "Component";
    });
    const metadata = decorator && decorator.expression.arguments.length > 0 && import_typescript3.default.isObjectLiteralExpression(decorator.expression.arguments[0]) ? decorator.expression.arguments[0] : null;
    if (!metadata) {
      return;
    }
    for (const prop of metadata.properties) {
      if (!import_typescript3.default.isPropertyAssignment(prop) || !import_typescript3.default.isStringLiteralLike(prop.initializer) || !import_typescript3.default.isIdentifier(prop.name) && !import_typescript3.default.isStringLiteralLike(prop.name)) {
        continue;
      }
      switch (prop.name.text) {
        case "template":
          AnalyzedFile.addRange(sourceFile.fileName, analyzedFiles, [prop.initializer.getStart() + 1, prop.initializer.getEnd() - 1]);
          break;
        case "templateUrl":
          const path2 = (0, import_path2.join)((0, import_path2.dirname)(sourceFile.fileName), prop.initializer.text);
          AnalyzedFile.addRange(path2, analyzedFiles, [0]);
          break;
      }
    }
  });
}
function migrateTemplate(template2) {
  if (!CONTROL_FLOW_CHARS_PATTERN.test(template2)) {
    return null;
  }
  let rootNodes = null;
  try {
    const parsed = new HtmlParser().parse(template2, "", {
      tokenizeExpansionForms: true,
      tokenizeBlocks: false
    });
    if (parsed.errors.length === 0) {
      rootNodes = parsed.rootNodes;
    }
  } catch (e) {
  }
  if (rootNodes === null) {
    return null;
  }
  let result = template2;
  const visitor = new TextRangeCollector();
  visitAll2(visitor, rootNodes);
  const sortedRanges = visitor.textRanges.sort(([aStart], [bStart]) => bStart - aStart);
  for (const [start, end] of sortedRanges) {
    const text2 = result.slice(start, end);
    let replaced = "";
    for (const char of text2) {
      replaced += REPLACEMENTS2[char] || char;
    }
    result = result.slice(0, start) + replaced + result.slice(end);
  }
  return result;
}
var TextRangeCollector = class extends RecursiveVisitor {
  constructor() {
    super(...arguments);
    __publicField(this, "textRanges", []);
  }
  visitText(text2) {
    for (const token of text2.tokens) {
      if (token.type === 5) {
        this.textRanges.push([token.sourceSpan.start.offset, token.sourceSpan.end.offset]);
      }
    }
    super.visitText(text2, null);
  }
};
function forEachClass(sourceFile, callback) {
  sourceFile.forEachChild(function walk(node) {
    if (import_typescript3.default.isClassDeclaration(node)) {
      callback(node);
    }
    node.forEachChild(walk);
  });
}

// bazel-out/darwin-fastbuild/bin/packages/core/schematics/migrations/block-template-entities/index.mjs
function block_template_entities_default() {
  return (tree) => __async(this, null, function* () {
    const { buildPaths, testPaths } = yield getProjectTsConfigPaths(tree);
    const basePath = process.cwd();
    const allPaths = [...buildPaths, ...testPaths];
    if (!allPaths.length) {
      throw new import_schematics.SchematicsException("Could not find any tsconfig file. Cannot run the block syntax template entities migration.");
    }
    for (const tsconfigPath of allPaths) {
      runBlockTemplateEntitiesMigration(tree, tsconfigPath, basePath);
    }
  });
}
function runBlockTemplateEntitiesMigration(tree, tsconfigPath, basePath) {
  const program = createMigrationProgram(tree, tsconfigPath, basePath);
  const sourceFiles = program.getSourceFiles().filter((sourceFile) => canMigrateFile(basePath, sourceFile, program));
  const analysis = /* @__PURE__ */ new Map();
  for (const sourceFile of sourceFiles) {
    analyze(sourceFile, analysis);
  }
  for (const [path2, file] of analysis) {
    const ranges = file.getSortedRanges();
    const relativePath = (0, import_path3.relative)(basePath, path2);
    if (!tree.exists(relativePath)) {
      continue;
    }
    const content = tree.readText(relativePath);
    const update = tree.beginUpdate(relativePath);
    for (const [start, end] of ranges) {
      const template2 = content.slice(start, end);
      const length = (end != null ? end : content.length) - start;
      const migrated = migrateTemplate(template2);
      if (migrated !== null) {
        update.remove(start, length);
        update.insertLeft(start, migrated);
      }
    }
    tree.commitUpdate(update);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/**
 *
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//# sourceMappingURL=bundle.js.map
