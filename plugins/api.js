import axios from '@nuxtjs/axios';
import store from '~/store';
const apiPrefix = '/api';

const errorHandler = (error) => {
  return { error: error.message || '', data: error };
}

export const get = async({ url, data, query }) => {
  try {
    console.log('GET QUERY');
  } catch (error) {
    errorHandler(error);
  }
};

export const psot = async({ url, data, query }) => {
  try {
    console.log('post QUERY');
  } catch (error) {
    errorHandler(error);
  }
};

export const put = async({ url, data, query }) => {
  try {
    console.log('PUT QUERY');
  } catch (error) {
    errorHandler(error);
  }
};