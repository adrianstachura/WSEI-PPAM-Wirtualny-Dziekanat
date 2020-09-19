export interface User {
  uid?: string;
  email: string;
  name?: string;
  photo?: any;
  photoURL?: string;
  role?:string;
  kierunek?: string;
    surname?: string,
    studentId?: string,
    pesel?: string,
    dataurodzenia?: string,
    miejsceurodzenia?: string,
    plec?: string,
    narodowosc?: string,
    obywatelstwo?: string,
    seria?: string,
    imiematki?: string,
    imieojca?: string,

    ulica_stale?: string,
    kod_stale?: string,
    miejsce_stale?: string,
    ulica_korespondencja?: string,
    kod_korespondencja?:string,
    miejsce_korespondencja?: string,
    email_uczelnia?: string,
    telefon?: string,

    swiad_numer?:string,
    swiad_data_wyd?: string,
    szkola?: string,
    szkola_rok?: string,
    grupa?: string,
    imieNazwisko?:string
}
