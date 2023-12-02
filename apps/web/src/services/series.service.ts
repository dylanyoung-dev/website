import groq from 'groq';
import client from '../utils/client';
import { ISeries } from '../interfaces/ISeries';

export const getSeries = async (): Promise<ISeries[]> => {
    return await client.fetch(groq`*[_type == "series"] | order(dateReleased desc)`);
};
