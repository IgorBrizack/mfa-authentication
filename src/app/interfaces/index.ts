export interface IUserJwt {
  token: string;
  name: string;
  email: string;
  mfa_authentication: IMfaApproval;
}

export interface IMfaApproval {
  mfa_registered: boolean;
  mfa_approved: boolean;
}
