// Format cents as money string (e.g., 1999 -> "$19.99")

export function formatMoneyFromCents(cents: number): string {
    const dollars = cents / 100
    return `$${dollars.toFixed(2)}`
  }
  
  