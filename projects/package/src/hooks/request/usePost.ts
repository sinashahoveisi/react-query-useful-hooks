import {AxiosError, AxiosRequestConfig} from 'axios';
import {allocateParamToString, urlGenerator} from 'utils';
import {useMutation, useQueryClient} from 'react-query';
import {useAxios, useUser} from 'hooks';
import merge from 'lodash/merge';
import set from 'lodash/set';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import {mutationRequestProps} from 'types/request';

interface IPostConfig {
  url: string;
  query?: object;
  version?: number;
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET';
  removeQueries?: Array<Array<string | number | undefined | null> | string>;
  refetchQueries?: Array<Array<string | number | undefined | null> | string>;
  form?: any;
  isGeneral?: boolean;
  isMultipart?: boolean;
  showError?: boolean;
  onSuccess?(response: any, request?: any, params?: any): void;
  onError?(error: any, request?: any, params?: any): void;
  isUrlencoded?: boolean;
}

const usePost = ({
  url,
  method = 'POST',
  query,
  version,
  form,
  isGeneral = false,
  isMultipart,
  showError = true,
  removeQueries,
  isUrlencoded = false,
  refetchQueries,
  onSuccess,
  onError
}: IPostConfig) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const AxiosInstance = useAxios();

  const requestConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
      'Content-type': isMultipart
        ? 'multipart/form-data'
        : isUrlencoded
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
      silent: !showError
    },

    url: urlGenerator(url, version, isGeneral),
    method,
    params: query
  };

  const createRequest = ({body, queryParams, params, token}: mutationRequestProps) => {
    if (queryParams) set(requestConfig, 'params', merge(query, queryParams));
    if (token) set(requestConfig, ['headers', 'Authorization'], `Bearer ${token}`);
    if (params) set(requestConfig, 'url', allocateParamToString(urlGenerator(url, version), params));
    set(requestConfig, 'data', body);
    return AxiosInstance(requestConfig);
  };

  const mutationData = useMutation(createRequest, {
    retry: false,
    onSuccess: (data, variables) => {
      forEach(removeQueries, (removeQuery: Array<string | number | undefined | null> | string) =>
        queryClient.removeQueries(removeQuery)
      );
      forEach(refetchQueries, (refetchQuery: Array<string | number | undefined | null> | string) =>
        queryClient.refetchQueries(refetchQuery)
      );
      if (isFunction(onSuccess)) {
        onSuccess(data?.data, variables, variables?.params);
      }
    },
    onError: (error: AxiosError, variables) => {
      if (isFunction(onError)) {
        onError(error.request, variables, variables?.params);
      }
    }
  });

  const post = (body?: any, queryParams?: object, params?: object, token?: string) =>
    mutationData.mutate({body, queryParams, params, token});

  return {...mutationData, post, params: mutationData.variables?.params};
};

export default usePost;