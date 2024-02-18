import cover from '@/assets/images/profile-cover.jpg';

import { createHash } from 'crypto'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { UserProfile } from '../firebase/models/UserProfile';
import { getProfileRepository } from '../firebase';

export interface UserInfo {
    /**
     * The user's unique ID, scoped to the project.
     */
    readonly uid: string;
    
    readonly displayName: string | null;
    /**
     * The email of the user.
     */
    readonly email: string | null;
    /**
     * The profile photo URL of the user.
     */
    readonly photoURL: string | null;
}

export class User {
    private _profile: UserProfile | null = null;

    constructor(private readonly userInfo: UserInfo) {}

    get uid(): string {
        return this.userInfo.uid;
    }

    get fullName(): string {
        return this.userInfo.displayName ?? 'Nome Sobrenome';
    }

    get firstName(): string {
        return this._profile?.firstName ?? this.fullName.split(' ').slice(0, -1).join(' ');
    }

    get lastName(): string {
        return this._profile?.lastName ?? this.fullName.split(' ').slice(-1).join(' ');
    }

    get email(): string {
        return this.userInfo.email!;
    }

    get photoURL(): string {
        if (this.userInfo.photoURL) return this.userInfo.photoURL;
        
        const hash = createHash('sha256');
        hash.update(this.email.toLowerCase().trim());
        const digest = hash.digest('hex');
        
        return `https://gravatar.com/avatar/${digest}?d=mp`;
    }

    get profile(): UserProfile {
        if (!this._profile) throw new Error('User profile not loaded');
        return this._profile;
    }

    async loadProfile(): Promise<void> {
        const repo = await getProfileRepository(this);
        this._profile = await repo.getProfile();
    }

    get profileCoverPhotoUrl(): string | StaticImport {
        return this.profile.coverPhotoUrl ?? cover;
    }

}