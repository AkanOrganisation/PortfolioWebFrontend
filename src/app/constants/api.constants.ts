import {environment} from '../../environments/environment';


export const API_ENDPOINTS = Object.freeze({
    API_ENDPOINT: environment.apiUrl,
    API_GRAPHQL_ENDPOINT: `${environment.apiUrl}graphql/`,
    API_CSRF_ENDPOINT: `${environment.apiUrl}api/get_csrf/`,
    CSRF_COOKIE_NAME: 'csrftoken',
    CSRF_HEADER_NAME: 'X-CSRFToken',
});
