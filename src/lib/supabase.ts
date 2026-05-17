import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfhjddqbnvcmlqknixgt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmaGpkZHFibnZjbWxxa25peGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDA1MjMsImV4cCI6MjA4NjMxNjUyM30.9TX9-ONjUtE54gZbxt7aqdMez4WKZHJLfQ2L0BYzVdE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Lead {
  id: number
  created_at: string
  name: string
  phone: string
  intent: string
  budget: string
}
