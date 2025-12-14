//Interface Data Pasien
//  Nama, NIK, Diagnosa Masuk, Tanggal Masuk, Dokter Penanggung Jawab, Ruangan 
// Validasi form(contoh: required, panjang NIK, dll)

export interface Pasien {
  id: string;
  nama: string;
  nik : string;
  diagnosaMasuk: string;
  tanggalMasuk : string;
  dokterPenanggungJawab: string;
  ruangan : string;
}
export interface FormData {
  nama: string;
  nik : string;
  diagnosaMasuk: string;
  tanggalMasuk : string;
  dokterPenanggungJawab: string;
  ruangan : string;
}
export interface FormError {
  nama?: string;
  nik?: string;
  diagnosaMasuk?: string;
  tanggalMasuk?: string;
  dokterPenanggungJawab?: string;
  ruangan?: string;
}

