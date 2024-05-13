import { hierarchy, create, tree } from "d3";

// 准备数据
const data = {
  name: "A",
  children: [
    {
      name: "B",
      children: [{ name: "D" }, { name: "E" }],
    },
    {
      name: "C",
      children: [{ name: "F" }, { name: "G" }],
    },
  ],
};

// 创建画布
let width = 400,
  height = 200;
const svg = create("svg").attr("width", width).attr("height", height);
const g = svg.append("g").attr("transform", `translate(40,30)`);

// 创建树布局
const root = hierarchy(data);
const treeLayout = tree().size([width - 80, height - 60]);
treeLayout(root);

// 绘制连线
let link = g
  .selectAll(".link")
  .data(root.links())
  .join("path")
  .attr("class", "link")
  .attr(
    "d",
    (d) => `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
  )
  .attr("fill", "none")
  .attr("stroke", "black");

// 绘制节点
let node = g
  .selectAll(".node")
  .data(root.descendants())
  .join("g")
  .attr("class", "node")
  .attr("transform", (d) => `translate(${d.x},${d.y})`);

node
  .append("circle")
  .attr("r", 20)
  .attr("fill", "white")
  .attr("stroke", "black");
node
  .append("text")
  .attr('x', 0)
  .attr("y", 6)
  .attr("text-anchor", "middle")
  .text((d) => d.data.name);

// 将画布添加到容器元素
document.getElementById("root")?.append(svg.node());
