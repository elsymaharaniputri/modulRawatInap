import type { Pasien } from "../types/typeData";
import { generateMockPatients } from "./mockData";

const mockApi = {
    getPasiens: (): Promise<Pasien[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(generateMockPatients());
            }, 800); 
        });
    },

    addPasiens: (pasien: Pasien): Promise<Pasien> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(pasien);
            }, 500);
        });
    }
};

export default mockApi;