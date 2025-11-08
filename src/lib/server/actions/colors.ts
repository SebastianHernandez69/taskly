"use server"

import { createAdminClient } from "../appwrite"

const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const COLORS_COLLECTION_ID = process.env.APPWRITE_COLORS_COLLECTION_ID!;

export async function getColors() {
    try {
        const { databases } = await createAdminClient();
        const colors = await databases.listDocuments({
            databaseId: DB_ID,
            collectionId: COLORS_COLLECTION_ID,
        });
        return colors.documents.map(color => { 
            return {
                id: color.$id,
                class: color.class,
            };
         });
    } catch (error) {
        console.error("Error fetching colors:", error);
        return [];
    }
}