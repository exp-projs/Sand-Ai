import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <main className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      {todos && todos.length > 0 ? (
        <ul className="list-disc pl-5">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      ) : (
        <p>No todos found or table 'todos' does not exist yet. But connected successfully!</p>
      )}
    </main>
  )
}
