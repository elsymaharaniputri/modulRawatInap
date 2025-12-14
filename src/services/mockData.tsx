import type { Pasien } from "../types/typeData";

const generateMockPatients = (): Pasien[] => {
    return [
        {
            id: 'P001',
            nama: 'Ahmad Subekti',
            nik: '3201234567890001',
            diagnosaMasuk: 'Demam Berdarah Dengue',
            tanggalMasuk: '2024-12-10',
            dokterPenanggungJawab: 'Dr. Ahmad Hidayat, Sp.PD',
            ruangan: 'Ruang Mawar - Kelas 1'
        },
        {
            id: 'P002',
            nama: 'Siti Aminah',
            nik: '3201234567890002',
            diagnosaMasuk: 'Pneumonia',
            tanggalMasuk: '2024-12-12',
            dokterPenanggungJawab: 'Dr. Siti Nurhaliza, Sp.A',
            ruangan: 'Ruang Melati - Kelas 2'
        },
        {
            id: 'P003',
            nama: 'Budi Raharjo',
            nik: '3201234567890003',
            diagnosaMasuk: 'Diabetes Mellitus',
            tanggalMasuk: '2024-12-14',
            dokterPenanggungJawab: 'Dr. Budi Santoso, Sp.B',
            ruangan: 'Ruang Anggrek - Kelas 3'
        }
    ];
};

export { generateMockPatients };