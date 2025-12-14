
import { useState } from "react";
import type { Pasien } from "../types/typeData";
import { FaBed, FaPlus, FaSearch } from "react-icons/fa";
import Button from "./common/Button";
import React from "react";

interface PasienListProps {
    pasien: Pasien[];
    onAddNew: () => void;
}

const ListPasiens = ({ onAddNew, pasien }: PasienListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<'nama' | 'tanggalMasuk'>('tanggalMasuk');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    
    const filteredAndSortedPasien = React.useMemo(() => {
        let result = [...pasien];

        //Filter berdasarkan search term
        if (searchTerm) {
            result = result.filter(p =>
                p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.nik.includes(searchTerm)
            );
        }

        //Sorting data
        result.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            if (sortField === 'tanggalMasuk') {
                aVal = new Date(a.tanggalMasuk).getTime().toString();
                bVal = new Date(b.tanggalMasuk).getTime().toString();
            }

            if (sortOrder === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });

        return result;
    }, [pasien, searchTerm, sortField, sortOrder]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const toggleSort = (field: 'nama' | 'tanggalMasuk') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Daftar Pasien Rawat Inap
                    </h2>
                </div>
               
            </div>
           

           
         
            {/* Search & Sort Buttons */}
            <div className="flex gap-2 mb-6">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari nama atau NIK pasien..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    onClick={() => toggleSort('nama')}
                    className={`px-4 py-2 rounded-lg transition ${sortField === 'nama'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Nama {sortField === 'nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => toggleSort('tanggalMasuk')}
                    className={`px-4 py-2 rounded-lg transition ${sortField === 'tanggalMasuk'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Tanggal {sortField === 'tanggalMasuk' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>
            {/* Add New Button */}
            <div className="mb-6 flex justify-end">

                <Button onClick={onAddNew} icon={<FaPlus className="w-4 h-4" />}>
                    Tambah Pasien
                </Button>

            </div>
            {/* Patient Cards */}
            {filteredAndSortedPasien.length === 0 ? (
                <div className="text-center py-12">
                    <FaBed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                        {searchTerm ? 'Tidak ada pasien yang sesuai' : 'Belum ada pasien rawat inap'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredAndSortedPasien.map((patient) => (
                        <div
                            key={patient.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {patient.nama}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        ID: {patient.id} | NIK: {patient.nik}
                                    </p>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    Aktif
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-500">Diagnosa</p>
                                    <p className="font-medium text-gray-800">{patient.diagnosaMasuk}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Tanggal Masuk</p>
                                    <p className="font-medium text-gray-800">{formatDate(patient.tanggalMasuk)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Dokter</p>
                                    <p className="font-medium text-gray-800">{patient.dokterPenanggungJawab}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Ruangan</p>
                                    <p className="font-medium text-gray-800">{patient.ruangan}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default ListPasiens;