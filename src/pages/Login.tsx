import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import WexLogo from "@/assets/wex-logo.svg"

interface LoginProps {
  onLoginSuccess: () => void
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onLoginSuccess()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#ececec] relative overflow-hidden">
      {/* Background decorative elements - simplified version */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative circles/squares would go here - simplified for now */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Login Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-[402px] bg-white rounded-lg shadow-[0px_8px_16px_0px_rgba(2,13,36,0.15),0px_0px_1px_0px_rgba(2,13,36,0.3)] border-0">
            <CardContent className="p-8">
              <div className="flex flex-col gap-6">
                {/* Logo + Title + Subtext */}
                <div className="flex flex-col gap-6 items-center">
                  <div className="w-[150px] h-[50px]">
                    <img src={WexLogo} alt="WEX" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2 items-center text-center">
                    <h1 className="text-[18px] font-semibold leading-6 tracking-[-0.252px] text-[#12181d]">
                      Welcome
                    </h1>
                    <p className="text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#12181d] max-w-[328px]">
                      Please enter your username or email address to log into WEX Health & Benefits
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Input Field with Floating Label */}
                  <div className="relative">
                    <div className="relative border-2 border-[#0058a3] rounded-[4px] h-14">
                      <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="absolute inset-0 border-0 rounded-[4px] px-[14px] pt-4 pb-2 text-[16px] leading-6 tracking-[-0.176px] text-[#12181d] focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder=""
                      />
                      <label
                        className={`absolute left-[14px] transition-all duration-200 pointer-events-none ${
                          isFocused || username
                            ? "top-2 text-[12px] leading-4 text-[#0058a3] bg-white px-1 z-10"
                            : "top-1/2 -translate-y-1/2 text-[16px] leading-6 text-[#12181d]"
                        }`}
                      >
                        Username or Email address
                      </label>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Button
                    type="submit"
                    className="w-full h-10 bg-[#0058a3] text-white hover:bg-[#0058a3]/90 rounded-lg text-[14px] font-medium leading-6 tracking-[-0.084px]"
                  >
                    Continue
                  </Button>
                </form>

                {/* Sign Up Link */}
                <div className="flex gap-2 items-center justify-center text-[16px] leading-6 tracking-[-0.176px]">
                  <p className="text-[#2d333a]">Don't have an account?</p>
                  <button
                    type="button"
                    className="text-[#0058a3] hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="bg-[#05619f] w-full py-[13px] px-[131px]">
          <div className="flex flex-col gap-[14px] items-center">
            {/* Footer Links */}
            <div className="flex gap-8 items-start text-[11px] font-semibold leading-4 tracking-[0.055px] text-white">
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Browser Requirements
              </button>
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Contact Us
              </button>
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Privacy Policy
              </button>
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Accessibility Statement
              </button>
            </div>
            {/* Copyright */}
            <div className="flex gap-[42px] items-start">
              <p className="text-[11px] font-normal leading-4 tracking-[0.055px] text-white text-center">
                Copyright 2005-2024. Powered by [Company name], a WEX Inc. Proprietary Web Product. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

