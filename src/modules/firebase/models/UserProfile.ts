import { UserKind } from "./UserKind";

export class UserProfile {
    public userId: string | null = null;
    public email: string | null = null;
    public photoUrl: string | null = null;
    public firstName: string | null = null;
    public lastName: string | null = null;
    public coverPhotoUrl: string | null = null;
    public userKind: UserKind | null = null;
    public ufId: number | null = null;
    public ufName: string | null = null;
    public ufSigla: string | null = null;
    public municipioId: number | null = null;
    public municipioName: string | null = null;
    public introText: string | null = null;
}