import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

if (!supabaseUrl) throw new Error('SUPABASE_URL não definida')
if (!supabaseKey) throw new Error('SUPABASE_SERVICE_KEY não definida')

export const supabase = createClient(supabaseUrl, supabaseKey)