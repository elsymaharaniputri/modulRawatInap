import { useEffect, useState } from "react";
import type { Pasien } from "./types/typeData";
import { FaTruckLoading } from "react-icons/fa";
import ListPasiens from "./component/ListPasiens";
import mockApi from "./services/mockAPIServices";
import FormPasiens from "./component/FormPasiens";
type View = 'list' | 'form';

function App() {
  const [view, setView] = useState<View>('list');
  const [pasiens, setPasiens] = useState<Pasien[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadPassiens();
  }, []);

  const loadPassiens = async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.getPasiens();
      setPasiens(data);
    } catch (error) {
      console.error('Error loading pasiens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new patient
  const handleAddPasiens = async (pasien:Pasien) => {
    setIsSubmitting(true);
    try {
      const newPasien = await mockApi.addPasiens(pasien);
      setPasiens(prev => [newPasien, ...prev]);
      setView('list'); 
    } catch (error) {
      console.error('Error adding Pasien:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
       
        <div className="max-w-xl ">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Modul Rawat Inap
            </h1>
            <p className="text-gray-600">
              Manajemen Pasien Rumah Sakit
            </p>
          </div>

         
          {/* Tampilkan component berbeda berdasarkan state 'view' */}

          {isLoading ? (
            // Loading State
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <FaTruckLoading className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Memuat data pasien...</p>
            </div>
          ) : view === 'list' ? (
            // List View
            <ListPasiens
              pasien={pasiens}
              onAddNew={() => setView('form')}
            />
          ) : (
            // Form View
            <FormPasiens
              onSubmit={handleAddPasiens}
              onCancel={() => setView('list')}
              isSubmitting={isSubmitting}
            />
          )}

         
        </div>
      </div>

    </>
  )
}

export default App
