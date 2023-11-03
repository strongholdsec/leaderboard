import { rpcUrls } from 'config/rpc';

const DEFAULT_API_ERROR_MESSAGE = 'Something went wrong.';

export async function POST(
  request: Request,
  { params }: { params: { chainId: string } },
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
