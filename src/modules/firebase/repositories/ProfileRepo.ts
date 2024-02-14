import { deleteFile, saveFile } from "../services/storage";
import { setUserAvatar } from "../services/auth";
import { loadDocument, loadDocuments, updateDocument } from "../services/database";
import { UserProfile } from "../models/UserProfile";
import { Pessoa } from "../models/Pessoa";
import { UserKind } from "../models/UserKind";
import { Municipio, UF } from "@/modules/ibge/types";
import { and, or, where } from "firebase/firestore";

import { User as FirebaseUser, updateProfile } from "firebase/auth";
import { User } from "@/modules/user/UserInfo";

import { PessoaRepo } from "./PessoaRepo";
export class ProfileRepo {
    private pessoaRepo: PessoaRepo;

    constructor(
        private readonly firebaseUser: FirebaseUser,
        private readonly user: User
    ) {
        this.pessoaRepo = new PessoaRepo(user);
    }

    get avatarPath(): string {
        return `public/profile/${this.firebaseUser.uid}/avatar`;
    }

    get profileCoverPath(): string {
        return `public/profile/${this.firebaseUser.uid}/cover`;
    }

    get userProfileDocumentPath(): string {
        return `/profiles/${this.firebaseUser.uid}`;
    }

    async setProfilePhoto(file: File) {
        const fileUrl = await saveFile(this.avatarPath, file);
        await setUserAvatar(this.firebaseUser, fileUrl);
        await this.updateUserProfile({
            photoUrl: fileUrl,
        });

        await this.updatePessoaIfAutisticOrInDiscover({ photoUrl: fileUrl });
    }
    
    async removeProfilePhoto() {
        await deleteFile(this.avatarPath);
        await setUserAvatar(this.firebaseUser, null);
        await this.updateUserProfile({
            photoUrl: null,
        });

        await this.updatePessoaIfAutisticOrInDiscover({ photoUrl: '' });

    }

    async setCoverPhoto(file: File) {
        const fileUrl = await saveFile(this.profileCoverPath, file);

        await this.updateUserProfile({
            coverPhotoUrl: fileUrl,
        });
    }

    async removeCoverPhoto() {
        await deleteFile(this.profileCoverPath);
        
        await this.updateUserProfile({
            coverPhotoUrl: null,
        });
    }

    async updateUserKind(userKind: UserKind) {
        await this.updateUserProfile({
            userKind,
        });

        if (userKind === UserKind.PessoaAutista || userKind === UserKind.PessoaSemDiagnostico) {
            
            const profile = this.user

            if(!profile){
                return;
            }

            await this.pessoaRepo.addPessoa({
                id: '',
                responsavelUid: profile.uid,
                nome: profile.firstName || '',
                sobreNome: profile.lastName || '',
                genero: '',
                dataNascimento: '',
                bio: '',
                photoUrl: '',
                convidados: [],
            });
        };
    }

    async updateBasicInfo(nome: string, sobrenome: string, selectedUf?: UF, selectedMunicipio?: Municipio) {
        await updateProfile(this.firebaseUser, {
            displayName: `${nome} ${sobrenome}`,
        });
        
        await this.updateUserProfile({
            userId: this.firebaseUser.uid,
            email: this.firebaseUser.email,
            firstName: nome,
            lastName: sobrenome,
            ufId: selectedUf?.id ?? null,
            ufName: selectedUf?.nome ?? null,
            ufSigla: selectedUf?.sigla ?? null,
            municipioId: selectedMunicipio?.id ?? null,
            municipioName: selectedMunicipio?.nome ?? null,
        });

        await this.updatePessoaIfAutisticOrInDiscover({ nome, sobreNome: sobrenome });
        
    }

    async updatePessoaIfAutisticOrInDiscover(data: Partial<Pessoa>){
        const profile = this.user.profile

        if(profile.userKind === UserKind.PessoaAutista || profile.userKind === UserKind.PessoaSemDiagnostico){
            const pessoas = await this.pessoaRepo.getPessoas();
            const pessoa = pessoas[0]

            await this.pessoaRepo.addPessoa({
                id: pessoa.id,
                responsavelUid: pessoa.responsavelUid,
                nome: data.nome ?? pessoa.nome,
                sobreNome: data.sobreNome ?? pessoa.sobreNome,
                genero: pessoa.genero,
                dataNascimento: pessoa.dataNascimento,
                ...data
            });
        };
    }

    async updateBio(intro: string) {
        await this.updateUserProfile({
            introText: intro,
        });

        await this.updatePessoaIfAutisticOrInDiscover({ bio: intro });

    }
    

    async getProfile(): Promise<UserProfile> {
        const profile = await loadDocument<UserProfile>(this.userProfileDocumentPath);
        if (!profile) return new UserProfile();
        return profile;
    }

    async getProfileForId(userId: string): Promise<UserProfile | null> {
        const profile = await loadDocument<UserProfile>(`/profiles/${userId}`);
        if (!profile) return null;
        return profile;
    }

    async updateUserProfile(data: Partial<UserProfile>) {
        await updateDocument(this.userProfileDocumentPath, data);
    }

    async getProfiles(userKindFilter: UserKind[]) {
        const filter = and(where('userKind', 'in', userKindFilter));
        const profiles = await loadDocuments<UserProfile>('/profiles', filter);
        return profiles;
    }
}

