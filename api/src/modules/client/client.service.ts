import { BaseService } from "arkos/services";
  
export class ClientService extends BaseService<"client"> {}

const clientService = new ClientService("client");

export default clientService;
