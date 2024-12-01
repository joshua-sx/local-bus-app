'use client'; // Add this directive to indicate this is a client component.

import React, { useState } from "react";
import {
  Home,
  History,
  UserCircle,
  ArrowRight,
  MapPin,
  Maximize2,
  DollarSign,
  Clock,
  BellRing,
  BadgeCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ReactNode } from "react";

// Types
interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

type NavItem = {
  id: string;
  icon: JSX.Element;
  label: string;
};

type Timeframe = "today" | "7days" | "30days";

interface EarningsData {
  name: string;
  amount: number;
}

interface HoursData {
  name: string;
  hours: number;
}

// Components
const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className = "",
}) => (
  <div className={`w-full max-w-[1000px] mx-auto px-4 ${className}`}>
    {children}
  </div>
);

const HomeScreen: React.FC = () => {
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<Timeframe>("today");

  const navItems: NavItem[] = [
    { id: "home", icon: <Home className="w-6 h-6" />, label: "Home" },
    {
      id: "activity",
      icon: <History className="w-6 h-6" />,
      label: "Activity",
    },
    {
      id: "account",
      icon: <UserCircle className="w-6 h-6" />,
      label: "Account",
    },
  ];

  const timeframes: { id: Timeframe; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "7days", label: "Last 7 Days" },
    { id: "30days", label: "Last 30 Days" },
  ];

  const earningsData: EarningsData[] = [
    { name: "Mon", amount: 150 },
    { name: "Tue", amount: 230 },
    { name: "Wed", amount: 180 },
    { name: "Thu", amount: 250 },
    { name: "Fri", amount: 200 },
    { name: "Sat", amount: 300 },
    { name: "Sun", amount: 280 },
  ];

  const hoursData: HoursData[] = [
    { name: "Week 1", hours: 38 },
    { name: "Week 2", hours: 42 },
    { name: "Week 3", hours: 35 },
    { name: "Week 4", hours: 40 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full bg-white shadow">
        <ContentWrapper>
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-lg font-bold">Michael Thompson</h1>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>Bus #245</span>
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Notifications"
            >
              <BellRing className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </ContentWrapper>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <ContentWrapper className="py-6">
          <div className="space-y-6">
            {/* Top Row: Route and Map Cards */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Current Route Card */}
              <div
                className={`flex-1 p-4 rounded-lg border ${
                  isOnDuty
                    ? "border-green-500 bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <h2 className="text-sm font-semibold text-gray-500 mb-2">
                  Current Route
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">St. Peters</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">Philipsburg</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsOnDuty(!isOnDuty)}
                    className={`w-full py-2 rounded text-sm transition-colors cursor-pointer ${
                      isOnDuty
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    {isOnDuty ? "Active" : "Off Duty"}
                  </button>
                  <button
                    className="w-full py-2 text-blue-500 text-sm border border-blue-500 rounded hover:bg-blue-50"
                    aria-label="Change Route"
                  >
                    Change Route
                  </button>
                </div>
              </div>

              {/* Map Preview */}
              <div className="flex-1 bg-white rounded-lg border p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">Map View</h2>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Expand Map"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-48 md:h-[200px] bg-gray-100 rounded relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Map Preview
                  </div>
                  <button
                    className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow"
                    aria-label="Pin Location"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Analytics Cards */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Earnings Dashboard */}
              <div className="flex-1 bg-white rounded-lg border p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Earnings</h2>
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>

                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {timeframes.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedTimeframe(period.id)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                        selectedTimeframe === period.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>

                <div className="h-48 md:h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#3B82F6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-center mt-4">
                  <p className="text-2xl font-bold">$245.50</p>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                </div>
              </div>

              {/* Work Hours Dashboard */}
              <div className="flex-1 bg-white rounded-lg border p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Work Hours</h2>
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>

                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {timeframes.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedTimeframe(period.id)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                        selectedTimeframe === period.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>

                <div className="h-48 md:h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hoursData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="hours"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-center mt-4">
                  <p className="text-2xl font-bold">32.5</p>
                  <p className="text-sm text-gray-500">Total Hours</p>
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <ContentWrapper>
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`flex flex-col items-center justify-center p-2 w-full transition-colors ${
                  item.id === "home" ? "text-blue-500" : "text-gray-600"
                }`}
                aria-label={item.label}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </ContentWrapper>
      </nav>
    </div>
  );
};

export default HomeScreen;
