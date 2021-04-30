class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("MyPlugin", compilation => {
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
        console.log();
      }
    });
  }
}
