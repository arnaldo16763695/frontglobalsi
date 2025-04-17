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
    workCode: string;
    description: string;
    finalObservation: string;
    images: string[];
    stepsToWork: string[];
    startedAt: string;
    finishedAt: string;
    company:{
      companyName:string;
      rut:string;
      clientsId:string;
    };
    progress: "IN_PROGRESS" | "FINISHED" | "NOT_STARTED";
    status: "ACTIVE" | "INAVTIVE" | "DELETE";
    createdAt: string;
  };

  export type Steps = {
    id: string;
    description: string;  
   
  };
