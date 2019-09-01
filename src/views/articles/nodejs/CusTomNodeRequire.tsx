import React, { PureComponent, ReactChild } from 'react'
import { Bowen, SyntaxHighlighter } from '@/components'

const refs = [
  {
    key: 1,
    text: 'require() 源码解读',
    to: 'http://www.ruanyifeng.com/blog/2015/05/require.html'
  },
  {
    key: 2,
    text: 'CommonJS规范',
    to: 'https://javascript.ruanyifeng.com/nodejs/module.html'
  },
  {
    key: 3,
    text: 'node-github',
    to: 'https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js'
  },
  {
    key: 4,
    text: 'nodejs模块源码require问题',
    to: 'https://cnodejs.org/topic/58bcbe8bea21217a4486d01f#58bccc267872ea0864fee3d3'
  },
  {
    key: 5,
    text: 'Node.js源码分析之require',
    to: 'https://www.ghosind.com/2019/02/17/require'
  },
  {
    key: 6,
    text: 'Node.js v12.9.1 Documentation',
    to: 'https://nodejs.org/api/modules.html'
  },
  {
    key: 7,
    text: 'Node.js Require源码粗读',
    to: 'https://juejin.im/post/5ab4d3d151882521d6578298'
  },
  {
    key: 8,
    text: 'ECMAScript 6 入门 - Module 的加载实现',
    to: 'https://juejin.im/post/5ab4d3d151882521d6578298'
  }
]

const tocs = [
  { id: 1, text: '引言' },
  { id: 2, text: '基础实现' },
  { id: 3, text: 'Module 构造函数' },
  { id: 4, text: '加载规则' },
  { id: 5, text: '循环加载' },
  { id: 6, text: '参考资料' }
]

const CustomModule = `
const path = require('padth');
const fs = require('fs');

function $require(id) {
  // 获取文件的路径
  const filename = path.resolve(__dirname, id);
  const dirname = path.basename(filename);
  // 读取文件中的内容
  const oriCode = fs.readFileSync(filename, 'utf8');
  // 包装代码，营造私有环境
  const module = { exports: {} };
  const exports = module.exports;
  const code = \`(function($require, module, exports, __dirname, __filename) {
    \${oriCode}
  })($require, module, exports, dirname, filename)\`;
  // 执行代码
  eval(code);
  // 暴露对象给外部
  return module.exports;
}
`.trim()

const CustomModuleCache = `
const path = require('padth');
const fs = require('fs');

// 用于缓存
$require.cache = {};

function $require(id) {
  // 获取文件的路径
  const filename = path.resolve(__dirname, id);
  const dirname = path.basename(filename);

  // 先读取缓存，如果存在则直接返回缓存中的 exports 对象
  if ($require.cache[filename]) {
    return $require.cache[filename].exports;
  }

  // 读取文件中的内容
  const oriCode = fs.readFileSync(filename, 'utf8');
  // 包装代码，营造私有环境
  const module = { exports: {} };
  const exports = module.exports;
  const code = \`(function($require, module, exports, __dirname, __filename) {
    \${oriCode}
  })($require, module, exports, dirname, filename)\`;
  // 执行代码
  eval(code);

  // 第一次执行时，缓存执行的结果
  $require.cache[filename] = module;

  // 暴露对象给外部
  return module.exports;
}
`.trim()

const Module = `
function Module(id, parent) {
  this.id = id; // 模块的唯一标识符，通常为其绝对路径
  this.exports = {}; // 暴露给外部的对象
  this.parent = parent; // 调用该模块的模块
  this.filename = null; // 模块的绝对路径
  this.loaded = false; // 当前模块是否加载完成
  this.children = []; // 调用的模块
}

Module._cache = Object.create(null);
`.trim()

const require = `
// Loads a module at the given file path. Returns that module's \`exports\` property.
Module.prototype.require = function() {
  // ...
  return Module._load(id, this, /* isMain */ false);
};
`.trim()

