import React from 'react'

interface BotIconProps {
  width?: number;
  height?: number;
}

export const BotIcon: React.FC<BotIconProps> = ({ width = 50, height = 50 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#4A00E0", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#8E2DE2", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#00F5A0", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#00D9F5", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width="50" height="50" fill="#1A1A2E" />

    {/* Glowing effect */}
    <circle cx="25" cy="25" r="22" fill="url(#grad1)" opacity="0.6" style={{ filter: "blur(3px)" }} />

    {/* Chat bubble */}
    <path
      d="M46 25c0-11.598-9.402-21-21-21S4 13.402 4 25s9.402 21 21 21c3.71 0 7.2-0.963 10.232-2.654L46 46l-2.654-10.768A20.925 20.925 0 0046 25z"
      fill="#2A2A4A"
      stroke="#8E2DE2"
      strokeWidth="1.5"
    />

    {/* Robot face */}
    <rect x="13" y="15" width="24" height="20" rx="10" ry="10" fill="url(#grad2)" />

    {/* Eyes */}
    <circle cx="20" cy="23" r="3.5" fill="#1A1A2E" />
    <circle cx="20" cy="23" r="1.5" fill="#00F5A0" />
    <circle cx="30" cy="23" r="3.5" fill="#1A1A2E" />
    <circle cx="30" cy="23" r="1.5" fill="#00F5A0" />

    {/* Smile */}
    <path d="M18 30 Q25 36 32 30" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />

    {/* Antenna */}
    <line x1="25" y1="15" x2="25" y2="8" stroke="#8E2DE2" strokeWidth="1.5" />
    <circle cx="25" cy="7" r="2" fill="#00F5A0" />
  </svg>
  )
}