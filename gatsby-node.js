const path = require(`path`)
const { xor } = require('lodash')

const { niceUrl } = require('./utils/node.js')

// Build live site

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

// Develop Only
//foodapp-2c83e.firebaseapp.com/__/auth/handler

// https: exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
//   actions.setWebpackConfig({
//     node: { fs: 'empty' },
//     externals: getConfig().externals.concat(function(
//       context,
//       request,
//       callback
//     ) {
//       const regex = /^firebase(\/(.+))?/
//       // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
//       if (regex.test(request)) {
//         return callback(null, 'umd ' + request)
//       }
//       callback()
//     }),
//   })
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      const x = niceUrl(`${node.handle}`)
      createPage({
        path: `/product/${x}`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    })
  })
}
// exports.createNode = () => {
//   if (node.internal.type === `File`) {
//     fs.readFile(node.absolutePath, undefined, (_err, buf) => {
//       createNodeField({ node, name: `contents`, value: buf.toString() })
//     })
//   }
// }
