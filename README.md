## 🌱 PramaanSetu

<i>Where Truth Meets Integrity!</i>

<img src="https://github.com/user-attachments/assets/07dbb87f-287c-4e8b-9892-49c71649d529" height="400" width="800"/>

# EthIndia - 2024

- Team Name: M2P (Mumbai To Pune)
- Project Title: प्रमाणसेतु (PramaanSetu)

PramaanSetu addresses the critical issue of unverified and unreliable AI-generated outputs, which have caused significant challenges across various sectors. In healthcare, errors can lead to misdiagnoses; in finance, they result in faulty investment decisions; in law, fabricated references undermine judicial processes; and in media, the spread of misinformation erodes public trust. The lack of a robust mechanism to validate AI-generated content compromises decision-making and trust in AI systems. PramaanSetu solves this by providing a blockchain-backed validation platform that ensures AI outputs are accurate, reliable, and verified against consensus-backed data sources.

### Key Features: 
- <b>Consensus-Based Validation:</b> A decentralized mechanism where human reviewers validate data through a transparent voting system, ensuring accuracy and reliability. An incentivized ecosystem rewards reviewers for accurate validations and penalizes repeated inaccuracies.
- <b>Blockchain-Backed Transparency</b>: All validation processes and decisions are immutably stored on the blockchain, ensuring trust and traceability.
- <b>Seamless Integration</b>: Designed as a plug-and-play extension that integrates effortlessly with any chatbot or AI system to validate outputs in real time.
- <b>Verified Data Marketplace</b>: A decentralized platform for organizations to buy and sell blockchain-verified datasets, enabling the training of AI models on trustworthy, bias-free data.
- <b>Real-Time Output Validation</b>: AI outputs are validated based on the reliability of the articles or sources they reference.
- <b>Multi-Sector Applicability</b>: PramaanSetu is tailored for diverse industries, including healthcare, finance, legal, and media, solving sector-specific challenges through validated data and trustworthy AI.

### Challenges we ran into
1. Faucet Issue with Test Ether: When deploying our contract to Polygon zkEVM, we needed to test Ether to interact with the network. We used a faucet to get the test Ether, but it wasn’t reflected in our wallet. This was frustrating, as we couldn't proceed without it. We reached out to a Telegram group and received help from mentors Reet Bantra and Akshat. They pointed out that the issue was due to using an incorrect RPC URL and ChainID in our wallet configuration. Once we corrected these settings, the test Ether appeared in our account, allowing us to continue with the deployment.
2. Invalid Opcode Error ("mcopy"): After deploying the contract, we encountered another issue when calling a function from our backend. The error message was “invalid opcode: mcopy.” This was puzzling at first, but after digging through the contract's code, we found that the problem was due to a mismatch between the compiled version of the contract and the one expected by the network. Once again, Akshat from Polygon helped us identify that we needed to compile the contract with the correct version to resolve the issue. After recompiling with the right version, the error was fixed, and the function call worked as expected.
