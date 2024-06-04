import 'react-native-url-polyfill/auto'
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    Platform: 'com.konoha.konoha',
    projectId: '664cd54a001f88b90f06',
    databaseId: '664de6e20030cad0e585',
    userCollectionId: '664de7500007eaae5603',
    videosCollectionId: '664de7aa001fd2f5c68f',
    storageId: '664f2d9e002cf4443faf',

}
const{
    endpoint,
    Platform, 
    projectId, 
    databaseId, 
    userCollectionId,
    videosCollectionId, 
    storageId,
} =appwriteConfig;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.Platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email , password , username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl

            }
        )

        return newUser

    } catch (error) {
        console.log(error);
        throw new Error(error);


    }
}

export const signIn = async (email, password)=> {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;

    } catch (error) {
        throw new Error(error);

        
    }

} 

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,

            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);

    }
}

export const getAllPost = async () => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}


export const getLatestPosts = async () => {

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7) )]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

