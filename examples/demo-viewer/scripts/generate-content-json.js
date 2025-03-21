const fs = require("fs");
const path = require("path");

const config = {
  agentic_chat: ["agent.py", "page.tsx", "style.css"],
  agentic_generative_ui: ["agent.py", "page.tsx", "style.css"],
  human_in_the_loop: ["agent.py", "page.tsx", "style.css"],
  shared_state: ["README.md", "agent.py", "page.tsx", "style.css"],
  predictive_state_updates: ["agent.py", "page.tsx", "style.css"],
  tool_based_generative_ui: ["agent.py", "page.tsx", "style.css"],
  crew_enterprise: [
    "restaurant_finder_crew/src/config/__init__.py",
    "restaurant_finder_crew/src/config/agents.yaml",
    "restaurant_finder_crew/src/config/tasks.yaml",
    "restaurant_finder_crew/src/tools/__init__.py",
    "restaurant_finder_crew/src/tools/custom_tool.py",
    "restaurant_finder_crew/src/crew.py",
    "restaurant_finder_crew/src/main.py",
    "restaurant_finder_crew/pyproject.toml",
    "restaurant_finder_crew/README.md",
    "ui/page.tsx",
  ],
};

const result = {};

for (const demo in config) {
  result[demo] = { files: [] };
  const files = config[demo];
  for (const file of files) {
    const content = fs.readFileSync(
      path.join(__dirname, `../agent/demo/${demo}/${file}`),
      "utf8"
    );
    const extension = file.split(".").pop();
    let language = extension;
    if (extension === "py") {
      language = "python";
    } else if (extension === "css") {
      language = "css";
    } else if (extension === "md" || extension === "mdx") {
      language = "markdown";
    } else if (extension === "tsx") {
      language = "typescript";
    }

    result[demo].files.push({
      name: file,
      content,
      path: file,
      language,
    });
  }
}

fs.writeFileSync(
  path.join(__dirname, "../src/files.json"),
  JSON.stringify(result, null, 2)
);
