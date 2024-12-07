import React, { useEffect } from "react";
// import { CdpToolkit } from "@coinbase/cdp-langchain";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
// import { ChatOpenAI } from "@langchain/openai";
// import { initializeAgentExecutorWithOptions } from "langchain/agents"

// Initialize CDP Agentkit
// const agentkit = CdpAgentkit.configureWithWallet();

// Create toolkit
// const toolkit = new CdpToolkit(agentkit);

// Get available tools
// const tools = toolkit.getTools();

// Initialize LLM
// const model = new ChatOpenAI({
//   model: "gpt-4o-mini",
// });

// Create agent executor
// const executor = await initializeAgentExecutorWithOptions(
//   toolkit.getTools(),
//   model,
//   {
//     agentType: "chat-conversational-react-description",
//     verbose: true,
//   }
// );

// // Example usage
// const result = await executor.invoke({
//   input: "Send 0.005 ETH to john2879.base.eth",
// });

// console.log(result.output);

// console.log(tools);

const Onchainai = () => {
  useEffect(() => {
    const agentkit = CdpAgentkit.configureWithWallet();
    console.log(agentkit);
  });
  return <div>Onchainai</div>;
};

export default Onchainai;
