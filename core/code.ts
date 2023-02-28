import { generateBricksTree } from "./src/grouping";
import { generateStyledBricksNode } from "./src/StyledBricksNode";

figma.showUI(__html__);

// restore previous window size
figma.clientStorage.getAsync("size").then((size) => {
  if (size) figma.ui.resize(size.w, size.h);
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === "generate-bricks-nodes") {
    const result = await generateBricksTree(figma.currentPage.selection);
    const nodes = await Promise.all(result.map(generateStyledBricksNode));
    console.log(nodes);
    figma.ui.postMessage({
      type: "render-nodes",
      nodes,
    });
  }
  if (msg.type === "resize") {
    figma.ui.resize(msg.size.w, msg.size.h);
    figma.clientStorage.setAsync("size", msg.size).catch((err) => {}); // save size
  }
};
