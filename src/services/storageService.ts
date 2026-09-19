import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ocorrencia } from '../types';
import { mockOcorrencias } from '../data/mock';

const STORAGE_KEY = '@motiva_ocorrencias';

export const storageService = {
  async getOcorrencias(): Promise<Ocorrencia[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data !== null) {
        return JSON.parse(data);
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockOcorrencias));
      return mockOcorrencias;
    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
      return mockOcorrencias;
    }
  },

  async saveOcorrencia(novaOcorrencia: Ocorrencia): Promise<Ocorrencia[]> {
    try {
      const atuais = await this.getOcorrencias();
      const atualizadas = [novaOcorrencia, ...atuais];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
      return atualizadas;
    } catch (error) {
      console.error('Erro ao salvar ocorrência:', error);
      throw error;
    }
  }
};