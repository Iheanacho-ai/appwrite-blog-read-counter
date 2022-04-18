import { Appwrite } from 'appwrite';

// Init your Web SDK
export const sdk = new Appwrite();

sdk
.setEndpoint('http://localhost/v1') // Your API Endpoint
.setProject('625d9071b3fc17c7bfb6') // Your project ID
;

//Creating anonymous Session

export const createAnonymousSession = async() => {
    try{
        await sdk.account.createAnonymousSession();

    }catch(err){
        console.log(err)
    }
    
}

