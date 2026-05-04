import { UserRole } from "@/lib/authUtils";

export interface ILoginResponse {

    token : string;
    accessToken : string;
    refreshToken : string;
    user : {
        id: string; // Added id
        needPasswordChange : boolean;
        email : string;
        name : string;
        role : UserRole;

        image: string;
        status : string;
        isDeleted : boolean;
        emailVerified : boolean;
    }
}

export interface ILoginActionResult {
    success: boolean;
    message?: string;
    redirectUrl?: string;
    user?: ILoginResponse["user"];
}