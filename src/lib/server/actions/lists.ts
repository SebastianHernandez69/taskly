"use server"

import { Query } from "node-appwrite";
import { createSessionClient } from "../appwrite"


const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const LISTS_COLLECTION_ID = process.env.APPWRITE_LIST_COLLECTION_ID!;
const ITEMS_COLLECTION_ID = process.env.APPWRITE_ITEMS_COLLECTION_ID!;
const LISTMEMBERS_COLLECTION_ID = process.env.APPWRITE_LISTMEMBERS_COLLECTION_ID!;

export async function getLists() {
    try {
        const { account, databases } = await createSessionClient();
        
        const user = await account.get();

        const lists = await databases.listDocuments({
            databaseId: DB_ID,
            collectionId: LISTS_COLLECTION_ID,
            queries: [
                Query.equal("ownerId", user.$id),
                Query.select(["*", "colors.class"])
            ]
        });
        
        return lists.documents;
    } catch (error) {
        console.error("Error fetching lists:", error);
        return [];
    
    }
};

export async function getItemsByList(listId: string) {
    const { databases } = await createSessionClient();

    const result = await databases.listDocuments({
        databaseId: DB_ID,
        collectionId: ITEMS_COLLECTION_ID,
        queries: [
            Query.equal("listId", listId)
        ]
    });

    return result.documents;
}

export async function getListMembers(listId: string) {
    const { databases } = await createSessionClient();

    const result = await databases.listDocuments({
        databaseId: DB_ID,
        collectionId: LISTMEMBERS_COLLECTION_ID,
        queries: [
            Query.equal("listId", listId)
        ]
    });

    return result.documents;
}


export async function getListsWithStats() {
    const lists = await getLists();

    // Para cada lista, obtenemos items y miembros
    const result = await Promise.all(
        lists.map(async (list: any) => {
            const items = await getItemsByList(list.$id);
            const members = await getListMembers(list.$id);

            const totalTasks = items.length;
            const completedTasks = items.filter((i: any) => i.isCompleted).length;

            const progress =
                totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

            return {
                id: list.$id,
                name: list.name,
                members: members.length,
                totalTasks,
                completedTasks,
                progress,
                color: list.colors.class,
            };
        })
    );

    return result;
}
