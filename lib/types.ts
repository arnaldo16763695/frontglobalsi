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

  export type Projects = {
    id: string;
    rut: string;  
    companyId: string;  
    company:{
      companyName:string;
      rut:string;
    };
    progress: "NOT_STARTED" | "FINISHED" | "NOT_STARTED";
    status: "ACTIVE" | "INAVTIVE" | "DELETE";
  };
