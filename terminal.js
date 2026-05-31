/* ==========================================
   INTERACTIVE RECRUITER TERMINAL ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');

  // Command database
  const commands = {
    help: `
Available commands:
  <span class="text-violet">about</span>      - Divya's background & academic summary
  <span class="text-violet">skills</span>     - Technical capabilities checklist
  <span class="text-violet">projects</span>   - Detailed list of marquee projects
  <span class="text-violet">contact</span>    - Communication channels & socials
  <span class="text-violet">resume</span>     - Access & download Divya's resume
  <span class="text-violet">clear</span>      - Clear terminal screen
  <span class="text-violet">help</span>       - Display this list`,
    
    about: `
<span class="text-cyan">*** LAKSHMI SRI DIVYA RAVIPROLU ***</span>
=======================================
[Role]      Full-Stack Software Engineer & AI Systems Developer
[Degree]    B.E. Computer Science & Engineering (3rd Year, 2024-2028)
[College]   R.M.D. Engineering College, Chennai (Autonomous)
[School]    Everwin Vidhyashram CBSE, Kolathur, Chennai
[Vision]    Building software that bridges advanced AI systems with real-world sustainability.

"I develop digital-twin outbreak trackers, smart IoT waste infrastructure, and high-frequency cloud forecasting systems. Let's deliver something advanced."`,

    skills: `
<span class="text-cyan">*** TECHNICAL SKILL SHEET ***</span>
==================================
[Languages]
  - C++                [■■■■■■■■■□] 90%
  - Python             [■■■■■■■■5□] 85%
  - TypeScript/JS      [■■■■■■■■5□] 85%
  - Java               [■■■■■■■■□□] 80%
  - SQL                [■■■■■■■■□□] 80%

[Web Development & Databases]
  - React.js           [■■■■■■■■5□] 85%
  - HTML5 & CSS3       [■■■■■■■■■5] 95%
  - Node.js & Express  [■■■■■■■■□□] 80%
  - PostgreSQL / Neon  [■■■■■■■5□□] 75%`,

    projects: `
<span class="text-cyan">*** DETAILED PROJECT REGISTRY ***</span>
=====================================
1. <span class="text-violet">MDR SENTINEL</span> [Hospital Outbreak Platform]
   - *Description:* Outbreak prevention & real-time contact tracing using Bluetooth Low Energy (BLE) sensors.
   - *Stack:* Node.js, IoT, BLE Sensors.
   - *Detail:* Product Lab 2 Project. Developed as part of SIH- 2025.

2. <span class="text-violet">GREEN</span> [Biomedical Waste Segregation App]
   - *Description:* Waste management app integrated with physical Arduino moisture, IR, and metal sensors.
   - *Stack:* React, PostgreSQL, Arduino.
   - *Detail:* Product Lab project. Includes quizzes, games, and gamified SDG-based learning.

3. <span class="text-violet">AZURE DEMAND FORECASTER</span> [Cloud Resource Predictor]
   - *Description:* Time-series cloud forecasting pipeline using LSTM, XGBoost, and ARIMA to predict CPU usage with 84.7% accuracy.
   - *Stack:* Python ML, React, Flask.
   - *Repo:* <a href="https://github.com/RLAKSHMISRIDIVYA/Integrated_Forecasting_-Predict_Azure_consumer_demand" target="_blank" class="text-cyan">Integrated_Forecasting</a>`,

    contact: `
<span class="text-cyan">*** COMMUNICATION TRANSMISSION NODES ***</span>
=============================================
[Email]      <a href="mailto:raviprolu.lakshmisridivya@gmail.com" class="text-cyan">raviprolu.lakshmisridivya@gmail.com</a>
[Hotline]    +91 86672 68436
[Location]   Chennai, Tamil Nadu, India
[GitHub]     <a href="https://github.com/RLAKSHMISRIDIVYA" target="_blank" class="text-cyan">github.com/RLAKSHMISRIDIVYA</a>
[LinkedIn]   <a href="https://www.linkedin.com/in/lakshmi-sri-divya-raviprolu-a56801331" target="_blank" class="text-cyan">linkedin.com/in/lakshmi-sri-divya-raviprolu</a>
[HackerRank] <a href="https://www.hackerrank.com/profile/raviprolu_laksh1" target="_blank" class="text-cyan">hackerrank.com/profile/raviprolu_laksh1</a>`,

    resume: `
<span class="text-yellow">Initialising Resume Retrieval Protocols...</span>
[Status]    Connecting to D:\\DIVYA_PORTFOLIO\\resume.pdf...
[Action]    Packing asset files...
[Result]    <span class="text-green">Package compiled!</span> Click below to open:
<a href="resume.pdf" download="Raviprolu_Lakshmi_Sri_Divya_Resume.pdf" class="btn btn-primary" style="display:inline-block; padding: 6px 12px; margin-top: 10px; font-size: 0.8rem;"><i class="fa-solid fa-download"></i> Download PDF Resume</a>`
  };

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = terminalInput.value.trim().toLowerCase();
        
        // Create prompt input line echo
        const inputEcho = document.createElement('div');
        inputEcho.className = 'terminal-line';
        inputEcho.innerHTML = `<span class="terminal-prompt">guest@divya-recruiter:~$</span> ${terminalInput.value}`;
        terminalOutput.appendChild(inputEcho);

        // Process command
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line';

        if (inputVal === 'clear') {
          terminalOutput.innerHTML = '';
        } else if (inputVal in commands) {
          outputLine.innerHTML = commands[inputVal];
          terminalOutput.appendChild(outputLine);
        } else if (inputVal === '') {
          // Do nothing on blank enter
        } else {
          outputLine.innerHTML = `<span class="text-muted">Command not recognized: '${inputVal}'. Type <span class="text-violet">help</span> for assistance.</span>`;
          terminalOutput.appendChild(outputLine);
        }

        // Reset input and scroll to bottom
        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });

    // Make clicking the body auto-focus the input
    terminalBody.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

});
