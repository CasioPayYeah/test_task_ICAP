import axios from 'axios';
import { dataType } from '@/app/utils/types';

const API_URL = 'https://technical-task-api.icapgroupgmbh.com/api';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      username,
      password,
    });

    if (response.status === 200) {
      return { status: true, message: response.data.message };
    }
  } catch (error) {
    console.error('Error during login: ', error);
  }

  return false;
};

export const fetchTableData = async (currentPage: number, perPage: number) => {
  const response = await axios.get(`${API_URL}/table/?offset=${currentPage * perPage}&limit=${perPage}`);
  return response.data;
};

export const saveTableData = async (data: dataType) => {
  const isDateValid = /^(\d{4})-(\d{2})-(\d{2})$/.test(data.birthday_date);

  if (!isDateValid) {
    console.error('Error: Invalid date format. Use "YYYY-MM-DD" format for birthday_date.');
    return false;
  }

  try {
    console.log(data)

    const response = await axios.put(`${API_URL}/table/${data.id}/`, {...data});


    return response.data;
  } catch (error) {
    console.error('Error during saving data: ', error);
  }

  return false;
};

export const deleteTableData = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/table/${id}/`);
  } catch (error) {
    console.error('Error during delete data: ', error);
  }
};
