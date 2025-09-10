import ImageKit from "imagekit";


const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT as string
});

export const upload = (file:any,fileName:any)=>{
    imagekit.upload({
        file : file, //required
        fileName : fileName,   //required    
        },function(error:any, result:any) {
            if(error) console.log(error);
            else console.log(result);
    });  
}