const DEFAULT_API_ERROR_MESSAGE = 'Something went wrong.';

const rpcUrls = {
  '1': `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
  '137': `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
} as {[chainId: string]: string};

export async function POST(
  request: Request,
  { params }: { params: { chainId: string } }
  ) {
  try {
    const body = await request.json();
    const requested = await fetch(rpcUrls[params.chainId], {
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
