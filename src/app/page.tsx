"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { Entry } from "../../types/types";
import SummaryCard from "./components/SummaryCard";
import FinanceChar from "./components/FinanceChar";


export default function Home() {
const [entries, setEntries] = useState<Entry[]>([]);
const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    fetchTotals()

  },[])

  const fetchTotals = async () => {
    try {
    const response = await fetch('/api/entries')
    const entries: Entry[] = await response.json()
    setEntries(entries)

    const calaculatedTotals =  entries.reduce((acc, entry) => {
      if (entry.type === 'income') {
        acc.income += entry.amount
      } else {
        acc.expense += entry.amount
      }
      return acc
    }, { income: 0, expense: 0, balance: 0 })
      
    } catch (error) {
      console.error('Une erreur a été détécté',error)
    }
  
  }
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb8 font-bold p-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
          title="Revenus totaux"
          value={`${totals.income.toFixed(2)} Ar`}
          isLoading={isLoading}
          borderColor="border-green-500"
          textColor="text-green-500"
          />

          <SummaryCard
          title="Dépenses totals"
          value={`${totals.expense.toFixed(2)} Ar`}
          isLoading={isLoading}
          borderColor="border-red-500"
          textColor="text-red-500"
          />

<SummaryCard
          title="Solde"
          value={`${totals.balance.toFixed(2)} Ar`}
          isLoading={isLoading}
          borderColor="border-blue-500"
          textColor={totals.balance >= 0 ? 'text-blue-500' : 'text-red-500'}
          />
        </div>  
      </div>

    </main>
  );
}
