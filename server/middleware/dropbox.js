const { Dropbox } = require("dropbox");

const fetch = require("isomorphic-fetch");

const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;

const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch });

class DropboxServices {
   uploadFile(file) {
      const { originalname, buffer } = file;
      const filePath =
         "/sprint2_ profileandapplicationsteps-datarequirements.xlsx";
      return new Promise(async (resolve, reject) => {
         try {
            // const response = await dbx.filesUpload({
            //    path: "/" + originalname,
            //    contents: buffer,
            // });
            const response = await dbx.sharingCreateSharedLinkWithSettings({
               path: filePath,
            });
            console.log(response);
            resolve(response);
         } catch (err) {
            console.log(err);
            reject(err);
         }
      });
   }
}

module.exports = new DropboxServices();
