const fooJson = JSON.stringify({ foo: 'bar' })

export async function GET(request: Request) {
  return new Response(fooJson, {
    headers: { 'content-type': 'application/json' },
  })
}
