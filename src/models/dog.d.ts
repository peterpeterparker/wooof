export interface Dog {
    message: string;
    status: 'success' | 'error';
}

export interface Dogs {
    message: string[];
    status: 'success' | 'error';
}

export interface BreedTypes {
    [key: string]: string[];
}

export interface Breed {
    message: BreedTypes;
    status: 'success' | 'error';
}
