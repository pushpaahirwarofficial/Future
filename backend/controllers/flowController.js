const Flow = require("../models/Flow");
const axios = require("axios");


// 🟢 Save Flow
exports.saveFlow = async (req, res) => {
  try {
    const { input, output, nodes, edges } = req.body;

    if (!input || !output) {
      return res.status(400).json({
        success: false,
        message: "Input and Output are required"
      });
    }

    const flow = new Flow({
      input,
      output,
      nodes: nodes || [],
      edges: edges || []
    });

    const savedFlow = await flow.save();

    // ✅ FETCH AGAIN FROM DB
    const freshFlow = await Flow.findById(savedFlow._id);

    res.status(201).json({
      success: true,
      data: freshFlow,   // 👈 latest DB data
      message: "Flow saved successfully"
    });

  } catch (err) {
    console.error("🔥 SAVE ERROR FULL:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


// 🔵 Get All Flows
exports.getFlows = async (req, res) => {
  try {
    const flows = await Flow.find();

    res.status(200).json({
      success: true,
      data: flows
    });

  } catch (err) {
    console.error("Get Flows Error:", err.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch flows"
    });
  }
};


// 🟣 Get Single Flow (by ID)
exports.getFlowById = async (req, res) => {
  try {
    const flow = await Flow.findById(req.params.id);

    if (!flow) {
      return res.status(404).json({
        success: false,
        message: "Flow not found"
      });
    }

    res.status(200).json({
      success: true,
      data: flow
    });

  } catch (err) {
    console.error("Get Flow By ID Error:", err.message);

    res.status(500).json({
      success: false,
      message: "Error fetching flow"
    });
  }
};


// 🔴 Delete Flow
exports.deleteFlow = async (req, res) => {
  try {
    const flow = await Flow.findByIdAndDelete(req.params.id);

    if (!flow) {
      return res.status(404).json({
        success: false,
        message: "Flow not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Flow deleted successfully"
    });

  } catch (err) {
    console.error("Delete Flow Error:", err.message);

    res.status(500).json({
      success: false,
      message: "Error deleting flow"
    });
  }
};


// 🤖 AI Text Generation (OpenRouter)
exports.generateText = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (err) {
    console.error("AI Error:", err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.response?.data || "AI request failed"
    });
  }
};