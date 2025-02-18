import { localStorage } from '../localStorage';
import { BASE_URL } from './constants';

async function performApiCall<dataT>(
    uri: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: Object,
    queryParams?: Record<string, string | number>,
): Promise<dataT> {
    let url = `${BASE_URL}/${uri}`;
    if (queryParams) {
        const queryString = computeQueryParams(queryParams);
        if (queryString) {
            url += `?${queryString}`;
        }
    }
    let response: Response;
    const token = localStorage.jwtTokenHandler.get();
    const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.jwtTokenHandler.remove();
        }
        let message = response.statusText;
        try {
            message = await response.text();
        } catch (error) {
            console.error(error);
        } finally {
            throw new Error(message);
        }
    }
    return response.json();
}

function computeQueryParams(queryParams: Record<string, string | number>): string {
    return Object.entries(queryParams)
        .map(([key, value]) => {
            const encodedValue = encodeURIComponent(value);
            return `${key}=${encodedValue}`;
        })
        .join('&');
}

export { performApiCall, computeQueryParams };
