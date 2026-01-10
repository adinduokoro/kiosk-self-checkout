import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'kiosk-session'

interface SessionData {
  lastReceiptId: string | null
  lastPaidTotalCents: number | null
  lastPaidAtIso: string | null
}

// Load session from localStorage
function loadSession(): SessionData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {
      lastReceiptId: null,
      lastPaidTotalCents: null,
      lastPaidAtIso: null
    }
  } catch {
    return {
      lastReceiptId: null,
      lastPaidTotalCents: null,
      lastPaidAtIso: null
    }
  }
}

// Save session to localStorage
function saveSession(data: SessionData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save session to localStorage:', error)
  }
}

export const useSessionStore = defineStore('session', () => {
  const lastReceiptId = ref<string | null>(loadSession().lastReceiptId)
  const lastPaidTotalCents = ref<number | null>(loadSession().lastPaidTotalCents)
  const lastPaidAtIso = ref<string | null>(loadSession().lastPaidAtIso)

  function createReceipt(totalCents: number) {
    // Generate a mock receipt ID 
    const receiptId = `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const paidAt = new Date().toISOString()
    
    lastReceiptId.value = receiptId
    lastPaidTotalCents.value = totalCents
    lastPaidAtIso.value = paidAt
    
    saveSession({
      lastReceiptId: receiptId,
      lastPaidTotalCents: totalCents,
      lastPaidAtIso: paidAt
    })
  }

  function resetReceipt() {
    lastReceiptId.value = null
    lastPaidTotalCents.value = null
    lastPaidAtIso.value = null
    
    saveSession({
      lastReceiptId: null,
      lastPaidTotalCents: null,
      lastPaidAtIso: null
    })
  }

  return {
    lastReceiptId,
    lastPaidTotalCents,
    lastPaidAtIso,
    createReceipt,
    resetReceipt
  }
})

