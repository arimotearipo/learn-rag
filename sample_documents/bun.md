## Bun

Bun is a JavaScript runtime, package manager, test runner and bundler built from scratch using the Zig programming language. It was designed by Jarred Sumner as a drop-in replacement for Node.js. Bun uses WebKit's JavaScriptCore as the JavaScript engine, unlike Node.js and Deno, which both use V8.

It supports bundling, minifying, server-side rendering (Svelte, Nuxt.js, Vite). Bundling refers to the process of combining multiple files and assets like JavaScript, CSS, and HTML into a single file, or a smaller number of files, to reduce the number of server requests and enhance performance. Minifying is a technique of compressing these files by removing unnecessary characters (like whitespace, comments, etc.) without affecting their functionality, further optimizing website loading times. Bun provides an API to decide whether to preserve some readability by e.g. keeping whitespace.

The runtime supports foreign function interface (FFI), SQLite3, TLS 1.3, and DNS resolution. It also comes bundled in with common tools like file editing, HTTP servers, Websocket, and hashing.

The official Bun 1.0 was released on September 8, 2023.

Since Bun 1.1 the runtime supports Windows 10 and later (along with Linux and macOS). It also introduced a cross-platform Bun Shell for running some Bash commands without extra dependencies.