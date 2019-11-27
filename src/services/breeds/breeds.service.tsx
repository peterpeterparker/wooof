import {Breed, BreedTypes} from '../../models/dog';

export class BreedsService {

    private breeds: BreedTypes | undefined = undefined;

    private static instance: BreedsService;

    private constructor() {
        // Private constructor, singleton
    }

    static getInstance() {
        if (!BreedsService.instance) {
            BreedsService.instance = new BreedsService();
        }
        return BreedsService.instance;
    }

    getBreeds(): Promise<string[] | undefined> {
        return new Promise<string[] | undefined>(async (resolve) => {
            await this.initBreedTypes();

            if (!this.breeds) {
                resolve(undefined);
                return;
            }

            const results: string[] = [];
            for (const [key, value] of Object.entries(this.breeds)) {
                if (value && value.length > 0) {
                    const subBreeds: string[] = value.map((subBreed: string) => {
                       return `${key} ${subBreed}`;
                    });

                    results.push(...subBreeds);
                } else {
                    results.push(key);
                }
            }

            resolve(results);
        });
    }

    private initBreedTypes(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            if (this.breeds) {
                resolve();
                return;
            }

            try {
                const rawResponse: Response = await fetch(`https://dog.ceo/api/breeds/list/all`);

                const response: Breed = JSON.parse(await rawResponse.text());

                if (!response) {
                    this.breeds = undefined;
                    resolve();
                    return;
                }

                this.breeds = response.message;

                resolve();
            } catch (err) {
                this.breeds = undefined;
                resolve();
            }
        });
    }
}
