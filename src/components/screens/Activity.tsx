'use client';

import React, { useState } from 'react';
import { 
  User, 
  Baby, 
  GraduationCap, 
  PersonStanding,
  Calendar,
  Filter,
  ChevronRight,
  ArrowRight,
  X,
  Search,
  Home,
  History,
  UserCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";

const ActivityScreen = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPassengerType, setSelectedPassengerType] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const locations = [
    "St. Peters",
    "Philipsburg",
    "Maho",
    "Cole Bay",
    "Dutch Quarter",
    "French Quarter"
  ];

  const passengerTypes = [
    { type: 'Adult', icon: <User className="w-5 h-5" /> },
    { type: 'Child', icon: <Baby className="w-5 h-5" /> },
    { type: 'Student', icon: <GraduationCap className="w-5 h-5" /> },
    { type: 'Senior', icon: <PersonStanding className="w-5 h-5" /> }
  ];

  const navItems = [
    { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { id: 'activity', icon: <History className="w-6 h-6" />, label: 'Activity' },
    { id: 'account', icon: <UserCircle className="w-6 h-6" />, label: 'Account' }
  ];

  const transactions = [
    {
      id: 1,
      date: '2024-12-01',
      passengerType: 'Adult',
      origin: 'St. Peters',
      destination: 'Philipsburg',
      fare: 2.50,
      time: '09:30 AM',
      paymentMethod: 'Cash',
      transactionId: '#TXN001',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-12-01',
      passengerType: 'Student',
      origin: 'Maho',
      destination: 'French Quarter',
      fare: 2.00,
      time: '10:15 AM',
      paymentMethod: 'Card',
      transactionId: '#TXN002',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-12-01',
      passengerType: 'Senior',
      origin: 'Dutch Quarter',
      destination: 'Cole Bay',
      fare: 2.00,
      time: '11:00 AM',
      paymentMethod: 'Cash',
      transactionId: '#TXN003',
      status: 'Completed'
    },
    {
      id: 4,
      date: '2024-12-01',
      passengerType: 'Child',
      origin: 'Philipsburg',
      destination: 'Maho',
      fare: 1.00,
      time: '11:45 AM',
      paymentMethod: 'Cash',
      transactionId: '#TXN004',
      status: 'Completed'
    },
    {
      id: 5,
      date: '2024-12-01',
      passengerType: 'Adult',
      origin: 'French Quarter',
      destination: 'St. Peters',
      fare: 2.50,
      time: '12:30 PM',
      paymentMethod: 'Card',
      transactionId: '#TXN005',
      status: 'Completed'
    }
  ];

  const displayedTransactions = showAllTransactions 
    ? transactions 
    : transactions.slice(0, 3);

  const clearFilters = () => {
    setSelectedDate(null);
    setSelectedPassengerType(null);
    setSelectedOrigin(null);
    setSelectedDestination(null);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-md flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Activity</h1>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expandable Filters Section */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out
          ${showFilters ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full p-2 border rounded-lg mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-500 flex items-center gap-1"
              >
                Clear all
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Date Filter */}
              <div>
                <label className="text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border rounded-lg"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  value={selectedDate || ''}
                />
              </div>

              {/* Passenger Type Filter */}
              <div>
                <label className="text-sm text-gray-600">Passenger Type</label>
                <Select value={selectedPassengerType} onValueChange={setSelectedPassengerType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passenger type" />
                  </SelectTrigger>
                  <SelectContent>
                    {passengerTypes.map((type) => (
                      <SelectItem key={type.type} value={type.type}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          {type.type}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filters */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">From</label>
                  <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">To</label>
                  <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 pb-20">
        <div className="space-y-6">
          {/* Date Group */}
          <div>
            <h2 className="text-lg font-bold mb-4 px-2">December 1, 2024</h2>
            {displayedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-lg shadow-sm border mb-4"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      {passengerTypes.find(p => p.type === transaction.passengerType)?.icon}
                      <div>
                        <span className="font-medium">{transaction.passengerType}</span>
                        <div className="text-sm text-gray-500">{transaction.transactionId}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">${transaction.fare.toFixed(2)}</span>
                      <div className="text-sm text-gray-500">{transaction.paymentMethod}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                    <span className="font-medium">{transaction.origin}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{transaction.destination}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2 pt-2 border-t">
                    <div>{transaction.time}</div>
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded">
                      {transaction.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* See More Button */}
            {!showAllTransactions && transactions.length > 3 && (
              <button 
                onClick={() => setShowAllTransactions(true)}
                className="w-full py-2 text-blue-500 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                See More
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 w-full bg-white border-t shadow-lg">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center p-2 w-full transition-colors
                ${item.id === 'activity' ? 'text-blue-500' : 'text-gray-600'}`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ActivityScreen;
