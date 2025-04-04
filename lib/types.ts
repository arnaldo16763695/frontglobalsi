export type Clients = {
  id: string;
  email: string;
  name: string;
  phone: string;
  rut: string;
  status: string;
};

export type Company = {
    id: string;
    companyName: string;
    phone: string;
    email: string;
    rut: string;
    clientsId: string;
    location: string;
    observations: string;
    status: string;
  };
