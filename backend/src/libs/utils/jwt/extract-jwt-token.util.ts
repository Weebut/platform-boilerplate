export function jwtExtractor(request: Request) {
  let token = null;
  if (request.headers['authorization']) {
    const auth_params = parseAuthHeader(request.headers['authorization']);
    if (auth_params && auth_params.scheme.toLowerCase() === 'bearer') {
      token = auth_params.value;
    }
  }
  return token;
}

function parseAuthHeader(authHeader: string) {
  if (!authHeader) {
    return null;
  }
  const matches = authHeader.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
}
