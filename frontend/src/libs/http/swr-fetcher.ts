import axios from 'axios';

export async function fetcher(
  url: string,
  headers?: { [key: string]: string },
) {
  if (!url) {
    return null;
  }

  const response = await axios.get(url, { headers });

  return response.data;
}
