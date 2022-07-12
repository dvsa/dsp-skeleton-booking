import qs from 'qs'
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { SlotResponse } from './types/getSlotsResponse';
import { StatusCodes } from 'http-status-codes';
import { GetSlotsRequest } from './types/getSlotsRequest';

@injectable()
export class SlotClient {

  private axios: AxiosInstance

  constructor () {
    const axiosRequestConfig: AxiosRequestConfig = {
      baseURL: 'https://c7dm92mr22.execute-api.eu-west-2.amazonaws.com',
      timeout: 15000
    }

    this.axios = axios.create(axiosRequestConfig)
  }

  public getSlots(getSlotsRequest?: GetSlotsRequest): Promise<SlotResponse[]> {
    return this.httpHandler<SlotResponse[]>(() => this.axios.get('/slots', this.generateRequestConfig(getSlotsRequest)))
  }

  public getSlot(slotId: string): Promise<SlotResponse> {
    return this.httpHandler<SlotResponse>(() => this.axios.get(`/slots/${slotId}`))
  }

  public reserveSlot(slotId: string): Promise<void> {
    return this.httpHandler<void>(() => this.axios.put(`/slots/${slotId}/reserve`))
  }

  private async httpHandler<T>(request: () => AxiosPromise<T>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await request()
      console.log('axios response', response)
      if (response.data) {
        return response.data
      }
    } catch (err) {
      return this.handleError(err)
    }
  }

  private handleError(err) {
    err.status = err.response ? err.response.status : StatusCodes.INTERNAL_SERVER_ERROR
    return Promise.reject(err)
  }

  private generateRequestConfig<Request>(request?: Request): AxiosRequestConfig {
    const config: AxiosRequestConfig = {}

    if (request) {
      config.params = request;
      config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' });
    }

    return config
  }
}
