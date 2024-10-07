'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Step {
  title: string
  description: string
  imageSrc: string
}

const steps: Step[] = [
    {
      title: "Seamless Chatbot Integration",
      description: "Effortlessly integrate an AI-powered chatbot into your web app with just a simple embed code.",
      imageSrc: "/images/iphonecorinna.png"
    },
    {
      title: "Dynamic Email Marketing Campaigns",
      description: "Create impactful campaigns and send bulk emails that resonate with your audience.",
      imageSrc: "/images/email-marketing.png"
    },
    {
      title: "Efficient Product Selling",
      description: "Easily list and sell products to customers, leveraging chatbot interactions for seamless transactions.",
      imageSrc: "/images/product-selling.png"
    }
  ];
  

const INTERVAL_DURATION = 5000 // 5 seconds for each step

export default function FeatureShowcase() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
          return 0
        }
        return prevProgress + (100 / (INTERVAL_DURATION / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="h-1 w-full bg-gray-800 rounded-full mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <MainImage imageSrc={steps[currentStep].imageSrc} />
          <StepList steps={steps} currentStep={currentStep} />
        </div>
      </div>
    </div>
  )
}

function MainImage({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="w-full lg:w-2/3 aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="Feature showcase"
          layout="fill"
          objectFit="contain"
          className="max-w-full max-h-full"
          priority
        />
      </div>
    </div>
  )
}

function StepList({ steps, currentStep }: { steps: Step[], currentStep: number }) {
  return (
    <div className="w-full lg:w-1/3 space-y-6">
      {steps.map((step, index) => (
        <StepItem
          key={index}
          step={step}
          isActive={index === currentStep}
          stepNumber={index + 1}
        />
      ))}
    </div>
  )
}

function StepItem({ step, isActive, stepNumber }: { step: Step, isActive: boolean, stepNumber: number }) {
  return (
    <div className={`p-6 rounded-lg transition-all duration-300 ${isActive ? 'bg-gray-800 shadow-lg' : 'bg-gray-900'}`}>
      <div className="flex items-center mb-3">
        <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
          {stepNumber}
        </span>
        <h3 className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>{step.title}</h3>
      </div>
      <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>{step.description}</p>
    </div>
  )
}