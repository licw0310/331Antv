import "@antv/x6-vue-shape";
import { Graph, Shape, Addon, FunctionExt } from "@antv/x6";
// 拖拽生成四边形或者圆形
// 垂直泳道
Graph.registerNode(
  "lane-y",
  {
    zIndex: 3,
    inherit: "rect",
    width: 130,
    height: 300,
    label: "垂直泳道",
    markup: [
      {
        tagName: "rect",
        selector: "body"
      },
      {
        tagName: "rect",
        selector: "name-rect"
      },
      {
        tagName: "text",
        selector: "name-text"
      }
    ],
    attrs: {
      body: {
        fill: "rgba(255,255,255,0)",
        stroke: "#000000",
        strokeWidth: 1
      },
      "name-rect": {
        refWidth: "100%",
        height: 30,
        fill: "#FFFFFF",
        stroke: "#000000",
        strokeWidth: 1
      },
      "name-text": {
        ref: "name-rect",
        refY: 0.5,
        refX: 0.5,
        textAnchor: "middle",
        fontWeight: "bold",
        fill: "#000000",
        fontSize: 12
      }
    }
  },
  true
);
// 水平泳道
Graph.registerNode(
  "lane-x",
  {
    zIndex: 1,
    inherit: "rect",
    height: 130,
    width: 300,
    label: "水平泳道",
    markup: [
      {
        tagName: "rect",
        selector: "body"
      },
      {
        tagName: "rect",
        selector: "name-rect"
      },
      {
        tagName: "text",
        selector: "name-text"
      }
    ],
    attrs: {
      body: {
        fill: "rgba(255,255,255,0)",
        stroke: "#000000",
        strokeWidth: 1
      },
      "name-rect": {
        width: 30,
        refHeight: "100%",
        fill: "#FFFFFF",
        stroke: "#000000",
        strokeWidth: 1
      },
      "name-text": {
        ref: "name-rect",
        refY: 0.5,
        refX: 0.5,
        textAnchor: "middle",
        transform: "rotate(-90)",
        fontWeight: "bold",
        fill: "#000000",
        fontSize: 12
      }
    }
  },
  true
);
export const startDragToGraph = (graph, type, e) => {
  let node = null;
  if (type === "Rect") {
    node = graph.createNode({
      width: 100,
      height: 60,
      zIndex: 30,
      attrs: {
        label: {
          text: "正方形节点",
          fill: "#000000",
          fontSize: 14,
          textWrap: {
            width: -10,
            height: -10,
            ellipsis: true
          }
        },
        body: {
          stroke: "#000000",
          strokeWidth: 1,
          fill: "#ffffff"
        }
      },
      ports: ports
    });
  } else if (type === "Circle") {
    node = graph.createNode({
      shape: "ellipse",
      width: 100,
      height: 100,
      attrs: {
        label: {
          text: "圆形节点",
          fill: "#000000",
          fontSize: 14,
          textWrap: {
            width: -20,
            height: -10,
            ellipsis: true
          }
        },
        body: {
          stroke: "#000000",
          strokeWidth: 1,
          fill: "#ffffff"
        }
      },
      ports: ports
    });
  } else if (type === "polygon") {
    node = graph.createNode({
      shape: "polygon",
      x: 40,
      y: 40,
      width: 120,
      height: 120,
      attrs: {
        label: {
          text: "条件节点",
          fill: "#000000",
          fontSize: 14,
          textWrap: {
            width: -50,
            height: "70%",
            ellipsis: true
          }
        },
        body: {
          fill: "#ffffff",
          stroke: "#000000",
          refPoints: "0,10 10,0 20,10 10,20",
          strokeWidth: 1
        }
      },
      ports: ports
    });
  } else if (type === "lane-y") {
    node = graph.createNode({
      shape: "lane-y",
      width: 200,
      height: 500,
      position: {
        x: 60,
        y: 60
      },
      label: "泳道名"
    });
  } else if (type === "lane-x") {
    node = graph.createNode({
      shape: "lane-x",
      width: 500,
      height: 200,
      position: {
        x: 60,
        y: 60
      },
      label: "泳道名"
    });
  }
  const dnd = new Addon.Dnd({ target: graph });
  dnd.start(node, e);
};
const ports = {
  groups: {
    // 输入链接桩群组定义
    top: {
      position: "top",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#2D8CF0",
          strokeWidth: 2,
          fill: "#fff"
        }
      }
    },
    // 输出链接桩群组定义
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#2D8CF0",
          strokeWidth: 2,
          fill: "#fff"
        }
      }
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#2D8CF0",
          strokeWidth: 2,
          fill: "#fff"
        }
      }
    },
    right: {
      position: "right",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#2D8CF0",
          strokeWidth: 2,
          fill: "#fff"
        }
      }
    }
  },
  items: [
    {
      id: "port1",
      group: "top"
    },
    {
      id: "port2",
      group: "bottom"
    },
    {
      id: "port3",
      group: "left"
    },
    {
      id: "port4",
      group: "right"
    }
  ]
};
