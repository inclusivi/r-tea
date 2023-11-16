export enum UserKind {
    Guest = "guest",
    Admin = "admin",
    Responsavel = "responsavel",
    ProfissionalSaude = "profissional_saude",
    Cuidador = "cuidador",
    Educador = "educador",
}

export const AllUserKinds = [
    { value: UserKind.Admin, label: 'Administrador' },
    { value: UserKind.Responsavel, label: 'Responsável' },
    { value: UserKind.ProfissionalSaude, label: 'Profissional de Saúde' },
    { value: UserKind.Cuidador, label: 'Cuidador' },
    { value: UserKind.Educador, label: 'Educador' },
]

export const UserKindDescriptions = {
    [UserKind.Guest]: 'Convidado',
    [UserKind.Admin]: 'Administrador',
    [UserKind.Responsavel]: 'Responsável',
    [UserKind.ProfissionalSaude]: 'Profissional de Saúde',
    [UserKind.Cuidador]: 'Cuidador',
    [UserKind.Educador]: 'Educador',
}