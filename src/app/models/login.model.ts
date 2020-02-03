export interface LoginModel {
    email: string;
    password: string;
}

export interface RequestResetPasswordModel {
    email: string;
}

export interface ResetPasswordModel {
    password: string;
    confirmPassword: string;
}

export interface ReceivedCodeConfirmationModel {
    code: string;
}

export interface RegisterNewPassword {
    code: string;
    password: string;
    confirmPassword: string;
}