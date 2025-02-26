// App.js - Complete Cyberpunk Terminal

import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'NightCity OS v3.77.1 [UNAUTHORIZED ACCESS]' },
    { type: 'system', content: 'Connection established via proxy nodes: 7' },
    { type: 'system', content: 'Type "help" for available commands.' },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [accessLevel, setAccessLevel] = useState('guest');
  const [scanProgress, setScanProgress] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  
  // Available commands
  const commands = {
    help: {
      description: 'Display available commands',
      action: () => {
        return [
          { type: 'system', content: '==== AVAILABLE COMMANDS ====' },
          ...Object.keys(commands).map(cmd => (
            { type: 'system', content: `${cmd} - ${commands[cmd].description}` }
          ))
        ];
      }
    },
    clear: {
      description: 'Clear terminal history',
      action: () => {
        setHistory([]);
        return [];
      }
    },
    scan: {
      description: 'Scan the network for vulnerabilities',
      action: () => {
        setIsAnimating(true);
        setScanProgress(0);
        
        // Start with initial messages
        const initialMessages = [
          { type: 'system', content: 'Initiating network scan protocol...' },
          { type: 'system', content: 'Deploying passive fingerprinting modules...' }
        ];
        
        setHistory(prev => [...prev, ...initialMessages]);
        
        // Set up the animation sequence
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setScanProgress(progress);
          
          if (progress === 25) {
            setHistory(prev => [
              ...prev, 
              { type: 'warning', content: 'Detected firewall at 192.168.0.1 - Bypassing...' }
            ]);
          }
          
          if (progress === 50) {
            setHistory(prev => [
              ...prev, 
              { type: 'error', content: 'WARNING: Countermeasures detected! Switching routing path...' }
            ]);
          }
          
          if (progress === 75) {
            setHistory(prev => [
              ...prev, 
              { type: 'system', content: 'Vulnerabilities identified. Logging findings...' }
            ]);
          }
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsAnimating(false);
              setScanProgress(0);
              
              setHistory(prev => [
                ...prev,
                { type: 'success', content: 'Scan complete. Results:' },
                { type: 'system', content: '- Open ports: 22, 80, 443, 3306' },
                { type: 'system', content: '- Outdated software: Apache 2.2.15, MySQL 5.1.73' },
                { type: 'warning', content: '- CVE-2023-1456: Remote code execution vulnerability detected' },
                { type: 'success', content: '- Potential entry points identified: 3' }
              ]);
            }, 500);
          }
        }, 200);
        
        return [];
      }
    },
    access: {
      description: 'Attempt to gain higher access level',
      action: (args) => {
        if (args.length === 0) {
          return [{ type: 'error', content: 'Usage: access [target] [password]' }];
        }
        
        const target = args[0];
        const password = args[1];
        
        if (target === 'mainframe' && password === 'cyberpunk2077') {
          setAccessLevel('admin');
          return [
            { type: 'success', content: 'ACCESS GRANTED: Administrator privileges enabled' },
            { type: 'system', content: 'New commands unlocked: decrypt, matrix' }
          ];
        }
        
        return [{ type: 'error', content: 'ACCESS DENIED: Invalid credentials' }];
      }
    },
    decrypt: {
      description: 'Decrypt encrypted files (requires admin access)',
      action: () => {
        if (accessLevel !== 'admin') {
          return [{ type: 'error', content: 'ACCESS DENIED: Requires administrator privileges' }];
        }
        
        setIsAnimating(true);
        
        const messages = [
          { type: 'system', content: 'Initializing quantum decryption algorithm...' },
          { type: 'system', content: 'Analyzing encryption patterns...' }
        ];
        
        setHistory(prev => [...prev, ...messages]);
        
        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { type: 'system', content: 'Running brute force attack with neural acceleration...' },
            { type: 'success', content: 'Decryption successful! Files unlocked:' },
            { type: 'system', content: '- blackmail.dat (2.3MB)' },
            { type: 'system', content: '- corporate_secrets.enc (17.8MB)' },
            { type: 'warning', content: '- project_rogue_ai.bin (154.6MB)' }
          ]);
          setIsAnimating(false);
        }, 3000);
        
        return [];
      }
    },
    matrix: {
      description: 'Enter the Matrix (requires admin access)',
      action: () => {
        if (accessLevel !== 'admin') {
          return [{ type: 'error', content: 'ACCESS DENIED: Requires administrator privileges' }];
        }
        
        setIsAnimating(true);
        
        const messages = [
          { type: 'system', content: 'Initializing neural interface...' },
          { type: 'warning', content: 'WARNING: Direct neural connection can cause seizures and death' },
          { type: 'system', content: 'Establishing connection to the Matrix...' }
        ];
        
        setHistory(prev => [...prev, ...messages]);
        
        setTimeout(() => {
          document.body.style.animation = 'glitch 0.5s infinite';
          
          setTimeout(() => {
            document.body.style.animation = '';
            setIsAnimating(false);
            
            setHistory(prev => [
              ...prev,
              { type: 'success', content: 'WELCOME TO THE MATRIX' },
              { type: 'system', content: 'Reality is merely a series of electrical signals interpreted by your brain' },
              { type: 'system', content: 'Disconnect at any time by typing "exit"' }
            ]);
          }, 3000);
        }, 2000);
        
        return [];
      }
    },
    exit: {
      description: 'Exit current process or session',
      action: () => {
        document.body.style.animation = '';
        return [{ type: 'system', content: 'Process terminated. Returning to terminal.' }];
      }
    },
    whoami: {
      description: 'Display current user information',
      action: () => {
        return [
          { type: 'system', content: `Username: anonymous_${Math.floor(Math.random() * 10000)}` },
          { type: 'system', content: `Access level: ${accessLevel}` },
          { type: 'system', content: 'IP Address: 192.168.1.' + Math.floor(Math.random() * 255) },
          { type: 'system', content: 'Location: NIGHT CITY - District 5' },
          { type: 'warning', content: 'REMINDER: All activities are logged and monitored' }
        ];
      }
    },
    date: {
      description: 'Display current date and time',
      action: () => {
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        return [{ type: 'system', content: `System time: ${formattedDate} ${formattedTime}` }];
      }
    }
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on load and click
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isAnimating) {
      const trimmedInput = input.trim();
      
      if (trimmedInput) {
        // Add input to history
        const newHistoryItem = { type: 'input', content: `> ${trimmedInput}` };
        setHistory(prev => [...prev, newHistoryItem]);
        
        // Parse command and arguments
        const parts = trimmedInput.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Process command
        if (command in commands) {
          const result = commands[command].action(args);
          if (result.length > 0) {
            setHistory(prev => [...prev, ...result]);
          }
        } else {
          setHistory(prev => [
            ...prev, 
            { type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` }
          ]);
        }
      }
      
      setInput('');
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'black',
      color: '#22c55e', // text-green-500
      fontFamily: 'monospace',
      padding: '16px',
      borderRadius: '6px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #15803d', // border-green-700
      overflow: 'hidden',
      maxHeight: '600px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        borderBottom: '1px solid #15803d', // border-green-700
        paddingBottom: '8px'
      }}>
        <Terminal size={20} className="mr-2" />
        <div style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#4ade80', // text-green-400
          marginLeft: '8px'
        }}>NIGHTCITY-TERMINAL</div>
        <div style={{
          marginLeft: 'auto',
          display: 'flex'
        }}>
          <div style={{
            height: '12px',
            width: '12px',
            borderRadius: '50%',
            backgroundColor: '#ef4444', // bg-red-500
            marginRight: '8px'
          }}></div>
          <div style={{
            height: '12px',
            width: '12px',
            borderRadius: '50%',
            backgroundColor: '#eab308', // bg-yellow-500
            marginRight: '8px'
          }}></div>
          <div style={{
            height: '12px',
            width: '12px',
            borderRadius: '50%',
            backgroundColor: '#22c55e', // bg-green-500
          }}></div>
        </div>
      </div>
      
      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        style={{
          flex: '1',
          overflowY: 'auto',
          marginBottom: '8px',
          padding: '8px'
        }}
        onClick={handleClick}
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            style={{
              marginBottom: '4px',
              color: 
                item.type === 'error' ? '#ef4444' : // text-red-500
                item.type === 'warning' ? '#eab308' : // text-yellow-500
                item.type === 'success' ? '#22d3ee' : // text-cyan-400
                item.type === 'input' ? '#93c5fd' : // text-blue-300
                '#4ade80' // text-green-400
            }}
          >
            {item.content}
          </div>
        ))}
        
        {/* Scan progress bar */}
        {scanProgress > 0 && scanProgress < 100 && (
          <div style={{
            margin: '8px 0',
            backgroundColor: '#374151', // bg-gray-700
            borderRadius: '9999px',
            height: '10px',
            width: '100%'
          }}>
            <div
              style={{
                backgroundColor: '#22c55e', // bg-green-500
                height: '10px',
                borderRadius: '9999px',
                transition: 'all 200ms',
                width: `${scanProgress}%`
              }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Input field */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderTop: isFocused ? '1px solid #22d3ee' : '1px solid #15803d', // border-cyan-400 : border-green-700
        paddingTop: '8px'
      }}>
        <span style={{ color: '#22d3ee', marginRight: '8px' }}>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isAnimating}
          style={{
            flex: '1',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#4ade80', // text-green-400
            fontFamily: 'monospace'
          }}
          placeholder={isAnimating ? "Processing..." : "Enter command..."}
        />
      </div>
      
      {/* Status bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        marginTop: '8px',
        color: '#15803d', // text-green-700
        borderTop: '1px solid #052e16', // border-green-900
        paddingTop: '8px'
      }}>
        <div>Access: {accessLevel.toUpperCase()}</div>
        <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          {isAnimating ? "EXECUTING..." : "READY"}
        </div>
        <div>PING: {Math.floor(Math.random() * 100)}ms</div>
      </div>
      
      {/* Cyberpunk style */}
      <style>
        {`
        @keyframes glitch {
          0% {
            filter: hue-rotate(0deg);
          }
          10% {
            filter: hue-rotate(90deg);
          }
          20% {
            filter: hue-rotate(180deg);
          }
          30% {
            filter: hue-rotate(270deg);
          }
          40% {
            filter: hue-rotate(360deg);
          }
          50% {
            filter: invert(1);
          }
          60% {
            filter: invert(0);
          }
          70% {
            filter: contrast(2);
          }
          80% {
            filter: contrast(1);
          }
          90% {
            filter: saturate(2);
          }
          100% {
            filter: saturate(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
          background-color: #111;
          color: #22c55e;
          font-family: monospace;
        }
        
        #root {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }
        
        input::placeholder {
          color: #15803d;
        }
        `}
      </style>
    </div>
  );
}

export default App;