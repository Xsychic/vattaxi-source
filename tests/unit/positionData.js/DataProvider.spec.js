import axios from 'axios';
import DataProvider from '@/js/map/positionData';

jest.mock('axios');

describe('DataProvider', () => {
    test('valid request', async () => {
        const data = {
            latitude: 51.15055993780669,
            longitude:  -0.17285571237164488,
        };

        axios.mockImplementation(() => {
            return Promise.resolve({
                data
            });
        });
        
        const provider = new DataProvider();

        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(provider.connected.value).toBe(true);
        expect(provider.data.value).toEqual(data);
    });

    test('network error', async () => {
        const error = {
            code: 'ERR_NETWORK'
        };

        axios.mockImplementation(() => {
            return Promise.reject(error);
        });
        
        const provider = new DataProvider();

        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(provider.connected.value).toBe(false);
    });

    test('404', async () => {
        const error = {
            response: {
                status: 404,
                data: {
                    message: 'test'
                }
            }
        };

        axios.mockImplementation(() => {
            return Promise.reject(error);
        });
        
        const provider = new DataProvider();

        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(provider.connected.value).toBe(false);
    });
});
