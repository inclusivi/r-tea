export enum UserKind {
  Guest = "guest",
  Admin = "admin",
  Responsavel = "responsavel",
  ProfissionalSaude = "profissional_saude",
  Cuidador = "cuidador",
  Educador = "educador",
  PessoaAutista = "pessoa_autista",
  PessoaSemDiagnostico = "pessoa_sem_diagnostico",
}

export const AllUserKinds = [
  { value: UserKind.Admin, label: 'Administrador' },
  { value: UserKind.Responsavel, label: 'Responsável' },
  { value: UserKind.ProfissionalSaude, label: 'Profissional de Saúde' },
  { value: UserKind.Cuidador, label: 'Cuidador' },
  { value: UserKind.Educador, label: 'Educador' },
  { value: UserKind.PessoaAutista, label: 'Pessoa com Autismo' },
  { value: UserKind.PessoaSemDiagnostico, label: 'Jornada de Descoberta' },
];

export const UserKindDescriptions = {
  [UserKind.Guest]: 'Convidado',
  [UserKind.Admin]: 'Administrador',
  [UserKind.Responsavel]: 'Responsável',
  [UserKind.ProfissionalSaude]: 'Profissional de Saúde',
  [UserKind.Cuidador]: 'Cuidador',
  [UserKind.Educador]: 'Educador',
  [UserKind.PessoaAutista]: 'Pessoa com Autismo',
  [UserKind.PessoaSemDiagnostico]: 'Jornada de Descoberta',
};