export type loginrequest = {
  email : string;
  password : string;
};

export type loginresponse = {
    success : boolean;
    message : string;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    }
};





