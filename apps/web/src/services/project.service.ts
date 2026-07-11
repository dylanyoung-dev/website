import groq from 'groq';
import { IProject } from '../interfaces/IProject';
import client from '../utils/client';

export const getCurrentProjects = async (): Promise<IProject[]> => {
    return await client.fetch(
        groq`*[_type == "project" && isCurrent == true && defined(slug.current)] | order(title asc){
            ...,
            "thumbnailUrl": thumbnail.asset->url
        }`
    );
};