const priLoad = `
// Check the cache for the requested file.
Module._load = function(request, parent, isMain) {
 //...
 // 计算文件的绝对路径
 const filename = Module._resolveFilename(request, parent, isMain);

 // 判断缓存中是否存在该模块，如果存在直接返回
 const cachedModule = Module._cache[filename];
 if (cachedModule !== undefined) {
   return cachedModule.exports;
 }

 // 处理内置模块
 const mod = loadNativeModule(filename, request, experimentalModules);
 if (mod && mod.canBeRequiredByUsers) return mod.exports;

 // 生成模块实例，加入缓存
 const module = new Module(filename, parent);
 Module._cache[filename] = module;

 // 加载模块
 module.load(filename);

 // 输出模块的 exports 属性
 return module.exports;
};
`.trim()

const load = `
// Given a file name, pass it to the proper extension handler.
Module.prototype.load = function(filename) {
  this.filename = filename;
  this.paths = Module._nodeModulePaths(path.dirname(filename));

  // 获取扩展名，调用对应的加载方法
  const extension = findLongestRegisteredExtension(filename);
  Module._extensions[extension](this, filename);
  this.loaded = true;
  // ...
};
`.trim()

const JavaScript = `
// Native extension for .js
Module._extensions['.js'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  module._compile(content, filename);
};
`.trim()

const compile = `
Module.wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};

Module.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});',
];

Module.prototype._compile = function(content, filename) {
  content = stripShebang(content);

  var wrapper = Module.wrap(content);

  var compiledWrapper = vm.runInThisContext(wrapper, {
    filename: filename,
    lineOffset: 0,
    displayErrors: true,
  });

  // ...
};
`.trim()

const rule = `
（1）如果 X 是内置模块。
    a. 直接返回该模块；
    b. 停止。

（2）如果 X 是以 / 开头的，则将 Y 设置为文件系统根目录。

（3）如果 X 是以 ./ 或 / 或 ../ 开头。
    a. 根据 Y 和 X 拼接为绝对路径（Y + X）；
    b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行；
        1. 如果 X 是一个文件，则加载该文件的内容作为 JavaScript 文本返回。
        2. 如果 X.js 是一个文件，则加载该文件的内容作为 JavaScript 文本返回。
        3. 如果 X.json 是一个文件，则加载该文件的内容并解析为 JavaScript 对象返回。
        4. 如果 X.node 是一个文件则作为 binary addon 进行加载。
    c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行；
        1. 如果 X 目录下存在 package.json 文件，则读取该文件中 main 字段的值，根据 X+main 的新路径当作文件重复上一个步骤 b 进行查找，
           如果不存在则以此按下所示进行加载。
            i. 如果 X+main/index.js 是一个文件，则加载该文件的内容作为 JavaScript 文本返回。
            ii. 如果 X+main/index.json 是一个文件，则加载该文件的内容并解析为 JavaScript 对象返回。
            iii. 如果 X+main/index.node 是一个文件则作为 binary addon 进行加载。
        2. 如果上述步骤还未找到，则进行以下步骤。
            i. 如果 X/index.js 是一个文件，则加载该文件的内容作为 JavaScript 文本返回。
            ii. 如果 X/index.json 是一个文件，则加载该文件的内容并解析为 JavaScript 对象返回。
            iii. 如果 X/index.node 是一个文件则作为 binary addon 进行加载。

（4）如果 X 不带路径。
    a. 根据 X 所在的父模块，依次往根目录确定 X 可能的安装目录。 
    b. 依次在每个目录下的 node_modules 目录下，将 X 当成文件名或目录名加载。

（5）抛出 "not found"。
`.trim()

const example = `
// a.js
console.log('a starting');
exports.done = false;
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done');

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.done = %j', a.done);
exports.done = true;
console.log('b done');

// main.js
console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);

$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
`.trim()

const othLoad = `
// 生成模块实例，加入缓存
 const module = new Module(filename, parent);
 Module._cache[filename] = module;

 // 加载模块
 module.load(filename);
`.trim()

