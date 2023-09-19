const DEFAULT_API_ERROR_MESSAGE = 'Something went wrong.';

const rpcUrl = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requested = await fetch(rpcUrl, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return new Response(requested.body, {
      status: requested.status,
      headers: {
        'Content-Type':
          requested.headers.get('Content-Type') ?? 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(DEFAULT_API_ERROR_MESSAGE, {
      status: 500,
    });
  }
}
