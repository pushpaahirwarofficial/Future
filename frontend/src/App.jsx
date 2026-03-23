import { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

const runAI = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();

    let result =
      data?.output ||
      data?.data?.choices?.[0]?.message?.content ||
      "No response";

    // ✅ CLEAN NODES (IMPORTANT)
    const cleanNodes = nodes.map((node) => ({
      id: node.id,
      position: node.position,
      data: { label: "Node" }
    }));

    const res1 = await fetch("http://localhost:5000/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input,
        output: result,
        nodes: cleanNodes,   // ✅ FIX
        edges: edges || []
      })
    });

    const saveData = await res1.json();
    setOutput(saveData?.data?.output || result);
    setInput(saveData?.data?.input || input);

  } catch (err) {
    console.error("❌ ERROR:", err);
  }
};

  const nodes = [
    {
      id: "1",
      position: { x: 50, y: 100 },
      data: {
        label: (
          <div style={styles.box}>
            <h3>Input</h3>
            <textarea
              style={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type prompt..."
            />
            <button style={styles.button} onClick={runAI}>
              Run Flow
            </button>
          </div>
        )
      }
    },
    {
      id: "2",
      position: { x: 350, y: 100 },
      data: {
        label: (
          <div style={styles.box}>
            <span style={styles.inputSpan}>Input: {input}</span>
            <h3>Output</h3>
            <textarea
              style={styles.textarea}
              value={output}
              readOnly
              placeholder="AI response..."
            />
          </div>
        )
      }
    }
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true
    }
  ];

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}

export default App;


// 🎨 styles
const styles = {
  box: {
    padding: "15px",
    width: "200px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "8px",
    background: "blue",
    color: "#fff",
    border: "none"
  },
  inputSpan: {
    display: "block",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "10px",
    wordWrap: "break-word",  
  },

};