import { NextApiRequest, NextApiResponse } from 'next';

type handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export interface HttpHandlers {
  postHandler?: handler;
  getHandler?: handler;
  putHandler?: handler;
  patchHandler?: handler;
  deleteHandler?: handler;
}

export function handlerSwitcher(
  method: string,
  handlers: HttpHandlers,
): handler {
  const { postHandler, getHandler, putHandler, patchHandler, deleteHandler } =
    handlers;

  const throwMthNotAllowedError: handler = async (
    _: NextApiRequest,
    res: NextApiResponse,
  ) => {
    res.status(405).end();
  };

  switch (method) {
    case 'POST':
      return postHandler ?? throwMthNotAllowedError;
    case 'GET':
      return getHandler ?? throwMthNotAllowedError;
    case 'PUT':
      return putHandler ?? throwMthNotAllowedError;
    case 'PATCH':
      return patchHandler ?? throwMthNotAllowedError;
    case 'DELETE':
      return deleteHandler ?? throwMthNotAllowedError;
    default:
      return throwMthNotAllowedError;
  }
}
