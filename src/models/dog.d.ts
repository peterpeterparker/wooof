export interface Dog {
    message: string;
    status: 'success' | 'error';
}

export interface Dogs {
    message: string[];
    status: 'success' | 'error';
}
