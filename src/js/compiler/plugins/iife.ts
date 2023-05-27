export default function() {
  return {
    name: 'iife',
    generateBundle(outputOptions, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        const file = bundle[fileName]
        if (fileName.slice(-3) === '.js' && 'code' in file) {
          file.code = `(() => {\n${file.code}})()`
        }
      })
    }
  }
}
