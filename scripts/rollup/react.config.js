import { getPackageJSON, resolvePkgPath } from "./utils"
import { getBaseRollupPlugins } from "./utils"
import generatePackageJson from 'rollup-plugin-generate-package-json'

// 从package.json中取到name和module字段
const { name, modules } = getPackageJSON('react')
// react包的路径
const pkgPath = resolvePkgPath(name)
// react产物路径
const pkgDistPath = resolvePkgPath(name, true)


export default [
  {
    input: `${pkgPath}/index.ts`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      format: 'umd'
    },
    plugins: [...getBaseRollupPlugins(), generatePackageJson({
      inputFolder: pkgPath,
      outputFolder: pkgDistPath,
      baseContents: ({ name, description, version }) => ({
        name,
        description,
        version,
        main: 'index.js'
      })
    })]
  },
  // jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      },
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd'
      },
    ],
    plugins: getBaseRollupPlugins()
  },
]