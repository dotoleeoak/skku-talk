import { cookies } from 'next/headers'

export async function POST(request: Request): Promise<Response> {
  cookies().delete('access_token')

  return new Response(null, { status: 200 })
}