class CusTomNodeRequire extends PureComponent<{}, {}> {
  public render(): ReactChild {
    return (
      <Bowen tocs={tocs}>
        <Bowen.Header
          title="理清 Nodejs 中的 require 函数"
          description="Nodejs 遵循 CommonJS 规范，通过内置的 require 函数加载各个模块，因此理解 require 函数的实现对学习 Nodejs 至关重要。"
        />
        <Bowen.Content>
          <Bowen.Title id="CusTomNodeRequire-1" text="引言" />
          <p>
            在 ES6 出现之前 <code>JavaScript</code>{' '}
            本身并没有模块的概念，不支持封闭的作用域和依赖管理，这对于开发大型项目来说十分头疼。所以，社区制定了一些模块加载方案来解决这个问题，其中就包括
            CommonJS
            规范，在此规范中每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。2009
            年，<code>Nodejs</code> 项目诞生，所有模块一律采用 CommonJS 规范，并通过内置的{' '}
            <code>require</code> 函数来加载模块文件。
          </p>
          <p>
            对于前端开发的同学，对于 <code>require</code>{' '}
            这个函数肯定不会陌生，它的基本功能就是，读取并执行一个 <code>JavaScript</code>{' '}
            文件，然后返回该模块的 <code>exports</code>{' '}
            对象。如果没有发现指定模块，会报错。下面先简单的列举一下它的工作流程。
          </p>
          <ul className="decimal">
            <li>接受一个类型为字符串的参数，根据该参数查找文件，如果未找到将会报错。</li>
            <li>读取文件，并返回文件中的代码。</li>
            <li>处理并执行代码。</li>
            <li>
              模块的 <code>exports</code> 对象。
            </li>
          </ul>
          <Bowen.Title id="CusTomNodeRequire-2" text="基础实现" />
          <p>根据上面总结的步骤我们很容易写出下面的代码。</p>
          <SyntaxHighlighter>{CustomModule}</SyntaxHighlighter>
          <p>
            根据平时使用的经验，Nodejs{' '}
            会对加载的结果进行一次缓存，再次加载时就会得到缓存中的结果，接下来简单的实现一下这个功能。
          </p>
          <p>
            在 <code>$require</code>{' '}
            对象上首先声明一个空对象用来进行缓存，在加载模块时同样先获取请求模块的绝对路径，然后判读缓存中是否包含此模块，有则直接返回缓存中该模块暴露的{' '}
            <code>exports</code> 对象，否则继续执行，最后把执行结果，也就是 <code>module</code>{' '}
            对象，以绝对路径为 <code>key</code> 存储起来。
          </p>
          <SyntaxHighlighter>{CustomModuleCache}</SyntaxHighlighter>
          <p>
            这个 <code>$require</code> 函数的实现特别简单，但却能很好的描述 Nodejs 中{' '}
            <code>require</code> 函数的基本原理。
          </p>
          <Bowen.Title id="CusTomNodeRequire-3" text="Module 构造函数" />
          <p>Nodejs 定义了一个构造函数 Module，所有的模块都是 Module 的实例。</p>
          <SyntaxHighlighter>{Module}</SyntaxHighlighter>
          <p>
            每个模块实例都有一个 <code>require</code> 方法，定义在 Module 对象的原型上面，因此除了{' '}
            REPL 环境外，只有在模块内部才能使用 <code>require</code>{' '}
            方法，该方法的关键就在于内部调用了 Module 对象上的 <code>_load</code> 方法。
          </p>
          <SyntaxHighlighter>{require}</SyntaxHighlighter>
          <p>
            Module 模块的 <code>_load</code>{' '}
            方法的主要检查缓存中是否已经存在该模块，若已存在则直接从缓存中获取；否则，则判断该模块是否为
            Native 模块，当模块为 Native 模块时，调用 <code>NativeModule.require</code>{' '}
            进行方法加载，如果不是将创建一个新的 Module 实例，然后将其加入到缓存中，并调用 Module
            模块的 <code>load</code> 方法加载模块，并根据是否存在错误进行相应的处理。
          </p>
          <p>
            简化示意的 <code>_load</code> 函数如下所示。
          </p>
          <SyntaxHighlighter>{priLoad}</SyntaxHighlighter>
          <p>
            Module 模块的 <code>load</code>{' '}
            方法主要根据需要加载的文件的扩展名判断并选取对应的加载方法，除此以外它还包括了部分实验性模块的处理。
          </p>
          <SyntaxHighlighter>{load}</SyntaxHighlighter>
          <p>
            文件的加载方法存放在 Module 模块的 <code>_extensions</code> 属性中，在该文件中主要定义了{' '}
            <code>.js</code>，<code>.json</code>，<code>.node</code>，<code>.mjs</code>{' '}
            四种文件的加载方法。
            <code>.js</code> 与 <code>.json</code> 文件的加载皆为调用 <code>fs</code> 模块的{' '}
            <code>readFileSync</code> 方法读取文件内容后进行对应的处理，而对于 <code>.node</code>{' '}
            文件，则使用了 <code>process</code> 的 <code>dlopen</code> 方法加载 C++ 扩展。
          </p>
          <p>以对 JavaScript 文件的处理为例，简化示意如下所示。</p>
          <SyntaxHighlighter>{JavaScript}</SyntaxHighlighter>
          <p>
            在加载 JavaScript 文件时，读取文件内容后将调用 Module 模块的 <code>_compile</code>{' '}
            方法，对读取到的文件内容进行一定的处理。
          </p>
          <SyntaxHighlighter>{compile}</SyntaxHighlighter>
          <p>
            在这个方法中的处理，主要就像我们一开始创建的简易版的 <code>$require</code>{' '}
            函数一样。提供相应的变量给文件中的代码，然后置于正确的作用域下执行，如果出现异常则抛出异常。
          </p>
          <p>
            至此，便完成了使用 <code>require</code>{' '}
            加载模块的过程，其主要内容就是在判断缓存后读取文件内容，然后使用 VM 模块运行。
          </p>
          <Bowen.Title id="CusTomNodeRequire-4" text="加载规则" />
          <p>当在 Y 路径下通过 require(X) 加载模块时，会经过以下处理步骤。</p>
          <SyntaxHighlighter>{rule}</SyntaxHighlighter>
          <Bowen.Title id="CusTomNodeRequire-5" text="循环加载" />
          <p>
            通常，“循环加载”表示存在强耦合，比如在模块 A 中依赖模块 B 中的内容，而 B 又需要 A{' '}
            中的结果。如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。
          </p>
          <p>
            然而，在大型项目中这中情况很难避免，CommonJS 模块的重要特性是加载时执行，即脚本代码通过{' '}
            <code>require</code>{' '}
            加载的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
          </p>
          <p>接下来看一下官方的例子。</p>
          <SyntaxHighlighter>{example}</SyntaxHighlighter>
          <p>
            当执行到 <code>a.js</code> 时，会先暴露出 <code>done</code> 变量，然后去加载{' '}
            <code>b.js</code>，并将执行权交给 <code>b.js</code>。当 <code>b.js</code>{' '}
            执行到第二行时就会去请求 <code>a.js</code>。但是此时不会将执行权交换，而是去缓存中读取{' '}
            <code>a.js</code> 对应对象的 <code>exports</code> 属性取值。
          </p>
          <p>
            虽然 <code>a.js</code> 还未执行完，但是在加载完 <code>a.js</code>{' '}
            之前，其实已经将其对应的 <code>module</code> 对象保存在缓存中，可见上面分析的{' '}
            <code>Module._load</code> 方法。
          </p>
          <SyntaxHighlighter>{othLoad}</SyntaxHighlighter>
          <p>
            因此，结果会是先执行完 <code>b.js</code>，然后再执行完 <code>a.js</code>，最后执行完{' '}
            <code>main.js</code>。由此可见 CommonJS
            模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，加上
            CommonJS 输入的是被输出值的拷贝，不是引用，所以前后同一者可能会有差异。
          </p>
          <Bowen.Title id="CusTomNodeRequire-6" text="参考资料" />
          <Bowen.Reference refs={refs} />
        </Bowen.Content>
        <Bowen.Footer />
      </Bowen>
    )
  }
}

export default CusTomNodeRequire
