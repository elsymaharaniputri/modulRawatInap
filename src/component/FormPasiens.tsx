import { useState } from 'react'
import type { FormError,FormData, Pasien } from '../types/typeData';
import Input from './common/FieldInput';
import { FaBed, FaCalendar, FaPlus, FaTruckLoading, FaUser } from 'react-icons/fa';
import { FaKitMedical, FaUserDoctor } from 'react-icons/fa6';
import Button from './common/Button';
interface PasienFormProps {
    onSubmit: (pasien: Pasien) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}
const FormPasiens = ({ onSubmit,onCancel,isSubmitting }: PasienFormProps) => {
    //STATE FORM DATA
    const [formData, setFormData] = useState<FormData>({
        nama: '',
        nik: '',
        diagnosaMasuk: '',
        tanggalMasuk: '',
        dokterPenanggungJawab: '',
        ruangan: ''
    });
   //STATE FORM ERROR
    const [errors, setError] = useState<FormError>({});
    //VALIDASI FORM
   const validationForm = (): boolean =>{
     const newErrors: FormError ={};
     if(!formData.nama.trim()){
        newErrors.nama = 'Nama wajib diisi';
     }else if(formData.nama.trim().length < 3){
        newErrors.nama = 'Isikan Nama Lengkap';
     }
        if(!formData.nik.trim()){
        newErrors.nik = 'NIK wajib diisi';
        }else if(formData.nik.trim().length !== 16){
        newErrors.nik = 'NIK harus 16 digit';
        }
       if (!formData.diagnosaMasuk.trim()) {
           newErrors.diagnosaMasuk = 'Diagnosa wajib diisi';
       }
       if (!formData.tanggalMasuk) {
           newErrors.tanggalMasuk = 'Tanggal masuk wajib diisi';
       }
       if (!formData.dokterPenanggungJawab.trim()) {
           newErrors.dokterPenanggungJawab = 'Dokter wajib diisi';
       }
       if (!formData.ruangan.trim()) {
           newErrors.ruangan = 'Ruangan wajib diisi';
       }
       setError(newErrors);
       return Object.keys(newErrors).length === 0;
   }
    //HANDLE UPDATE FORM
    const updateData = (field:keyof FormData, value:string) => {
        setFormData(prev => ({...prev, [field]: value}));
        if(errors[field]){
            setError(prev => ({...prev, [field]: undefined}));
        }
     };

     const handleSubmit = ()=>{
        if(validationForm()){
            const today = new Date()
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, '');

            //id ada format P+tanggal+random3digit
            const id = `P${today}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
            const newPasien: Pasien = {
                ...formData,
                id: id
            };
            onSubmit(newPasien);
        }
     }
    return (
      <div>

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          
        <div className="flex items-center justify-between mb-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-800">Form Pasien</h2>
            </div>
           
         </div>
                {/* BUTTON LIST */}
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={onCancel}>
                    Lihat Daftar Pasien
                </button>
                {/* Form Fields */}
                <Input
                    label="Nama Lengkap"
                    value={formData.nama}
                    onChange={(v) => updateData('nama', v)}
                    error={errors.nama}
                    placeholder="Masukkan nama lengkap pasien"
                    icon={<FaUser className="w-4 h-4 text-blue-700" />}
                />

                <Input
                    label="NIK (16 digit)"
                    value={formData.nik}
                    onChange={(v) => {
                        const numeric = v.replace(/\D/g, '').slice(0, 16);
                        updateData('nik', numeric);
                    }}
                    error={errors.nik}
                    placeholder="3201234567890001"
                />

                <Input
                    label="Diagnosa Masuk"
                    value={formData.diagnosaMasuk}
                    onChange={(v) => updateData('diagnosaMasuk', v)}
                    error={errors.diagnosaMasuk}
                    placeholder="Contoh: Demam Berdarah Dengue"
                    icon={<FaKitMedical className="w-4 h-4" />}
                />

                <Input
                    label="Tanggal Masuk"
                    type="date"
                    value={formData.tanggalMasuk}
                    onChange={(v) => updateData('tanggalMasuk', v)}
                    error={errors.tanggalMasuk}
                    icon={<FaCalendar className="w-4 h-4" />}
                />

                <Input
                    label="Dokter Penanggung Jawab"
                    value={formData.dokterPenanggungJawab}
                    onChange={(v) => updateData('dokterPenanggungJawab', v)}
                    error={errors.dokterPenanggungJawab}
                    placeholder="Dr. Nama Dokter, Sp.X"
                    icon={< FaUserDoctor className="w-4 h-4" />}
                />

                <Input
                    label="Ruangan"
                    value={formData.ruangan}
                    onChange={(v) => updateData('ruangan', v)}
                    error={errors.ruangan}
                    placeholder="Contoh: Ruang Mawar - Kelas 1"
                    icon={<FaBed className="w-4 h-4" />}
                />

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                    {/* jika submit muncul icon load jika tidak maka tetap + */}
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        icon={isSubmitting ? <FaTruckLoading className="w-4 h-4 animate-spin" /> : <FaPlus className="w-4 h-4" />}
                     
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Data Pasien'}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Batal
                    </Button>
                </div>


      </div>
                        
      </div>
    )
  
}
export default FormPasiens