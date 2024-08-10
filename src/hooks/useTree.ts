import { API } from '@/utils/constants';
import type { ApiRequest } from '@/utils/types';
import type { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

export interface ExternalTreeTriggerArgs {
  /** Request body. */
  // biome-ignore lint/suspicious/noExplicitAny: Request body
  body?: any;
  /** Payload for POST/PUT/DELETE methods. */
  rowId?: number;
  /** Request preset. */
  request: ApiRequest;
}

/**
 * Simple wrapper around useSWRMutation hook for tree data.
 * @returns Object with tree data and methods to manipulate with it
 */
export function useTree<Data, Error = unknown>() {
  const fetcher = async (
    url: string,
    { arg }: { arg: ExternalTreeTriggerArgs },
  ) => {
    const endpoint =
      arg?.rowId && typeof arg.request.endpoint === 'function'
        ? arg.request.endpoint(arg.rowId)
        : arg.request.endpoint;

    const response = await fetch(`${url}${endpoint}`, {
      method: arg.request.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg.body),
    });

    return response.json();
  };

  const fetchInfo = useSWRMutation<
    Data,
    Error,
    Key,
    ExternalTreeTriggerArgs
  >(process.env.NEXT_PUBLIC_BASE_URL, fetcher);

  return {
    response: fetchInfo,
    getTree() {
      fetchInfo.trigger({ request: API.getTreeRows });
    },
    deleteRow(rowId: number) {
      fetchInfo.trigger({ rowId, request: API.deleteRow });
    },
    updateRow<T>(rowId: number, body: T) {
      fetchInfo.trigger({ body, rowId, request: API.updateRow });
    },
    createRow<T>(body: T) {
      fetchInfo.trigger({ body, request: API.createRowInEntity });
    },
  };
}
