export interface UserPasswordChangeRequest {
  username: string;
  oldpassword?: string;
  newPassword: string;
}
