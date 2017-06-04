const crypto = require(`crypto`)
const readmeParser = require('readme-parser')
module.exports = async function onNodeCreate({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators,
}) {

  const { createNode, createParentChildLink } = boundActionCreators

  console.log(node, createNode, loadNodeContent)
  // We are only concerned with readmes
  // console.log(node.name)
  if (node.name !== `README`) {
    return
  }

  // We only care about markdown content
  if (node.internal.mediaType !== `text/x-markdown`) {
    return
  }

  const content = await loadNodeContent(node)
  const data = readmeParser(content)


  const objStr = JSON.stringify(data)
  const contentDigest = crypto
    .createHash(`md5`)
    .update(objStr)
    .digest(`hex`)

  const readmeNode = {
    ...data,
    id: `${node.id} >>> readme`,
    children: [],
    parent: node.id,
    internal: {
      contentDigest,
      type: `Readme`,
      mediaType: `application/json`,
      content: objStr,
    },
  }

  // Add path to the markdown file path
  if (node.internal.type === `File`) {
    readmeNode.fileAbsolutePath = node.absolutePath
  }
  createParentChildLink({ parent: node, child: readmeNode })
  createNode(readmeNode)
}
